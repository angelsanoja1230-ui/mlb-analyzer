import random

def run_monte_carlo_simulation(match_data, iterations=50000):
    away_wins = 0
    home_wins = 0
    f5_away_wins = 0
    f5_home_wins = 0
    home_cover_count = 0  # Victorias del Local por 2+ carreras (-1.5)
    away_cover_count = 0  # Victorias del Visitante por 2+ carreras (-1.5)
    extra_innings_count = 0
    
    # 1. Extracción de variables sabermétricas y contextuales con valores seguros por defecto
    pitcher_hand_home = match_data.get('pitcher_hand_home', 'R')
    pitcher_hand_away = match_data.get('pitcher_hand_away', 'R')
    
    # Splits ofensivos contra perfil de lanzador (LHP / RHP)
    splits_away_mult = 1.03 if pitcher_hand_home == 'L' else 1.00
    splits_home_mult = 1.03 if pitcher_hand_away == 'L' else 1.00
    
    # Fatiga y descanso del bullpen (Escala 0 a 100)
    bp_rest_home = match_data.get('bp_rest_home', 75)
    bp_rest_away = match_data.get('bp_rest_away', 75)
    bp_factor_home = 1.0 + ((bp_rest_home - 50) * 0.001)
    bp_factor_away = 1.0 + ((bp_rest_away - 50) * 0.001)
    
    # Factores climáticos y del parque
    wind_factor = match_data.get('wind_factor', 1.00)
    temp_factor = match_data.get('temp_factor', 1.00)
    weather_multiplier = wind_factor * temp_factor
    
    # Tendencia del Árbitro Home Plate (Umpire Bias)
    umpire_bias = match_data.get('umpire_bias', 'Neutral (Zona Estándar)')
    umpire_adj = -0.25 if 'Under' in umpire_bias else (0.25 if 'Over' in umpire_bias else 0.0)

    # Momentum Reciente (Últimos 10 partidos: Victorias de 0 a 10)
    l10_home = match_data.get('l10_home_wins', 5)
    l10_away = match_data.get('l10_away_wins', 5)
    momentum_home = (l10_home - 5) * 0.015  # Ajuste de rendimiento anímico
    momentum_away = (l10_away - 5) * 0.015

    # Fatiga por Viaje y Calendario (Schedule Fatigue: 0.95 a 1.00)
    schedule_home = match_data.get('travel_fatigue_home', 1.0)
    schedule_away = match_data.get('travel_fatigue_away', 1.0)

    # Medias ajustadas para las primeras 5 entradas (F5)
    f5_mean_away = (2.4 * splits_away_mult * weather_multiplier + momentum_away) * schedule_away
    f5_mean_home = (2.6 * splits_home_mult * weather_multiplier + momentum_home) * schedule_home

    for _ in range(iterations):
        # Simulación de las primeras 5 entradas
        f5_score_away = max(0, random.gauss(f5_mean_away, 1.15))
        f5_score_home = max(0, random.gauss(f5_mean_home, 1.15))
        
        if f5_score_away > f5_score_home:
            f5_away_wins += 1
        elif f5_score_home > f5_score_away:
            f5_home_wins += 1
        else:
            if random.random() > 0.5:
                f5_away_wins += 1
            else:
                f5_home_wins += 1

        # Simulación de relevos (Bullpen)
        bp_run_away = max(0, random.gauss(2.1, 1.0) * bp_factor_away)
        bp_run_home = max(0, (random.gauss(2.2, 1.0) * bp_factor_home) + umpire_adj)
        
        total_away = f5_score_away + bp_run_away
        total_home = f5_score_home + bp_run_home

        # Simulación Realista de Entradas Extras (Regla del Corredor en 2.ª Base)
        if abs(total_away - total_home) < 0.25:  # Empate virtual al 9no inning
            extra_innings_count += 1
            # Con corredor automático en 2da, la media de anotación en extra innings sube (~0.8 carreras por bando)
            extra_away = random.gauss(0.8, 0.6)
            extra_home = random.gauss(0.8, 0.6)
            total_away += extra_away
            total_home += extra_home

        # Conteo de Ganadores del Partido Completo
        if total_away > total_home:
            away_wins += 1
        else:
            home_wins += 1

        # Control de Márgenes de Victoria para Run Line (-1.5)
        margin = total_home - total_away
        if margin >= 1.5:
            home_cover_count += 1
        elif margin <= -1.5:
            away_cover_count += 1

    # Porcentajes finales de la simulación
    prob_away_pct = round((away_wins / iterations) * 100, 1)
    prob_home_pct = round((home_wins / iterations) * 100, 1)
    
    f5_away_pct = round((f5_away_wins / iterations) * 100, 1)
    f5_home_pct = round((f5_home_wins / iterations) * 100, 1)
    
    run_line_home_pct = round((home_cover_count / iterations) * 100, 1)
    run_line_away_pct = round((away_cover_count / iterations) * 100, 1)
    extra_innings_pct = round((extra_innings_count / iterations) * 100, 1)

    # Proyecciones exactas de carreras
    proj_score_away = round(f5_mean_away + 2.1, 1)
    proj_score_home = round(f5_mean_home + 2.2 + umpire_adj, 1)
    total_projected_runs = round(proj_score_away + proj_score_home, 1)

    # Cálculo de Valor y Edge (+EV) frente al mercado
    bookie_implied_prob_home = match_data.get('bookie_prob_home', 50.0)
    edge_value = round(prob_home_pct - bookie_implied_prob_home, 1)
    edge_label = f"+{edge_value}% Value (+EV)" if edge_value > 2.0 else ("Valor Neutro" if edge_value >= 0 else "Sin Valor / Riesgo")

    # --- Criterio de Kelly (Gestión de Bankroll Óptimo) ---
    # Convertimos la probabilidad implícita o cuota decimal del mercado (por defecto 1.90 / -110)
    bookie_decimal_odds = match_data.get('bookie_odds_home', 1.91)
    model_prob_decimal = prob_home_pct / 100.0
    q = 1.0 - model_prob_decimal
    b = bookie_decimal_odds - 1.0
    
    # Fórmula Kelly Completa: f* = (p * b - q) / b
    kelly_fraction = ((model_prob_decimal * b) - q) / b if b > 0 else 0
    # Aplicamos Half-Kelly (50% de Kelly) para mayor seguridad contra la varianza del béisbol
    safe_kelly_pct = round(max(0.0, kelly_fraction * 50.0), 1)
    kelly_recommendation = f"{safe_kelly_pct}% del Bankroll" if safe_kelly_pct > 0.5 else "Sin apuesta recomendada"

    return {
        "prob_away": prob_away_pct,
        "prob_home": prob_home_pct,
        "f5_away": f5_away_pct,
        "f5_home": f5_home_pct,
        "run_line_home": run_line_home_pct,
        "run_line_away": run_line_away_pct,
        "extra_innings_prob": extra_innings_pct,
        "projected_score_away": proj_score_away,
        "projected_score_home": proj_score_home,
        "total_projected_runs": total_projected_runs,
        "splits_advantage": f"Favorece {'Local' if splits_home_mult > splits_away_mult else 'Visitante'}",
        "bullpen_advantage": "Local Superior" if bp_rest_home > bp_rest_away + 10 else ("Visitante Superior" if bp_rest_away > bp_rest_home + 10 else "Equilibrado"),
        "weather_impact": f"{'Viento a Favor (Overs)' if wind_factor > 1.02 else ('Viento en Contra (Unders)' if wind_factor < 0.98 else 'Clima Neutral')}",
        "umpire_tendency": umpire_bias,
        "momentum_status": f"Local ({l10_home}-10) vs Vis ({l10_away}-10)",
        "kelly_criterion": kelly_recommendation,
        "edge_metrics": edge_label,
        "edge_numeric": edge_value
    }

def process_all_matches(matches_list):
    processed_matches = []
    for match in matches_list:
        sim_results = run_monte_carlo_simulation(match, iterations=50000)
        match_updated = match.copy()
        match_updated.update(sim_results)
        processed_matches.append(match_updated)
    return processed_matches
