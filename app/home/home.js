/**
 * Created by ZhangYaoYao on 2017/8/12.
 */
angular.module('myApp.home', [])

    .controller('homeCtrl',function ($scope ,$http) {
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
        $http.get('./json/news.json')
            .success(function (data) {
                $scope.newsList = data;
            });
        $scope.getSiteList = function () {
            $http.get('./json/site.json')
                .success(function (data) {
                    $scope.sites = data;
                })

        };

    });