const mongoose = require( 'mongoose' );

const postSchema = mongoose.Schema ({
    id: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    smallDesc: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        default: '',
        required: true
    },
    body: {
        type: String,
        default: '',
        required: true
    },
    createdAt: {
        type: Date,
        default: () => {
            let now = new Date;
            return now;
        },
        required: true
    },
    status: {
        type: Number,
        default: 0,
        required: true
    }
}); 



const Post = mongoose.model( 'Post', postSchema );


module.exports = Post;