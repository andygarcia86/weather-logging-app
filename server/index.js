const config = require('./config/config.js');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { mongoose } = require('./database')//import

//Settings
app.set('port', process.env.PORT || global.gConfig.node_port);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: global.gConfig.allow_cors }));

//Routes
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));
app.use('/api', require('./routes/temperature.routes'));

//Starting server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});
