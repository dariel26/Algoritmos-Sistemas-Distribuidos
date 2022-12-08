import "./Input.css";
export default function Input(props) {
    return (
        <textarea
            className="input-text"
            readOnly={props.readonly}
            rows={props.rows}
            defaultValue={props.defaultValue}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );
}
