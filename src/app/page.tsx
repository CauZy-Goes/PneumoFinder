import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

export default function Home() {
  return ( 
    <div>
      <div className="global">
        <Header/>
        <Main/>
      </div>
        <Footer/>
    </div>
    
  );
}
