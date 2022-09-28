/*eslint-disable*/

import React,{Fragment ,useState,useEffect, useRef } from 'react';
import { ChevronDown, Edit, Trash } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api';
import axios from "axios"
import AltImage from '../Images/download.png';
import Star from '@mui/icons-material/Star';

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
	Badge,
	Card
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

// custom header
const CustomHeader = ({ setShow }) => {
	return (

		<>
			<Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
            <Col >
				<h3> 
					<b>
						Rating
					</b>
				</h3>
			</Col>
            <Col>
                    <p className="float-right" style={{ justifyContent: "end" }}>
                        <Link to="/admin/dashboard">Dashboard</Link> /
                        Rating
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


// custom search
const CustomSearch = ({setSearch,handlesearch}) => {
    return (
        <>
            <Row className="pull-left">
                <Col>
                    <Input
                        id="search"
                        type="search"
                        placeholder="Search"
                        title="search"
                        className="mb-3 form-control input-search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Button  onClick={handlesearch} className="btn btn-light mr-5" title="search">
                        Search
                    </Button>
                </Col>
            </Row>
            <br />
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
				api.get('Admin/Rating/delete/' + id).then(
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


		// handle search

const [Search, setSearch] = useState("");

const 	handlesearch = () => {

	console.log(`THIS IS REACH DATA>>>>>>>>>>> `, Search)

	let postData = {
		searchdata: Search
		}

	if (Search) {
		api.post('Admin/Rating/getsearchdata', postData).then((res) => {
			console.log('Detected data>>>>>>>>>>>>>>>>>>>> ', res);

			let newData = res.data.Rating;

			let filterData = newData && newData.filter((Data) => Data.IsActive);
			setData(filterData);

		});
	}
else{

	getAllFunction({});
}


}
    

   

	const customStyles = {
        cells: {
            style: {
                fontSize: '16px',
				textAlign: "center"
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
			name: <h5> <b> Rating </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: (row) =>
			row.Rating && (
				<Badge color="blue" className="me-1">
					<a style={{fontSize: 13, color: '#377dff'}}>
						{' '}
						{row.Rating}
					</a>
					<Star
						style={{
							marginLeft: '4px',
							marginBottom: '1px',
							fontSize: 15
						}}
					/>
				</Badge>
			),
		selector: (row) => row.Rating
	},
		

        {
			name: <h5> <b> Review </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Review }) => Review,
			selector: (row) => row.Review,
		},

        {
			name: <h5> <b> Product Name </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: (row) => row.Product && row.Product.Name,
			selector: (row) => row.Product.Name,
		},

		{
			name: <h5> <b> User Name </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: (row) => row.User && row.User.FirstName + " " + row.User.LastName,
			selector: (row) => row.User.Name,
		},

		{
			name: <h5> <b> User Image </b></h5>,
			sortable: false,
			minWidth: '100px',
			cell: (row) => (
				<div>
					 <img src={`http://localhost:5000/${row.User && row.User.Image}`} alt="img" className="img-circle elevation-2" 
					 style={{width: '50px', height: '50px', marginTop: '10px',marginBottom: '10px'}} />
				</div>
			),
			selector: (row) => {
                return (
                    <img src={`http://localhost:5000/${row.User && row.User.Image}`} alt="img"  style={{height:"50px",width:"60px"}}/>

                )
            },
		},


		{
			name: <h5> <b> User Email </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: (row) => row.User && row.User.Email,
			selector: (row) => row.Product,
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

		api.get('Admin/Rating/getall').then((res) => {
				setData(res.data.List);
                console.log("get all Rating>>>>>>>>>>>>",res.data.List);
		}); 


        
	};

    // useEffect(()=>{
        

    //     if(IsActive === true){
    //         api.post('Admin/User/find' + _id).then((res)=>{
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
			<Card body outline color="secondary">
				<CustomHeader Data={Data} setShow={setShow} />
				<Card body outline color="secondary">
					<div className="react-dataTable">
						<DataTable
							noHeader
							subHeader
							responsive
							columns={updatedColumns}
							sortIcon={<ChevronDown />}
							className="react-dataTable"
							data={Data}
							striped={true}
							customStyles={customStyles}
							pagination
							subHeaderComponent={
								<CustomSearch
									setSearch={setSearch}
									handlesearch={() => handlesearch()}
								/>
							}
						/>
					</div>

					{/* <Modal
				isOpen={show}
				onClosed={handleModalClosed}
				className="modal-dialog-centered"
			>
				
				<ModalBody
					
				>
					{renderForm()}
				</ModalBody>
					</Modal> */}
				</Card>
			</Card>
		</Fragment>

      )
    }