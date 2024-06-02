const express = require("express");
const router = require('./routes/index');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log('server live on port:', PORT);
});