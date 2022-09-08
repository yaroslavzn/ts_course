// Exercise 1
let officeInfo: {
	officeId: number;
	isOpened: boolean;
	contacts: {
		phone: string;
		email: string;
		address: {
			city: string;
		};
	};
};

// Exercise 2
enum TopicStatus {
	PUBLISHED = 'published',
	DRAFT = 'draft',
	DELETED = 'deleted'
};

async function getFaqs(req: { topicId: number; status?: TopicStatus }): Promise<{
	question: string;
	answer: string;
	tags: string[];
	likes: number;
	status: TopicStatus;
}[]> {
	const res = await fetch('/faqs', {
		method: 'POST',
		body: JSON.stringify(req)
	});

	const data = await res.json();

	return data;
}