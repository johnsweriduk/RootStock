// Handles the views for stocks
app.controller('SearchController', function($scope, $http) {
    this.stocks = [];
    this.addedStocks = [];
    this.filter = 'companyName';
    this.filterDirection = 0;

    this.getStocks = () => {
        $http({
            method: 'GET',
            url: '/admin/stock/aggressive'
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
        if(!exists) {
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
    this.getStocks();
});