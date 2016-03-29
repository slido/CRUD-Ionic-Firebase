//main wrap da se ne poluta global namespace
(function(){

var app = angular.module('queup', ['ionic','angularMoment','firebase']);

app.config(function($stateProvider,$urlRouterProvider){

  $stateProvider.state('queue',{
    url:'/queue',
    templateUrl:'templates/queue.html'
  });

  $stateProvider.state('edit',{
    url:'/edit/:personId',
    controller:'EditController',
    templateUrl:'templates/edit.html'
  });

  $stateProvider.state('add',{
    url:'/add',
    controller:'AddController',
    templateUrl:'templates/edit.html'
  });

  $urlRouterProvider.otherwise('/queue');

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('QueueController', function($scope,Queue,$state){
  $scope.queue = Queue;
/*
  $scope.queue.$loaded(function(){
    if($scope.queue.length === 0){
      $scope.queue.$add({
        name:'David Cai',
        status:'Added to queue',
        updatedTime:Firebase.ServerValue.TIMESTAMP
      });
      $scope.queue.$add({
        name:'Denis Koletić',
        status:'Added to queue',
        updatedTime:Firebase.ServerValue.TIMESTAMP
      });
    }
  });
  */

  $scope.add = function(){
    $state.go('add');
  };

  $scope.delete = function(person){
    //queueService.deletePerson(personId);
    Queue.$remove(person);
  };

});

app.controller('EditController', function($scope,$state,Queue){
  var person = Queue.$getRecord($state.params.personId);
  //$scope.person = angular.copy(queueService.getPerson($state.params.personId));
 $scope.person = angular.copy(person);


 //console.log($scope.person);
  $scope.save = function(){
  //  queueService.updatePerson($scope.person);
    //$state.go('queue');
    person.name = $scope.person.name;
    person.status = $scope.person.status;
    person.updatedTime = Firebase.ServerValue.TIMESTAMP;
    Queue.$save(person);
    $state.go('queue');
  }

  $scope.delete = function(){
  //  queueService.deletePerson($scope.person.id);
      //$state.go('queue');
      Queue.$remove(person);
      $state.go('queue');
    };
});

app.controller('AddController', function($scope,$state,Queue){
  $scope.person = {
    name:'',
    status:'waiting in queue'
  };
$scope.save = function(){
//  queueService.addPerson($scope.person);
  //$state.go('queue');
  $scope.person.updatedTime = Firebase.ServerValue.TIMESTAMP;
  Queue.$add($scope.person);
  $state.go('queue');
}

});


})();
