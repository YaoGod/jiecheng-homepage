/**
 * Created by ZhangYaoYao on 2017/8/14.
 */
angular.module('myApp.agent', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('home.agent', {
                url: '',
                templateUrl: 'agent/agent.html',
                controller: 'agentCtrl'
            })
            .state('home.agent.article', {
                url: '/agent',
                templateUrl: 'agent/agentDetail.html',
                controller: 'agentCtrl'
            })
            .state('home.agent.about', {
                url: '/about',
                templateUrl: 'agent/agentDetail.html',
                controller: 'aboutCtrl'
            })
            .state('home.agent.chat', {
                url: '/chat',
                templateUrl: 'agent/agentDetail.html',
                controller: 'chatCtrl'
            })

    }])
    .controller('agentCtrl',function ($scope,$http,$sce) {
        $scope.getDetail = function () {
            $http.get("./json/article.json")
                .success(function (data) {
                    for(var i=0; i<data.length; i++){
                        if(data[i].name === "代理加盟介绍"){
                            $scope.article = data[i];
                            $scope.content = $sce.trustAsHtml(data[i].article);
                        }
                    }

                })
        };

    })
    .controller('aboutCtrl',function ($scope,$http,$sce) {
        $scope.getDetail = function () {
            $http.get("./json/article.json")
                .success(function (data) {
                    for(var i=0; i<data.length; i++){
                        if(data[i].name === "关于我们介绍"){
                            $scope.article = data[i];
                            $scope.content = $sce.trustAsHtml(data[i].article);
                        }
                    }

                })
        };

    })
    .controller('chatCtrl',function ($scope,$http,$sce) {
        $scope.getDetail = function () {
            $http.get("./json/article.json")
                .success(function (data) {
                    for(var i=0; i<data.length; i++){
                        if(data[i].name === "联系我们介绍"){
                            $scope.article = data[i];
                            $scope.content = $sce.trustAsHtml(data[i].article);
                        }
                    }

                })
        };

    });