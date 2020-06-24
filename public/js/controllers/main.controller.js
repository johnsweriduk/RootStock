// Handles the views for stocks
app.controller('HomepageController', ['$http', '$scope', function($http, $scope) {
  this.getUser = () => {
      console.log($scope);
      $http({
          method: 'GET',
          url: '/admin/session'
      }).then(
          response => {
              $scope.user = response.data;
              console.log('test');
              const portfolioId = response.data.portfolioId;
              $http({
                  method: 'GET',
                  url: '/admin/portfolio/' + portfolioId
              })
                  .then(
                      response => {
                          $scope.portfolio = response.data;
                      },
                      error => {

                      }
                  );
          },
          error => {

          }
      )
  };
  this.getUser();

}]);
