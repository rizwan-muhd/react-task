import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { history } from '_helpers';
import { authActions } from '_store';
import axios from 'axios';

export { SignUp };

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);



    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('email is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;
    // const [userDetails, setUserDetails] = useState({
    //     username: "",
    //     email: "",
    //     password: ""
    // })
    function onSubmit({ name, password, email }) {
        const data = { name, email, password }
        console.log(data)


        return dispatch(authActions.signup({ name, password, email }));
    }


    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {/* <div className="alert alert-info">
                Username: test<br />
                Password: test
            </div> */}
            <div className="card">
                <h4 className="card-header">Sigup</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="name" type="text"  {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>


                        <button disabled={isSubmitting} className="btn btn-primary" >
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            SignUp
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}
