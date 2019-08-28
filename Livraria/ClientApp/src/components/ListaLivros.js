import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CardDeck, Card } from 'react-bootstrap';
import PNotify from "pnotify/dist/es/PNotify";
import Carregando from './Carregando';
import MensagemConfirmacao from './MensagemConfirmacao';
import './ListaLivros.css';
import RemoverLivro from './RemoverLivro';

export default class ListaLivros extends Component {

    constructor(props) {

        super(props);
        this.state = { livros: [], carregando: true };
    }

    componentDidMount() {

        fetch('api/Livro/GetLivros')
            .then(response => {

                if (!response.ok) {

                    this.setState({ carregando: false });

                    PNotify.error({
                        text: "Erro ao realizar operação. Mensagem de retorno do servidor: " + response.statusText
                    });

                }

                return response.json();
            })
            .then(data => this.setState({ livros: data, carregando: false, confirmacaoAberta: false }));

    }

    carregarTabelaLivros(livros) {

        return (

            <CardDeck>
                {
                    livros.map(livro => 

                        <Card key={livro.id}>
                            <Card.Img variant="top" src={livro.capa} />
                            <Card.Body>
                                <Card.Title>{livro.nome}</Card.Title>
                                <Card.Text>{livro.autor.nome}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to={"/editarLivro/" + livro.id}>
                                    <span className="fa fa-edit"></span>
                                    
                                </Link>
                                <Link to={"/detalhes/" + livro.id}>
                                    <span className="fa fa-search"></span>
                                    
                                    
                                </Link>
                                <RemoverLivro id={livro.id}></RemoverLivro>
                            </Card.Footer>
                        </Card>

                    )
                }
            </CardDeck>
        );

    }

    render() {

        let conteudo = this.state.carregando
            ? <Carregando></Carregando>
            : this.carregarTabelaLivros(this.state.livros)

        return (
            <div>
                {conteudo}
            </div>
        );
    }
}
