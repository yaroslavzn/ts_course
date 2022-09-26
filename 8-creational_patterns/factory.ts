interface IInsurance {
	id: number;
	status: string;
	vehicle: any;

	setVehicle(vehicle: any): void;
	sendInsuranceData(): Promise<void>;
}

class TFInsurance implements IInsurance {
	id: number;
	status: string;
	vehicle: any;

	constructor() {
		this.id = Date.now();
		this.status = 'open';
	}

	setVehicle(vehicle: any): void {
		this.vehicle = vehicle;
	}

	async sendInsuranceData(): Promise<void> {
		const res = await fetch('/tf-insurance', {
			method: 'POST',
			body: JSON.stringify({
				status: this.status,
				id: this.id
			})
		});

		const body = await res.json();
	}
}

class ABInsurance implements IInsurance {
	id: number;
	status: string;
	vehicle: any;

	constructor() {
		this.id = Date.now();
		this.status = 'open';
	}

	setVehicle(vehicle: any): void {
		this.vehicle = vehicle;
	}

	async sendInsuranceData(): Promise<void> {
		const res = await fetch('/ab-insurance', {
			method: 'POST',
			body: JSON.stringify({
				status: this.status,
				id: this.id
			})
		});

		const body = await res.json();

		if (body.success) {
			alert('Evetything is alright');
		}
	}
}

abstract class InsuranceFactory {
	abstract createInsurance(): IInsurance;
}

class TFInsuranceFactory extends InsuranceFactory {
	createInsurance(): TFInsurance {
		return new TFInsurance();
	}
}

class ABInsuranceFactory extends InsuranceFactory {
	createInsurance(): ABInsurance {
		return new ABInsurance();
	}
}