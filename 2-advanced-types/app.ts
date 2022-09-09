// Exercise 1
interface IPayment {
	sum: number;
	from: number;
	to: number;
}

interface IRequest extends IPayment { }

interface ISuccessResponseData extends IPayment {
	databaseId: number;
}

interface IFailedResponseData {
	errorMessage: string;
	errorCode: number;
}

enum ResponseStatus {
	Success = 'success',
	Failed = 'failed'
};

interface ISuccessResponse {
	status: ResponseStatus.Success,
	data: ISuccessResponseData
}

interface IFailedResponse {
	status: ResponseStatus.Failed,
	data: IFailedResponseData
}

type IResponse = ISuccessResponse | IFailedResponse;

// Exercise 2
function isSuccessResponse(response: IResponse): response is ISuccessResponse {
	return response.status === ResponseStatus.Success;
}

function processResponse(response: IResponse): number {
	if (isSuccessResponse(response)) {
		return response.data.databaseId;
	}

	throw new Error(response.data.errorMessage);
};