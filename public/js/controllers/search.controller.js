// Handles the views for stocks
app.controller('SearchController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    this.stocks = [];
    this.addedStocks = [];
    this.filter = 'companyName';
    this.filterDirection = 0;
    this.searchType = $routeParams.searchType;

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

    this.getStocks = () => {
        $http({
            method: 'GET',
            url: '/admin/stock/' + this.searchType
        }).then(
            response => {
                this.stocks = response.data;
                this.filterStocks(this.filter);
            },
            error => {
                console.log(error);
            }
        )
    };

    this.addStock = stock => {
        let count = 0;
        let exists = false;
        for(let addedStock of this.addedStocks) {
            if(stock.symbol === addedStock.symbol) {
                exists = true;
                this.addedStocks.splice(count, 1);
            }
            count++;
        }
        if(!exists && this.addedStocks.length < 10) {
            this.addedStocks.push(stock);
        }
    };

    this.filterStocks = filter => {
        if(filter === this.filter) {
            if(this.filterDirection == 0) {
                this.filterDirection = 1;
            } else {
                this.filterDirection *= -1;
            }
        } else {
            this.filterDirection = 1;
            this.filter = filter;
        }
        this.stocks.sort((a,b) => {
            if ((this.filter == 'companyName') || (this.filter === 'symbol')) {
                return a[filter].localeCompare(b[filter]) * this.filterDirection;
            } else {
                return (a[filter] - b[filter]) * this.filterDirection;
            }
        });
    };

    this.hasAddedStock = stock => {
        for(let addedStock of this.addedStocks) {
            if(stock.symbol === addedStock.symbol) {
                return true;
            }
        }
        return false;
    };

    this.updatePortfolio = () => {
        if(this.addedStocks.length < 10) {
            return;
        }
        console.log($scope.portfolio);
        const portfolioId = $scope.portfolio[0]._id;
        const portfolioInvestment = $scope.portfolio.investmentAmount;
        const investmentPercent = $scope.portfolio[this.searchType + 'Percent'];
        const investmentAmount = portfolioInvestment * investmentPercent / 100;

        const newPortfolio = [];
        for(let stock of this.addedStocks) {
            newPortfolio.unshift({
                ticker: stock.symbol,
                shares: investmentAmount / 10 / stock.latestPrice,
                price: stock.latestPrice
            });
        }
        $http({
            method: 'PUT',
            url: '/admin/portfolio/' + portfolioId + '/' + this.searchType,
            data: newPortfolio
        }).then(
            response => {

            },
            error => {

            }
        );
    };
    this.getUser();
    this.getStocks();
}]);