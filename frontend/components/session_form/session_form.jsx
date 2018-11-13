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

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({},this.state);
    this.props.processForm(user);
  }

  update(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Username: </label>
          <input type="text" onChange={this.update("username")} value={this.state.username}></input><br/>
          <label>Password: </label>
          <input type="password" onChange={this.update("password")} value={this.state.password}></input><br/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default withRouter(SessionForm);
