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
            scope: {
                data: '='
            },
            controller: function ($scope) {
                $scope.columns = [
                    { field: 'name', displayName: 'Name' },
                    { field: 'value', displayName: 'Value' }
                ];
                $scope.gridOptions = {
                    data: 'items',
                    enableRowSelection: false,
                    enableColumnResize: false,
                    columnDefs: 'columns'
                };
            },
            link: function postLink(scope) {
                scope.$watch('data', function (data) {
                    if (data) {
                        scope.items = data;
                        var columns = [];
                        if(data[0]){
                            for(var key in data[0]){
                                var column = {field : key, displayName : key};
                                columns.push(column);
                            }
                        }
                        scope.columns = columns;
                    }
                });
            }
        };
    });