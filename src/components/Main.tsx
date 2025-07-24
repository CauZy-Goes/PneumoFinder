'use client';

import { useRef, useState, useEffect } from 'react';

export function Main() {
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [imagemRobo, setImagemRobo] = useState<string>('IMGs_PneumoFinder/dropzone-imagem-Photoroom.png');
  const [resultado, setResultado] = useState<string>('');
  const [hover, setHover] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 👉 Função para mostrar a prévia da imagem
  const mostrarPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagemPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 👉 Evento de colar imagem (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              setImagemArquivo(file);
              mostrarPreview(file);
              break;
            }
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

const enviarImagem = async () => {
  if (!imagemArquivo) {
    alert('Selecione uma imagem primeiro!');
    return;
  }

  setResultado('Processando imagem...');

  const formData = new FormData();
  formData.append('imagem', imagemArquivo);

  try {
    const resposta = await fetch('http://127.0.0.1:5001/diagnostico_completo', {
      method: 'POST',
      body: formData,
    });

    const dados = await resposta.json();

    if (dados.erro) {
      setResultado(`Erro: ${dados.erro}`);
    } else if (dados.classe_pulmao !== 'PULMÃO') {
      // Caso a imagem NÃO seja de um pulmão
      setResultado(
        `<span style= "color:orange"> A imagem enviada não é um pulmão </span>`
      );
      setImagemRobo('IMGs_PneumoFinder/dropzone-imagem-yellow-Photoroom.png');
    } else {
      // Imagem É um pulmão - prossegue com o diagnóstico de pneumonia
      const corClasse =
        dados.classe_pneumonia === 'NORMAL' ? 'texto-destaque' : 'texto-destaque-red';

      // Define imagem do robô baseada no diagnóstico
      if (dados.classe_pneumonia === 'NORMAL') {
        setImagemRobo('IMGs_PneumoFinder/dropzone-imagem-Photoroom.png');
      } else {
        setImagemRobo('IMGs_PneumoFinder/dropzone-imagem-red-Photoroom.png');
      }

      setResultado(
        `✅ Imagem reconhecida como <strong>PULMÃO</strong><br/>` +
        `🩺 Diagnóstico: <span class="${corClasse}">${dados.classe_pneumonia}</span> ` +
        `(Confiança: <span class="${corClasse}">${dados.confianca_pneumonia}%</span>)`
      );
    }
  } catch (error) {
    setResultado('Erro ao enviar a imagem. Verifique sua conexão. ' + error);
  }

  setImagemArquivo(null);
};



  // 👉 Evento de clicar na dropzone
  const handleClickDropzone = () => {
    inputRef.current?.click();
  };

  // 👉 Quando o usuário solta um arquivo na dropzone
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setImagemArquivo(file);
      mostrarPreview(file);
    }
  };

  // 👉 Quando um arquivo é selecionado manualmente
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemArquivo(file);
      mostrarPreview(file);
    }
  };


    return (
        <div className="container">
            <section id="dropzone-conteudo">
                <h1>
                    Faça o upload de uma <span className="texto-destaque">Radiografia de Tórax</span> para a{' '}
                    <span className="texto-destaque">IA</span> analisar o pulmão
                </h1>

                <ul>
                    <li>
                    O <span className="texto-destaque">PneumoFinder</span> usa{' '}
                    <span className="texto-destaque">Inteligência Artificial</span> para identificar sinais de{' '}
                    <span className="texto-destaque">pneumonia</span> em segundos
                    </li>
                    <li>
                    Basta <span className="texto-destaque">selecionar ou arrastar</span> uma imagem para começar a{' '}
                    <span className="texto-destaque">análise</span>
                    </li>
                    <li>
                    O <span className="texto-destaque">resultado</span> é exibido logo abaixo com base no nosso modelo treinado
                    em <span className="texto-destaque">milhares de exames reais</span>
                    </li>
                    <li>
                    Totalmente <span className="texto-destaque">automatizado, rápido e acessível</span>
                    </li>
                </ul>

                <div
                    id="dropzone"
                    onClick={handleClickDropzone}
                    onDragOver={(e) => {
                    e.preventDefault();
                    setHover(true);
                    }}
                    onDragLeave={() => setHover(false)}
                    onDrop={handleDrop}
                    className={hover ? 'hover' : ''}
                >
                    <div id="instrucoes">
                    {imagemPreview ? 'Imagem selecionada:' : 'Clique ou arraste a imagem aqui (ou cole do Ctrl+V)'}
                    </div>
                    <br />
                    {imagemPreview && (
                    <img
                        src={imagemPreview}
                        alt="Prévia da imagem"
                        style={{ maxWidth: '100px', marginTop: '10px', display: 'block' }}
                    />
                    )}
                </div>

                <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                />

                <button onClick={enviarImagem}>Diagnosticar</button>

                <p
                    id="resultado"
                    dangerouslySetInnerHTML={{
                    __html: resultado,
                    }}
                ></p>
            </section>

            <section id="dropzone-imagem">
                <img id="imagem-robo" src={imagemRobo} alt="foto da capa do dropzone"/>
            </section>

            <section id="sobre-imagem">
                <img src="IMGs_PneumoFinder/Robo Fofo3 pequeno em pe transparente-Photoroom.png"
                    alt="foto da capa do sobre"/>
            </section>

            <section id="sobre-conteudo">
                <h1>ℹ️ Sobre o Projeto</h1>
                <p>
                    Este é um projeto acadêmico desenvolvido como parte da disciplina de <span
                        className="texto-destaque">Inteligência
                        Artificial</span>.
                    Seu objetivo é aplicar <span className="texto-destaque">redes neurais convolucionais (CNNs)</span> para
                    auxiliar na detecção de
                    <span className="texto-destaque">pneumonia</span> a partir de imagens de <span className="texto-destaque">raio-X
                        de tórax.</span>
                </p>

                <h2 style={{ color: '#ffb02e', fontWeight: 'bold' }}>⚠️ Atenção</h2>
                <p>
                    Esta ferramenta foi criada exclusivamente para fins educacionais. Os resultados apresentados <span
                        className="texto-destaque-yellow">não
                        devem ser interpretados como diagnóstico médico definitivo</span>.
                    Apesar de a IA ter alcançado uma boa taxa de acerto nos testes, <span className="texto-destaque-yellow">não
                        há
                        garantias quanto à
                        precisão da classificação</span>.
                </p>

                <h2 style={{ color: 'black'}}>🖼️ <span className="texto-destaque">Recomendações de Imagem</span></h2>
                <ul>
                    <li>Utilize imagens de raio-X do pulmão com <span className="texto-destaque">boa resolução.</span>
                    </li>
                    <li> <span className="texto-destaque-red">Evite</span> imagens com textos sobrepostos ou elementos gráficos
                        adicionais.</li>
                    <li><span className="texto-destaque-red">Não utilize</span> imagens com baixa qualidade, marcas d’água ou
                        logotipos.</li>
                    <li>Imagens clínicas <span className="texto-destaque">muito editadas ou com artefatos</span> podem
                        comprometer a análise.</li>
                </ul>
            </section>

            <section id="como-usar-conteudo">
                <h1>🤖 Como usar o <span className="texto-destaque">PneumoFinder ?</span></h1>
                <h2><span style={{ color: '#2d73ff', fontSize: '1em' }}>Siga os passos abaixo para utilizar a IA
                        corretamente:</span></h2>

                <ol>
                    <li>
                        <span className="texto-destaque-blue">Passo 1:</span> Encontre uma fonte confiável de imagens de raio-X
                        de
                        pulmões com ou sem
                        pneumonia
                        (ex: bases de dados médicas ou artigos científicos).
                    </li>
                    <li>
                        <span className="texto-destaque-blue">Passo 2:</span> Escolha uma imagem com <span
                            className="texto-destaque">boa
                            resolução </span>
                        e proporções adequadas.
                        <br/><br/><span className="texto-destaque-red">⚠️ Evite imagens com textos, marcações ou figuras que não
                            façam
                            parte do raio-X</span> — isso pode comprometer a análise da IA.
                    </li>
                    <li>
                        <span className="texto-destaque-blue">Passo 3:</span> Copie ou baixe a imagem desejada.
                    </li>
                    <li>
                        <span className="texto-destaque-blue">Passo 4:</span> Volte ao <span
                            className="texto-destaque">PneumoFinder</span> e cole
                        (<kbd>Ctrl + V</kbd>) ou anexe a imagem no campo indicado.
                    </li>
                    <li>
                        <span className="texto-destaque-blue">Passo 5:</span> A classificação da imagem será exibida logo abaixo
                        após
                        a análise,
                        indicando se há sinais de
                        <span className="texto-destaque-red">pneumonia</span> ou se o pulmão está <span
                            className="texto-destaque">normal</span>.
                    </li>
                </ol>
            </section>

            <section id="como-usar-imagem">
                <img src="IMGs_PneumoFinder/Robo Fofo em pe transparente-Photoroom.png" alt="foto da capa do como usar"/>
            </section>
        </div>
    );
}