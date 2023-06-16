// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract TodoList {
    event TaskCreated(uint id, string content, bool completed);
    event TaskCompleted(uint id, bool completed);

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

        taskCount++;
    }

    function toggleCompleted(uint _id) public {
        Task memory task = tasks[_id];

        task.completed = !task.completed;

        tasks[_id] = task;

        emit TaskCompleted(_id, task.completed);
    }
}
