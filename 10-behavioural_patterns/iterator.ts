class Task {
	public id = Math.random();

	constructor(
		public title: string,
		public priority: number,
	) { }
}

class TaskList {
	private tasks: Task[] = [];

	public getTasks(): Task[] {
		return this.tasks;
	}

	public addTask(task: Task): void {
		this.tasks.push(task);
	}

	public removeTaskById(id: number): void {
		this.tasks = this.tasks.filter((item) => item.id !== id);
	}

	public getIteratorByPriority(): TaskListIterator {
		return new TaskListIterator(this);
	}

	public sortByPriority(): void {
		this.tasks = this.tasks.sort((a, b) => {
			if (a.priority > b.priority) {
				return 1;
			} else if (a.priority < b.priority) {
				return -1;
			} else {
				return 0;
			}
		});
	}
}

interface IIterator<T, V> {
	current(): T | undefined;
	prev(): T | undefined;
	next(): T | undefined;
	entitiesList: V;
	getCurrentIndex(): number;
}

class TaskListIterator implements IIterator<Task, TaskList> {
	private currentIndex = 0;

	constructor(
		public entitiesList: TaskList
	) {
		this.entitiesList.sortByPriority();
	}

	current(): Task | undefined {
		return this.entitiesList.getTasks()[this.currentIndex];
	}

	prev(): Task | undefined {
		this.currentIndex -= 1;
		return this.entitiesList.getTasks()[this.currentIndex];
	}

	next(): Task | undefined {
		this.currentIndex += 1;
		return this.entitiesList.getTasks()[this.currentIndex];
	}

	getCurrentIndex(): number {
		return this.currentIndex;
	}
}

const taskList = new TaskList();
taskList.addTask(new Task('hello', 1));
taskList.addTask(new Task('world', 3));
taskList.addTask(new Task('here', 2));
taskList.addTask(new Task('we', 5));
taskList.addTask(new Task('again', 3));

const iterator = taskList.getIteratorByPriority();
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());