import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import PNotifyConfirm from "pnotify/dist/es/PNotifyConfirm";
import './EditarLivro.css';

export default class EditarLivro extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: 0, nome: "", anoLancamento: "", idiomaOriginal: "", genero: "", preco: "",
            estoque: "", capa: "", sinopse: "", autor: "", editora: "", previaImagem: "",
            carregando: false, validado: false
        };
    }

    componentDidMount() {

        this.setState({ id: this.props.match.params.id && 0 });
        this.onClickSalvarLivro = this.onClickSalvarLivro.bind(this);
        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeImagem = this.onChangeImagem.bind(this);
        this.atualizarPreviaImagem = this.atualizarPreviaImagem.bind(this);

        this.inputCapa = React.createRef();

        if (this.props.match.params.id > 0) {
            this.carregarLivro();
        }
    }

    carregarLivro() {

        fetch('api/Livro/GetDetalhesLivro/' + this.props.match.params.id)
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({

                        id: data.id,
                        nome: data.nome,
                        anoLancamento: data.anoLancamento,
                        idiomaOriginal: data.idiomaOriginal,
                        genero: data.genero,
                        preco: data.preco,
                        estoque: data.estoque,
                        capa: data.capa,
                        sinopse: data.sinopse,
                        autor: data.autor.nome,
                        editora: data.editora.nome

                    });

                    this.atualizarPreviaImagem(data.capa);
                }
            );

    }

    onChangeValor(event) {

        this.setState({

            [event.target.name]: event.target.value

        });
    }

    onChangeImagem(event) {

        this.lerArquivoBase64(this.inputCapa.current.files[0], this.atualizarPreviaImagem);

    }

    atualizarPreviaImagem(imagem) {
        this.setState({
            previaImagem: imagem
        });
    }

    lerArquivoBase64(arquivo, callback) {

        let reader = new FileReader();
        reader.readAsDataURL(arquivo);

        reader.onload = () => {
            callback(reader.result);
        };
    }

    onClickSalvarLivro(event) {

        let form = document.getElementById("form-livro");

        if (form.checkValidity() === false) {

            this.setState({ validado: true });

            PNotify.alert({
                text: "Preencha todos os campos obrigatórios"
            });

            return;
        }

        //Se estiver cadastrando, deve selecionar uma capa
        if ((this.state.id === undefined || this.state.id === null || this.state.id === 0) && this.inputCapa.current.files.length === 0) {

            PNotify.alert({
                text: "Escolha a capa do livro"
            });
        }
        else //Se estiver editando e não selecionou capa, continua com a mesma
            if (this.state.id > 0 && this.inputCapa.current.files.length === 0) {

                this.salvarLivro({

                    id: this.state.id,
                    nome: this.state.nome,
                    anoLancamento: this.state.anoLancamento,
                    idiomaOriginal: this.state.idiomaOriginal,
                    genero: this.state.genero,
                    sinopse: this.state.sinopse,
                    preco: this.state.preco,
                    estoque: this.state.estoque,
                    autor: {
                        nome: this.state.autor
                    },
                    editora: {
                        nome: this.state.editora
                    }

                });

            }
            else { // Se estiver cadastrando, lê a capa do input
                this.lerArquivoBase64(this.inputCapa.current.files[0], (capa) => {

                    this.salvarLivro({

                        id: this.state.id,
                        nome: this.state.nome,
                        anoLancamento: this.state.anoLancamento,
                        idiomaOriginal: this.state.idiomaOriginal,
                        genero: this.state.genero,
                        capa: capa,
                        sinopse: this.state.sinopse,
                        preco: this.state.preco,
                        estoque: this.state.estoque,
                        autor: {
                            nome: this.state.autor
                        },
                        editora: {
                            nome: this.state.editora
                        }

                    });

                });
            }
    }

    salvarLivro(livro) {

        this.setState({ carregando: true });

        fetch("api/Livro/PostSalvarLivro", {
            method: "POST", body: JSON.stringify(livro), headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {

            if (!response.ok) {

                this.setState({ carregando: false });

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

                if (data !== undefined && data !== null) {
                    localStorage.setItem("mensagem", "Livro gravado");
                    this.props.history.push("/");
                }
            }
        );

    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h4>
                            <span className="fa fa-book"></span>
                            <span>{this.state.id > 0 ? "Editar" : "Novo"} livro</span>
                        </h4>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form noValidate validated={this.state.validado} id="form-livro">
                            <Form.Row>
                                <Form.Group as={Col} md="5">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control value={this.state.nome} name="nome" onChange={this.onChangeValor} required />
                                </Form.Group>
                                <Form.Group as={Col} md="5">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control value={this.state.autor} name="autor" onChange={this.onChangeValor} required />
                                </Form.Group>
                                <Form.Group as={Col} md="2">
                                    <Form.Label>Ano de lançamento</Form.Label>
                                    <Form.Control type="number" value={this.state.anoLancamento} name="anoLancamento" onChange={this.onChangeValor} required />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Editora</Form.Label>
                                    <Form.Control value={this.state.editora} name="editora" onChange={this.onChangeValor} required />
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Gênero</Form.Label>
                                    <Form.Control value={this.state.genero} name="genero" onChange={this.onChangeValor} required />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Idioma original</Form.Label>
                                    <Form.Control value={this.state.idiomaOriginal} name="idiomaOriginal" onChange={this.onChangeValor} required  />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control type="number" value={this.state.preco} name="preco" onChange={this.onChangeValor} required />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Estoque</Form.Label>
                                    <Form.Control type="number" value={this.state.estoque} name="estoque" onChange={this.onChangeValor} required  />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Sinopse</Form.Label>
                                    <Form.Control as="textarea" rows="5" value={this.state.sinopse} name="sinopse" onChange={this.onChangeValor} required  />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="d-flex align-items-center">
                                <Form.Group as={Col} md="3">
                                    <Form.Label>Capa</Form.Label>
                                    <div>
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            <span className="fa fa-cloud-upload"></span>
                                            Escolher arquivo
                                        </label>
                                        <Form.Control type="file" ref={this.inputCapa} onChange={this.onChangeImagem} id="file-upload" />
                                    </div>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    {
                                        this.state.previaImagem !== undefined && this.state.previaImagem !== null && this.state.previaImagem !== "" ?
                                        <img src={this.state.previaImagem} id="img-previa-capa" alt="Prévia da capa do livro" /> :
                                        null
                                    }
                                </Col>
                            </Form.Row>
                            <hr/>
                            <Form.Row>
                                <Col>
                                    <Button variant="success" onClick={this.onClickSalvarLivro} disabled={this.state.carregando}>
                                        {this.state.carregando ? <span className="fa fa-spin fa-circle-o-notch"></span> : null }
                                        Salvar
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>

                </Row>
            </Container>
        );
    }
}
