ibrokermeApp.controller('whoamicontroller', function ($scope, encryptionservice, $location, $window, authenticationfactory, userauthfactory, whoamiservice) {
    const userid = $window.sessionStorage.getItem('userid');
    $scope.username = $window.sessionStorage.username;
    $scope.showdefaultphoto = false;
    $scope.enabledaccount = true;

    getwhoami();

    $scope.savepersonalinfo = function () {
        const identity = $window.sessionStorage.getItem('whoamiid');
        const id = identity === null ? '' : identity;
        let photo = $scope.photoimage === undefined ? '' : $scope.photoimage;
        let title = $scope.title === undefined ? '' : $scope.title;
        let firstname = $scope.firstname === undefined ? '' : $scope.firstname;
        let lastname = $scope.lastname === undefined ? '' : $scope.lastname;
        let email = $scope.email === undefined ? '' : $scope.email;
        let website = $scope.website === undefined ? '' : $scope.website;
        let aboutme = $scope.aboutme === undefined ? '' : $scope.aboutme;
        let maritalstatus = $scope.maritalstatus === undefined ? '' : $scope.maritalstatus;
        let hasdiability = $scope.areyoudisabled === undefined ? '' : $scope.areyoudisabled;
        let employmentstatus = $scope.employmentstatus === undefined ? '' : $scope.employmentstatus;
        let disabilitynature = $scope.disabilitynature === undefined ? '' : $scope.disabilitynature;
        let othermaritalstatus = $scope.othermaritalstatus === undefined ? '' : $scope.othermaritalstatus;
        let dateofbirth = $scope.dateofbirth === undefined ? '' : $scope.dateofbirth;
        let ninumber = $scope.ninumber === undefined ? '' : $scope.ninumber;
        let occupation = $scope.occupation === undefined ? '' : $scope.occupation;
        let taxrefnumber = $scope.taxrefnumber === undefined ? '' : $scope.taxrefnumber;
        let payerefnumber = $scope.payerefnumber === undefined ? '' : $scope.payerefnumber;
        let nationality = $scope.nationality === undefined ? '' : $scope.nationality;
        let religion = $scope.religion === undefined ? '' : $scope.religion;
        let height = $scope.height === undefined ? '' : $scope.height;
        let weight = $scope.weight === undefined ? '' : $scope.weight;
        let contacthousenameornumber = $scope.contacthousenameornumber === undefined ? '' : $scope.contacthousenameornumber;
        let contactstreet1 = $scope.contactstreet1 === undefined ? '' : $scope.contactstreet1;
        let contactstreet2 = $scope.contactstreet2 === undefined ? '' : $scope.contactstreet2;
        let contactstreet3 = $scope.contactstreet3 === undefined ? '' : $scope.contactstreet3;
        let contacttown = $scope.contacttown === undefined ? '' : $scope.contacttown;
        let contactcounty = $scope.contactcounty === undefined ? '' : $scope.contactcounty;
        let contactpostcode = $scope.contactpostcode === undefined ? '' : $scope.contactpostcode;
        let contactcountry = $scope.contactcountry === undefined ? '' : $scope.contactcountry;
        let contacttelno = $scope.contacttelno === undefined ? '' : $scope.contacttelno;
        let contactmobileno = $scope.contactmobileno === undefined ? '' : $scope.contactmobileno;
        let contactpersonalemail = $scope.contactpersonalemail === undefined ? '' : $scope.contactpersonalemail;
        let contactworkemail = $scope.contactworkemail === undefined ? '' : $scope.contactworkemail;
        let contactotheremail = $scope.contactotheremail === undefined ? '' : $scope.contactotheremail;
        let addresshousenameornumber = $scope.addresshousenameornumber === undefined ? '' : $scope.addresshousenameornumber;
        let addressstreetadd1 = $scope.addressstreetadd1 === undefined ? '' : $scope.addressstreetadd1;
        let addressstreetadd2 = $scope.addressstreetadd2 === undefined ? '' : $scope.addressstreetadd2;
        let addressstreetadd3 = $scope.addressstreetadd3 === undefined ? '' : $scope.addressstreetadd3;
        let addresstown = $scope.addresstown === undefined ? '' : $scope.addresstown;
        let addresscounty = $scope.addresscounty === undefined ? '' : $scope.addresscounty;
        let addresspostcodezip = $scope.addresspostcodezip === undefined ? '' : $scope.addresspostcodezip;
        let addresscountry = $scope.addresscountry === undefined ? '' : $scope.addresscountry;
        let addresspersonalemail = $scope.addresspersonalemail === undefined ? '' : $scope.addresspersonalemail;
        let addressworkemail = $scope.addressworkemail === undefined ? '' : $scope.addressworkemail;
        let addressotheremail = $scope.addressotheremail === undefined ? '' : $scope.addressotheremail;

        let nextkintelnumber = $scope.nextkintelnumber === undefined ? '' : $scope.nextkintelnumber;
        let nextkinmobilenumber = $scope.nextkinmobilenumber === undefined ? '' : $scope.nextkinmobilenumber;
        let nextkinpersonalemail = $scope.nextkinpersonalemail === undefined ? '' : $scope.nextkinpersonalemail;
        let nextkinworkemail = $scope.nextkinworkemail === undefined ? '' : $scope.nextkinworkemail;
        let nextkinotheremail = $scope.nextkinotheremail === undefined ? '' : $scope.nextkinotheremail;
        whoamiservice.addwhomami(photo, id, userid, title, firstname, lastname, email, website,
         aboutme, maritalstatus, hasdiability, employmentstatus, disabilitynature, othermaritalstatus,
         dateofbirth, ninumber, occupation, taxrefnumber, payerefnumber, nationality, religion,
         height, weight, contacthousenameornumber, contactstreet1, contactstreet2, contactstreet3,
         contacttown, contactcounty, contactpostcode, contactcountry, contacttelno, contactmobileno,
         contactpersonalemail, contactworkemail, contactotheremail, addresshousenameornumber,
        addressstreetadd1, addressstreetadd2, addressstreetadd3, addresstown, addresscounty, addresspostcodezip,
        addresscountry, addresspersonalemail, addressworkemail, addressotheremail, nextkintelnumber,
         nextkinmobilenumber, nextkinpersonalemail, nextkinworkemail,
         nextkinotheremail).then(function (response) {
             $scope.avatarImage = response.data;
             $scope.fullname = firstname + " " + lastname;
             $scope.occupation = occupation;
             $window.location.reload();
         });

    }
    $scope.updatepassword = function () {
        let enabled = $scope.enabledaccount;
        let visible = $scope.visibleprofile;
        let hideitem = $scope.hidetimeline;
        let oldpass = $scope.oldpassword === undefined ? '' : $scope.oldpassword;
        let newpass = $scope.newpassword === undefined ? '' : $scope.newpassword;
        let repeatpass = $scope.repeatedpassword;
        if (newpass === repeatpass && oldpass !== '' && newpass !== '') {
            let authold = encryptionservice.encode(oldpass);
            let authnew = encryptionservice.encode(newpass);
            whoamiservice.updatepassword(authold, authnew, userid).then(function (response) {
                if (response.status == '200') {
                    $scope.message = "Password updated"
                }
            })
        }
        else {
            $scope.message = "Password and confirmed password do not match"
        }
    }
    function getwhoami() {
        whoamiservice.getwhomami(userid).then(function (response) {
            if (response.length > 0) {
                let respo = response[0];
                $scope.showdefaultphoto = true;
                $scope.avatarImage = respo.photoimage.imagedata;
                $scope.showdefaultphoto = respo.photoimage.imagedata !== undefined;
                $scope.fullname = respo.firstname + " " + respo.lastname;
                $scope.title = respo.title;
                $scope.firstname = respo.firstname;
                $scope.lastname = respo.lastname;
                $scope.email = respo.email;
                $scope.website = respo.website;
                $scope.aboutme = respo.aboutme;
                $scope.maritalstatus = respo.maritalstatus;
                $scope.areyoudisabled = respo.hasdiability;
                $scope.employmentstatus = respo.employmentstatus;
                $scope.disabilitynature = respo.disabilitynature;
                $scope.othermaritalstatus = respo.othermaritalstatus;
                $scope.dateofbirth = respo.dateofbirth;
                $scope.ninumber = respo.ninumber;
                $scope.occupation = respo.occupation;
                $scope.taxrefnumber = respo.taxrefnumber;
                $scope.payerefnumber = respo.payerefnumber;
                $scope.nationality = respo.nationality;
                $scope.religion = respo.religion;
                $scope.height = respo.height;
                $scope.weight = respo.weight;
                $scope.contacthousenameornumber = respo.contacthousenameornumber;
                $scope.contactstreet1 = respo.contactstreet1;
                $scope.contactstreet2 = respo.contactstreet2;
                $scope.contactstreet3 = respo.contactstreet3;
                $scope.contacttown = respo.contacttown;
                $scope.contactcounty = respo.contactcounty;
                $scope.contactpostcode = respo.contactpostcode;
                $scope.contactcountry = respo.contactcountry;
                $scope.contacttelno = respo.contacttelno;
                $scope.contactmobileno = respo.contactmobileno;
                $scope.contactpersonalemail = respo.contactpersonalemail;
                $scope.contactworkemail = respo.contactworkemail;
                $scope.contactotheremail = respo.contactotheremail;
                $scope.addresshousenameornumber = respo.addresshousenameornumber;
                $scope.addressstreetadd1 = respo.addressstreetadd1;
                $scope.addressstreetadd2 = respo.addressstreetadd2;
                $scope.addressstreetadd3 = respo.addressstreetadd3;
                $scope.addresstown = respo.addresstown;
                $scope.addresscounty = respo.addresscounty;
                $scope.addresspostcodezip = respo.addresspostcodezip;
                $scope.addresscountry = respo.addresscountry;
                $scope.addresspersonalemail = respo.addresspersonalemail;
                $scope.addressworkemail = respo.addressworkemail;
                $scope.addressotheremail = respo.addressotheremail;
                $scope.nextkintelnumber = respo.nextkintelnumber;
                $scope.nextkinmobilenumber = respo.nextkinmobilenumber;
                $scope.nextkinpersonalemail = respo.nextkinpersonalemail;
                $scope.nextkinworkemail = respo.nextkinworkemail;
                $scope.nextkinotheremail = respo.nextkinotheremail;
                $window.sessionStorage.setItem("whoamiid", respo._id);
            }
        })

    }
});

