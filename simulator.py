import random

def simulate_match_monte_carlo(match_data, iterations=5000):
    # Extraer parámetros avanzados o usar valores estándar de respaldo
    park_factor = match_data.get('park_factor', 1.0)
    
    # Métricas de abridores (WHIP menor es mejor)
    whip_away = match_data.get('starter_away_whip', 1.25)
    whip_home = match_data.get('starter_home_whip', 1.25)
    
    # Efectividad de Bullpens (ERA menor es mejor)
    bullpen_away = match_data.get('bullpen_era_away', 4.00)
    bullpen_home = match_data.get('bullpen_era_home', 4.00)
    
    # Base de talento ofensivo/defensivo estimada por defecto (50/50 balanceado)
    base_away = match_data.get('base_prob_away', 50)
    base_home = match_data.get('base_prob_home', 50)
    
    # Ponderación analítica para ajustar las probabilidades base con los nuevos factores
    # Un abridor con WHIP bajo o un bullpen sólido otorgan ventaja directa
    pitcher_advantage = (whip_home - whip_away) * 3.5  # Si el visitante tiene menor WHIP, suma puntos
    bullpen_advantage = (bullpen_home - bullpen_away) * 2.0  # Si el visitante tiene mejor bullpen, suma puntos
    park_adjustment = (park_factor - 1.0) * 5.0
    
    adjusted_away_prob = base_away + pitcher_advantage + bullpen_advantage + park_adjustment
    
    # Normalizar entre 15% y 85% para mantener realismo deportivo
    adjusted_away_prob = max(15, min(85, adjusted_away_prob))
    adjusted_home_prob = 100 - adjusted_away_prob

    home_wins = 0
    away_wins = 0
    f5_home_wins = 0
    f5_away_wins = 0

    # Simulación de Monte Carlo
    for _ in range(iterations):
        # Simulación de Primeras 5 Innings (F5) ponderada principalmente por los abridores
        f5_rand = random.uniform(0, 100)
        f5_threshold = 50 + (whip_home - whip_away) * 10
        if f5_rand < f5_threshold:
            f5_away_wins += 1
        else:
            f5_home_wins += 1

        # Simulación de Partido Completo (Game) ponderada por bullpen y factores globales
        game_rand = random.uniform(0, 100)
        if game_rand < adjusted_away_prob:
            away_wins += 1
        else:
            home_wins += 1

    prob_away = round((away_wins / iterations) * 100, 1)
    prob_home = round((home_wins / iterations) * 100, 1)
    
    f5_away_prob = round((f5_away_wins / iterations) * 100, 1)
    f5_home_prob = round((f5_home_wins / iterations) * 100, 1)

    # Generar argumento analítico basado en las métricas reales
    reasons = []
    if whip_away < whip_home:
        reasons.append(f"Ventaja en abridor para visita (WHIP {whip_away} vs {whip_home}).")
    else:
        reasons.append(f"Ventaja en abridor para local (WHIP {whip_home} vs {whip_away}).")
        
    if bullpen_away < bullpen_home:
        reasons.append("Cuerpo de relevistas visitante más sólido.")
    else:
        reasons.append("Bullpen local con mejor efectividad reciente.")

    value_bet = " | ".join(reasons)

    match_data['prob_away'] = prob_away
    match_data['prob_home'] = prob_home
    match_data['f5_away'] = f5_away_prob
    match_data['f5_home'] = f5_home_prob
    match_data['value_bet'] = value_bet

    return match_data

def process_all_matches(matches_list):
    processed = []
    for match in matches_list:
        processed.append(simulate_match_monte_carlo(match))
    return processed
