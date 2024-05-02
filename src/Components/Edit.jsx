import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // useNavigate for
import { editCustomer, getUser } from '../Service/Api' // Import two functions which I create for edit
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set initial values
const initialValues = {
    name: '',
    email: '',
    phone: '',
    city: '',
    state: "",
    carname: ""
}

const Edit = () => {

    const [customer, setCustomer] = useState(initialValues) // Make usestate on initialValues
    const [error, setError] = useState({}) // Make usestate for error message
    const [loading, setLoading] = useState(false); // Usestate for Loading
    const navigate = useNavigate() // Make navigate to another page.

    const { id } = useParams()// Create use params

    // Create a Validation function which is to make validation on form field
    const validation = () => {

        let error = {} // I take error a blank object 

        // If name is not present
        if (!customer.name) {
            error.name = "Name is Required"
        } else if (customer.name.length < 3) {
            error.name = "Name must be atleast 3 characters"
        }

        // If email is not present
        if (!customer.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(customer.email)
        ) {
            error.email = "Enter a valid Email"
        }

        // If phone is not present
        if (!customer.phone) {
            error.phone = "Phone is Required"
        } else if (customer.phone.length !== 10) {
            error.phone = "Phone number must be 10 characters"
        }


        // If City is not present 
        if (!customer.city) {
            error.city = "City is Required"
        }

        // If state is not present 
        if (!customer.state) {
            error.state = "State is Required"
        }

        // If car is not present 
        if (!customer.carname) {
            error.carname = "Car is Required"
        }

        return error
    }

    // Make handle for changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });

        // In handle I set required field for all form field with name attribute   
        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "@Name is Required" })
                setCustomer({ ...customer, name: "" })
            } else {
                setError({ ...error, name: "" })
                setCustomer({ ...customer, name: value })
            }
        }

        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "@Email is Required" })
                setCustomer({ ...customer, email: "" })
            } else {
                setError({ ...error, email: "" })
                setCustomer({ ...customer, email: value })
            }
        }

        if (name === "phone") {
            if (value.length === 0) {
                setError({ ...error, phone: "@Phone is Required" })
                setCustomer({ ...customer, phone: "" })
            } else {
                setError({ ...error, phone: "" })
                setCustomer({ ...customer, phone: value })
            }
        }

        if (name === "city") {
            if (value.length === 0) {
                setError({ ...error, city: "@City is Required" })
                setCustomer({ ...customer, city: "" })
            } else {
                setError({ ...error, city: "" })
                setCustomer({ ...customer, city: value })
            }
        }



        if (name === "state") {
            if (value.length === 0) {
                setError({ ...error, state: "@State is Required" })
                setCustomer({ ...customer, state: "" })
            } else {
                setError({ ...error, state: "" })
                setCustomer({ ...customer, state: value })
            }
        }

        if (name === "carname") {
            if (value.length === 0) {
                setError({ ...error, carname: "@Carname is Required" })
                setCustomer({ ...customer, carname: "" })
            } else {
                setError({ ...error, carname: "" })
                setCustomer({ ...customer, carname: value })
            }
        }


    };

    const getData = async () => {
        let response = await getUser(id) // call getUser function
        setCustomer(response.data)
        console.log(response);
    }

    useEffect(() => {
        getData()
    }, [])


    // Make handle for submit
    const handleSubmit = async (e) => {

        e.preventDefault(); // For to change page without loading

        setLoading(true) // After clicking submit button Loading will be start

        let ErrorList = validation() // Call validation function in ErrorList variable 
        setError(validation())

        if (Object.keys(ErrorList).length === 0) {

            let reg = {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                city: customer.city,
                state: customer.state,
                carname: customer.carname
            }
            console.log(reg)

        }

    }

    // This function is make to click on edit button
    const handleOnClick = async () => {
        let ErrorList = validation()
        setError(validation())
        // This is make for use validation
        if (Object.keys(ErrorList).length === 0) {
            await editCustomer(customer, id) // call editStudent function 
                .then((response) => {
                    console.log(response);
                    toast.success("Customer edited successfully");

                    setTimeout(() => {
                        setLoading(false);
                        navigate('/allcustomer')
                    }, 2000);

                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Customer is not edit");
                    setLoading(false);
                })
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }

    }


    return (
        <>
            <ToastContainer />

            {/* <!-- Page Header Start --> */}
            <div class="container-fluid page-header mb-5 p-0" style={{ backgroundImage: 'url(img/carousel-bg-1.jpg)' }}>
                <div class="container-fluid page-header-inner py-5">
                    <div class="container text-center">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">Book Your Car</h1>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

            {/* <!-- Contact Start --> */}
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 class="text-primary text-uppercase">// Book Now //</h6>
                        <h1 class="mb-5">Fillup this Form</h1>
                    </div>
                    <div class="row g-4">
                        <div class="col-12">

                        </div>
                        <div class="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                            <iframe class="position-relative rounded w-100 h-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                                frameborder="0" style={{ minHeight: '350px', border: '0' }} allowfullscreen="" aria-hidden="false"
                                tabindex="0"></iframe>
                        </div>
                        <div class="col-md-6">
                            <div class="wow fadeInUp" data-wow-delay="0.2s">
                                <form method='post' onSubmit={handleSubmit}>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="name" name='name' placeholder="Your Name" onChange={handleChange} value={customer.name} />
                                                <span style={{ color: 'red', display: 'block' }}> {error.name} </span>
                                                <label for="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input type="email" class="form-control" id="email" name='email' placeholder="Your Email" onChange={handleChange} value={customer.email} />
                                                <span style={{ color: 'red', display: 'block' }}> {error.email} </span>
                                                <label for="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="tel" class="form-control" id="subject" name='phone' placeholder="Phone" onChange={handleChange} value={customer.phone} />
                                                <span style={{ color: 'red', display: 'block' }}> {error.phone} </span>
                                                <label for="subject">Phone</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="subject" name='city' placeholder="City" onChange={handleChange} value={customer.city} />
                                                <span style={{ color: 'red', display: 'block' }}> {error.city} </span>
                                                <label for="subject">City</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="subject" name='state' placeholder="State" onChange={handleChange} value={customer.state} />
                                                <span style={{ color: 'red', display: 'block' }}> {error.state} </span>
                                                <label for="subject">State</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="subject" name='carname' placeholder="Name of your car" onChange={handleChange} value={customer.carname} />
                                                <span style={{ color: 'red', display: 'block' }}> {error.carname} </span>
                                                <label for="subject">Name of your car</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-primary w-100 py-3" type="submit" onClick={handleOnClick}>
                                                {loading ?
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    'Submit'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}
        </>
    )

};
export default Edit
