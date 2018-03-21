import angular from 'angular';
import APP_MODULE_NAME from '../app.module';

export class FilterByDateController {
  constructor() {
    this.expiredDate = '';
  }

  $onInit() {

  }

  $onChanges(changesObj) {
  }

  onSubmit(e) {
    e && e.preventDefault();
    e && e.stopPropagation();

    // this.callbackOnSubmit({
    //   value: {
    //     description: this.description,
    //     expiredDate: this.expiredDate,
    //     checked: false,
    //   }
    // });

    this.tasks.push({
      description: this.description,
      expiredDate: this.expiredDate.toLocaleDateString('en-EN'),
      checked: false,
    });

  }
}

angular.module(APP_MODULE_NAME).component('formApp', {
  template: require('./form.component.html'),
  controller: FilterByDateController,
  bindings: {
    callbackOnSubmit: '&',
    tasks: '=',
  },
});