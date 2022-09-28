class Post {
	private postStatus: PostStatusState;

	constructor(
		public title: string,
		public content: string
	) {
		this.setStatus(new PostDraftStatusState());
	}

	public publish(): void {
		this.postStatus.publish();
	}

	public delete(): void {
		this.postStatus.delete();
	}

	public setStatus(status: PostStatusState) {
		this.postStatus = status;
		this.postStatus.setContext(this);
	}
}

abstract class PostStatusState {
	protected context: Post;

	constructor() {}

	abstract publish(): void;
	abstract delete(): void;

	public setContext(context: Post): void {
		this.context = context;
	}
}

class PostDraftStatusState extends PostStatusState {
	publish(): void {
		this.context.setStatus(new PostPublishedStatusState());
	}
	delete(): void {
		throw new Error('Post with draft status can not be deleted');
	}

}

class PostPublishedStatusState extends PostStatusState {
	publish(): void {
		throw new Error('Post with published status can not be published.');
	}
	delete(): void {
		this.context.setStatus(new PostDraftStatusState());
	}
}