import React from 'react';
import {withRouter} from 'react-router-dom';
import {merge} from 'lodash';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: ""
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
      password: "",
      email: "",
      first_name: "",
      last_name: ""
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
            <h2>Make Your Money Move</h2>
            <h4>Sign up to track and invest in Cryptocurrencies, commission-free</h4>
            <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
              <input className="input-field half" type="text" onChange={this.update("first_name")} value={this.state.first_name} placeholder="First Name" required></input>
              <input className="input-field half" type="text" onChange={this.update("last_name")} value={this.state.last_name} placeholder="Last Name" required></input><br/>
              <input className="input-field" type="email" onChange={this.update("email")} value={this.state.email} placeholder="E-mail" required></input><br/>
              <input className="input-field" type="text" onChange={this.update("username")} value={this.state.username} placeholder="Username" required></input><br/>
              <input className="input-field" type="password" onChange={this.update("password")} value={this.state.password} placeholder="Password [min: 6 characters]" required></input><br/>
              {this.props.link}<br/>
            <br/>
              <span className="sessionlink" onClick={this.props.demoLogin}>Demo Login</span>
              <br/>
              {this.renderErrors()}
              <input className="session-form-btn" type="submit" value={this.props.button}/><br/>
            </form>

          </div>

        </div>

      </div>
    )
  }
}

export default withRouter(SignupForm);
