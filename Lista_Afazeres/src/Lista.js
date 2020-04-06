import React, { Fragment, Component } from 'react';
import './Lista.css'

function Lista(props){
    const itens = props.itens;
    const listaItens = itens.map(
        item => {
            return <div className="classeLista" key={item.chave}>
                <p>
                    <input type="text" id={item.chave} value={item.texto} onChange={ 
                        (e) => {
                            props.atualizarItem(e.target.value, item.chave)
                        }
                    }
                    />
                <span>
                    <button onClick={() => { props.deletarItem(item.chave)}}>Deletar</button>
                </span>
                </p>
            </div>
        }
    )
    return(
        //React.createElement("p", null, "foo"),
        //<div>{listaItens}<div>
        //React.createElement("div", null, {listaItens})//<React.Fragment>
        //</React.Fragment>
        <div>{listaItens}</div>
    )
}

export default Lista;