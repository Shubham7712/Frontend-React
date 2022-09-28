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
	Title: yup.string().required("Please enter title"),
    Discription: yup.string().required("Please enter discription")
   
});

// custome header

const CustomHeader = ({ setShow }) => {
	return (

		<>
			<Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
            <Col >
				<h3> 
					<b>
						FAQ
					</b>
				</h3>
			</Col>
            <Col>
                    <p className="float-right" style={{ justifyContent: "end" }}>
                        <Link to="/">Dashboard</Link> /
                        FAQ
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
							Add FAQ
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
}


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

					api.get('Admin/FAQ/Delete/' + id).then(
						(res) => {
							console.log('delete res', res);
							if (res.data.success === true) {
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
		defaultValues: { Title: '', Discription:''},
		resolver: yupResolver(SignupSchema),
	});

	// ** States
	const [show, setShow] = useState(false);

 console.log("show=-------------",show);
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
		api.post('Admin/FAQ/getsearchdata', postData).then((res) => {
			console.log('Detected data>>>>>>>>>>>>>>>>>>>> ', res);

			let newData = res.data.faq	;

			let filterData = newData && newData.filter((Data) => Data.Active);
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

			api.get('Admin/FAQ/find/' + id).then((res) => {
			  console.log('>>>>>>>>>edit',res.data.data);
				setValue('Title', res.data.data.Title);
                setValue('Discription', res.data.data.Discription);
			});
		
		
		setShow(true);
	};

	const customStyles = {
        cells: {
            style: {
                fontSize: '16px',
                textAlign: "center"
            }
        }
    };

	const inputRef = useRef(null);

	const onSubmit = (data) => {

		let postData = {
			Title : data.Title,
            Discription: data.Discription,
			IsActive :true
		};
				


      api.post('Admin/FAQ/Create', postData).then((res) => {
        if (res.data.success == true) {
          setShow(false);
          setValue('Title', '');
          setValue('Discription', '');
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
           
		let postData = {
			Title : data.Title,
            Discription: data.Discription,
			IsActive :true
		};

			api.post(`Admin/FAQ/Update/` + Id, postData).then((res) => {
	
				if (res.data.success === true) {
					toast.success(
						<SuccessToast message={'Updated Successfully'} />,
						{
							hideProgressBar: true,
						}
					);
					getAllFunction();
					setId('')
					setValue('Title', '');
                    setValue('Discription', '');
			
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
			name:<h5><b>Title</b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Title }) => Title,
			selector: (row) => row.Title,

		},

    {
			name:<h5><b>Description</b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Discription }) => Discription,
			selector: (row) => row.Discription,

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
                        <b> Add FAQ</b>
                    </h5>


                    <Col xs={12} className="mb-1">
                      <Label className="form-label" for="Title">
                                      Title* 
                      </Label>
                      <Controller
                        control={control}
                        id="Title"
                        name="Title"
                        render={({ field }) => (
                          <Input
                            type='text'
                            maxLength={50}
                            placeholder=" Title "
                            invalid={
                              errors.Title && true
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.Title && (
                                              <FormFeedback>
                                                {errors.Title.message}
                                              </FormFeedback>
                        )}
                    </Col>

                    <Col xs={12} className="mb-1">
                      <Label className="form-label" for="Discription">
					  Description* 
                      </Label>
                      <Controller
                        control={control}
                        id="Discription"
                        name="Discription"
                        render={({ field }) => (
                          <Input
                            type='textarea'
                            maxLength={300}
                            placeholder="Description "
                            invalid={
                              errors.Discription && true
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.Discription && (
                        <FormFeedback>
                          {errors.Discription.message}
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
                        <b> Edit FAQ</b>
                    </h5>
                    
                    <Col xs={12} className="mb-1">
                      <Label className="form-label" for="Title">
                                      Title* 
                      </Label>
                      <Controller
                        control={control}
                        id="Title"
                        name="Title"
                        render={({ field }) => (
                          <Input
                                              type='text'
                            maxLength={50}
                            placeholder=" Title "
                            invalid={
                              errors.Title && true
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.Title && (
                                              <FormFeedback>
                                                {errors.Title.message}
                                              </FormFeedback>
                                          )}
                    </Col>

                    <Col xs={12} className="mb-1">
                      <Label className="form-label" for="Discription">
					  Description* 
                      </Label>
                      <Controller
                        control={control}
                        id="Discription"
                        name="Discription"
                        render={({ field }) => (
                          <Input
                            type='textarea'
                            maxLength={300}
                            placeholder="Description"
                            invalid={
                              errors.Discription && true
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.Discription && (
                        <FormFeedback>
                          {errors.Discription.message}
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

		api.get('Admin/FAQ/GetAll').then((res) => {
				setData(res.data.data);
                console.log("get all FAQ >>>>>>>>>>>>>>",res.data.data);
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