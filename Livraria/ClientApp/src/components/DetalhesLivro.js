import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import PNotify from "pnotify/dist/es/PNotify";
import Carregando from './Carregando';
import './DetalhesLivro.css';

export default class DetalhesLivro extends Component {

    constructor(props) {

        super(props);
        this.state = { livro: {}, carregando: true, sinopseAberta: false };
        this.exibirEsconderSinopse = this.exibirEsconderSinopse.bind(this);
    }

    componentDidMount() {

        fetch('api/Livro/GetDetalhesLivro/' + this.props.match.params.id)
            .then(response => {

                if (!response.ok) {

                    this.setState({ livro: null, carregando: false, sinopseAberta: false });

                    PNotify.error({
                        text: "Erro ao realizar operação. Mensagem de retorno do servidor: " + response.statusText
                    });

                }
                else {
                    return response.json();
                }

            })
            .then(
                (data) => {
                    this.setState({ livro: data, carregando: false, sinopseAberta: false });
                }
            );
    }

    exibirEsconderSinopse(event) {

        this.setState({ livro: this.state.livro, carregando: this.state.carregando, sinopseAberta: !this.state.sinopseAberta });

    }

    carregarDetalhesLivro(livro) {

        let preco;

        if (livro.estoque > 0) {
            preco = <div className="text-success preco-livro">
                <span>R$ {livro.preco.toFixed(2)}</span>
                <span>({livro.estoque} em estoque)</span>
            </div>
        }
        else {
            preco = <div>
                <span className="text-danger">Sem estoque</span>
            </div>
        }

        return (
            <div className="d-flex">
                <div className="container-capa-livro d-flex flex-column">
                    <img className="capa-livro" src={livro.capa} alt="Capa do livro" />
                    <Card className="card-informacoes-livro ">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Informações adicionais</Card.Title>
                            <span title="Ano de lançamento">
                                <span className="fa fa-calendar"></span>
                                {livro.anoLancamento}
                            </span>
                            <span title="Gênero">
                                <span className="fa fa-tag"></span>
                                {livro.genero}
                            </span>
                            <span title="Idioma original">
                                <span className="fa fa-language"></span>
                                {livro.idiomaOriginal}
                            </span>
                            <span title="Editora">
                                <span className="fa fa-building"></span>
                                {livro.editora.nome}
                            </span>
                        </Card.Body>
                    </Card>
                </div>
                <div className="container-informacoes-livro">
                    <h3 className="display-4">{livro.nome}</h3>
                    <div>
                        <strong>{livro.autor.nome}</strong>

                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                    </div>

                    <div className="container-preco">
                        {preco}
                    </div>

                    <div className="container-sinopse">
                        <article className={this.state.sinopseAberta ? "sinopse" : "sinopse sinopse-fechada"}>
                            {livro.sinopse}
                        </article>
                        <hr />
                        <Button variant="outline-primary" onClick={this.exibirEsconderSinopse}>
                            <span className={this.state.sinopseAberta ? "fa fa-minus" : "fa fa-plus"}></span>
                            <span>{this.state.sinopseAberta ? "Ver menos" : "Ver mais"}</span>
                        </Button>
                    </div>

                </div>
            </div>

        );

    }

    render() {

        let conteudo;

        if (this.state.carregando) {
            conteudo = <Carregando></Carregando>;
        }
        else {

            if (this.state.livro === undefined || this.state.livro === null) {
                conteudo = <Alert variant="danger">
                    <span className="fa fa-exclamation"></span>
                    Erro ao carregar informações do livro, tente novamente mais tarde
                </Alert>;
            }
            else {
                conteudo = this.carregarDetalhesLivro(this.state.livro);
            }
        }

        return (
            <Container>
                <Row>
                    <Col>
                        {conteudo}
                    </Col>
                </Row>
            </Container>
        )
    }
}
