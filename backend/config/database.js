const mongoose = require("mongoose");

require("dotenv").config();
console.log(process.env.DATABASE_URL)
const dbconnect = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.DATABASE_URL);
        
        console.log("Connected to database");

        // const fetch_data = mongoose.connection.db.collection("food");
        // const data = await fetch_data.find({}).toArray();
        // console.log(data);

    } catch (err) {
        console.error("Database connection error:", err);
    }
}
module.exports = dbconnect;