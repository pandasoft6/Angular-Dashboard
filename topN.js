/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

angular.module('ui.widgets')
  .directive('wtTopN', function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'template/widgets/topN/topN.html',
      controller: function ($scope) {
        $scope.results = [{dimension : "a", metric:"B"}];
        $scope.columns = [
            { field: 'dimension', displayName: 'Dimension' },
            { field: 'metric', displayName: 'Metric' }
        ];
        $scope.gridOptions = {
          data: 'results',
          enableRowSelection: false,
          enableColumnResize: true,
          columnDefs: 'columns'
        };
        /*
            ** Load Data from Google Analytics
            * Function loadData
            *   Params :
            *       @dimArray : Dimension Array
            *       @metArray : Metrics Array
            *       @data     : Data
            *
         */
        $scope.test = function(){
            $scope.results = [{dimension : "C", metric : "D"}];
        };
        $scope.loadData = function(dimArray, metArray, data){
            var index, columns = [], colindex = 1;
            for(index in dimArray){
                var column = {field :"column" + colindex, displayName: dimArray[index]};
                colindex++;
                columns.push(column);
            }
            for(index in metArray){
                var column = {field : "column" + colindex, displayName: metArray[index]};
                colindex++;
                columns.push(column);
            }
            $scope.columns = columns;
            var rows = [];
            for(index in data.rows){
                var row = data.rows[index];
                var i;
                var gridRow = {};
                colindex = 1;
                for(i=0; i<dimArray.length; i++){
                    gridRow["column" + colindex] = row[i];
                    colindex++;
                }
                for(i=0; i<metArray.length; i++){
                    gridRow["column" + colindex] = row[dimArray.length + i];
                    colindex++;
                }
                rows.push(gridRow);
            }
            $scope.results = rows;
        }
      },
      link: function postLink(scope) {
        scope.$watch('data', function (data) {
          if (data) {
            scope.items = _.sortBy(data, function (item) {
              return (-item.value);
            });
          }
        });
      }
    };
  });