// Void
function logInfo(id: number): void {
	console.log(id);
}

type voidFunction = () => void;

const voidFunc1: voidFunction = () => {
	return false;
};

const boolValue = voidFunc1();