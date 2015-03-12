angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope, CustomerService) {
        $scope.settings = {
            enableFriends: true
        };
        $scope.customer = null;
        CustomerService.showCustomer($scope);
    })
    .controller('ContentController', function ($scope, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    })
    .controller('CustomerController', function () {

    })
    .controller('MyCtrl', function ($scope, $ionicHistory) {
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
    });