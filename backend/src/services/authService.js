import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
// * Register User Functionality
export const registerUser = async ({ name, email, password, role, phone }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User Already Registered')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    phone
  })
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}
// * Login User Functionality
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid Email and Password')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid Email and Password')
  }
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      userRole: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  )
  const userObject = user.toObject()
  delete userObject.password
  return {
    user: userObject,
    token
  }
}
