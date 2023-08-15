interface InputProps {
  placeholder?: string;
  type: string;
  value?: string;
  element?: string;
  id?: string;
  rows?: number;
}
const Input = (props: InputProps) => {
  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );
  return <>{element}</>;
};
export default Input;
