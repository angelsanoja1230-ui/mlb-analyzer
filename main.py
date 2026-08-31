import requests
from datetime import datetime

def fetch_mlb_today_games():
    today = datetime.now().strftime('%Y-%m-%d')
    # Añadimos hydrate=probablePitcher para que la API nos devuelva los abridores oficiales
    url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={today}&hydrate=probablePitcher"
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            games = []
            
            for date_info in data.get('dates', []):
                for idx, game in enumerate(date_info.get('games', []), start=1):
                    away_team = game['teams']['away']['team']['name']
                    home_team = game['teams']['home']['team']['name']
                    
                    # Extraer pitchers abridores reales de la API oficial
                    starter_away = game['teams']['away'].get('probablePitcher', {}).get('fullName', 'Por anunciar')
                    starter_home = game['teams']['home'].get('probablePitcher', {}).get('fullName', 'Por anunciar')
                    
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
            return games
    except Exception as e:
        print(f"Error al conectar con la API de la MLB: {e}")
        
    return []
