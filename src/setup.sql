create table organization (
organization_id serial primary key,
name varchar(150) not null,
description text not null,
contact_email varchar(250) not null,
logo_filename varchar(250) not null
)

insert into organization (name,description,contact_email,logo_filename)
values
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects','info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives','hello@unityserve.org','unityserve-logo.png');


create table project (
project_id serial primary key,
project_title varchar (100) not null,
project_description text not null,
project_location varchar (50) not null,
project_date date,
organization_id integer not null,
foreign key (organization_id) references organization(organization_id)
);

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
 