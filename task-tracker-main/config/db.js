const mongoose = require('mongoose')
const db_connection = ()=>{
    mongoose.set("strictQuery",false);
    mongoose.connect(process.env.MONGODB_URI)
    .then(console.log("DB Connected successfully"))
    .catch((err)=>{
        console.error(err);
        process.exit(1);
    });
}

module.exports = db_connection;