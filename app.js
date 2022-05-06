const express = require('express');
const dbconnection = require('./dbconnection');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = process.env.port || 9000;

dbconnection.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    // start the Express server
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});


app.get('/', function (req, res) {
    console.log('Recieved request');
    res.send('Hello world');
});


app.get('/categories', function (req, res) {
    const db = dbconnection.getDb();
    console.log('Recieved request to get all categories');

    db
        .collection('categories')
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching categories!');
            } else {
                res.json(result);
            }
        });
});

app.get('/category/:id', function (req, res) {
    const requestId = req.params.id;
    console.log('Recieved request to get category with id ', requestId);
    const db = dbconnection.getDb();
    const categoryQuery = { _id: requestId };

    db.collection('categories')
        .findOne(categoryQuery, function (err, result) {
            if (err) {
                res.status(400).send('Error fetching category!');
            } else {
                console.log('Found category', result);
                res.json(result);
            }
        });

});

app.delete('/category/:id', function (req, res) {
    const requestId = req.params.id;
    console.log('Recieved request to delete category with id ', requestId);
    const db = dbconnection.getDb();
    const categoryQuery = { _id: requestId };

    db.collection('categories')
        .deleteOne(categoryQuery, function (err, result) {
            if (err) {
                res.status(400).send('Error fetching category!');
            } else {
                res.json(result);
            }
        });

});

app.post('/category', function (req, res) {
    console.log('Recieved request to add a new category', req);
    const category = {
        name: req.body.name,
        description: req.body.description
    };

    const db = dbconnection.getDb();
    db.
        collection('categories')
        .insertOne(category, function (err, result) {
            if (err) {
                res.status(400).send('Error adding a category!');
            } else {
                console.log(`Added a new match with id ${result.id}`);
                res.status(204).send();
            }
        });

});
