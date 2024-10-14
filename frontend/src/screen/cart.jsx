import React, { useContext } from 'react'
// import Delete from '@material-ui/icons/Delete'
import { AppContext } from "../context/appContext"

export default function Cart() {

    const { cart, setCart } = useContext(AppContext);

    let data = cart;
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const handleDelete = (e) => {
        let arr=data.filter((food)=>{
            return food.id!=e.id;
        })
        setCart(arr);
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        const orderData ={
            date: new Date().toDateString(),
            data:data
        }
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:3000/api/v1/order", {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({
                order_data: orderData,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log(data);
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            setCart([]);
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                {/* <td ><button type="button" className="btn p-0"><Delete onClick={() => { handleDelete(food.id) }} /></button> </td> */}
                                </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>
    )
}