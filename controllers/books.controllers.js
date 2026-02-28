const booksTable = require("../Models/book.model");
const authorTable = require("../Models/author.model");
const db = require('../db/index');
const { eq } = require("drizzle-orm");

exports.getAllBooks =async function (req, res) {
    try {
        const booksData = await db.select({
            id: booksTable.id,
            title: booksTable.title,
            description: booksTable.discription,
            author: {
                 id: authorTable.id,
          firstName: authorTable.firstName,
          lastName: authorTable.lastName,
            }
        }).from(booksTable).leftJoin(authorTable,eq(booksTable.authorId,authorTable.id));
        res.status(200).json({
            success: true,
            data: booksData,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

exports.getBookById =async function (req, res) {
    try {
        const { id } = req.params;
        const [book] = await db.select({
            id: booksTable.id,
            title: booksTable.title,
            description: booksTable.discription,
            author: {
                id: authorTable.id,
                firstName: authorTable.firstName,
                lastName: authorTable.lastName,
            }
        }).from(booksTable).leftJoin(authorTable, eq(booksTable.authorId, authorTable.id)).where(eq(booksTable.id, id)).limit(1);
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

exports.postBook =async function (req, res) {
    try {
        const { title, description,authorId } = req.body;
        if (!title || title.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        if (!description || description.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Author is required"
            });
        }
        
        const [newBook] = await db.insert(booksTable).values({
            title,
            discription: description,
            authorId
        }).returning({id:booksTable.id})


        res.status(200).json({
            success: true,
            bookId: newBook.id,
            message: "Book added succesfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.deleteBookById =async function (req, res) {
    const { id } = req.params;
    const toDeleteBook = await db.delete(booksTable).where(eq(booksTable.id,id))
    
    if (!toDeleteBook) {
        return res.status(404).json({
            success: true,
            message: "Book not found"
        })
    }
    res.status(200).json({
        data: toDeleteBook,
        message: "Book is Deleted Succesfully"
    })
};