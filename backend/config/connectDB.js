//method 1 not using it in this project i used the msecond method on teh server page

const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)

        console.log(`Mongo connected`)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB

