/*eslint-disable */

import React,{Fragment ,useState,useEffect, useRef } from 'react';
import '../App.css';
import leftbanner from '../images/left-banner.png';
import product1 from '../images/products/product-1.png';
import product2 from '../images/products/product-2.png';
import product3 from '../images/products/product-3.png';
import product4 from '../images/products/product-4.jpg';
import AltImage from '../../User/images/profile.webp'

// import sdf from '../images/instagram-image/1.png'
// import productimage from './images/products/product-1.png'
import Header from '../Header';
import Footer from '../Footer';
import {
	Alert,
	Row,
	Col,
	Label,
	Form,
	Input,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormFeedback,
	Card
} from 'reactstrap';import {Link, useNavigate} from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import api from '../../../api';
import "react-datepicker/dist/react-datepicker.css";

const SignupSchema = yup.object().shape({
    FirstName: yup.string().required('Please enter firstname'),
    LastName: yup.string().required('Please enter lastname '),
    Address: yup.string().required('Please enter address'),
    Phone: yup.string().required('Please enter phone'),
	Email: yup.string().email("Please enter email").required('Please enter email'),
	Password: yup.string()
    .min(5, 'Must be 5 characters or more')
    .max(30, 'Must be 30 characters or less')
    .required('Please Enter Password')
   
});
function SignUp() {


    const {
		reset,
		control,
		setError,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: { FirstName:'',LastName:'',Address:'',Phone:'',Email: '', Password:''  },
		resolver: yupResolver(SignupSchema),
	});
    const navigate = useNavigate();

// const [isAuthLoading, setAuthLoading] = useState(false);
const [Image,setImage] = useState('');
const inputRef = useRef(null);


const handleIdentityFile = (e) => {
    setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
    });
};
  const active = 'active';
//   const [startDate, setStartDate] = useState(new Date());
 

  const onSubmit = (data) => {
    let postData = new FormData();
   
    postData.append ('FirstName',data.FirstName),
    postData.append  ( 'LastName',data.LastName),
    postData.append ( 'Address',data.Address),
    postData.append  ('Phone',data.Phone),
    postData.append  ('Email' , data.Email),
    postData.append ('Password',data.Password),
    postData.append ( 'Role',"6285f0143f263fc36f5aaf1e"),
    postData.append('Image',Image.raw)
    postData.append ( 'IsActive' ,true)
    

    try {
      // setAuthLoading(true);
      api.post("Admin/User/create", postData).then((res)=>{
        // settoken(true);
        console.log(`API--CALLING--------------`,res.data);

        // console.log(`ASSDDDDDDDDDDD`,res.data.data.Role.Name);
        
        if(res.data.status == true)
        {

            // localStorage.setItem("usertoken",res.data.Token);
            // localStorage.setItem("userid",res.data.data._id);

          toast.success('User Registration  is succeed!');
    
          navigate('/login');

          
        }
        else
        {
        //   setAuthLoading(false);
          toast.error('User Registration  not succeed!'|| 'Failed');

        //   localStorage.setItem("usertoken",null);
        //   localStorage.setItem("userid",null);
          navigate('/login');
          
        }
      })
      // setstatus(false);
       


      // const token = await AuthService.loginByAuth(email, password);
      // toast.success('Login is succeed!');
      // setAuthLoading(false);
      // dispatch(loginUser(token));
      // navigate('/');
    } catch (error) {
      setAuthLoading(false);
      toast.error(error.message || 'Failed');
    }
  
  }

   


      
  return (
    <>
      <Header />
      <section className="breadcrumb" style={{marginTop: '100px'}}>
        <div className="container">
          <div className="row">
            <h2 className="col-md-6 col-12 section-title">Sign Up</h2>
           
          </div>
        </div>
      </section>

      <section className="myaccount section-padding">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="tabbable-panel">
                <div className="tabbable-line">
                 
                  <div className="tab-content">
                   
                      <div className="tab-pane active" id="tab_default_1">
                        <div className="contact-form">
        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="row">
                              
                              
                              <div className="col-6 form-group">
                              <Label className="form-label" for="FirstName">
                    		FirstName* 
						</Label>
						<Controller
							control={control}
							id="FirstName"
							name="FirstName"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" FirstName "
									invalid={
										errors.FirstName && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.FirstName && (
                                    <FormFeedback>
                                       {errors.FirstName.message}
                                    </FormFeedback>
                                )}
                              </div>
                             
                              <div className="col-6 form-group">
                              <Label className="form-label" for="LastName">
                    		LastName* 
						</Label>
						<Controller
							control={control}
							id="LastName"
							name="LastName"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" LastName "
									invalid={
										errors.LastName && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.LastName && (
                                    <FormFeedback>
                                       {errors.LastName.message}
                                    </FormFeedback>
                                )}
                              </div>
                              
                            </div>

                            <div className="row">
                              
                              
                              <div className="col-6 form-group">
                              <Label className="form-label" for="Email">
                    		Email* 
						</Label>
						<Controller
							control={control}
							id="Email"
							name="Email"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Email "
									invalid={
										errors.Email && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Email && (
                                    <FormFeedback>
                                       {errors.Email.message}
                                    </FormFeedback>
                                )}
                              </div>
                             
                              <div className="col-6 form-group">
                              <Label className="form-label" for="Address">
                    		Address* 
						</Label>
						<Controller
							control={control}
							id="Address"
							name="Address"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Address "
									invalid={
										errors.Address && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Address && (
                                    <FormFeedback>
                                       {errors.Address.message}
                                    </FormFeedback>
                                )}
                              </div>
                              
                            </div>

                            <div className="row">
                              
                              
                            <div className="col-6 form-group">
                              <Label className="form-label" for="Phone">
                    		Phone* 
						</Label>
						<Controller
							control={control}
							id="Phone"
							name="Phone"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Phone "
									invalid={
										errors.Phone && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Phone && (
                                    <FormFeedback>
                                       {errors.Phone.message}
                                    </FormFeedback>
                                )}
                              </div>
                             
                             
                              <div className="col-6 form-group">
                              <Label className="form-label" for="Password">
                    		Password* 
						</Label>
						<Controller
							control={control}
							id="Password"
							name="Password"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Password "
									invalid={
										errors.Password && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Password && (
                                    <FormFeedback>
                                       {errors.Password.message}
                                    </FormFeedback>
                                )}
                              </div>
                              <div className="col-6 form-group">
                              <Label
                                        className="form-div mr-2"
                                        for="Image *"
                                    >
                                        Profile Image *
                                    </Label>
                                    <div className='mb-2'>
                                        <Input
                                            onChange={(e) =>
                                                handleIdentityFile(e)
                                            }
                                            name="Image "
                                            type="file"
                                            id="inputFile"
											ref={inputRef}
                                        />
                                    </div>

                                    
                                        
                              </div>
                              <div className="col-6 form-group">{Image.preview ? (
                                            <img
                                                style={{
                                                    width: '250px',
                                                    height: '150px'
                                                }}
                                                src={ Image.preview }
                                            />
                                            ) : (
                                            <>
                                            <img
                                            src={ Image ? Image : AltImage }
                                            
                                            width="150px"
                                            height="150px"
                                            /></>
                                        )} </div>

                            </div>

                            
                            <div className="form-group">
                              <Button
                               
                                type="submit"
                                name="submit"
                                className="primary "
                                color='primary'
                              >
                            Submit
                                <i className="fas fa-long-arrow-alt-right ml-1 " />
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

}
export default SignUp;
