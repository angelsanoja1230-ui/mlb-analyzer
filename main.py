import os
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Archivo simple para llevar el registro de visitas diarias
VISIT_FILE = "visits.txt"

def get_visit_count():
    if not os.path.exists(VISIT_FILE):
        return 0
    try:
        with open(VISIT_FILE, "r") as f:
            content = f.read().strip()
            return int(content) if content.isdigit() else 0
    except:
        return 0

def increment_visit_count():
    count = get_visit_count() + 1
    try:
        with open(VISIT_FILE, "w") as f:
            f.write(str(count))
    except:
        pass
    return count

@app.route('/')
def home():
    # Cada vez que cargan la página principal, sumamos 1 visita
    total_visits = increment_visit_count()
    
    # Aquí puedes pasar las variables de tus partidos a la plantilla
    return render_template('index.html', visits=total_visits)

if __name__ == '__main__':
    app.run(debug=True)
