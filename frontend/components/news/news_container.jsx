import React from 'react';
import {connect} from 'react-redux';
import News from './news';

const msp = (state, ownProps) => {
  return (
    {
      data: state.entities.data,
    }
  )
}


export default connect(msp,null)(News);
