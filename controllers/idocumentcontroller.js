ibrokermeApp.controller('idocumentcontroller', function ($scope, encryptionservice, $location, $window,
    authenticationfactory, userauthfactory, whoamiservice, idocumentservice, $sce) {
    const userid = $window.sessionStorage.getItem('userid');
    $scope.viewing = false;
    if (userid !== null) {
        getdocuments();
    }
    $scope.processdocument = function (documentid, category) {
        switch (category) {
            case 'download':
                idocumentservice.getadocumentdetails(userid, documentid).then(function (resp) {
                    if (resp != '') {
                        idocumentservice.getadocument(userid, documentid).then(function (response) {
                            let blob = new Blob(([response]), { type: resp.filetype });
                            if (navigator.appVersion.toString().indexOf('.NET') > 0)
                                window.navigator.msSaveBlob(blob, resp.filename);
                            else {
                                var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                                link.href = URL.createObjectURL(blob);
                                link.download = resp.filename;
                                link.click();
                            }
                        });
                    }
                })
                break;
            case 'view':
                $scope.viewing = true;
                $scope.isimage = false;
                idocumentservice.getadocumentdetails(userid, documentid).then(function (resp) {
                    if (resp != '' && resp.filetype != '') {
                        switch (resp.filetype.split('/')[0]) {
                            case 'image':
                                $scope.isimage = true;
                                idocumentservice.getdocumentimage(userid, documentid).then(function (response) {
                                    if (response.length > 0) {
                                        $scope.documentmage = response;
                                    }
                                })
                                break;
                            case 'application':
                                idocumentservice.getdocumentimage(userid, documentid).then(function (response) {
                                    debugger;
                                    if (response !== undefined && response.document !== undefined && response.document.imagedatahtml !== '') {
                                        $scope.documentmage = $sce.trustAsHtml(response.document.imagedatahtml);
                                    }
                                    else {
                                        $scope.message = "This type of document cannot be viewed at the moment,please use download button";
                                        //TODO:find a way to show office on the browser
                                    }
                                })
                                break;
                        }
                    }
                });
                break;
            case 'email':
                $location.path('/sendemail/' + documentid);
                break;
            case 'extract':
                break;
            case 'delete':
                idocumentservice.removedocumentimage(userid, documentid).then(function (response) {
                    if (response.length > 0) {
                        $scope.documents = response;
                    }
                });
                break;
        }
    }
    $scope.closeview = function () {
        $scope.viewing = false;
    }
    $scope.canceldocument = function () {

    }
    $scope.uploaddocument = function () {
        let otherdoc = false;
        let termsandconditions = $scope.termsandconditions === undefined ? false : $scope.termsandconditions;
        let otherdocument = $scope.otherdocument === undefined ? '' : $scope.otherdocument;
        let documenttype = $scope.documenttype === undefined ? '' : $scope.documenttype;
        let documentfile = $scope.documentfile === undefined ? '' : $scope.documentfile;

        let fileextension = documentfile.name.split('.')[1];
        if (termsandconditions && documentfile !== '' && documenttype !== '' || otherdocument !== '') {
            let document = '';
            if (otherdocument === '' && documenttype !== '') {
                document = documenttype;
            }
            else if (otherdocument !== '' && documenttype === '') {
                document = otherdocument;
                otherdoc = true;
            }
            else {
                document = otherdocument;
                otherdoc = true;
            }
            idocumentservice.adddocument(documentfile, document, otherdoc, userid, fileextension).then(function (response) {
                if (response.data.length > 0) {
                    $scope.documents = response.data;
                }
            });
        }
        else {
            $scope.message = "No document attached or you have not accepted out terms and conditions"
        }
    }

    function getdocuments() {
        idocumentservice.getdocuments(userid).then(function (response) {
            if (response.length > 0) {
                $scope.documents = response;
            }
        });
    }

});

