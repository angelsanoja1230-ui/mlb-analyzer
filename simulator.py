import random

def run_monte_carlo_simulation(match_data, iterations=500000):
    away_wins = 0
    home_wins = 0
    f5_away_wins = 0
    f5_home_wins = 0
    extra_innings_count = 0
    
    # Extraer factores sabermétricos con valores por defecto seguros
    pitcher_hand_home = match_data.get('pitcher_hand_home', 'R')
    pitcher_hand_away = match_data.get('pitcher_hand_away', 'R')
    
    # Splits ofensivos contra el perfil del lanzador abridor (LHP / RHP)
    splits_away_mult = 1.03 if pitcher_hand_home == 'L' else 1.00
    splits_home_mult = 1.03 if pitcher_hand_away == 'L' else 1.00
    
    # Fatiga y descanso del bullpen (escala 0 a 100)
    bp_rest_home = match_data.get('bp_rest_home', 75)
    bp_rest_away = match_data.get('bp_rest_away', 75)
    bp_factor_home = 1.0 + ((bp_rest_home - 50) * 0.001)
    bp_factor_away = 1.0 + ((bp_rest_away - 50) * 0.001)
    
    # Impacto climático y parque
    wind_factor = match_data.get('wind_factor', 1.00)
    temp_factor = match_data.get('temp_factor', 1.00)
    weather_multiplier = wind_factor * temp_factor
    
    # Tendencia del Árbitro Home Plate (Umpire Bias)
    umpire_bias = match_data.get('umpire_bias', 'Neutral (Zona Estándar)')
    umpire_adj = -0.25 if 'Under' in umpire_bias else (0.25 if 'Over' in umpire_bias else 0.0)

    # Medias ajustadas para las distribuciones normales de las primeras 5 entradas
    f5_mean_away = 2.4 * splits_away_mult * weather_multiplier
    f5_mean_home = 2.6 * splits_home_mult * weather_multiplier

    for _ in range(iterations):
        f5_score_away = random.gauss(f5_mean_away, 1.15)
        f5_score_home = random.gauss(f5_mean_home, 1.15)
        
        if f5_score_away > f5_score_home:
            f5_away_wins += 1
        elif f5_score_home > f5_score_away:
            f5_home_wins += 1
        else:
            if random.random() > 0.5:
                f5_away_wins += 1
            else:
                f5_home_wins += 1

        # Relevos ajustados por fatiga de bullpen e influencia del árbitro en el total
        bp_run_away = random.gauss(2.1, 1.0) * bp_factor_away
        bp_run_home = (random.gauss(2.2, 1.0) * bp_factor_home) + umpire_adj
        
        total_away = f5_score_away + max(0.5, bp_run_away)
        total_home = f5_score_home + max(0.5, bp_run_home)

        if abs(total_away - total_home) < 0.35:
            extra_innings_count += 1
            if random.random() > 0.5:
                total_away += 0.5
            else:
                total_home += 0.5

        if total_away > total_home:
            away_wins += 1
        else:
            home_wins += 1

    prob_away_pct = round((away_wins / iterations) * 100)
    prob_home_pct = round((home_wins / iterations) * 100)
    
    # Carreras proyectadas para mostrar en la interfaz
    proj_score_away = round(f5_mean_away + 2.1, 1)
    proj_score_home = round(f5_mean_home + 2.2 + umpire_adj, 1)
    total_projected_runs = round(proj_score_away + proj_score_home, 1)

    # Cálculo de Ventaja Matemática / Edge (+EV) frente a la línea de apuestas
    bookie_implied_prob_home = match_data.get('bookie_prob_home', 50.0)
    edge_value = round(prob_home_pct - bookie_implied_prob_home, 1)
    edge_label = f"+{edge_value}% Value (+EV)" if edge_value > 2.0 else ("Valor Neutro" if edge_value >= 0 else "Sin Valor / Riesgo")

    return {
        "prob_away": prob_away_pct,
        "prob_home": prob_home_pct,
        "f5_away": round((f5_away_wins / iterations) * 100),
        "f5_home": round((f5_home_wins / iterations) * 100),
        "extra_innings_yes": round((extra_innings_count / iterations) * 100),
        "extra_innings_no": round(100 - (extra_innings_count / iterations) * 100),
        "projected_score_away": proj_score_away,
        "projected_score_home": proj_score_home,
        "total_projected_runs": total_projected_runs,
        "splits_advantage": f"Favorece {'Local' if splits_home_mult > splits_away_mult else 'Visitante'}",
        "bullpen_advantage": "Local Superior" if bp_rest_home > bp_rest_away + 10 else ("Visitante Superior" if bp_rest_away > bp_rest_home + 10 else "Equilibrado"),
        "weather_impact": f"{'Viento a Favor (Overs)' if wind_factor > 1.02 else ('Viento en Contra (Unders)' if wind_factor < 0.98 else 'Clima Neutral')}",
        "umpire_tendency": umpire_bias,
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
