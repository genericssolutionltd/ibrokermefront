ibrokermeApp.controller('viewcontroller', function ($scope, $window, $routeParams, idocumentservice) {
    debugger;
    const userid = $window.sessionStorage.getItem('userid');
    const documentid = $routeParams.documentid;
    if (documentid !== undefined && documentid !== ':documentid' && documentid !== '') {
        idocumentservice.getdocumentimage(userid, documentid).then(function (response) {
            debugger;
            if (response.length > 0) {
                $scope.documentmage = response;
            }
        });
    }
});

