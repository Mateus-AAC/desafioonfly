const db = require('../database/config');

module.exports = {
    insertUser: (name, email, password) => {
        return new Promise((accepted, rejected)=> {
            const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
            const values = [name, email, password];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results.insertId);
            })
        });
    },
    update: (name, email, password, id) => {
        return new Promise((accepted, rejected)=> {
            const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'
            const values = [name, email, password, id];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results);
            })
        });
    },
    delete: (id) => {
        return new Promise((accepted, rejected)=>{
            const sql = 'DELETE FROM users WHERE id = ?';

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
            const sql = 'SELECT * FROM users';

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
            const sql = 'SELECT * FROM users WHERE id = ?';
            const values = [id];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results[0]);
            });
        });
    },
    findNameAndPasswordJWT: (name, password) => {
        return new Promise((accepted, rejected)=>{
            const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
            const values = [name, password];

            db.query(sql, values, (error, results) => {
                if (error) {
                    return rejected(error);
                } 
                return accepted(results[0]);
            });
        });
    }
}