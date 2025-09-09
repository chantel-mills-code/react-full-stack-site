import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

// dummy db
const article_info = [
    { name: 'learn-node', upvotes: 0, comments: [] },
    { name: 'learn-react', upvotes: 0, comments: [] },
    { name: 'mongodb', upvotes: 0, comments: [] }
]

const app = express();

app.use(express.json()); // if app sees a request, it should add it to request.body

// will be able to load data for a specific article
app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    
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

    const db = client.db('full-stack-react-db');

    const article = await db.collection('articles').findOne({name});

    res.json(article);
});

app.post('/api/articles/:name/upvote', function(req, res) {
    const article = article_info.find(a => a.name === req.params.name);
    article.upvotes += 1;

    // res.send('Success! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes!');
    res.json(article);
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

////// examples for routing in express server
// app.get('/hello', function(req, res) {
//     res.send('Hello from a GET endpoint!');
// });

// app.get('/hello/:name', function(req, res) {
//     res.send('Hello, ' + req.params.name);
// })

// app.post('/hello', function(req, res) {
//     res.send('Hello, ' + req.body.name + ' from a POST endpoint')
// });

app.listen(8000, function() {
    console.log("Server is listening on port 8000");
});