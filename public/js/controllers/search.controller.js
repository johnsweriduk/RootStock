// Handles the views for stocks
app.controller('SearchController', function($scope, $http) {
    this.stocks = [];
    this.testCall = () => {
        $http({
            method: 'GET',
            url: '/admin/stock/aggressive'
        }).then(
            response => {
                console.log(response.data);
                this.stocks = response.data;
            },
            error => {
                console.log(error);
            }
        )
    };
});