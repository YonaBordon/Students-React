import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link, useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const initialValues = {
  name: '',
  course: '',
  email: '',
  phone: '',
};

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const getInitialValues = async () => {
    const res = await axios.get(`http://localhost:8000/api/student/${id}`);
    if (res.data.status === 200) {
      setStudent(res.data.student);
      setLoading(false);
    } else if (res.data.status === 404) {
      swal({
        title: 'Warning!',
        text: res.data.message,
        icon: 'warning',
        button: 'OK!',
      });
      history.push('/');
    }
  };

  useEffect(() => {
    getInitialValues();
  }, []);

  const formik = useFormik({
    initialValues: student,
    onSubmit: (values) => {
      const updateStudents = async () => {
        const res = await axios.put(
          `http://localhost:8000/api/student/${values.id}`,
          values,
        );
        if (res.data.status === 200) {
          swal({
            title: 'Success!',
            text: res.data.message,
            icon: 'success',
            button: 'OK!',
          });
          history.push('/');
        } else {
          setErrors(res.data.errors);
        }
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
                    <span className=' text-danger'>{errors.name}</span>
                    <div className='form-group mb-3'>
                      <label htmlFor=''>Student Course</label>
                      <input
                        type='text'
                        name='course'
                        className=' form-control'
                        onChange={formik.handleChange}
                        value={formik.values.course}
                      />
                      <span className=' text-danger'>{errors.course}</span>
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
                      <span className=' text-danger'>{errors.email}</span>
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
                      <span className=' text-danger'>{errors.phone}</span>
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
