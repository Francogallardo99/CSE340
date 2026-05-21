import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT project_id, project_title, project_description, project_location, project_date, organization_id
        FROM public.project;
    `;
    const result = await db.query(query);

    return result.rows;
}

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT 
            p.project_id, 
            p.project_title AS title, 
            p.project_description AS description, 
            p.project_date AS date, 
            p.project_location AS location, 
            p.organization_id, 
            o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);

    return result.rows;
}

const getProjectDetails = async (project_id) => {
    const query = `
        SELECT
            p.project_id,
            p.project_title AS title,
            p.project_description AS description,
            p.project_date AS date,
            p.project_location AS location,
            p.organization_id,
            o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    const result = await db.query(query, [project_id]);

    return result.rows[0]; 
}

export { getAllProjects, getUpcomingProjects, getProjectDetails }