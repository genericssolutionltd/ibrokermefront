ibrokermeApp.controller('isecuremecontroller', function ($scope, $location, $window,
    idocumentservice, encryptionservice, $sce) {
    const userid = $window.sessionStorage.getItem('userid');

    $scope.showpassword = function (model) {
        let isshown = model.show;
        if (isshown) {
            model.password = encryptionservice.decode(model.password);
        } else {
            model.password = encryptionservice.encode(model.password);
        }
    }
    $scope.processsecuremedelete = function (id) {
        idocumentservice.deletesecureme(id, userid).then(function (response) {
            if (response.length > 0) {
                $scope.securemes = response;
            }
        });
    }
    $scope.resetpassword = function () {
        reset();
    }
    $scope.savepassword = function () {
        processsavesecureme();
    }
    function reset() {
        $scope.myurl = '';
        $scope.usernamesecureme = '';
        $scope.password = '';
        $scope.info = '';
    }
    function processsavesecureme() {
        let myurl = $scope.myurl === undefined ? '' : $scope.myurl;
        let usernamesecureme = $scope.usernamesecureme === undefined ? '' : $scope.usernamesecureme;
        let password = $scope.password === undefined ? '' : $scope.password;
        let info = $scope.info === undefined ? '' : $scope.info;
        let secureid = $scope.secureid === undefined ? '' : $scope.secureid;
        if (myurl !== '' && usernamesecureme !== '' && password !== '' && info !== '') {
            let pass = encryptionservice.encode($scope.password)
            let secureme = {
                myurl: myurl,
                username: usernamesecureme,
                password: pass,
                info: info,
                userid: userid,
                securemeid: secureid
            }
            idocumentservice.savesecureme(secureme).then(function (response) {
                if (response.length > 0) {
                    $scope.securemes = response;
                    reset();
                }
            });
        }
        else {
            $scope.message = "Details supplied not completed!"
        }
    }
    $scope.processsecureme = function (model, category) {
        switch (category) {
            case 'download':
                break;
            case 'view':
                $scope.myurl = model.url;
                $scope.usernamesecureme = model.username;
                $scope.password = encryptionservice.decode(model.password);
                $scope.info = model.comment;
                $scope.secureid = model._id;
                break;
        }
    }
    if (userid !== null) {
        getsecuremes();
    }
    function getsecuremes() {
        idocumentservice.getsecuremes(userid).then(function (response) {
            if (response.length > 0) {
                $scope.securemes = response.map(function (item) {
                    item.show = false;
                    return item;
                });
            }
        });
    }

});

