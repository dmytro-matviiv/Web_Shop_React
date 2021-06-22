import React, { Component } from 'react'
import { login } from './actions';
import { connect } from 'react-redux';

export class LoginPage extends Component {

    state = {
        login: ""
    };

    changeValueLogin = (e) => {
        console.log('---e---', e);
        this.setState({login: e.target.value});
    }

    sendServerData = (e) => {
        e.preventDefault();
        //Валідація даних на клієнті
        //Зробити loading відправка на сервер
        // console.log("----send data server---", this.state.login);
        this.props.login(this.state);
    }

    render() {
        const {login} = this.state;
        console.log("----props----", this.props);
        console.log("---state---", this.state);
        return (
            <div>
                <form onSubmit={this.sendServerData}>
                    <h1>Вхід на сайт</h1>
                    <div className="col-md-4">
                        <label htmlFor="login" className="form-label">First name</label>
                        <input type="text" className="form-control"
                            id="login" name="login" value={login}
                            onChange={this.changeValueLogin} />
                        <div className="valid-feedback">
                            Looks good!
                     </div>
                    </div>

                    <button className="btn btn-success">Вхід</button>
                </form>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        loading: state.auth.loading
    }
}
export default connect(mapState, {login})(LoginPage);
