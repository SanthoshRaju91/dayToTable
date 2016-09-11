//components scripts
require('./components/activity-grid');
require('./components/popular-grid');
require('./components/course-grid');

//services scripts
require('./services/auth-service');
require('./services/rest-service');

//controllers scripts
require('./controllers/home-controller');
require('./controllers/register-controller');
require('./controllers/activities-controller');
require('./controllers/single-activity');
require('./controllers/contact-controller');
require('./controllers/courses-controller');
require('./controllers/single-course-ctrl');
require('./controllers/confirmation-controller');

//route and main app scripts
require('./app.routes.js');
require('./app.js');
