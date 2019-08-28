import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';

export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <div>
                <NavMenu></NavMenu>
                <section>
                    {this.props.children}
                </section>
                <Footer></Footer>
            </div>
        );
    }
}
