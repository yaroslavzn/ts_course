interface IPaymentApi {
	getPaymentDetails(id: number): IPaymentDetails | undefined;
}

interface IPaymentDetails {
	id: number;
	sum: number;
}

class PaymentApi implements IPaymentApi {
	private paymentItems: IPaymentDetails[] = [
		{
			id: 1,
			sum: 15000
		}
	];

	getPaymentDetails(id: number): IPaymentDetails | undefined {
		return this.paymentItems.find((item) => item.id === id);
	}
}

class PaymentAccessProxy implements IPaymentApi {
	private paymentApi: PaymentApi;
	private userId: number;

	constructor(
		paymentApi: PaymentApi,
		userId: number
	) {
		this.paymentApi = paymentApi;
		this.userId = userId;
	}

	getPaymentDetails(id: number): IPaymentDetails | undefined {
		if (this.userId === 1) {
			return this.paymentApi.getPaymentDetails(id);
		}

		console.log('You have not permitted to do this action');

		return undefined;
	}
}

const proxy1 = new PaymentAccessProxy(new PaymentApi(), 1);
const proxy2 = new PaymentAccessProxy(new PaymentApi(), 2);

console.log(proxy1.getPaymentDetails(1));
console.log(proxy2.getPaymentDetails(2));