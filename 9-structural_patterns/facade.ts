class NotifyService {
	sendTemplate(to: string, template: string): void {
		console.log(`Send ${template}: ${to}`);
	}
}

class LogService {
	log(message: string): void {
		console.log(message);
	}
}

class TemplatesService {
	private templates = [
		{ name: 'other', template: '<h1>Hello world!</h1>' }
	];

	getByName(tplName: string) {
		return this.templates.find((t) => t.name === tplName);
	}
}

class NotifyFacade {
	private notifyService = new NotifyService();
	private loggerService = new LogService();
	private templatesService = new TemplatesService();

	send(to: string, tplName: string) {
		const tpl = this.templatesService.getByName(tplName);

		if (!tpl) {
			this.loggerService.log('There is no template with this name');
			return;
		}

		this.notifyService.sendTemplate(to, tpl?.template);
	}
}