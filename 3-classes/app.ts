class User {
	_name: string;
	skills: string[] = [];

	constructor(name: string) {
		this.name = name;
	}

	set name(value: string) {
		this._name = value;
	}

	get name() {
		return this._name;
	}

	// Exercise 1
	addSkill(skill: string): void;
	addSkill(skills: string[]): void;
	addSkill(skillOrSkills: string | string[]): void {
		if (typeof skillOrSkills === 'string') {
			this.skills.push(skillOrSkills);
		} else {
			this.skills.push(...skillOrSkills);
		}
	}
}

class Admin {
	role: number;
}

const admin = new Admin();
admin.role = 1;

class UserOverload {
	name: string;
	age: number;

	constructor();
	constructor(name: string);
	constructor(age: number);
	constructor(name: string, age: number);
	constructor(nameOrAge?: string | number, age?: number) {
		if (typeof nameOrAge === 'string') {
			this.name = nameOrAge;
		} else if (typeof nameOrAge === 'number') {
			this.age = nameOrAge;
		}

		if (typeof age === 'number') {
			this.age = age;
		}
	}
}

const user1 = new UserOverload();
const user2 = new UserOverload('Rick');
const user3 = new UserOverload(29);
const user4 = new UserOverload('Rick', 29);

enum PaymentStatus {
	Holded,
	Processed,
	Reversed
}

class Payment {
	id: number;
	createdAt: Date = new Date();
	updatedAt: Date;
	status: PaymentStatus = PaymentStatus.Holded;

	constructor(id: number) {
		this.id = id;
	}

	getPaymentLifeTime(): number {
		return new Date().getTime() - this.createdAt.getTime();
	}

	unholdPayment(): void {
		if (this.status == PaymentStatus.Processed) {
			throw new Error('Payment can\'t be unholded');
		}

		this.status = PaymentStatus.Reversed;
		this.updatedAt = new Date();
	}
}

const payment = new Payment(1);
console.log(payment);
payment.unholdPayment();
console.log(payment.getPaymentLifeTime());

interface ILogger {
	log(...args: any[]): void;
	error(...args: any[]): void;
}

class ConsoleLogger implements ILogger {
	log(...args: any[]): void {
		console.log(args);
	}
	error(...args: any[]): void {
		console.error(args);
	}
}

// Exercise 2
class Product {
	constructor(
		public name: string,
		public id: number,
		public price: number
	) { }
}

class Delivery {
	constructor(
		public date: Date
	) { }
}

class HomeDelivery extends Delivery {
	constructor(
		date: Date,
		public address: string
	) {
		super(date);
	}
}

class ShopDelivery extends Delivery {
	constructor(
		public shopId: number
	) {
		super(new Date());
	}
}

type DeliveryInfo = HomeDelivery | ShopDelivery;

class Cart {
	public set deliviryInfo(value: DeliveryInfo) {
		this._deliveryInfo = value;
	}
	public get deliveryInfo(): DeliveryInfo {
		return this._deliveryInfo;
	}

	private products: Product[] = [];
	private _deliveryInfo: DeliveryInfo;

	constructor() { }

	addProduct(product: Product): void {
		this.products.push(product);
	}

	removeProduct(productId: number): boolean {
		const productIndex = this.products.findIndex((product) => product.id == productId);

		if (productIndex != -1) {
			this.products.splice(productIndex, 1);
			this.products = [...this.products];
			return true;
		}

		throw new Error('There is no product with this id');
	}

	calculateTotalPrice(): number {
		return this.products.reduce((acc, curr) => {
			return acc + curr.price;
		}, 0);
	}

	checkout() {
		if (this.products.length == 0) {
			throw new Error('There are no products in your cart');
		}

		if (!this.deliveryInfo) {
			throw new Error('There is no delivery info');
		}

		return {
			success: true
		};
	}
}

// Exercise 3
abstract class Logger {
	abstract log(message: string): void;
	
	printDate(date: Date): void {
		this.log(date.toString());
	};
}

class CustomConsoleLogger extends Logger {
	log(message: string): void {
		console.log(message);
	}
	
	public logWithDate(message: string): void {
		this.printDate(new Date());
		this.log(message);
	}

}

const logger = new CustomConsoleLogger();

logger.logWithDate('Hello world!');