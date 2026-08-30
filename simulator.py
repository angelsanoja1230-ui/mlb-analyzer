import random

def calculate_ev(prob_percentage, decimal_odds):
    """Calcula el Valor Esperado (EV) de una apuesta."""
    if not decimal_odds or decimal_odds <= 1:
        return 0.0
    prob_decimal = prob_percentage / 100.0
    ev = (prob_decimal * decimal_odds) - 1.0
    return round(ev * 100, 2)  # Retorna el porcentaje de valor (ej: +6.5%)

def simulate_match_monte_carlo(match_data, iterations=5000):
    park_factor = match_data.get('park_factor', 1.0)
    whip_away = match_data.get('starter_away_whip', 1.25)
    whip_home = match_data.get('starter_home_whip', 1.25)
    bullpen_away = match_data.get('bullpen_era_away', 4.00)
    bullpen_home = match_data.get('bullpen_era_home', 4.00)
    base_away = match_data.get('base_prob_away', 50)
    base_home = match_data.get('base_prob_home', 50)
    
    # Variables de clima
    wind_speed = match_data.get('wind_speed_mph', 0)
    wind_direction = match_data.get('wind_direction', 'Calm')
    temperature = match_data.get('temperature_f', 72)
    
    weather_adjustment = 0.0
    if wind_direction == 'Out':
        weather_adjustment += (wind_speed * 0.4)
    elif wind_direction == 'In':
        weather_adjustment -= (wind_speed * 0.4)
        
    temp_adjustment = (temperature - 72) * 0.05

    # Ponderación analítica estándar
    pitcher_advantage = (whip_home - whip_away) * 3.5
    bullpen_advantage = (bullpen_home - bullpen_away) * 2.0
    park_adjustment = (park_factor - 1.0) * 5.0
    
    adjusted_away_prob = base_away + pitcher_advantage + bullpen_advantage + park_adjustment + (weather_adjustment * 0.5) + temp_adjustment
    
    adjusted_away_prob = max(15, min(85, adjusted_away_prob))
    adjusted_home_prob = 100 - adjusted_away_prob

    home_wins = 0
    away_wins = 0
    f5_home_wins = 0
    f5_away_wins = 0

    for _ in range(iterations):
        f5_rand = random.uniform(0, 100)
        f5_threshold = 50 + (whip_home - whip_away) * 10
        if f5_rand < f5_threshold:
            f5_away_wins += 1
        else:
            f5_home_wins += 1

        game_rand = random.uniform(0, 100)
        if game_rand < adjusted_away_prob:
            away_wins += 1
        else:
            home_wins += 1

    prob_away = round((away_wins / iterations) * 100, 1)
    prob_home = round((home_wins / iterations) * 100, 1)
    
    f5_away_prob = round((f5_away_wins / iterations) * 100, 1)
    f5_home_prob = round((f5_home_wins / iterations) * 100, 1)

    # Análisis de Cuotas y Valor Esperado (EV+)
    odds_away = match_data.get('odds_away', 0.0)
    odds_home = match_data.get('odds_home', 0.0)
    
    ev_away = calculate_ev(prob_away, odds_away)
    ev_home = calculate_ev(prob_home, odds_home)

    # Filtro inteligente de "Mega Jugada" (Rentabilidad superior al 5%)
    is_mega_play = False
    recommendation_text = ""
    
    if ev_away >= 5.0:
        is_mega_play = True
        recommendation_text = f"🔥 MEGA JUGADA: Apostar a {match_data.get('away')} (Valor EV+: +{ev_away}%)"
    elif ev_home >= 5.0:
        is_mega_play = True
        recommendation_text = f"🔥 MEGA JUGADA: Apostar a {match_data.get('home')} (Valor EV+: +{ev_home}%)"
    else:
        recommendation_text = "⚖️ Partido sin margen de valor suficiente (Pasar / No Action)"

    match_data['prob_away'] = prob_away
    match_data['prob_home'] = prob_home
    match_data['f5_away'] = f5_away_prob
    match_data['f5_home'] = f5_home_prob
    match_data['ev_away'] = ev_away
    match_data['ev_home'] = ev_home
    match_data['is_mega_play'] = is_mega_play
    match_data['recommendation_text'] = recommendation_text

    return match_data

def process_all_matches(matches_list):
    processed = []
    for match in matches_list:
        processed.append(simulate_match_monte_carlo(match))
    return processed
