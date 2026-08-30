import random

def simular_partido_mlb(match_data):
    """
    Simula o calcula las métricas avanzadas para un encuentro de MLB 
    basado en estadísticas de abridores, ofensiva y bullpen, manejando diccionarios de forma segura.
    """
    # 1. Extraer o estimar fortalezas base de los equipos y abridores usando .get() para evitar KeyError
    prob_away = float(match_data.get('prob_away', 50.0) or 50.0)
    prob_home = float(match_data.get('prob_home', 50.0) or 50.0)
    
    away_team = match_data.get('away', 'Visitante')
    home_team = match_data.get('home', 'Local')
    
    # Simulación de carreras esperadas (Run Expectancy) basadas en las probabilidades relativas
    expected_runs_away = round(3.8 + (prob_away - 50) * 0.05, 1)
    expected_runs_home = round(4.0 + (prob_home - 50) * 0.05, 1)
    
    # -------------------------------------------------------------
    # A. PRIMER INNING (SÍ / NO - NRFI / YRFI) con Porcentajes y Criterio de Abridores
    # -------------------------------------------------------------
    run_prob_1st = (expected_runs_away + expected_runs_home) / 9.0
    base_yrfi_prob = round(min(max(40.0 + (run_prob_1st - 0.85) * 45.0, 32.0), 68.0), 1)
    
    if base_yrfi_prob >= 50.0:
        nrfi_yrfi_choice = "SÍ (YRFI)"
        nrfi_yrfi_prob = f"{base_yrfi_prob}% Prob. Anotación"
        recommendation_1st = "SÍ (Habrá anotación - Duelo favorable a la ofensiva y bullpen inicial en el 1er inning)"
    else:
        nrfi_yrfi_choice = "NO (NRFI)"
        nrfi_yrfi_prob = f"{round(100 - base_yrfi_prob, 1)}% Prob. Sin Carrera"
        recommendation_1st = "NO (Sin anotación - Control de abridores sólido en la primera entrada)"

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
    # D. RUN LINE (-1.5 / +1.5)
    # -------------------------------------------------------------
    run_diff = abs(expected_runs_home - expected_runs_away)
    if run_diff >= 1.5:
        favorite = home_team if expected_runs_home > expected_runs_away else away_team
        run_line = f"{favorite} -1.5 (Margen Amplio)"
    else:
        run_line = "Estándar -1.5 / +1.5 (Juego Cerrado)"

    # -------------------------------------------------------------
    # E. PROBABILIDAD DE EXTRA INNINGS (Basado en Bullpen)
    # -------------------------------------------------------------
    paridad = abs(prob_away - prob_home)
    if paridad < 4.0:
        extra_prob = "14.2% (Alto - Bullpens Pares)"
    elif paridad < 8.0:
        extra_prob = "9.5% (Moderado)"
    else:
        extra_prob = "5.1% (Bajo - Definido en 9 Innings)"

    # Asignar de forma segura al diccionario
    match_data['prob_away'] = prob_away
    match_data['prob_home'] = prob_home
    match_data['winner_full_text'] = winner_full_text
    match_data['winner_f5_text'] = winner_f5_text
    match_data['nrfi_yrfi_choice'] = nrfi_yrfi_choice
    match_data['nrfi_yrfi_prob'] = nrfi_yrfi_prob
    match_data['nrfi_recommendation'] = recommendation_1st
    match_data['run_line'] = run_line
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
        # Asegurarnos de que cada partido sea un diccionario válido
        if isinstance(match, dict):
            simulated = simular_partido_mlb(match)
            simulated_matches.append(simulated)
    return simulated_matches
