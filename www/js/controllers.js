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
    .controller('CustomerMgrController', function ($scope, CustomerService, $stateParams) {

        function Customer() {
            var self = this;
            self.id = '';
            self.name = null;
            self.phone = null;
            self.fixedPhone = null;
            self.address = null;
            self.sex = null;
            self.birthday = null;
            self.avatar = null;
        }

        $scope.customer = null;
        var customerId = $stateParams.customerId;


        if (customerId == 'new') {
            $scope.customer = new Customer();
        } else {
            CustomerService.get($scope, customerId);
        }
        $scope.saveOrUpdateCustomer = function () {
            var customer = JSON.stringify($scope.customer);
            CustomerService.save($scope, customer);
        };
    })
    .controller('CustomerController', function ($scope, $state, CustomerService) {

        $scope.customers = null;
        $scope.currentCustomer = null;
        CustomerService.loadAllCustomers($scope);

        $scope.remove = function () {
            alert('todo');
        };

        $scope.edit = function (customerId) {
            $state.go('tab.customer-mgr', {customerId: customerId});
        };
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