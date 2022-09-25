// Decorators
interface IUserService {
	usersCount: number;
	getUsersCount(): number;
	testMethodDecorator(): void;
	setUsersCount(value: number): void;
}

@nullUsers
@threeUsersAdvanced
@CreatedAt
class UserService implements IUserService {
	@Max(100)
	usersCount = 1000;

	getUsersCount(): number {
		return this.usersCount;
	}

	setUsersCount(@Positive() value: number): void {
		this.usersCount = value;
	}

	@Log
	testMethodDecorator() {
		throw new Error('Hello world!');
	}
}

function nullUsers(target: Function) {
	target.prototype.usersCount = 0;
}

function threeUsersAdvanced<T extends { new(...args: any[]): any }>(constructor: T) {
	return class extends constructor {
		usersCount = 3;
	}
}

function Log(
	target: Object,
	propertyKey: string | symbol,
	descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void {
	console.log(target);
	console.log(propertyKey);
	console.log(descriptor);

	descriptor.value = () => {
		console.log('Hello world without an error!!');
	}
}

function Max(maxValue: number) {
	return (
		context: Object,
		propertyKey: string | symbol
	) => {
		let value: number;

		const setter = (newValue: number) => {
			if (newValue > maxValue) {
				console.log(`Max value is ${maxValue}`);
			} else {
				value = newValue;
			}
		}

		const getter = () => value;

		Object.defineProperty(context, propertyKey, {
			get: getter,
			set: setter
		});
	}
}

function Positive() {
	return (
		context: Object,
		propertyKey: string | symbol,
		paramIndex: number
	) => {
		console.log(context);
		console.log(propertyKey);
		console.log(paramIndex);
	}
}

// Exercise 1
function CreatedAt<T extends { new(...args: any[]): any }>(constructor: T) {
	return class extends constructor {
		createdAt = new Date();
	}
}

type CreatedAt = {
	createdAt: Date;
}

console.log((new UserService() as IUserService & CreatedAt).createdAt);

// Exercise 2
function Catch({ rethrow }: { rethrow: boolean } = { rethrow: true }) {
	return (
		target: Object,
		propertyKey: string | symbol,
		descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
	): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
		const oldValue = descriptor.value;

		descriptor.value = (...args: any[]) => {
			try {
				oldValue?.apply(target, args);
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message);

					if (rethrow) {
						throw e;
					}
				}
			}
		}
	}
}