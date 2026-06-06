/* Table: organization */

create table organization (
organization_id serial primary key,
name varchar(150) not null,
description text not null,
contact_email varchar(250) not null,
logo_filename varchar(250) not null
);

/* Insert sample organizations */

insert into organization (name,description,contact_email,logo_filename)
values
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects','info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives','hello@unityserve.org','unityserve-logo.png');

/* Table: project */

create table project (
project_id serial primary key,
project_title varchar (100) not null,
project_description text not null,
project_location varchar (50) not null,
project_date date,
organization_id integer not null,
foreign key (organization_id) references organization(organization_id)
);

/* Insert sample projects for each organization */

INSERT INTO project (project_title, project_description, project_location, project_date, organization_id)
VALUES

-- BrightFuture Builders (organization_id = 1)
('Community Bridge Restoration',
 'Structural rehabilitation of the old downtown pedestrian bridge using eco-friendly materials and sustainable construction techniques to ensure safe transit for residents.',
 'Downtown District', '2027-03-15', 1),

('Solar-Powered Community Center',
 'Construction of a new neighborhood community center equipped with solar panels, rainwater harvesting systems, and energy-efficient insulation.',
 'Northside Neighborhood', '2027-06-01', 1),

('Affordable Housing Initiative',
 'Development of 12 affordable housing units built with recycled and low-carbon materials, aimed at low-income families in the urban core.',
 'Eastside Quarter', '2027-09-10', 1),

('Public Park Revitalization',
 'Redesign and reconstruction of an abandoned lot into a fully accessible green park, including walking paths, benches, and native plant gardens.',
 'Riverside Area', '2027-11-20', 1),

('School Infrastructure Upgrade',
 'Renovation of structural and sanitation systems in three public schools, incorporating sustainable building standards and disability-accessible facilities.',
 'West Education Zone', '2026-02-05', 1),

-- GreenHarvest Growers (organization_id = 2)
('Rooftop Urban Garden Launch',
 'Installation of a productive rooftop vegetable garden on a community building, providing fresh produce to 50 local families and hands-on farming workshops.',
 'Central Market Block', '2027-04-01', 2),

('School Garden Education Program',
 'Creation of vegetable gardens in five elementary schools combined with a curriculum teaching children about nutrition, composting, and sustainable food systems.',
 'South Learning District', '2027-05-15', 2),

('Community Farmers Market',
 'Organization of a weekly open-air farmers market where local urban growers sell organic produce, promoting short food supply chains and community economic development.',
 'Plaza Verde', '2027-07-01', 2),

('Composting Network Expansion',
 'Establishment of 20 community composting stations across the city to reduce organic waste and generate fertilizer for neighborhood gardens.',
 'City-Wide', '2027-08-20', 2),

('Hydroponic Training Workshop',
 'A hands-on training program teaching hydroponic farming techniques to unemployed youth and adults, providing them with skills to start small food businesses.',
 'Innovation Hub', '2027-10-10', 2),

-- UnityServe Volunteers (organization_id = 3)
('Winter Shelter Support Drive',
 'Coordination of volunteers to prepare and distribute warm meals, clothing, and hygiene kits to homeless individuals during the winter season.',
 'Shelter Network HQ', '2027-01-10', 3),

('Senior Companion Program',
 'Weekly volunteer visits to elderly residents living alone, offering companionship, assistance with errands, and emotional support to reduce social isolation.',
 'Sunnyvale Senior Center', '2027-03-01', 3),

('Youth Mentorship Initiative',
 'Matching trained volunteer mentors with at-risk teenagers to provide academic guidance, career orientation, and personal development support over a six-month period.',
 'North Youth Club', '2027-05-20', 3),

('Community Clean-Up Campaign',
 'Monthly neighborhood clean-up events organized with local volunteers to remove litter, paint over graffiti, and restore public spaces across the city.',
 'Multiple Neighborhoods', '2027-07-15', 3),

('Charity Fundraising Marathon',
 'Annual 5K run and fundraising event bringing together volunteers, sponsors, and the community to raise funds for three local charities focused on food and shelter.',
 'City Central Park', '2027-09-28', 3);
 
/* Table: category */

 create table category(
category_id serial primary key,
category_name varchar (100) not null
);

/* Insert sample categories */

INSERT INTO category (category_name) VALUES
('Environmental'),
('Education'),
('Community Service'),
('Health and Wellness');

/* Table: project_category */

create table project_category (
category_id integer not null,
project_id integer not null,
primary key (category_id , project_id),
foreign key (project_id) references project(project_id),
foreign key (category_id) references category(category_id)
);

/* Insert project-category associations */

INSERT INTO project_category (project_id, category_id) VALUES
-- Community Bridge Restoration
(1, 1), (1, 3),
-- Solar-Powered Community Center
(2, 1), (2, 3),
-- Affordable Housing Initiative
(3, 3),
-- Public Park Revitalization
(4, 1), (4, 3),
-- School Infrastructure Upgrade
(5, 2), (5, 3),
-- Rooftop Urban Garden Launch
(6, 1), (6, 4),
-- School Garden Education Program
(7, 2), (7, 1),
-- Community Farmers Market
(8, 3), (8, 4),
-- Composting Network Expansion
(9, 1),
-- Hydroponic Training Workshop
(10, 2), (10, 1),
-- Winter Shelter Support Drive
(11, 3), (11, 4),
-- Senior Companion Program
(12, 4), (12, 3),
-- Youth Mentorship Initiative
(13, 2), (13, 3),
-- Community Clean-Up Campaign
(14, 1), (14, 3),
-- Charity Fundraising Marathon
(15, 3), (15, 4);

/* Table: Roles */

create table roles(
role_id serial primary key,
role_name varchar(50) unique not null,
role_description text
);

/* Insert roles */

INSERT INTO roles(role_name, role_description) VALUES
('user' , 'Standard user with basic access'),
('admin', 'Administrator with full system access');

/* Table: Users */

CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role_id  INTEGER REFERENCES roles(role_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Update user roles */
    
UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';