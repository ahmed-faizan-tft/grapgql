const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: "string", require: true },
        email: { type: "string", require: true },
        age: { type: "number", require: true},
        bio: { type: "string", require: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("User", userSchema);
