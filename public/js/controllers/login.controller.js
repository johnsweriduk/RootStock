// Handles login views
app.controller('LoginController', ['$http', '$scope',  function($http, $scope) {
  this.errorMessage = false;

  let credentials = {
    username: null,
    password: null
  };

  this.login = () => {
    
    credentials.username = $scope.credentials.username;
    credentials.password = $scope.credentials.password;

    $http({
      method: "POST",
      url: '/admin/session',
      data: credentials
    }).then(response => {
      if(response.data.error){
        this.errorMessage = true;
        $scope.errorMessage = response.data.error;
      } else {
        this.errorMessage = false;
      }
      console.log(response)
    })
  };//end of function
  
}]);