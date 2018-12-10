const Post = require(global.appRoot + '/Models/Post');

const Controllers = {
    getAllPosts: (req, res, next) => {

        Post.find({/* No Special Filter */}, ['title', 'smallDesc', 'body', 'status', 'cover', 'createdAt', 'id'], { sort:{
            createdAt: -1 //Sort by Date Added DESC
        }}, (err, posts) => {
            if (err) {
                return res.status(500).json({
                    err
                });
            }
            return res.status(200).json(
                posts
            );
        });

    },

    getPostById: (req, res) => {
        if( req.params.post_id && Number.isInteger(Number(req.params.post_id))) {
            Post.findOne({
                id: req.params.post_id
            }, (err, post) => {
                if (err) return res.status(500).json({ err });
                return res.status(200).json( post );
            });
        }else {
            return res.status(500).json({
                message: 'oops'
            });
        }
    },

    createPost: (req, res) => {
        
        if (req && req.body &&
            req.body.post_title &&
            req.body.post_desc &&
            req.body.post_cover &&
            req.body.post_content &&
            !isNaN(Number(req.body.post_status))
        ) {
            console.log(req.body);
            Post.countDocuments((err, count) => {
                let post = new Post({
                    id: count,
                    title: req.body.post_title,
                    smallDesc: req.body.post_desc,
                    cover: req.body.post_cover,
                    body: req.body.post_content,
                    createdAt: Date.now(),
                    status: Number(req.body.post_status)
                });
                post.save(err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            err
                        });
                    }
                    return res.status(200).json({
                        message: `Bravo, le post: ${post.title}, est maintenant stockée en base de données`
                    });
                });
            });
        } else {
            return res.status(403).json({
                message: 'Requête Invalide',
                err: req.body,
            });
        }
    },

    updatePost: (req, res) => {
        if (req && req.body &&
            req.body.post_title &&
            req.body.post_desc &&
            req.body.post_cover &&
            req.body.post_content &&
            !isNaN(Number(req.body.post_status))
        ) {
        // On commence par rechercher le post souhaitée
            Post.findOneAndUpdate({
                id: req.params.post_id.toLowerCase()
            }, {
                title: req.body.post_title,
                smallDesc: req.body.post_desc,
                cover: req.body.post_cover,
                body: req.body.post_content,
                status: Number(req.body.post_status)
            }, (err, post) => {
                console.log(post);
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        err
                    });
                }
                // Si tout est ok
                return res.status(200).json({
                    message: `Bravo, mise à jour du post ${post.title} OK`
                });
            });
        } else {
            return res.status(403).json({
                message: 'Requête Invalide',
                err: req.body,
            });
        }
    },

    deletePost: (req, res ) => {

        Post.remove({
            id: req.params.post_id.toLowerCase()
        }, (err, post) => {
            console.log(post);
            if (err) {
                return res.status(500).json({
                    err
                });
            }
            return res.status(200).json({
                message: 'Bravo, post supprimé'
            });
        });

    }
};
module.exports = (function () {
    return Controllers;
})();