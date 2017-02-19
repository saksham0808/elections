// Sort array
Array.prototype.shuffle = function (){
    var i = this.length, j, temp;
    if ( i === 0 ) {
        return;
    }

    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
};

// Return unique elements in an array
function unique(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}

// Function to check login
function checkLogin($state, localStorageService) {
    var isLoggedIn = localStorageService.get('isLoggedIn');
    var nextState = localStorageService.get('nextState');

    // Redirect to login if login is not set
    if (!isLoggedIn && nextState !== $state.current.stateName) {
        $state.go('login');
    }
}

// Store the stateIndex
// TODO: remove this global
var stateIndex = 0;

// Setup the app
angular.module('electionsApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap']);

// Setup the router
angular.module('electionsApp')
.config(function appConfiguration($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .state('admin', {
        url: '/admin',
        templateUrl: 'partials/admin.html',
        controller: 'adminController'
    })
    .state('form', {
        url: '',
        abstract: true,
        templateUrl: 'partials/form.html',
        controller: 'formController'
    })
    .state('form.batch', {
        url: '/batch',
        templateUrl: 'partials/form-batch.html',
        stateName: 'Info',
        stateCode: ++stateIndex,
        controller: 'batchController',
        onEnter: checkLogin
    })
    .state('form.senator', {
        url: '/senator',
        templateUrl: 'partials/form-senator.html',
        stateName: 'senator',
        stateCode: ++stateIndex,
        controller: 'senatorController',
        nextState: 'games',
        onEnter: checkLogin
    })
    .state('form.games', {
        url: '/games',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: ++stateIndex,
        stateName: 'games',
        nextState: 'submit',
        onEnter: checkLogin
    })
    .state('form.submit', {
        url: '/submit',
        templateUrl: 'partials/form-submit.html',
        stateCode: ++stateIndex,
        stateName: 'submit',
        controller: 'submitController',
        onEnter: checkLogin
    });

});

angular.module('electionsApp')
    .factory('dataFactory', function() {
        var exports = {};

        // The list of gensecs
        exports.gensecs = [
            { 'id': 101, 'name': 'Nikhil Srivastava', 'position': 'games', 'image': 'assets/1.jpg' },
            { 'id': 102, 'name': 'Deepali Gupta', 'position': 'games', 'image': 'assets/2.jpg' }
        ];

        // Full names of posts
        exports.fullPostNames = {
            'games' : 'General Secretary, Games and Sports'
        };

        // List of senators
        exports.senators = {
            'BT/BS Y14': [
            { 'id': 3, 'name': 'Bhanu Garg', 'image': 'assets/3.jpg' },
            { 'id': 4, 'name': 'Mandeep Singh', 'image': 'assets/4.jpg' },
            { 'id': 5, 'name': 'Ayushya Agarwal', 'image': 'assets/5.jpg' },
            { 'id': 6, 'name': 'Shantanu Suman', 'image': 'assets/6.jpg' }
            ],
            'BT/BS Y15': [
            { 'id': 7, 'name': 'Mayank Chauhan', 'image': 'assets/7.jpg' },
            { 'id': 8, 'name': 'Harsh Narang', 'image': 'assets/8.jpg' },
            { 'id': 9, 'name': 'Anshul Goel', 'image': 'assets/9.jpg' }
            ],
            'Executive': [
            ]
        };

        // Settings for the application
        exports.settings = {
            'mainPassword': 'abcdd',
            'cancelPassword': 'abcdd',
            'adminPassword': 'asdasd'
        };

        // total Number of states
        exports.totalStates = stateIndex;

        // All possible batches
        exports.batches = Object.keys(exports.senators);

        // All possible posts
        exports.posts = unique(exports.gensecs.map(function (item) {
            return item.position;
        }));

        // Get the names of senators
        exports.getSenators = function (batch) {
            return exports.senators[batch] || [];
        };

        // Get the names of presidents form the DB
        exports.getCandidates = function getCandidates(key) {
            return exports.gensecs.filter(function (value) {
                return (value.position === key);
            });
        };

        return exports;
    });
