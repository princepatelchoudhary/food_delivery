const mongoose = require('mongoose')

exports.foodData = async (req, res) => {
    try{
        const fetch_data = mongoose.connection.db.collection("food");
        const data = await fetch_data.find().toArray();
        const categoryCollection = await mongoose.connection.db.collection("Categories");
        const catData = await categoryCollection.find().toArray();
        return res.status(200).json({
            success: true,
            message: "data featched",
            data,
            catData
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            err
        })
    }
}