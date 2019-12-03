const http = require('http'),
    express = require('express'),
    app = express(),
    router = express.Router();

const auth = require('./middleware/auth'),
    login = require('./routes/login'),
    bookings = require('./routes/bookings');


console.log("NODE_ENV: " + process.env.NODE_ENV);

if(process.env.NODE_ENV == 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('./swagger.json');
     
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(express.json());
app.use(auth.auth);
app.use('/api/v1/jwt', login);
app.use('/api/v1/booking', bookings);

app.get('/', function(req, res){
   res.send("I'm alive!");
});

app.set('port', process.env.PORT);

var server = http.createServer(app);

server.listen(process.env.PORT, function() {
	console.log('Confi server listening on port ' + server.address().port);
});