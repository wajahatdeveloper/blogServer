const path = require('path')
const express = require('express')
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.router');
const blogRouter = require('./routes/blog.router');
const { checkForAuthenticationCookie } = require('./middlewares/checkTokenMiddleware');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogify')
    .then(() => console.log(`MongoDB connected`));

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(checkForAuthenticationCookie('token'));

app.get('/', (req,res) => {
    res.render('home', {
        user: req.user,
    });
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))