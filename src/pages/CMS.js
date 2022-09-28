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
import api from '../api';




const MySwal = withReactContent(Swal);
const SignupSchema = yup.object().shape({
	Contended: yup.string().required("Please enter contended"),
	OfferTitle: yup.string().required("Please enter offer title")
   
});
const CustomHeader = ({ setShow }) => {
	return (
        <>
            <Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
                <Col >
                    <h3> 
                        <b>
                            CMS
                        </b>
                    </h3>
                </Col>
                <Col>
                        <p className="float-right" style={{ justifyContent: "end" }}>
                            <Link to="/admin/dashboard">Dashboard</Link> /
                            CMS
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
                    <div className="mt-lg-0 mt-1" style={{ justifyContent: "end" }}>
                        <Button
                            className="add-permission mt-sm-0 mt-1"
                            color="primary"
                            onClick={() => setShow(true)}
                        >
                            Add CMS
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

	const [CmsImage, setCmsImage] = useState('');

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
				api.get('Admin/CMS/delete/' + id).then(
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
		defaultValues: { Contended: '', OfferTitle:''  },
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
		api.post('Admin/CMS/getsearchdata', postData).then((res) => {
			console.log('Detected data>>>>>>>>>>>>>>>>>>>> ', res);

			let newData = res.data.cms;

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
		api.get('Admin/CMS/find/' + id).then((res) => {
            console.log('>>>>>>>>>>>>>>edit>>>', res.data.cms);
			setValue('Contended', res.data.cms.Contended);
			setValue('OfferTitle', res.data.cms.OfferTitle);

			  setCmsImage(
				`http://localhost:5000/${data && data.CmsImage}`
			);
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
	const handleIdentityFile = (e) => {
        setCmsImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        });
    };

	const inputRef = useRef(null);

	const onSubmit = (data) => {

    let postData = new FormData();

    postData.append('Contended', data.Contended);
    postData.append('OfferTitle', data.OfferTitle);
    postData.append('CmsImage',CmsImage.raw);
	postData.append('IsActive',true );

    
	let empty = false;
		if (CmsImage == null || CmsImage == '') {
			
			toast.error(
				<ErrorToast message={'Please Select A Image!'} />,
				{
					hideProgressBar: false,
				}
			);
		} else {
      api.post('Admin/CMS/create/', postData).then((res) => {
        if (res.data.status == true) {
          setShow(false);
          setValue('Contended', '');
          setValue('OfferTitle', '');
          setValue('CmsImage', '');
		  setValue('IsActive', true);
		  setCmsImage('')

          if (InputFile != '' && InputFile !== null) {
            setInputFile('');
          }
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
	};

	const onEdit = (data) => {

		console.log("CmsImage",CmsImage);
			let editData = new FormData();

      editData.append('Contended', data.Contended);
      editData.append('OfferTitle', data.OfferTitle);
      editData.append('CmsImage', CmsImage.raw );
	  editData.append('IsActive', true);
		
		api.post('Admin/CMS/update/' + Id, editData).then((res) => {

			if (res.data.status === true) {
				toast.success(
					<SuccessToast message={'Updated Successfully'} />,
					{
						hideProgressBar: true,
					}
				);
				getAllFunction();
				setId('')
				setValue('Contended', '');
				setValue('OfferTitle', '');
				setValue('CmsImage', '');
				setValue('IsActive', true);

        if (CmsImage != '' && CmsImage !== null) {
          setInputFile('');
        }
        // setCmsImage( inputRef.current.clear())
				setShow(false);
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
			name: <h5> <b> Contended </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ Contended }) => Contended,
			selector: (row) => row.Contended,
		},

		{
			name:<h5><b>Offer Title</b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: ({ OfferTitle }) => OfferTitle,
			selector: (row) => row.OfferTitle,

		},
    
        

        {
			name:<h5> <b> CMS Image </b></h5>,
			sortable: true,
			minWidth: '100px',
			cell: (row) =>{
                return (
                    <img src={`http://localhost:5000/${row.CmsImage}`} alt="img"   className="img-circle elevation-2"
                    style={{
                        height: '50px',
                        width: '50px',
                        marginTop: '10px',
                        marginBottom: '10px'
                    }}/>

                )
            },
			selector: (row) => {
                return (
                    <img src={`http://localhost:5000/${row.CmsImage}`} alt="img"  style={{height:"50px",width:"60px"}}/>

                )
            },
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
                        <b> Add CMS</b>
                    </h5>


					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Contended">
                    		Contended* 
						</Label>
						<Controller
							control={control}
							id="Contended"
							name="Contended"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Contended "
									invalid={
										errors.Contended && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Contended && (
                                    <FormFeedback>
                                       {errors.Contended.message}
                                    </FormFeedback>
                                )}
					</Col>

					<Col xs={12} className="mb-1">
						<Label className="form-label" for="OfferTitle">
                    		Offer Title* 
						</Label>
						<Controller
							control={control}
							id="OfferTitle"
							name="OfferTitle"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Offer Title "
									invalid={
										errors.OfferTitle && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.OfferTitle && (
                                    <FormFeedback>
                                       {errors.OfferTitle.message}
                                    </FormFeedback>
                                )}
					</Col>

        
					<Col xs={12} className="mb-1">
                                    <Label
                                        className="form-div mr-2"
                                        for="CmsImage *"
                                    >
                                        CmsImage *
                                    </Label>
                                    <div className='mb-2'>
                                        <Input
                                            onChange={(e) =>
                                                handleIdentityFile(e)
                                            }
                                            name="CmsImage "
                                            type="file"
                                            id="inputFile"
                                        />
                                    </div>
                                        {CmsImage.preview ? (
                                            <img
                                                style={{
                                                    width: 'inherit',
                                                    height: '50px'
                                                }}
                                                src={
                                                    CmsImage.preview
                                                }
                                            />
                                            ) : (
                                            <>
                                            <img
                                            src={
                                                CmsImage
                                                ? CmsImage
                                                : AltImage
                                            }
                                            
                                            width="inherit"
                                            height="50px"
                                            /></>
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
                        <b> Edit CMS</b>
                    </h5>

					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Contended">
                    		Contended* 
						</Label>
						<Controller
							control={control}
							id="Contended"
							name="Contended"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Contended "
									invalid={
										errors.Contended && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Contended && (
                                    <FormFeedback>
                                       {errors.Contended.message}
                                    </FormFeedback>
                                )}
					</Col>

					<Col xs={12} className="mb-1">
						<Label className="form-label" for="OfferTitle">
                    		Offer Title* 
						</Label>
						<Controller
							control={control}
							id="OfferTitle"
							name="OfferTitle"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Offer Title "
									invalid={
										errors.OfferTitle && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.OfferTitle && (
                                    <FormFeedback>
                                       {errors.OfferTitle.message}
                                    </FormFeedback>
                                )}
					</Col>

					<Col xs={12} className="mb-1">
                                    <Label
                                        className="form-div mr-2"
                                        for="CmsImage *"
                                    >
                                        CmsImage *
                                    </Label>
                                    <div className='mb-2'>
                                        <Input
                                            onChange={(e) =>
                                                handleIdentityFile(e)
                                            }
                                            name="CmsImage "
                                            type="file"
                                            id="inputFile"
											ref={inputRef}
                                        />
                                    </div>
                                        {CmsImage.preview ? (
                                            <img
                                                style={{
                                                    width: 'inherit',
                                                    height: '50px'
                                                }}
                                                src={ CmsImage.preview }
                                            />
                                            ) : (
                                            <>
                                            <img
                                            src={ CmsImage ? CmsImage : AltImage }
                                            
                                            width="inherit"
                                            height="50px"
                                            /></>
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

		api.get('Admin/CMS/getall').then((res) => {
				setData(res.data.List);
                console.log("get all NewsEvents>>>>>>>>>>",res.data.List);
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