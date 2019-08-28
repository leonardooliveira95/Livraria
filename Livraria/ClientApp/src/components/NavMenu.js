import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/hbsis.png';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" id="navbar">
                <Navbar.Brand>
                    <img src={logo} alt="Logo Hbsis"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link tag="{Link}" to="/" className="nav-link">
                            <span className="fa fa-home"></span>
                            Início
                        </Link>
                        <Link tag="{Link}" to="/editarLivro" className="nav-link">
                            <span className="fa fa-book"></span>
                            Cadastrar livro
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
