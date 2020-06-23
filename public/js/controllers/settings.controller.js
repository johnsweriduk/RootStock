// app.controller('SettingsController', ['$scope', '$http', function($scope, $http) {
//   console.log("Hello");
// }]);

app.controller('SettingsController', ['$http','$scope', '$location', function($http, $scope, $location) {

 $http({ 
   method: 'GET', 
   url: "/admin/session"
  }).then(response => {
    console.log(response.data);
    if(!response.data){
      $location.path("/");
    } else {
      $http({
        method: 'GET',
        url: `/admin/portfolio/${response.data.portfolioId}`
      }).then(response => {
  
        this.data = response.data;

        $scope.amount = response.data[0].investmentAmount;

        console.log($scope.amount)
        console.log(response);
      })
    }
  })

  this.updateInvestment = () => {
  console.log(this.data[0]._id);
  console.log(this.data);
  console.log($scope.amount);
    $http({
      method: 'POST',
      url: `/admin/portfolio/modify/${this.data[0]._id}`,
      data: {investmentAmount: $scope.amount}
    }).then(response => {

      console.log(response);
    })
  }

  this.resetMarketCap = (marketCap) => {
    console.log('resetMarketCap');
    console.log(marketCap);
    console.log(this.data[0]._id);
    $http({
      method: 'POST',
      url: `/admin/portfolio/resetMarketCap/${this.data[0]._id}`,
      data: {
        type: marketCap
      }
    }).then(response => {
      console.log(response);
    })
  };

  this.resetPortfolio = () => {
    console.log('resetPortfolio');
    console.log(this.data[0]._id)
   
    $http({
      method: 'POST',
      url: `/admin/portfolio/resetPortfolio/${this.data[0]._id}`
    }).then(response => {
      console.log(response);
    })
  }

  this.deleteAccount = () => {
   
    $http({
      method: 'DELETE',
      url: `/admin/user/${this.data[0]._id}`
    }).then(response => {
      console.log(response);
      $location.path("/");
    })
  }
}]);