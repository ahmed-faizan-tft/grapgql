const UserApolloSchema = `
type User {
    _id: String!,
    name: String!,
    email: String!,
    age: Int!,
    bio: String!,
    shopping: [Shop]
}

type Shop {
    userId: String!
    online: Like!
    offline: Like!
}

type Like {
    like: Boolean!
}

type Query {
    getAllUsers: [User],
    getSingleUser(id: String!): User,
}

type Mutation{
    addUser(name: String!, email: String!, age: Int!, bio: String!): User,
    deleteUser(id: String!): User
    updateUser(id: String,name: String, email: String, age: Int, bio: String): User
}
`

module.exports ={
    UserApolloSchema
}