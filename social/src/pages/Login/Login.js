import './Login.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

function Login(){

    const [componentLoading, setComponentLoading] = useState(null);
    
    function handleLoading(){
        if(componentLoading !== null){
            setComponentLoading(<Loading />);
        }
    }

    return ( 
        <div>
            <div>
                <input placeholder='Email, telefone ou usuário'></input>
                <input placeholder='Senha'></input>
                <button
                    onClick={() => (
                        setComponentLoading( componentLoading || <Loading /> 
                    ))}> Login 
                </button>
                <Link to='/recover'><h4>Recuperar conta</h4></Link>
                {componentLoading}
            </div> 
        </div>
    );
}

export default Login;
