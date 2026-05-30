import { getAllCategories, getCategoryDetails, getProjectsByCategoryId , updateCategoryAssignments ,getCategoriesByProjectId} from '../models/categories.js';
import { getProjectDetails} from '../models/projects.js';
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

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm , processAssignCategoriesForm };