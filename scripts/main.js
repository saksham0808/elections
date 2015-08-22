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

    //.state('form.president', {
        //url: '/president',
        //templateUrl: 'partials/form-executive.html',
        //controller: 'executiveController',
        //stateCode: ++stateIndex,
        //stateName: 'president',
        //nextState: 'games',
        //onEnter: checkLogin
    //})
    //.state('form.games', {
        //url: '/games',
        //templateUrl: 'partials/form-executive.html',
        //controller: 'executiveController',
        //stateCode: ++stateIndex,
        //stateName: 'games',
        //nextState: 'cultural',
        //onEnter: checkLogin
    //})
    //.state('form.cultural', {
        //url: '/cultural',
        //templateUrl: 'partials/form-executive.html',
        //controller: 'executiveController',
        //stateCode: ++stateIndex,
        //stateName: 'cultural',
        //nextState: 'science',
        //onEnter: checkLogin
    //})
    //.state('form.science', {
        //url: '/science',
        //templateUrl: 'partials/form-executive.html',
        //controller: 'executiveController',
        //stateCode: ++stateIndex,
        //stateName: 'science',
        //nextState: 'films',
        //onEnter: checkLogin
    //})
    //.state('form.films', {
        //url: '/films',
        //templateUrl: 'partials/form-executive.html',
        //controller: 'executiveController',
        //stateCode: ++stateIndex,
        //stateName: 'films',
        //nextState: 'submit',
        //onEnter: checkLogin
    //})

});

angular.module('electionsApp')
    .factory('dataFactory', function() {
        var exports = {};

        // The list of gensecs
        exports.gensecs = [
        ];

        // List of senators
        exports.senators = {
            //'UG, Y15': [
                //{ 'id': 1, 'name': 'Mugdha Arora', 'image': 'assets/ma.jpg' },
                //{ 'id': 2, 'name': 'Kshitij Jaiswal', 'image': 'assets/kj.jpg' },
                //{ 'id': 3, 'name': 'Himanshu Panwar', 'image': 'assets/hp.jpeg' },
                //{ 'id': 4, 'name': 'Swastid Sharma', 'image': 'assets/ss.jpg' },
                //{ 'id': 5, 'name': 'Shivam Gupta', 'image': 'assets/sg.jpg' },
                //{ 'id': 6, 'name': 'Siddhant Suhas Naik', 'image': 'assets/ssn.jpg' },
                //{ 'id': 7, 'name': 'Akarsh Gajbhiye', 'image': 'assets/ag.jpg' },
            //]
            'Mathematics': [
                {'id': 1, 'name': 'Nakul Surana', 'image': 'assets/13418.jpg'},
                {'id': 2, 'name': 'Sparsh Grover', 'image': 'assets/13711.jpg'},
                {'id': 3, 'name': 'Praharsh Mohanlal Patel', 'image': 'assets/151060.jpg'}
            ],
            'Chemical': [
                {'id': 11, 'name': 'Prasoon Srivastava', 'image': 'assets/12506.jpg'},
                {'id': 12, 'name': 'Manish MArkand Kapgate', 'image': 'assets/13382.jpg'},
                {'id': 13, 'name': 'Meenakshi shandilya', 'image': 'assets/13402.jpg'}
            ],
            'Civil': [
                {'id': 21, 'name': 'Adarsh Kabra', 'image': 'assets/13039.jpg'},
                {'id': 22, 'name': 'Priya Yadav', 'image': 'assets/13512.jpg'},
                {'id': 23, 'name': 'Salik Naqueeb Abbasi', 'image': 'assets/13605.jpg'}
            ],
            'Mechanical': [
                {'id':31, 'name': 'Asheesh Kumar', 'image': 'assets/13153.jpg'},
                {'id': 32, 'name': 'Ryan Pal', 'image': 'assets/13592.jpg'},
                {'id': 33, 'name': 'Ankur Maurya', 'image': 'assets/151060.png'}
            ],
            'OTHERS': []

        };

        // Settings for the application
        exports.settings = {
            'mainPassword': 'LetsVote',
            'cancelPassword': 'CancelThisVote',
            'adminPassword': 'IAmGod'
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
