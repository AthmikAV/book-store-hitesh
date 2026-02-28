const { eq } = require('drizzle-orm');
const db = require('../db/index');
const authorTable = require("../Models/author.model");
const booksTable = require("../Models/book.model")
exports.getAuthors = async (req, res) => {
    const authorData = await db.select({
        firstName:authorTable.firstName,
        lastName:authorTable.lastName,
        email:authorTable.email
    }).from(authorTable);
    if (!authorData) {
        res.status(400).json({
            message:"their are no authors"
        })
    }
    res.status(200).json({
        success: true,
        date: authorData
    });
}

exports.getAuthorById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message:"Please Provide Id"
        })
    }
    const author = await db.select({
        firstName: authorTable.firstName,
        lastName: authorTable.lastName,
        email: authorTable.email
    }).from(authorTable).where(eq(authorTable.id,id));
    if (!author) {
        res.status(400).json({
            message:"author not found"
        })
    }
    res.status(200).json({
        success: true,
        date: author
    });

}

exports.getAllBooksOfAuthor = async (req, res) => {
    const { id } = req.params;
    const data = await db.select(
        {
            author: {
                authorId: authorTable.id,
                firstName: authorTable.firstName,
                lastName: authorTable.lastName,
                email: authorTable.email,
                books: {
                    bookId: booksTable.id,
                    title: booksTable.title,
                    description:booksTable.discription
                }
            }
        }
    ).from(authorTable).leftJoin(booksTable,eq(authorTable.id,booksTable.authorId)).where(eq(authorTable.id,id));

    if (!data) {
        return res.status(400).json({
            success: false,
            message:"No books found by the author"
        })
    }

    res.status(200).json({
        success: true,
        data: data
    });
}

exports.postAuthor =async (req,res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName) {
            res.status(400).json({
                success: false,
                error:"first name must be their"
            })
        }
        if (!lastName) {
            res.status(400).json({
                success: false,
                error:"last name must be their"
            })
        }
        if (!email) {
            res.status(400).json({
                success: false,
                error:"email must be their"
            })
        }

        const author = await db.insert(authorTable).values({
            firstName,
            lastName,
            email
        });

        res.status(201).json({
            success: true,
            data: author
        });

    } catch (error) {
        res.status(500).json({
    success: false,
    message: "ERROR : " + error.message
  });
    }
}

exports.deleteAuthorById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message:"Please Provide Id"
        })
    }

    await db.delete(authorTable).where(eq(authorTable.id, id));

    res.status(200).json({
        success: true,
        message: "Author Succesfully deleted"
    });

}