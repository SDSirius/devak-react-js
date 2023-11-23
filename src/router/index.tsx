import { createBrowserRouter } from "react-router-dom";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import { Home } from "../views/Home";
import { Profile } from "../views/Profile";
import { AddCar } from "../views/AddCar";
import { CarView } from "../views/CarView";
import { UserView } from "../views/UserView";


export const getRouter = (token:string) => {
    if (!token){
        return  createBrowserRouter([
            {
                path: '*',
                id: 'home',
                element: <Home />
            },
            {
                path: '/login',
                id: 'login',
                element: <Login />
            },
            {
                path: '/register',
                id: 'register',
                element: <Register />
            },{
                path: '/userView/:id',
                element: <UserView />
            },{
                path: '/carView/:id',
                element: <CarView />
            }
        ]);
    }else{
        return  createBrowserRouter([
            {
                path: '*',
                id: 'home',
                element: <Home />
            },
            {
                path: '/addCar',
                id: 'addCar',
                element: <AddCar />
            },
            {
                path: '/user',
                id: 'user',
                element: <Profile />
            }
            ,{
                path: `/userView/:id`,
                id: 'userView',
                element: <UserView />
            },{
                path: '/carView/:id',
                id: 'carView',
                element: <CarView />
            }
        ]);
    }
}
