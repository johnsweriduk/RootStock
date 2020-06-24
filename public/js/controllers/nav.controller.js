// Handles the views for stocks
app.controller('NavController', ['$http','$scope', '$location', function($http, $scope, $location) {
    this.logout = () => {
        console.log('test');
        $http({
            method: 'DELETE',
            url: '/admin/session'
        }).then(
            response => {
                console.log('test');
                console.log(response);
                $location.path("/");
            }, error => {

            }
        );
    }
}]);