'use client'

import Image from "next/image"

import "@/"

export function Header(){
    return (
        <header>
           <Image 
            src="/IMGs_PneumoFinder/Logo E Nome-Photoroom.png"
            alt="Logo Com Nome do PneumoFinder"
            width={300}
            height={0}
            style={{ height: 'auto' }} />
        </header>
    )
}