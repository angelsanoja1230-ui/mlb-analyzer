from flask import Flask, render_template
import requests
from datetime import datetime

app = Flask(__name__)

def advanced_simulate_game(game_data):
    home = game_data.get('home', 'Local')
    away = game_data.get('away', 'Visitante')
    starter_home = game_data.get('starter_home', 'Por anunciar')
    starter_away = game_data.get('starter_away', 'Por anunciar')
    stadium = game_data.get('stadium', 'Estadio MLB')
    game_id = game_data.get('id', 100)

    aces = ['G. Cole', 'L. Webb', 'Z. Gallen', 'Y. Yamamoto', 'Corbin Burnes', 'Spencer Strider', 'S. Bieber', 'Z. Wheeler', 'P. Corbin']
    
    home_is_ace = any(ace.lower() in starter_home.lower() for ace in aces)
    away_is_ace = any(ace.lower() in starter_away.lower() for ace in aces)

    f5_home_prob = 50
    if home_is_ace: f5_home_prob += 12
    if away_is_ace: f5_home_prob -= 12
    f5_home_prob += ((game_id * 7) % 15) - 7 
    f5_home_prob = max(30, min(70, f5_home_prob))
    f5_away_prob = 100 - f5_home_prob
    winner_f5 = home if f5_home_prob >= 50 else away

    full_home_prob = f5_home_prob + 2  
    bullpen_variance = ((game_id * 13) % 20) - 10  
    full_home_prob += bullpen_variance
    full_home_prob = max(32, min(68, full_home_prob))
    full_away_prob = 100 - full_home_prob
    winner_full = home if full_home_prob >= 50 else away

    stadium_lower = stadium.lower()
    if 'coors' in stadium_lower:
        over_under = "Alta (Over 10.5) - Factor Coors Field"
    elif home_is_ace and away_is_ace:
        over_under = "Baja (Under 7.5) - Duelo de Abridores Élites"
    elif home_is_ace or away_is_ace:
        over_under = "Baja (Under 8.0)" if game_id % 2 == 0 else "Alta (Over 8.5)"
    else:
        options = [
            "Alta (Over 8.5)", 
            "Baja (Under 8.5)", 
            "Alta (Over 9.0)", 
            "Baja (Under 7.5)",
            "Baja (Under 8.0)"
        ]
        over_under = options[game_id % len(options)]

    margin = abs(full_home_prob - 50)
    if margin > 8:
        run_line = f"{winner_full} -1.5"
    else:
        run_line = f"{away if winner_full == home else home} +1.5 (Protegido)"

    return {
        'prob_home': full_home_prob,
        'prob_away': full_away_prob,
        'f5_home': f5_home_prob,
        'f5_away': f5_away_prob,
        'winner_full': winner_full,
        'winner_f5': winner_f5,
        'over_under': over_under,
        'run_line': run_line,
        'value_index': f"{max(full_home_prob, full_away_prob)}% Confianza"
    }

def generate_parley_system(games):
    all_bets = []
    for g in games:
        home = g['home']
        away = g['away']
        prob_home = g['prob_home']
        prob_away = g['prob_away']
        
        if prob_home >= 50:
            all_bets.append({
                'game': f"{away} vs {home}",
                'pick': f"Ganador: {home}",
                'confidence': prob_home,
                'stadium': g['stadium']
            })
        else:
            all_bets.append({
                'game': f"{away} vs {home}",
                'pick': f"Ganador: {away}",
                'confidence': prob_away,
                'stadium': g['stadium']
            })
            
        ou_clean = g['over_under'].split('-')[0].strip()
        all_bets.append({
            'game': f"{away} vs {home}",
            'pick': f"O/U: {ou_clean}",
            'confidence': 72,
            'stadium': g['stadium']
        })

    all_bets.sort(key=lambda x: x['confidence'], reverse=True)
    jugada_del_dia = all_bets[0] if all_bets else None
    
    unique_game_bets = []
    seen_games = set()
    for b in all_bets:
        if b['game'] not in seen_games:
            seen_games.add(b['game'])
            unique_game_bets.append(b)

    parleys = {}
    legs_counts = [2, 3, 4, 5]
    for n in legs_counts:
        source_pool = unique_game_bets if len(unique_game_bets) >= n else all_bets
        if len(source_pool) >= n:
            selected_legs = source_pool[:n]
            combined_conf = round(sum([l['confidence'] for l in selected_legs]) / n, 1)
            parleys[f"{n} Logros"] = {
                'legs': selected_legs,
                'combined_confidence': combined_conf
            }
        else:
            parleys[f"{n} Logros"] = {
                'legs': source_pool,
                'combined_confidence': 50.0
            }
            
    return {
        'jugada_del_dia': jugada_del_dia,
        'parleys': parleys
    }

def fetch_mlb_today_games():
    today = datetime.now().strftime('%Y-%m-%d')
    url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={today}&hydrate=probablePitcher"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json"
    }
    
    games = []
    try:
        # Timeout reducido a 3 segundos para evitar bloqueos prolongados
        response = requests.get(url, headers=headers, timeout=3)
        if response.status_code == 200:
            data = response.json()
            for date_info in data.get('dates', []):
                for idx, game in enumerate(date_info.get('games', []), start=1):
                    teams = game.get('teams', {})
                    
                    away_team_obj = teams.get('away', {}).get('team', {})
                    home_team_obj = teams.get('home', {}).get('team', {})
                    
                    away_team = away_team_obj.get('name', 'Visitante')
                    home_team = home_team_obj.get('name', 'Local')
                    
                    away_id = away_team_obj.get('id', 1)
                    home_id = home_team_obj.get('id', 1)
                    
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
                    
                    game_info = {
                        'id': game.get('gamePk', idx),
                        'time': time_str,
                        'stadium': stadium,
                        'away': away_team,
                        'home': home_team,
                        'starter_away': starter_away,
                        'starter_home': starter_home,
                        'logo_away': f"https://www.mlbstatic.com/team-logos/{away_id}.svg",
                        'logo_home': f"https://www.mlbstatic.com/team-logos/{home_id}.svg",
                    }
                    
                    sim = advanced_simulate_game(game_info)
                    game_info.update(sim)
                    games.append(game_info)
    except Exception as e:
        print(f"Aviso: Conexión con API externa omitida o fallida ({e}), usando datos de respaldo.")
        
    if not games:
        games = [
            {
                'id': 101,
                'time': '07:05 PM',
                'stadium': 'Yankee Stadium',
                'away': 'Boston Red Sox',
                'home': 'New York Yankees',
                'starter_away': 'T. Houck',
                'starter_home': 'G. Cole',
                'logo_away': 'https://www.mlbstatic.com/team-logos/111.svg',
                'logo_home': 'https://www.mlbstatic.com/team-logos/147.svg',
            },
            {
                'id': 102,
                'time': '08:10 PM',
                'stadium': 'Dodger Stadium',
                'away': 'San Francisco Giants',
                'home': 'Los Angeles Dodgers',
                'starter_away': 'L. Webb',
                'starter_home': 'Y. Yamamoto',
                'logo_away': 'https://www.mlbstatic.com/team-logos/137.svg',
                'logo_home': 'https://www.mlbstatic.com/team-logos/119.svg',
            },
            {
                'id': 103,
                'time': '09:40 PM',
                'stadium': 'Petco Park',
                'away': 'Arizona Diamondbacks',
                'home': 'San Diego Padres',
                'starter_away': 'Z. Gallen',
                'starter_home': 'D. Cease',
                'logo_away': 'https://www.mlbstatic.com/team-logos/109.svg',
                'logo_home': 'https://www.mlbstatic.com/team-logos/135.svg',
            }
        ]
        for g in games:
            sim = advanced_simulate_game(g)
            g.update(sim)
            
    return games

@app.route('/')
def index():
    games = fetch_mlb_today_games()
    parley_data = generate_parley_system(games)
    current_time = datetime.now().strftime('%d/%m/%Y %I:%M %p')
    return render_template('index.html', matches=games, parley_data=parley_data, current_time=current_time)

if __name__ == '__main__':
    app.run(debug=True)
