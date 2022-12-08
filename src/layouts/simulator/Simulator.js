import Input from "../../components/input/Input";
import { FaPlay, FaPause, FaSquare } from "react-icons/fa";
import "./Simulator.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Simulator(props) {
    const [isPlayed, setIsPlayed] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const disabledPlay = () => {
        return isPlayed ? true : false;
    }

    const disabledPause = () => {
        return isPlayed ? false : true;
    }

    const disabledFinish = () => {
        return isPlayed ? false : isPaused ? false : true;
    }

    const disabledSubmit = () => {
        return !isPlayed && !isPaused ? false : true;
    }

    return (<div className="mybox simulator-root" id="simulator-root">
        <div className="mybox simulator-header">
            <h3>{props.title}</h3>
            <Link className="simulator-link" replace to="/home">Opções</Link>
        </div>
        <div className="mybox simulator-body">
            <div className="mybox simulator-body-info">{`Tempo: ${props.time}s`}</div>
            <div className="mybox simulator-body-warning" style={props.error ? {} : { display: "none" }}>{`Texto mal formatado`}</div>
            {props.children}
        </div>
        <div className="mygrid simulator-footer">
            <div className="mybox simulator-actions">
                <button
                    className="mybtn simulator-action"
                    disabled={disabledPlay()}
                    onClick={() => { props.onPlay(); setIsPlayed(true) }}
                >
                    <FaPlay size={24} />
                </button>
                <button
                    className="mybtn simulator-action"
                    disabled={disabledPause()}
                    onClick={() => { props.onPause(); setIsPlayed(false); setIsPaused(true) }}
                >
                    <FaPause size={24} />
                </button>
                <button
                    className="mybtn simulator-action"
                    disabled={disabledFinish()}
                    onClick={() => { props.onFinish(); setIsPlayed(false); setIsPaused(false) }}
                >
                    <FaSquare size={24} />
                </button>
            </div>
            <div className="flex simulator-input">
                <Input defaultValue={props.defaultText} readonly={disabledSubmit()} onChange={(text) => props.onChange(text)} />
            </div>
            <div className="mybox simulator-submit">
                <button
                    className="mybtn simulator-btn-submit"
                    disabled={disabledSubmit()}
                    onClick={() => props.onSubmit()}
                >
                    Submeter
                </button>
            </div>
        </div>
    </div>);
}