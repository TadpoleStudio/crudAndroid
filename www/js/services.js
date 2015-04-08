angular.module('starter.services', [])
    .factory('SmsTemplateService', function ($http, basicURL) {
        return {
            loadAll: function ($scope) {
                $http({
                    url: basicURL + 'smsTemplate/all'
                }).success(function (response, status, headers, config) {

                    $scope.$emit('sms_template_list_loaded', {smsTemplateList: response});

                }).error(function (response, status, headers, config) {

                    $scope.$emit('sms_template_list_loaded', {smsTemplateList: null});
                });
            },

            loadSingleTemplate: function ($scope, smsTemplateId) {
                $http({
                    url: basicURL + 'smsTemplate/' + smsTemplateId
                }).success(function (response, status, headers, config) {

                    // $scope.$emit('sms_template_list_loaded', {smsTemplateList: response});
                    $scope.smsTemplate = response;

                }).error(function (response, status, headers, config) {

                    alert(response);
                });
            },
            remove: function (smsTemplate, $scope) {

                var smsTemplateId = smsTemplate.id;
                $http({
                    method: 'POST',
                    url: basicURL + 'smsTemplate/delete/' + smsTemplateId
                }).success(function (response, status, headers, config) {

                    $scope.$emit('smsTemplate_delete_event', {smsTemplateId: smsTemplateId});
                }).error(function (response, status, headers, config) {
                    alert(response);
                });
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            },

            save: function ($scope, $state, smsTemplateId, smsTemplate) {

                $http({
                    method: 'POST',
                    url: basicURL + 'smsTemplate/save/',
                    data: smsTemplate
                }).success(function (response, status, headers, config) {

                    $scope.$emit('smsTemplate_saved_event', {type: smsTemplateId, smsTemplate: response});
                    $state.go('tab.sms');

                }).error(function (response, status, headers, config) {
                    alert(response);
                    $scope.smsTemplate = null;
                });
            }
        };
    })
    .factory('CustomerService', function ($http, basicURL) {
        return {
            get: function ($scope, customerId) {
                $http({
                    method: 'GET',
                    url: basicURL + 'customer/' + customerId
                }).success(function (response, status, headers, config) {

                    $scope.customer = response;

                }).error(function (response, status, headers, config) {

                    $scope.customer = null;
                });
            },

            loadAllCustomers: function ($scope) {

                $http({
                    method: 'GET',
                    url: basicURL + 'customer/all'
                }).success(function (response, status, headers, config) {
                    $scope.customers = response;

                }).error(function (response, status, headers, config) {
                    $scope.customers = null;
                });

            },

            refreshCustomerList: function ($scope) {
                this.loadAllCustomers($scope);
                $scope.$broadcast('scroll.refreshComplete');

            },
            searchCustomers: function ($scope, inputValue) {
                $http({
                    method: 'GET',
                    url: basicURL + 'customer/search?queryParam=' + inputValue
                }).success(function (response, status, headers, config) {
                    $scope.customers = response;

                }).error(function (response, status, headers, config) {
                    $scope.customers = null;
                });

            },
            save: function ($scope, $state, customerId) {
                $http({
                    method: 'POST',
                    url: basicURL + 'customer/save/',
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
