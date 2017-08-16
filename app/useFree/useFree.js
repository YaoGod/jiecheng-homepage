/**
 * Created by ZhangYaoYao on 2017/8/15.
 */
angular.module('myApp.useFree', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('use', {
                url: '/useFree',
                templateUrl: 'useFree/test.html',
                controller: 'useCtrl'
            })
    }])
    .controller('useCtrl',function ($scope) {
        console.log('答题');
    });