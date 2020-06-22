app.directive('stock-modal', function(){
    return {
        restrict: 'E', // E=element, A=attribute, C=class, M=comment, can be combined
        templateUrl: 'global/stock-view-modal.html', //template to replace directive element
        controller: 'StockController',
        controllerAs: 'ctrl' //how it should be instantiated (Controller as ctrl)
    };
});