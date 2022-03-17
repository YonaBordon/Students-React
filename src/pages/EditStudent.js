import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

const AddStudent = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      course: '',
      email: '',
      phone: '',
    },
    onSubmit: (values) => {
      const submitFunction = async () => {
        console.log(values);
        try {
          const res = await axios.post(
            'http://localhost:8000/api/add-student',
            values,
          );
          alert(res.data.message);
        } catch (error) {}
      };
      submitFunction();
      formik.resetForm();
    },
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;