var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String,
    blog: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
    }
});

module.exports = mongoose.model("Comment", commentSchema);