from flask import Flask, render_template, request, redirect, url_for
import requests
from datetime import datetime
import random

app = Flask(__name__)

ALL_MLB_TEAMS = [
    {"name": "Arizona Diamondbacks", "id": 109},
    {"name": "Atlanta Braves", "id": 144},
    {"name": "Baltimore Orioles", "id": 110},
    {"name": "Boston Red Sox", "id": 111},
    {"name": "Chicago Cubs", "id": 112},
    {"name": "Chicago White Sox", "id": 145},
    {"name": "Cincinnati Reds", "id": 113},
    {"name": "Cleveland Guardians", "id": 114},
    {"name": "Colorado Rockies", "id": 115},
    {"name": "Detroit Tigers", "id": 116},
    {"name": "Houston Astros", "id": 117},
    {"name": "Kansas City Royals", "id": 118},
    {"name": "Los Angeles Angels", "id": 108},
    {"name": "Los Angeles Dodgers", "id": 119},
    {"name": "Miami Marlins", "id": 146},
    {"name": "Milwaukee Brewers", "id": 158},
    {"name": "Minnesota Twins", "id": 142},
    {"name": "New York Mets", "id": 121},
    {"name": "New York Yankees", "id": 147},
    {"name": "Athletics", "id": 133},
    {"name": "Philadelphia Phillies", "id": 143},
    {"name": "Pittsburgh Pirates", "id": 134},
    {"name": "San Diego Padres", "id": 135},
    {"name": "San Francisco Giants", "id": 137},
    {"name": "Seattle Mariners", "id": 136},
    {"name": "St. Louis Cardinals", "id": 138},
    {"name": "Tampa Bay Rays", "id": 139},
    {"name": "Texas Rangers", "id": 140},
    {"name": "Toronto Blue Jays", "id": 141},
    {"name": "Washington Nationals", "id": 120}
]

def get_team_id_by_name(team_name):
    for t in ALL_MLB_TEAMS:
        if t["name"].lower() == team_name.lower():
            return t["id"]
    return 1

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
    f5_home_prob += ((int(game_id) * 7) % 15) - 7 
    f5_home_prob = max(30, min(70, f5_home_prob))
    f5_away_prob = 100 - f5_home_prob
    winner_f5 = home if f5_home_prob >= 50 else away

    full_home_prob = f5_home_prob + 2  
    bullpen_variance = ((int(game_id) * 13) % 20) - 10  
    full_home_prob += bullpen_variance
    full_home_prob = max(32, min(68, full_home_prob))
    full_away_prob = 100 - full_home_prob
    winner_full = home if full_home_prob >= 50 else away

    stadium_lower = stadium.lower()
    if 'coors' in stadium_lower:
        over_under = "Alta (Over 10.5)"
    else:
        options = [
            "Alta (Over 8.5)", 
            "Baja (Under 8.5)", 
            "Alta (Over 9.0)", 
            "Baja (Under 8.0)",
            "Alta (Over 7.5)",
            "Baja (Under 9.5)"
        ]
        over_under = random.choice(options)

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
        home = g.get('home', 'Local')
        away = g.get('away', 'Visitante')
        prob_home = g.get('prob_home', 50)
        prob_away = g.get('prob_away', 50)
        f5_home = g.get('f5_home', 50)
        f5_away = g.get('f5_away', 50)
        stadium = g.get('stadium', 'Estadio')
        run_line = g.get('run_line', 'Protegido')
        over_under = g.get('over_under', 'Alta (Over 8.5)')
        
        if prob_home >= 50:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"Ganador J.C.: {home}", 'confidence': prob_home, 'stadium': stadium})
        else:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"Ganador J.C.: {away}", 'confidence': prob_away, 'stadium': stadium})
            
        if f5_home >= 50:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"1ra Mitad (F5): {home}", 'confidence': f5_home, 'stadium': stadium})
        else:
            all_bets.append({'game': f"{away} vs {home}", 'pick': f"1ra Mitad (F5): {away}", 'confidence': f5_away, 'stadium': stadium})

        all_bets.append({'game': f"{away} vs {home}", 'pick': f"Run Line: {run_line}", 'confidence': round(random.uniform(60.0, 78.0), 1), 'stadium': stadium})

        ou_parts = over_under.split('(')
        ou_val = ou_parts[-1] if len(ou_parts) > 1 else "Over 8.5)"
        ou_variations = [
            f"Alta ({ou_val}",
            f"Baja ({ou_val}",
            "Alta (Over 8.5)",
            "Baja (Under 8.5)",
            "Alta (Over 9.5)"
        ]
        chosen_ou = random.choice(ou_variations)
        all_bets.append({'game': f"{away} vs {home}", 'pick': f"O/U: {chosen_ou}", 'confidence': round(random.uniform(62.0, 76.0), 1), 'stadium': stadium})

    sorted_bets_for_lock = sorted(all_bets, key=lambda x: x['confidence'], reverse=True)
    jugada_del_dia = sorted_bets_for_lock[0] if sorted_bets_for_lock else None
    
    parleys = {}
    legs_counts = [2, 3, 4, 5]
    for n in legs_counts:
        pool = list(all_bets)
        random.shuffle(pool)
        
        selected_legs = []
        used_games = set()
        for b in pool:
            if b['game'] not in used_games and len(selected_legs) < n:
                selected_legs.append(b)
                used_games.add(b['game'])
                
        if len(selected_legs) < n:
            for b in pool:
                if b not in selected_legs and len(selected_legs) < n:
                    selected_legs.append(b)
                    
        combined_conf = round(sum([l['confidence'] for l in selected_legs]) / len(selected_legs), 1) if selected_legs else 65.0
        parleys[f"{n} Logros"] = {
            'legs': selected_legs,
            'combined_confidence': combined_conf
        }
            
    return {
        'jugada_del_dia': jugada_del_dia,
        'parleys': parleys
    }

def fetch_mlb_today_games():
    today = datetime.now().strftime('%Y-%m-%d')
    url = f"https://statsapi.mlb.com/api/v1/schedule?sportId=1&date={today}&hydrate=probablePitcher,linescore"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json"
    }
    
    games = []
    try:
        response = requests.get(url, headers=headers, timeout=4)
        if response.status_code == 200:
            data = response.json()
            for date_info in data.get('dates', []):
                for idx, game in enumerate(date_info.get('games', []), start=1):
                    teams = game.get('teams', {}) or {}
                    away_team_obj = teams.get('away', {}).get('team', {}) or {}
                    home_team_obj = teams.get('home', {}).get('team', {}) or {}
                    
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
                    
                    status_obj = game.get('status', {}) or {}
                    abstract_state = status_obj.get('abstractGameState', 'Preview')
                    detailed_state = status_obj.get('detailedState', 'Programado')
                    
                    # Scoreboard en vivo (incluyendo bolas y strikes)
                    linescore = game.get('linescore', {}) or {}
                    current_inning = linescore.get('currentInning', 0)
                    inning_state = linescore.get('inningState', '') or ''
                    outs = linescore.get('outs', 0)
                    balls = linescore.get('balls', 0)
                    strikes = linescore.get('strikes', 0)
                    
                    ls_teams = linescore.get('teams', {}) or {}
                    away_runs = ls_teams.get('away', {}).get('runs', 0) if ls_teams else 0
                    home_runs = ls_teams.get('home', {}).get('runs', 0) if ls_teams else 0
                    
                    offense = linescore.get('offense', {}) or {}
                    has_1b = offense.get('first') is not None
                    has_2b = offense.get('second') is not None
                    has_3b = offense.get('third') is not None
                    batter_obj = offense.get('batter', {}) or {}
                    batter_name = batter_obj.get('fullName', 'N/D')
                    
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
                        'abstract_state': abstract_state,
                        'detailed_state': detailed_state,
                        'current_inning': current_inning,
                        'inning_state': inning_state,
                        'outs': outs,
                        'balls': balls,
                        'strikes': strikes,
                        'away_runs': away_runs,
                        'home_runs': home_runs,
                        'has_1b': has_1b,
                        'has_2b': has_2b,
                        'has_3b': has_3b,
                        'batter_name': batter_name
                    }
                    
                    sim = advanced_simulate_game(game_info)
                    game_info.update(sim)
                    games.append(game_info)
    except Exception as e:
        print(f"Aviso de API: {e}")
        
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
                'abstract_state': 'Preview',
                'detailed_state': 'Scheduled',
                'current_inning': 0,
                'inning_state': '',
                'outs': 0,
                'balls': 0,
                'strikes': 0,
                'away_runs': 0,
                'home_runs': 0,
                'has_1b': False,
                'has_2b': False,
                'has_3b': False,
                'batter_name': 'N/D'
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
                'abstract_state': 'Preview',
                'detailed_state': 'Scheduled',
                'current_inning': 0,
                'inning_state': '',
                'outs': 0,
                'balls': 0,
                'strikes': 0,
                'away_runs': 0,
                'home_runs': 0,
                'has_1b': False,
                'has_2b': False,
                'has_3b': False,
                'batter_name': 'N/D'
            }
        ]
        for g in games:
            sim = advanced_simulate_game(g)
            g.update(sim)
            
    return games

@app.route('/api/live-matches')
def api_live_matches():
    games = fetch_mlb_today_games()
    return {
        'success': True,
        'timestamp': datetime.now().strftime('%d/%m/%Y %I:%M:%S %p'),
        'matches': games
    }

@app.route('/', methods=['GET', 'POST'])
def index():
    games = fetch_mlb_today_games()
    
    if request.method == 'POST':
        custom_away = request.form.get('away_team')
        custom_home = request.form.get('home_team')
        if custom_away and custom_home and custom_away != custom_home:
            away_id = get_team_id_by_name(custom_away)
            home_id = get_team_id_by_name(custom_home)
            custom_game = {
                'id': random.randint(200, 999),
                'time': 'Personalizado',
                'stadium': 'Estadio Custom',
                'away': custom_away,
                'home': custom_home,
                'starter_away': 'Pitcher A',
                'starter_home': 'Pitcher B',
                'logo_away': f"https://www.mlbstatic.com/team-logos/{away_id}.svg",
                'logo_home': f"https://www.mlbstatic.com/team-logos/{home_id}.svg",
                'abstract_state': 'Preview',
                'detailed_state': 'Personalizado',
                'current_inning': 0,
                'inning_state': '',
                'outs': 0,
                'balls': 0,
                'strikes': 0,
                'away_runs': 0,
                'home_runs': 0,
                'has_1b': False,
                'has_2b': False,
                'has_3b': False,
                'batter_name': 'N/D'
            }
            sim = advanced_simulate_game(custom_game)
            custom_game.update(sim)
            games.insert(0, custom_game)

    parley_data = generate_parley_system(games)
    current_time = datetime.now().strftime('%d/%m/%Y %I:%M %p')
    return render_template('index.html', matches=games, parley_data=parley_data, current_time=current_time, all_teams=ALL_MLB_TEAMS)

if __name__ == '__main__':
    app.run(debug=True)
