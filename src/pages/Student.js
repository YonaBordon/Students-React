import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApiStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/students');
      setStudents(res.data.students);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getApiStudents();
  }, []);

  const deleteStudent = async (e, id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/student/${id}`);
      alert(res.data.message);
      getApiStudents();
    } catch (error) {}
  };

  return (
    <div className=' container'>
      <div className=' row'>
        <div className=' col-md-12'>
          <div className=' card'>
            <div className=' card-header'>
              <h4>Studentts Data</h4>
              <Link
                to={'add-student'}
                className='btn btn-primary btn-sm float-end'
              >
                Add Student
              </Link>
            </div>
            <div className='card-body'>
              <table className=' table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='7'>
                        <h2>Loading...</h2>
                      </td>
                    </tr>
                  ) : (
                    students.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <Link
                            to={`edit-student/${item.id}`}
                            className=' btn btn-success btn-sm'
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            type='button'
                            className=' btn btn-danger btn-sm'
                            onClick={(e) => deleteStudent(e, item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
