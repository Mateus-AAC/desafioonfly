const userService = require('../../../src/services/userService');
const db = require('../../../src/database/config');

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insertUser', () => {
    it('should insert a new user and return the inserted ID', async () => {
      const name = 'Test User';
      const email = 'test@example.com';
      const password = 'testpassword';
      const expectedId = 1;

      const mockResults = {
        insertId: expectedId
      };
      db.query = jest.fn().mockImplementation((sql, values, callback) => {
        callback(null, mockResults);
      });

      const result = await userService.insertUser(name, email, password);

      expect(result).toEqual(expectedId);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user and return the results', async () => {
      const name = 'Updated Test User';
      const email = 'updatedtest@example.com';
      const password = 'updatedtestpassword';
      const userId = 1;

      const mockResults = {
        affectedRows: 1
      };
      db.query = jest.fn().mockImplementation((sql, values, callback) => {
        callback(null, mockResults);
      });

      const result = await userService.update(name, email, password, userId);

      expect(result).toEqual(mockResults);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a user and return the results', async () => {
      const userId = 1;

      const mockResults = {
        affectedRows: 1
      };
      db.query = jest.fn().mockImplementation((sql, values, callback) => {
        callback(null, mockResults);
      });

      const result = await userService.delete(userId);

      expect(result).toEqual(mockResults);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should find all users and return the results', async () => {
      const mockResults = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
      db.query = jest.fn().mockImplementation((sql, callback) => {
        callback(null, mockResults);
      });

      const result = await userService.findAll();

      expect(result).toEqual(mockResults);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('should find a user by ID and return the result', async () => {
      const userId = 1;
      const mockResult = { id: userId, name: 'Test User' };
      db.query = jest.fn().mockImplementation((sql, values, callback) => {
        callback(null, [mockResult]);
      });

      const result = await userService.find(userId);

      expect(result).toEqual(mockResult);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('findNameAndPasswordJWT', () => {
    it('should find a user by name and password and return the result', async () => {
      const name = 'Test User';
      const password = 'testpassword';
      const mockResult = { id: 1, name: 'Test User', password: 'testpassword' };
      db.query = jest.fn().mockImplementation((sql, values, callback) => {
        callback(null, [mockResult]);
      });

      const result = await userService.findNameAndPasswordJWT(name, password);

      expect(result).toEqual(mockResult);
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });
});