import random

def simular_partido_mlb(match_data):
    """
    Simula o calcula las métricas avanzadas para un encuentro de MLB 
    basado en estadísticas de abridores, ofensiva y bullpen.
    """
    # 1. Extraer o estimar fortalezas base de los equipos y abridores
    prob_away = match_data.get('prob_away', 50.0)
    prob_home = match_data.get('prob_home', 50.0)
    
    # Simulación de carreras esperadas (Run Expectancy) basadas en las probabilidades relativas
    expected_runs_away = round(3.8 + (prob_away - 50) * 0.05, 1)
    expected_runs_home = round(4.0 + (prob_home - 50) * 0.05, 1)
    
    # -------------------------------------------------------------
    # A. PRIMER INNING (NRFI / YRFI)
    # Depende de la efectividad estimada de los abridores en el 1er inning
    # -------------------------------------------------------------
    # Supongamos que evaluamos el promedio de carreras en el inning 1
    run_prob_1st = (expected_runs_away + expected_runs_home) / 9.0
    if run_prob_1st > 0.95:
        nrfi_yrfi = "YRFI Proyectado (Alta)"
    else:
        nrfi_yrfi = "NRFI Proyectado (Seguro)"

    # -------------------------------------------------------------
    # B. GANADOR PRIMEROS 5 INNINGS (F5)
    # Ponderado fuertemente por el rendimiento de los abridores
    # -------------------------------------------------------------
    f5_prob_diff = prob_away - prob_home
    if abs(f5_prob_diff) < 3.0:
        f5_winner = f"{match_data.get('home', 'Local')} (Leve Ventaja F5)"
    elif prob_away > prob_home:
        f5_winner = f"{match_data.get('away', 'Visita')} (F5 Sólido)"
    else:
        f5_winner = f"{match_data.get('home', 'Local')} (F5 Sólido)"

    # -------------------------------------------------------------
    # C. RUN LINE (-1.5 / +1.5)
    # Determinado por la diferencia de carreras proyectadas
    # -------------------------------------------------------------
    run_diff = abs(expected_runs_home - expected_runs_away)
    if run_diff >= 1.5:
        favorite = match_data.get('home') if expected_runs_home > expected_runs_away else match_data.get('away')
        run_line = f"{favorite} -1.5 (Margen Amplio)"
    else:
        run_line = "Juego Cerrado (+1.5 / -1.5 Rizado)"

    # -------------------------------------------------------------
    # D. PROBABILIDAD DE EXTRA INNINGS (Basado en Bullpen)
    # Si la diferencia de probabilidades es menor al 6%, aumenta el riesgo de empate
    # -------------------------------------------------------------
    paridad = abs(prob_away - prob_home)
    if paridad < 4.0:
        extra_prob = "14.2% (Alto - Bullpens Pares)"
    elif paridad < 8.0:
        extra_prob = "9.5% (Moderado)"
    else:
        extra_prob = "5.1% (Bajo - Definido en 9 Innings)"

    # Agregar los nuevos campos al diccionario del partido
    match_data['nrfi_yrfi'] = nrfi_yrfi
    match_data['f5_winner'] = f5_winner
    match_data['run_line'] = run_line
    match_data['extra_inning_prob'] = extra_prob
    
    return match_data
