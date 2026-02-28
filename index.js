require("dotenv/config");
const express = require('express');
const app = express();

const booksRoutes = require("./routes/book.routes");
const authorRoutes = require("./routes/author.routes")
const PORT = 8000;

app.use(express.json());
app.use('/books', booksRoutes);
app.use('/authors', authorRoutes);

app.listen(PORT, () => console.log(`app is running on PORT : ${PORT}`));