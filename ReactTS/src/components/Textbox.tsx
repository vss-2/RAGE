type TextboxProps = {
  text: String;
}

export function Textbox(props: TextboxProps){
  return(
    <p>{props.text}</p>
  );
}
