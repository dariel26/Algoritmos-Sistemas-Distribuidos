import ItemDeal from "../item_deal/ItemDeal";
import "./Group.css";
export default function Group(props) {
    return (
        <div className="mybox group-root">
            <div className="mybox group-header">
                {props.repeats ? props.title + " - Repetições: " + props.repeats : props.title}
            </div>
            <div className="mygrid group-body" id={"group-body-" + props.id}>
                {props.items.map((item, index) => (
                    <ItemDeal
                        key={"item-" + index}
                        mark={props.marks ? props.marks.includes(index) : undefined}
                        title={item.title} messages={item.messages}
                    />
                ))}
            </div>
        </div>
    );
}