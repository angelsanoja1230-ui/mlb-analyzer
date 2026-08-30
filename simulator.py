import random

def run_monte_carlo_simulation(match_data, iterations=1000):
    away_wins = 0
    home_wins = 0
    f5_away_wins = 0
    f5_home_wins = 0
    extra_innings_count = 0

    for _ in range(iterations):
        f5_score_away = random.gauss(2.4, 1.15)
        f5_score_home = random.gauss(2.6, 1.15)
        
        if f5_score_away > f5_score_home:
            f5_away_wins += 1
        elif f5_score_home > f5_score_away:
            f5_home_wins += 1
        else:
            if random.random() > 0.5:
                f5_away_wins += 1
            else:
                f5_home_wins += 1

        bullpen_fatigue = random.uniform(0.96, 1.04)
        total_away = f5_score_away + (random.gauss(2.1, 1.0) * bullpen_fatigue)
        total_home = f5_score_home + (random.gauss(2.2, 1.0) * bullpen_fatigue)

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

    return {
        "prob_away": round((away_wins / iterations) * 100),
        "prob_home": round((home_wins / iterations) * 100),
        "f5_away": round((f5_away_wins / iterations) * 100),
        "f5_home": round((f5_home_wins / iterations) * 100),
        "extra_innings_yes": round((extra_innings_count / iterations) * 100),
        "extra_innings_no": round(100 - (extra_innings_count / iterations) * 100)
    }

def process_all_matches(matches_list):
    processed_matches = []
    for match in matches_list:
        sim_results = run_monte_carlo_simulation(match, iterations=1000)
        match_updated = match.copy()
        match_updated.update(sim_results)
        processed_matches.append(match_updated)
    return processed_matches
        match_updated.update(sim_results)
        processed_matches.append(match_updated)
    return processed_matches
