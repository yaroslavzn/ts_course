abstract class DeliveryItem {
	private items: DeliveryItem[] = [];

	getInnerItemsPrice(): number {
		return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
	}

	addItem(item: DeliveryItem): void
	addItem(items: DeliveryItem[]): void
	addItem(itemOrItems: DeliveryItem | DeliveryItem[]): void {
		if (Array.isArray(itemOrItems)) {
			this.items = this.items.concat(itemOrItems);
		} else {
			this.items.push(itemOrItems);
		}
	}

	abstract getPrice(): number;
}

class ShopCart extends DeliveryItem {
	constructor(private deliveryFee: number) {
		super();
	}

	getPrice(): number {
		return this.getInnerItemsPrice() + this.deliveryFee;
	}
}

class Package extends DeliveryItem {
	getPrice(): number {
		return this.getInnerItemsPrice();
	}
}

class Product extends DeliveryItem {
	constructor(
		private price: number
	) {
		super();
	}

	getPrice(): number {
		return this.price;
	}
}

const cart = new ShopCart(75);
const phone = new Product(7500);

const pack1 = new Package();
pack1.addItem(new Product(450));
pack1.addItem(new Product(225));

const pack2 = new Package();
pack2.addItem(new Product(25000));

cart.addItem(phone);
cart.addItem([pack1, pack2]);

console.log(cart.getPrice());