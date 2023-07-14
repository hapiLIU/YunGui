
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Minesweeper from '../components/Minesweeper';
import MinesweeperGame from '../components/Minesweeper/game';
import Home from '../components/home';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/minesweeper" element={<Minesweeper />}></Route>
                <Route path="/minesweeper/game/:rows/:cols/:mines" element={<MinesweeperGame />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
