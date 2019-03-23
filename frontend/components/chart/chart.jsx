import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Chart extends React.Component{
  constructor(props){
    super(props);
    this.tooltipRender = this.tooltipRender.bind(this);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  tooltipRender(e){
    let yDataKey = this.props.yDataKey;
    let xDataKey = this.props.xDataKey;
    if (e.payload && e.payload.length > 0){
      let payload = e.payload[0].payload;
      const price = payload[yDataKey];
      const date = new Date(payload[xDataKey]*1000);
      //adjusts tooltip based on timescale selected
      let hour, minutes, time;
      if (date.getMinutes() < 10){
        minutes = "0" + date.getMinutes().toString();
      }else{
        minutes = date.getMinutes();
      };
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
      };

      const day = date.toDateString();
      document.getElementById("pricelabel").innerHTML = "$"+price;

      //if chart needs to display change overtime (i.e not dashboard)
      //handle change overtime display
      if (payload.change){
        let change = this.round(payload.change,8).toString();
        let pctChange = payload.pctchange.toFixed(2);
        if (pctChange.toString().includes("Infinity") || pctChange.toString().includes("NaN")){
          pctChange = "0";
          change = "0";
        };
        if (change < 0){
          document.getElementById("pctChangeLabel").innerHTML = `-$${change.slice(1)} (${pctChange}%)`;
        }else{
          document.getElementById("pctChangeLabel").innerHTML = `+$${change} (${pctChange}%)`;
        }
      }

      if (!this.props.timescale || this.props.timescale === "daily" || this.props.timescale === "weekly"){
        return(
          <div className="tooltip">{time} {day.slice(4,-5)}</div>
        )
      }else{
        return(
          <div className="tooltip">{day.slice(4,-5)}, {day.slice(-5)}</div>
        )
      };
    };
  }

  render(){
      return (
        <LineChart className={this.props.graphClass} width={this.props.width}
          height={this.props.height}  margin={this.props.margin} data={this.props.data}>
           <filter id="hello"></filter>
          <Line type="monotone" dataKey={this.props.yDataKey} stroke="white" dot={false}/>
            <XAxis dataKey={this.props.xDataKey} hide={true} padding={{ left: 0, right: 0 }} />
            <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
            <Tooltip isAnimationActive={false} position={{ y: 10 }} offset={-32} content={this.tooltipRender.bind(this)}/>
        </LineChart>
      )
    }
}

  export default Chart;
