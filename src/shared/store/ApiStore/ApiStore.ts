import qs from 'qs';

import { ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP } from './types';

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>> {
        const query = params.method === HTTPMethod.GET ? qs.stringify(params.data, { addQueryPrefix: true }) : '';
        const body = params.method === HTTPMethod.POST ? JSON.stringify(params.data) : null;

        try {
            const response = await fetch(`${this.baseUrl}/${params.endpoint}${query}`, {
                method: params.method,
                headers: params.headers,
                body,
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    success: true,
                    data,
                    status: StatusHTTP.OK,
                };
            }

            return {
                success: false,
                data: response.statusText as any,
                status: response.status,
            };
        } catch (e: any) {
            return {
                success: false,
                data: e.message,
                status: StatusHTTP.INTERNAL_ERROR,
            };
        }
    }
}
