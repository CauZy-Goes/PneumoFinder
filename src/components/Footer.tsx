import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export function Footer(){
    return (
    <footer 
    className="logo-footer
        bg-[#2d73ff]
        px-4
        pt-5
        pb-8
        flex 
        flex-col
        items-center
        text-center
        border-t-[5px] 
        border-[#000342]">

      <div className="flex justify-center ml-3">
          <Image
            src="/IMGs_PneumoFinder/header-img-Photoroom.png"
            alt="Logo Com Nome do PneumoFinder"
            width={300} // você pode ajustar esse valor conforme a imagem original
            height={100} // ajuste proporcional à largura
            className='ml-4'
          />
      </div>


      <div className="flex justify-center">
        <a href="https://github.com/CauZy-Goes" target="_blank" aria-label="GitHub"
              className="mx-[0.7em] text-[3em] text-white no-underline transition-transform duration-300 ease-in-out hover:text-[#000342] hover:scale-110">
          <FontAwesomeIcon icon={['fab', 'github']} />
        </a>
        <a href="https://www.linkedin.com/in/cauzy-goes/" target="_blank" aria-label="LinkedIn"
              className="mx-[0.7em] text-[3em] text-white no-underline transition-transform duration-300 ease-in-out hover:text-[#000342] hover:scale-110">
          <FontAwesomeIcon icon={['fab', 'linkedin']} />
        </a>
        <a href="https://x.com/cauzy_goes" target="_blank" aria-label="X (Twitter)"
              className="mx-[0.7em] text-[3em] text-white no-underline  duration-300 ease-in-out hover:text-[#000342] hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={['fab', 'x-twitter']} />
        </a>
      </div>


        <p className="mt-2 text-[0.9em] text-white">© 2025 Cauã Goes - Projeto Acadêmico IA</p>
    </footer>
    );
}