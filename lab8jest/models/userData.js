const initialUsersData = require('./initdata');
const User = require('./user');

class UserData {
    constructor() {
        this.n = 0;
        this.users = [];
        initialUsersData.forEach(user => {
            const newUser = new User(user.name, user.email); 
            this.addUser(newUser);
        });
    }

    // Method to add a user
    addUser(user) {
        this.users.push(user);
    }

    // Method to clear all users
    removeOneUser() {
        if ( this.users.length > 0 ) {
            return this.users.pop();
        }else{
            return null
        }       
    }

    removeTwoUser(){
        if ( this.users.length >= 2) {
            this.users.pop();
            this.users.pop();
        } else {
            return null;
        }
    }

    findUserbyEmail(email){
        const user = this.users.find(user => user.email === email);
        if (!user) {
            return null;
        }else{
            return user.name;
        }
    }


    // Method to clear all users
    getUserCount() {
        return this.users.length;
    }

    // Method to clear all users
    clearUsers() {
        this.users = [];
    }

    

}

module.exports = UserData;