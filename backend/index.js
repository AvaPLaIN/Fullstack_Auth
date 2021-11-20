require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cors = require('cors');

connectDB();
const app = express();

//! IMPORT ROUTES
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/data');

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoute);
app.use('/api/data', dataRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8800;

const server = app.listen(PORT, () =>
  console.log(`Server running on Port: ${PORT}`)
);

process.on('unhandledRejection', (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
