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
import { faKrw } from '@fortawesome/free-solid-svg-icons';
import api from '../api';




const MySwal = withReactContent(Swal);
const SignupSchema = yup.object().shape({
	Name: yup.string().required("Please enter name"),
    Details:yup.string().required("Please enter details"),
    Price: yup.string().required("Please enter price "),
   
});

// custom header
const CustomHeader = ({ setShow }) => {
	return (
        <>
            <Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
                <Col >
                    <h3> 
                        <b>
                            Product
                        </b>
                    </h3>
                </Col>
                <Col>
                        <p className="float-right" style={{ justifyContent: "end" }}>
                            <Link to="/admin/dashboard">Dashboard</Link> /
                            Product
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
                            Add Product
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

	const [Image, setImage] = useState('');

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
				api.get('Admin/Products/delete/' + id).then(
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
		defaultValues: { Name: '',Price:'',Details:''  },
		resolver: yupResolver(SignupSchema),
	});

	// ** States
	const [show, setShow] = useState(false);
	const [InputFile, setInputFile] = useState('');

	const [Id, setId] = useState('');

	const [CategoryName, setCategoryName] = useState([]);
    const [selectCategoryOptions, setSelectCategoryOptions] = useState('');

	const [BrandName, setBrandName] = useState([]);
    const [selectBrandOptions, setSelectBrandOptions] = useState('');


		// handle search

const [Search, setSearch] = useState("");

const 	handlesearch = () => {

	console.log(`THIS IS REACH DATA>>>>>>>>>>> `, Search)

	let postData = {
		searchdata: Search
		}

	if (Search) {
		api.post('Admin/Products/getsearchdata', postData).then((res) => {
			console.log('Detected data>>>>>>>>>>>>>>>>>>>> ', res);

			let newData = res.data.Product;

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
		api.get('Admin/Products/find/' + id).then((res) => {
            console.log('>>>>>>>>>>>>>>edit>>>', res.data.product);
			setValue('Name', res.data.product.Name);
			setValue('Details', res.data.product.Details);
			setValue('Price', res.data.product.Price);
			
            setSelectCategoryOptions({
                value: data.Category && data.Category._id,
                label: data.Category && data.Category.Name
            });

			
            setSelectBrandOptions({
                value: data.Brand && data.Brand._id,
                label: data.Brand && data.Brand.Name
            });

			  setImage( `http://localhost:5000/${data && data.Image}` );
		});
		
		setShow(true);
		reset();
		setImage('');
	};

	const customStyles = {
        cells: {
            style: {
                fontSize: '16px',
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

	const onSubmit = (data) => {

    let postData = new FormData();

    postData.append('Name', data.Name);
	postData.append('Brand',selectBrandOptions.value);
	postData.append('Category',selectCategoryOptions.value);
    postData.append('Details', data.Details);
    postData.append('Price', data.Price);
    postData.append('Image',Image.raw);
	



    
	let empty = false;
		if (Image == null || Image == '') {
			
			toast.error(
				<ErrorToast message={'Please Select A Image!'} />,
				{
					hideProgressBar: true,
				}
			);
		} else if(selectCategoryOptions.value === undefined){toast.error('Please select category',{hideProgressBar: true})}else if(selectBrandOptions.value === undefined){toast.error("Please select brand ")}else {
      	api.post('Admin/Products/create/', postData).then((res) => {
        if (res.data.status == true) {
          setShow(false);
          setValue('Name', '');
		  setValue('Category', '');
		  setValue('Brand', '');
          setValue('Details', '');
          setValue('Price','');
          setValue('Image', '');
		  setSelectCategoryOptions('')
          setSelectBrandOptions('')
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
		// alert(selectBrandOptions.value);
			let editData = new FormData();

      editData.append('Name', data.Name);
	  editData.append('Brand',selectBrandOptions.value);
	  editData.append('Category',selectCategoryOptions.value);
      editData.append('Price', data.Price);
      editData.append('Image', Image.raw );
	  editData.append('IsActive', true );


	  console.log(`DATATA`,data);
		
		api.post(`Admin/Products/update/` + Id, editData).then((res) => {

			try{
				if (res.data.status === true) {
					toast.success(
						<SuccessToast message={'Updated Successfully'} />,
						{
							hideProgressBar: true,
						}
					);
					getAllFunction();
					setId('')
					setValue('Name', '');
					setValue('Category', '');
					setValue('Brand', '');
					setValue('Details', '');
					setValue('Price','');
					setValue('Image', '');
	
			if (Image != '' && Image !== null) {
			  setInputFile('');
			}
			setImage( inputRef.current.clear())
					setShow(false);
				} else {
					toast.error(
						<ErrorToast message={'Something Went Wrong!'} />,
						{ hideProgressBar: true }
					);
				}
			}catch{
				// console.log("Callled ")
			}
		})
		setShow(false);
	};



	function handleChangeCategory(e) {
        setSelectCategoryOptions(e);
    }


	function handleChangeBrand(e) {
        setSelectBrandOptions(e);
    }




    const updatedColumns = [

        {
			name: <h5> <b> Category Name </b></h5>,
			sortable: true,
			minWidth: '50px',
			cell: (row) => row.Category && row.Category.Name,
			selector: (row) => row.Category.Name && row.Category.Name,
		},

        {
			name: <h5> <b> Brand Name </b></h5>,
			sortable: true,
			minWidth: '50px',
			cell: (row) => row.Brand && row.Brand.Name,
			selector: (row) =>  row.Brand.Name && Brand.Name,
		},

		{
			name:<h5><b> Product Name</b></h5>,
			sortable: true,
			minWidth: '150px',
			cell: ({ Name }) => Name,
			selector: (row) => row.Name,

		},
    
        {
			name: <h5> <b> Product Details </b></h5>,
			sortable: true,
			minWidth: '150px',
			cell: ({ Details }) => Details,
			selector: (row) => row.Details,
		},

        {
			name: <h5> <b> Product Price </b></h5>,
			sortable: true,
			minWidth: '50px',
			cell: ({ Price }) => Price,
			selector: (row) => row.Price,
		},

        {
			name:<h5> <b> Product Image </b></h5>,
			sortable: false,
			minWidth: '150px',
			cell: (row) =>{
                return (
                    <img src={`http://localhost:5000/${row.Image}`} alt="img"  className="img-circle elevation-2"
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
                    <img src={`http://localhost:5000/${row.Image}`} alt="img"  style={{height:"50px",width:"60px"}}/>

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
                        <b> Add Product</b>
                    </h5>
					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Category">
                    		Category Name* 
						</Label>
						<Controller
							control={control}
							id="Name"
							name="Name"
							render={({ field }) => (
								<Select
                                            name="Category"
                                            id="Category"
                                            value={selectCategoryOptions}
                                            menuPlacement="auto"
                                            className="react-select"
                                            options={CategoryName.map((item) => ({
                                                value: item._id && item._id,
                                                label: item.Name &&  item.Name
                                            }))}
                                            onChange={(e) =>
                                                handleChangeCategory(e)
                                            }
                                        ></Select>
							)}
						/>
						 {errors && errors.Name && (
                                    <FormFeedback>
                                       {errors.Name.message}
                                    </FormFeedback>
                                )}
					</Col>


					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Brand">
                    		Brand Name* 
						</Label>
						<Controller
							control={control}
							id="Name"
							name="Name"
							render={({ field }) => (
								<Select
                                            name="Brand"
                                            id="Brand"
                                            value={selectBrandOptions}
                                            menuPlacement="auto"
                                            className="react-select"
                                            options={BrandName.map((item) => ({
                                                value: item._id && item._id,
                                                label: item.Name &&  item.Name
                                            }))}
                                            onChange={(e) =>
                                                handleChangeBrand(e)
                                            }
                                        ></Select>
							)}
						/>
						 {errors && errors.Name && (
                                    <FormFeedback>
                                       {errors.Name.message}
                                    </FormFeedback>
                                )}
					</Col>



					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Name">
                    		Product Name* 
						</Label>
						<Controller
							control={control}
							id="Name"
							name="Name"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder="Product Name"
									invalid={
										errors.Name && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Name && (
                                    <FormFeedback>
                                       {errors.Name.message}
                                    </FormFeedback>
                                )}
					</Col>



					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Price">
                    		Product Price* 
						</Label>
						<Controller
							control={control}
							id="Price"
							name="Price"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder="Product Price	"
									type='number'
									invalid={
										errors.Price && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Price && (
                                    <FormFeedback>
                                       {errors.Price.message}
                                    </FormFeedback>
                                )}
					</Col>


					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Details">
                    		Product Details* 
						</Label>
						<Controller
							control={control}
							id="Details"
							name="Details"
							render={({ field }) => (
								<Input
									type="textarea"
									maxLength={200}
									placeholder="Product Details"
									invalid={
										errors.Details && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Details && (
                                    <FormFeedback>
                                       {errors.Details.message}
                                    </FormFeedback>
                                )}
					</Col>


					<Col xs={12} className="mb-1">
                                    <Label
                                        className="form-div mr-2"
                                        for="Image *"
                                    >
                                        Product Image *
                                    </Label>
                                    <div className='mb-2'>
                                        <Input
                                            onChange={(e) =>
                                                handleIdentityFile(e)
                                            }
                                            name="Image "
                                            type="file"
                                            id="inputFile"
                                        />
                                    </div>
                                        {Image.preview ? (
                                            <img
                                                style={{
                                                    width: 'inherit',
                                                    height: '50px'
                                                }}
                                                src={
                                                    Image.preview
                                                }
                                            />
                                            ) : (
                                            <>
                                            <img
                                            src={
                                                Image
                                                ? Image
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
                        <b> Edit Product</b>
                    </h5>

					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Category">
                    		Category Name* 
						</Label>
						<Controller
							control={control}
							id="Name"
							name="Name"
							render={({ field }) => (
								<Select
                                            name="Category"
                                            id="Category"
                                            value={selectCategoryOptions}
                                            menuPlacement="auto"
                                            className="react-select"
                                            options={CategoryName.map((item) => ({
                                                value: item._id && item._id,
                                                label: item.Name &&  item.Name
                                            }))}
                                            onChange={(e) =>
                                                handleChangeCategory(e)
                                            }
                                        ></Select>
							)}
						/>
						 {errors && errors.Name && (
                                    <FormFeedback>
                                       {errors.Name.message}
                                    </FormFeedback>
                                )}
					</Col>


					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Brand">
                    		Brand Name* 
						</Label>
						<Controller
							control={control}
							id="Name"
							name="Name"
							render={({ field }) => (
								<Select
                                            name="Brand"
                                            id="Brand"
                                            value={selectBrandOptions}
                                            menuPlacement="auto"
                                            className="react-select"
                                            options={BrandName.map((item) => ({
                                                value: item._id && item._id,
                                                label: item.Name &&  item.Name
                                            }))}
                                            onChange={(e) =>
                                                handleChangeBrand(e)
                                            }
                                        ></Select>
							)}
						/>
						 {errors && errors.Name && (
                                    <FormFeedback>
                                       {errors.Name.message}
                                    </FormFeedback>
                                )}
					</Col>



					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Name">
                    		Product Name* 
						</Label>
						<Controller
							control={control}
							id="Name"
							name="Name"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Name "
									invalid={
										errors.Name && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Name && (
                                    <FormFeedback>
                                       {errors.Name.message}
                                    </FormFeedback>
                                )}
					</Col>



					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Price">
                    		Product Price* 
						</Label>
						<Controller
							control={control}
							id="Price"
							name="Price"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder=" Price "
									type='number'
									invalid={
										errors.Price && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Price && (
                                    <FormFeedback>
                                       {errors.Price.message}
                                    </FormFeedback>
                                )}
					</Col>


					<Col xs={12} className="mb-1">
						<Label className="form-label" for="Details">
                    		Product Details* 
						</Label>
						<Controller
							control={control}
							id="Details"
							name="Details"
							render={({ field }) => (
								<Input
									type="textarea"
									maxLength={200}
									placeholder=" Details "
									invalid={
										errors.Details && true
									}
									{...field}
								/>
							)}
						/>
						 {errors && errors.Details && (
                                    <FormFeedback>
                                       {errors.Details.message}
                                    </FormFeedback>
                                )}
					</Col>


					<Col xs={12} className="mb-1">
                                    <Label
                                        className="form-div mr-2"
                                        for="Image *"
                                    >
                                        Product Image *
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
                                        {Image.preview ? (
                                            <img
                                                style={{
                                                    width: 'inherit',
                                                    height: '50px'
                                                }}
                                                src={ Image.preview }
                                            />
                                            ) : (
                                            <>
                                            <img
                                            src={ Image ? Image : AltImage }
                                            
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
		setSelectBrandOptions('');
		setSelectCategoryOptions('');
		setShow(false);
		
	
	};
    const getAllFunction = () => {

		axios.get('http://localhost:5000/Admin/Products/getall').then((res) => {
				setData(res.data.List);
				
                console.log(">>>>>>>>> get all Product",res.data);
		});


		axios.get('http://localhost:5000/Admin/Category/getall').then((res) => {
				// setData(res.data.List);
				setCategoryName( res.data.List && res.data.List)
                console.log(">>>>>>>>>>>> get all Category",res.data.List);
		});


		axios.get('http://localhost:5000/Admin/Brand/getall').then((res) => {
				// setData(res.data.List);
				setBrandName( res.data.List && res.data.List)
                console.log(">>>>>>>>>>>>>>>>>>>>>>>> get all Brand",res.data.List);
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