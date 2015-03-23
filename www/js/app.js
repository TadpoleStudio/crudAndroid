// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('sign-in', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'DashCtrl'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.customer', {
                url: '/customer',
                views: {
                    'tab-customers': {
                        templateUrl: 'templates/tab-customers.html',
                        controller: 'CustomerController'
                    }
                }
            })
            .state('tab.sms', {
                url: '/sms',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-sms.html',
                        controller: 'SmsCtrl'
                    }
                }
            })
            .state('tab.sms-template-detail', {
                url: '/smsTemplate/:smsTemplateId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/smsTemplate-detail.html',
                        controller: 'SmsTemplateDetailCtrl'
                    }
                }
            })
            .state('tab.customer-detail', {
                url: '/customer/:customerId',
                views: {
                    'tab-customers': {
                        templateUrl: 'templates/customer-detail.html',
                        controller: 'CustomerDetailController'
                    }
                }
            })

            .state('tab.customer-mgr', {
                url: '/customer/mgr/:customerId',
                views: {
                    'tab-customers': {
                        templateUrl: 'templates/customer-mgr.html',
                        controller: 'CustomerMgrController'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sign-in');
        $ionicConfigProvider.tabs.position('bottom');
    });
