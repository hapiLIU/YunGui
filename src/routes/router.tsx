
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/home'} replace />,
    },
    {
        path: '/home',
        element: <Home />,
    },

    // 小游戏
    {
        path: '/minesweeper',
        element: <Minesweeper />,
    },
    {
        path: '/minesweeper/game/:rows/:cols/:mines',
        element: <MinesweeperGame />,
    },
    {
        path: '/sudoku',
        element: <Sudoku />,
    },
    {
        path: '/sudoku/game/:modal',
        element: <SudokuGame />,
    },
    {
        path: '/gobang',
        element: <Gobang />,
    },
    {
        path: '/playingCards',
        element: <PlayingCards />,
    },
    {
        path: '/tankBattle',
        element: <TankBattle />,
    },

    // 练习
    {
        path: '/rottenPenHead',
        element: <RottenPenHead />,
    },

    // three练习
    {
        path: '/threejs',
        element: <ThreeJs />,
    },
    {
        path: '/threejs/testOne',
        element: <ThreeJsTestOne />,
    },
    {
        path: '/threejs/testTwo',
        element: <ThreeJsTestTwo />,
    },
    {
        path: '/threejs/testThree',
        element: <ThreeJsTestThree />,
    },
    {
        path: '/threejs/threeFour',
        element: <ThreeJsTestFour />,
    },

    // 聊天室
    {
        path: '/chatRoom',
        element: <ChatRoom />,
    },

    // 登录
    {
        path: '/login',
        element: <AuthLogin />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />
}
