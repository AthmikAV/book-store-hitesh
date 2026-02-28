const { pgTable, varchar, uuid, text, index } = require('drizzle-orm/pg-core');
const authorTable = require('./author.model');
const { sql } = require('drizzle-orm');

const booksTable = pgTable("books",{
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    discription: text(),
    authorId :uuid().references(()=>authorTable.id).notNull()
}, (table) => ({
    searchIndexOnTitle: index('title_index').using(
        "gin",
       sql`to_tsvector('english', ${table.title})`
    )
    
}));

module.exports = booksTable;