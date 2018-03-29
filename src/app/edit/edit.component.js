import angular from 'angular';
import APP_MODULE_NAME from '../app.module';

export class EditController {

  constructor() {

  }

  $onInit() {
    if (this.article && this.article.title) {

      this.title = this.article.title || '';
      this.desc = this.article.desc || '';
      this.author = this.article.author || '';
      this.date = this.article.date || '';
    }
  }

  $onChanges(changesObj) {

  }

  onSubmit(e) {
    // e && e.preventDefault();
    e && e.stopPropagation();

    this.articles.push({
      title: this.title,
      desc: this.desc,
      author: this.author,
      date: this.date.toLocaleDateString('en-EN'),
    });

    this.clearFields();

  }

  onArticleChange() {
    this.article.title = this.title || '';
    this.article.desc = this.desc || '';
    this.article.author = this.author || '';
    this.article.date = this.date || '';
  }

  clearFields() {
    this.title = '';
    this.desc = '';
    this.author = '';
    this.date = '';
  }
}


angular.module(APP_MODULE_NAME).component('editApp', {
  template: require('./edit.component.html'),
  controller: EditController,
  bindings: {
    callbackOnSubmit: '&',
    articles: '=',
    article: '=',
  },
});