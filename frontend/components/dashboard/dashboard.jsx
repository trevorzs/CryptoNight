import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';



class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  tooltipRender(e){
    if (e.payload[0] && e.payload[0].payload){
      const date = new Date(e.payload[0].payload.created_at);
      let hour, minutes, time;
      if (date.getMinutes() < 10){
        minutes = "0" + date.getMinutes().toString();
      }else{
        minutes = date.getMinutes();
      }
      if (date.getHours() > 12){
        hour = date.getHours()%12;
        if (hour === 0){
          time = `12:00 AM`
        }else{
          time = `${hour}:${minutes} PM`
        }
      }else{
        hour = date.getHours()%12;
        if (hour === 0){
          time = `12:00 PM`
        }else{
          time = `${hour}:${minutes} AM`
        }
      }
      const day = date.toDateString();
      document.getElementById("pricelabel").innerHTML = "$"+e.payload[0].payload.account_value;

      return(
        <div className="tooltip">{time} {day}</div>
      )
    }


  }

  tickFormat(tick){
    const d = new Date(tick);
    return (d.toDateString());
  }

  render(){
    let initialprice;
    if (this.props.portfolios.length>0){
        initialprice = this.props.portfolios.slice(-1)[0].account_value;
    }
    return (
      <div class="portfolio-chart">
        <h1 id="pctChangeLabel">Your Portfolio:</h1>
        <h1 id="pricelabel">${initialprice}</h1>
        <LineChart width={500} height={200}
          margin={{ top: 25, right: 0, left: 0, bottom: 0 }} onMouseLeave={this.resetData}
           data={this.props.portfolios}>
          <Line type="monotone" dataKey="account_value" stroke="white" dot={false}/>
            <XAxis dataKey="created_at" scale='time' type='number' tickFormatter={this.tickFormat} domain={['dataMin', 'dataMax']} padding={{ left: 0, right: 0 }} />
            <YAxis type="number" hide={true} domain={['dataMin', 'dataMax']}/>
            <Tooltip isAnimationActive={false} position={{ y: 10 }} offset={-32} content={this.tooltipRender.bind(this)}/>
        </LineChart>
      </div>
    );
  }
}

export default Dashboard;
