import React from 'react';
import {withRouter} from 'react-router-dom';
import {merge} from 'lodash';

class SessionForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({},this.state);
    this.props.processForm(user);
    this.setState({
      username: "",
      password: ""
    });
  }

  update(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  renderErrors(){
    return (
      <ul>
        {this.props.errors.map((error,i)=>(
          <li key={i}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render(){
    return(
      <div className="login-main fullsize">

        <div className="login-left halfsize">
        </div>

        <div className="login-right halfsize">

          <div className="login-form-wrapper">
            <h2>Welcome to CryptoNight</h2>
            <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
              <label>Email or Username </label><br/>
              <input className="input-field" type="text" onChange={this.update("username")} value={this.state.username}></input><br/>
              <label>Password </label><br/>
              <input className="input-field" type="password" onChange={this.update("password")} value={this.state.password}></input><br/>
              {this.props.link}
              <br/>
              <input className="session-form-btn" type="submit" value={this.props.button}/><br/>

            </form>
            {this.renderErrors()}
          </div>

        </div>

      </div>

    )
  }
}

export default withRouter(SessionForm);
