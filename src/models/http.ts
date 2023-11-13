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

export interface HttpApp {
    (req: HttpRequest, res: HttpResponse): any;

    set(setting: string, val: any): this;
    listen(port: number, hostname: string, backlog: number, callback?: () => void): any;
    listen(port: number, hostname: string, callback?: () => void): any;
    listen(port: number, callback?: () => void): any;
    listen(callback?: () => void): any;
    listen(path: string, callback?: () => void): any;
    listen(handle: any, listeningListener?: () => void): any;
    router: string;
    routes: any;
    use: any;
    post: any;
    get: any
}
