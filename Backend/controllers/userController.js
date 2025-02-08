import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}


//Route for admin login
const adminLogin = async (req, res) => {
    res.json({ msg: "Admin login route" });
}

export { adminLogin };