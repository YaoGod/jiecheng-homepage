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
    .controller('useCtrl',function ($scope,$http,$state) {
        $scope.subjects = [];
        $scope.page = 0;
        $scope.isShowAns = true;
        $scope.isShowAnsTip = true;
        $scope.isPlayMp3 = true;
        $scope.isShowAnsExp = true;
        $scope.myChoose = [];
        $scope.rightArray = [];
        $scope.wrongSubjects=[];
        $scope.right = 0;
        $scope.wrong =0;
        $scope.summary= 0;
        $scope.isHideWin = true;
        $http.get('./json/subjectData.json')
            .success(function (data) {
               $scope.subjects = data;
               $scope.subject = $scope.subjects[0];
               document.getElementById('audio1').src ='../assets/video/'+$scope.subject.voice;
            });
        $scope.pagePre = function () {
            if($scope.page > 0){
                $scope.page--;
                console.log($scope.page);
                $scope.subject =  $scope.subjects[$scope.page];
                $scope.myChoose = [];
                document.getElementById('audio1').src ='../assets/video/'+$scope.subject.voice;
            }
        };
        $scope.pageNext = function () {
            if($scope.page < $scope.subjects.length -1){
                $scope.page++;
                $scope.subject =  $scope.subjects[$scope.page];
                $scope.myChoose = [];
                document.getElementById('audio1').src ='../assets/video/'+$scope.subject.voice;
            }else{
            }
        };
        $scope.answerSubject = function (option) {
            if($scope.subject.answer.length === 1){
                //单选 判断
                $scope.myChoose[0] = option;
                if($scope.subject.answer[0].name==$scope.myChoose[0]){
                    //答案正确
                    $scope.rightArray[$scope.page] = true;
                }else{
                    //答案错误
                    $scope.rightArray[$scope.page] = false;
                    if($scope.isPlayMp3 === true){
                        document.getElementById('audio1').play();
                    }
                }
                $scope.right = 0;
                $scope.wrong =0;
                $scope.summary=0;
                for(var i=0;i<$scope.rightArray.length;i++){
                    if($scope.rightArray[i] === true){
                        $scope.right++;
                        $scope.summary += $scope.subjects[i].value;
                    }
                    else if($scope.rightArray[i] === false){
                        $scope.wrong++;
                    }
                }
                if($scope.isShowAnsExp === true){
                    $scope.isHideWin = $scope.rightArray[$scope.page];
                }
            }
            else {
                //多选
                if ($scope.myChoose.length > 0) {
                    for (var i = 0; i < $scope.myChoose.length; i++) {
                        if ($scope.myChoose[i] === option) {
                            //删除选项操作
                        } else {
                            $scope.myChoose.push(option);
                            console.log($scope.myChoose);
                        }
                    }
                } else {
                    $scope.myChoose.push(option);
                }
            }

        };
        $scope.gridClass = function (i) {
            if($scope.rightArray[i] === true){
                return "Y";
            }
            else if($scope.rightArray[i] === false){
                return "N";
            }
        };
        $scope.playPause = function(){
            var myAudio = document.getElementById('audio1');
            if(myAudio.paused){
                myAudio.play();
            }else{
                myAudio.pause();
            }
        };
        $scope.doWrongSubjects = function () {
            if($scope.wrong === 0){
                alert("您现在没有错题。");
            }
            else {
                var r = confirm("您将要重做" + $scope.wrong + "道错题，是否继续进行？");
                if (r) {
                    for (var i = 0; i < $scope.rightArray.length; i++) {
                        if ($scope.rightArray[i] === false) {
                            $scope.wrongSubjects.push($scope.subjects[i]);
                        }
                    }
                    $scope.subjects = $scope.wrongSubjects;
                    $scope.subject = $scope.subjects[0];
                    $scope.page = 0;
                    $scope.myChoose = [];
                    $scope.rightArray = [];
                    $scope.wrongSubjects = [];
                    $scope.right = 0;
                    $scope.wrong = 0;
                    $scope.isHideWin = true;
                }
            }
        };
        $scope.closeWin =function () {
            $scope.isHideWin = true;
        };
        $scope.submit =function () {
            alert("总分："+$scope.summary);
            $state.go("home.page");
        };
    });