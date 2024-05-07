const {ApolloServer} = require('@apollo/server');
const UserSchema = require('./db/user');
const { GraphQLError } = require('graphql');
const { UserApolloSchema } = require('./schema');
const queryResolver = require('./resolver/query');
const mutation = require('./resolver/mutation');

const apolloServer = new ApolloServer({
    typeDefs: UserApolloSchema,
    resolvers:{
        User: {
            shopping: queryResolver.getUserShopping,
        },
        Query:{
            getAllUsers: queryResolver.getAllUsers,
            getSingleUser: queryResolver.getSingleUser
        },
        Mutation: {
            addUser: mutation.addUser,
            updateUser: mutation.updateUser,
            deleteUser: mutation.deleteUser
        },
    },
    includeStacktraceInErrorResponses:false,
    formatError: (formattedError, error) => {
        console.log(formattedError);
        if(formattedError.extensions.code === "USER_EXISTENCE_ERROR"){
            return {message:"User alreadyexist"}
        }
        return formattedError;
    },
});


module.exports = apolloServer;