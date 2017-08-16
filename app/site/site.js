/**
 * Created by ZhangYaoYao on 2017/8/14.
 */
angular.module('myApp.site', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('home.site', {
                url: '',
                templateUrl: 'site/site.html',
                controller: 'siteCtrl'
            })
            .state('home.site.list', {
                url: '/site',
                templateUrl: 'site/siteList.html',
                controller: 'siteCtrl'
            })
            .state('home.site.detail', {
                url: '/site/detail/:id',
                templateUrl: 'site/siteDetail.html',
                controller: 'siteCtrl'
            })
    }])
    .controller('siteCtrl',function ($scope,$http,$stateParams,$sce) {
        $scope.getSiteList = function () {
            $http.get('./json/site.json')
                .success(function (data) {
                    $scope.sites = data;
                })
        };
        $scope.getSiteDetail = function () {
            var id = $stateParams.id;
            $http.get('./json/site.json')
                .success(function (data) {
                    for(var i=0;i<data.length;i++){
                        if(data[i].id === id){
                            $scope.site = data[i];
                            $scope.article =$sce.trustAsHtml($scope.site.article);
                        }
                    }
                })
        };
    });