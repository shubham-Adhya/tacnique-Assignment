const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const { UserModel } = require("../model/user.model")

//@description   SignUp
//@route         POST /user/signup
//@access        User
const userSignUp = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: 'Missing required field'})
        }
        // Check if user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const hashed_password = bcrypt.hashSync(password, +process.env.SaltRounds);
        const user = new UserModel({ email, password: hashed_password, name});
        await user.save();

        return res.status(200).json({ message: 'User created successfully'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

//@description   Login
//@route         POST /user/login
//@access        User
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        

        return res.status(200).json({ message: "Login success", token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}


module.exports = { userLogin, userSignUp }