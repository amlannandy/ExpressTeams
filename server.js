const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const express = require('express');

const connectDatabase = require('./database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to MongoDB
connectDatabase();

const app = express();

// Body parser
app.use(express.json());

// Import route files
const auth = require('./routes/auth');

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Mount routes
app.use('/api/v1/auth', auth);

//Error handling middleware
app.use(errorHandler);

// Handle 404 cases
app.use('*', (req, res, next) => {
  return res.status(404).json({
    success: false,
    errors: ['This route does not exist'],
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.bgBlue);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(colors.red.underline(`Error: ${err.message}`));
  //Close server and exit process
  server.close(() => process.exit(1));
});
