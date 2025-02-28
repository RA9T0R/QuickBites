import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import staffModel from "../models/staffModel.js";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // If the email matches the admin's email, process admin login
      if (email === process.env.ADMIN_EMAIL) {
        if (password === process.env.ADMIN_PASSWORD) {
          const token = jwt.sign(email + password, process.env.JWT_SECRET);
          return res.json({ success: true, token, role: "admin" });
        } else {
          return res.json({ success: false, message: "Invalid admin credentials" });
        }
      }
  
      // Otherwise, process staff login
      const staff = await staffModel.findOne({ email });
      if (!staff) {
        return res.json({ success: false, message: "Staff doesn't exist" });
      }
  
      const isMatch = await bcrypt.compare(password, staff.password);
      if (isMatch) {
        const token = createToken(staff._id);
        return res.json({ success: true, token, role: "staff" });
      } else {
        return res.json({ success: false, message: "Invalid staff credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  };
  


//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email,password} = req.body
        console.log(req.body)

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token,role:"admin"})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message})
    }
}

const loginStaff = async (req, res) => {
    try{
        const {email,password} = req.body;
        const staff = await staffModel.findOne({email});
        if (!staff){
            return res.json({success:false,message:"Staff doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,staff.password);
        if (isMatch){
            const token = createToken(staff._id)
            res.json({success:true,token,role:"staff"})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Route for register Staff
const registerStaff = async (req, res) => {
    try {
        
        const {name,email,password} = req.body;

        const exists = await staffModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"Staff already exists"})
        }
        if (!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.length < 8){
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

export {adminLogin,loginStaff,registerStaff,login};