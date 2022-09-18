// keyof
interface IUser {
	name: string;
	age: number;
}

type KeysOfIUser = keyof IUser;

const key: KeysOfIUser = 'name';

const getObjField = <T, V extends keyof T>(input: T, key: V) => {
	return input[key];
}

const user: IUser = {
	name: 'John',
	age: 29
};

const value = getObjField(user, 'age');

// Exercise 1
interface Data {
	group: number;
	name: string;
}

const data: Data[] = [
	{
		group: 1,
		name: 'a'
	},
	{
		group: 1,
		name: 'b'
	},
	{
		group: 2,
		name: 'c'
	}
];

type key = string | number | symbol;

interface IGroup<T> {
	[key: string]: T[]
}

const groupBy = <T extends Record<key, any>, V extends keyof T>(data: T[], key: V): IGroup<T> => {
	return data.reduce<IGroup<T>>((acc, curr: T) => {
		const keyValue = curr[key];

		if (acc[keyValue] == undefined) {
			acc[keyValue] = [curr];
		} else {
			acc[keyValue].push(curr);
		}

		return acc;
	}, {});
}

const res = groupBy(data, 'group')

// typeof
const userTypeOfTest = {
	firstName: 'John',
	lastName: 'Doe'
};

type userKeys = keyof typeof userTypeOfTest;

// Indexed access types
type userNameType = IUser['name'];

const fieldName = 'name';
type userNameType2 = IUser[typeof fieldName];

const roles = ['admin', 'user', 'vip-user'] as const;

type roleTypes = typeof roles[number];

// Conditional types
interface IVipUser extends IUser {
	freeCodes: number[];
}

type VipOrDefaultUser<T extends string | number> = T extends string ? IVipUser : IUser;

function getUser<T extends string | number>(id: T): VipOrDefaultUser<T> {
	if (typeof id === 'string') {
		const vipUser: IVipUser = {
			age: 29,
			name: 'John',
			freeCodes: [1, 2,3]
		};

		return vipUser as VipOrDefaultUser<T>;
	} else {
		const user: IUser = {
			age: 29,
			name: 'John'
		};

		return user as VipOrDefaultUser<T>;
	}
}

const testUser1 = getUser(1);
const testUser2 = getUser('123');

// Exercise 2
interface IForm {
	name: string;
	password: string;
	age: number;
}

type IFormValidation<T> = {
	[Property in keyof T]: {isValid: true} | {isValid: false; errorMessage: string}
}

type ILoginFormValidation = IFormValidation<IForm>;

const loginFormValidation: ILoginFormValidation = {
	name: {
		isValid: true,
	},
	password: {
		isValid: false,
		errorMessage: 'Minimum length 5 chars'
	},
	age: {
		isValid: true
	}
}

// String literal types
