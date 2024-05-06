import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./components/Main";
import Header from "./common/Header";
import TeamList from "./components/leagues/TeamList";
import TeamDetails from "./components/leagues/TeamDetails";
import Match from "./components/matches/Match";
import NotFound from "./common/NotFound";

export const Router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : '' ,
                element : <Main/>,
            },     
            {
                path : '/search',
                element : <Match/>
            },
            {
                path : '/league',
                element : <TeamList/>
            },
            {
                path : '/league/:teamid',
                element : <TeamDetails/>
            }
        ],
        errorElement: (
            <>
                <Header />
                <NotFound errorStatus={404}/>
            </>
        ),
    }
])