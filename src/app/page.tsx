import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return ( 
    <div>
      <div className="max-w-[1200px] mx-auto">
        <Header/>
        <Main/>
      </div>
        <Footer/>
    </div>
    
  );
}