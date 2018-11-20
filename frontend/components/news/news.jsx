import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';



class News extends React.Component{

  render(){
    return this.props.data.news.map((obj,i)=>{
      if (i >= 50){
        return;
      }
      const newsDate = new Date(obj.published_on*1000);
      const timediff = Date.now()-newsDate;
      let newsDay;
      if (timediff/1000/60 < 60){
        newsDay = (timediff/1000/60).toFixed(0).toString() + "m";
      }else{
        if (timediff/1000/60/60 < 24){
          newsDay = (timediff/1000/60/60).toFixed(0).toString() + "h";
        }else{
          newsDay = newsDate.toDateString().slice(4);
        }
      }
      return(
        <a key={i} href={obj.url}>
          <div key={obj.id} className="news-item">
            <img src={obj.imageurl}/>
            <div className="news-item-info">
              <div className="news-item-source-info">
                <h2 className="news-item-source">{obj.source_info.name}</h2>
                <h2 className="news-item-date">{newsDay}</h2>
              </div>
              <h2 className="news-item-title">{obj.title}</h2>
              <h2 className="news-item-body">{obj.body}</h2>
              <h2></h2>
            </div>
          </div>
        </a>
      );
    });
  }
}

  export default News;
