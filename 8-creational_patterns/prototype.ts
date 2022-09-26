interface Prototype<T> {
	copy(): T;
	copyWith(fieldsToEdit: Partial<T>): T;
}

class User implements Prototype<User> {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly age: number
	) { }

	copy(): User {
		return new User(this.name, this.email, this.age);
	}

	copyWith(fieldsToEdit: Partial<User> = {}): User {
		return new User(
			fieldsToEdit?.name || this.name,
			fieldsToEdit?.email || this.email,
			fieldsToEdit?.age || this.age
		);
	}
}

const user = new User('John Doe', 'johnDoe@test.com', 29);
const coppiedUser = user.copyWith();

const olderUser = user.copyWith({
	age: 35
});

console.log(user);
console.log(coppiedUser);
console.log(olderUser);