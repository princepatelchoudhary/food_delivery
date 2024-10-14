import { createContext, useState } from "react";
export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')
    const [loader,setLoader] = useState(true)
    const [cart,setCart] = useState([]);
    

    const loadFoodItems = async () => {
        let response = await fetch("http://localhost:3000/api/v1/foodData");
        response = await response.json();
        console.log(response);
        setFoodItems(response.data)
        setFoodCat(response.catData)
        if(response.success)
            setLoader(false);
    }

    const value = {
        foodCat,
        foodItems,
        search,
        setSearch,
        loadFoodItems,
        loader,
        cart,
        setCart
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export default AppContextProvider;