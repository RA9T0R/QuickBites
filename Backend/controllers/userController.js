import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import staffModel from "../models/staffModel.js";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}


//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message})
    }
}

export { adminLogin };

//Route for staff login
const staffLogin = async (req, res) => {
    try {
        
        const {name,email,password} = req.body;

        const exists = await staffModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"Staff already exists"})
        }
        if (!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.lenght < 8){
            return res.json({success:false, message:"Please enter a strong password"})


        }

        //hatching password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newStaff = new staffModel({
            name,
            email,
            password: hashedPassword
        })

        const staff = await newStaff.save()

        const token = createToken(staff._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export { staffLogin };

const customerLogin = async (req, res) => {
    res.json({ msg: "customer login route" });
}

export { customerLogin };