const mongoose = require("mongoose");

const shoppingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        online: { 
            like: {type: 'boolean', require: true}
        },
        offline: { 
            like: {type: 'boolean', require: true}
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Shopping", shoppingSchema);
