(function() {
    'use strict';

    angular
        .module('bower2App')
        .controller('PatientDetailController', PatientDetailController);

    PatientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Patient'];

    function PatientDetailController($scope, $rootScope, $stateParams, previousState, entity, Patient) {
        var vm = this;

        vm.patient = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('bower2App:patientUpdate', function(event, result) {
            vm.patient = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
