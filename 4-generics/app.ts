// Generics
const nums: Array<number> = [1, 2, 3, 4];

async function test() {
	const a = await new Promise<number>((resolve, reject) => {
		resolve(2);
	});
}

const checks: Record<string, boolean> = {
	wheels: true,
	kpp: false
};


function logMiddleware<T>(data: T): T {
	console.log(data);

	return data;
}

function getFirstHalfOfTheArray<T>(value: Array<T>): Array<T> {
	const length = value.length / 2;

	return value.splice(0, length);
}

// Exercise 1
function toString<T>(value: T): string | undefined {
	if (typeof value == 'object') {
		return JSON.stringify(value);
	}

	try {
		return String(value);
	} catch (e) {
		return undefined;
	}
}

// Exercise 2
type SortDirection = 'ASC' | 'DESC';

interface IWithIDSupport {
	id: number;
}

const sortById = <T extends IWithIDSupport>(data: T[], sortDirection?: SortDirection): T[] => {
	return data.sort((a, b) => {

		if (!sortDirection || sortDirection == 'ASC') {
			return a.id - b.id;
		} else {
			return b.id - a.id;
		}
	});
}