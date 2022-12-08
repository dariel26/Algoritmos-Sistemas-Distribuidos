import "./ItemDeal.css";

export default function ItemDeal(props) {
    return (
        <div className="mybox item-deal-root" style={{ border: props.mark ? "1px solid red": undefined}}>
            <div className="mybox item-deal-header">
                {props.title}
            </div>
            <div className="mybox item-deal-body">
                {props.messages.map((message, index) => (
                    <div
                        key={"message-"+index}
                        style={{ backgroundColor: message.color }}
                        id={"message-" + message.value}
                        className="mybox item-deal-mess"
                    />
                ))}
            </div>
        </div>
    );
}