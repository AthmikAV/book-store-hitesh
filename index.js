require("dotenv/config");
const express = require('express');
const app = express();

const booksRoutes = require("./routes/book.routes");
const PORT = 8000;

app.use(express.json());
app.use('/books', booksRoutes);

app.listen(PORT, () => console.log(`app is running on PORT : ${PORT}`));