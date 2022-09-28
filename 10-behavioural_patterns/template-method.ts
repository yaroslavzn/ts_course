class Form {
	constructor(
		public name: string
	) { }
}

abstract class SendForm<T> {
	public save(form: Form): void {
		const res = this.fill(form);
		this.log(res);
		this.send(res);
	}

	public log(data: T): void {
		console.log(data);
	}

	protected abstract fill(form: Form): T;
	protected abstract send(data: T): void;
}

class FirstAPI extends SendForm<string> {
	protected fill(form: Form): string {
		return form.name;
	}
	protected send(data: string): void {
		console.log(`Sending ${data}`);
	}
}

class SecondAPI extends SendForm<{ fullName: string }> {
	protected fill(form: Form): { fullName: string; } {
		return { fullName: form.name };
	}
	protected send(data: { fullName: string; }): void {
		console.log(`Sending ${data}`);
	}

}