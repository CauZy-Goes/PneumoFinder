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
            <a href="https://github.com/CauZy-Goes?tab=repositories" target="_blank" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/feed/" target="_blank" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://x.com/cauzy_goes" target="_blank" aria-label="X (Twitter)">
                <i className="fa-brands fa-x-twitter"></i>
            </a>
        </div>


        <p className="copy">© 2025 Cauã Goes - Projeto Acadêmico IA</p>
    </footer>
    );
}