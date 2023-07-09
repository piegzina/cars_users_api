const express = require('express');
const {carRouter} = require("./routes/carRouter");
const { userRoutes } = require('./routes/userRoutes');
const { errorHandler } = require("./middleware/errorhandler");
const {connectDb} = require("./config/dbConnections");
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/cars', carRouter);
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, 'localhost', () => {
    console.log(`Listening on port http://localhost:${port}`);
});