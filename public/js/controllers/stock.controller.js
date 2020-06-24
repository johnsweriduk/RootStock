// Handles the views for stocks
app.controller('StockController', ['$scope', '$http', function($scope, $http) {
  this.showModal = false;
  this.closeModal = () => {
    this.showModal = false;
  };
  $scope.$watch('stockModalSymbol', () => {
    if($scope.stockModalSymbol) {
      console.log($scope.stockModalSymbol);
      const historicalValues = [];
      const volumeValues = [];
      $http({
        method: 'GET',
        url: '/admin/stock/historical/' + $scope.stockModalSymbol
      }).then(
          response => {

            console.log(response.data);
            let highestOpen = 0;
            let highestVolume = 0;
            let lowestOpen = response.data[0].open;
            let lowestVolume = response.data[0].volume;
            for(let data of response.data) {
              historicalValues.push([data.open, data.close, data.high, data.low]);
              volumeValues.push(data.volume / 1000000);
              if(data.open > highestOpen) {
                highestOpen = data.open;
              }
              if(data.volume > highestVolume) {
                highestVolume = data.volume;
              }
              if(data.open < lowestOpen) {
                lowestOpen = data.open;
              }
              if(data.volume < lowestVolume) {
                lowestVolume = data.volume;
              }
            }
            console.log(historicalValues);
            console.log(volumeValues);
            lowestVolume = lowestVolume / 1000000;
            highestVolume = highestVolume / 1000000;
            let format = 'M';
            if(highestVolume > 1000) {
              highestVolume = highestVolume / 1000;
              lowestVolume = lowestVolume / 1000;
              format = 'B';
              console.log('billion');
            }
            lowestVolume = 0;
            highestVolume = (highestVolume * 1.2).toFixed(2);
            lowestOpen = (lowestOpen * 0.8).toFixed(2);
            highestOpen = (highestOpen * 1.2).toFixed(2);
            var myConfig = {
              "graphset": [{
                "type": "mixed",
                "title": {
                  "text": "Stock & Volume Chart - " + $scope.stockModalSymbol
                },
                "scale-y": {
                  "offset-start": "35%",
                  "values": lowestOpen+':'+ highestOpen +':0',
                  "format": "$%v",
                  "label": {
                    "text": "Prices"
                  }
                },
                "scale-y-2": {
                  "blended": true,
                  "offset-end": "75%",
                  "placement": "default",
                  "values": lowestVolume+':'+ highestVolume +':0',
                  "format": "%v" + format,
                  "label": {
                    "text": "Volume"
                  }
                },
                "crosshairX": {
                  "multiple": true,
                  "plotLabel": {
                    "headerText": "Day %kv<br><hr>",
                    "fontSize": 16
                  }
                },
                "labels": [{
                  "hook": "node:plot=2,index=13",
                  "text": "Highest Sum Volume",
                  "padding": 10,
                  "backgroundColor": "#f90",
                  "borderWidth": 2,
                  "borderColor": "#f60",
                  "shadow": true,
                  "callout": true,
                  "calloutWidth": 12,
                  "callout-height": 15,
                  "border-radius": 5,
                  "calloutPosition": "bottom",
                  "offset-y": -35,
                  "calloutTip": {
                    "type": "circle",
                    "background-color": "#fff",
                    "border-width": 2,
                    "border-color": "#f60",
                    "size": 4,
                    "shadow": true
                  }
                }],
                "series": [{
                  "type": "stock",
                  "scales": "scale-x,scale-y",
                  "guideLabel": {
                    "text": "Open: %open<br>High: %high<br>Low: %low<br>Close: %close"
                  },
                  "values": historicalValues
                },
                  {
                    "type": "bar",
                    "scales": "scale-x,scale-y-2",
                    "text": "Volume",
                    "values": volumeValues
                  }
                ]
              }]
            };

            zingchart.render({
              id: 'stock-chart',
              data: myConfig,
              height: '100%',
              width: "100%"
            });
            this.showModal = true;
          }, error => {

          }
      );
    }
  })
}]);
