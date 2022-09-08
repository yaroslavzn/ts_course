// Objects
const user = {
	firstName: 'Rick',
	lastName: 'Web',
	city: 'Poltava',
	age: 29
};

function getFullNameWithObjectParam(user: { firstName: string, lastName: string }): string {
	return `${user.firstName} ${user.lastName}`;
}