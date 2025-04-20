// Detectando o evento de colagem
document.getElementById("imagem-area").addEventListener("paste", function (event) {
    const clipboardItems = event.clipboardData.items;

    // Verifica se existe uma imagem na área de transferência
    for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") === 0) {
            const file = item.getAsFile();
            const input = document.getElementById('imagem');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;  // Coloca a imagem no campo de input
            console.log("Imagem colada com sucesso!");
            break;
        }
    }
});

async function enviarImagem() {
    // Impede o comportamento padrão de recarregar a página ao enviar a imagem
    const input = document.getElementById('imagem');
    const resultado = document.getElementById("resultado");
    const imagemArea = document.getElementById("imagem-area");  // Pegando a área de colagem

    if (input.files.length === 0) {
        alert("Escolha uma imagem.");
        return;
    }

    // Mostra o "loading" enquanto a imagem está sendo processada
    resultado.innerText = "Processando imagem...";

    const formData = new FormData();
    formData.append("imagem", input.files[0]);

    try {
        console.log("Enviando a imagem...");
        const resposta = await fetch("http://127.0.0.1:5000/diagnosticar", {
            method: "POST",
            body: formData
        });

        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerText = "Erro: " + dados.erro;
            console.error("Erro retornado pelo servidor:", dados.erro);
            return;
        } else {
            console.log(`Diagnóstico: ${dados.classe} (confiança: ${dados.confianca})`);
            resultado.innerText = `Diagnóstico: ${dados.classe} (confiança: ${dados.confianca})`;
        }
    } catch (erro) {
        console.error("Erro ao enviar a imagem:", erro);
        resultado.innerText = "Erro ao enviar a imagem. Verifique a conexão.";
    }

    // Limpa a área de colagem após o envio
    imagemArea.innerHTML = "Cole a imagem aqui";  // Resetando o conteúdo da div de colagem
    input.value = "";  // Limpando o campo de input de arquivo
}
