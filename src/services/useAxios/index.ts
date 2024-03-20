import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create();

interface configProps {
	url: string;
	method: 'get' | 'post' | 'put' | 'delete' | 'patch';
	params?: object;
	data?: any;
	headers?: any;
	cancelToken?: any;
	isAuth?: boolean;
}

export const _useAxios = async (props: configProps) => {
	const { url, method, params, data, headers, cancelToken } = props;

	try {
		const response: AxiosResponse = await instance({
			baseURL: `${process.env.baseURL}`,
			url,
			method,
			params,
			data,
			cancelToken,
			headers,
		});

		return Promise.resolve(response);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error(err);
			const serverError = err as AxiosError;
			if (serverError && serverError.response) {
				return Promise.reject(serverError.response);
			}
		} else {
			throw new Error('different error than axios');
		}
	}
};
