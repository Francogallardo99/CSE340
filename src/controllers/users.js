import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';

const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const password_hash = await bcrypt.hash(password, 10);
        const userId = await createUser(name, email, password_hash);
        
        console.log('New user created with ID:', userId);
        req.flash('success', 'Registration successful! You can now log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }   
};

export { showUserRegistrationForm, processUserRegistrationForm };