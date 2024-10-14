const express = require("express");
const router = express.Router();

const {signup}=require('../controllers/signup');
const {login}=require('../controllers/login');
const {foodData}=require("../controllers/foodData");
const {order}=require("../controllers/order");
const {myOrder} = require('../controllers/myorder');
const {auth}=require("../middleware/auth");

router.post("/createuser",signup);
router.post("/login",login);
router.get("/foodData",foodData);
router.post("/order",auth,order);
router.post("/myOrder",auth,myOrder);

module.exports = router;