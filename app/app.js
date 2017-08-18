'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'ui.bootstrap',
    'myApp.home',
    'myApp.agent',
    'myApp.news',
    'myApp.site',
    'myApp.useFree'
])
    .config(['$locationProvider', '$urlRouterProvider','$stateProvider', function($locationProvider, $urlRouterProvider,$stateProvider) {

      $urlRouterProvider
          .when("", "home")
          .otherwise("home");
      $stateProvider
          .state('home', {
              url: '',
              templateUrl: 'home/header.html',
              controller: 'CarouselDemoCtrl'
          })
          .state('home.page', {
              url: '/home',
              templateUrl: 'home/home.html',
              controller: 'homeCtrl'
          })
    }])
    .controller('CarouselDemoCtrl', function ($scope ,$http,$state) {
        $scope.redirectToHome = function () {
          $state.go('home.page');
        };
        $scope.myInterval = 3500;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;
        $http.get('./assets/ad')
            .success(function (data) {
                data = data + '';
                var exp = '/assets/ad/.*\.(jpg|png)(?=")';
                var paths = [];
                var i = 0;
                do{
                    paths[i]=data.match(exp)[0];
                    data = data.replace(paths[i], '');
                    slides.push({
                        image: '.' + paths[i],
                        id: currIndex++
                    });
                    i++;
                }while(data.match(exp) !== null)

            });
    });