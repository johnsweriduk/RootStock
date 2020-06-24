app.directive('stockModal', function(){
    return {
        restrict: 'E', // E=element, A=attribute, C=class, M=comment, can be combined
        templateUrl: 'partials/global/stock-view-modal.html', //template to replace directive element
        controller: 'StockController',
        controllerAs: 'stockCtrl', //how it should be instantiated (Controller as ctrl)
        link: (scope, element, attrs) => {
            scope.openStockModal = symbol => {
                console.log(scope);
                scope.stockModalSymbol = symbol;
            }
        }
    };
});
app.directive('rootstockNav', function(){
    return {
        restrict: 'E', // E=element, A=attribute, C=class, M=comment, can be combined
        templateUrl: 'partials/global/nav.html', //template to replace directive element
        controller: 'NavController',
        controllerAs: 'navCtrl' //how it should be instantiated (Controller as ctrl)
    };
});