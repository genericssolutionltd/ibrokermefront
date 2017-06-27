path = 'http://localhost:3000';
// script.js
pathauth = 'http://localhost:3000/api/v1';
//pathlog = 'http://localhost:3000';
//path = 'https://evaluatorapi.herokuapp.com/api/v1';
//pathlog = 'https://evaluatorapi.herokuapp.com';
var ibrokermeApp = angular.module('ibrokermeApp', ['ngRoute', 'ngSanitize', 'ngCookies']);

ibrokermeApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('tokeninterceptor');
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "/views/login.html",
        controller: "logincontroller",
        access: {
            requiredLogin: false
        }
    })
     .when("/registration", {
         templateUrl: "/views/registration.html",
         controller: "logincontroller",
         access: {
             requiredLogin: false
         }
     })
      .when("/recovery", {
          templateUrl: "/views/recovery.html",
          controller: "logincontroller",
          access: {
              requiredLogin: false
          }
      }).
    when("/lockscreen", {
        templateUrl: "/views/lockscreen.html",
        controller: "indexcontroller",
        access: {
            requiredLogin: true
        }
    }).
    when("/profile", {
        templateUrl: "/views/profile.html",
        controller: "whoamicontroller",
        access: {
            requiredLogin: true
        }
    }).
    when("/dashboard", {
        templateUrl: "/views/idashboard.html",
        controller: "indexcontroller",
        access: {
            requiredLogin: true
        }
    }).
     when("/viewdocumentme/:documentid", {
         templateUrl: "/views/docview.html",
         controller: "viewcontroller",
         access: {
             requiredLogin: true
         }
     }).
     when("/secureme", {
         templateUrl: "/views/isecureme.html",
         controller: "isecuremecontroller",
         access: {
             requiredLogin: true
         }
     }).
        when("/sendemail/:documentid", {
            templateUrl: "/views/send-email.html",
            controller: "sendemailcontroller",
            access: {
                requiredLogin: true
            }
        }).
      when("/documentme", {
          templateUrl: "/views/idocumentme.html",
          controller: "idocumentcontroller",
          access: {
              requiredLogin: true
          }
      }).otherwise({ redirectTo: '/' });
});
ibrokermeApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});
ibrokermeApp.run(function ($rootScope, $window, $location, authenticationfactory) {
    // when the page refreshes, check if the user is already logged in 
    authenticationfactory.check();
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        let ul = $window.sessionStorage.getItem("unlock") === null ? false : $window.sessionStorage.getItem("unlock");
        let unlock = JSON.parse(ul);
        if (nextRoute.$$route.originalPath === '/lockscreen' ||
            currentRoute.$$route.originalPath === '/lockscreen' && authenticationfactory.isLogged) {
            if (unlock) {
                $location.path("/dashboard");
                // $window.sessionStorage.removeItem("unlock");
            }
            else {
                $location.path("/lockscreen");
            }
        }
      
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !authenticationfactory.isLogged) {
            $location.path("#/");
        } else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!authenticationfactory.user) authenticationfactory.user = $window.sessionStorage.user;

        }
    });

    $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
        let ul = $window.sessionStorage.getItem("unlock") === null ? false : $window.sessionStorage.getItem("unlock");
        let unlock = JSON.parse(ul);
        // if the user is already logged in, take him to the home page
        if (authenticationfactory.isLogged == true) {
            if (unlock) {
                $location.path("/dashboard");
                $window.sessionStorage.removeItem("unlock");
            }
            else if (nextRoute.$$route.originalPath === '/dashboard') {
                $location.path("/dashboard");
            }
            else {
                $location.path(nextRoute.$$route.originalPath);
            }

        }

    });
});
ibrokermeApp.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    $httpProvider.defaults.cache = true;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    //disable IE ajax request caching
    // $httpProvider.defaults.headers.get['Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    //// extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);


