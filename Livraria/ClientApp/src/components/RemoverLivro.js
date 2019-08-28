import React, { Component } from 'react';
import MensagemConfirmacao from './MensagemConfirmacao';

export default class RemoverLivro extends Component {

    constructor(props) {

        super(props);

        this.state = { confirmacaoAberta: false };
        this.exibirConfirmacaoRemover = this.exibirConfirmacaoRemover.bind(this);
        this.resultadoRemover = this.resultadoRemover.bind(this);
    }

    componentDidMount() {

    }

    exibirConfirmacaoRemover(event) {

        this.setState({ confirmacaoAberta: true });
    }

    resultadoRemover(resultado) {

        if (resultado) {

            fetch("api/Livro/DeleteRemoverLivro/" + this.props.id, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(
                (data) => {
                    localStorage.setItem("mensagem", "Livro removido");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );

            
        }

        this.setState({ confirmacaoAberta: false });
    }

    render() {

        return (
            <div>
                <a href="javascript:void(0)" className="text-danger" onClick={this.exibirConfirmacaoRemover}>
                    <span className="fa fa-trash-o"></span>
                    
                </a>
                <MensagemConfirmacao
                    mensagem={"Tem certeza que deseja remover este livro?"}
                    cabecalho={"Confirmação"}
                    aberto={this.state.confirmacaoAberta}
                    resultado={this.resultadoRemover}>
                </MensagemConfirmacao>
            </div>
        )
    }
}
