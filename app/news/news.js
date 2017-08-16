/**
 * Created by ZhangYaoYao on 2017/8/14.
 */
angular.module('myApp.news', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('home.news', {
                url: '',
                templateUrl: 'news/news.html',
                controller: 'newsCtrl'
            })
            .state('home.news.list', {
                url: '/news',
                templateUrl: 'news/newsList.html',
                controller: 'newsCtrl'
            })
            .state('home.news.detail', {
                url: '/detail/:id',
                templateUrl: 'news/newsDetail.html',
                controller: 'newsDetailCtrl'
            })
    }])
    .controller('newsCtrl',function ($scope,$http) {
        $http.get('./json/news.json')
            .success(function (data) {
                $scope.newsList = data;
            });
    })
    .controller('newsDetailCtrl',function ($scope,$http,$stateParams,$sce) {
        $http.get('./json/news.json')
            .success(function (data) {
                $scope.news = {
                    "id": "1",
                    "title": "暂时无法显示",
                    "time": "2000/1/1",
                    "content": "暂时无法显示"
                };
                for(var i = 0;i<data.length;i++){
                    if(data[i].id === $stateParams.id){
                        $scope.news = data[i];
                    }
                }
                $scope.content = $sce.trustAsHtml($scope.news.content);
            });

    });