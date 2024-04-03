const db = require('../database/config');

module.exports = {
    insertExpenses: (description, date, userId, value) => {
        return new Promise((accepted, rejected)=> {
            const sql = 'INSERT INTO expenses (description, date, user_id, value) VALUES (?, ?, ?, ?)'
            const values = [description, date, userId, value];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 

                return accepted(results.insertId);
            })
        });
    },
    update: (description, date, userId, value, id) => {
        return new Promise((accepted, rejected)=> {
            const sql = 'UPDATE expenses SET description = ?, date = ?, user_id = ?, value = ? WHERE id = ?'
            const values = [description, date, userId, value, id];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results);
            })
        });
    },
    delete: (id) => {
        return new db.promise((accepted, rejected)=>{
            const sql = 'DELETE FROM expenses WHERE id = ?';

            const values = [id];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results);
            })
        });
    },
    findAll: () => {
        return new Promise((accepted, rejected)=>{
            const sql = 'SELECT * FROM expenses';

            db.query(sql, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results);
            });
        });
    },
    find: (id) => {
        return new Promise((accepted, rejected)=>{
            const sql = 'SELECT * FROM expenses WHERE id = ?';
            const values = [id];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results[0]);
            });
        });
    }
}