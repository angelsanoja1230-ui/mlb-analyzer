from flask import Flask, render_template
import json
import os
from simulator import process_all_matches

app = Flask(__name__)

# Caché en memoria para evitar recalcular en cada F5
cache = {
    'mtime': None,
    'simulated_matches': [],
    'team_logos': {},
    'DAILY_ARCHIVE': {}
}

def get_cached_data():
    if os.path.exists('data.json'):
        current_mtime = os.path.getmtime('data.json')
        
        # Si el archivo no ha cambiado, devolvemos los datos cacheados
        if cache['mtime'] == current_mtime:
            return cache['simulated_matches'], cache['team_logos'], cache['DAILY_ARCHIVE']
        
        # Si cambió (o es la primera vez), leemos y simulamos
        with open('data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        raw_matches = data.get('matches', [])
        
        # Aquí ocurre el cálculo pesado, pero ahora solo se ejecuta si data.json se actualiza
        cache['simulated_matches'] = process_all_matches(raw_matches)
        cache['team_logos'] = data.get('team_logos', {})
        cache['DAILY_ARCHIVE'] = data.get('DAILY_ARCHIVE', {})
        cache['mtime'] = current_mtime
        
    return cache['simulated_matches'], cache['team_logos'], cache['DAILY_ARCHIVE']

@app.route('/')
def index():
    simulated_matches, team_logos, daily_archive = get_cached_data()
    
    return render_template(
        'index.html', 
        matches=simulated_matches, 
        team_logos=team_logos, 
        DAILY_ARCHIVE=daily_archive
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
