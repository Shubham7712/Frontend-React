/*eslint-disable*/

import React, {Fragment, useState, useEffect, useRef} from 'react';
import {ChevronDown, Edit, Trash} from 'react-feather';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../api';
import axios from 'axios';
import Moment from 'react-moment';

import AltImage from '../Images/download.png';
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
import {toast} from 'react-toastify';
import {useHistory, Link} from 'react-router-dom';
import {useForm, Controller, set} from 'react-hook-form';
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

const MySwal = withReactContent(Swal);

const SignupSchema = yup.object().shape({
  Name: yup.string().required('Please enter name'),
  Code: yup.string().required('Please enter code '),
  Description: yup.string().required('Please enter description'),
  Discount: yup.string().required('Please enter Discount'),
  // MinCartValue: yup.string().required("Please enter minimun cart value "),
  // DiscountType: yup.string().required("Please enter Discount type "),

  Restriction: yup.string().required('Please enter restriction')
  // DiscountType : yup.string().required("Please select Discounty type ")
});
// custom header
const CustomHeader = ({setShow}) => {
  return (
    <>
      <Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-3">
        <Col>
          <h3>
            <b>Coupon</b>
          </h3>
        </Col>
        <Col>
          <p className="float-right" style={{justifyContent: 'end'}}>
            <Link to="/admin/dashboard">Dashboard</Link> / Coupon
          </p>
        </Col>
      </Row>
      <Row className="text-nowrap w-100 my-75 g-0 permission-header mt-2 mb-5">
        <Col></Col>
        <Col xs={5} lg={10}></Col>
        <Col></Col>
        <Col>
          <div className="mt-lg-0 mt-1">
            <Button
              className="add-permission mt-sm-0 mt-1"
              color="primary"
              onClick={() => setShow(true)}
            >
              Add Coupon
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

// custom search
const CustomSearch = ({setSearch, handlesearch}) => {
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
          <Button
            onClick={handlesearch}
            className="btn btn-light mr-5"
            title="search"
          >
            Search
          </Button>
        </Col>
      </Row>
      <br />
    </>
  );
};

export default function Employee() {
  const [discounttype, setDiscounttype] = useState([]);
  const [handlediscounttype, setHandlediscounttype] = useState('');

  const option = [
    {value: 'Amount', label: 'Amount'},
    {value: 'Percentage', label: 'Percentage'}
  ];

  // console.log(discounttype.value);

  const deleteData = (id) => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        api.get('Admin/Coupon/delete/' + id).then((res) => {
          console.log('delete res', res);
          if (res.data.status === true) {
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your record has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
            getAllFunction();
          } else {
            toast.error(<ErrorToast />, {
              hideProgressBar: true
            });
          }
        });
      }
    });
  };

  const SuccessToast = ({data, message}) => {
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

  const ErrorToast = ({message}) => {
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
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      Name: '',
      Code: '',
      Description: '',
      MinCartValue: '',
      DiscountType: '',
      ToDate: '',
      FromDate: '',
      Restriction: '',
      Discount: ''
    },
    resolver: yupResolver(SignupSchema)
  });

  // ** States
  const [show, setShow] = useState(false);
  const [InputFile, setInputFile] = useState('');

  const [Id, setId] = useState('');

  // handle search

  const [Search, setSearch] = useState('');

  const handlesearch = () => {
    console.log(`THIS IS REACH DATA>>>>>>>>>>> `, Search);

    let postData = {
      searchdata: Search
    };

    if (Search) {
      api.post('Admin/Coupon/getsearchdata', postData).then((res) => {
        console.log('Detected data>>>>>>>>>>>>>>>>>>>> ', res);

        let newData = res.data.coupon;

        let filterData = newData && newData.filter((Data) => Data.IsActive);
        setData(filterData);
      });
    } else {
      getAllFunction();
    }
  };

  const handleEditClick = (data) => {
    const id = data._id;
    setId(id);
    // console.log(data)
    console.log(data.DiscountType);
    setHandlediscounttype({
      value: data.DiscountType.value && data.DiscountType.value,
      label: data.DiscountType.value && data.DiscountType.lable
    });

    api.get('Admin/Coupon/find/' + id).then((res) => {
      setValue('Name', res.data.coupon.Name);
      // setValue('Name', res.data.coupon.Name);
      setValue('Code', res.data.coupon.CouponCode);
      setValue('Discount', res.data.coupon.Discount);
      setValue('Description', res.data.coupon.Description);
      setValue('MinCartValue', res.data.coupon.MinCartValue);
      setValue('DiscountType', res.data.coupon.DiscountType.value);
      setValue('ToDate', res.data.coupon.ToDate);
      setValue('FromDate', res.data.coupon.FromDate);
      setValue('Restriction', res.data.coupon.Restriction);

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
      Name: data.Name,
      CouponCode: data.Code,
      Description: data.Description,
      MinCartValue: data.MinCartValue,
      Discount: data.Discount,
      DiscountType: handlediscounttype,
      ToDate: data.ToDate,
      FromDate: data.FromDate,
      Restriction: data.Restriction,
      IsActive: true
    };
  
    if (!data.ToDate || !data.FromDate) {
      toast.error('Please select Date');
    } else if (data.FromDate < data.ToDate) {
      toast.error('From date should not less then to date');
    } else if (!handlediscounttype) {
      toast.error('Please select discount type');
    } else if (
      handlediscounttype.lable =='Percentage' &&
      data.Discount > 100
    ) {
      toast.error('Discount should not be greater than 100 in Percentage');
    } else {
      api.post('Admin/Coupon/create', postData).then((res) => {
        if (res.data.status == true) {
          setShow(false);
          setValue('Name', '');
          setValue('CouponCode', '');
          setValue('Description', '');
          setValue('MinCartValue', '');
          setValue('DiscountType', '');
          setValue('Discount', '');
          setValue('ToDate', '');
          setValue('FromDate', '');
          setValue('Restriction', '');
          setHandlediscounttype('');
          toast.success(
            <SuccessToast message={'Added Successfully'} data={data} />,
            {
              hideProgressBar: true
            }
          );
          console.log('submit', data);
          getAllFunction();
        } else {
          toast.error(<ErrorToast message={res.data.message} />, {
            hideProgressBar: true
          });
        }
      });
    }
  };

  const onEdit = (data) => {
    
console.log('first', data)
    

    let postData = {
      Name: data.Name,
      CouponCode: data.Code,
      Description: data.Description,
	  Discount:data.Discount,
      MinCartValue: data.MinCartValue,
      DiscountType: handlediscounttype,
      ToDate: data.ToDate,
      FromDate: data.FromDate,
      Restriction: data.Restriction,
      IsActive: true
    };
	
    if (!data.ToDate || !data.FromDate) {
      toast.error('Please select Date');
    } else if (data.FromDate < data.ToDate) {
      toast.error('From date should not less then to date');
    } else if (!handlediscounttype) {
      toast.error('Please select discount type');
    } else if (
      handlediscounttype.lable === 'Percentage' &&
      data.Discount > 100
    ) {
      toast.error('Discount should not be greater than 100 in Percentage');
    } else {
      api.post(`Admin/Coupon/update/` + Id, postData).then((res) => {
        if (res.data.status === true) {


			
          toast.success(<SuccessToast message={'Updated Successfully'} />, {
            hideProgressBar: true
          });

          setValue('Name', '');
          setValue('Code', '');
          setValue('Description', '');
          setValue('MinCartValue', '');
          setValue('DiscountType', '');
		  setValue('ToDate', '');
          setValue('FromDate', '');
          setValue('Restriction', '');
          getAllFunction();
          setDiscounttype('');
          setValue(data.Discount, '');
		  setValue(data.CouponCode,"");
        } else {
          toast.error(<ErrorToast message={'Something Went Wrong!'} />, {
            hideProgressBar: true
          });
        }
      });
      setShow(false);
    }
  };
  const updatedColumns = [
    {
      name: (
        <h5>
          <b>Name</b>
        </h5>
      ),
      sortable: true,
      minWidth: '100px',
      cell: ({Name}) => Name,
      selector: (row) => row.Name
    },

    {
      name: (
        <h5>
          <b>Coupon Code</b>
        </h5>
      ),
      sortable: true,
      minWidth: '80px',
      cell: ({CouponCode}) => CouponCode,
      selector: (row) => row.CouponCode
    },
    // {
    // 	name:<h5><b>DiscountType</b></h5>,
    // 	sortable: true,
    // 	minWidth: '100px',
    // 	cell: ({ DiscountType }) => DiscountType,
    // 	selector: (row) => row.DiscountType,

    // },

    {
      name: (
        <h5>
          <b>Discount</b>
        </h5>
      ),
      sortable: true,
      minWidth: '100px',
      cell: ({Discount}) => Discount,
      selector: (row) => row.Discount
    },
    {
      name: (
        <h5>
          <b>Description</b>
        </h5>
      ),
      sortable: true,
      minWidth: '100px',
      cell: ({Description}) => Description,
      selector: (row) => row.Description
    },

    {
      name: (
        <h5>
          <b>To Date</b>
        </h5>
      ),
      sortable: true,
      minWidth: '100px',
      cell: ({ToDate}) => <Moment format="DD/MM/YYYY">{ToDate}</Moment>,
      selector: (row) => row.ToDate
    },

    {
      name: (
        <h5>
          <b>From Date</b>
        </h5>
      ),
      sortable: true,
      minWidth: '100px',
      cell: ({FromDate}) => <Moment format="DD/MM/YYYY">{FromDate}</Moment>,
      selector: (row) => row.FromDate
    },

    {
      name: (
        <h5>
          <b>Restriction</b>
        </h5>
      ),
      sortable: true,
      minWidth: '100px',
      cell: ({Restriction}) => Restriction,
      selector: (row) => row.Restriction
    },

    {
      name: (
        <h5>
          {' '}
          <b> Actions </b>
        </h5>
      ),
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
              onClick={() => deleteData(row._id)}
            >
              <Trash className="font-medium-2" />
            </Button>
          </div>
        );
      }
    }
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
            <b> Add Coupon</b>
          </h5>
          <Col xs={12} className="mb-1">
            <Label className="form-label" for="Name">
              Name*
            </Label>
            <Controller
              control={control}
              id="Name"
              name="Name"
              render={({field}) => (
                <Input
                  maxLength={50}
                  placeholder=" Name "
                  invalid={errors.Name && true}
                  {...field}
                />
              )}
            />
            {errors && errors.Name && (
              <FormFeedback>{errors.Name.message}</FormFeedback>
            )}
          </Col>

          <Col xs={12} className="mb-1">
            <Label className="form-label" for="Code">
              Code*
            </Label>
            <Controller
              control={control}
              id="Code"
              name="Code"
              render={({field}) => (
                <Input
                  maxLength={50}
                  placeholder=" Code "
                  invalid={errors.Code && true}
                  {...field}
                />
              )}
            />
            {errors && errors.Code && (
              <FormFeedback>{errors.Code.message}</FormFeedback>
            )}
          </Col>

          <Col xs={12} className="mb-1">
            <Label className="form-label" for="Description">
              Description*
            </Label>
            <Controller
              control={control}
              id="Description"
              name="Description"
              render={({field}) => (
                <Input
                  maxLength={50}
                  placeholder=" Description "
                  invalid={errors.Description && true}
                  {...field}
                />
              )}
            />
            {errors && errors.Description && (
              <FormFeedback>{errors.Description.message}</FormFeedback>
            )}
          </Col>

          <Col xs={12} className="mb-1">
            <Label className="form-label" for="Discount">
              Discount*
            </Label>
            <Controller
              control={control}
              id="Discount"
              name="Discount"
              render={({field}) => (
                <Input
                  maxLength={50}
                  type="number"
                  placeholder=" Discount "
                  invalid={errors.Discount && true}
                  {...field}
                />
              )}
            />
            {errors && errors.Discount && (
              <FormFeedback>{errors.Discount.message}</FormFeedback>
            )}
          </Col>

          <Col xs={12} className="mb-1">
            <Label className="form-label" for="ToDate">
              To Date*
            </Label>

            <Controller
              control={control}
              id="ToDate"
              name="ToDate"
              render={({field}) => (
                <DatePicker
                  className="form-control"
                  // type='date'
                  selected={field.value}
                  minDate={new Date()}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="To Date"
                  invalid={errors.ToDate && true}
                  {...field}
                />
              )}
            />
            {errors && errors.ToDate && (
              <FormFeedback>{errors.ToDate.message}</FormFeedback>
            )}
          </Col>

          <Col xs={12} className="mb-1">
            <Label className="form-label" for="FromDate">
              From Date*
            </Label>
            <Controller
              control={control}
              id="FromDate"
              name="FromDate"
              render={({field}) => (
                <DatePicker
				// dateFormat="dd/MM/yyyy"
                  className="form-control"
                  // type='date'
                  selected={field.value}
                  minDate={new Date()}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="From Date"
                  invalid={errors.ToDate && true}
                  {...field}
                />
              )}
            />
            {errors && errors.FromDate && (
              <FormFeedback>{errors.FromDate.message}</FormFeedback>
            )}
          </Col>

          <Col xs={12} className="mb-1">
            <Label className="form-label" for="Restriction">
              Restriction*
            </Label>
            <Controller
              control={control}
              id="Restriction"
              name="Restriction"
              render={({field}) => (
                <Input
                  type="number"
                  maxLength={50}
                  placeholder=" Restriction "
                  invalid={errors.Restriction && true}
                  {...field}
                />
              )}
            />
            {errors && errors.Restriction && (
              <FormFeedback>{errors.Restriction.message}</FormFeedback>
            )}
          </Col>
          <Col>
            <Label className="form-label" for="DiscountType">
              Discount Type*
            </Label>
            <Controller
              control={control}
              id="DiscountType"
              name="DiscountType"
              render={({field}) => (
                <Select
                  name="Category"
                  id="Category"
                  value={handlediscounttype}
                  menuPlacement="auto"
                  className="react-select"
                  options={option}
                  onChange={(e) => setHandlediscounttype(e)}
                ></Select>
              )}
            />
            {errors && errors.DiscountType && (
              <FormFeedback>{errors.DiscountType.message}</FormFeedback>
            )}
          </Col>

          <Col
            xs={12}
            className="mt-2"
            style={{display: 'flex', justifyContent: 'end'}}
          >
            <Button className="mr-2" color="primary">
              Add
            </Button>
            <Button outline type="reset" onClick={handleDiscard}>
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
              <b> Edit Coupon</b>
            </h5>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="Name">
                Name*
              </Label>
              <Controller
                control={control}
                id="Name"
                name="Name"
                render={({field}) => (
                  <Input
                    maxLength={50}
                    placeholder=" Name "
                    invalid={errors.Name && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.Name && (
                <FormFeedback>{errors.Name.message}</FormFeedback>
              )}
            </Col>

            <Col xs={12} className="mb-1">
              <Label className="form-label" for="Code">
                Code*
              </Label>
              <Controller
                control={control}
                id="Code"
                name="Code"
                render={({field}) => (
                  <Input
                    maxLength={50}
                    placeholder=" Code "
                    invalid={errors.Code && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.Code && (
                <FormFeedback>{errors.Code.message}</FormFeedback>
              )}
            </Col>

            <Col xs={12} className="mb-1">
              <Label className="form-label" for="Description">
                Description*
              </Label>
              <Controller
                control={control}
                id="Description"
                name="Description"
                render={({field}) => (
                  <Input
                    maxLength={50}
                    placeholder=" Description "
                    invalid={errors.Description && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.Description && (
                <FormFeedback>{errors.Description.message}</FormFeedback>
              )}
            </Col>

            <Col xs={12} className="mb-1">
              <Label className="form-label" for="Discount">
                Discount*
              </Label>
              <Controller
                control={control}
                id="Discount"
                name="Discount"
                render={({field}) => (
                  <Input
                    maxLength={50}
                    type="number"
                    placeholder=" Discount "
                    invalid={errors.Discount && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.Discount && (
                <FormFeedback>{errors.Discount.message}</FormFeedback>
              )}
            </Col>
            {/* <Col xs={12} className="mb-1">
						<Label className="form-label" for="MinCartValue">
                            Minimum Cart Value* 
						</Label>
						<Controller
							control={control}
							id="MinCartValue"
							name="MinCartValue"
							render={({ field }) => (
								<Input
									maxLength={50}
									type="number"
									placeholder=" Minimum Cart Value "
									invalid={
										errors.MinCartValue && true
									}
									{...field}
								/>
							)}
						/> */}
            {/* {errors && errors.MinCartValue && (
                                    <FormFeedback>
                                       {errors.MinCartValue.message}
                                    </FormFeedback>
                                )}
					</Col> */}

            <Col xs={12} className="mb-1">
              <Label className="form-label" for="ToDate">
                To Date*
              </Label>
              <Controller
                control={control}
                id="ToDate"
                name="ToDate"
                render={({field}) => (
                  <DatePicker
                    className="form-control"
                    invalid={errors.ToDate && true}
					onChange={(date) => field.onChange(date)}
					// selected={field.value}


                    {...field}
                  />
                )}
              />
              {errors && errors.ToDate && (
                <FormFeedback>{errors.ToDate.message}</FormFeedback>
              )}
            </Col>

            <Col xs={12} className="mb-1">
              <Label className="form-label" for="FromDate">
                From Date*
              </Label>
              <Controller
                control={control}
                id="FromDate"
                name="FromDate"
                render={({field}) => (
                  <DatePicker
                    // type='date'
                    // maxLength={50}
                    className="form-control"
                    placeholderText="From Date"
                    invalid={errors.FromDate && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.FromDate && (
                <FormFeedback>{errors.FromDate.message}</FormFeedback>
              )}
            </Col>

            <Col xs={12} className="mb-1">
              <Label className="form-label" for="Restriction">
                Restriction*
              </Label>
              <Controller
                control={control}
                id="Restriction"
                name="Restriction"
                render={({field}) => (
                  <Input
                    maxLength={50}
                    placeholder=" Restriction "
                    invalid={errors.Restriction && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.Restriction && (
                <FormFeedback>{errors.Restriction.message}</FormFeedback>
              )}
            </Col>
            <Col>
              <Label className="form-label" for="DiscountType">
                DiscountType*
              </Label>
              <Controller
                control={control}
                id="DiscountType"
                name="DiscountType"
                render={({field}) => (
                  <Select
				  name="Category"
                  id="Category"
                  value={handlediscounttype}
                  menuPlacement="auto"
                  className="react-select"
                  options={option}
                  onChange={(e) => setHandlediscounttype(e)}
                  ></Select>
                )}
              />
              {errors && errors.DiscountType && (
                <FormFeedback>{errors.DiscountType.message}</FormFeedback>
              )}
            </Col>

            <Col
              xs={12}
              className="mt-2"
              style={{display: 'flex', justifyContent: 'end'}}
            >
              <Button className="mr-2" color="primary" type="submit">
                Update
              </Button>
              <Button outline type="reset" onClick={handleDiscard}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Fragment>
      );
    }
  };
  const [Data, setData] = useState([]);
  // const [date, setDate] = useState(new Date());
  // console.log('date->>>>>>>>>>>>>>>>>>>>>', date)
  const handleDiscard = () => {
    if (InputFile != '' && InputFile !== null) {
      setInputFile('');
    }
    setId('');
    reset();
    setShow(false);
  };
  const getAllFunction = () => {
    api.get('Admin/Coupon/getall').then((res) => {
      setData(res.data.List);
      console.log('get all Coupon>>>>>>>>>>>>>>', res.data.List);
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
            <ModalBody>{renderForm()}</ModalBody>
          </Modal>
        </Card>
      </Card>
    </Fragment>
  );
}
