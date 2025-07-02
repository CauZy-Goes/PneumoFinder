'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';


export function Main() {
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [imagemRobo, setImagemRobo] = useState<string>('/IMGs_PneumoFinder/dropzone-imagem-Photoroom.png');
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
    const resposta = await fetch('http://127.0.0.1:5001/diagnosticar', {
      method: 'POST',
      body: formData,
    });

    const dados = await resposta.json();

    if (dados.erro) {
      setResultado(`Erro: ${dados.erro}`);
    } else {
      const classeCor = dados.classe === 'NORMAL' ? 'texto-destaque' : 'text-red-600 font-bold';

      // ✅ 🔥 Aqui troca a imagem do robô de acordo com o resultado:
      if (dados.classe === 'NORMAL') {
        setImagemRobo('IMGs_PneumoFinder/dropzone-imagem-Photoroom.png');
      } else {
        setImagemRobo('IMGs_PneumoFinder/dropzone-imagem-red-Photoroom.png');
      }

      setResultado(
        `Diagnóstico: ` +
          `<span class="${classeCor}">${dados.classe}</span> ` +
          `(Confiança: <span class="${classeCor}">${dados.confianca}</span>)`
      );
    }
  } catch (error) {
    setResultado('Erro ao enviar a imagem. Verifique sua conexão.' + error);
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
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2   gap-5 p-[10px] bg-[#e8e8e8]">

            <section id="dropzone-conteudo"
            className="flex flex-col justify-center items-center">
                <h1 className="text-[2.5rem] font-semibold leading-tight text-center mb-4" >
                    Faça o upload de uma <span className="text-[#2d73ff] font-bold">Radiografia de Tórax</span> para a{' '}
                    <span className="text-[#2d73ff] font-bold">IA</span> analisar o pulmão
                </h1>

                <ul className="text-center m-0 list-none p-0">
                    <li 
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold">
                    O <span className="text-[#2d73ff] font-bold">PneumoFinder</span> usa{' '}
                    <span className="text-[#2d73ff] font-bold">Inteligência Artificial</span> para identificar sinais de{' '}
                    <span className="text-[#2d73ff] font-bold">pneumonia</span> em segundos
                    </li>
                    <li
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold">
                    Basta <span className="text-[#2d73ff] font-bold">selecionar ou arrastar</span> uma imagem para começar a{' '}
                    <span className="text-[#2d73ff] font-bold">análise</span>
                    </li>
                    <li
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold">
                    O <span className="text-[#2d73ff] font-bold">resultado</span> é exibido logo abaixo com base no nosso modelo treinado
                    em <span className="text-[#2d73ff] font-bold">milhares de exames reais</span>
                    </li>
                    <li
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold">
                    Totalmente <span className="text-[#2d73ff] font-bold">automatizado, rápido e acessível</span>
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
                    className={`
                    border-2 border-dashed border-[#016798] rounded-[10px] mt-2.5
                    py-[30px] w-full h-auto
                    text-center text-[#016798]
                    cursor-pointer font-bold text-[1.2em]
                    flex justify-center items-center
                    ${hover ? "border-[#000358] text-[#000358]" : ""}
                  `}
                >
                    <div id="instrucoes">
                    {imagemPreview ? 'Imagem selecionada:' : 'Clique ou arraste a imagem aqui (ou cole do Ctrl+V)'}
                    </div>
                    <br />
                    {imagemPreview && (
                  
                    <Image
                      src={imagemPreview}
                      alt="Prévia da imagem"
                      width={500}
                      height={500}
                      className="w-30 h-auto ml-4"
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

                <button
                className="
                  mt-2.5
                  px-[30px] py-[5px]
                  border-2 border-black
                  bg-[#2d73ff] text-white
                  font-semibold text-[1.5em]
                  rounded-[20px]
                  hover:bg-white hover:text-[#2d73ff]
                  transition-colors duration-300
                " 
                onClick={enviarImagem}>Diagnosticar
                </button>

                <p
                    className="font-bold text-[1.5em] mt-2.5"
                    dangerouslySetInnerHTML={{
                    __html: resultado,
                    }}
                ></p>
            </section>

            <section id="dropzone-imagem">
              <Image
                id="imagem-robo"
                src={imagemRobo}
                alt="foto da capa do dropzone"
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
            </section>


            <section id="sobre-imagem">
              <Image
                src="/IMGs_PneumoFinder/Robo Fofo3 pequeno em pe transparente-Photoroom.png"
                alt="foto da capa do sobre"
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
            </section>


            <section id="sobre-conteudo"
                    className="flex flex-col justify-center items-center text-center">
                <h1 className="text-[2.5rem] mb-[0.2em]" >ℹ️ Sobre o Projeto</h1>
                <p className="mb-4 leading-[1.6] text-[1.2em]" >
                    Este é um projeto acadêmico desenvolvido como parte da disciplina de <span
                        className="text-[#2d73ff] font-bold">Inteligência
                        Artificial</span>.
                    Seu objetivo é aplicar <span className="text-[#2d73ff] font-bold">redes neurais convolucionais (CNNs)</span> para
                    auxiliar na detecção de
                    <span className="text-[#2d73ff] font-bold">pneumonia</span> a partir de imagens de <span className="text-[#2d73ff] font-bold">raio-X
                        de tórax.</span>
                </p>

                <h2 className="text-[1.8rem]" style={{ color: '#ffb02e', fontWeight: 'bold' }}>⚠️ Atenção</h2>
                <p className="mb-4 leading-[1.6] text-[1.2em]">
                    Esta ferramenta foi criada exclusivamente para fins educacionais. Os resultados apresentados <span
                        className="text-[#ffb02e] font-bold">não
                        devem ser interpretados como diagnóstico médico definitivo</span>.
                    Apesar de a IA ter alcançado uma boa taxa de acerto nos testes, <span className="text-[#ffb02e] font-bold">não
                        há
                        garantias quanto à
                        precisão da classificação</span>.
                </p>

                <h2 className="text-[1.8rem]" style={{ color: 'black'}}>🖼️ <span className="text-[#2d73ff] font-bold">Recomendações de Imagem</span></h2>
                <ul className="list-none p-0 m-0 max-w-full">
                    <li 
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold">Utilize imagens de raio-X do pulmão com <span className="text-[#2d73ff] font-bold">boa resolução.</span>
                    </li>
                    <li
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold"
                    > <span className="text-red-600 font-bold">Evite</span> imagens com textos sobrepostos ou elementos gráficos
                        adicionais.</li>
                    <li
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold"
                    ><span className="text-red-600 font-bold">Não utilize</span> imagens com baixa qualidade, marcas d’água ou
                        logotipos.</li>
                    <li 
                    className="relative pl-7 mb-4 text-[1.05rem] text-[#333] before:absolute before:left-[5px] before:top-0 before:content-['✔'] before:text-[#2d73ff] before:font-bold"
                    >Imagens clínicas <span className="text-[#2d73ff] font-bold">muito editadas ou com artefatos</span> podem
                        comprometer a análise.</li>
                </ul>
            </section>

            <section id="como-usar-conteudo"
              className="flex flex-col justify-center items-center text-center">
                <h1 className='text-[2.2rem]'>🤖 Como usar o <span className="text-[#2d73ff] font-bold">PneumoFinder ?</span></h1>
                <h2 className="text-[1.8rem]" ><span style={{ color: '#2d73ff', fontSize: '1em' }}>Siga os passos abaixo para utilizar a IA
                        corretamente:</span></h2>

                <ol className="list-none pl-6 text-[1.1em] max-w-[800px]">
                    <li className="text-left mb-8 leading-[1.6]">
                        <span className="text-[#2d73ff] font-bold text-[1.3em]">Passo 1:</span> Encontre uma fonte confiável de imagens de raio-X
                        de
                        pulmões com ou sem
                        pneumonia
                        (ex: bases de dados médicas ou artigos científicos).
                    </li>
                    <li className="text-left mb-8 leading-[1.6]">
                        <span className="text-[#2d73ff] font-bold text-[1.3em]">Passo 2:</span> Escolha uma imagem com <span
                            className="text-[#2d73ff] font-bold">boa
                            resolução</span>
                        e proporções adequadas.
                        <br/><br/><span className="text-red-600 font-bold">⚠️ Evite imagens com textos, marcações ou figuras que não
                            façam
                            parte do raio-X</span> — isso pode comprometer a análise da IA.
                    </li>
                    <li className="text-left mb-8 leading-[1.6]">
                        <span className="text-[#2d73ff] font-bold text-[1.3em]">Passo 3:</span> Copie ou baixe a imagem desejada.
                    </li>
                    <li className="text-left mb-8 leading-[1.6]">
                        <span className="text-[#2d73ff] font-bold text-[1.3em]">Passo 4:</span> Volte ao <span
                            className="text-[#2d73ff] font-bold">PneumoFinder</span> e cole
                        (<kbd>Ctrl + V</kbd>) ou anexe a imagem no campo indicado.
                    </li>
                    <li className="text-left mb-8 leading-[1.6]">
                        <span className="text-[#2d73ff] font-bold text-[1.3em]">Passo 5:</span> A classificação da imagem será exibida logo abaixo
                        após
                        a análise,
                        indicando se há sinais de
                        <span className="text-red-600 font-bold">pneumonia</span> ou se o pulmão está <span
                            className="text-[#2d73ff] font-bold">normal</span>.
                    </li>
                </ol>
            </section>

            <section id="como-usar-imagem">
                <Image
                src="/IMGs_PneumoFinder/Robo Fofo em pe transparente-Photoroom.png" 
                alt="foto da capa do como usar"
                width={1000}
                height={1000}
                />
            </section>
        </div>
    );
}