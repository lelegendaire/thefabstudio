"use client";
import { AlignJustify } from 'lucide-react';
export default function Burger({openMenu}) {

    return (
        <AlignJustify onClick={() => {openMenu()}} color="white"/>
    )
}