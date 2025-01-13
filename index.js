const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');



dotenv.config();

const app = express();


app.use(express.json());
app.use(morgan('combined'));


app.use('/api', require('./routes/weather'));

;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
