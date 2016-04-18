/**
 * Created by oleksii on 18.04.16.
 */

customersApp.controller('customersController', function(jwtHelper, $http, $scope, $location) {
    $scope.submit = function (email, password) {
        // This is a promise of a JWT token
        return $http({
            url: 'http://api.wc22.biz/rest/auth/login',
            // This makes it so that this request doesn't send the JWT
            /*skipAuthorization: true,*/
            method: 'POST',
            data: {
                "email": email,
                "password": password
            }
        }).then(function(response) {
            var token = response.data.token;
            localStorage.setItem('customersToken', token);
            $location.path('/search');
            return token;
        }).catch(function() {
            alert ( "Incorrect email or password" );
        });
    };
    //$scope.reset();
});

customersApp.controller('searchController', function($http, $scope, $location) {
    $scope.search = function (searchText) {
        // This is a promise of a JWT token
        return $http({
            method: 'POST',
            url: 'http://api.wc22.biz/rest/search',
            headers: {
                'Content-Type': 'application/json',
                'X-JWT-Token': localStorage.getItem('customersToken')
            },
            data: {
                /*"limit": 10,
                 "offset": 0,*/
                "index": "customers",
                "query": searchText
            }
        }).then(function(data) {
            $scope.data = data.data.matches;
            $scope.viewby = 5;
            $scope.totalItems = data.data.total;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            }
        }).catch(function() {
            alert ( "No response!!!" );
        });
    };
    $scope.logout = function () {
        localStorage.removeItem('customersToken');
        $location.path('/login');
    };
});