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

  this.treeSrc = 1;
  this.questionPoints = 0;
  this.questionArray = [
    {
      question: 'How old are you?',
      answer1: 'Under 30',
      answer2: 'Between 30-50',
      answer3: 'Over 50'
    },
    {
      question: 'What is your purpose of investment',
      answer1: 'Growth',
      answer2: 'Income',
      answer3: 'Preservation'
    },
    {
      question: 'What is your timeframe for investment?',
      answer1: 'Under 5 years',
      answer2: '5-10 years',
      answer3: '10+ years'
    },
    {
      question: 'Thank you for your input'
    }
  ]

  // Assigns question set
  this.setQuestion = (arr) => {
    console.log('setting question set');
    this.question = arr[0].question,
    this.answer1 = arr[0].answer1,
    this.answer2 = arr[0].answer2,
    this.answer3 = arr[0].answer3
  }

  this.setQuestion(this.questionArray)
  setTimeout(() => {
    console.log('setTimeout Triggering');

  }, 2000)

  // Switches to next tree image
  this.incrementTree = () => {
    if (this.treeSrc < 4) {
      this.treeSrc++;
    }
  }

  // Advances to next question set
  this.advanceQuestionSet = (points) => {
    this.questionArray.shift();
    this.incrementTree();
    this.questionPoints += points;
    this.setQuestion(this.questionArray);
    if(this.questionArray.length === 1) {
      this.setPortfolioType();
    }
  }

  this.setPortfolioType = () => {
    if (this.questionPoints < 5) {
      this.portfolioType = 'aggresive'
    } else if (this.questionPoints > 7) {
      this.portfolioType = 'moderate'
    } else {
      this.portfolioType = 'conservative'
    }
  }

  // Portfolio POST/CREATE
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
      this.portfolioType = ''
    }, error => {
      console.log(error);
    })
  } // end of this.generatePortfolio


}]);
