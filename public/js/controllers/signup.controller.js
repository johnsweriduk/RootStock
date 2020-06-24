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
app.controller('SignupController', ['$scope', '$http', '$location', function($scope, $http, $location) {

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
      question: 'Thank you, your specifications have been saved'
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

  this.setUsernameAndPassword = () => {
    if (this.password) {
      $http({
        method: 'GET',
        url: '/admin/user/' + this.username
      }).then(response => {
        console.log(response.data);
        if (response.data.length < 1) {
          this.usernameAndPasswordCreated = true;
          console.log(`SETTING - username: ${this.username} | password: ${this.password}`);
        } else {
          window.alert('username taken')
        }
      }, error => {
        console.log(error);
      })
    } else {
      window.alert('please input both a username and password')
    }
  }

  this.setInvestment = () => {
    console.log(`SETTING - investment amount: ${this.investmentAmount}`);
    this.investmentAmountCreated = true;
    this.setQuestion(this.questionArray)
  }

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
      this.portfolioType = 'aggressive'
      this.conservativePercent = 40;
      this.moderatePercent = 40;
      this.aggressivePercent = 20;
    } else if (this.questionPoints > 7) {
      this.portfolioType = 'moderate'
      this.conservativePercent = 55;
      this.moderatePercent = 35;
      this.aggressivePercent = 15;
    } else {
      this.portfolioType = 'conservative'
      this.conservativePercent = 70;
      this.moderatePercent = 20;
      this.aggressivePercent = 10;
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
            portfolioType: this.portfolioType,
            investmentAmount: this.investmentAmount,
            conservativePercent: this.conservativePercent,
            moderatePercent: this.moderatePercent,
            aggressivePercent: this.aggressivePercent,
          }
    }).then(response => {
      this.newPortfolioId = response.data._id
      this.portfolioType = ''
      $http({
        method: 'POST',
        url: '/admin/user',
        data:
            {
              username: this.username,
              password: this.password,
              portfolioId: this.newPortfolioId,
            }
      }).then(response => {
        $location.path("/portfolio")
      })
    }, error => {
      console.log(error);
    })
  } // end of this.generatePortfolio


}]);