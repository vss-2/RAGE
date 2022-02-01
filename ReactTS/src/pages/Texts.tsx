import { useState } from "react";
import { Textbox } from "../components/Textbox";

export default function Texts(){
  const [textboxes, setTextboxes] = useState<string[]>([
    '1', '2', '3', '4'
  ]);
  
  function createTextBox(){
    setTextboxes([...textboxes, textboxes.length+1+'  ']);
  }

  return(
    <div>
      {
        textboxes.map(tb => {
          return <Textbox text={tb} />
        })
      }
    <button onClick={createTextBox}>Adicionar textbox</button>
    </div>
  )
}
