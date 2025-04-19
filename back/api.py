from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pneumo_finder_service as pf

app = Flask(__name__)
CORS(app)  # Libera acesso para o frontend (CORS)

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
        os.remove(caminho_temp)  # Limpa o arquivo
        return jsonify({"classe": classe, "confianca": round(confianca, 2)})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    os.makedirs("temp", exist_ok=True)
    app.run(debug=True)
