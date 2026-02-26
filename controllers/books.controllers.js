
let {BOOK} = require("../Models/notesDb");
exports.getAllBooks = function (req, res) {
    try {
        res.status(200).json({
            success: true,
            data: BOOK,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

exports.getBookById = function (req, res) {
    try {
            const { id } = req.params;
            const book = BOOK.find((book) => {
                return book.id === parseInt(id)
            });
            if (isNaN(id)) {
                return res.status(400).json({ error: `id must be of type number` })
            }
            if (!book) {
                return res.status(404).json({
                    success: true,
                    message: "Book Not Found"
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
}

exports.postBook = function (req, res) {
    try {
        const { title, author } = req.body;
        if (!title || !author) return res.status(400).json({
            success: false,
            message: "Title and author are required"
        });
        const newBook = {
            id: BOOK.length + 1,
            title,
            author
        }

        BOOK.push(newBook);
        
        res.status(200).json({
            success: true,
            data: newBook,
            message: "Book added succesfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteBookById = function (req, res) {
    const id = parseInt(req.params.id);
    const toDeleteBook = BOOK.find(book => book.id === id);
    
    if (!toDeleteBook) {
        return res.status(404).json({
            success: true,
            message: "Book not found"
        })
    }
    
    BOOK = BOOK.filter(book => book.id !== id);
    res.status(200).json({
        data: toDeleteBook,
        message: "Book is Deleted Succesfully"
    })
};