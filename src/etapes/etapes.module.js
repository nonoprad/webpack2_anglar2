import angular from 'angular';

var etapeModule = angular.module('module.etape', []);
etapeModule.directive('etapes', function(){
        return {
            restrict:'E',
            controllerDirectives: 'etapesController',
            template: require('./etapes.template.html'),
        }
    });
etapeModule.controller('etapesController', function($scope){



    window.onscroll = angular.bind(this, function() {
        $scope.showEtapes = true;
        setTimeout(function(){
            $scope.showEtapes = false;
            $scope.$digest();
        },3800);
        $scope.$digest();
    });


    function changePrimaryButton(eID){
        $scope.groups.forEach(g => g.currentClass='btn');
        $scope.groups[eID].currentClass= "btn btn-primary";

    }

    $scope.scrollTo = function(eID) {
        changePrimaryButton(eID);
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});