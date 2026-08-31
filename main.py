from flask import Flask, render_template
import json
import os
import requests
from datetime import datetime
from simulator import process_all_matches

app = Flask(__name__)

CACHE = {
    'date': None,
    'matches': [],
    'team_logos': {},
    'DAILY_ARCHIVE': {}
}

def fetch_mlb_today_games():
    today = datetime.now().strftime('%Y-%m-%d')
    url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={today}"
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            games = []
            
            for date_info in data.get('dates', []):
                for idx, game in enumerate(date_info.get('games', []), start=1):
                    away_team = game['teams']['away']['team']['name']
                    home_team = game['teams']['home']['team']['name']
                    
                    # Convertir hora UTC a formato legible (o conservar para ajustar en España/local)
                    game_date_str = game.get('gameDate', '')
                    time_str = "Por definir"
                    if game_date_str:
                        dt = datetime.fromisoformat(game_date_str.replace('Z', '+00:00'))
                        time_str = dt.strftime('%I:%M %p')
                        
                    stadium = game.get('venue', {}).get('name', 'Estadio MLB')
                    
                    games.append({
                        'id': game.get('gamePk', idx),
                        'time': time_str,
                        'stadium': stadium,
                        'away': away_team,
                        'home': home_team,
                        'starter_away': "Por anunciar",
                        'starter_home': "Por anunciar",
                        'awayOdds': 1.90,
                        'homeOdds': 1.90,
                        'defaultHcap': '-1.5'
                    })
            return games
    except Exception as e:
        print(f"Error al conectar con la API de MLB: {e}")
        
    return []

def get_cached_data():
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Si cambia el día o está vacío, actualizamos consultando la API de la MLB
    if CACHE['date'] != today or not CACHE['matches']:
        api_matches = fetch_mlb_today_games()
        
        # Fallback a data.json si la API falla o no hay partidos hoy
        if not api_matches and os.path.exists('data.json'):
            with open('data.json', 'r', encoding='utf-8') as f:
                local_data = json.load(f)
                api_matches = local_data.get('matches', [])
                CACHE['team_logos'] = local_data.get('team_logos', {})
                CACHE['DAILY_ARCHIVE'] = local_data.get('DAILY_ARCHIVE', {})
        
        CACHE['matches'] = process_all_matches(api_matches)
        CACHE['date'] = today
        
    return CACHE['matches'], CACHE['team_logos'], CACHE['DAILY_ARCHIVE']

@app.route('/')
def index():
    matches, team_logos, daily_archive = get_cached_data()
    
    return render_template(
        'index.html', 
        matches=matches, 
        team_logos=team_logos, 
        DAILY_ARCHIVE=daily_archive
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
