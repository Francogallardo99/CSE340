import bcrypt from 'bcrypt';
import { createUser , authenticateUser , getAllUsers} from '../models/users.js';

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

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (user) {
        req.session.user = user;
        console.log('User logged in successfully:', user);
        req.flash('success', 'Login successful!');
        res.redirect('/dashboard');
    } else {
        req.flash('error', 'Invalid email or password. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = (req, res) => {
    req.session.user = null; 
    req.flash('success', 'You have been logged out successfully.');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/login');
    }
    next();
};

const showDashboard = (req, res) => {
    const name = req.session.user.name;
    const email = req.session.user.email;
    const user = req.session.user; 

    res.render('dashboard', { title: 'Dashboard', name, email, user }); 
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/dashboard');
        }
        next();
    };
}

const showAllUsers = async (req, res) => {
    const users = await getAllUsers();
    const title = 'User Management';
    const user = req.session.user;
    res.render('users', { title, users, user });
}

export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showAllUsers };