import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class TinyChart extends React.Component{

  render(){
      return (
        <LineChart className={this.props.graphClass} width={50} height={40}
          margin={{ top: 25, right: 0, left: 0, bottom: 0 }} onMouseLeave={this.resetData}
           data={this.props.data}>
           <filter id="hello"></filter>
          <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
            <XAxis dataKey={"time"} hide={true} padding={{ left: 0, right: 0 }} />
            <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
        </LineChart>
      )
    }
}

  export default TinyChart;
