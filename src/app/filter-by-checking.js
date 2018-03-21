import angular from 'angular';
import APP_MODULE_NAME from './app.module';

angular.module(APP_MODULE_NAME).filter('checkedFilter', function () {

  function dateFilter(arr, isChecked) {
    return arr.filter((item) => item.checked === !!isChecked);
  };

  dateFilter.$stateful = true;

  return dateFilter;
});