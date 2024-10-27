const routeDashboard = require('./dashboard.route');
const routeProducts = require('./products.route');
const sytemConfig = require('../../config/system')
module.exports = (app) =>{
    const PATH_ADMIN = sytemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard',routeDashboard);
    app.use(PATH_ADMIN + '/products',routeProducts);

}