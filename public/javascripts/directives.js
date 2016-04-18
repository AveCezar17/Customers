/**
 * Created by oleksii on 18.04.16.
 */

customersApp.directive('search', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/input.hbs'
    }
});

customersApp.directive('tableResults', function() {
    return {
        restrict: 'E',
        templateUrl: '/partials/results.hbs'
    }
});

//email validation
var EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
customersApp.directive('email', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.email = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (EMAIL_REGEXP.test(viewValue)) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    };
}).directive('login', function() {
    return {
        templateUrl: '/partials/login.hbs'
    }
});