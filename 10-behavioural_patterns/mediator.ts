interface IMediator {
	notify(sender: string, event: string): void;
}

abstract class Mediate {
	mediator: IMediator;

	setMediator(mediator: IMediator) {
		this.mediator = mediator;
	}
}

class RegisterFormHandler extends Mediate {
	public submitForm() {
		this.mediator.notify('RegisterFormHandler', 'firstStepRegistration');
	}
}

class Logger {
	log(message: string): void {
		console.log(message);
	}
}

class NotificationCenter {
	sendNotification(message: string) {
		console.log(message);
	}
}

class FormMediator implements IMediator {
	constructor(
		public logger: Logger,
		public notificationCenter: NotificationCenter
	) { }

	notify(sender: string, event: string): void {
		switch (event) {
			case 'firstStepRegistration': {
				this.logger.log('First step registration sending');
				this.notificationCenter.sendNotification('First step registration was successfully sent');
				console.log(sender, event);
				break;
			}
		}
	}
}

const logger = new Logger();
const notificationCenter = new NotificationCenter();
const mediator = new FormMediator(logger, notificationCenter);
const registerFormHanlder = new RegisterFormHandler();
registerFormHanlder.setMediator(mediator);

registerFormHanlder.submitForm();