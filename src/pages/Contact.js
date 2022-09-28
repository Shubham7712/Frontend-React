/*eslint-disable*/

import React,{Fragment ,useState,useEffect, useRef } from 'react';
import { ChevronDown, Edit, Trash } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../api';
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
	Card
} from 'reactstrap';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useHistory,Link } from 'react-router-dom';
import { useForm, Controller, set } from 'react-hook-form';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';




const MySwal = withReactContent(Swal);
const SignupSchema = yup.object().shape({
	Address: yup.string().required("Please enter address"),
    StartTime: yup.string().required("Please enter start time"),
    EndTime: yup.string().required("Please enter end time "),
    Email: yup.string().required("Please enter email").email("Invalid email address"),
    // CouponType: yup.string().required("This field is required"),
    // ToDate: yup.string().required("This field is required"),
    // FromDate: yup.string().required("This field is required"),
    // Restriction: yup.string().required("This field is required"),
   
});

// custom header
const CustomHeader = ({ setShow }) => {
	return (

		<>
			<Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
            <Col >
				<h3> 
					<b>
						Contact
					</b>
				</h3>
			</Col>
            <Col>
                    <p className="float-right" style={{ justifyContent: "end" }}>
                        <Link to="/admin/dashboard">Dashboard</Link> /
                        Contact
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
					<div className="mt-lg-0 mt-1">
						<Button
							className="add-permission mt-sm-0 mt-1"
							color="primary"
							onClick={() => setShow(true)}
						>
							Add Contact
						</Button>
					</div>
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
				api.get('Admin/Contact/delete/' + id).then(
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

	const {
		reset,
		control,
		setError,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: { Address: '', StartTime:'', EndTime:'', Email:''},
		resolver: yupResolver(SignupSchema),
	});

	// ** States
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
		api.post('Admin/Contact/getsearchdata', postData).then((res) => {
			console.log('Detected data>>>>>>>>>>>>>>>>>>>> ', res);

			let newData = res.data;

			let filterData = newData && newData.filter((Data) => Data.IsActive);
			setData(filterData);

		});
	}
else{

	getAllFunction({});
}


}



	const handleEditClick = (data) => {
		const id = data._id;
		setId(id);
		api.get('Admin/Contact/find/' + id).then((res) => {
      	console.log('>>>>>>>>>edit',res.data.contact);
			setValue('Address', res.data.contact.Address);
            setValue('StartTime', res.data.contact.StartTime);
            setValue('EndTime', res.data.contact.EndTime);
            setValue('Email', res.data.contact.Email);
		});
		
		setShow(true);
	};

	const customStyles = {
        cells: {
            style: {
                fontSize: '16px'
            }
        }
    };

	const inputRef = useRef(null);

	const onSubmit = (data) => {

		let postData = {
			Address : data.Address,
            StartTime:data.StartTime,
            EndTime:data.EndTime,
            Email:data.Email,
			IsActive :true
		};
				


      api.post('Admin/Contact/create', postData).then((res) => {
        if (res.data.status == true) {
          setShow(false);
          setValue('Address', '');
          setValue('StartTime', '');
          setValue('EndTime', '');
          setValue('Email', '');
          toast.success(
            <SuccessToast
              message={'Added Successfully'}
              data={data}
            />,
            {
              hideProgressBar: true,
            }
          );
          console.log('submit', data);
          getAllFunction();
        } else {
          toast.error(
            <ErrorToast message={'Something Went Wrong!'} />,
            { hideProgressBar: true }
          );
        }
      });
    }
	// };

	const onEdit = (data) => {
			let editData = new FormData();

            // editData.append('Name', data.Name);
           
		let postData = {
			Address : data.Address,
            StartTime:data.StartTime,
            EndTime:data.EndTime,
            Email:data.Email,
			IsActive :true
		};
		
		api.post(`Admin/Contact/update/` + Id, postData).then((res) => {

			if (res.data.status === true) {
				toast.success(
					<SuccessToast message={'Updated Successfully'} />,
					{
						hideProgressBar: true,
					}
				);
				getAllFunction();
				setId('')
                setValue('Address', '');
                setValue('StartTime', '');
                setValue('EndTime', '');
                setValue('Email', '');
        
			} else {
				toast.error(
					<ErrorToast message={'Something Went Wrong!'} />,
					{ hideProgressBar: true }
				);
			}
		})
		setShow(false);
	};

    const updatedColumns = [
		{
			name:<h5><b>Address</b></h5>,
			sortable: true,
			minWidth: '150px',
			cell: ({ Address }) => Address,
			selector: (row) => row.Address,

		},

        {
			name:<h5><b>Start Time</b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ StartTime }) => StartTime,
			selector: (row) => row.StartTime,

		},

        {
			name:<h5><b>End Time</b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ EndTime }) => EndTime,
			selector: (row) => row.EndTime,

		},

        {
			name:<h5><b>Email</b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Email }) => Email,
			selector: (row) => row.Email,

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
							onClick={() => handleEditClick(row)}
						>
							<Edit className="font-medium-2" />
						</Button>
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

    const renderForm = () => {
		if (Id == null || Id == '') {
			return (
				<Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
			<h5
                        style={{
                            background: '',
                            color: 'black',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                    >
                        <b> Add Contact</b>
                    </h5>


                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="Address">
                            Address* 
						</Label>
						<Controller
							control={control}
							id="Address"
							name="Address"
							render={({ field }) => (
								<Input
                                    type='textarea'
									maxLength={100}
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
					</Col>

                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="StartTime">
                            Start Time* 
						</Label> 
						<Controller
							control={control}
							id="StartTime"
							name="StartTime"
							render={({ field }) => (
								<Input
                                    type='time'
									maxLength={50}
									placeholder=" StartTime "
									invalid={
										errors.StartTime && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.StartTime && (
                                    <FormFeedback>
                                       {errors.StartTime.message}
                                    </FormFeedback>
                                )}
					</Col>

                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="EndTime">
                            End Time* 
						</Label>
						<Controller
							control={control}
							id="EndTime"
							name="EndTime"
							render={({ field }) => (
								<Input
                                    type='time'
									maxLength={50}
									placeholder=" EndTime "
									invalid={
										errors.EndTime && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.EndTime && (
                                    <FormFeedback>
                                       {errors.EndTime.message}
                                    </FormFeedback>
                                )}
					</Col>


                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="Email">
                            Email* 
						</Label>
						<Controller
							control={control}
							id="Email"
							name="Email"
							render={({ field }) => (
								<Input
                                   type='text'
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
					</Col>
					

					<Col xs={12} className="mt-2" style={{display: 'flex', justifyContent: 'end'}}>
                        <Button className="mr-2" color="primary">
                            Add
                        </Button>
                        <Button
                            outline
                            type="reset"
                            onClick={handleDiscard}
                        >
                            Cancel
                        </Button>
                    </Col>
         
				</Row>
			);
		} else {
			return (
				<Fragment>
        <Row tag={Form} onSubmit={handleSubmit(onEdit)}>
					<h5
                        style={{
                            background: '',
                            color: 'black',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                    >
                        <b> Edit Contact</b>
                    </h5>
                    
                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="Address">
                            Address* 
						</Label>
						<Controller
							control={control}
							id="Address"
							name="Address"
							render={({ field }) => (
								<Input
                                    type='textarea'
									maxLength={100}
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
					</Col>

                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="StartTime">
                            Start Time* 
						</Label>
						<Controller
							control={control}
							id="StartTime"
							name="StartTime"
							render={({ field }) => (
								<Input
                                    type='time'
									maxLength={50}
									placeholder=" StartTime "
									invalid={
										errors.StartTime && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.StartTime && (
                                    <FormFeedback>
                                       {errors.StartTime.message}
                                    </FormFeedback>
                                )}
					</Col>

                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="EndTime">
                            End Time* 
						</Label>
						<Controller
							control={control}
							id="EndTime"
							name="EndTime"
							render={({ field }) => (
								<Input
                                    type='time'
									maxLength={50}
									placeholder=" EndTime "
									invalid={
										errors.EndTime && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.EndTime && (
                                    <FormFeedback>
                                       {errors.EndTime.message}
                                    </FormFeedback>
                                )}
					</Col>


                    <Col xs={12} className="mb-1">
						<Label className="form-label" for="Email">
                            Email* 
						</Label>
						<Controller
							control={control}
							id="Email"
							name="Email"
							render={({ field }) => (
								<Input
                                    type='email'
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
					</Col>
					


                    <Col xs={12} className="mt-2" style={{display: 'flex', justifyContent: 'end'}}>
                        <Button className="mr-2" color="primary" type='submit'>
                            Update
                        </Button>
                        <Button
                            outline
                            type="reset"
                            onClick={handleDiscard}
                        >
                            Cancel
                        </Button>
                    </Col>
                </Row>
				</Fragment>
			);
		}
	};
    const [Data, setData] = useState([]);
    const handleDiscard = () => {
      if (InputFile != '' && InputFile !== null) {
        setInputFile('');
      } 
      setId('')
		reset();
		setShow(false);
	};
    const getAllFunction = () => {

		api.get('Admin/Contact/getall').then((res) => {
				setData(res.data.List);
                console.log("get all Contact>>>>>>>>>>>>>>",res.data.List);
		});
	};
	
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

					<Modal
				isOpen={show}
				onClosed={handleModalClosed}
				className="modal-dialog-centered"
			>
				
				<ModalBody
					
				>
					{renderForm()}
				</ModalBody>
			</Modal>
				</Card>
			</Card>
		</Fragment>

      )
    }