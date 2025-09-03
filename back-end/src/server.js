import express from 'express';

const app = express();

app.use(express.json()); // if app sees a request, it should add it to request.body

app.get('/hello', function(req, res) {
    res.send('Hello from a GET endpoint!');
});

app.post('/hello', function(req, res) {
    res.send('Hello, ' + req.body.name + ' from a POST endpoint')
});

app.listen(8000, function() {
    console.log("Server is listening on port 8000");
});