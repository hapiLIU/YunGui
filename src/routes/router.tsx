
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Minesweeper from '../components/playGames/Minesweeper';
import MinesweeperGame from '../components/playGames/Minesweeper/game';
import Home from '../components/home';
import Sudoku from '../components/playGames/Sudoku';
import SudokuGame from '../components/playGames/Sudoku/game';
import Gobang from '../components/playGames/Gobang';
import PlayingCards from '../components/playGames/PlayingCards';
import RottenPenHead from '../components/rottenPenHead';
import PracticeUI from '../components/rottenPenHead/PracticeUI';
import TankBattle from '../components/playGames/TankBattle';
import ThreeJs from '../components/threeJs';
import ThreeJsTestOne from '../components/threeJs/testOne';
import ThreeJsTestTwo from '../components/threeJs/testTwo';
import ThreeJsTestThree from '../components/threeJs/testThree';
import ChatRoom from '../components/chatRoom';

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
                <Route path="/tankBattle" element={<TankBattle />}></Route>

                <Route path="/rottenPenHead" element={<RottenPenHead />}></Route>

                <Route path="/threejs" element={<ThreeJs />}></Route>
                <Route path="/threejs/testOne" element={<ThreeJsTestOne />}></Route>
                <Route path="/threejs/testTwo" element={<ThreeJsTestTwo />}></Route>
                <Route path="/threejs/testThree" element={<ThreeJsTestThree />}></Route>

                <Route path="/chatRoom" element={<ChatRoom />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
