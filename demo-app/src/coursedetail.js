import ReactDOM from "react-dom/client";
import React from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';

import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';

// fetch all course information from back-end (aws : http://54.252.45.29. local :http://localhost:80

const CourseDetail =() =>{
    const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
    const obj ={id : decodeURI(window.location.href.split('/')[4])}  //get the id by the url
    fetch('http://localhost:80/coursedetail',{
      method:'POST',
      model:'cors',
      headers:{
        'Content-Type':'application/json'
    },body: JSON.stringify((obj))
    })
    .then(res => res.json()) // save the data as json 
    .then(data => {
      //console.log(data)
      localStorage.setItem('CourseDetail',JSON.stringify(data)) // stroe the data as string in local Storage
      setLoading(false)
    })
    const CourseDetail = JSON.parse(localStorage.getItem('CourseDetail'))
    
    return(
      <div>
        <div className="icon-container"> {/* show the button on top right corner*/}
          <button>
            <Exit className="icon"/>
          </button>
          <button>
            <SearchIcon className="icon"/>
          </button>
        </div>
        <AllCourse className="icon"/>
        <hr className="line"/>
  
  
        {isLoading == false &&
        <div>
          <h6>{CourseDetail.code}</h6>
          <h6>{CourseDetail.name}</h6>
          <br></br>
          <h6>Outline</h6>
          <p>{CourseDetail.outline}</p>
        </div>
        }
        
      </div>
    )
  }

export default CourseDetail;
 