const User = require('../models/user');
const UserData = require('../models/userData');

// Count method
describe('Count user', () => {
    test('default user count', () => {
      testUserData = new UserData();  
      const userCount = testUserData.getUserCount();
      expect(userCount).toEqual(3);
    })

    test('clear user and Count', () => {
        testUserData = new UserData(); 
        testUserData.clearUsers()
        const userCount = testUserData.getUserCount();
        expect(userCount).toEqual(0);
    
    })
})

// Remove user
describe('remove user', () => {
    test('Remove one', () => {
      testUserData = new UserData();
      const userCountBefore = testUserData.getUserCount();
      testUserData.removeOneUser();
      const userCountAfter = testUserData.getUserCount();
      const difUser = userCountBefore - userCountAfter;
      expect(difUser).toEqual(1);
    })
})

// Remove two user
describe('remove 2 user', () => {
    test('Remove two', () => {
      testUserData = new UserData();
      const userCountBefore = testUserData.getUserCount();
      testUserData.removeTwoUser();
      const userCountAfter = testUserData.getUserCount();
      const difUser = userCountBefore - userCountAfter;
      expect(difUser).toEqual(2);
    })
})

// Find user by email
describe('Find user by email', () => {
    test('Find user by email', () => {
      const newUser = new User("Jane", "jane@gmail.com");
      testUserData = new UserData();
      testUserData.addUser(newUser);
      let name = testUserData.findUserbyEmail("jane@gmail.com")
      expect(name).toEqual("Jane");
    })
})

// Find user that not exist
describe('Find that not exist', () => {
    test('Find user that not exist', () => {
      const newUser = new User("Jane", "jane@gmail.com");
      testUserData = new UserData();
      testUserData.addUser(newUser);
      let name = testUserData.findUserbyEmail("t@gmail.com")
      expect(name).toEqual(null);
    })
})