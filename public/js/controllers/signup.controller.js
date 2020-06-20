// Portfolio Model:
// const portfolioSchema = new mongoose.Schema({
//     conservative: [ String ],
//     moderate: [ String ],
//     aggressive: [ String ],
//     conservativePercent: { type: Number },
//     moderatePercent: { type: Number },
//     aggressivePercent: { type: Number },
//     portfolioType: { type: String }
// });


// Handles the views for signup
app.controller('SignupController', ['$scope', '$http', function($scope, $http) {

  this.generatePortfolio = () => {
    console.log('generating portfolio');
    // CREATE PORTFOLIO //
    $http({
      method: 'POST',
      url: '/admin/portfolio',
      data:
      {
        portfolioType: this.portfolioType
      }
    }).then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  } // end of this.generatePortfolio


}]);
