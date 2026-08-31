import requests
from datetime import datetime

def fetch_mlb_today_games():
    # Usamos la API pública de ESPN para el scoreboard de la MLB, que es mucho más estable y robusta
    url = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard"
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            games = []
            
            for event in data.get('events', []):
                competition = event.get('competitions', [{}])[0]
                
                # Equipos (Local y Visitante)
                competitors = competition.get('competitors', [])
                away_team = "Visitor"
                home_team = "Home"
                starter_away = "Por anunciar"
                starter_home = "Por anunciar"
                
                for comp in competitors:
                    team_name = comp.get('team', {}).get('displayName', 'Equipo')
                    is_home = comp.get('homeAway') == 'home'
                    
                    if is_home:
                        home_team = team_name
                    else:
                        away_team = team_name
                        
                    # Extraer pitchers probables si vienen en la respuesta
                    for probable in comp.get('probables', []):
                        pitcher_name = probable.get('athlete', {}).get('fullName')
                        if pitcher_name:
                            if is_home:
                                starter_home = pitcher_name
                            else:
                                starter_away = pitcher_name
                
                # Hora del partido
                date_str = event.get('date', '')
                time_str = "Por definir"
                if date_str:
                    dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                    time_str = dt.strftime('%I:%M %p')
                    
                # Estadio
                venue = competition.get('venue', {}).get('fullName', 'Estadio MLB')
                
                games.append({
                    'id': event.get('id', 1),
                    'time': time_str,
                    'stadium': venue,
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
        print(f"Error al conectar con la API alternativa: {e}")
        
    return []
