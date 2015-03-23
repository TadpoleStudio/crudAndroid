angular.module('starter.services', [])

    .factory('SmsTemplate', function ($http) {
        return {
            loadAll: function ($scope) {
                $http({
                    url: 'http://192.168.146.1:8080/crud/rest/smsTemplate/all'
                }).success(function (response, status, headers, config) {

                    console.debug(response);
                    $scope.$emit('sms_template_list_loaded', {smsTemplateList: response});

                }).error(function (response, status, headers, config) {

                    $scope.$emit('sms_template_list_loaded', {smsTemplateList: null});
                });
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('CustomerService', function ($http) {
        return {
            get: function ($scope, customerId) {
                $http({
                    method: 'GET',
                    url: 'http://192.168.146.1:8080/crud/rest/customer/' + customerId
                }).success(function (response, status, headers, config) {

                    $scope.customer = response;

                }).error(function (response, status, headers, config) {

                    $scope.customer = null;
                });
            },

            loadAllCustomers: function ($scope) {

                $http({
                    method: 'GET',
                    url: 'http://192.168.146.1:8080/crud/rest/customer/all'
                }).success(function (response, status, headers, config) {
                    $scope.customers = response;

                }).error(function (response, status, headers, config) {
                    $scope.customers = null;
                });

            },
            searchCustomers: function ($scope, inputValue) {
                $http({
                    method: 'GET',
                    url: 'http://192.168.146.1:8080/crud/rest/customer/search?queryParam=' + inputValue
                }).success(function (response, status, headers, config) {
                    $scope.customers = response;

                }).error(function (response, status, headers, config) {
                    $scope.customers = null;
                });

            },
            save: function ($scope, $state, customerId) {
                $http({
                    method: 'POST',
                    url: 'http://192.168.146.1:8080/crud/rest/customer/save/',
                    data: $scope.customer
                }).success(function (response, status, headers, config) {

                    $scope.customer = response;

                    $scope.$emit('customer_saved_event', {type: customerId, customer: response});

                    $state.go('tab.customer');

                }).error(function (response, status, headers, config) {

                    $scope.customers = null;
                });

            }
        }
    });
