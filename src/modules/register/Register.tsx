/*eslint-disable*/

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {Checkbox, Button} from '@components';
import {faEnvelope, faKey, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {setWindowClass} from '@app/utils/helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


import * as Yup from 'yup';

import {Form, InputGroup} from 'react-bootstrap';
import * as AuthService from '../../services/auth';
import api from '../../api';

const Register = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const dispatch = useDispatch();
  const [token, settoken] = useState(false);
  // const [status,setstatus] = useState(false);


  const navigate = useNavigate();
  const [t] = useTranslation();

  const Register = async (FirstName:string, LastName:string, Email: string, Password: string) => {

    let registerData = {FirstName, LastName, Email, Password }

    // let data = {};

    try {
      // setAuthLoading(true);
      api.post("Admin/User/create", registerData).then((res)=>{
        settoken(true);
        console.log(`DHDHD LOSHSGHSHSHSH--------------`,res.data);
        
        if(res.data.status == true)
        {
          
          toast.success('Register is succeed!');
          setAuthLoading(false);
  
          dispatch(loginUser(res.data));
          navigate('/admin/login');

          
        }
        else
        {
          setAuthLoading(false);
          toast.error('Register not succeed!'|| 'Failed');
          console.log("called");
          
        }
      })
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const registerByGoogle = async () => {
    try {
      setGoogleAuthLoading(true);
      const token = await AuthService.registerByGoogle();
      toast.success('Login is succeeded!');
      setGoogleAuthLoading(false);
      dispatch(loginUser(token));
      navigate('/');
    } catch (error: any) {
      setGoogleAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const registerByFacebook = async () => {
    try {
      setFacebookAuthLoading(true);
      const token = await AuthService.registerByFacebook();
      toast.success('Login is succeeded!');
      setFacebookAuthLoading(false);
      dispatch(loginUser(token));
      navigate('/');
    } catch (error: any) {
      setFacebookAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  };

  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      // IsActive: true
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required('This field is required'),
      LastName: Yup.string().required('This field is required'),
      Email: Yup.string().email('Invalid email address').required('Required'),
      Password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required')
    }),
    onSubmit: (values) => {
      Register(values.FirstName, values.LastName, values.Email, values.Password, );
    }
  });

  setWindowClass('hold-transition register-page');

  return (
    <div className="register-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Admin</b>
            <span>LTE</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('register.registerNew')}</p>
          <form onSubmit={handleSubmit}>

          <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  placeholder="FirstName"
                  onChange={handleChange}
                  value={values.FirstName}
                  isValid={touched.FirstName && !errors.FirstName}
                  isInvalid={touched.FirstName && !!errors.FirstName}
                />
                {touched.FirstName && errors.FirstName ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.FirstName}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUserCircle} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="LastName"
                  name="LastName"
                  type="text"
                  placeholder="LastName"
                  onChange={handleChange}
                  value={values.LastName}
                  isValid={touched.LastName && !errors.LastName}
                  isInvalid={touched.LastName && !!errors.LastName}
                />
                {touched.LastName && errors.LastName ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.LastName}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUserCircle} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="Email"
                  name="Email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.Email}
                  isValid={touched.Email && !errors.Email}
                  isInvalid={touched.Email && !!errors.Email}
                />
                {touched.Email && errors.Email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.Email}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>


            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="Password"
                  name="Password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.Password}
                  isValid={touched.Password && !errors.Password}
                  isInvalid={touched.Password && !!errors.Password}
                />
                {touched.Password && errors.Password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.Password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faKey} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-7">
                <Checkbox type="icheck" checked={false}>
                  <span>I agree to the </span>
                  <Link to="/">terms</Link>
                </Checkbox>
              </div>
              <div className="col-5">
                <Button
                  type="submit"
                  block
                  isLoading={isAuthLoading}
                  disabled={isFacebookAuthLoading || isGoogleAuthLoading}
                >
                  {/* @ts-ignore */}
                  {t('register.label')}
                </Button>
              </div>
            </div>
          </form>
          <div className="social-auth-links text-center">
            <Button
              block
              icon="facebook"
              onClick={registerByFacebook}
              isLoading={isFacebookAuthLoading}
              disabled={isAuthLoading || isGoogleAuthLoading}
            >
              {/* @ts-ignore */}
              {t('login.button.signUp.social', {
                what: 'Facebook'
              })}
            </Button>
            <Button
              block
              icon="google"
              theme="danger"
              onClick={registerByGoogle}
              isLoading={isGoogleAuthLoading}
              disabled={isAuthLoading || isFacebookAuthLoading}
            >
              {/* @ts-ignore */}
              {t('login.button.signUp.social', {what: 'Google'})}
            </Button>
          </div>
          <Link to="/admin/login" className="text-center">
            {t('register.alreadyHave')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
