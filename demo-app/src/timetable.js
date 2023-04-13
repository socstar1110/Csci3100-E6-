import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './timetable.css'
import cookie from 'react-cookies'


const TimeTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [emptyResult, setEmptyResult] = useState(false);
  const [retrieveTB, setRetrieveTB] = useState({
    Condition: 'temporary',
    Username: cookie.load('username'),
  });
  const [courseInformation, setCourseInfo] = useState([]);
  const [initialTime, setInitialTime] = useState('9:00');
  const [endTime, setEndTime] = useState('18:00');

  function retrieveRegCourse(event) {
    setCourseInfo([]);
    event.preventDefault();
    setLoading(true);
    fetch('http://54.252.45.29/timetable', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(retrieveTB),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setEmptyResult(true);
          setLoading(false);
        } else {
          const courseIds = data.map((id) => id.toString());
          fetch('http://54.252.45.29/retrievecourseinfo', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseIds }),
          })
            .then((res) => res.json())
            .then((data) => {
              setEmptyResult(false);
              setCourseInfo(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        }
      });
  }


  function handleConditionChange(event) {
    setEmptyResult(false);
    setCourseInfo([]);
    setLoading(true);
    setRetrieveTB((prevState) => ({ ...prevState, Condition: event.target.value }));
  }

  // Define the weekdays and times as arrays
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  // Define a function to filter the course information by weekday and time
  function getCourseInfo(weekday, time) {
    const courses = courseInformation.filter(
      (course) => course.Date === weekday && course.StartTime === time
    );

    const hasMultipleCourses = courses.length > 1;

    return {
      courses,
      hasMultipleCourses,
    };
  }

  // Define a function to get the cell's class name based on the number of courses in it
  function getCellClassName(courses) {
    if (courses.length === 1) {
      return 'greencolour';
    }
    if (courses.length > 1) {
      return 'bg-danger';
    }
    return '';
  }

  const initialTimeIndex = times.indexOf(initialTime);
  const endTimeIndex = times.indexOf(endTime);
  const displayedTimes = times.slice(initialTimeIndex, endTimeIndex + 1);

  const [showInfo, setShowInfo] = useState(false);
  const handleMouseOver = () => {
    setShowInfo(true);
  };

  const handleMouseOut = () => {
    setShowInfo(false);
  };

  const notificationTexts = [
    <span style={{ fontSize: '25px' }}>
      If two or more courses have overlapping time schedules, the grid will turn{' '}
      <span style={{ color: 'red' }}>red</span>.
    </span>,
    <span style={{ fontSize: '25px' }}>
      If the course has not overlapping time schedules, the grid will become{' '}
      <span style={{ color: 'green' }}>green</span>.
    </span>,
  ];

  return (

    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse container d-flex justify-content-center align-items-center" id="navbarNavAltMarkup ">
          <div className="navbar-nav">
            <select value={retrieveTB.Condition} onChange={handleConditionChange}>
              <option value="temporary">Tentative Timetable</option>
              <option value="registered">My weekly schedule</option>
            </select>
            <button className="confirmButton" onClick={retrieveRegCourse}>Display</button>
          </div>
        </div>
      </nav>

      {/* Display the schedule matrix */}
      {courseInformation && !isLoading && (

        <div className="container mt-2" style={{ width: '80%' }}>
          {/* Notification button is added */}
          <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='notificationButton'>More Information</button>
            {showInfo && (
              <ul style={{ marginTop: '20px', fontSize: '20px' }}>
                {notificationTexts.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Select the start time and end time of timetable */}
          <div style={{ display: 'inline-block', alignItems: 'center', marginBottom: '1rem', padding: '0.5rem' }}>
            <label htmlFor="initial-time" style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>Initial Time:</label>
            <select
              id="initial-time"
              value={initialTime}
              onChange={(e) => setInitialTime(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', fontSize: '1.2rem' }}
            >
              {times.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'inline-block', alignItems: 'center', padding: '1.2rem' }}>
            <label htmlFor="end-time" style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>End Time:</label>
            <select
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', fontSize: '1.2rem' }}
            >
              {times.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>


          {/* Display a row and column value */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ fontSize: '1.2rem' }}>Time</th>
                {weekdays.map((day) => (
                  <th key={day} style={{ fontSize: '1.2rem' }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedTimes.map((time) => (
                <tr key={time} style={{ fontSize: '1.2rem' }}>
                  <td>{time}</td>
                  {weekdays.map((day) => {
                    const { courses, hasMultipleCourses } = getCourseInfo(
                      day,
                      time
                    );

                    const cellClassName = getCellClassName(courses);
                    {/* Display the course information */ }
                    return (
                      <td key={`${day}-${time}`} className={cellClassName}>
                        {courses.map((course) => (
                          <div key={course._id} className="output-text">
                            <div>{course.CourseCode}</div>
                            <div>{course.CourseName}</div>
                            <div>{course.Venue}</div>
                            <div>{`${course.StartTime} - ${course.EndTime}`}</div>
                            <div>{course.Instructor}</div>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display a loading spinner if the data is still being fetched */}
      {isLoading && !courseInformation && <div>Loading...</div>}

    </div>);
};

export default TimeTable;