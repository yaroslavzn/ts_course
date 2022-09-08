// Arrays
const skills: string[] = ['Angular', 'Node JS', 'Type Script'];

for (const skill of skills) {
	console.log(skill);
}

const resArr = skills
	.filter((s) => s !== 'Node JS')
	.map((s) => s + '! ')
	.reduce((a, b) => a + b);