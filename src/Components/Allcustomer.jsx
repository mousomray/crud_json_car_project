import React, { useEffect, useState } from 'react'
import { getCustomers } from '../Service/Api';
import { Link } from 'react-router-dom';
 import { deleteCustomer } from '../Service/Api'; // Import delete function

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allcustomer = () => {
    const [customer, setCustomer] = useState([]);


    const getdata = async () => {
        const response = await getCustomers() // Call function
        setCustomer(response.data)
    }

    useEffect(() => {
        getdata()
    }, [])

    // Create a function for delete
    const deleteData = async (id) => {
        await deleteCustomer(id)
        getdata()
        toast.success("Customer deleted successfully");
    }

    console.log('hd', customer);
    return (
        <>
            <ToastContainer />
            {/* <!-- Page Header Start --> */}
            <div class="container-fluid page-header mb-5 p-0" style={{ backgroundImage: 'url(img/carousel-bg-1.jpg)' }}>
                <div class="container-fluid page-header-inner py-5">
                    <div class="container text-center">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">All Customers</h1>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

            <div className="container-fluid mt-5">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Car</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                    </thead>

                    {customer?.slice(0,customer.length).reverse().map((value) => {
                        return (
                            <>
                                <tbody key={value.id}>

                                    <tr>

                                        <td>{value.name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone}</td>
                                        <td>{value.city}</td>
                                        <td>{value.state}</td>
                                        <td>{value.carname}</td>
                                        <td><Link to={`/edit/${value.id}`}><button type="button" class="btn btn-success">Edit</button></Link></td>
                                        <td><button type="button" class="btn btn-danger" onClick={() => deleteData(value.id)}>Delete</button></td>
                                    </tr>

                                </tbody>
                            </>
                        )
                    })}


                </table>

            </div>
        </>
    )
}

export default Allcustomer