const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,userrole ,accessType} = req.body
  if (!name || !email || !password || !userrole) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    userrole,
    accessType,
    password: hashedPassword,

  })
console.log(user,"user");
let org=accessType? accessType:"ACCEPT"
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userrole:user.userrole,
      accessType:org,
      token: generateToken(user._id),
    })
    console.log("done");
  } else {
    res.status(400)
    console.log("fail");
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })
console.log(user);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userrole: user.userrole,
      accessType:user.accessType,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})
const getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
        res.status(200).json(users);
})
const deleteUser = async (request, response) => {
  try{
      await User.deleteOne({_id: request.params.id});
      response.status(201).json("User deleted Successfully");
  } catch (error){
      response.status(409).json({ message: error.message});     
  }
}
const getUserById = async (request, response) => {
  try{
      const user = await User.findById(request.params.id);
      response.status(200).json(user);
  }catch( error ){
      response.status(404).json({ message: error.message })
  }
}

// Save data of edited user in the database
const editUser = async (request, response) => {
  let user = request.body;

  const editUser = new User(user);
  try{
      await User.updateOne({_id: request.params.id}, editUser);
      response.status(201).json(editUser);
  } catch (error){
      response.status(409).json({ message: error.message});     
  }
}
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,getAll,
  deleteUser,getUserById,editUser
}
