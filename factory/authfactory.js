ibrokermeApp.factory('authenticationfactory', function ($window) {
    var auth = {
        isLogged: false,
        check: function () {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    }

    return auth;
});

ibrokermeApp.factory('userauthfactory', function ($window, $location, $http, authenticationfactory) {
    return {
        login: function (useremail, password) {
            let assign = new FormData();
            assign.append('email', useremail);
            assign.append('password', password);
            return $http.post(path + '/login', assign, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
             .then(function (response) {
                 return response;
             }, function (error) {
                 return error;
             });
        },
        logout: function () {
            if (authenticationfactory.isLogged) {
                authenticationfactory.isLogged = false;
                delete authenticationfactory.user;
                delete authenticationfactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                $location.path("#/");
            }

        }
    }
});

ibrokermeApp.factory('tokeninterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-UserId'] = $window.sessionStorage.getItem('userid');
                config.headers['X-Email'] = $window.sessionStorage.getItem('email');
                config.headers['X-Username'] = $window.sessionStorage.getItem('username');
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});