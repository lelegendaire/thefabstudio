'use client';
import {useState} from 'react'
import Burger from './menu/burger';
import Stairs from './menu/stairs';
import Menu from './menu/menu';
import { AnimatePresence } from 'framer-motion';

export default function () {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <div >
            <Burger openMenu={() => {setMenuIsOpen(true)}}/>
            <AnimatePresence mode="wait">
            {
                menuIsOpen && <>
                <Stairs />
                <Menu closeMenu={() => {setMenuIsOpen(false)}}/>
                </>
            }
            </AnimatePresence>
        </div>
    )
}