abstract class Provider {
	abstract providerId: string;

	connect(): void {
		console.log(`Connected to ${this.providerId} provider`);
	}

	disconnect(): void {
		console.log(`Disconnected from ${this.providerId} provider`);
	}

	abstract sendMessage(message: string): void;
}

class TelegramProvider extends Provider {
	providerId = 'telegram';

	sendMessage(message: string): void {
		console.log('TG', message);
	}
}

class WhatsUpProvider extends Provider {
	providerId = 'whats_up';

	sendMessage(message: string): void {
		console.log('WU', message);
	}
}

class NotificationSender {
	constructor(
		protected provider: Provider
	) { }

	send(): void {
		this.provider.connect();
		this.provider.sendMessage('Immidiate message');
		this.provider.disconnect();
	}
}

class DelayedNotificationSender extends NotificationSender {
	override send(): void {
		this.provider.connect();

		setTimeout(() => {
			this.provider.sendMessage('Delayed Message');
			this.provider.disconnect();
		}, 5000);
	}
}

const telegramProvider = new TelegramProvider();
const whatUpProvider = new WhatsUpProvider();

const sender1 = new NotificationSender(telegramProvider);
const sender2 = new DelayedNotificationSender(whatUpProvider);
const sender3 = new NotificationSender(whatUpProvider);

sender1.send();

sender2.send();

sender3.send();