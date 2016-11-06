(function(angular) {
	'use strict';

	angular
		.module('ExampleApp')
		.directive('twProgressSteps', TwProgressSteps);

	function TwProgressSteps() {
		return {
			controller: TwProgressStepsController,
			template:
			"<div> \
				<div ng-class='{ \
					\"p-x-steps-2\": $ctrl.steps.length === 2, \
					\"p-x-steps-3\": $ctrl.steps.length === 3, \
					\"p-x-steps-4\": $ctrl.steps.length === 4, \
					\"p-x-steps-5\": $ctrl.steps.length === 5, \
					\"p-x-steps-6\": $ctrl.steps.length === 6, \
					\"p-x-steps-7\": $ctrl.steps.length === 7, \
					\"p-x-steps-8\": $ctrl.steps.length === 8 \
				}'> \
					<div class='progress m-b-1'> \
						<div class='progress-bar' role='progressbar' \
							aria-valuenow='{{$ctrl.progressPercentage}}' aria-valuemin='0' \
							aria-valuemax='100' ng-style='{width: $ctrl.progressPercentage + \"%\"}'> \
							<span class='sr-only'>{{$ctrl.progressPercentage}}% Complete</span> \
						</div> \
					</div> \
				</div> \
				<div class='btn-group btn-group-justified steps hidden-xs hidden-sm' role='group' aria-label=''> \
					<a class='btn step' href='' role='button' \
						ng-repeat='step in $ctrl.steps' \
						ng-class='{ \
							\"btn-link-secondary\": $ctrl.step !== step.value, \
							\"btn-link\": $ctrl.step === step.value, \
							invisible: step.hidden}' \
						ng-disabled='step.disabled' \
						ng-click='$ctrl.step = step.value;'>{{step.label}}</a> \
				</div> \
				<div class='visible-xs visible-sm form-inline text-xs-center'> \
					<div style='dislay: inline-block;'> \
						<tw-select class='m-t-1' \
							style='display: inline-block;' \
							ng-model='$ctrl.step' \
							options='$ctrl.steps' \
							ng-change='$ctrl.selectStep()'></tw-select> \
					</div> \
				</div> \
			</div>",
			controllerAs: '$ctrl',
			bindToController: true,
			restrict: 'E',
			scope: {
				steps: "=",
				step: "=",
				onStepSelect: "&"
			}
		};
	}

	function TwProgressStepsController() {
		var $ctrl = this;
		var activeStep;

		init();

		$ctrl.$onChanges = function(changes) {
			/*
			if (changes.steps) {
				var activeStepNumber = getActiveStepNumber($ctrl.steps);
				$ctrl.progressPercentage = getProgressPercentageFromSteps(activeStepNumber, $ctrl.steps.length);
				$ctrl.visibleSteps = getVisibleSteps($ctrl.steps);

				$ctrl.activeStepForTwSelect = activeStep;
			}
			*/
		};

		$ctrl.selectStep = function(step) {
			/*
			var newStep = step ? step: $ctrl.activeStepForTwSelect;
			var newIndex = $ctrl.visibleSteps.indexOf(step);

			if (newIndex > stepsVisibleUpTo) {
				stepsVisibleUpTo = newIndex + 1;
			}

			$ctrl.onStepSelect({step: newStep});
			*/
		};

		function init() {
			if (!$ctrl.step && $ctrl.steps && $ctrl.steps.length > 0) {
				$ctrl.step = $ctrl.steps[0];
			}
			$ctrl.progressPercentage = getProgressPercentageFromSteps($ctrl.steps);
		}

		function getProgressPercentageFromSteps(steps) {
			if (!steps || steps.length < 2) {
				return 0;
			}

			var activeStepNumber = getActiveStepIndex($ctrl.steps, $ctrl.step);
			if (!activeStepNumber) {
				return 0;
			}

			var stepCount = steps.length;
			var stepPercentage = 100 * (activeStepNumber / (stepCount - 1));
			console.log(stepPercentage);
			return Math.round(stepPercentage);
		}

		function getActiveStepIndex(steps, activeStep) {
			for(var i=0; i<steps.length; i++) {
				if (steps[i].value === activeStep) {
					return i;
				}
			}
			return 0;
		}
	}


})(window.angular);
