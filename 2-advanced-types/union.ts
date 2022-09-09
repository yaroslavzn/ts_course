// Union
function logId(id: number | string | boolean) {
	if (typeof id === 'string') {
		console.log(id);
	} else if (typeof id === 'number') {
		console.log(id);
	} else {
		console.log(id);
	}
}

function logError(err: string | string[]) {
	if (Array.isArray(err)) {
		console.log(err);
	} else {
		console.log(err);
	}
}

function logObject(obj: { a: number } | { b: number }) {
	if ('a' in obj) {
		console.log(obj.a);
	} else {
		console.log(obj.b);
	}
}

function logMultipleIds(a: string | number, b: string | boolean) {
	if (a === b) {
		console.log(a);
		console.log(b);
	} else {
		console.log(a);
		console.log(b);
	}
}