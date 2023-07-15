// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TodoList {
    event TaskCreated(uint id, string content, bool completed);
    event TaskCompleted(uint id, string content, bool completed);
    event TaskDeleted(uint id, string content, bool completed);

    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    Task[] public tasks;

    constructor() {
        createTask("Do exercises!");
    }

    function createTask(string memory _content) public {
        Task memory newTask = Task(taskCount, _content, false);

        tasks.push(newTask);

        emit TaskCreated(taskCount, _content, false);

        taskCount = tasks.length;
    }

    function toggleCompleted(uint _id) public {
        Task memory task = tasks[_id];

        task.completed = !task.completed;

        tasks[_id] = task;

        emit TaskCompleted(_id, task.content, task.completed);
    }

    function deleteTask(uint _id) public {
        require(_id >= 0 && _id <= tasks.length - 1, "Task does not exist");

        uint lastTaskIndex = tasks.length - 1;
        Task memory lastTask = tasks[lastTaskIndex];
        Task memory deletingTask = tasks[_id];
        tasks[_id] = lastTask;
        tasks.pop();

        emit TaskDeleted(_id, deletingTask.content, deletingTask.completed);

        taskCount = tasks.length;
    }
}
