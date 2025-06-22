
export function Main(){
    return (
        <div className="container">
            <section id="dropzone-conteudo">
                <h1>Faça o upload de uma <span className="texto-destaque">Radiografia de Torax</span> para a <span
                        className="texto-destaque">IA</span> analisar o pulmão</h1>

                <ul>
                    <li>O <span className="texto-destaque">PneumoFinder</span> usa <span className="texto-destaque">inteligência
                            artificial</span> para identificar
                        sinais de <span className="texto-destaque">pneumonia</span> em segundos</li>
                    <li>Basta <span className="texto-destaque">selecionar ou arrastar</span> uma imagem para começar a <span
                            className="texto-destaque">análise</span>
                    </li>
                    <li>O <span className="texto-destaque">resultado</span> é exibido logo abaixo com base no nosso modelo
                        treinado em <span className="texto-destaque">milhares de exames reais</span> </li>
                    <li>Totalmente <span className="texto-destaque">automatizado, rápido e acessível</span></li>
                </ul>

                <div id="dropzone">
                    <div id="instrucoes">
                        Clique ou arraste a imagem aqui<br/>
                        (ou cole a imagem do Ctrl+V)
                    </div>
                    <br/><br/>
                    <img id="preview"  alt="Prévia da imagem"
                        style={{ 
                                maxWidth: "30px", 
                                marginTop: "10px", 
                                display: "none" 
                            }}/>
                </div>

                <input type="file" id="imagem" accept="image/*"/>
                <button>Diagnosticar</button>
                <p id="resultado"></p>
            </section>

            <section id="dropzone-imagem">
                <img id="imagem-robo" src="IMGs_PneumoFinder/dropzone-imagem-Photoroom.png" alt="foto da capa do dropzone"/>
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
                            resolução</span>
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
    )
}