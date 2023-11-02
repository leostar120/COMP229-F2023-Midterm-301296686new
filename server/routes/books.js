// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, Book) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/list', { title: 'Books',  books: Book });
    }
  });

});

//  GET Route for displaying the Add page- CREATE Operation
router.get('/add', (req, res, next) => {
  res.render('books/add', {  title: 'Add Book'});

});

// POST Route for processingthe Add page - CREATE Operations
router.post('/add', (req, res, next) => {
  let newBook = Book({
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  });

  Book.create(newBook, (err, Book) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      // refresh the book list
      res.redirect('/book-list');
    }
  });
});

//  GET Route for displaying the Edit page- UPDATE Operation
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, bookToEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      // show the dit view
      res.render('/books/edit', {title: 'Edit Book', book: bookToEdit});
    }
  });

 
});
// POST Route for processingthe Edit page - UPDATE Operation
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id
  let updatedBook = Book ({
    "_id": id,
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  });

  Book.updateOne({_id: id}, updatedBook, (err) => {
    if(err)
    {
      console.log(err);
      res.render(err);
    }
    else
    {
      // refresh the book list
      res.redirect('/books/list');
    }
  });
});

// GET to perform Book Deletion - DELETE Operation
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Book.remove({_id: id}, (err) => {
    if(err)
    {
      console.log(er);
      res.end(err);
    }
    else
    {
      // refresh the book list
      res.redirect('/books/list');
    }
  });
 
});

module.exports = router;
