
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Minesweeper from '../components/playGames/Minesweeper';
import MinesweeperGame from '../components/playGames/Minesweeper/game';
import Home from '../components/home';
import Sudoku from '../components/playGames/Sudoku';
import SudokuGame from '../components/playGames/Sudoku/game';
import Gobang from '../components/playGames/Gobang';
import PlayingCards from '../components/playGames/PlayingCards';

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
