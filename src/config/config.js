const {connect} = require('mongoose');
const MongoStore = require('connect-mongo');

const url="mongodb+srv://rodcerflo:K03QGaME93yhiB7B@coder.ctilfrd.mongodb.net/test"

const config ={

    connectDB: async()=>{
        try {
           await connect(url) 
           console.log('Base conectada')
        } catch (error) {
            console.log(error)
        }
    }
   
}




module.exports={
    config,
   
}