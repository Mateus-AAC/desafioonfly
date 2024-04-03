const expensesService = require('../../../src/services/authService');

describe('Expenses Service', () => {
    describe('insertExpenses', () => {
        it('should insert expenses into the database', async () => {
            const description = 'Test expense';
            const date = '2024-04-06';
            const userId = 1;
            const value = 100.00;

            const insertedId = await expensesService.insertExpenses(description, date, userId, value);

            expect(insertedId).toBeDefined();
            expect(typeof insertedId).toBe('number');
        });
    });

    describe('update', () => {
        it('should update expenses in the database', async () => {
            const description = 'Updated expense';
            const date = '2024-04-07';
            const userId = 2;
            const value = 150.00;
            const id = 1; 

            const updatedResult = await expensesService.update(description, date, userId, value, id);

            expect(updatedResult).toBeDefined();
        });
    });

    describe('delete', () => {
        it('should delete expenses from the database', async () => {
            const id = 1;

            const deleteResult = await expensesService.delete(id);

            expect(deleteResult).toBeDefined();
        });
    });

    describe('findAll', () => {
        it('should fetch all expenses from the database', async () => {
            const expenses = await expensesService.findAll();

            expect(expenses).toBeDefined();
            expect(Array.isArray(expenses)).toBe(true);
        });
    });

    describe('find', () => {
        it('should fetch a specific expense from the database', async () => {
            const id = 1;

            const expense = await expensesService.find(id);

            expect(expense).toBeDefined();
            expect(expense.id).toBe(id);
        });
    });
});
