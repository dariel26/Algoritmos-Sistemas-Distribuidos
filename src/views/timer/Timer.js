import { useEffect, useState } from "react";
import LineTime from "../../components/line_time/LineTime";
import Simulator from "../../layouts/simulator/Simulator";
import "./Timer.css";

const empty = [];
export default function Timer() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState(processExample);
    const [lineTimes, setLineTimes] = useState(empty);
    const [relaptions, setRelaptions] = useState(empty);
    const [isPlayed, setIsPlayed] = useState(false);
    const [isFinished, setIsFinished] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [stack, setStack] = useState([]); //[{x:2, y:1},...]
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isPlayed) {
            setTimeout(() => {
                const process = lineTimes[x].items[y];
                if (process.timers) { //Verifica se tem timers
                    //Tem timers, entao vai para o proximo
                    if (lineTimes[x].items[y + 1]) { //Existe proximo
                        setY(y + 1);
                    } else {                      //Não existe proximo
                        if (lineTimes[x + 1]) {     //Existe proxima linha
                            setX(x + 1);
                            setY(0);
                        } else { //Existe alguem na fila?
                            if (stack.length === 0) {
                                setIsFinished(true);
                                setIsPaused(false);
                                setIsPlayed(false);
                            } else {
                                const stackAux = stack;
                                setX(stack[stack.length - 1].x);
                                setY(stack[stack.length - 1].y);
                                stackAux.pop();
                                setStack(stackAux);
                            }
                        }
                    }
                } else {//Não tem timer
                    //Verifica se está sendo chamado
                    let calling = undefined;
                    for (let i = 0; i < relaptions.length; i++) { //Esta sendo chamado por alguem?
                        if (relaptions[i].for === process.name) {
                            calling = relaptions[i].of;
                            break;
                        }
                    }
                    if (calling) { //Sim esta sendo Chamado, acha quem está chamando
                        for (let j = 0; j < lineTimes.length; j++) {
                            for (let k = 0; k < lineTimes[j].items.length; k++) {
                                if (lineTimes[j].items[k].name === calling) { //Este aqui chamou, ele tem Timers?
                                    if (lineTimes[j].items[k].timers) { //Sim tem, entao atualiza o timer do atual
                                        let passTimer = [];
                                        const lineTimesAux = lineTimes;
                                        passTimer = passTimer.concat(lineTimes[j].items[k].timers);
                                        if (lineTimesAux[x].items[y - 1]) {//Existe alguem atras do elemento atual?
                                            let timerBehind = [];   //Sim existe, compara os timers
                                            timerBehind = timerBehind.concat(lineTimesAux[x].items[y - 1].timers);
                                            if (timerBehind[x] > passTimer[x]) {
                                                passTimer[x] = timerBehind[x] + 1;
                                            } else {
                                                passTimer[x] = passTimer[x] + 1;
                                            }
                                        } else {
                                            passTimer[x] = 1;
                                        }
                                        lineTimesAux[x].items[y].timers = passTimer;
                                        setLineTimes(lineTimesAux);
                                    } else {  //Não tem timer, coloca o atual na fila e resolve o que chama
                                        const stackAux = stack;
                                        stackAux.push({ x: x, y: y });
                                        setStack(stackAux);
                                        setY(k);
                                        setX(j);
                                    }
                                }
                            }
                        }

                    } else { //Verifica se tem alguem atras dele
                        if (lineTimes[x].items[y - 1]) {//Existe, entao verifica se tem timers
                            if (lineTimes[x].items[y - 1].timers) {//Tem timer 
                                let passTimer = [];
                                passTimer = passTimer.concat(lineTimes[x].items[y - 1].timers);
                                passTimer[x] = passTimer[x] + 1;
                                const lineTimesAux = lineTimes;
                                lineTimesAux[x].items[y].timers = passTimer; //Coloca o timer do anterior
                                setLineTimes(lineTimesAux);
                            } else {  //Não tem timer, entao coloca este na fila e resolve o anterior
                                const stackAux = stack;
                                stackAux.push({ x, y });
                                setStack(stackAux);
                                setY(y - 1);
                            }
                        } else { //Não existe ninguem atrás dele, então coloca timer padrao
                            let defaultTimer = [];
                            for (let i = 0; i < lineTimes.length; i++) {
                                if (i === x) {
                                    defaultTimer.push(1);
                                } else {
                                    defaultTimer.push(0);
                                }
                            }
                            const lineTimesAux = lineTimes;
                            lineTimesAux[x].items[y].timers = defaultTimer;
                            setLineTimes(lineTimesAux);
                        }
                    }
                }

                setCount(count + 1);
            }, 1000)
        } else if (isFinished) {
            setIsPlayed(false);
            setCount(0);
            setX(0);
            setY(0);
        } else if (!isPaused) {
            setLineTimes(empty);
            setRelaptions(empty);
            setCount(0);
            setX(0);
            setY(0);
        }
    }, [isPlayed, count, lineTimes, x, y, relaptions, isFinished, stack, isPaused])

    function onPlay() {
        setIsPlayed(true);
        setIsFinished(false);
        setIsPaused(false);
    }
    function onPause() {
        setIsPlayed(false);
        setIsPaused(true);
    }
    function onFinish() {
        setIsPlayed(false);
        setIsFinished(false);
        setIsPaused(false);
        setLineTimes([]);
        setRelaptions([]);
        setCount(0);
        setX(0);
        setY(0);
    }

    function onSubmit() {
        let lines = text.split("\n");
        let process = [];
        let relaptions = [];
        try {
            if (lines.length > 0) {
                const processArrStr = lines.filter((line) => line.includes("linha"));
                const relaptionsArrStr = lines.filter((line) => line.includes("relação"));
                if (processArrStr.length > 0) {
                    process = processArrStr.map((process) => {
                        const index = process.indexOf(",") + 1;
                        if (index < process.length) {
                            const obj = JSON.parse(process.slice(index));
                            return { title: obj.nome, items: obj.itens.map((item) => ({ name: item.nome })) };
                        } else {
                            return {};
                        }
                    })
                }
                if (relaptionsArrStr.length > 0) {
                    relaptions = relaptionsArrStr.map((relaption) => {
                        const index = relaption.indexOf(",") + 1;
                        if (index < relaption.length) {
                            const obj = JSON.parse(relaption.slice(index));
                            return { of: obj.de, for: obj.para }
                        } else {
                            return {}
                        }
                    })
                }
            }
            const marginPadrao = 70;
            for (let i = 0; i < process.length; i++) {
                for (let j = 0; j < process[i].items.length; j++) {
                    process[i].items[j].margin = marginPadrao * (j + 1);
                }
            }
            setIsFinished(true);
            setLineTimes(process);
            setRelaptions(relaptions);
            setError(false);
        } catch (_) {
            setLineTimes([]);
            setRelaptions([]);
            setCount(0);
            setX(0);
            setY(0);
            setError(true);
        }

    }

    return (
        <Simulator
            error={error}
            title="Relógios Vetoriais"
            time={count}
            defaultText={text}
            onChange={(text) => setText(text)}
            onPlay={onPlay}
            onPause={onPause}
            onFinish={onFinish}
            onSubmit={onSubmit}
        >
            <div className="mybox timer-column">
                {lineTimes ? lineTimes.map((line, i) => (
                    <LineTime key={i} title={line.title} items={line.items} />
                )) : undefined}
            </div>
        </Simulator>
    );
}

const processExample = 'linha, {"nome": "P1", "itens": [{"nome": "A"}, {"nome": "B"}, {"nome": "C"}]}\nlinha, {"nome": "P2", "itens": [{"nome": "D"}, {"nome": "E"}, {"nome": "F"}, {"nome": "G"}]}\nrelação, {"de": "A", "para": "D"}\nrelação, {"de": "G", "para": "C"}';