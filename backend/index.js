const express = require("express");
const router = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authCheck = require('./middleware');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', router);

app.get('/', authCheck, (req, res) => {
  res.status(200).send('<h1>Server is active</h1>')
})

app.listen(PORT, () => {
  console.log('server live on port:', PORT);
});