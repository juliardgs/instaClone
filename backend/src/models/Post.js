const mongoose = require('mongoose');

//quais colunas estão disponíveis na tabela
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true, //add a data de criação e de update
});

module.exports = mongoose.model('Post', PostSchema);