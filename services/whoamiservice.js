ibrokermeApp.service('whoamiservice', ['$http', function ($http) {
    this.addwhomami = function (photo, id, userid, title, firstname, lastname, email, website,
         aboutme, maritalstatus, hasdiability, employmentstatus, disabilitynature, othermaritalstatus,
         dateofbirth, ninumber, occupation, taxrefnumber, payerefnumber, nationality, religion,
         height, weight, contacthousenameornumber, contactstreet1, contactstreet2, contactstreet3,
         contacttown, contactcounty, contactpostcode, contactcountry, contacttelno, contactmobileno,
         contactpersonalemail, contactworkemail, contactotheremail, addresshousenameornumber,
        addressstreetadd1, addressstreetadd2, addressstreetadd3, addresstown, addresscounty, addresspostcodezip,
        addresscountry, addresspersonalemail, addressworkemail, addressotheremail, nextkintelnumber,
         nextkinmobilenumber, nextkinpersonalemail, nextkinworkemail,
         nextkinotheremail) {

        let reg = new FormData();
        reg.append('photoimage', photo);
        reg.append('id', id);
        reg.append('userid', userid);
        reg.append('title', title);
        reg.append('firstname', firstname);
        reg.append('lastname', lastname);
        reg.append('email', email);
        reg.append('website', website);
        reg.append('aboutme', aboutme);
        reg.append('maritalstatus', maritalstatus);
        reg.append('hasdiability', hasdiability);
        reg.append('employmentstatus', employmentstatus);
        reg.append('disabilitynature', disabilitynature);
        reg.append('othermaritalstatus', othermaritalstatus);
        reg.append('dateofbirth', dateofbirth);
        reg.append('ninumber', ninumber);
        reg.append('occupation', occupation);
        reg.append('taxrefnumber', taxrefnumber);
        reg.append('payerefnumber', payerefnumber);
        reg.append('nationality', nationality);
        reg.append('religion', religion);
        reg.append('height', height);
        reg.append('weight', weight);
        reg.append('contacthousenameornumber', contacthousenameornumber);
        reg.append('contactstreet1', contactstreet1);
        reg.append('contactstreet2', contactstreet2);
        reg.append('contactstreet3', contactstreet3);
        reg.append('contacttown', contacttown);
        reg.append('contactcounty', contactcounty);
        reg.append('contactpostcode', contactpostcode);
        reg.append('contactcountry', contactcountry);
        reg.append('contacttelno', contacttelno);
        reg.append('contactmobileno', contactmobileno);
        reg.append('contactpersonalemail', contactpersonalemail);
        reg.append('contactworkemail', contactworkemail);
        reg.append('contactotheremail', contactotheremail);
        reg.append('addresshousenameornumber', addresshousenameornumber);
        reg.append('addressstreetadd1', addressstreetadd1);
        reg.append('addressstreetadd2', addressstreetadd2);
        reg.append('addressstreetadd3', addressstreetadd3);
        reg.append('addresstown', addresstown);
        reg.append('addresscounty', addresscounty);
        reg.append('addresspostcodezip', addresspostcodezip);
        reg.append('addresscountry', addresscountry);
        reg.append('addresspersonalemail', addresspersonalemail);
        reg.append('addressworkemail', addressworkemail);
        reg.append('addressotheremail', addressotheremail);

        reg.append('nextkintelnumber', nextkintelnumber);
        reg.append('nextkinmobilenumber', nextkinmobilenumber);
        reg.append('nextkinpersonalemail', nextkinpersonalemail);
        reg.append('nextkinworkemail', nextkinworkemail);
        reg.append('nextkinotheremail', nextkinotheremail);


        return $http.post(pathauth + '/whoamidetails', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .then(function (response) {
             return response;
         }, function (error) {
             return error;
         });
    }
    this.getwhomami = function (userid) {
        return $http.get(pathauth + '/getwhomami' + '/' + userid).then(function (response) {
            return response.data;
        });
    }
    this.getwhomamiphoto = function (userid) {
        return $http.get(pathauth + '/getwhoamiphoto' + '/' + userid).then(function (response) {
            return response.data;
        });
    }
    this.updatepassword = function (oldpass, newpass, userid) {
        let reg = new FormData();
        reg.append('oldpass', oldpass);
        reg.append('newpass', newpass);
        reg.append('userid', userid);

        return $http.post(pathauth + '/updatepassword', reg, {
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
