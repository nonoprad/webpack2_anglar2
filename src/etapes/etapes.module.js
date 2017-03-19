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


    $scope.boutons =[
        { id : 1, libelle : 'Etape 1', selected : true },
        { id : 2, libelle : 'Etape 2', selected : false },
        { id : 3, libelle : 'Etape 3', selected : false },
        { id : 4, libelle : 'Etape 4', selected : false },
        { id : 5, libelle : 'Etape 5', selected : false }
    ]


    window.onscroll = angular.bind(this, function() {
        $scope.showEtapes = true;
        angular.forEach($scope.boutons,function(bouton){
            var offsetFromElement = elmYPosition(bouton.id) - currentYPosition();
            bouton.selected =  !(offsetFromElement < -300 || offsetFromElement >= 300);
        });


        setTimeout(function(){


            $scope.showEtapes = false;
            $scope.$digest();
        },3800);


        $scope.$digest();
    });

    let elmYPosition = function(eID) {
        var elm = document.getElementById("pannel_"+eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }



    let currentYPosition = function () {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }


    $scope.scrollTo = function(bouton) {
        let eID = bouton.id;
        bouton.selected = true;
        angular.forEach($scope.boutons,function(occurence){
           if (bouton.id != occurence.id){
               occurence.selected= false;
           }
        });
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




    };

});