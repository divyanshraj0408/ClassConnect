interface InputProps {
  placeholder?: string;
  type: string;
  value?: string;
}
const Input = (props: InputProps) => {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
      />
    </>
  );
};
export default Input;
