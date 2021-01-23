const Sequelize = require('sequelize');

const sequelize = new Sequelize('workout-log', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
    .authenticate()
    .then(() => {
        console.log("connection has been established successfully.")
    })
    .catch((err)=> {
        console.error("unable to connect to the databases:", err);
    });

module.exports = sequelize;