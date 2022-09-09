// Type Guard
function logId(id: string | number) {
	if (isString(id)) {
		console.log(id.toLowerCase());
	} else {
		console.log(id.toFixed(2));
	}
}

function isString(value: string | number): value is string {
	return typeof value === 'string';
}

function isUserWithRole(value: IUser | IUserWithRole): value is IUserWithRole {
	return 'id' in value;
}

function isUserWithRoleAlternative(value: IUser | IUserWithRole): value is IUserWithRole {
	return (value as IUserWithRole).createdAt !== undefined;
}

function testUserFun(user: IUser | IUserWithRole): void {
	if (isUserWithRoleAlternative(user)) {
		console.log(user.id);
	} else {
		console.log(user.name);
	}
}