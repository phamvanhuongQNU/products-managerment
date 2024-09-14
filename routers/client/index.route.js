
const routesProduct = require('./product.route') 
const routesHome = require('./home.route')
module.exports = (app)=>{
    app.use('/',routesHome);
    app.use('/products',routesProduct)
    
}