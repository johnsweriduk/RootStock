app.directive('stockModal', function(){
    return {
        restrict: 'E', // E=element, A=attribute, C=class, M=comment, can be combined
        templateUrl: 'partials/global/stock-view-modal.html', //template to replace directive element
        controller: 'StockController',
        controllerAs: 'ctrl' //how it should be instantiated (Controller as ctrl)
    };
});
app.directive('rootstockNav', function(){
    return {
        restrict: 'E', // E=element, A=attribute, C=class, M=comment, can be combined
        templateUrl: 'partials/global/nav.html', //template to replace directive element
        controller: 'NavController',
        controllerAs: 'ctrl' //how it should be instantiated (Controller as ctrl)
    };
});