const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema
    (
        {
            author_id: { type: Number, require: true },
            author_name: { type: String, require: true },
            age: { type: Number, require: true },
            address: { type: String, require: true },
        },
        { timestamps: true }

    );
module.exports = mongoose.model("Author", authorSchema)