ibrokermeApp.controller('sendemailcontroller', function ($scope, $routeParams, encryptionservice, $location, $window,
    authenticationfactory, userauthfactory, whoamiservice, idocumentservice, $sce) {
    debugger;
    const userid = $window.sessionStorage.getItem('userid');
    const newid = $routeParams.documentid;
    const documentid = $window.sessionStorage.getItem('documentid');
    if (documentid !== undefined && documentid !== ':documentid' && documentid !== '') {
        if (newid != documentid && newid !== ':documentid') {
            $window.sessionStorage.setItem("documentid", newid);
        }
    }
    else {
        $window.sessionStorage.setItem("documentid", newid);
    }
    $scope.cancelemail = function () {
        $location.path('/documentme');
    }
    $scope.sendemail = function () {
        let confirmemail = $scope.emailaddressconfirmation;
        let email = $scope.emailaddress;
        if (confirmemail === email && email !== undefined && email !== "") {
            let emailobj = {
                documentid: documentid,
                email: $scope.emailaddress,
                subject: $scope.emailsubject,
                emailmessage: $scope.emailmessage,
                emailcopy: $scope.emailcopy,
                encrypemail: $scope.encryptemail || '',
                userid: userid,
                fullname: $scope.recipientfullname
            }
            idocumentservice.sendemail(emailobj).then(function (response) {
                if (response === 'Document emailed!' || response.status === 200) {
                    $location.path('/documentme');
                }
                else {
                    $scope.message = "Oops error occurred!"
                }
            });
        }
        else {
            $scope.message = "Email is not valid!"
        }
    }

});

