import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';
import admin  from 'firebase-admin';
import fs from 'fs';

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();

app.use(express.json()); // if app sees a request, it should add it to request.body

let db;

async function connectToDB() {
    // connect to mongodb
    const uri = !process.env.MONGODB_USERNAME 
    ? 'mongodb://127.0.0.1:27017' // local
    : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DB_NAME}/?retryWrites=true&w=majority&appName=Cluster0`; // production

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = client.db('full-stack-react-db');
}

app.use(express.static(path.join(__dirname, '../dist')))

// anything that doesn't start with api
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// will be able to load data for a specific article
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({name});

    res.json(article);
});

// middleware callback; protect other endpoints/functionality from non logged-in users
app.use(async function(req, res, next) {
    const {authtoken} = req.headers;

    if(authtoken) {
        const user = await admin.auth().verifyIdToken(authtoken); // check and make sure it's valid and user is found
        req.user = user;
        next(); // only do this if there is a token
    } else {
        res.sendStatus(400);
    }

});

app.post('/api/articles/:name/upvote', async function(req, res) {
    const { name } = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({ name });

    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
        const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
            $inc:  { upvotes: 1 }, // $inc ..=> increments the property in table by designated amount to increment by
            $push: { upvoteIds: uid },
        }, {
            returnDocument: "after",
        });

        res.json(updatedArticle);
    } else {
        res.sendStatus(403);
    }

});

app.post('/api/articles/:name/comments', async (req, res) => {
    const name = req.params.name;
    const { postedBy, text } = req.body; // will look for the fields postedBy and text in the request body
    const newComment = {postedBy, text}

    const updatedArticle = await db.collection('articles').findOneAndUpdate({name}, {
        $push: { comments: newComment } // add comment to comments array
    }, {
        returnDocument: "after",
    });

    res.json(updatedArticle);
});

const PORT = process.env.PORT || 8000;

async function start() {
    await connectToDB();
    
    app.listen(PORT, function() {
        console.log("Server is listening on port " + PORT);
    });
}

start();
