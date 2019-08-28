import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import DetalhesLivro from './components/DetalhesLivro';
import EditarLivro from './components/EditarLivro';

export default class App extends Component {

    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/detalhes/:id' component={DetalhesLivro} />
                <Route path='/editarLivro/:id?' component={EditarLivro} />
            </Layout>
        );
    }
}
