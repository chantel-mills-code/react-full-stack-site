import express from 'express';

// dummy db
const article_info = [
    { name: 'learn-node', upvotes: 0 },
    { name: 'learn-react', upvotes: 0 },
    { name: 'mongodb', upvotes: 0 }
]

const app = express();

app.use(express.json()); // if app sees a request, it should add it to request.body

app.post('/api/articles/:name/upvote', function(req, res) {
    const article = article_info.find(a => a.name === req.params.name);
    article.upvotes += 1;

    res.send('Success! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes!');
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