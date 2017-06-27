ibrokermeApp.service('isecuremeservice', ['$http', function ($http) {
    this.adddocument = function (documentfile, document, otherdoc, userid) {
        let reg = new FormData();
        reg.append('documentfile', documentfile);
        reg.append('document', document);
        reg.append('otherdoc', otherdoc);
        reg.append('userid', userid);

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
