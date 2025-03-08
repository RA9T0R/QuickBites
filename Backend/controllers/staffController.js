import {v2 as cloudinary} from 'cloudinary'
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import staffModel from "../models/staffModel.js";


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (email === process.env.ADMIN_EMAIL) {
        if (password === process.env.ADMIN_PASSWORD) {
          const token = jwt.sign(email + password, process.env.JWT_SECRET);
          return res.json({ success: true, token, role: "admin" });
        } else {
          return res.json({ success: false, message: "Invalid admin credentials" });
        }
      }
  
      const staff = await staffModel.findOne({ email });
      if (!staff) {
        return res.json({ success: false, message: "Staff doesn't exist" });
      }
  
      const isMatch = await bcrypt.compare(password, staff.password);
      if (isMatch) {
        const token = createToken(staff._id);
        return res.json({ success: true, token, role: "staff",id: staff._id});
      } else {
        return res.json({ success: false, message: "Invalid staff credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error.message });
    }
  };

const registerStaff = async (req, res) => {
    try {
        const { firstName,lastName, email, password,phone,address } = req.body;
        const profilePic = req.files.profilePic && req.files.profilePic[0];

        const exists = await staffModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "Staff already exists" });
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Please enter a valid email" });
        const phoneExists = await staffModel.findOne({ phone });
        if (phoneExists) return res.json({ success: false, message: "Phone number already registered" });
        if (!/^\d{10,15}$/.test(phone)) return res.json({ success: false, message: "Invalid phone number format (must be 10-15 digits)" });
        if (password.length < 8) return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });

        let profilePicUrl = "";
        if (profilePic !== undefined) {
            try {
                let result = await cloudinary.uploader.upload(profilePic.path, { resource_type: "image" });
                profilePicUrl = result.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.json({ success: false, message: "Error uploading profile picture" });
            }
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStaff = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            profilePic: profilePicUrl || "",
            address: address || ""
        };
        const staff = new staffModel(newStaff);
        await staff.save();

        res.json({success: true,message: "Staff registered successfully",});
    } catch (error) {
        console.error("Registration Error:", error);
        res.json({ success: false, message: "Server error, please try again." });
    }
};

const updateStaff = async (req, res) => {
    try {
        const {staffId, firstName,lastName, email, password, phone,address } = req.body;
        const profilePic = req.files.profilePic && req.files.profilePic[0]; 

        const staff = await staffModel.findById(staffId);
        if (!staff) return res.json({ success: false, message: "Staff not found" });

        if (email && email !== staff.email) {
            const emailExists = await staffModel.findOne({ email });
            if (emailExists) return res.json({ success: false, message: "Email already registered" });
            if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email format" });
        }

        if (phone && phone !== staff.phone) {
            const phoneExists = await staffModel.findOne({ phone });
            if (phoneExists) return res.json({ success: false, message: "Phone number already registered" });
            if (!/^\d{10,15}$/.test(phone)) return res.json({ success: false, message: "Invalid phone number format (must be 10-15 digits)" });
        }

        let hashedPassword = staff.password;
        if (password) {
            if (password.length < 8) return res.json({ success: false, message: "Password must be at least 8 characters" });
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        let profilePicUrl = staff.profilePic;
        if (profilePic) {
            try {
                const result = await cloudinary.uploader.upload(profilePic.path, { resource_type: "image" });
                profilePicUrl = result.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.json({ success: false, message: "Error uploading profile picture" });
            }
        }

        const updatedStaff = {
            firstName: firstName || staff.firstName,
            lastName : lastName || staff.lastName,
            email: email || staff.email,
            phone: phone || staff.phone,
            password: hashedPassword,
            profilePic: profilePicUrl,
            address: address || staff.address
        }

        const staffUpdate = await staffModel.findByIdAndUpdate(staffId, updatedStaff, { new: true });
        if (!staffUpdate) return res.json({ success: false, message: "Error updating staff" });

        res.json({success: true,message: "Staff updated successfully",updatedStaff});
    } catch (error) {
        console.error("Edit Staff Error:", error);
        res.json({ success: false, message: "Server error, please try again." });
    }
};

const removeStaff = async (req, res) => {
    try {
        await staffModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Staff removed successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const listStaff = async (req, res) => {
    try{ 
        const staff = await staffModel.find({});
        res.json({success:true,staff})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const singleStaff = async (req,res) => {
    try {
        const {staffId} = req.body
        const staff = await staffModel.findById(staffId)
        res.json({success:true,staff})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {registerStaff,login,updateStaff,removeStaff,singleStaff,listStaff};