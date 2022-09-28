interface Subject {
	notify(): void;
	attach(observer: Observer): void;
	detach(observer: Observer): void;
}

interface Observer<T = {}> {
	update(data: T): void;
}

class Lead {
	constructor(
		public name: string,
		public phone: string
	) { }
}

class NewLead implements Subject {
	private observers: Observer<Lead>[] = [];

	constructor(
		public newLead: Lead
	) { }

	notify(): void {
		this.observers.forEach((observer) => observer.update(this.newLead));
	}
	attach(observer: Observer<Lead>): void {
		if (this.observers.includes(observer)) {
			return;
		}

		this.observers.push(observer);
	}

	detach(observer: Observer<Lead>): void {
		const observerIndex = this.observers.indexOf(observer);

		if (observerIndex !== -1) {
			this.observers.splice(observerIndex, 1);
		}
	}
}

class NotificationsService implements Observer<Lead> {
	update(data: Lead): void {
		console.log(`NotificationsService update - ${data}`);
	}
}

class LeadsService implements Observer<Lead> {
	update(data: Lead): void {
		console.log(`LeadsService update - ${data}`);
	}
}

const newLead = new Lead('John Doe', '9379992');
const subject = new NewLead(newLead);
const observer1 = new NotificationsService();
const observer2 = new LeadsService();
subject.attach(observer1);
subject.attach(observer2);

subject.notify();