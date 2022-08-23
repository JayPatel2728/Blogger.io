const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const dbURI = 'mongodb+srv://<username>:<password>@nodeblogger.fjcy3du.mongodb.net/?retryWrites=true&w=majority'
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
app.use('/blogs', blogRoutes)

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