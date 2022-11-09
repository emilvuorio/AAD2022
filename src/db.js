const mongoose = require('mongoose');

module.exports = {
connect: DB_HOST => {
    mongoose.connect('mongodb://localhost:27017/notedly');

},

close: () => {
    mongoose.connection.close();
}

};