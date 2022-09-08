// Tuples
const skill: [number, string] = [1, 'Angular'];

const [id, skillName] = skill;

// Sprad operator in the type definition
const skillAdvanced: [number, string, ...boolean[]] = [2, 'NgRx', true, false, true];