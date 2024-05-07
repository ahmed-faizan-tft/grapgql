import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

module.exports = async ({ req, res }) => {
    return {
        req,
        res, 
        pubsub
    }
}