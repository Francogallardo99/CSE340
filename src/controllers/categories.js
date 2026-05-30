import { getAllCategories, getCategoryDetails, getProjectsByCategoryId , updateCategoryAssignments ,getCategoriesByProjectId} from '../models/categories.js';
import { getProjectDetails} from '../models/projects.js';
import { createCategory } from '../models/categories.js';
import { updateCategory } from '../models/categories.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 2, max: 150 })
        .withMessage('Category name must be between 2 and 150 characters')
];
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    
    const category = await getCategoryDetails(categoryId);
    
    const projects = await getProjectsByCategoryId(categoryId);
    
    const title = category.category_name;
    
    res.render('category', { title, category, projects });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const allCategories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const title = `Assign Categories to Project`;
    res.render('assign-categories', { title, project, allCategories, assignedCategories });
}

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;
    let selectedCategoryIds = req.body.categories;
    if (!selectedCategoryIds) {
        selectedCategoryIds = [];
    } 
    else if (!Array.isArray(selectedCategoryIds)) {
        selectedCategoryIds = [selectedCategoryIds];
    }
    const updateResult = await updateCategoryAssignments(projectId, selectedCategoryIds);
    req.flash('success', 'Categories updated successfully!');
    res.redirect(`/project/${projectId}`);
}

const processNewCategoryForm = async (req, res) => {
    const { name } = req.body;
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-category');
    }
    const newCategoryId = await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect('/categories');
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);
    const title = `Edit Category`;
    res.render('edit-category', { title, category });
}

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect('/categories');
};

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
}

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm , processAssignCategoriesForm , processNewCategoryForm , showEditCategoryForm , processEditCategoryForm, showNewCategoryForm};