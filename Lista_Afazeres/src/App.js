import React, { Component } from 'react';
import './App.css';
import Lista from './Lista';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itens: [],
            itemAtual: {
                texto: '',
                chave: ''
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.adcItem = this.adcItem.bind(this);
        this.deletarItem = this.deletarItem.bind(this);
        this.atualizarItem = this.atualizarItem.bind(this);
    }

    handleInput(e){
        this.setState({
            itemAtual: {
                texto: e.target.value,
                chave: Date.now()
            }
        })
    }

    adcItem(e){
        e.preventDefault();
        const novoItem = this.state.itemAtual;
        if(novoItem.text !== ""){
            const novosItens = [...this.state.itens, novoItem]
            this.setState({
                itens: novosItens,
                itemAtual: {
                    texto: '',
                    chave: ''
                }
            })
        }
        console.log(novoItem)
    }

    deletarItem(chave){
        const itensFiltrados = this.state.itens.filter(item => item.chave !== chave);
        this.setState({
            itens: itensFiltrados
        })
    }

    atualizarItem(texto, chave){
        const itens = this.state.itens;
        itens.map(item => {
            if(item.chave === chave)
                item.texto = texto;
        })
        this.setState({
            itens: itens
        })
    }

    render()
    {
        return (
            <div>
                <header>
                    <form id="lista-de-afazeres" onSubmit={this.adcItem}>
                        <input 
                            type="text" 
                            placeholder="Escreva aqui..."
                            value={this.state.itemAtual.text}
                            onChange={this.handleInput}
                        />
                        <button type="submit">Adicionar</button>
                    </form>
                </header>
                <div>
                    <Lista 
                    itens = {this.state.itens}
                    deletarItem = {this.deletarItem}
                    atualizarItem = {this.atualizarItem}
                    setUpdate = {this.atualizarItem}
                    />
                </div>
            </div>
        )
    }
}

export default App;