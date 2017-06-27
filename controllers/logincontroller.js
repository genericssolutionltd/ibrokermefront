ibrokermeApp.controller('logincontroller', function ($scope, $rootScope, $location,
    $window, userauthfactory, authenticationfactory, loginservice) {
    $scope.passwordrecovery = function () {
        let email = $scope.useremail === undefined ? '' : $scope.useremail;
        let name = $scope.username === undefined ? '' : $scope.username;
        if (email !== "" || name !== "") {
            loginservice.recoverpassword(email, name).then(function (response) {
                if (response.status === 200) {
                    $scope.message = "Email sent to you with your requested password";
                    $location.path("#/");
                }
                else {
                    $scope.message = response.data;
                }

            });
        }
        else {
            $scope.message = 'Email Or Username is not valid';
        }
    }
    $scope.keypressed = function (keyevent) { 
        if (keyevent.keyCode == 13) {
            login();
        }
    };
    $scope.processsignin = function () {
        login();
    };
    function login() {
        let email = $scope.useremail === undefined ? '' : $scope.useremail;
        let password = $scope.userpassword === undefined ? '' : $scope.userpassword;
        if (email !== '' && password !== '') {
            userauthfactory.login(email, password).then(function (resp) {
                if (resp.status == '200') {
                    let user = resp.data.user;
                    let client = { email: user.email, userid: user.userid, username: user.username }
                    authenticationfactory.isLogged = true;
                    authenticationfactory.user = client;
                    $window.sessionStorage.token = resp.data.token;
                    $window.sessionStorage.user = client;
                    $window.sessionStorage.setItem("username", user.username);
                    $window.sessionStorage.setItem("userid", user.userid);
                    $window.sessionStorage.setItem("email", user.email);
                    $window.sessionStorage.setItem("password", password);
                    $location.path('/dashboard');
                }
                else if (resp.status == '401') {
                    $scope.message = resp.statusText;
                }
            });
        } else {
            $scope.message = 'Invalid credentials';
        }
    }
    $scope.addregistration = function () {
        let username = $scope.username;
        let email = $scope.email;
        let gender = $scope.gender;
        let dateofbirth = $scope.dateofbirth;
        let password = $scope.password;
        let confirmpassword = $scope.confirmpassword;
        let termsaccepted = $scope.termsaccepted;
        let location = $location.absUrl().replace('registration', '');

        if (confirmpassword !== password) {
            $scope.message = "Password and confirmed password do not match"
        }
        else if (!termsaccepted) {
            $scope.message = "Please accept our terms and conditions to continue"
        }
        else {
            $scope.message = "";
            loginservice.addregistration(username, gender, email, dateofbirth, password, location, termsaccepted).then(function (response) {
                if (response.data.insertedCount > 0) {
                    $scope.message = "Email sent to you with link to login";
                    $location.path("#/");
                }
                else if (response.data === 'Email already used') {
                    $scope.message = response.data;
                }
                else {
                    $scope.message = response.data;
                }
            })
        }

    }
});

