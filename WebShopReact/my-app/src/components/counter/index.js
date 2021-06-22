import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from './types';
import {push} from 'connected-react-router';

export class CounterPage extends Component {

    buttonClick = () => {
        console.log("----дякую----", "click btn");
        this.props.dispatch({type: types.COUNTER_INCREMENT});

        //this.setState()
    }

    render() {
        console.log("-----props-----", this.props);
        const {counter} = this.props; //деструктуризація
        if(counter == 30)
        {
            this.props.dispatch(push("/about"));
        }
        return (
            <div>
                <h1>Counter</h1>
                <p>Value redux: {counter}</p>
                <button onClick={this.buttonClick}>Нажми мене</button>
            </div>
        )
    }
}
const mapState = (stateRedux) =>
{
    return {
        counter: stateRedux.counter.data
    };
}

export default connect(mapState)(CounterPage);
