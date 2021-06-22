import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Link
  } from "react-router-dom";

export class Navbar extends Component {
    render() {
        const {counter} = this.props;
        return (
            <>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About {counter}</Link>
                    </li>
                    <li>
                        <Link to="/counter">Counter</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </>
        )
    }
}

const mapState = (stateRedux) =>
{
    return {
        counter: stateRedux.counter.data

    };
}

export default connect(mapState)(Navbar);

