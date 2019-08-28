import React, { Component } from 'react';
import './Footer.css';
import logo from '../img/logo-hbsis-white.svg';

export class Footer extends Component {

    render() {
        return (
            <div id="footer">
                <div className="d-flex align-items-center w-100">
                    <img src={logo} alt="Logo Hbsis" />
                    <div className="texto-rodape">Todos os direitos reservados © 2019.</div>
                </div>

            </div>
        );
    }
}
