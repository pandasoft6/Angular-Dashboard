(function() {
  'use strict';
  angular.module('app.controllers', ['app.services']).controller('AppCtrl', [
    '$scope', '$location', '$window', '$http', 'googleService', '$localStorage', function($scope, $location, $window, $http, googleService, $localStorage) {
      
      $window.initgoogle = function() {
        googleService.handleClientLoad();
      };
     
      $scope.isSpecificPage = function() {
        var path;
        path = $location.path();
        return _.contains(['/404', '/pages/500', '/pages/login', '/pages/signin', '/pages/signin1', '/pages/signin2', '/pages/signup', '/pages/signup1', '/pages/signup2', '/pages/lock-screen'], path);
      };
      var count = 0;
      $scope.dashboards = [];
      $scope.addDashboard = function(){
          count++;
          var dashboard = {};
          dashboard.title = "Dashboard" + count;
          dashboard.id = count;
          $scope.dashboards.push(dashboard);
          $localStorage.dashboards = $scope.dashboards;
      }

      return $scope.main = {
        brand: 'Flatify',
        name: 'Lisa Doe'
      };
    }
  ]).controller('NavCtrl', [
    '$scope', 'taskStorage', 'filterFilter', function($scope, taskStorage, filterFilter) {
      var tasks;
      tasks = $scope.tasks = taskStorage.get();
      $scope.taskRemainingCount = filterFilter(tasks, {
        completed: false
      }).length;
      return $scope.$on('taskRemaining:changed', function(event, count) {
        return $scope.taskRemainingCount = count;
      });
    }
  ]);
}).call(this);

//# sourceMappingURL=main.js.map
