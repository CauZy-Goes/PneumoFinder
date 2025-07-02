'use client'

import Image from "next/image"

export function Header(){
    return (
        <header  className="
                            flex 
                            justify-center 
                            items-center 
                            pt-[10px] 
                            px-[10px] 
                            pb-0 
                            border-b-[10px] 
                            border-[#016798] 
                            text-center
                        " >
           <Image 
            src="/IMGs_PneumoFinder/Logo E Nome-Photoroom.png"
            alt="Logo Com Nome do PneumoFinder"
            width={300}
            height={0}
            style={{ height: 'auto' }} />
        </header>
    )
}