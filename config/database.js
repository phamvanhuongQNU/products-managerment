const mongoose = require('mongoose');
module.exports.connect = async (MONGO_URL)=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("connect success")
    }catch(error){
        console.log("connect failed" + error)
    }
}
