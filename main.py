from flask import Flask, render_template
import json
import os
from simulator import process_all_matches

app = Flask(__name__)

VISIT_FILE = "visits.txt"

def get_visit_count():
    if not os.path.exists(VISIT_FILE):
        return 0
    try:
        with open(VISIT_FILE, "r", encoding="utf-8") as f:
            content = f.read().strip()
            return int(content) if content.isdigit() else 0
    except:
        return 0

def increment_visit_count():
    count = get_visit_count() + 1
    try:
        with open(VISIT_FILE, "w", encoding="utf-8") as f:
            f.write(str(count))
    except:
        pass
    return count

def load_data():
    if os.path.exists('data.json'):
        try:
            with open('data.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            pass
    return {}

def extract_best_plays(simulated_matches):
    """Filtra y genera dinámicamente las mejores jugadas basadas en las probabilidades del simulador."""
    best_plays = []
    for match in simulated_matches:
        prob_away = match.get('prob_away', 50)
        prob_home = match.get('prob_home', 50)
        
        # Determinar el favorito matemático según Monte Carlo
        if prob_away >= 55:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"Ganador 9 Innings: {match['away']}",
                "confidence": f"{prob_away}% Probabilidad",
                "type": "Moneyline Visitante",
                "reason": match.get('value_bet', 'Alta ventaja proyectada por simulación Monte Carlo.')
            })
        elif prob_home >= 55:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"Ganador 9 Innings: {match['home']}",
                "confidence": f"{prob_home}% Probabilidad",
                "type": "Moneyline Local",
                "reason": match.get('value_bet', 'Alta ventaja proyectada por simulación Monte Carlo.')
            })
            
        # Revisar F5 (Primeros 5 innings) si hay tendencia clara
        f5_away = match.get('f5_away', 50)
        f5_home = match.get('f5_home', 50)
        if f5_away >= 56:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"F5 (Primeros 5 Innings): {match['away']}",
                "confidence": f"{f5_away}% Probabilidad F5",
                "type": "First 5 Innings",
                "reason": f"Sólido rendimiento del abridor visitante {match.get('starter_away', '')} en la primera mitad."
            })
        elif f5_home >= 56:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"F5 (Primeros 5 Innings): {match['home']}",
                "confidence": f"{f5_home}% Probabilidad F5",
                "type": "First 5 Innings",
                "reason": f"Sólido rendimiento del abridor local {match.get('starter_home', '')} en la primera mitad."
            })
            
    return best_plays

@app.route('/')
def index():
    try:
        total_visits = increment_visit_count()
        data = load_data()
        raw_matches = data.get('matches', [])
        simulated_matches = process_all_matches(raw_matches)
        
        # Extraer las mejores jugadas calculadas
        best_plays = extract_best_plays(simulated_matches)
        
        return render_template(
            'index.html', 
            matches=simulated_matches, 
            team_logos=data.get('team_logos', {}), 
            DAILY_ARCHIVE=data.get('DAILY_ARCHIVE', {}),
            best_plays=best_plays,
            visits=total_visits
        )
    except Exception as e:
        return f"Error interno en la aplicación: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
