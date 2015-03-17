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
    .controller('CustomerMgrController', function ($scope, CustomerService, $stateParams, $state, $cordovaFile) {

        $scope.customer = null;
        var customerId = $stateParams.customerId;
        if (customerId == 'new') {
            $scope.customer = new Customer();
            $scope.customer.avatar = 'http://192.168.146.1:8080/crud/public/a2.png';
            $scope.customer.sex = 'Male';
        } else {
            CustomerService.get($scope, customerId);
        }
        $scope.saveOrUpdateCustomer = function () {
            CustomerService.save($scope, $state, customerId);
        };

        //$scope.uploadCustomerPicture = function () {
        //    var options = {
        //        fileKey: "avatar",
        //        fileName: "image.png",
        //        chunkedMode: false,
        //        mimeType: "image/png"
        //    };
        //    $cordovaFile.uploadFile("http://192.168.146.1:8080/crud/customer/fileUpload", "/android_asset/www/img/ionic.png", options).then(function (result) {
        //        console.log("SUCCESS: " + JSON.stringify(result.response));
        //    }, function (err) {
        //        console.log("ERROR: " + JSON.stringify(err));
        //    }, function (progress) {
        //        // constant progress updates
        //    });
        //
        //};
    })
    .controller('CustomerController', function ($scope, $state, $rootScope, CustomerService) {

        $scope.customers = null;

        CustomerService.loadAllCustomers($scope);

        $rootScope.$on('customer_saved_event', function (event, data) {

            var type = data.type;
            var customer = data.customer;

            if (type == 'new') {
                $scope.customers.push(customer);
            } else {

                for (var i = 0; i < $scope.customers.length; i++) {
                    if ($scope.customers[i].id === parseInt(type)) {
                        $scope.customers[i] = customer;
                    }
                }
            }
        });

        $scope.remove = function () {
            alert('todo');
        };

        $scope.edit = function (customerId) {
            $state.go('tab.customer-mgr', {customerId: customerId});
        };

        $scope.inputValue = null;
        $scope.searchCustomers = function (inputValue) {
            CustomerService.searchCustomers($scope, inputValue);
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