const authService = require('../services/authService');
const userService = require('../services/userService');

const emailSend = require('../utils/emailSend');

module.exports = {
    insertExpenses: async (req, res) => {
        try {
            const json = { error: '', result: {} };
    
            const description = req.body.description;
            const date = req.body.date;
            const userId = req.body.userId;
            const value = req.body.value;
    
            if (description && date && userId && value) {
                const userExists = await userService.find(userId)

                if (!userExists) {
                    json.error = 'User not found';
                    return res.status(400).json(json);
                }
    
                const currentDate = new Date();
                if (new Date(date) > currentDate) {
                    json.error = 'Date cannot be in the future';
                    return res.status(400).json(json);
                }
    
                if (value < 0) {
                    json.error = 'Value cannot be negative';
                    return res.status(400).json(json);
                }
    
                if (description.length > 191) {
                    json.error = 'Description must have a maximum of 191 characters';
                    return res.status(400).json(json);
                }
                
                if (userId !== userExists.id) {
                    json.error = 'Access denied: You do not have permission to access this expense';
                    return res.status(403).json(json);
                }
    
                await authService.insertExpenses(description, date, userId, value);
    
                json.result = {
                    description, 
                    date, 
                    userId, 
                    value
                };
    
                const userEmail = userExists.email;
                const emailSubject = 'Expense Registered';
                const emailBody = `Your expense with description "${description}" has been registered successfully.`;

                await emailSend.sendEmail(userEmail, emailSubject, emailBody, userExists.email);
                
                return res.status(201).json(json);
            } else {
                json.error = 'All fields are required';
                return res.status(400).json(json);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    update: async (req, res) => {
        try {
            const json = { error: '', result: [] };

            const id = req.params.id;

            const description = req.body.description;
            const date = req.body.date;
            const userId = req.body.userId;
            const value = req.body.value;
    
            if (description && date && userId && value) {
                const userExists = await userService.find(userId)

                if (!userExists) {
                    json.error = 'User not found';
                    return res.status(400).json(json);
                }
    
                const currentDate = new Date();
                if (new Date(date) > currentDate) {
                    json.error = 'Date cannot be in the future';
                    return res.status(400).json(json);
                }
    
                if (value < 0) {
                    json.error = 'Value cannot be negative';
                    return res.status(400).json(json);
                }
    
                if (description.length > 191) {
                    json.error = 'Description must have a maximum of 191 characters';
                    return res.status(400).json(json);
                }
                
                if (userId !== userExists.id) {
                    json.error = 'Access denied: You do not have permission to access this expense';
                    return res.status(403).json(json);
                }

                await authService.update(description, date, userId, value, id)

                json.result = {
                    description, 
                    date, 
                    userId, 
                    value
                };

                return res.status(201).json(json);
            } else {
                json.error = 'All fields are required';
                return res.status(400).json(json);
            }
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    delete: async (req, res) => {
        try {
            const json = { error: '', result: ['User deleted successfully.'] };

            const id = req.params.id;

            await authService.delete(id)

            res.status(200).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    },
    findAll: async (req, res) => {
        try {
            const json = { error: '', result: [] };

            const expenses = await authService.findAll();

            for (let i in expenses) {
                json.result.push({
                    "id": expenses[i].id,
                    "description": expenses[i].description, 
                    "date": expenses[i].date, 
                    "userId": expenses[i].user_id, 
                    "value": expenses[i].expenses
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

            const expenses = await authService.find(id);

            console.log(expenses)

            if (expenses) {
                json.result = {
                    "id": expenses.id,
                    "description": expenses.description, 
                    "date": expenses.date, 
                    "userId": expenses.user_id, 
                    "value": expenses.expenses
                };
            } else {
                json.error = 'Not found'
            }

            res.status(200).json(json);
        } catch (error) {
            res.status(404).json(`${error}`);
        }
    }
}