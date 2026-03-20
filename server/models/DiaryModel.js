const db = require('../database/connect');

class Diary {
    constructor({ id, category, entry, date }) {
        this.id = id;
        this.category = category;
        this.entry = entry;
        this.date = date;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary ORDER BY date;");
        
        if (response.rows.length === 0) {
            throw new Error("No diary entries available.");
        }

        return response.rows.map(row => new Diary(row));
    }

    static async getOneByCategory(category) {
        const response = await db.query(
            "SELECT * FROM diary WHERE LOWER(category) = LOWER($1);",
            [category]
        );

        if (response.rows.length !== 1) {
            throw new Error("Diary entry not found.");
        }

        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { category, entry, date } = data;

        const existing = await db.query(
            "SELECT category FROM diary WHERE LOWER(category) = LOWER($1);",
            [category]
        );

        if (existing.rows.length > 0) {
            throw new Error("An entry with this category already exists.");
        }

        const response = await db.query(
            "INSERT INTO diary (category, entry, date) VALUES ($1, $2, $3) RETURNING *;",
            [category, entry, date]
        );

        return new Diary(response.rows[0]);
    }

    async update(data) {
        const { entry, date } = data;

        const response = await db.query(
            "UPDATE diary SET entry = $1, date = $2 WHERE id = $3 RETURNING *;",
            [entry, date, this.id]
        );

        if (response.rows.length !== 1) {
            throw new Error("Unable to update diary entry.");
        }

        return new Diary(response.rows[0]);
    }


    async destroy() {
        const response = await db.query(
            "DELETE FROM diary WHERE id = $1 RETURNING *;",
            [this.id]
        );

        if (response.rows.length !== 1) {
            throw new Error("Unable to delete diary entry.");
        }

        return new Diary(response.rows[0]);
    }
}

module.exports = Diary;