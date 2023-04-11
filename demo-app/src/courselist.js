import ReactDOM from "react-dom/client";
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
}from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import { ReactComponent as Exit } from './icon/box-arrow-in-left.svg';
import { ReactComponent as SearchIcon } from './icon/search.svg';
import { ReactComponent as Drop } from './icon/dash.svg';
import { ReactComponent as AllCourse } from './icon/open-book-study-svgrepo-com.svg';


// fetch all course information from back-end (aws : http://54.252.45.29. local :http://localhost:80


const Courselist = () =>{
    const obj = {useless:'00'} // meaningless body for fetch
    const [isLoading, setLoading] = useState(true); // set a loading term to make sure the system fetch the required data before return
    const [isModify, setModify] = useState(false); // set a loading term to make sure the system fetch the required data before return
    useEffect(() => {
      // This function will execute automatically when your access this page 
        fetch('http://localhost:80/allcourse',{ // fetch all course information from back-end (aws : http://54.252.45.29. local :http://localhost:80
        method:'POST',
        model:'cors',
        headers:{
          'Content-Type':'application/json'
        },body: JSON.stringify((obj))
      })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem('allCourse',JSON.stringify(data)) //store the data to local Storage first
        setLoading(false)
      })
    }, []);
    const data = JSON.parse(sessionStorage.getItem('allCourse')) // fetch back the data from local Storage 
  
    function showform() { // this function indicate which form will show
      if (isModify == true){
        setModify(false)
      }else{
        setModify(true)
      }
    }
  
    // below a for add a new course 
    const [addCourse, setaddCourse] = useState({ 
      name: '', 
      code: '',
      id: '',
      venue:'',
      Data:'Monday',
      StartTime:'8:30',
      EndTime:'9:15',
      department:'',
      instructor:'',
      capacity:10,
      outline:'',});
  
    function handleSubmitAddCourse(event) { // submit the Object addCourse to the backend
        event.preventDefault();
        fetch('http://localhost:80/addcourse',{
        method:'POST',
        model:'cors',
        headers:{
          'Content-Type':'application/json'
      },body: JSON.stringify((addCourse))
      })
      .then(res => res.text())
      .then(data => {
            //console.log(data)
            if(data == 'Added'){ // the adding process is success
              window.PopUpbox('Add a new course successfully','Please click OK to continue','success','OK')
              .then((result) => {
                window.location.reload()
              })
            }else if (data == 'Repeated'){ // the user user try to add existing course into the system
              window.PopUpbox('The course already exists in the system','The adding was unsuccessful','error','OK')
            }else if(data == 'Invaild time'){ // the time slot is invaild ie 9:15 - 8:30
              window.PopUpbox('Invaild time slot','Please check carefully','error','OK')
            }else { // some data is missing 
              data = data.charAt(0).toUpperCase() + data.slice(1)
              window.PopUpbox(data + ' is empty','Please check carefully','error','OK')
            }
          }
        )
    }
  
    // the below function is use to modeify the object addcourse by the form  
   
    function handleAddCourseDataChange(event) {
      setaddCourse(prevState => ({ ...prevState, Data: event.target.value }));
    }
  
    function handleAddCourseStartTimeChange(event) {
      setaddCourse(prevState => ({ ...prevState, StartTime: event.target.value }));
    }
  
    function handleAddCourseEndTimeChange(event) {
      setaddCourse(prevState => ({ ...prevState, EndTime: event.target.value }));
    }
  
    function handleAddCourseChange(event) {
      const { name, value } = event.target;
      setaddCourse(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  
    // below a for modify a course 
    const [modifyCourse, setmodifyCourse] = useState({ 
      oldId:'',
      CourseName: '', 
      CourseCode: '',
      CourseId: '',
      Venue:'',
      Data:'Monday',
      StartTime:'8:30',
      EndTime:'9:15',
      Department:'',
      Instructor:'',
      Capacity:10,
      Outline:'',});
  
      function handleSubmitModifyCourse(event){
        event.preventDefault();
        fetch('http://localhost:80/modifycourse',{ 
        method:'POST',
        model:'cors',
        headers:{
          'Content-Type':'application/json'
      },body: JSON.stringify((modifyCourse)) // send modifyCourse object to backend
      })
      .then(res => res.text())
      .then(data => {
          if(data == 'Updated'){ // the modify process is success
            window.PopUpbox('Modify course successfully','Please click OK to continue','success','OK')
            .then((result) => {
              window.location.reload()
            })
          }else if (data == 'Not exist'){ // this course do not exist 
            window.PopUpbox('Wrong Original CourseID','Please check carefully','error','OK')
          }else if (data == 'duplicate'){
            window.PopUpbox('Duplicate Id/Code/Name','Please check carefully','error','OK')
          }
          else{ // the time slot is not reasonable 
            window.PopUpbox('Invaild time slot','Please check carefully','error','OK')
          }
        })
      }
      function handleModifyCourseDataChange(event) {
        setmodifyCourse(prevState => ({ ...prevState, Data: event.target.value }));
      }
    
      function handleModifyCourseStartTimeChange(event) {
        setmodifyCourse(prevState => ({ ...prevState, StartTime: event.target.value }));
      }
    
      function handleModifyCourseEndTimeChange(event) {
        setmodifyCourse(prevState => ({ ...prevState, EndTime: event.target.value }));
      }
    
      function handleModifyCourseChange(event) {
        const { name, value } = event.target;
        setmodifyCourse(prevState => ({
          ...prevState,
          [name]: value,
        }));
      } 
  
  
      // below a for remove a course 
      const Removeobj = {id:''} // a object contain a course id the admin would like to remove 
      function Removecourse(ID){
        Removeobj.id = ID
        fetch('http://localhost:80/removecourse',{ 
        method:'POST',
        model:'cors',
        headers:{
          'Content-Type':'application/json'
        },body: JSON.stringify((Removeobj))
      })
      .then(res => res.text())
      .then(data => {
        window.PopUpbox('Delete course successfully','Please click OK to continue','success','OK')
        .then((result) => {
          window.location.reload()
        })
      })
      }
  
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
        <h6 style={{padding: '10px'}}>Courselist</h6>
        <button type="submit" class="btn btn-info" onClick={showform}>Add/Modify</button>
  
        {/* display all course information by a table (the logic of this code is similar to the table of profile )*/}
        {isLoading == false && // make sure we retune the data after fetch the a latest data 
        <div>
          <div className="row">
            <div className="col-lg-10">
              <table>
                <thead>
                  <tr>
                    <th style={{padding: '10px'}}>CourseCode</th> {/* add a padding for a clear ui )*/}
                    <th style={{padding: '10px'}}>CourseName</th>
                    <th style={{padding: '10px'}}>CourseID</th>
                    <th style={{padding: '10px'}}>Venue</th>
                    <th style={{padding: '10px'}}>Data</th>
                    <th style={{padding: '10px'}}>StartTime</th>
                    <th style={{padding: '10px'}}>EndTime</th>
                    <th style={{padding: '10px'}}>Department</th>
                    <th style={{padding: '10px'}}>Instructor</th>
                    <th style={{padding: '10px'}}>Capacity</th>
                    <th style={{padding: '10px'}}>Available</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((course) => (
                    <tr>
                      <td style={{padding: '10px'}}><Link to={'/coursedetail/' + course.id}>{course.code}</Link></td> {/* a link to a acces crouse detail )*/}
                      <td style={{padding: '10px'}}>{course.name}</td>
                      <td style={{padding: '10px'}}>{course.id}</td>
                      <td style={{padding: '10px'}}>{course.venue}</td>
                      <td style={{padding: '10px'}}>{course.Data}</td>
                      <td style={{padding: '10px'}}>{course.StartTime}</td>
                      <td style={{padding: '10px'}}>{course.EndTime}</td>
                      <td style={{padding: '10px'}}>{course.department}</td>
                      <td style={{padding: '10px'}}>{course.instructor}</td>
                      <td style={{padding: '10px'}}>{course.capacity}</td>
                      <td style={{padding: '10px'}}>{course.available}</td>
                      <td style={{padding: '10px'}}>
                        <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }} onClick={(() => Removecourse(course.id))}>
                          <Drop className="icon"/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {/* a link to a form to modify crouse detail )*/}
            {isModify &&
            <div className="col-lg-2">
              <div class="sticky-top"> {/* fix the form on a position )*/}
                <form >
                <h5>Modify course Information</h5>
                <br></br>
                <label>
                  Original CourseID
                  <MDBInput type="text" name="oldId" value={modifyCourse.oldId} onChange={handleModifyCourseChange}/>  {/* modify modifyCourse.oldId by onChange*/}
                </label>
                <br></br>
                <label>
                  New CourseID:
                  <MDBInput type="text"name="CourseId" value={modifyCourse.CourseId} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.CourseId by onChange*/}
                </label>
                <br></br>
                <label>
                  New CourseCode:
                  <MDBInput type="text" name="CourseCode" value={modifyCourse.CourseCode} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.CourseCode by onChange*/}
                </label>
                <br></br>
                <label>
                  New CourseName:
                  <MDBInput type="text" name="CourseName" value={modifyCourse.CourseName} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.CourseName by onChange*/}
                </label>
                <br></br>
                <label>
                  New Venue:
                  <MDBInput type="text" name="Venue" value={modifyCourse.Venue} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.Venue by onChange*/}
                </label>
                <br></br>
                <label>
                  New Data:
                </label>
                <br></br>
                <select name="data" value={modifyCourse.Data} onChange={handleModifyCourseDataChange}> {/* modify modifyCourse.Data by onChange*/}
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
  
                <br></br>
                <label>
                  New Time:
                </label>
                <br></br>
                <select name="starttime" value={modifyCourse.StartTime} onChange={handleModifyCourseStartTimeChange}>{/* modify modifyCourse.StartTime by onChange*/}
                  <option value="8:30">8:30</option>
                  <option value="9:30">9:30</option>
                  <option value="10:30">10:30</option>
                  <option value="11:30">11:30</option>
                  <option value="12:30">12:30</option>
                  <option value="13:30">13:30</option>
                  <option value="14:30">14:30</option>
                  <option value="15:30">15:30</option>
                  <option value="16:30">16:30</option>
                  <option value="17:30">17:30</option>
                </select>
                <p style={{display: 'inline-block'}}> - </p>
                <select name="endtime" value={modifyCourse.EndTime} onChange={handleModifyCourseEndTimeChange}>{/* modify modifyCourse.EndTime by onChange*/}
                  <option value="9:15">9:15</option>
                  <option value="10:15">10:15</option>
                  <option value="11:15">11:15</option>
                  <option value="12:15">12:15</option>
                  <option value="13:15">13:15</option>
                  <option value="14:15">14:15</option>
                  <option value="15:15">15:15</option>
                  <option value="16:15">16:15</option>
                  <option value="17:15">17:15</option>
                  <option value="18:15">18:15</option>
                </select>
                <br></br>
                <label>
                  New Department:
                  <MDBInput type="text" name="Department" value={modifyCourse.Department} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.Department by onChange*/}
                </label>
                <br></br>
                <label>
                  New Instructor:
                  <MDBInput type="text" name="Instructor" value={modifyCourse.Instructor} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.Instructor by onChange*/}
                </label>
                <br></br>
                <label>
                  New Capacity:
                  <MDBInput type="text" name="Capacity" value={modifyCourse.Capacity} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.Capacity by onChange*/}
                </label>
                <br></br>
                <label>
                  New Outline:
                  <br></br>
                  <textarea rows={4} cols={30} type="text" name="Outline" value={modifyCourse.Outline} onChange={handleModifyCourseChange}/>{/* modify modifyCourse.Outline by onChange*/}
                </label>
                </form>
                <br></br>
                <button type="submit" class="btn btn-primary" onClick={handleSubmitModifyCourse}>modify</button>
              </div>
            </div>
            }
  
            {isModify == false &&
              <div className="col-lg-2">
                <div class="sticky-top"> {/* fix the form on a position )*/}
                <form >
                  <h5>Add new course</h5>
                  <br></br>
                  <label>
                    New CourseID:
                    <MDBInput type="text" name="id" value={addCourse.id} onChange={handleAddCourseChange}/> {/* modify addCourse. id by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New CourseCode:
                    <MDBInput type="text" name="code" value={addCourse.code} onChange={handleAddCourseChange}/>{/* modify addCourse.code by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New CourseName:
                    <MDBInput type="text" name="name" value={addCourse.name} onChange={handleAddCourseChange} />{/* modify addCourse.name by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New Venue:
                    <MDBInput type="text" name="venue" value={addCourse.venue} onChange={handleAddCourseChange}/>{/* modify addCourse.venue by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New Data:
                  </label>
                  <br></br>
                  <select name="data" value={addCourse.Data} onChange={handleAddCourseDataChange}>{/* modify addCourse.data by onChange*/}
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
  
                  <br></br>
                  <label>
                    New Time:
                  </label>
                  <br></br>
                  <select name="starttime" value={addCourse.StartTime} onChange={handleAddCourseStartTimeChange}>{/* modify addCourse.StartTime by onChange*/}
                    <option value="8:30">8:30</option>
                    <option value="9:30">9:30</option>
                    <option value="10:30">10:30</option>
                    <option value="11:30">11:30</option>
                    <option value="12:30">12:30</option>
                    <option value="13:30">13:30</option>
                    <option value="14:30">14:30</option>
                    <option value="15:30">15:30</option>
                    <option value="16:30">16:30</option>
                    <option value="17:30">17:30</option>
                  </select>
                  <p style={{display: 'inline-block'}}> - </p>
                  <select name="endtime" value={addCourse.EndTime} onChange={handleAddCourseEndTimeChange}>{/* modify addCourse.EndTime by onChange*/}
                    <option value="9:15">9:15</option>
                    <option value="10:15">10:15</option>
                    <option value="11:15">11:15</option>
                    <option value="12:15">12:15</option>
                    <option value="13:15">13:15</option>
                    <option value="14:15">14:15</option>
                    <option value="15:15">15:15</option>
                    <option value="16:15">16:15</option>
                    <option value="17:15">17:15</option>
                    <option value="18:15">18:15</option>
                  </select>
                  <br></br>
                  <label>
                    New Department:
                    <MDBInput type="text" name="department" value={addCourse.department} onChange={handleAddCourseChange}/>{/* modify addCourse.instructor by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New Instructor:
                    <MDBInput type="text" name="instructor" value={addCourse.instructor} onChange={handleAddCourseChange}/>{/* modify addCourse.instructor by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New Capacity:
                    <MDBInput type="text" name="capacity" value={addCourse.capacity} onChange={handleAddCourseChange}/>{/* modify addCourse.capacity by onChange*/}
                  </label>
                  <br></br>
                  <label>
                    New Outline:
                    <br></br>
                    <textarea rows={4} cols={30} type="text" name="outline" value={addCourse.outline} onChange={handleAddCourseChange}/>{/* modify addCourse.outline by onChange*/}
                  </label>
                  
                  </form>
                  <br></br>
                  <button type="submit" class="btn btn-success" onClick={handleSubmitAddCourse}>add</button>
                </div>
              </div>
            }
            
  
          </div>
        </div>
        }
      </div>
    )
  }


  export default Courselist;
