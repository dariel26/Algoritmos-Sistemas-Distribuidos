import "./LineTime.css";

export default function LineTime(props) {
    return (
        <div className="mybox linetime-root">
            <div className="mybox linetime-title">
                <span>{props.title}</span>
            </div>
            <div className="mybox linetime-body">
                <div className="mybox linetime-body-line" />
            </div>
            {
                props.items ? props.items.map((item, i) => {
                    return (
                        <div className="mybox linetime-item" id={"item" + item.nome}
                            key={`item${i}`} style={{ marginLeft: `${item.margin}px` }}>
                            <div className="mybox linetime-item-header">
                                <table className="linetime-item-table">
                                    <tbody><tr>{item.timers ? item.timers.map((timer) => (<td className="linetime-td">{timer}</td>)) : undefined}</tr></tbody>
                                </table>
                            </div>
                            <div className="mybox linetime-item-body">
                                <div className="mybox linetime-item-ball" />
                            </div>
                            <div className="mybox linetime-item-footer">
                                {item.name}
                            </div>
                        </div>
                    )
                }) : undefined}
        </div>
    );
}