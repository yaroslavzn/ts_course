// Unknown
let input: unknown;

input = 3;
input = ['1', '2'];

function getLog(i: unknown): void {
	if (typeof i === 'string') {
		console.log(i.toLowerCase());
	} else {
		console.log(i);
	}
}