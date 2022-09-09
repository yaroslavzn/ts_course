// Literal types
function fetchWithAuth(url: string, method: 'get' | 'post'): 1 | -1 {
	return 1;
}

const methodConst = 'post';
let methodLet = 'get';

fetchWithAuth('/', methodConst);

fetchWithAuth('/', methodLet as 'get');