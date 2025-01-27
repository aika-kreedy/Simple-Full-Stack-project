
//creatw server
const express = require("express");
const app = express();
const cors = require("cors")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const UserModel = require("./model/userModel");
const AdminModel = require("./model/adminModel");
const port = 3001;
app.use(express.json())
 app.use(cors());

 //create DataBase
 const password = process.env.PASSWORD,
 user = process.env.USERNAME,
 dbName = process.env.DATABASE_NAME;
 const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.gxt0q.mongodb.net/${dbName}?retryWrites=true&w=majority`)

 // get users
app.get("/users", async (req,res)=>{
   const user = await UserModel.find();
    res.json(user)
   })


//create  new user
app.post("/createUser", async (req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);  
 })
 //signup
 app.post('/signup', async (req, res) => {
    
        const { name, password } = req.body;
        const admin = await AdminModel.findOne({ name });

        if(admin) {return res.status(400).json({ message: "The user already exists" })};
        
        const hashedPassword = bcrypt.hashSync(password,10)
        const newAdmin = new AdminModel({ name, password:hashedPassword });
        await newAdmin.save();
        return res.status(201).json({ message: "User created successfully" });
    
});

//login
 app.post("/login",async(req,res)=>{
    const {name,password} = req.body;
    const admin = await AdminModel.findOne({ name });
   if(!admin) {return res.json(" the user not exists")}
   const isValid =  await bcrypt.compareSync(password,admin.password);
   if(!isValid){ return res.status(400).json(" the username or password not exists");}
   const token =jwt.sign({id:admin._id},process.env.SECRET);
    return res.json({token,id:admin._id});

 
 })



app.listen(port,()=>{ console.log(" server working good")})


