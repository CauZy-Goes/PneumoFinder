# 🫁 PneumoFinder
## Getting Started

Um sistema inteligente de diagnóstico de pneumonia a partir de imagens de raio-X. O projeto utiliza um modelo de rede neural convolucional (CNN) treinado para identificar automaticamente se uma imagem apresenta sinais de pneumonia. A interface web permite ao usuário enviar imagens facilmente, e o backend retorna o resultado do diagnóstico com a confiança da predição.

---

## 📦 Repositório do Treinamento da IA

O modelo utilizado neste sistema foi desenvolvido e treinado no projeto [**PneumoFinder CNN (Keras + TensorFlow)**](https://github.com/CauZy-Goes/PneumoFinder_CNN_Keras_TensorFlow).

Esse repositório contém todo o pipeline de treinamento, incluindo:
- Pré-processamento dos dados
- Arquitetura da CNN
- Estratégias de Data Augmentation
- Callbacks de EarlyStopping e ModelCheckpoint
- Avaliação detalhada com gráficos de desempenho, matrizes de confusão e relatórios de métricas

> 📈 O modelo final foi salvo e integrado a este projeto para permitir diagnósticos em tempo real.

---

## 🔧 Tecnologias Utilizadas

### 🧠 Backend - IA com Flask
- Python 3
- TensorFlow / Keras
- Flask + Flask-CORS
- Modelo CNN treinado (`.keras`)

### 🌐 Frontend - Web App Moderno
- React
- Next.js
- TypeScript
- Tailwind CSS
- Node.js (ambiente de execução e build do Next)

---

## 📁 Estrutura do Projeto

```
PneumoFinder/
├── back/ # Backend com Flask + IA
│ ├── imgs/ # Imagens auxiliares
│ ├── temp/ # Uploads temporários
│ ├── api.py # Arquivo principal da API
│ ├── pneumo_finder_service.py # Serviço de processamento da IA
│ ├── testar_modelo.py # Script para testes do modelo
│ ├── best_model.keras # Modelo treinado
│ └── requirements.txt # Dependências Python
│
├── pneumo-finder-web/ # Frontend com Next.js + React
│ ├── public/ # Imagens públicas e assets
│ ├── src/ # Código fonte
│ │ ├── app/ # Rotas, layouts e páginas
│ │ │ ├── favicon.ico
│ │ │ ├── globals.css
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── components/ # Componentes reutilizáveis
│ │ │ ├── Footer.tsx
│ │ │ ├── Header.tsx
│ │ │ └── Main.tsx
│ │ └── utility/ # Utilitários como icons.ts
│ │ └── icons.ts
│ ├── .gitignore
│ ├── next.config.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── README.md
│
└── README.md # Documentação principal
```
---

## 🖼️ Interface Visual

Veja abaixo algumas capturas da interface do PneumoFinder em ação:

<table>
  <tr>
    <td align="center"><strong>Área de Upload (Dropzone)</strong></td>
    <td align="center"><strong>Seção "Sobre"</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/CauZy-Goes/PneumoFinder/blob/main/PneumoFinder%20imgs%20web/dropzone.png" width="100%"></td>
    <td><img src="https://github.com/CauZy-Goes/PneumoFinder/blob/main/PneumoFinder%20imgs%20web/sobre.png" width="100%"></td>
  </tr>
  <tr>
    <td align="center"><strong>Seção "Como usar"</strong></td>
    <td align="center"><strong>Rodapé (Footer)</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/CauZy-Goes/PneumoFinder/blob/main/PneumoFinder%20imgs%20web/como%20usar.png" width="100%"></td>
    <td><img src="https://github.com/CauZy-Goes/PneumoFinder/blob/main/PneumoFinder%20imgs%20web/header.png" width="100%"></td>
  </tr>
</table>

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/pneumo-finder.git
cd pneumo-finder
```

### 2. Backend

#### Pré-requisitos
- Python 3.8+
- Virtualenv (opcional, mas recomendado)

#### Instalar dependências

```bash
cd backend
pip install -r requirements.txt
```

#### Executar o servidor

```bash
python api.py
```

O servidor estará disponível em `http://127.0.0.1:5000`.

---

### 3. Frontend - Aplicação Web Next.js + React

#### ✅ Pré-requisitos
- Node.js (versão 18 ou superior recomendado)
- npm ou yarn

#### 📦 Instalar dependências

```bash
cd pneumo-finder-web
npm install
```
### 🚀 Executar o projeto em modo desenvolvimento

```bash
npm run dev
```

---

## 🧪 Testando o Sistema

1. Abra a interface web.
2. Faça o upload de uma imagem de raio-X do tórax.
3. O sistema exibirá se o diagnóstico é **NORMAL** ou **PNEUMONIA**, junto da confiança da predição.
4. A imagem do robô mudará de acordo com o diagnóstico.

---

## 📌 Observações

- O modelo espera imagens no formato e tamanho específico (224x224).
- As imagens são normalizadas antes de serem enviadas ao modelo.
- O projeto está em ambiente local para testes. Para produção, considere segurança, performance e escalabilidade.


---

## 🧠 Sobre o modelo de IA

O modelo é uma CNN treinada com base em imagens reais de pulmões com e sem pneumonia. Ele foi salvo no formato `.keras` e carregado diretamente pelo backend.
A predição é feita utilizando limiar de 0.5 para classificar como NORMAL ou PNEUMONIA.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou enviar pull requests com melhorias, correções ou novas funcionalidades.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---


## 👨‍💻 Autor

Feito por **[Cauã Farias]**  
[LinkedIn](https://www.linkedin.com/in/cau%C3%A3-farias-739013288/) • [GitHub](https://github.com/CauZy-Goes)
