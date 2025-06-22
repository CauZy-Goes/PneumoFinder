from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pneumo_finder_service as pf

app = Flask(__name__)

# Permitir CORS para qualquer origem (para fins de desenvolvimento)
CORS(app)

detector = pf.DetectorDePneumonia("best_model.keras")

@app.route("/diagnosticar", methods=["POST"])
def diagnosticar():
    if "imagem" not in request.files:
        return jsonify({"erro": "Nenhuma imagem enviada."}), 400

    imagem = request.files["imagem"]
    caminho_temp = os.path.join("temp", imagem.filename)
    imagem.save(caminho_temp)

    try:
        classe, confianca = detector.diagnosticar_imagem(caminho_temp)
        os.remove(caminho_temp)
        response = {
        "classe": str(classe),
        "confianca": float(round(confianca.item(), 2))  # .item() garante conversão de np.float32 para float
        }
        print("Resposta gerada para o front:", response)
        return jsonify(response)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    os.makedirs("temp", exist_ok=True)
    app.run(debug=True , port=5001) #Troquei a porta
