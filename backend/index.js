const express=require('express');
const app =express();
require('./db/conn.js');
const {v4:uuidv4}=require('uuid');
const bcrypt=require('bcrypt');
const PORT=process.env.PORT || 8000
const User=require('./models/users.js');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const users = require('./models/users.js');
app.use(cors());
app.use(express.json());




app.get('/',(req,res)=>{
    res.send('Hello to my app');
})


app.post('/login',async(req,res)=>{
    const {email,password}=req.body; 
    try{
        const sanitizedEmail=email.toLowerCase();
        const existingUser=await User.findOne({email:sanitizedEmail})
        let correctPassword=false;
        if(existingUser){
            correctPassword=(await bcrypt.compare(password,existingUser.hashed_password));
        }
        if(correctPassword){
             const token=jwt.sign({user:existingUser,email:sanitizedEmail},'mykey',{expiresIn:60*24})
            res.status(201).json({token,userId:existingUser.user_id})
        }
        res.status(400).send('Invalid Credentials');

    }catch(e){
        console.log(e);
    }
})

app.post('/signup',async (req,res)=>{
    const {email,password}=req.body;
    const generatedUserId=uuidv4();
    const hashed_password=await bcrypt.hash(password,10);
    try{
        const sanitizedEmail=email.toLowerCase()
        const existingUser=await User.find({email:sanitizedEmail});
        ;
        if(existingUser.length>0){
            
            return res.status(409).send('User already exists, Please Login')
        }
        const newUser=new User({
            user_id:generatedUserId,
            email:sanitizedEmail,
            hashed_password,
        })

        const insertedUser=await newUser.save();



        const token=jwt.sign({insertedUser,sanitizedEmail},'mykey',{
            expiresIn:60*24,
        })
        res.status(201).json({token,userId:generatedUserId});



       
    }catch(e){
        console.log(e);
    }
})

app.get('/users',async (req,res)=>{
    try{
        const Users=await User.find();
        res.status(200).json(Users);
    }catch(e){
        res.status(404).json({message:e.message});
    }
})
app.get('/user',async (req,res)=>{
    const userId=req.query.userId;
    try{
        const user=await User.findOne({user_id:userId});
        res.status(200).json(user);
    }catch(e){
        res.status(404).json({message:e.message});
    }
})


app.put('/user',async(req,res)=>{
    const formData=req.body.formData;
    try{
        const query={user_id:formData.user_id};
        const updateDocument={
            $set:{
                first_name:formData.first_name,
                dob_day:formData.dob_day,
                dob_month:formData.dob_month,
                dob_year:formData.dob_year,
                show_gender:formData.show_gender,
                gender_identity:formData.gender_identity,
                gender_interest:formData.gender_interest,
                url:formData.url,
                about:formData.about,
                matches:formData.matches
            }
        }

        const insertedUser=await User.updateOne(query,updateDocument);
        res.status(200).send(insertedUser);

    }catch(e){
        console.log(e);
    }
})


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})