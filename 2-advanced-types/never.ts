// Never
function generateError(message: string): never {
	throw new Error(message);
}

function loopNever(): never {
	while (true) {
		console.log('This loop never will finish');
	}
}

function rec(): never {
	return rec();
}

type PaymentAction = 'refund' | 'checkout' | 'reject';

function processAction(action: PaymentAction) {
	switch (action) {
		case 'checkout': {
			// ...
			break;
		}

		case 'refund': {
			// ...
			break;
		}

		case 'reject': {
			// ...
			break;
		}

		default: {
			const _: never = action;
			throw new Error('This action doesn\'t exist');
		}
	}
}