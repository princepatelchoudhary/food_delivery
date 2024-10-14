import React, { useState, useRef, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../context/appContext"

export default function Card(props) {

    const { cart, setCart } = useContext(AppContext);

    let navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("half")
    // const priceRef = useRef();
    
    let options = props.options;

    const [finalPrice,setFinalPrice] = useState(options.half)

    let priceOptions = Object.keys(options);
    let foodItem = props.item;
    
    const handleQty = (e) => {
        setQty(e.target.value);
        setFinalPrice(e.target.value*options[size]);
        console.log(finalPrice);
    }
    const handleOptions = (e) => {
        setSize(e.target.value);
        setFinalPrice(qty*options[e.target.value])
        console.log(finalPrice);
    }
    const handleAddToCart = async () => {
        if (!localStorage.getItem("token")) {
                navigate("/login")
                return;
            }
        let arr = cart;
        for (const item in arr) {
            if (arr[item].id == foodItem._id) {
                let food = arr[item];
                if (food.size === size) {
                    arr[item] = {
                        ...arr[item],
                        qty: parseInt(qty) + food.qty,
                        price: parseInt(finalPrice) + food.price
                    }
                    console.log(arr);
                    setCart(arr);
                    return;
                }
                break;
            }
        }
        {
            arr.push({
                id: foodItem._id, 
                name: foodItem.name, 
                price: parseInt(finalPrice), 
                qty: parseInt(qty), 
                size: size, 
                img: props.ImgSrc
            })
            console.log(arr);
            setCart(arr);
        }

    }

    return (
        < div >

            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    {/* <p className="card-text">This is some random text. This is description.</p> */}
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <select name='qty' value={qty} className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }}  onChange={handleQty}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>)
                            })}
                        </select>
                        <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }}   onChange={handleOptions}>
                            {priceOptions.map((i) => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </select>
                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
                    {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
                </div>
            </div>
        </div >
    )
}