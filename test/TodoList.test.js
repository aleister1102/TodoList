const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', () => {
	let todoList;
	before(async () => {
		todoList = await TodoList.deployed()
	})

	it('deploys successfully', async () => {
		const address = await todoList.address
		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})

	it('lists tasks', async () => {
		const taskCount = await todoList.taskCount()
		const taskId = taskCount.toNumber() - 1
		const task = await todoList.tasks(taskId)
		assert.equal(task.id.toNumber(), taskId)
		assert.equal(task.content, 'Do exercises!')
		assert.equal(task.completed, false)
		assert.equal(taskCount.toNumber(), 1)
	})

	it('creates task', async () => {
		const result = await todoList.createTask('A new task')
		const taskCount = await todoList.taskCount()
		assert.equal(taskCount, 2)
		const taskId = taskCount.toNumber() - 1
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(), taskId)
		assert.equal(event.content, 'A new task')
		assert.equal(event.completed, false)
	})

	it('toggles task completion', async () => {
		const result = await todoList.toggleCompleted(0)
		const task = await todoList.tasks(0)
		assert.equal(task.completed, true)
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(), 0)
		assert.equal(event.completed, true)
	})

	it('delete task', async () => {
		const taskCountBefore = await todoList.taskCount()
		const result = await todoList.deleteTask(0)
		const taskCountAfter = await todoList.taskCount()
		// Number of tasks after deleting should be less than before
		assert.equal(taskCountAfter < taskCountBefore, true)
		// Event should be emitted
		const event = result.logs[0].args
		assert.equal(event.id.toNumber(), 0)
		assert.equal(event.content, 'Do exercises!')
		assert.equal(event.completed, true)
	})
})
