const express = require("express");
var methodOverride = require('method-override')

const dotenv= require('dotenv').config();

const app = express();
const port = dotenv.parsed.PORT;
const database = require('./config/database');
const systemConfig = require('./config/system.js')
database.connect(dotenv.parsed.MONGO_URL);
const routersClient = require("./routes/client/index.route");
const routeDashboard  = require('./routes/admin/index.route')
var bodyParser = require('body-parser')

// flash
var flash = require('express-flash');
var session = require('express-session')
var cookieParser = require('cookie-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`))
// override with POST having ?_method={PATCH,DELETE,..}
app.use(methodOverride('_method'))
// App local varible
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Express-flash

app.use(cookieParser('SADSD'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// Express-flash


// Routes
routersClient(app);
routeDashboard(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
