angular.module('starter.controllers', [])
    .constant('serverRoot', 'http://loters.vicp.cc/crud/rest')

    .controller('DashCtrl', function ($scope, $state) {
        $scope.signIn = function (user) {
            $state.go('tab.customer');
            $scope.$emit('customer_list_refresh');
        };
    })

    .controller('SmsCtrl', function ($scope, SmsTemplateService, $rootScope, $state) {
        $scope.smsTemplateList = [];
        $scope.remove = function (smsTemplate) {
            SmsTemplateService.remove(smsTemplate, $scope);
        };
        $rootScope.$on('sms_template_list_loaded', function (event, data) {
            $scope.smsTemplateList = data.smsTemplateList;
        });

        $rootScope.$on('smsTemplate_delete_event', function (event, data) {
            var smsTemplateId = data.smsTemplateId;
            for (var i = 0; i < $scope.smsTemplateList.length; i++) {
                if ($scope.smsTemplateList[i].id === parseInt(smsTemplateId)) {
                    $scope.smsTemplateList.splice(i, 1);
                }
            }
        });

        $rootScope.$on('smsTemplate_saved_event', function (event, data) {

            var smsTemplateId = data.type;
            var smsTemplate = data.smsTemplate;

            if (smsTemplateId && smsTemplateId == 'new') {
                $scope.smsTemplateList.push(smsTemplate);
            } else {
                for (var i = 0; i < $scope.smsTemplateList.length; i++) {
                    if ($scope.smsTemplateList[i].id === parseInt(smsTemplateId)) {
                        $scope.smsTemplateList[i] = smsTemplate;
                    }
                }
            }
        });

        SmsTemplateService.loadAll($scope);
    })

    .controller('SmsTemplateDetailCtrl', function ($scope, $stateParams, $ionicHistory, $rootScope, SmsTemplateService, $state) {

        var smsTemplateId = $stateParams.smsTemplateId;
        $scope.smsTemplate = null;

        if (smsTemplateId && smsTemplateId == 'new') {
            $scope.smsTemplate = new SmsTemplate();
        } else {
            SmsTemplateService.loadSingleTemplate($scope, smsTemplateId);
        }
        $scope.goBackToList = function () {
            $ionicHistory.goBack();
        };

        $scope.saveOrUpdateSmsTemplate = function (smsTemplate) {
            SmsTemplateService.save($scope, $state, smsTemplateId, smsTemplate);

        };
    })

    .controller('SendSmsController', function ($scope, $stateParams, $ionicHistory, $rootScope, SmsTemplateService, $state) {
        $scope.smsTemplate = {};

        $scope.sendSingleSms = function (selectedName) {
            alert("Messages was sent.");
        };

        $scope.goToTemplateList = function () {
            $state.go('load-sms-template-names');
        };

        $rootScope.$on('sms-template-selected-event', function (event, data) {
            var template = data.smsTemplate;
            console.debug(template);
            $scope.smsTemplate = template;
        });

        $scope.clearText = function() {
            if($scope.smsTemplate && $scope.smsTemplate.content) {
                $scope.smsTemplate.content = '';
            }
        };
        SmsTemplateService.loadAll($scope);
    })

    .controller('SmsDropDownController', function ($scope, $stateParams, $ionicHistory, $rootScope, SmsTemplateService, $state) {
        $scope.smsTemplateList = [];
        $rootScope.$on('sms_template_list_loaded', function (event, data) {
            $scope.smsTemplateList = data.smsTemplateList;
        });
        SmsTemplateService.loadAll($scope);

        $scope.selectTemplate = function (template) {
            $rootScope.$emit('sms-template-selected-event', {smsTemplate: template});
            $state.go('sms-load-send-single-sms-page');
        }
    })

    .controller('AccountCtrl', function ($scope, $state) {
        $scope.settings = {
            enableFriends: true
        };

        $scope.logout = function () {
            $state.go('sign-in');
        }
    })
    .controller('CustomerMgrController', function ($scope, CustomerService, $stateParams, $state) {
//, $cordovaFile
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

        $scope.uploadCustomerPicture = function () {

            var formData = new FormData();
            formData.append('file', 'f');
            var options = {
                fileKey: "avatar",
                fileName: "image.png",
                chunkedMode: false,
                mimeType: "image/png"
            };
            console.debug("t");
            //$cordovaFile.uploadFile("http://192.168.146.1:8080/crud/rest/customer/fileUpload", "/android_asset/www/img/ionic.png", options).then(function (result) {
            //    console.log("SUCCESS: " + JSON.stringify(result.response));
            //}, function (err) {
            //    console.log("ERROR: " + JSON.stringify(err));
            //}, function (progress) {
            //    // constant progress updates
            //});

        };
    })
    .controller('CustomerController', function ($scope, $state, $rootScope, CustomerService) {

        $scope.customers = null;

        $rootScope.$on('customer_list_refresh', function () {
            CustomerService.loadAllCustomers($scope);
        });

        $scope.$emit('customer_list_refresh');

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

        $scope.loadSentTextPage = function(customer) {
            $state.go('sms-load-send-single-sms-page');
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