import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link, useHistory, useParams } from 'react-router-dom';

const initialValues = {
  name: '',
  course: '',
  email: '',
  phone: '',
};

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(initialValues);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const getInitialValues = async () => {
    const res = await axios.get(`http://localhost:8000/api/student/${id}`);
    setStudent(res.data.student);
    setLoading(false);
  };

  useEffect(() => {
    getInitialValues();
  }, []);

  const formik = useFormik({
    initialValues: student,
    onSubmit: (values) => {
      const updateStudents = async () => {
        try {
          const res = await axios.put(
            `http://localhost:8000/api/student/${values.id}`,
            values,
          );

          alert(res.data.message);
          history.push('/');
        } catch (error) {}
      };
      updateStudents();
    },
    enableReinitialize: true,
  });

  return (
    <div className=' container'>
      <div className=' row'>
        <div className=' col-md-6'>
          <div className=' card'>
            <div className=' card-header'>
              <h4>Studentts Data</h4>
              <Link to='/' className='btn btn-primary btn-sm float-end'>
                Back
              </Link>
            </div>
            <div className='card-body'>
              {loading ? (
                <h2>Loading...</h2>
              ) : (
                <FormikProvider value={formik}>
                  <Form>
                    <div className='form-group mb-3'>
                      <label htmlFor=''>Student Name</label>
                      <input
                        type='text'
                        name='name'
                        className=' form-control'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor=''>Student Course</label>
                      <input
                        type='text'
                        name='course'
                        className=' form-control'
                        onChange={formik.handleChange}
                        value={formik.values.course}
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor=''>Student Email</label>
                      <input
                        type='text'
                        name='email'
                        className=' form-control'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor=''>Student Phone</label>
                      <input
                        type='text'
                        name='phone'
                        className=' form-control'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <button type='submit' className='btn btn-primary'>
                        Save Student
                      </button>
                    </div>
                  </Form>
                </FormikProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
