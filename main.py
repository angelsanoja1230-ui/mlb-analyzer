from flask import Flask, render_template
import json
import os
from simulator import process_all_matches

app = Flask(__name__)

def load_data():
    if os.path.exists('data.json'):
        with open('data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

@app.route('/')
def index():
    data = load_data()
    raw_matches = data.get('matches', [])
    simulated_matches = process_all_matches(raw_matches)
    
    return render_template(
        'index.html', 
        matches=simulated_matches, 
        team_logos=data.get('team_logos', {}), 
        DAILY_ARCHIVE=data.get('DAILY_ARCHIVE', {})
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)