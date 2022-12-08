import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import About from "./views/about/About";
import Deal from "./views/deal/Deal";
import Home from "./views/home/Home";
import Timer from "./views/timer/Timer";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/deal" element={<Deal />} />
                <Route path="/timer" element={<Timer />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate replace to="/home" />} />
            </Routes>
        </BrowserRouter>
    )
}