import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: 'Authentication Required'
      })
    }
    
    let token = authHeader
    if (authHeader.startsWith('Bearer ') || authHeader.startsWith('bearer ')) {
      token = authHeader.split(' ')[1]
    }
    token = token.replace(/^["']|["']$/g, '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: 'Invalid or expired Token'
    })
  }
}
