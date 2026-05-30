import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage , showNewOrganizationForm , processNewOrganizationForm , organizationValidation , showEditOrganizationForm , processEditOrganizationForm} from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage , showNewProjectForm, processNewProjectForm , projectValidation , showEditProjectForm, processEditProjectForm} from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage , showAssignCategoriesForm, processAssignCategoriesForm} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.get('/assign-categories/:id', showAssignCategoriesForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm, organizationValidation);
router.post('/assign-categories/:id', processAssignCategoriesForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm, projectValidation);
// error-handling routes
router.get('/test-error', testErrorPage);

export default router;