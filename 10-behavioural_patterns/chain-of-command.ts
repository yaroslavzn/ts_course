interface IMiddleware {
	next(middleware: IMiddleware): IMiddleware;
	handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
	nextMiddleware: IMiddleware;

	next(middleware: IMiddleware): IMiddleware {
		this.nextMiddleware = middleware;

		return middleware;
	}

	handle(request: any) {
		if (this.nextMiddleware) {
			return this.nextMiddleware.handle(request);
		}

		return;
	}
}

class AuthMiddlewarre extends AbstractMiddleware {
	override handle(request: any) {
		if (request.userId === 1) {
			super.handle(request);
		} else {
			console.log('You are not permitted');
		}
	}
}

class ValidateMiddleware extends AbstractMiddleware {
	override handle(request: any) {
		if (request.body) {
			super.handle(request);
		} else {
			console.log('There is no request body param');
		}
	}
}

class Controller extends AbstractMiddleware {
	override handle(request: any) {
		console.log(request);
		super.handle(request);
	}
}

const authMiddleware = new AuthMiddlewarre();
const validateMiddleware = new ValidateMiddleware();
const controller = new Controller();

authMiddleware.next(validateMiddleware).next(controller);

authMiddleware.handle({ userId: 1, body: 'You are great one' });