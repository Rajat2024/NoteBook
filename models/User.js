const mongoose= require('mongoose') ;
const { Schema } = mongoose; // to make schema we import schema module from mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }

});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
}
// here user is the name of collection in database
// userSchema is the schema of the collection 
module.exports=  mongoose.model('user', userSchema)
