require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');

const configRoutes = require('./routes');
const app = express();
const PORT = 3100;

app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
configRoutes(app);

app.listen(PORT, (error) =>{
    if(!error)
        console.log(`Server listening on port ${PORT}`);
    else
        console.log(error);
});