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

    this.articles = [
      {
        title: 'Title #1',
        desc: 'Something good happened yesterday',
        author: 'A.O.',
        date: new Date(2018, 5, 25).toLocaleDateString(),
      },
      {
        title: 'Title #2',
        desc: 'All actions happened yesterday',
        author: 'A.O.',
        date: new Date(2018, 9, 20).toLocaleDateString(),
      }, {
        title: 'Title #3',
        desc: 'But the good act happened yesterday',
        author: 'A.O.',
        date: new Date(2018, 10, 15).toLocaleDateString(),
      },
      {
        title: 'Title #4',
        desc: 'The best solution happened yesterday',
        author: 'A.O.',
        date: new Date(2018, 8, 12).toLocaleDateString(),
      },
    ];

    this.article = {};
  }

  $onChanges(changesObj) {

  }

  openArticle(e, index, article) {
    console.log('e=', e);
    console.log('index=', index);
    console.log('article=', article);

    this.article = article;
  }

  removeTask(e, index, type) {
    e && e.stopPropagation();
    e && e.preventDefault();

    console.log(`type=${type}, index=${index}`);


    console.log('task' + type);
    console.log('this[\'task\' + type]=', this['task' + type]);
    console.log('this[\'task\' + type][index]=', this['task' + type][index]);

    this.$scope.$applyAsync(() => {
      this.tasks[index].checked = !this.tasks[index].checked;

      const opposite = type === 'Process'
        ? 'Done'
        : 'Process';
      const task = this['task' + type][index];


      this['task' + type] = this['task' + type]
        .slice(0, index).concat(this['task' + type].slice(index + 1));

      this['task' + opposite].push(task);

      console.log('task=', task);
      console.log(type + '=', this['task' + type]);
      console.log(opposite + '=', this['task' + opposite]);

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