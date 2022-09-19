interface IUser {
	name: string;
	age?: number;
	email: string;
}

// Partial
type partial = Partial<IUser>;

const user: partial = {};

// Required
type required = Required<IUser>;

const userRequired: required = {
	name: 'John',
	age: 29,
	email: 'test@test.com'
};

// Readonly
type readOnly = Readonly<IUser>;

const readOnlyUser: readOnly = {
	email: 'test@test.com',
	name: 'John'
}

// Combinig
type requiredAndReadOnly = Required<Readonly<IUser>>;

// Omit, Pick, Extract, Exclude
interface PaymentPersistent {
	id: number;
	amount: number;
	from: string;
	to: string;
}

type Payment = Omit<PaymentPersistent, 'id'>;
type PaymentRequisits = Pick<PaymentPersistent, 'from' | 'to'>;

type ExtractExample = Extract<'from' | 'to' | Payment, string>;
type ExcludeExample = Exclude<'from' | 'to' | Payment, string>;

// ReturnType, Parameters, ConstructorParameters
class User {
	constructor(
		public id: number,
		public name: string
	) {}
}

function getUserById(id: number): User {
	return new User(id, 'John');
}

type getUserByIdReturnType = ReturnType<typeof getUserById>;
type getUserByIdParams = Parameters<typeof getUserById>;
type getUserByIfFirstParam = Parameters<typeof getUserById>[0];
type userConstructorParams = ConstructorParameters<typeof User>;

// Awaited
type AwaitedTest = Awaited<Promise<string>>;
type AwaitedTest2 = Awaited<Promise<Promise<boolean>>>;

async function getUserName(id: number): Promise<string> {
	return 'John Doe';
}

type getUserNameReturnType = Awaited<ReturnType<typeof getUserName>>;