import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (id) => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
}

const getCategoriesByProjectId = async (project_id) => {
    const query = `
        SELECT c.category_id, c.category_name
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [project_id]);

    return result.rows;
}

const getProjectsByCategoryId = async (category_id) => {
    const query = `
        SELECT 
        p.project_id, 
        p.project_title AS title, 
        p.project_description AS description, 
        p.project_date AS date, 
        p.project_location AS location, 
        o.organization_id ,
        o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        JOIN public.project_category pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;


    const result = await db.query(query, [category_id]);

    return result.rows;
}

const assignCategoryToProject = async (project_id, category_id) => {
    const query = `
        INSERT INTO public.project_category (project_id, category_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
    `;
    await db.query(query, [project_id, category_id]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM public.project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

export {getAllCategories, getCategoryDetails, getProjectsByCategoryId, getCategoriesByProjectId, updateCategoryAssignments}  