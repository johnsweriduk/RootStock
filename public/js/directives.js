app.directive('stockModal', function(){
    return {
        restrict: 'E', // E=element, A=attribute, C=class, M=comment, can be combined
        templateUrl: 'partials/global/stock-view-modal.html', //template to replace directive element
        controller: 'SearchController',
        controllerAs: 'ctrl', //how it should be instantiated (Controller as ctrl)
    };
});