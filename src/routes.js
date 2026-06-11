import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage , showNewOrganizationForm , processNewOrganizationForm , organizationValidation , showEditOrganizationForm , processEditOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage , showNewProjectForm, processNewProjectForm , projectValidation , showEditProjectForm, processEditProjectForm} from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage , showAssignCategoriesForm, processAssignCategoriesForm , processNewCategoryForm, showEditCategoryForm , processEditCategoryForm, showNewCategoryForm, categoryValidation} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm , showLoginForm , processLoginForm , processLogout , requireLogin , showDashboard , requireRole , showAllUsers , processUnvolunteer , processVolunteer} from './controllers/users.js';


const router = express.Router();

// --- Public Routes ---
router.get('/', showHomePage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/register', showUserRegistrationForm);
router.get('/login', showLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

router.post('/register', processUserRegistrationForm);
router.post('/login', processLoginForm);

// --- Protected routes ---

// Organization
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Project
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Categories
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// Assign categories to projects
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);

// Users
router.get('/users', requireRole('admin'), showAllUsers);
router.post('/project/:id/volunteer', requireLogin, processVolunteer);
router.post('/project/:id/unvolunteer', requireLogin, processUnvolunteer);

// --- Error Testing Route ---
router.get('/test-error', testErrorPage);

export default router;