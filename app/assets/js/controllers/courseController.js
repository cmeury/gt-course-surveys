angular.module('surveyor').controller('CourseController',
  function ($scope, $routeParams, $window, Course, ReviewList, Notification) {
    $scope.course = Course($routeParams.id);
    $scope.course.$loaded()
      .then(function (course) {
        $scope.reviews = ReviewList(course.$id);
      })
      .catch(Notification.error);

    $scope.remove = function (review) {
      if ($window.confirm('Permanently delete this review?')) {
        $scope.reviews.$remove(review)
          .then(function () {
            Notification.success('Deleted.');
          })
          .catch(Notification.error);
      }
    };
  }
);