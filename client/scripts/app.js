var app = angular.module('techSwapp', []);


app.controller('MainController', ['$scope', '$http', function($scope, $http){


    $scope.taskInput = '';
    $scope.taskList = [];


    $scope.taskSubmit = function(){
        //console.log('clicking submit')

    var dataToSend = {
        text: $scope.taskInput,
        complete: false
    };

        $http.post('/api/todos', dataToSend).then(function(response){
            $scope.taskList = response.data;
        });

        //console.log($scope.taskList);
        $scope.getTaskList();
    };

    $scope.deleteTask = function(taskID){
        //var id = $scope.taskList[index];
        console.log(taskID);
        $http.delete('/api/todos/' + taskID).then(function(){
            $scope.getTaskList();
            //if (err) throw err;
            //response.send(done);
        });
            //$scope.getTaskList();
    };

    $scope.getTaskList = function(){
        $http.get('/api/todos').then(function(response){
            $scope.taskList = response.data;
            //console.log($scope.taskList);
        })
    };
$scope.getTaskList();

    $scope.updateTask = function(task){
        //console.log(task.id);
        //console.log(text);
        //complete = !task.complete;
        //console.log(complete);
        $http.put('/api/todos/' + task.id, {text: task.text, complete: !task.complete, id: task.id}).then(function(response){
            $scope.getTaskList();
        });
    };

    //$scope.strikeThrough = function()







    //$("#someContainer").on('click', '.task p', function(){
//        var complete;
//        complete = !$(this).parent().data("complete");
//        var text = $(this).text().replace(" ", "+");
//        var putData = "text=" + text + "&complete=" + complete;
//
//        $.ajax({
//            type: "PUT",
//            data: putData,
//            url: "/api/todos/" + $(this).parent().data("id"),
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });








    //$("#someContainer").on('click', '.delete', function(){
//        var id = $(this).parent().data("id");
//        $.ajax({
//            type: "DELETE",
//            url: "/api/todos/" + id,
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });




}]);
//
//$(document).ready(function(){
//    $("#taskForm").submit(function(event){
//        event.preventDefault();
//        var formData = $("#taskForm").serialize();
//        formData += "&complete=false";
//        $.ajax({
//            type: "POST",
//            data: formData,
//            url: "/api/todos",
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });
//
//
//
//    $("#someContainer").on('click', '.delete', function(){
//        var id = $(this).parent().data("id");
//        $.ajax({
//            type: "DELETE",
//            url: "/api/todos/" + id,
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });
//
//    $(".get").on('click', function(){
//        getData();
//    });
//
//    getData();
//});
//

//}
//
//function appendTasks(){
//    $("#someContainer").empty();
//
//    for(var i = 0 ; i < taskData.length ; i ++){
//        $("#someContainer").append("<div class='task well col-md-3'></div>");
//        var $el = $("#someContainer").children().last();
//        $el.data("id", taskData[i].id);
//        $el.data("complete", taskData[i].complete);
//        if(taskData[i].complete){
//            $el.css("text-decoration", "line-through");
//        }
//
//        $el.append("<p class='lead'>" + taskData[i].text + "</p>");
//        $el.append("<button class='btn btn-danger delete'>X</button>");
//    }
//}
