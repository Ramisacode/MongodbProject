// Importing the required modules
const mongoose = require('mongoose');

// Connect to the local MongoDB instance the app with the terminal 
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true }); // this is not connecting to creat jason package

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    created_at: { type: Date, default: Date.now }
});

// Create the User model from the schema 
const User = mongoose.model('User', userSchema);

// Create Operation: Script to create and save a new user
async function createUser(name, email, age) {
    try {
        const user = new User({ name, email, age });
        const result = await user.save();
        console.log('User created:', result);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Read Operation: Script to find all users
async function findAllUsers() {
    try {
        const users = await User.find();
        console.log('All users:', users);
    } catch (error) { //if not found
        console.error('Error finding users:', error);
    }
}

// Read Operation: Script to find a specific user by their email
async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error finding user:', error);
    }
}

// update the age of a user based on their email
async function updateUserAge(email, newAge) {
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { age: newAge },
            { new: true } // Return the updated document
        );
        if (user) {
            console.log('User updated:', user);
        } else {
            console.log('User not found for update');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

// delete a user by their email
async function deleteUserByEmail(email) {
    try {
        const result = await User.deleteOne({ email });
        if (result.deletedCount > 0) {
            console.log('User deleted');
        } else {
            console.log('User not found for deletion');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}


// Close the Mongoose connection when done
process.on('exit', () => mongoose.connection.close());
