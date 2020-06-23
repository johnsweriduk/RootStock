// Where the view routes go
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { //.config just runs once on load
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state

    // Homepage
    $routeProvider.when('/', {
        templateUrl: 'partials/main-view.html',
        controller: 'HomepageController',
        controllerAs: 'ctrl'
    });

    // Signup
    $routeProvider.when('/signup', {
        templateUrl: 'partials/signup-view.html',
        controller: 'SignupController',
        controllerAs: 'ctrl'
    });

    // Login
    $routeProvider.when('/login', {
        templateUrl: 'partials/login-view.html',
        controller: 'LoginController',
        controllerAs: 'ctrl'
    });

    // Account
    $routeProvider.when('/account', {
        templateUrl: 'partials/account-view.html',
        controller: 'AccountController',
        controllerAs: 'ctrl'
    });

    // Portfolio
    $routeProvider.when('/portfolio', {
        templateUrl: 'partials/portfolio-view.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
    });

    // Stock
    $routeProvider.when('/stock', {
        templateUrl: 'partials/stock-view.html',
        controller: 'StockController',
        controllerAs: 'ctrl'
    });

    // Stock Search
    $routeProvider.when('/search', {
        templateUrl: 'partials/search-view.html',
        controller: 'SearchController',
        controllerAs: 'ctrl'
    });

    $routeProvider.when('/search/:searchType', {
        templateUrl: 'partials/search-view.html',
        controller: 'SearchController',
        controllerAs: 'ctrl'
    });

    //Settings 
    $routeProvider.when('/settings', {
        templateUrl: 'partials/settings-view.html',
        controller: 'SettingsController',
        controllerAs: 'ctrl'
    });
}]);
