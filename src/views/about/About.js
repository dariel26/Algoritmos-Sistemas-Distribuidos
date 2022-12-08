import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
    return (
        <div className="mybox home-root">
            <div className="mybox home-header">
                <div className="mybox home-about"></div>
                <div className="mybox home-title"><h2>Universidade Federal de Santa Catarina</h2></div>
                <div className="mybox home-about">
                    <Link className="home-link" to="/home">Opções</Link>
                </div>
            </div>
            <div className="mybox about-body">
                <p>
                    <strong>Disciplina: Sistemas Distribuídos.</strong>
                    <br />
                    <strong>Professor: Jim Lau.</strong>
                    <br />
                    <strong>Autor: Dariel Arian Acosta Campos.</strong>
                    <br />
                    <br />
                    Este trabalho busca simular dois algoritmos utilizados na área de Sistemas Distribuídos,
                    os quais são: Acordo no Destino e Relógios Vetoriais.
                    <br />
                    <br />
                    <strong>Acordo no Destino:</strong>
                    <br />
                    As mensagens são difundidas (de forma confiável) diretamente para todos os menmbros do Grupo
                    receptor.
                    <br />
                    No entanto, para definir a ordem de entrega dessa mensagem, cada receptor participa de um protocolo
                    de acordo (ou consenso distribuído) no sentido de definir a ordem total que essa mensagem deve ser
                    entregue e a decisão pode ser tomada pelo voto majoritário.
                    <br />
                    <br />
                    <strong>Relógios Vetoriais:</strong>
                    <br />
                    Em um sistema distribuído com N processos, cada processo Pi possui seu próprio relógio vetorial de tamanho
                    N: Vi[N]
                    <br />
                    <ul>
                        <li>Inicialmente Vi[j] = 0, para todo i e j</li>
                        <li>Na posição Vi[i] tem-se o total de eventos que ocorreram no próprio processo Pi</li>
                        <li>Na posição Vi[j] tem-se o total de eventos que ocorreram em Pj e que puderam ser observados por Pi</li>
                        <ul><li>i != j</li></ul>
                    </ul>
                    <br />
                    Regras para Atualização:
                    <ul>
                        <li>Evento local em Pi</li>
                        <ul><li>Vi[i] = Vi[i] + 1</li></ul>
                        <li>Ao enviar mensagem</li>
                        <ul><li>Vi é anexado em toda mensagem enviada por Pi</li></ul>
                        <li>Ao receber uma mensagem</li>
                        <ul><li>Pj ao receber mensagem de Pi faz</li>
                            <li>Evento local em Pi</li>
                            <ul>
                                <li>Vj[k] = max(Vj[k], Vi[k]), j != k, para k = 1 até n</li>
                                <li>Vj[j] = Vj[j] + 1</li>
                            </ul>
                        </ul>
                    </ul>
                </p>
            </div>
        </div>
    );
}