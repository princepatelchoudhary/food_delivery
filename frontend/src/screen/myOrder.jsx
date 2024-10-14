
import React, { useEffect, useState } from 'react'
import Footer from '../components/footer';
import Navbar from '../components/Navebar';

export default function MyOrder() {

    const [orderData, setorderData] = useState([])

    const token = localStorage.getItem('token')

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:3000/api/v1/myOrder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()

            // console.log(response);
            if (response.success)
                setorderData(response.orderData)
            console.log(response.orderData)
        })

    }

    useEffect(() => {
        fetchMyOrder()
    }, [])
    // console.log('p',orderData);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData != [] ? (orderData).reverse().map(order => {
                        return (
                            <div>
                                <div className='m-auto mt-5'>
                                    {order.date}
                                    <hr />
                                </div>
                                <div className=' row mb-3'>

                                    {(order.data).map((arrayData) => {
                                        return (

                                            <div className='col-12 col-md-6 col-lg-3' >
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{arrayData.qty}</span>
                                                            <span className='m-1'>{arrayData.size}</span>
                                                            {/* <span className='m-1'>{data}</span> */}
                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}
