import mongoose from 'mongoose';
import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


import http from 'http';

import { RootController } from './src/controller';
const {  ObjectId } = require('mongodb');

const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(RootController);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/Profile', express.static(path.join(__dirname, 'Profile')));
const upload1 = multer({ dest: 'Profile/' });


 
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, 'uploads/');

    },

    filename: function (req, file, cb) {

        cb(null, file.originalname);

    }
});
 
const upload = multer({ storage: storage });
 


const postSchema = new mongoose.Schema({

    file: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account'
    },

    likes: { type: Number, default: 0 },

    comments: [{ text: String ,user: String}],
});
 

const Post_Image = mongoose.model('Post_Image', postSchema);
 
app.use(bodyParser.json());

//create post
app.post('/api/v1/posts/:id', upload.single('file'), async (req, res) => {

    try {

        const creator = req.params.id;
        const file = req.file.filename;
        // console.log("file",file);

        const post = new Post_Image({file,creator });

        await post.save();
        //  console.log(post);
        res.status(201).send(post);

    } catch (error) {

        res.send("error");

    }
});

//get all posts
app.get('/api/v1/posts/:id', async (req, res) => {

    try {

         const id = req.params.id;
        const posts = await Post_Image.find({creator:id});
        // console.log("post",posts);
        res.send(posts);

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });

    }
});

//like post
app.post('/api/v1/posts/like/:postId', async (req, res) => {

    try {
         const postId = req.params.postId;
         const post = await Post_Image.findById(postId);
         post.likes += 1;
         await post.save();
         res.send(post);

    } catch (error) {
          res.send("error liking post ")

    }
});

//comment on post
app.post('/api/v1/posts/comment/:postId', async (req, res) => {

    try {
         const postId = req.params.postId;
        const { text ,user} = req.body;
        const post = await Post_Image.findById(postId);
         post.comments.push({ text,user });
          await post.save();
           res.send(post);

    } catch (error) {
        res.send({ error: 'Internal Server Error' });
    }
});
 






server.listen(PORT, () => {
  mongoose.connect('mongodb://127.0.0.1:27017/FriendSystem')
    .then(() => console.log('Connected!'))
    .catch((err) => { console.log(err); });
  console.log(`server is listing on port ${PORT}`);
});
