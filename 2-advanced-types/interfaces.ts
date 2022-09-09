// Interfaces
interface IUser {
	name: string;
	age: number;
	skills: string[];
	city: string;
	log: (id: number) => string;
};

interface IRole {
	id: number;
}

interface IUserWithRole extends IUser, IRole {
	createdAt: Date;
}

interface UserDic {
	[id: number]: IUser;
}

interface UserDic2 {
	[id: string]: IUserWithRole;
}