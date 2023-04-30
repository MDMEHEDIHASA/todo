const notFound = (req,res,next)=>{
    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (error, _, res, next) => {
    // FIX: check for bad status codes, if it's a good status code then we want to send
    // a bad status code i.e. 2xx should not be sent as error response
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode
    console.log('error middleware')
  
    res.status(statusCode)
    res.json({
      message: error.message,
    })
  }
  
  module.exports = { notFound,errorHandler }
  