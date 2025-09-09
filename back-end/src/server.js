import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';

// dummy db
const article_info = [
    { name: 'learn-node', upvotes: 0, comments: [] },
    { name: 'learn-react', upvotes: 0, comments: [] },
    { name: 'mongodb', upvotes: 0, comments: [] }
]

const app = express();

app.use(express.json()); // if app sees a request, it should add it to request.body

let db;

async function connectToDB() {
    // connect to mongodb
    const uri = 'mongodb://127.0.0.1:27017';

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

// will be able to load data for a specific article
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({name});

    res.json(article);
});

app.post('/api/articles/:name/upvote', async function(req, res) {
    const { name } = req.params;

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $inc:  { upvotes: 1 } // $inc ..=> increments the property in table by designated amount to increment by
    }, {
        returnDocument: "after",
    });

    res.json(updatedArticle);
});

app.post('/api/articles/:name/comments', (req, res) => {
    const name = req.params.name;
    const { postedBy, text } = req.body; // will look for the fields postedBy and text in the request body

    const article = article_info.find(a => a.name === name);

    article.comments.push({
        postedBy,
        text,
    });

    res.json(article); // sends back the updated article as a response
});

async function start() {
    await connectToDB();
    
    app.listen(8000, function() {
        console.log("Server is listening on port 8000");
    });
}

start();
