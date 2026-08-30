from flask import Flask, render_template
import json
import os
from datetime import datetime
from simulator import process_all_matches

app = Flask(__name__)

VISIT_FILE = "visits.txt"
HISTORY_FILE = "history.json"

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

def load_history():
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            pass
    return []

def save_daily_history(date_str, safest_pick, parlays):
    history = load_history()
    
    # Verificar si la fecha de hoy ya está guardada para no duplicar en la misma sesión
    entry_exists = any(item.get('date') == date_str for item in history)
    
    if not entry_exists and safest_pick:
        new_entry = {
            "date": date_str,
            "safest_pick": safest_pick,
            "parlays": parlays,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        history.insert(0, new_entry) # Agregar al inicio
        try:
            with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
                json.dump(history, f, ensure_ascii=False, indent=4)
        except:
            pass
            
    return history

def extract_best_plays(simulated_matches):
    best_plays = []
    for match in simulated_matches:
        prob_away = match.get('prob_away', 50)
        prob_home = match.get('prob_home', 50)
        
        if prob_away >= 55:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"Ganador: {match['away']}",
                "confidence": prob_away,
                "confidence_str": f"{prob_away}% Probabilidad",
                "type": "Moneyline Visitante",
                "reason": match.get('value_bet', 'Alta ventaja proyectada por simulación Monte Carlo.')
            })
        elif prob_home >= 55:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"Ganador: {match['home']}",
                "confidence": prob_home,
                "confidence_str": f"{prob_home}% Probabilidad",
                "type": "Moneyline Local",
                "reason": match.get('value_bet', 'Alta ventaja proyectada por simulación Monte Carlo.')
            })
            
        f5_away = match.get('f5_away', 50)
        f5_home = match.get('f5_home', 50)
        if f5_away >= 56:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"F5: {match['away']}",
                "confidence": f5_away,
                "confidence_str": f"{f5_away}% Probabilidad F5",
                "type": "First 5 Innings",
                "reason": f"Sólido rendimiento del abridor visitante {match.get('starter_away', '')}."
            })
        elif f5_home >= 56:
            best_plays.append({
                "match": f"{match['away']} @ {match['home']}",
                "pick": f"F5: {match['home']}",
                "confidence": f5_home,
                "confidence_str": f"{f5_home}% Probabilidad F5",
                "type": "First 5 Innings",
                "reason": f"Sólido rendimiento del abridor local {match.get('starter_home', '')}."
            })
            
    best_plays.sort(key=lambda x: x['confidence'], reverse=True)
    return best_plays

def generate_parlays_and_safe_pick(best_plays):
    safest_pick = best_plays[0] if best_plays else None
    
    parlays = {}
    if len(best_plays) >= 2:
        parlays['2'] = best_plays[:2]
    if len(best_plays) >= 3:
        parlays['3'] = best_plays[:3]
    if len(best_plays) >= 4:
        parlays['4'] = best_plays[:4]
    if len(best_plays) >= 5:
        parlays['5'] = best_plays[:5]
        
    return safest_pick, parlays

@app.route('/')
def index():
    try:
        total_visits = increment_visit_count()
        data = load_data()
        raw_matches = data.get('matches', [])
        simulated_matches = process_all_matches(raw_matches)
        
        best_plays = extract_best_plays(simulated_matches)
        safest_pick, parlays = generate_parlays_and_safe_pick(best_plays)
        
        daily_archive_data = data.get('DAILY_ARCHIVE', {})
        date_str = daily_archive_data.get('date', datetime.now().strftime('%Y-%m-%d'))
        
        # Guardar en el histórico persistente (history.json)
        full_history = save_daily_history(date_str, safest_pick, parlays)
        
        return render_template(
            'index.html', 
            matches=simulated_matches, 
            team_logos=data.get('team_logos', {}), 
            DAILY_ARCHIVE=daily_archive_data,
            best_plays=best_plays,
            safest_pick=safest_pick,
            parlays=parlays,
            history=full_history,
            visits=total_visits
        )
    except Exception as e:
        return f"Error interno en la aplicación: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
