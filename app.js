require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require('./db');
let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
app.use(express.json())
app.use('/test', function (req, res) {
    res.send('This is a message from the test endpoint on the server!');
});
app.use('/user', user)
app.use(require('./middleware/validatesession'));
app.use('/log', log)

app.listen(3000, function () {
    console.log("App is listening on port 3000")
});