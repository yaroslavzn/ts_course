interface IUSer {
	name: string;
	age: number;
	id: number;
}

abstract class Command {
	public id = Math.random();
	protected history: CommandHistory

	abstract execute(): void;
	abstract undo(): void;
}

class CommandHistory {
	private history: Command[] = [];

	push(command: Command) {
		this.history.push(command);
	}

	remove(command: Command) {
		this.history = this.history.filter((item) => item.id !== command.id);
	}
}

class UserService {
	private users: IUSer[] = [];

	addUser(user: IUSer) {
		this.users.push(user);
	}

	deleteUser(user: IUSer) {
		this.users = this.users.filter((item) => item.id !== user.id);
	}
}

class AddUserCommand extends Command {
	constructor(
		private payload: IUSer,
		private reciever: UserService,
		protected history: CommandHistory
	) {
		super();
	}

	execute(): void {
		this.reciever.addUser(this.payload);
		this.history.push(this);
	}

	undo(): void {
		this.reciever.deleteUser(this.payload);
		this.history.remove(this);
	}
}

class UserController {
	private history = new CommandHistory();
	private reciever = new UserService();

	run() {
		const user: IUSer = {
			name: 'John Doe',
			age: 29,
			id: Math.random()
		};


		const addUserCommand = new AddUserCommand(user, this.reciever, this.history);

		addUserCommand.execute();

		addUserCommand.undo();
	}
}


