'use strict';
 angular.module('app.services', [])
    .service('googleService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
        var clientId = '297641329485-45rfdicrb99rkammjhjeu84bprsf8d1o.apps.googleusercontent.com',
            apiKey = 'AIzaSyCIjTshdBPDBrZQdeFggnn1z85rue2ItTk',
            scopes = ["https://www.googleapis.com/auth/analytics.readonly", "https://www.googleapis.com/auth/userinfo.email"],
            domain = '';

        this.login = function () {
            var deferred = $q.defer();
            function handleAuthResult(authResult){
                if (authResult && !authResult.error) {
                    var data = {};
                    gapi.client.load("analytics", "v3", function(a) {
                        gapi.client.analytics.management.accounts.list().execute(
                                function(a){
                                    if (a.error) deferred.reject('error');
                                    else if (a.items && a.items.length){
                                        var data = {};
                                        data.items = a.items;
                                        deferred.resolve(data);
                                    }else deferred.resolve(null)
                                }
                            );
                     });

                } else {
                    deferred.reject('error');
                }     
            }
            gapi.auth.authorize({ 
                client_id: clientId, 
                scope: scopes, 
                immediate: true
            }, handleAuthResult);
            return deferred.promise;
        }

        this.handleClientLoad = function () {
            gapi.client.setApiKey(apiKey);
            gapi.auth.init(function () { });
            //window.setTimeout(checkAuth, 1);
        };

        this.checkAuth = function() {
            gapi.auth.authorize({ 
                client_id: clientId, 
                scope: scopes, 
                immediate: true
            }, this.handleAuthResult);
        };


        this.handleAuthClick = function(event) {
            gapi.auth.authorize({ 
                client_id: clientId, 
                scope: scopes, 
                immediate: false
            }, this.handleAuthResult);
            return false;
        };

        this.loadWebproperties = function(accountid){
            var deferred = $q.defer();
            function handleWebproperties(a){
                if (a.error) deferred.reject('error');
                else if (a.items && a.items.length){
                    var data = {};
                    data.items = a.items;
                    deferred.resolve(data);
                }else deferred.resolve(null);                
            }
            gapi.client.analytics.management.webproperties.list({
                 accountId: accountid
            }).execute(handleWebproperties);  
            return deferred.promise;
        };

        this.loadProfiles = function(accountid, propertyid){
            var deferred = $q.defer();
            function handleProfiles(a){
                if (a.error) deferred.reject('error');
                else if (a.items && a.items.length){
                    var data = {};
                    data.items = a.items;;
                    deferred.resolve(data);
                }else deferred.resolve(null);                
            }
           gapi.client.analytics.management.profiles.list({
               accountId: accountid,
               webPropertyId: propertyid
            }).execute(handleProfiles);
            return deferred.promise;            
        };

        this.loadColumns = function(){
            var deferred = $q.defer();
            var url = "https://www.googleapis.com/analytics/v3/metadata/ga/columns?key=" + apiKey;
            $http.get(url)
                 .success(function(result) {
                    var data = result;
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject('error');
                });
            return deferred.promise;
        };

        this.loadAnalytics = function(profileid, startdate, enddate, dimension, metric, maxresult){
            var deferred = $q.defer();
            maxresult = 25;
            function handleCoreReportingResults(a){
                if (a.error) deferred.reject('error');
                else {
                    var data = {};
                    data.rows = a.rows;
                    console.log(a.rows);
                    deferred.resolve(data);
                }               
            }
            gapi.client.analytics.data.ga.get({
                'ids': 'ga:' + profileid,
                'start-date': startdate,
                'end-date': enddate,
                'dimensions': dimension,                
                'metrics': metric,
                'max-results': maxresult
              }).execute(handleCoreReportingResults);
            return deferred.promise;                         
        };
    }]);
