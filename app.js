const express = require('express');
const Blog = require('./models/blog')
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://user1:test1234@nodeblogger.fjcy3du.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result)=> app.listen(3000))

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
app.use(express.static('styles'));
app.use(express.urlencoded( { extended: true } ))

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res)=>{
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   })

//   blog.save()
//     .then((result)=> {
//       res.send(result)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })
// })

// app.get('/all-blogs', (req,res)=> {
//   Blog.find()
//     .then((result)=>{
//       res.send(result)
//     })
//     .catch((err)=> {
//       console.log(err)
//     })
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById('63044cdab451a43e1d6870e5')
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });