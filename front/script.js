const dropzone = document.getElementById("dropzone");
const input = document.getElementById("imagem");
const preview = document.getElementById("preview");
const instrucoes = document.getElementById("instrucoes");

function mostrarPreview(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
        instrucoes.textContent = "Imagem selecionada :";
        instrucoes.style.display = "block"; // Continua visível, mas com novo texto
    };
    reader.readAsDataURL(file);
}



input.addEventListener("change", () => {
    if (input.files.length > 0) {
        mostrarPreview(input.files[0]);
    }
});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("hover");
});

dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("hover");
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("hover");
    input.files = e.dataTransfer.files;
    mostrarPreview(input.files[0]);
});

document.addEventListener("paste", (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;
            mostrarPreview(file);
            break;
        }
    }
});

async function enviarImagem() {
    // Impede o comportamento padrão de recarregar a página ao enviar a imagem
    const input = document.getElementById('imagem');
    const resultado = document.getElementById("resultado");
    const imagemRobo = document.getElementById("imagem-robo");

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
        const resposta = await fetch("http://127.0.0.1:5001/diagnosticar", {
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

            const imagemRobo = document.getElementById("imagem-robo");

            if (dados.classe === "NORMAL") {
                imagemRobo.src = "IMGs_PneumoFinder/dropzone-imagem-Photoroom.png";
            } else {
                imagemRobo.src = "IMGs_PneumoFinder/dropzone-imagem-red-Photoroom.png";
            }


            let classeCor = dados.classe === "NORMAL" ? "texto-destaque" : "texto-destaque-red";
            resultado.innerHTML = `Diagnóstico: <span class="${classeCor}">${dados.classe}</span> (confiança: <span class="${classeCor}">${dados.confianca}</span>)`;

        }
    } catch (erro) {
        console.error("Erro ao enviar a imagem:", erro);
        resultado.innerText = "Erro ao enviar a imagem. Verifique a conexão.";
    }

    input.value = "";  // Limpando o campo de input de arquivo
}
