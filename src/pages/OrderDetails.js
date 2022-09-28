/*eslint-disable*/

import React,{Fragment ,useState,useEffect, useRef } from 'react';
import { ChevronDown, Edit, Trash } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios"
import AltImage from '../Images/download.png'
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
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  CardHeader,
} from 'reactstrap';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useHistory,Link, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { ModalTitle } from 'react-bootstrap';
import api from '../api';


export default function Employee() {


  const [orderDetails, setOrderDetails] = useState('');

  const {id} = useParams();


  // const getAllFunction = () => {

  //   api.get('Admin/OrderDetails/Order/find/' + Id ).then((res) => {
  //     setOrderDetails(res.data.List);
  //               console.log("get by id Order Details >>>>>>>>>>>>",res.data.List.OrderDetails);
  //   });       
  // };
  // console.log("dsadsfsdf>>>>>>>>>>>>>>>",orderDetails.OrderDetails);
  // useEffect(()=>{
  //   getAllFunction();
  // },[])


  useEffect(() => {
    // api.get('/Admin/NewsEvents/getall').then((res) => {
    //   let newData = res.data.List;
    //   console.log(`get all NewsEvents`, newData);
      
    //   setNewsEvents(newData)
    // });
  
    
    api.get('Admin/OrderDetails/Order/find/'+ id).then((res) => {
      let newData = res.data.List.OrderDetails;
      console.log(`get ID>>>>>>>>>>>`, newData);
      
      setOrderDetails(newData)

    });
  
  
  
  
  
  
  
  
  }, []);
  
console.log('>>>>>>>>>>>>>>>>>>>>Details>>>>>>>>>',orderDetails);

  return (
      <>

              <Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
                <Col >
                    <h3> 
                        <b>
                            Order Details
                        </b>
                    </h3>
                </Col>
                <Col>
                        <p className="float-right" style={{ justifyContent: "end" }}>
                            <Link to="/admin/dashboard">Dashboard</Link> /
                            Order Details
                        </p>
                    </Col>
              </Row>
              {/* {orderDetails.map((data) => (   */}
              <Card style={{width:"55%", margin:'auto'}}>
                <CardBody style={{fontSize: "larger"}}>
                  <Row>
                    {/* <Col>
                      <Card style={{width:'100%'}}>
                        <CardHeader style={{fontWeight:'bold'}}>
                          Product Details
                        </CardHeader>
                        <CardBody>
                       
                          <Row>
                         

                            <Col>
                              <img src={"http://localhost:5000" + orderDetails.Image} alt='image' style={{width:'200px', height:'140px'}}/>
                            </Col>
                            <Col sm={5}>
                              <Row>
                                <Col>
                                  Product Name:
                                </Col>
                                <Col>
                                  {data.ProductId.Name}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  Product Price:
                                </Col>
                                <Col>
                                {data.ProductId.Price}
                                </Col>
                              </Row>
                            </Col>
                          </Row> 
                         
 
                        </CardBody>
                      </Card>
                    </Col> */}

                    <Col>
                      <Card style={{width:'100%', margin:'auto'}}>
                        <CardHeader style={{fontWeight:'bold'}}>
                          <Row>
                            <Col>
                              Order Details
                            </Col>
                            <Col>
                            {/* <Row> */}
                                {/* <Col> */}
                                  Order Detail ID: {orderDetails._id}
                                {/* </Col> */}
                                {/* <Col sm={5}>
                                {orderDetails._id}
                                </Col> */}
                              {/* </Row> */}
                            </Col>
                          </Row>
                          
                        </CardHeader>
                        <CardBody>
                          <Row>
                          <Col sm={6}>
                              <Row>
                                <Col>
                                  Qty:
                                </Col>
                                <Col>
                                {orderDetails.Qty}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                Price
                                </Col>
                                <Col>
                                {orderDetails.Price}
                                </Col>
                              </Row>
                              {/* <Row>
                                <Col>
                                  Discount Amount:
                                </Col>
                                <Col>
                                {orderDetails.Qty}
                                </Col>
                              </Row> */}
                            </Col>


                            {/* <Col sm={6} style={{fontWeight:'bold'}}>
                              
                              <Row>
                                <Col>
                                  Order Date:
                                </Col>
                                <Col>
                                {data.OrderId.OrderDate}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  Order Status:
                                </Col>
                                <Col>
                                {data.OrderId.OrderStatus}
                                </Col>
                              </Row>
                            </Col> */}
                          </Row>  
                        </CardBody>
                        <CardFooter style={{fontWeight:'bold'}}>
                              <Row>
                                <Col sm={3}>
                                  Total:
                                </Col>
                                <Col>
                                  120
                                </Col>
                              </Row>
                        </CardFooter>
                      </Card>
                    </Col>
                  </Row>


              
                  
                </CardBody>
              </Card>
       {/* ))}  */}
      
      </>
    )

}
