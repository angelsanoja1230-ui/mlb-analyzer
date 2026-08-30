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

@app.route('/')
def index():
    try:
        total_visits = increment_visit_count()
        data = load_data()
        raw_matches = data.get('matches', [])
        simulated_matches = process_all_matches(raw_matches)
        
        return render_template(
            'index.html', 
            matches=simulated_matches, 
            team_logos=data.get('team_logos', {}), 
            DAILY_ARCHIVE=data.get('DAILY_ARCHIVE', {}),
            visits=total_visits
        )
    except Exception as e:
        return f"Error interno en la aplicación: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
