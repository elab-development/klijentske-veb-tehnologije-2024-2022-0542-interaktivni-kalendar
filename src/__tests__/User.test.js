import User from '../Models/User';

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User('johndoe', 'password123', 'john.doe@example.com');
  });

  test('should create a user with username, password, and email', () => {
    expect(user.username).toBe('johndoe');
    expect(user.password).toBe('password123');
    expect(user.email).toBe('john.doe@example.com');
  });

  test('should return user info in the correct format', () => {
    const info = user.getUserInfo();
    expect(info).toBe('User johndoe, Email: john.doe@example.com');
  });

  test('should handle empty username and email', () => {
    const emptyUser = new User('', '', '');
    expect(emptyUser.username).toBe('');
    expect(emptyUser.password).toBe('');
    expect(emptyUser.email).toBe('');
    const info = emptyUser.getUserInfo();
    expect(info).toBe('User , Email: ');
  });

  test('should handle different types of data', () => {
    const mixedTypeUser = new User(123, true, []);
    expect(mixedTypeUser.username).toBe(123);
    expect(mixedTypeUser.password).toBe(true);
    expect(mixedTypeUser.email).toEqual([]);
    const info = mixedTypeUser.getUserInfo();
    expect(info).toBe('User 123, Email: ');
  });
});
