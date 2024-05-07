const UserSchema = require('./../db/user');
const ShoppingSchema = require('./../db/shopping');

const getAllUsers = async (_,__, contextValue)=>{
    console.log("contextValue--",contextValue);
    const users = await UserSchema.find({})
    return users
}

const getSingleUser = async (_,{id})=>{
    const user = await UserSchema.findById(id);
    return user
}

const getUserShopping = async (user)=>{
    const shoppingData = await ShoppingSchema.find({userId: user._id})
    return shoppingData
}

module.exports = {
    getAllUsers,
    getUserShopping,
    getSingleUser
}