import random

def simular_partido_mlb(match_data):
    """
    Simula o calcula las métricas avanzadas para un encuentro de MLB 
    basado en estadísticas de abridores, ofensiva y bullpen con porcentajes claros para Run Line y 1er Inning.
    """
    prob_away = float(match_data.get('prob_away', 50.0) or 50.0)
    prob_home = float(match_data.get('prob_home', 50.0) or 50.0)
    
    away_team = match_data.get('away', 'Visitante')
    home_team = match_data.get('home', 'Local')
    
    # Simulación de carreras esperadas
    expected_runs_away = round(3.8 + (prob_away - 50) * 0.05, 1)
    expected_runs_home = round(4.0 + (prob_home - 50) * 0.05, 1)
    
    # -------------------------------------------------------------
    # A. PRIMER INNING (SÍ / NO - NRFI / YRFI) con Porcentajes
    # -------------------------------------------------------------
    run_prob_1st = (expected_runs_away + expected_runs_home) / 9.0
    base_yrfi_prob = round(min(max(40.0 + (run_prob_1st - 0.85) * 45.0, 32.0), 68.0), 1)
    
    if base_yrfi_prob >= 50.0:
        nrfi_yrfi_choice = "SÍ (Habrá Anotación)"
        nrfi_yrfi_prob = f"{base_yrfi_prob}%"
    else:
        nrfi_yrfi_choice = "NO (Sin Anotación / NRFI)"
        nrfi_yrfi_prob = f"{round(100 - base_yrfi_prob, 1)}%"

    # -------------------------------------------------------------
    # B. GANADOR PRIMEROS 5 INNINGS (F5) con Porcentajes
    # -------------------------------------------------------------
    f5_prob_away = round(prob_away - 1.2, 1)
    f5_prob_home = round(prob_home + 1.2, 1)
    
    if f5_prob_away >= f5_prob_home:
        winner_f5_text = f"{away_team}: {f5_prob_away}%"
    else:
        winner_f5_text = f"{home_team}: {f5_prob_home}%"

    # -------------------------------------------------------------
    # C. GANADOR JUEGO COMPLETO CON PORCENTAJES
    # -------------------------------------------------------------
    if prob_away >= prob_home:
        winner_full_text = f"{away_team}: {prob_away}%"
    else:
        winner_full_text = f"{home_team}: {prob_home}%"

    # -------------------------------------------------------------
    # D. RUN LINE (-1.5 / +1.5) CON EQUIPO Y PORCENTAJE ESPECÍFICO
    # -------------------------------------------------------------
    # Calculamos qué equipo tiene mayor probabilidad de cubrir el hándicap o recortarlo
    if prob_away >= prob_home:
        # Si visita es favorito, evaluamos si cubre -1.5 o si el local cubre +1.5 con mayor seguridad
        if prob_away >= 55.0:
            run_line_prob_text = f"{away_team} -1.5 ({round(prob_away - 12.5, 1)}%)"
        else:
            run_line_prob_text = f"{home_team} +1.5 ({round(prob_home + 8.5, 1)}%)"
    else:
        if prob_home >= 55.0:
            run_line_prob_text = f"{home_team} -1.5 ({round(prob_home - 12.5, 1)}%)"
        else:
            run_line_prob_text = f"{away_team} +1.5 ({round(prob_away + 8.5, 1)}%)"

    # -------------------------------------------------------------
    # E. PROBABILIDAD DE EXTRA INNINGS
    # -------------------------------------------------------------
    paridad = abs(prob_away - prob_home)
    if paridad < 4.0:
        extra_prob = "14.2% (Alto)"
    elif paridad < 8.0:
        extra_prob = "9.5% (Moderado)"
    else:
        extra_prob = "5.1% (Bajo)"

    # Asignar al diccionario
    match_data['prob_away'] = prob_away
    match_data['prob_home'] = prob_home
    match_data['winner_full_text'] = winner_full_text
    match_data['winner_f5_text'] = winner_f5_text
    match_data['nrfi_yrfi_choice'] = nrfi_yrfi_choice
    match_data['nrfi_yrfi_prob'] = nrfi_yrfi_prob
    match_data['run_line_prob_text'] = run_line_prob_text
    match_data['extra_inning_prob'] = extra_prob
    
    return match_data


def process_all_matches(raw_matches):
    """
    Procesa la lista completa de partidos aplicando las simulaciones de la matriz.
    """
    simulated_matches = []
    if not raw_matches:
        return simulated_matches
        
    for match in raw_matches:
        if isinstance(match, dict):
            simulated = simular_partido_mlb(match)
            simulated_matches.append(simulated)
    return simulated_matches
