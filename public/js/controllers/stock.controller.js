// TODO: Hide API Key lol

// Handles the views for stocks
app.controller('StockController', ['$scope', '$http', function($scope, $http) {
  /*this.findStock = () => {
    this.stockInput = this.stockInput.toUpperCase();
    // basic input authentication
    if (this.stockInput.length > 5 || this.stockInput.length < 3) {
      console.log('not a viable input');
    } else {
      console.log('finding stock', this.stockInput);
      // API CALL HERE
      // Quote Call
      $http({
        method: 'GET',
        url: 'https://sandbox.iexapis.com/stable/stock/' + this.stockInput + '/quote?token=' + this.testKey
      }).then(response => {
        console.log(response.data)
        this.lastUpdate = `Last Updated: ${response.data.latestTime}`
      }, error => {
        console.log(error) // something wrong with request
      }).catch( err => console.error('Catch:', err )) // something wrong with promise
      // Company Call - Getting info from here for now
      $http({
        method: 'GET',
        url: 'https://sandbox.iexapis.com/stable/stock/' + this.stockInput + '/company?token=' + this.testKey
      }).then(response => {
        console.log(response.data)
        this.companyName = response.data.companyName,
        this.stockSymbol = response.data.symbol
      }, error => {
        console.log(error) // something wrong with request
      }).catch( err => console.error('Catch:', err )) // something wrong with promise
    }
    this.stockInput = ''
  }*/
    this.closeModal = () => {
        $scope.stockModal = '';
    }

}]);
