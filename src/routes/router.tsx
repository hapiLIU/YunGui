
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Minesweeper from '../page/playGames/Minesweeper';
import MinesweeperGame from '../page/playGames/Minesweeper/game';
import Home from '../home';
import Sudoku from '../page/playGames/Sudoku';
import SudokuGame from '../page/playGames/Sudoku/game';
import Gobang from '../page/playGames/Gobang';
import PlayingCards from '../page/playGames/PlayingCards';
import RottenPenHead from '../page/rottenPenHead';
import TankBattle from '../page/playGames/TankBattle';
import ThreeJs from '../page/threeJs';
import ThreeJsTestOne from '../page/threeJs/testOne';
import ThreeJsTestTwo from '../page/threeJs/testTwo';
import ThreeJsTestThree from '../page/threeJs/testThree';
import ThreeJsTestFour from '../page/threeJs/testFour';
import ChatRoom from '../page/chatRoom';
import AuthLogin from '../authLogin/auth-login';

export default function Router() {
    console.log(process.env.NODE_ENV)
    return (
        <BrowserRouter basename={process.env.NODE_ENV == 'development' ? '/' : '/YunGui/'}>
            <Routes>
                <Route path="/" element={<Navigate to={'/home'} replace />}></Route>
                <Route path="/home" element={<Home />}></Route>

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
                <Route path="/threejs/threeFour" element={<ThreeJsTestFour />}></Route>

                <Route path="/chatRoom" element={<ChatRoom />}></Route>

                <Route path="/login" element={<AuthLogin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
