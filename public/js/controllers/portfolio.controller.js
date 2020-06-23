// Handles the views for viewing your portfolio
app.controller('PortfolioController', ['$scope', '$http', function($scope, $http) {

  this.getUser = () => {
      $http({
          method: 'GET',
          url: '/admin/session'
      }).then(
          response => {;
            console.log(response);
          },
          error => {
            console.log(error);
          }
      )
  };

  this.getUser();

}]);
