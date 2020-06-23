// Handles login views
app.controller('LoginController', ['$http', '$scope',  function($http, $scope) {
  this.errorMessage = false;

  this.credentials = {
    username: null,
    password: null
  };

  this.login = () => {
    console.log(this.credentials);
    this.credentials.username = $scope.credentials.username;
    this.credentials.password = $scope.credentials.password;

    $http({
      method: "POST",
      url: '/admin/session',
      data: this.credentials
    }).then(response => {
      if(response.data.error){
        this.errorMessage = true;
        $scope.errorMessage = response.data.error;
      } else {
        this.errorMessage = false;
        $scope.user = response.data;
        $http({
          method: "GET",
          url: '/admin/portfolio/' + response.data.portfolioId
        })
        .then(response => {
          $scope.portfolio = response.data
        },
        error => {

        })
      }
      console.log(response)
    });
  };//end of function
  
}]);