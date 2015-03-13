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

    .controller('CustomerController', function ($scope, CustomerService) {

        $scope.customers = null;
        $scope.currentCustomer = null;
        CustomerService.loadAllCustomers($scope);

        $scope.remove = function() {
            alert('todo');
        }
    })

    .controller('CustomerDetailController', function ($scope, $stateParams, CustomerService) {
        $scope.customer = null;
        CustomerService.get($scope, $stateParams.customerId);
    })
    .controller('MyCtrl', function ($scope, $ionicHistory) {
        $scope.myGoBack = function () {
            $ionicHistory.goBack();
        }
    });