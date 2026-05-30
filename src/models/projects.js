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

const getProjectsByOrganizationId = async (organization_id) => {
    const query = `
        SELECT 
            project_id, 
            project_title AS title, 
            project_description AS description, 
            project_date AS date, 
            project_location AS location
        FROM public.project
        WHERE organization_id = $1;
    `;
    const result = await db.query(query, [organization_id]);
    
    return result.rows; 
}

const createProject = async (title, description, location, date, organizationId) => { 
    const query = `
        INSERT INTO public.project (project_title, project_description, project_location, project_date, organization_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;
    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    return result.rows[0].project_id; 
}

const updateProject = async (projectId, title, description, location, date , organizationId) => {
    const query = `
        update public.project
        SET project_title =$2, project_description =$3 , project_location =$4, project_date =$5, organization_id =$6
        WHERE project_id = $1;
    `;
    const queryParams = [projectId, title, description, location, date , organizationId];
    const result = await db.query(query, queryParams);
    if (result.rows.length === 0) {
        throw new Error(`No project found with ID: ${projectId}`);
    }
    
    return result.rows[0];
}

export { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId, createProject , updateProject }