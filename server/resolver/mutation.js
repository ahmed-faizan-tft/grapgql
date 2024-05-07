const UserSchema = require('./../db/user');

const mutation = {
    addUser: async (_,{name, email, age, bio})=>{
        const user = await UserSchema.findOne({email});
        if(!user){
            const newUser = await UserSchema.create({
                name,
                email,
                age,
                bio
            });
            return newUser
        }
        throw new GraphQLError("User already exist", {
            extensions: { code: 'USER_EXISTENCE_ERROR',http: {
                status: 404,
                headers: new Map([
                  ['some-header', 'it was bad'],
                  ['another-header', 'seriously'],
                ]),
    } },
        });
    },

    deleteUser: async (_, {id})=>{
        const user = await UserSchema.findById(id);
        if(user){
            const deleted = await UserSchema.deleteOne({_id:id});
            return user
        }
        return { name: '',email: '',age: 0,bio: ''}
    },

    updateUser: async (_, {id,name, email, age, bio})=>{
        const user = await UserSchema.findById(id);
        if(user){
            const updated = await UserSchema.updateOne({_id:id},{name:name,email:email,age:age,bio: bio});
            return user
        }
        return { name: '',email: '',age: 0,bio: ''}
    }
}

module.exports = mutation