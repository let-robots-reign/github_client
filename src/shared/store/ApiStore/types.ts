// Перечисление методов HTTP-запроса
export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
}

// Параметры запроса
export type RequestParams<ReqT> = {
    method: HTTPMethod; // Метод запроса, GET или POST
    endpoint: string; // API-endpoint, на который делается запрос
    headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками

    /**
     * Объект с данными запроса.
     * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
     * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
     */
    data: ReqT;
};

// Перечисление статусов ответа
export enum StatusHTTP {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
          success: true;
          data: SuccessT;
          status: StatusHTTP;
      }
    | {
          success: false;
          data: ErrorT;
          status: StatusHTTP;
      };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
    readonly baseUrl: string;

    request<SuccessT, ErrorT = any, ReqT = {}>(
        params: RequestParams<ReqT>
    ): Promise<ApiResponse<SuccessT, ErrorT>>;
}
