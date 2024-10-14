import React, { useContext, useEffect } from 'react'
import Navbar from "../components/Navebar"
import { AppContext } from "../context/appContext"
import Spinner from '../components/loader'
import Cards from '../components/cards'
import Footer from '../components/footer'
export default function Home() {

    useEffect(() => {
        loadFoodItems()
    }, [])


    const { loadFoodItems, setSearch, search, loader } = useContext(AppContext);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                    <div className="carousel-inner " id='carousel'>
                        <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                            </div>
                        </div>
                        <div className="carousel-item active" >
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9XhEX6CpPioaSgbk0F3qIKzUFi6WUBhplmw&s" className="d-block w-100  " style={{ filter: "brightness(30%)", height:"50vh"}} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://assets.cntraveller.in/photos/60f6d111a77bf98b83f5364c/16:9/w_1920,h_1080,c_limit/Ahmedabad%20Food%20Guide.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)",height:"50vh" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i0.wp.com/www.drdavidludwig.com/wp-content/uploads/2017/01/1-RIS_6IbCLYv1X3bzYW1lmA.jpeg?fit=800%2C552&ssl=1" className="d-block w-100 " style={{ filter: "brightness(30%)", height:"50vh" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'> {/* boootstrap is mobile first */}
                {
                    loader ?
                        (<Spinner />) : (<Cards />)
                }
            </div>
            <Footer />
        </div>
    )
}