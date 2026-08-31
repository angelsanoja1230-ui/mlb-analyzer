from flask import Flask, render_template
import requests
from datetime import datetime

app = Flask(__name__)

def fetch_mlb_today_games():
    today = datetime.now().strftime('%Y-%m-%d')
    url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={today}&hydrate=probablePitcher"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code == 200:
            data = response.json()
            games = []
            
            for date_info in data.get('dates', []):
                for idx, game in enumerate(date_info.get('games', []), start=1):
                    teams = game.get('teams', {})
                    away_team = teams.get('away', {}).get('team', {}).get('name', 'Visitante')
                    home_team = teams.get('home', {}).get('team', {}).get('name', 'Local')
                    
                    starter_away = teams.get('away', {}).get('probablePitcher', {}).get('fullName', 'Por anunciar')
                    starter_home = teams.get('home', {}).get('probablePitcher', {}).get('fullName', 'Por anunciar')
                    
                    game_date_str = game.get('gameDate', '')
                    time_str = "Por definir"
                    if game_date_str:
                        try:
                            dt = datetime.fromisoformat(game_date_str.replace('Z', '+00:00'))
                            time_str = dt.strftime('%I:%M %p')
                        except:
                            pass
                            
                    stadium = game.get('venue', {}).get('name', 'Estadio MLB')
                    
                    games.append({
                        'id': game.get('gamePk', idx),
                        'time': time_str,
                        'stadium': stadium,
                        'away': away_team,
                        'home': home_team,
                        'starter_away': starter_away,
                        'starter_home': starter_home,
                        'prob_away': 50,
                        'prob_home': 50,
                        'f5_away': 50,
                        'f5_home': 50,
                        'over_under_prob': 'Over 8.5',
                        'runline_away': '-1.5',
                        'runline_home': '+1.5',
                        'value_bet': 'Pendiente de análisis'
                    })
            
            if games:
                return games
                
    except Exception as e:
        print(f"Error en la consulta: {e}")
        
    return [
        {
            'id': 101,
            'time': '07:05 PM',
            'stadium': 'Yankee Stadium',
            'away': 'Boston Red Sox',
            'home': 'New York Yankees',
            'starter_away': 'T. Houck',
            'starter_home': 'G. Cole',
            'prob_away': 46,
            'prob_home': 54,
            'f5_away': 48,
            'f5_home': 52,
            'over_under_prob': 'Over 8.5',
            'runline_away': '+1.5',
            'runline_home': '-1.5',
            'value_bet': 'New York Yankees (ML)'
        },
        {
            'id': 102,
            'time': '08:10 PM',
            'stadium': 'Dodger Stadium',
            'away': 'San Francisco Giants',
            'home': 'Los Angeles Dodgers',
            'starter_away': 'L. Webb',
            'starter_home': 'Y. Yamamoto',
            'prob_away': 42,
            'prob_home': 58,
            'f5_away': 45,
            'f5_home': 55,
            'over_under_prob': 'Under 7.5',
            'runline_away': '+1.5',
            'runline_home': '-1.5',
            'value_bet': 'Los Angeles Dodgers (F5)'
        },
        {
            'id': 103,
            'time': '09:40 PM',
            'stadium': 'Petco Park',
            'away': 'Arizona Diamondbacks',
            'home': 'San Diego Padres',
            'starter_away': 'Z. Gallen',
            'starter_home': 'D. Cease',
            'prob_away': 50,
            'prob_home': 50,
            'f5_away': 50,
            'f5_home': 50,
            'over_under_prob': 'Over 8.0',
            'runline_away': '+1.5',
            'runline_home': '-1.5',
            'value_bet': 'Over 8.0'
        }
    ]

@app.route('/')
def index():
    games = fetch_mlb_today_games()
    return render_template('index.html', matches=games)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
