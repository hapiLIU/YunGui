
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Minesweeper from '../components/Minesweeper';
import MinesweeperGame from '../components/Minesweeper/game';
import Home from '../components/home';
import Sudoku from '../components/Sudoku';
import SudokuGame from '../components/Sudoku/game';
import Gobang from '../components/Gobang';
import PlayingCards from '../components/PlayingCards';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/minesweeper" element={<Minesweeper />}></Route>
                <Route path="/minesweeper/game/:rows/:cols/:mines" element={<MinesweeperGame />}></Route>
                <Route path="/sudoku" element={<Sudoku />}></Route>
                <Route path="/sudoku/game/:modal" element={<SudokuGame />}></Route>
                <Route path="/gobang" element={<Gobang />}></Route>
                <Route path="/playingCards" element={<PlayingCards />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
