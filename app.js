// Dependencies
require('dotenv').config();
require('express-async-errors');

// Express app
const express = require('express');
const app = express();

// DB
const connectDB = require('./db/connect');

// Rest of the packages
const cookieParser = require('cookie-parser');
const {limitUserRequests} = require('./utils');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const reviewRouter = require('./routes/review');

// Middlewares
const {errorHandler} = require('./middlewares/errorHandler');

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.set('trust proxy', 1);
app.use(limitUserRequests);

app.use(express.json());
app.use(errorHandler);
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/review', reviewRouter);

const port = process.env.PORT || 4000;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Database is up and running`);
        app.listen(port, ()=>{
            console.log(`Backend server is listening on Port: ${port}`);
        })
    } catch (error) {
        console.log(`Error starting database: ${error}`);
    }
};

start();