(function() {
  'use strict';

  var app = angular.module('app', ['ngRoute', 'ngMaterial']);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: '../src/users.html',
        controller: 'appCtrl',
      })
      .when('/blog', {
        templateUrl: '../src/blog.html',
        controller: 'blogCtrl',
      })
      .otherwise({
        redirectTo: '/users'
      });
  });

  app.controller('appCtrl', ['$scope', '$http', '$rootScope', '$location',
    function($scope, $http, $rootScope, $location) {
      $scope.tipo = "";
      $scope.users = [];
      cargar_usuarios();
      $scope.call_post_view = function(user) {
        $rootScope.actual_user = user;
        $location.path('/blog');
      };

      function cargar_usuarios() {
        $http.get("https://jsonplaceholder.typicode.com/users").then(function(response) {
          if (response.data) {
            console.log(response.data);
            $scope.users = response.data;
          } else {}
        });
      };
    }
  ])
  app.controller('blogCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
      $scope.comentario=false;
      $scope.usuario=$rootScope.actual_user;
      $scope.cargar_mensajes = function(post) {
        $http.get("https://jsonplaceholder.typicode.com/posts/" + post.id + "/comments").then(function(response) {
          if (response) {
            console.log(response);
            $scope.messages = response.data;
          } else {
            console.log("No consiguio resultados");
          }
        });
      };
      $scope.cargando_datos = function() {
        $http.get("https://jsonplaceholder.typicode.com/posts?userId=" + $scope.usuario.id).then(function(response) {
          if (response) {
            console.log(response);
            $scope.posts = response.data;
          } else {
            console.log("No consiguio resultados");
          }
        });

      }
      $scope.cargando_datos();
    }
  ])
})();
