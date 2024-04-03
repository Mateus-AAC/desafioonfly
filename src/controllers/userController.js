const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = {
    insertUser: async (req, res) => {
        try {
            const json = { error: '', result: [] };

            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            if (name && email && password) {
                await userService.insertUser(name, email, password);

                json.result = {
                    name,
                    email
                };
            } else {
                json.error = 'Not sent'
            }

            res.status(201).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    update: async (req, res) => {
        try {
            const json = { error: '', result: [] };

            const id = req.params.id;

            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            if (name && email && password) {
                await userService.update(name, email, password, id);

                json.result = {
                    name,
                    email
                };
            } else {
                json.error = 'Not sent'
            }

            res.status(200).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    delete: async (req, res) => {
        try {
            const json = { error: '', result: ['User deleted successfully.'] };

            const id = req.params.id;

            await userService.delete(id);

            res.status(200).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    findAll: async (req, res) => {
        try {
            const json = { error: '', result: [] };
            
            const user = await userService.findAll();

            for (let i in user) {
                json.result.push({
                    "id": user[i].id,
                    "name": user[i].name,
                    "email": user[i].email
                });
            }

            res.status(200).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    find: async (req, res) => {
        try {
            const json = { error: '', result: [] };

            const id = req.params.id;

            const userId = await userService.find(id);

            console.log(userId);

            if (userId) {
                json.result = {
                    "id": userId.id,
                    "name": userId.name,
                    "email": userId.email
                };
            } else {
                json.error = 'Not found'
            }

            res.status(200).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    generateToken: async (req, res) => {
        try {
            const name = req.body.name;
            const password = req.body.password;

            const findNameAndPasswordJWT = await userService.findNameAndPasswordJWT(name, password)

            if(name == findNameAndPasswordJWT.name && password == findNameAndPasswordJWT.password){
                const id = 1; 

                const token = jwt.sign({ id }, process.env.SECRET);

                return res.status(200).send({ Auth: true, Token: token })
            } else {
                res.status(500).send('Invalid login.');
            }
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    deleteToken: (req, res) => {
        try {
            res.status(200).json({ auth: false, token: null });
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    }
}