ibrokermeApp.controller('indexcontroller', function ($scope, $location, $window, authenticationfactory, userauthfactory, whoamiservice) {
    $scope.showdefaultphoto = false;
    const token = $window.sessionStorage.token;
    const userid = $window.sessionStorage.getItem('userid');
    if (userid !== null && userid !== undefined) {
        getwhoami();
    }
    $scope.username = $window.sessionStorage.username;
    $scope.processlogout = function () {
        if (authenticationfactory.isLogged) {
            authenticationfactory.isLogged = false;
            delete authenticationfactory.user;
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.user;
            $window.sessionStorage.removeItem("username");
            $window.sessionStorage.removeItem("userid");
            $window.sessionStorage.removeItem("email");
            $window.sessionStorage.removeItem("unlock");
            $window.sessionStorage.removeItem("password");
            $location.path("#/");
        }
    }
    $scope.unlockscreen = function () {
        let password = $scope.unlockpassword === undefined ? '' : $scope.unlockpassword;
        let email = $window.sessionStorage.getItem("email");
        let storedpassword = $window.sessionStorage.getItem("password");
        if (storedpassword == password) {
            $window.sessionStorage.setItem("unlock", true);
            $location.path('/dashboard');
        }
        else {
            $window.sessionStorage.setItem("unlock", false);
            $scope.message = "Password is wrong";
        }
    }
    function getwhoami() {
        whoamiservice.getwhomami(userid).then(function (response) {
            if (response.length > 0) {
                let respo = response[0];
                $scope.avatarImage = respo.photoimage.imagedata;
                $scope.showdefaultphoto = respo.photoimage.imagedata !== undefined;
                $scope.fullname = respo.firstname + " " + respo.lastname;
                $scope.occupation = respo.occupation;
            }
        })

    }


});

