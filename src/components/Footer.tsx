import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer(){
    return (
    <footer id="rodape">
        <div className="logo-footer">
            <img
                src="/IMGs_PneumoFinder/header-img-Photoroom.png" 
                alt="Logo Com Nome do PneumoFinder"
            />
        </div>


      <div className="links-sociais">
        <a href="https://github.com/CauZy-Goes" target="_blank" aria-label="GitHub">
          <FontAwesomeIcon icon={['fab', 'github']} />
        </a>
        <a href="https://www.linkedin.com/in/cauzy-goes/" target="_blank" aria-label="LinkedIn">
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
        </a>
        <a href="https://x.com/cauzy_goes" target="_blank" aria-label="X (Twitter)">
          <FontAwesomeIcon icon={['fab', 'x-twitter']} />
        </a>
      </div>


        <p className="copy">© 2025 Cauã Goes - Projeto Acadêmico IA</p>
    </footer>
    );
}