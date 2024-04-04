const { genSalt } = require("bcryptjs");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, userExist.password);

    if (validPassword) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password " });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error` });
  }
};

const SignUp = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(201).json({
      msg: `User has been created`,
      token: await userCreated.generateToken(),
      id: userCreated._id,
    });
  } catch (error) {
    res.status(500).json({ message: `Error in Signup controller ${error}` });
  }
};

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.send({
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in userDetails controller ${error}` });
  }
};

module.exports = { login, SignUp, userDetails };
