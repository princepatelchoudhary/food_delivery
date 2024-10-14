const express=require('express');
const app=express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const cors=require('cors');
app.use(cors({
    origin:"*"
}))

app.use(express.json());

const routes=require('./routes/routes');
app.use("/api/v1/",routes);

const dbConnect = require("./config/database");
dbConnect();

app.listen(3000, () => {
    console.log(`Server started successfully at 3000`);
});



// const fun= async ()=> {
//     const fetch_data = mongoose.connection.db.collection("food");
//         const data = await fetch_data.find({}).toArray();
//         console.log(data)
// }
// app.get("/getFoods", async(req,res)=>
// {
//     const fetch_data = mongoose.connection.db.collection("food");
//         const data = await fetch_data.find().toArray();
//         console.log(data);
//         return res.status(200).json({
//             success: true,
//             message: "data featched",
//             data
//         });
// });