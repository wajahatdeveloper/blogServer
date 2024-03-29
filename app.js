require('dotenv').config();

const path = require('path');
const express = require('express');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog.model');

const userRouter = require('./routes/user.router');
const blogRouter = require('./routes/blog.router');
const { checkForAuthenticationCookie } = require('./middlewares/checkTokenMiddleware');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(`MongoDB connected`));

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(checkForAuthenticationCookie('token'));

app.get('/', async (req,res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))