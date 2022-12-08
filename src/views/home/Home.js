import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="mybox home-root">
            <div className="mybox home-header">
                <div className="mybox home-about"></div>
                <div className="mybox home-title"><h2>Trabalho Prático de Sistémas Distribuidos</h2></div>
                <div className="mybox home-about">
                    <Link className="home-link" to="/about">Sobre</Link>
                </div>
            </div>
            <div className="mybox home-body">
                <button className="mybtn home-item" onClick={() => navigate("/deal")}><span>Acordo no Destino</span></button>
                <button className="mybtn home-item" onClick={() => navigate("/timer")}><span>Relógios Vetoriais</span></button>
            </div>
        </div>
    );
}