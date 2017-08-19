angular.module('passhash', ['ui.bootstrap'])
    .controller('passhash', function ($scope, $document) {
        $scope.savedName = '';
        $scope.savedKeys = Object.keys(localStorage);

        this.load = function (key) {
            $scope.gen = JSON.parse(localStorage.getItem(key));
        };
        this.save = function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
            $scope.savedKeys = Object.keys(localStorage);
        };
        this.remove = function (key) {
            localStorage.removeItem(key);
            $scope.savedKeys = Object.keys(localStorage);
            $scope.savedName = '';
        };
        this.clear = function () {
            localStorage.clear();
            $scope.savedKeys = [];
            $scope.savedName = '';
        };

        this.hash = function () {
            $scope.hash = PassHashCommon.generateHashWord(
                $scope.gen.tag + ($scope.gen.version > 0 ? ':' + $scope.gen.version : ''),
                $scope.gen.masterKey,
                $scope.gen.size,
                $scope.gen.digit,
                $scope.gen.punctuation,
                $scope.gen.mixedCase,
                $scope.gen.restrictSpecial,
                $scope.gen.restrictDigits
            );
        };

        this.reset = function () {
            $scope.savedName = '';
            $scope.hash = '';
            $scope.gen = {
                tag: '',
                version: 0,
                masterKey: '',
                size: 16,
                digit: true,
                punctuation: true,
                mixedCase: true,
                restrictSpecial: false,
                restrictDigits: false
            };
        };
        this.bump = function (amount) { $scope.gen.version = Math.max($scope.gen.version + amount, 0); };
        this.copy = function () {
            if(angular.isDefined(window.cordova)) {
                console.log('Using cordova device api to copy passhash');
                window.cordova.plugins.clipboard.copy($scope.hash);
            } else {
                console.log('Selecting hash instead.');
                $document[0].getElementById('hash').select();
            }
        };
        this.reset();
    })
;
