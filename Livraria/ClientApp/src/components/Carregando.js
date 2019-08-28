import React, { Component } from 'react';
import './Carregando.css';

export default class Carregando extends Component {
    
    render() {
        return (
            <div id="icone-carregando">
                <span className="fa fa-spin fa-circle-o-notch fa-2x"></span>
            </div>
        );
    }
}
