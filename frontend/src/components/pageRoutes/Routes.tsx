import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "../home";



const routes = [
    {
        path: "/",
        component: <Home />
    }
]

export default function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                    <Route path={route.path} element={route.component} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}