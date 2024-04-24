import mongoose from "mongoose"

const accountSchema = new mongoose.Schema({
    email:String,
    mobileno:String,
    name:String,
    dob:String,
    username:String,
    password:String,
    status:String,
    privacy:String,
    bio:String,
    image:String,
    friend_id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Account"
    }],
    request_id:[{
        
        
        type: mongoose.Schema.Types.ObjectId,
        ref:"Account",
        // username:String
    
}],
   
});


const Account = mongoose.model('Account', accountSchema);

export default Account;

