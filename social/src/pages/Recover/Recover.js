import './Recover.css'
import { useState } from "react";
import Loading from "../../components/Loading/Loading";

function Recover(){

    const [componentLoading, setComponentLoading] = useState(null);
    
    function handleLoading(){
        if(componentLoading !== null){
            setComponentLoading(<Loading />);
        }
    }
    
    return (
        <div>
            <input placeholder='Email' />
            <input placeholder='Telefone' />
            <button onClick={() => setComponentLoading( componentLoading || <Loading /> )}>Recuperar</button>
            {componentLoading}
        </div>
    );
}

export default Recover;