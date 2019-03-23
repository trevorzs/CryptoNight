import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import ChartContainer from '../chart/chart_container';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';



class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let initialprice;
    if (this.props.portfolios.length>0){
        initialprice = this.props.portfolios.slice(-1)[0].account_value;
    }
    return (
      <div className="portfolio-chart">
        <h1 id="pctChangeLabel">Your Portfolio:</h1>
        <h1 id="pricelabel">${initialprice}</h1>
        <ChartContainer width={640} height={240}
          margin={{top: 25, right:0, left:0, bottom: 0}}
          data={this.props.portfolios}
          xDataKey={"created_at"}
          yDataKey={"account_value"}/>
      </div>
    );
  }
}

export default Dashboard;
