ibrokermeApp.service('idocumentservice', ['$http', function ($http) {
    this.deletesecureme = function (id, userid) {
        return $http.get(pathauth + '/deletesecureme/' + userid + '/' + id).then(function (response) {
            return response.data;
        });
    }
    this.sendemail = function (emailobj) {
        return $http.post(pathauth + '/sendemail', emailobj).then(function (response) {
            return response;
        });
    }
    this.getsecuremes = function (userid) {
        return $http.get(pathauth + '/getsecuremes/' + userid).then(function (response) {
            return response.data;
        });
    }
    this.savesecureme = function (secureme) {
        return $http.post(pathauth + '/savesecureme', secureme).then(function (response) {
            return response.data;
        });
    }
    this.adddocument = function (documentfile, document, otherdoc, userid, fileextension) {
        let reg = new FormData();
        reg.append('documentfile', documentfile);
        reg.append('document', document);
        reg.append('otherdoc', otherdoc);
        reg.append('userid', userid);
        reg.append('fileextension', fileextension);

        return $http.post(pathauth + '/adddocument', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .then(function (response) {
             return response;
         }, function (error) {
             return error;
         });
    }
    this.removedocumentimage = function (userid, documentid) {
        return $http.get(pathauth + '/deletedocumentimage' + '/' + userid + '/' + documentid).then(function (response) {
            return response.data;
        });
    }
    this.getdocuments = function (userid) {
        return $http.get(pathauth + '/getdocuments' + '/' + userid).then(function (response) {
            return response.data;
        });
    }

    this.getadocument = function (userid, documentid) {
        return $http.post(pathauth + '/getadocument' + '/' + userid + '/' + documentid, '',
            { responseType: 'arraybuffer' }).then(function (response) {
                return response.data;
            });
    }
    this.getadocumentdetails = function (userid, documentid) {
        return $http.get(pathauth + '/getadocumentdetails' + '/' + userid + '/' + documentid)
           .then(function (response) {
               return response.data;
           });
    }
    this.getdocumentdocument = function (userid, documentid) {
        return $http.post(pathauth + '/getadocumentimage' + '/' + userid + '/' + documentid, '',
           { responseType: 'arraybuffer' }).then(function (response) {
               debugger;
               return response.data;
           });
    }
    this.getdocumentimage = function (userid, documentid) {
        return $http.post(pathauth + '/getadocumentimage' + '/' + userid + '/' + documentid).then(function (response) {
            return response.data;
        });
    }

}]);
