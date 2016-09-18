//directives
require('./directives/carousel-directive');

//components scripts
require('./components/activity-grid');
require('./components/popular-grid');
require('./components/course-grid');
require('./components/upcoming-grid');
require('./components/booking-grid');

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
require('./controllers/profile-controller');
require('./controllers/profile-controller/booking-controller');
require('./controllers/profile-controller/settings-controller');
require('./controllers/profile-controller/user-profile-controller');
require('./controllers/coming-controller');
require('./controllers/login-controller');

//route and main app scripts
require('./app.routes.js');
require('./app.js');
