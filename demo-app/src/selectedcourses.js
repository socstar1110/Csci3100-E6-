import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Drop } from './icon/dash.svg';

const SelectCourse = ({ data }) => {
  return (
    <div>
      <h6 className="container d-flex justify-content-center align-items-center">View Select Course</h6>
      <div className="collapse navbar-collapse container d-flex justify-content-center align-items-center">
        <table>
          <thead>
            <tr>
              <th style={{ padding: '30px' }}>CourseCode</th>
              <th style={{ padding: '30px' }}>CourseName</th>
              <th style={{ padding: '30px' }}>CourseID</th>
              <th style={{ padding: '30px' }}>Venue</th>
              <th style={{ padding: '30px' }}>Time</th>
              <th style={{ padding: '30px' }}>Department</th>
              <th style={{ padding: '30px' }}>Instructor</th>
              <th style={{ padding: '30px' }}>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr key={course.id}>
                <td style={{ padding: '30px' }}><Link to={'/'}>{course.code}</Link></td>
                <td style={{ padding: '30px' }}>{course.name}</td>
                <td style={{ padding: '30px' }}>{course.id}</td>
                <td style={{ padding: '30px' }}>{course.venue}</td>
                <td style={{ padding: '30px' }}>{course.time}</td>
                <td style={{ padding: '30px' }}>{course.department}</td>
                <td style={{ padding: '30px' }}>{course.instructor}</td>
                <td style={{ padding: '30px' }}>{course.capacity}</td>
                <td style={{ padding: '30px' }}>
                  <button className="dropCrouse" style={{ width: '40px', height: '40px', padding: '0px' }}>
                    <Drop className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectCourse;