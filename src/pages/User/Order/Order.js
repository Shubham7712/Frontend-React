/*eslint-disable */





import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button} from 'reactstrap'
import ProcessBar from '../ProcessBar'
import Header from '../Header'
import Footer from '../Footer'
import Transitions from "../Transitions/motion";
import { useParams, useNavigate, Link } from "react-router-dom"
import swal from 'sweetalert';
import api from "../../../api";
import moment from 'moment';


function MyOrder() {

  
  const {id} = useParams();
  const [UserId, setUserId] = useState(localStorage.getItem('LoginId'));
  const [Orderid, setOrderid] = useState("");
  const [time , settime] = useState("");
  const [date , setdate] = useState("");
  const [Details , setDetails] = useState("");
  const [image , setimage] = useState("");


  





    // rating
    useEffect(() => {

      GetFoodById();
  
    }, [])



    const GetFoodById = () => {
      api.get(`/Admin/Order/find/${id}`).then((res) => {
        if (res.data.status == true) {
          console.log("Get All Orders------>", res.data)


          setOrderid(res.data.order.OrderNumber);
          settime(moment(res.data.order.createdAt).format('hh:mm'));
          setdate(moment(res.data.order.createdAt).format('DD MMM YYYY'));
          setDetails(res.data.order.Details);
          setimage(res.data.orderitem[0].ProductId.Image)
  
          console.log(`Total Order data Cart`, res.data.orderitem[0])
  
        }
  
      })
    }
  
  
  
  return (
    <>
    <Transitions>
    <Header/>
    <section class="breadcrumb" style={{marginTop:"100px"}}>
      <div class="container">
        <div class="row">
          <h2 class="col-md-6 col-12 section-title">Order</h2>
          <ul class="col-md-6 col-12 breadcrumb-nav ml-md-auto">
          <Link to="/Home">Home</Link> / <Link to="/User">  Pages</Link> / <b style={{color:'#2867E5',fontSize:"18px"}}>Order</b>
           
            </ul>
        </div>
      </div>
    </section>
    <Container>

          {/* heading order list */}

          <Row className=' mt-2' style={{margin:"auto", width:"60rem"}}>
            <div className='offer_card_heading2'>
                <h1 className='card_main_heading'> Thank you..!!  </h1>
            </div>
          </Row>

                  {/* end heading order list */}

                                  {/* process bar */}

                <div style={{width:"65rem", margin:"auto"}}> 
            <ProcessBar/>
          </div><br/><br/>
         
        {/* end process bar */}





                {/* my order */}

                <div className='orderborder mb-3'>
            <a className="fir-imageover" href="/">
              {/* <img className="fir-author-image" src={`http://localhost:5000/${image}`}style={{width:"180px",height:"150px",marginLeft:"5px",  borderRadius: "20px"}} /> */}
            </a>
            <div style={{marginTop:"20px", fontWeight:"bold",paddingLeft:"50px"}}>
              {/* <p > {Details} </p> */}
            <div class='d-flex'><p style={{color:"#ff606e"}}> OrderID  :- </p>
            <b class='mb-2'>  {Orderid}</b></div>  
              
             <div> <b  style={{color:"#ff606e"}}>OrderDate: </b> <span> {date} </span></div>

              <div><b  style={{color:"#ff606e"}}>Time :   </b> <span>{time}</span></div>
            </div>
            <div style={{marginTop:"40px", paddingLeft:"50px", paddingRight:"10px"}}> 
              <button className='pending' >Pending</button>
            </div>
            <div style={{marginTop:"40px", paddingLeft:"10px", paddingRight:"10px"}}> 
            <Button className='trackorder' color="danger" outline > Track Order </Button>
            </div>
          </div>



        {/* end my order */}




        



        </Container>
<Footer/>
</Transitions>


</>
  );

}

export default MyOrder;