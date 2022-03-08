import './Loading.css';
import { useState } from "react";

const Loading = () => {

    // const [loading, setLoading] = useState(false);
    // function handleClickLoginButton(){
    //     console.log('Loading: '+loading);
    //     if(!loading){
    //         setLoading(true)
    //     }
    //     setTimeout(() => setLoading(false), 1000);
    // }

    return (
        <div id='loading'>
            <h2> Loading </h2>
        </div>
    )
}

export default Loading;