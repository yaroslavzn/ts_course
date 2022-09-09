// Type aliases
type httpMethod = 'post' | 'get';

type User = {
	name: string;
	age: number;
	skills: string[];
	city: string;
};

type Role = {
	id: number;
}

type UserWithRoleUnion = User | Role; // union
type UserWithRoleIntersection = User & Role; // intersection

const user: User = {
	age: 29,
	name: 'Rick',
	skills: ['1', '2'],
	city: 'Poltava'
};

const role: Role = {
	id: 12
};

const userWithRoleUnion: UserWithRoleUnion = {
	id: 12
};

const userWithRoleIntersection: UserWithRoleIntersection = {
	id: 12,
	name: 'Rick',
	age: 29,
	city: 'Poltava',
	skills: ['1', '2']
};

