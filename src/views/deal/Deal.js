import { useEffect, useState } from "react";
import { getRandomColor } from "../../colors";
import Group from "../../components/group/Group";
import Simulator from "../../layouts/simulator/Simulator";
import "./Deal.css";

export default function Deal() {
    const [text, setText] = useState(initExample);
    const [senders, setSenders] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [sendMessages, setSendMessages] = useState([]);
    const [isPlayed, setIsPlayed] = useState(false);
    const [isFinished, setIsFinished] = useState(true);
    const [marks, setMarks] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const [submited, setSubmited] = useState(false);

    useEffect(() => {
        if (isPlayed) {
            let flag = false;
            for (let i = 0; i < receivers.length; i++) {
                const rMsgs = receivers[i].messages ?? []
                if (rMsgs.length < messages.length && rMsgs !== []) {
                    flag = true;
                }
            }
            if (flag) {
                setTimeout(() => {
                    let newReceivers = receivers;
                    for (let i = 0; i < messages.length; i++) {
                        for (let j = 0; j < receivers.length; j++) {
                            if (messages[i].timers[j] === count) {
                                const eMsg = document.getElementById("message-" + messages[i].value);
                                const eMsgCoord = eMsg.getBoundingClientRect();
                                const cloneEMsg = eMsg.cloneNode(true);
                                cloneEMsg.id = "clone-msg" + messages[i].value;
                                cloneEMsg.style.position = "absolute";
                                eMsg.after(cloneEMsg);
                                const eRGroupCoord = document.getElementById("group-body-1").getBoundingClientRect();
                                const simRootCoord = document.getElementById("simulator-root").getBoundingClientRect();
                                if (simRootCoord.width < 900) {
                                    const x = 0;
                                    const y = eRGroupCoord.y - eMsgCoord.y;
                                    cloneEMsg.style.transform = `translateX(${x}px) translateY(${y}px)`;
                                    cloneEMsg.style.opacity = `0`;
                                } else {
                                    const x = eRGroupCoord.x - eMsgCoord.x + 100;
                                    const y = 0;
                                    cloneEMsg.style.transform = `translateX(${x}px) translateY(${y}px)`;
                                    cloneEMsg.style.opacity = `0`;
                                }

                                let rMsgs = receivers[j].messages ?? [];
                                rMsgs.push(messages[i]);
                                newReceivers[j].messages = rMsgs;
                            }
                        }
                    }
                    setReceivers(newReceivers);
                    setCount(count + 1);
                }, 1000);
            } else if (count >= messages.length && !isFinished && receivers[0]) {
                let amountAux = 0;
                let msgStrAux = JSON.stringify(receivers[0].messages.map((msg) => msg.value));
                let newMarks = [];
                newMarks = marks;
                for (let i = 0; i < receivers.length; i++) {
                    const msgStr = JSON.stringify(receivers[i].messages.map((msg) => msg.value));
                    const amount = receivers.filter((receiver) => JSON.stringify(receiver.messages.map((msg) => msg.value))).length;
                    if (amount > amountAux) {
                        msgStrAux = msgStr;
                    }
                }
                for (let i = 0; i < receivers.length; i++) {
                    const msgStr = JSON.stringify(receivers[i].messages.map((msg) => msg.value));
                    if (msgStr === msgStrAux) {
                        newMarks.push(i)
                    }
                }
                setMarks(newMarks);
                setIsFinished(true);
            }
        }
        else if (isFinished) {
            setCount(0);
            const amountMsg = messages.length;
            const amountReceivers = receivers.length;
            let newMessages = messages;
            if (amountReceivers > 0 && amountMsg > 0) {
                for (let i = 0; i < amountMsg; i++) {
                    let timers = [];
                    for (let j = 0; j < amountReceivers; j++) {
                        timers.push(parseInt(Math.random() * (amountMsg - 0) + 0));
                    }
                    newMessages[i].timers = timers;
                }
                setMessages(newMessages);
            }
        }
    }, [isPlayed, sendMessages, count, messages, receivers, isFinished, marks])

    function onPlay() {
        setIsPlayed(true);
        setIsFinished(false);
    }
    function onPause() {
        setIsPlayed(false);
    }
    function onFinish() {
        setCount(0);
        setMessages([]);
        setSenders([]);
        setReceivers([]);
        setSendMessages([]);
        setMarks([]);
        setIsFinished(true);
        setIsPlayed(false);
    }

    function onSubmit() {
        let lines = text.split("\n");
        let emissores = [];
        let receptores = [];
        let colors = [];
        if (!submited) {
            try {
                if (lines.length > 0) {
                    const emissoresArrStr = lines.filter((line) => line.includes("emissor"));
                    const receptoresArrStr = lines.filter((line) => line.includes("receptor"));
                    if (emissoresArrStr.length > 0 && receptoresArrStr.length > 0) {
                        emissores = emissoresArrStr.map((emissor, k) => {
                            const index = emissor.indexOf(",") + 1;
                            if (index < emissor.length) {
                                const obj = JSON.parse(emissor.slice(index));
                                if (obj.mensagens) {
                                    return {
                                        title: obj.nome,
                                        messages: obj.mensagens.map((message, i) => {
                                            const color = getRandomColor(colors);
                                            colors.push(color);
                                            let newMessages = [];
                                            newMessages = messages;
                                            newMessages.push({ value: k * 1000 + i, color, });
                                            setMessages(newMessages);
                                            return { value: k * 1000 + i, color }
                                        })
                                    }
                                } else {
                                    return {};
                                }
                            } else {
                                return {};
                            }
                        })
                        receptores = receptoresArrStr.map((receptor) => {
                            const index = receptor.indexOf(",") + 1;
                            if (index < receptor.length) {
                                const obj = JSON.parse(receptor.slice(index));
                                return {
                                    title: obj.nome,
                                    messages: [],
                                }
                            } else {
                                return {};
                            }
                        })
                    }
                }
                setSenders(emissores);
                setReceivers(receptores);
                setError(false);
                setSubmited(true);
            } catch (_) {
                setError(true);
                setMessages([]);
                setSenders([]);
                setReceivers([]);
                setSendMessages([]);
                setMarks([]);
            }
        }
    }
    return (
        <Simulator
            title="Acordo no Destino"
            time={count}
            defaultText={text}
            onChange={(text) => setText(text)}
            onPlay={onPlay}
            onPause={onPause}
            onFinish={onFinish}
            onSubmit={onSubmit}
            error={error}
        >
            <div className="mybox deal-body">
                <div className="mygrid deal-grid" >
                    <Group title="Grupo Emissor" items={senders} />
                    <Group title="Grupo Receptor" id="1" items={receivers} marks={marks} />
                </div>
            </div>
        </Simulator>
    );
}

const initExample = 'emissor, {"nome": "A", "mensagens": [1, 2, 3]} \nemissor, { "nome": "H", "mensagens": [1] } \nreceptor, { "nome": "B" }\nreceptor, { "nome": "C" }\nreceptor, { "nome": "D" }\nreceptor, { "nome": "E" }\nreceptor, { "nome": "F" }\nreceptor, { "nome": "I" }\nreceptor, { "nome": "J" }\nreceptor, { "nome": "K" }\nreceptor, { "nome": "L" }\nreceptor, { "nome": "M" }\nreceptor, { "nome": "N" }\nreceptor, { "nome": "P" }\nreceptor, { "nome": "O" }\nreceptor, { "nome": "S" }\nreceptor, { "nome": "T" }';