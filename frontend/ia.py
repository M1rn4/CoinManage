from flask import Flask, request, jsonify

app = Flask(__name__)

print(projectDetails)

@app.route('/api/project', methods=['POST'])
def receive_project_details():
    project_details = request.json.get('projectDetails')
    
    # Aquí puedes realizar alguna acción con los datos del proyecto
    
    return jsonify({'message': 'Project details received'})

if __name__ == '__main__':
    app.run()
