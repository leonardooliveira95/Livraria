import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './MensagemConfirmacao.css';

export default class MensagemConfirmacao extends Component {

    constructor(props) {

        super(props);
        this.state = { mensagem: "", showModal: false };
        this.fecharModal = this.fecharModal.bind(this);
    }

    fecharModal(resultado) {
        this.props.resultado(resultado);
    }

    componentDidMount() {

    }

    render() {

        return (
            <Modal show={this.props.aberto} onHide={this.fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.cabecalho}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.mensagem}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.fecharModal(true)}>
                        Sim
                    </Button>
                    <Button variant="primary" onClick={() => this.fecharModal(false)}>
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
