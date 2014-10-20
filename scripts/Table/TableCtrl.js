(function() {
  'use strict';
  angular.module('app.tables', []).controller('tableCtrl', [
    '$scope', '$filter', '$http', function($scope, $filter, $http) {
	$scope.testclick = function(){
		alert($scope.test);
	}
	$scope.today = function() {
        return $scope.dt1 = new Date();
      };
      $scope.today();
      $scope.showWeeks = true;
      $scope.toggleWeeks = function() {
        return $scope.showWeeks = !$scope.showWeeks;
      };
      $scope.clear = function() {
        return $scope.dt1 = null;
      };
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };
      $scope.toggleMin = function() {
        var _ref;
        return $scope.minDate = (_ref = $scope.minDate) != null ? _ref : {
          "null": new Date()
        };
      };
      $scope.toggleMin();
      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return $scope.opened = true;
      };
      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      return $scope.format = $scope.formats[0];
    }
  ]);

}).call(this);

//# sourceMappingURL=TableCtrl.js.map
