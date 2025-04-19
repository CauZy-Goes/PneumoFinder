async function enviarImagem() {
    const input = document.getElementById('imagem');
    if (input.files.length === 0) {
        alert("Escolha uma imagem.");
        return;
    }

    const formData = new FormData();
    formData.append("imagem", input.files[0]);

    const resposta = await fetch("http://127.0.0.1:5000/diagnosticar", {
        method: "POST",
        body: formData
    });

    const dados = await resposta.json();
    const resultado = document.getElementById("resultado");

    if (dados.erro) {
        resultado.innerText = "Erro: " + dados.erro;
    } else {
        resultado.innerText = `Diagnóstico: ${dados.classe} (confiança: ${dados.confianca})`;
    }
}
