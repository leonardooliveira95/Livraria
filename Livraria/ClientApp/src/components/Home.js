import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import PNotifyConfirm from "pnotify/dist/es/PNotifyConfirm";
import ListaLivros from './ListaLivros';
import './Home.css';

export class Home extends Component {

    componentDidMount() {

        let mensagem = localStorage.getItem("mensagem");

        if (mensagem !== null) {

            PNotify.success({
                text: mensagem
            });

            localStorage.removeItem("mensagem");
        }

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h4 className="d-flex align-items-center">
                            <span className="fa fa-home"></span>
                            <span>Início</span>
                            <Link to="/editarLivro" className="link-novo-livro">
                                <span className="fa fa-plus"></span>
                                Novo
                            </Link>
                        </h4>
                        <hr />
                        <ListaLivros></ListaLivros>
                    </Col>
                </Row>
            </Container>

        );
    }
}
