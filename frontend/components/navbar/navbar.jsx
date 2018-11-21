import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';



class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      enter: false,
      link: ""
    }
  }

  handleSearch(e){
    if (e.target.value.length > 0){
      this.props.queryStocks(e.target.value);
    }else{
      this.props.clearSearch();
    }
  }

  handleKeyPress(e){
    if (this.props.search && this.props.search.length > 0){
      if (e.key === "Enter"){
        this.setState({
          enter: true,
          link : `/stocks/${this.props.search[0].id}`
        })
      }
    }
  }

  renderSearch(){
    if (this.props.search && this.props.search.length>0){
      let string = "";
      let query = this.props.query;
      const items = this.props.search.map((object,i)=>{
        let namestring = ""
        for (var i = 0; i < query.length && i < object.name.length; i++) {
          if (object.name[i].toLowerCase() === query[i].toLowerCase()){
            namestring = namestring + object.name[i]
          }else{
            i = 100;
          }
        }
        let symbolstring = ""
        for (var i = 0; i < query.length && i < object.symbol.length; i++) {
          if (object.symbol[i].toLowerCase() === query[i].toLowerCase()){
            symbolstring = symbolstring + object.symbol[i]
          }else{
            if (i>symbolstring.length){
              symbolstring = "";
            }
            i = 100;
          }
        }
        if (namestring.length>symbolstring.length){
          symbolstring = "";
        }
        if (symbolstring.length > namestring.length){
          namestring = "";
        }
        return (
          <Link to={`/stocks/${object.id}`} key={object.id} className="search-result-item">
            <span className="search-symbol"><span className="search-match">{symbolstring}</span>
              {object.symbol.slice(symbolstring.length)}</span>
            <span className="search-name"><span className="search-match">{namestring}</span>
              {object.name.slice(namestring.length)}</span>
          </Link>
        );
      });
      return (
        <ul className="search-results">
          <li className="search-result-header">Cryptocurrencies</li>
          {items}
        </ul>
      )
    }
  }

  render(){
    if (this.props.navlink){
      this.navlink = this.props.navlink;
    }else{
      this.navlink = "nav-link-a";
    }
    if (this.state.enter){
      return(
        <Redirect to={this.state.link}/>
      )
    }
    return(
      <div className="user-show-navbar">
        <div className="navbar-left">
          <Link to="/"><div className="logo"/></Link>
          <div className="searchbar">
            <i className="fas fa-search search-icon"></i>
            <input type="text" className="searchbar-field" placeholder="Search" onKeyPress={this.handleKeyPress} onChange={this.handleSearch}></input>
            {this.renderSearch()}
          </div>

        </div>
          <div className="nav-links">
            <Link id="navlink" to="/" className={this.navlink}>Home</Link>
            <a id="navlink" className={this.navlink}>Notifications</a>
            <button id="navlink" className={this.navlink} onClick={this.props.logout}>Log Out</button>
          </div>
      </div>
    )
  }
}

  export default Navbar;
