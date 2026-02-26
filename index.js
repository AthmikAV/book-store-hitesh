const express = require('express');
const app = express();

const PORT = 8000;
app.use(express.json());


let books = [{
    id:1, title: 'Book One', author:"Author One"
},
{
    id:2, title: 'Book Two', author:"Author Two"
}]

app.get('/books', (req, res) => {
    try {
        res.status(200).json({
        success: true,
        data:books,
    });
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error
        })
    }
})

app.get('/books/:id', (req, res) => {
    try {
        const { id } = req.params;
        const book = books.find((book) => {
        return book.id === parseInt(id)
        });
        if (isNaN(id)) {
            return res.status(400).json({error:`id must be of type number`})
        }
        if (!book) {
            return res.status(404).json({
                success: true,
                message:"Book Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
})

app.post('/books', (req, res) => {
    try {
        const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({
        success: false,
        message: "Title and author are required"
    });
    const newBook = {
        id: books.length + 1,
        title,
        author
    }

        books.push(newBook);
        console.log(books);
    res.status(200).json({
        success: true,
        data: newBook,
        message:"Book added succesfully"
    })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
})

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const toDeleteBook = books.find(book =>  book.id === id);

    if (!toDeleteBook) {
        return res.status(404).json({
            success: true,
            message:"Book not found"
        })
    }

    books = books.filter(book => book.id !== id);
    console.log(books);
    res.status(200).json({
        data: toDeleteBook,
        message:"Book is Deleted Succesfully"
    })

});


app.listen(PORT, () => console.log(`app is running on PORT : ${PORT}`));