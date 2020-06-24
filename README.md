# RootStock

http://rootstock.herokuapp.com/

RootStock is a financial app aimed at providing certainty during uncertain times.

RootStock is meant for individuals interested in modeling financial instruments diversification using risk to reward allocation model. The app is designed to be user friendly and allows any user with no prior experience in investing in stock market to design an investment portfolio.

The portfolio built is constructed based on user’s personal information. That approach allows to pick and choose investment options appropriate for a particular user. The details provided by the user are considered when developing particular structure for investment options. Based on users’ goals, age and personal investing style, stocks are assembled in particular proportion based on their companies profile and market position.
The following are allocation models:
·     Conservative
·     Moderate
·     Aggressive
Each allocation in turn is matched with users’ profile.  The user answers three questions, with each question providing insight into user’s socio-economic present situation. Each answer presents user with a particular amount of points, which are then added and used to pick an appropriate allocation model.

RootStock was built using the AngularJS frontend framework, along with Javascript, CSS and HTML.

User Stories:

A user can signup with Rootstock, fill out a short questionnaire, and be presented with three categories of portfolios based on the answers: Conservative, Moderate, and Aggressive.

A user can pick 10 stocks based on each portfolio type and add them to their portfolio.

A user can update the 10 stocks at any time.

A user can then delete their individual Conservative, Moderate, or Aggressive profiles, or delete the entire account.

Building the App:
Using partials and ng-Route, we were able to break down each piece of the site into its own partial - allowing for all of us to work on little pieces of the site at a time. 

----
<p align="center">
  <img src="public/images/logo.png">
</p>
