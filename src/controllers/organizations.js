// Import any needed model functions
import { getAllOrganizations } from '../models/organizations.js';
import { getOrganizationDetails } from '../models/organizations.js';

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organization = await getOrganizationDetails(organizationId);
    const title = organization.name;

    res.render('organization', { title, organization });
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };