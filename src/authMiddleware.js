const authenticate = require('./endpoints/auth/authenticate')

module.exports = (req, res, next) => {
  try {
    if (req.path === '/api/login') {
      return next()
    }
    authenticate.isLoggedIn(req).then(user => {
      if (user) {
        // Stores user in the request to use it from anywhere in the code using req.user.
        req.user = user
        next()
      } else {
        res.status(401).json({
          message: 'Unauthorized',
          error: 'Unauthorized'
        })
      }
    }
    )
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    })
  }
}
