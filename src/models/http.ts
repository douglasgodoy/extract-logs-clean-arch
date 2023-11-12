export interface HttpResponse {
    status(code: number): this;
    send(data: any): this;
    json(data: any): this;
}

export interface HttpRequest<T = {}> {
    body: T;
    params: T;
    query: T;
}
