ibrokermeApp.service('loginservice', ['$http', function ($http) {  
    this.addregistration = function (username, gender, email, dateofbirth, password,location,termsaccepted) {
        let reg = new FormData();
        reg.append('username', username);
        reg.append('gender', gender);
        reg.append('email', email);
        reg.append('dateofbirth', dateofbirth);
        reg.append('password', password);
        reg.append('location', location);
        reg.append('termsaccepted', termsaccepted);
        return $http.post(path + '/userregistration', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .then(function (response) {
             return response;
         }, function (error) {
             return error;
         });
    }
    this.recoverpassword = function (email, name) {
        let reg = new FormData();
        reg.append('email', email);
        reg.append('name', name);
        return $http.post(path + '/recoverpassword', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .then(function (response) {
             return response;
         }, function (error) {
             return error;
         });
    }
}]);
