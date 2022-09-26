class ConfigService {
	private static instance: ConfigService;

	private config: Map<string, any> = new Map();

	private constructor() {}

	public static getInstance(): ConfigService {
		if (!ConfigService.instance) {
			ConfigService.instance = new ConfigService();
		}

		return ConfigService.instance;
	}

	public set(key: string, value: any): void {
		this.config.set(key, value);
	}

	public get(key: string): any {
		return this.config.get(key);
	}
}

const instance1 = ConfigService.getInstance();
instance1.set('testConfig', 'testConfigValue');

const instance2 = ConfigService.getInstance();
console.log(instance2.get('testConfig'));