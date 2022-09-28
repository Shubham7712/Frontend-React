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
} from 'reactstrap';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useHistory,Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import Switch from '@mui/material/Switch';

import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const MySwal = withReactContent(Swal);

const CustomHeader = ({ setShow }) => {
	return (

		<>
			<Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
            <Col >
				<h3> 
					<b>
						Get All Order Details
					</b>
				</h3>
			</Col>
            <Col>
                    <p className="float-right" style={{ justifyContent: "end" }}>
                        <Link to="/">Dashboard</Link> /
                         All Order Details
                    </p>
                </Col>
        </Row>
			<Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-5">
				<Col >
				</Col>
				<Col xs={5} lg={10}>
					</Col>
					<Col></Col>
				<Col>
				</Col>
			</Row>
		</>
		
	);
};
export default function Employee() {

	const [Image, setImage] = useState('');

    const [IsActive, setIsActive] = useState(false);


    const deleteData = (id) => {
		return MySwal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete this record?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ms-1',
			},
			buttonsStyling: false,
		}).then(function (result) {
			if (result.value) {
				axios.get('http://localhost:5000/Admin/OrderDetails/delete/' + id).then(
					(res) => {
						console.log('delete res', res);
						if (res.data.status === true) {
							MySwal.fire({
								icon: 'success',
								title: 'Deleted!',
								text: 'Your record has been deleted.',
								customClass: {
									confirmButton: 'btn btn-success',
								},
							});
							getAllFunction();
						} else {
							toast.error(<ErrorToast />, {
								hideProgressBar: true,
							});
						}
					}
				);
			}
		});
	};

	const SuccessToast = ({ data, message }) => {
		return (
			<Fragment>
				<div className="toastify-header">
					<div className="title-wrapper">
						<h6 className="toast-title">{message}</h6>
					</div>
				</div>
			</Fragment>
		);
	};

	const ErrorToast = ({ message }) => {
		return (
			<Fragment>
				<div className="toastify-header">
					<div className="title-wrapper">
						<h6 className="toast-title">Error!</h6>
					</div>
				</div>
				<div className="toastify-body">
					<span role="img" aria-label="toast-text">
						{message}
					</span>
				</div>
			</Fragment>
		);
	};


	
    const [show, setShow] = useState(false);
	const [InputFile, setInputFile] = useState('');

	const [Id, setId] = useState('');
    

   

	const customStyles = {
        cells: {
            style: {
                fontSize: '16px'
            }
        }
    };


    








	const handleIdentityFile = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
    };


    

	const inputRef = useRef(null);

    
	
    const updatedColumns = [
		// {
		// 	name:<h5><b>Order Number </b></h5>,
		// 	sortable: true,
		// 	minWidth: '100px',
        //     cell: (row) => row.FirstName + " " + row.LastName,
		// 	selector: (row) => row.FirstName
		// },

        {
			name: <h5> <b> Qty </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Qty }) => Qty,
			selector: (row) => row.Qty,
		},

        {
			name: <h5> <b> Price </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Price }) => Price,
			selector: (row) => row.Price,
		},

        {
			name: <h5> <b> ProductId </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ ProductId }) => ProductId,
			selector: (row) => row.ProductId,
		},

        // {
		// 	name: <h5> <b> Total </b></h5>,
		// 	sortable: true,
		// 	minWidth: '100px',
		// 	cell: ({ Total }) => Total,
		// 	selector: (row) => row.Total,
		// },

        // {
		// 	name:<h5> <b> User Image </b></h5>,
		// 	sortable: true,
		// 	minWidth: '100px',
		// 	cell: (row) =>{
        //         return (
        //             <img src={`http://localhost:5000/${row.Image}`} alt="img"   className="img-circle elevation-2"
        //             style={{
        //                 height: '50px',
        //                 width: '50px',
        //                 marginTop: '10px',
        //                 marginBottom: '10px'
        //             }}/>

        //         )
        //     },
		// 	selector: (row) => {
        //         return (
        //             <img src={`http://localhost:5000/${row.Image}`} alt="img"  style={{height:"50px",width:"60px"}}/>

        //         )
        //     },
		// },

        {
			name: <h5> <b> View Order Details </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: (row) => {
				return (

                    <>
                        <Link to ='/Admin/orderdetails'><i className="fa-solid fa-eye" color='secondary' ></i></Link>
                    </>
                )
                }
		},
       
        
		{
			name: <h5> <b> Actions </b></h5>,
			cell: (row) => {
				return (
					<div className="d-flex align-items-center permissions-actions ">
						<Button
							size="sm"
							color="transparent"
							className="btn btn-icon"
							onClick={() =>
								deleteData(row._id)
							}
						>
							<Trash className="font-medium-2" />
						</Button>
					</div>
				);
			},
		},
	];

    
    
    const [Data, setData] = useState([]);
    const handleDiscard = () => {
      if (InputFile != '' && InputFile !== null) {
        setInputFile('');
      } 
      setId('')
		reset();
		setImage('');
		setShow(false);
	};
    const getAllFunction = () => {

		axios.get('http://localhost:5000/Admin/OrderDetails/getall').then((res) => {
				setData(res.data.List);
                console.log("get all OrderDetails>>>>>>>>>>>>",res.data.List);
		}); 


        
	};

    // useEffect(()=>{
        

    //     if(IsActive === true){
    //         axios.post('http://localhost:5000/Admin/User/find' + _id).then((res)=>{
    //         console.log(res.data);
    //         let newData = res.data.admin;
    //         setIsActive(newData.IsActive);
    //     })}
    // },[])



	
	useEffect(() => {
		getAllFunction();
	}, []);


    const handleModalClosed = () => {
	
		setValue('permissionName', '');
	};

    return (
        <Fragment>

            <div className="react-dataTable">
				<DataTable
					noHeader
					subHeader
					responsive
					columns={updatedColumns}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					data={Data}
					pagination
					subHeaderComponent={<CustomHeader setShow={setShow} />}
					customStyles={customStyles}
				/>
			</div>
            <Modal
				isOpen={show}
				onClosed={handleModalClosed}
				className="modal-dialog-centered"
			>
				
				<ModalBody
					
				>
					{/* {renderForm()} */}
				</ModalBody>
			</Modal>
            </Fragment>

      )
    }