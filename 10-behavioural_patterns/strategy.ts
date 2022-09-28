class User {
	jwtToken: string;
	githubToken: string;
}

interface AuthStrategy {
	auth(user: User): boolean;
}

class JWTAuthStrategy implements AuthStrategy {
	auth(user: User): boolean {
		return Boolean(user.jwtToken);
	}

}

class GithubTokenStrategy implements AuthStrategy {
	auth(user: User): boolean {
		return Boolean(user.githubToken);
	}

}

class AuthService {
	private authStrategy: AuthStrategy = new JWTAuthStrategy();

	public setStrategy(strategy: AuthStrategy): void {
		this.authStrategy = strategy;
	}

	public auth(user: User): boolean {
		return this.authStrategy.auth(user);
	}
}