/*
Task Module
============
*/
var module = angular.module('App.Task', ['App.Project', 'ui.router'])

module.config( ($stateProvider) => {

  $stateProvider.state( 'tasks', {
    parent: 'project',
    url: '/tasks',
    templateUrl: 'modules/Task/Tasks.html',
    controller: 'Tasks',
    resolve: {
      tasks: (Task, $http, project) => {
        return $http.get('/api/tasks', { params: { project_id: project.id } }).then( (response) => {
          return response.data.map( (task) => {
            return new Task(task);
          });
        });
      }
    }
  });

  $stateProvider.state( 'tasks.new', {
    url: '/new', // /projects/:projectId/tasks/new (state must be defined BEFORE /:taskId)
    resolve: {
      task: (project) => {
        return project.newTask();
      }
    },
    templateUrl: 'modules/Task/Form.html',
    controller: 'TaskForm'
  });
  $stateProvider.state( 'task', {
    parent: 'tasks',
    url: '/:taskId', // /projects/:projectId/tasks/:taskId (state must be defined AFTER /new)
    views: {
      '': { // Projects.html: <ui-view></ui-view>
        templateUrl: 'modules/Task/Task.html',
        controller: 'Task'
      },
      'header@project': { // Project/Project.html: <ui-view name="header"></ui-view>
        templateUrl: 'modules/Task/TaskHeader.html',
        controller: 'TaskHeader'
      }
    },
    resolve: {
      task: (project, $stateParams) => {
        return project.getTask($stateParams.taskId);
      }
    },
    onEnter: (task) => {
      task.open();
    },
    onExit: (task) => {
      task.close();
    }
  });

  $stateProvider.state( 'task.edit', {
    templateUrl: 'modules/Task/Form.html',
    controller: 'TaskForm'
  });
});

module.controller( 'Tasks', ($scope, tasks, project) => {
  $scope.tasks = tasks;
  $scope.tasks = project;
});


module.controller( 'Task', ($scope, task) => {
  $scope.task = task;
});

module.controller( 'TaskHeader', ($scope, task, project) => {
  $scope.tasks = project;
  $scope.task = task;
});

module.controller( 'TaskForm', ($scope, task) => {
  // injected `task` is either a new object or an existing object
  $scope.task = task;
});

module.factory( 'Task', (BaseObject, $http) => {
  class Task extends BaseObject {
    create() {
      return $http.post('/api/tasks', this).then( (response) =>
        this.id = response.data.id;
        return response.data;
      });
    }

    update() {
      return $http.put('/api/tasks/' + this.id);
    }
  }
  return Task;
});
