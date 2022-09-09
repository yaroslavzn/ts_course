// Null
const test: null = null;

interface IUser {
	name: string;
}

function getUser() {
	if (Math.random() > 0.5) {
		return {
			name: 'John Doe'
		} as IUser;
	} else {
		return null;
	}
}

const testUser = getUser();

if (testUser !== null) {
	console.log(testUser.name);
}