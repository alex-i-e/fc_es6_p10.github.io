import angular from 'angular';
import APP_MODULE_NAME from './app.module';

export class AppController {

  // public static $inject = ['$scope']; // configure angular di
  static get $inject() {
    return ['$scope', '$http'];
  }

  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;

  }

  $onInit() {
    this.$http.get("./source/tasks.json").then(data => {
      console.log('data=', data);
    });


    this.tasks = [ // TODO : throught the service
      {
        description: 'Task #44',
        expiredDate: new Date(2018, 1, 30).toLocaleDateString('en-EN'),
        checked: false,
      },
      {
        description: 'Task #456',
        expiredDate: new Date(2018, 2, 28).toLocaleDateString('en-EN'),
        checked: false,
      },
      {
        description: 'Task #123',
        expiredDate: new Date(2018, 3, 25).toLocaleDateString('en-EN'),
        checked: false,
      },
    ];

    this.taskProcess = [ // TODO : throught the service
      {
        description: 'Task #44',
        expiredDate: new Date(2018, 1, 30).toLocaleDateString('en-EN'),
        checked: false,
      },
      {
        description: 'Task #456',
        expiredDate: new Date(2018, 2, 28).toLocaleDateString('en-EN'),
        checked: false,
      },
      {
        description: 'Task #123',
        expiredDate: new Date(2018, 3, 25).toLocaleDateString('en-EN'),
        checked: false,
      },
    ];
    this.taskDone = [];
  }

  $onChanges(changesObj) {

  }

  removeTask(e, index, type) {
    e && e.stopPropagation();
    e && e.preventDefault();

    this.$scope.$applyAsync(() => {
      this.tasks[index].checked = !this.tasks[index].checked;
      
      const opposite = type === 'Process'
        ? 'Done'
        : 'Process';
      const task = this['task' + type][index];


      this['task' + type] = this['task' + type]
        .slice(0, index).concat(this['task' + type].slice(index + 1));

      this['task' + opposite].push(task);

      console.log('direct=', this['task' + type]);
      console.log('opposite=', this['task' + opposite]);

    });
  }

  removeTaskProcess(e, index) {
    e && e.stopPropagation();
    e && e.preventDefault();

    this.$scope.$applyAsync(() => {

      const task = this.taskProcess[index];

      this.taskProcess = this.taskProcess
        .slice(0, index).concat(this.taskProcess.slice(index + 1));
      this.taskDone.push(task);

    });
  }

  onFormSubmit(item) {
    this.tasks.push(item);
  }
}

angular.module(APP_MODULE_NAME).component('app', {
  template: require('./app.html'),
  controller: AppController,
});