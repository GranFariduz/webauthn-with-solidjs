const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(500).json({ success: false, message: 'Token not present' })
  }

  token = token.split(' ')[1]
  try {
    const decodedData = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = decodedData

    next()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = {
  checkToken
}
