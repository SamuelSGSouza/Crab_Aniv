from flask import Flask, render_template, request, jsonify,Response
import user_agents

app = Flask(__name__)

#criando
@app.before_request
def block_computers():
    user_agent = request.headers.get('User-Agent')
    if user_agent:
        ua = user_agents.parse(user_agent)
        if ua.is_pc:
            return Response('Computador não permitido', status=403)

@app.route('/')
def home():
    #retornando o "index.html" que está na pasta static
    return render_template('index.html')




if __name__ == '__main__':
    app.run(debug=True)