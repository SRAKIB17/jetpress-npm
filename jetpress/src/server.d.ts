import { IncomingMessage, ServerResponse } from "http";
import { OutgoingHttpHeaders } from "http2";
import { ServerOptions } from "https";

export type Middleware = (req: Request, res: Response, next: () => void) => void;

export function FormWizard(req: Request, res: Response, next: () => void): void;

export type Callback = (req: Request, res: Response) => void;

export type ParsedCookie = Record<string, string>

export interface SecureOption extends ServerOptions {
    enableSsl?: true;
}

export interface Option extends ServerOptions {
    enableSsl?: false;
}

export type StaticServeOption = {
    cacheControl?: string,
    headers?: Record<string, string>
}

export type ServerOptionsProps = SecureOption | Option;

export enum ContentType {
    PlainText = 'text/plain',
    HTML = 'text/html',
    JSON = 'application/json',
    XML = 'application/xml',
    CSS = 'text/css',
    JavaScript = 'application/javascript',
    Markdown = 'text/markdown',
    CSV = 'text/csv',
    PDF = 'application/pdf',
    ImageJPEG = 'image/jpeg',
    ImagePNG = 'image/png',
    ImageGIF = 'image/gif',
    SVG = 'image/svg+xml',
    AudioMPEG = 'audio/mpeg',
    AudioWAV = 'audio/wav',
    VideoMP4 = 'video/mp4',
    BinaryData = 'application/octet-stream'
}

export interface ResponseOption {
    status?: number;
}

interface BufferOption extends ResponseOption {
    contentType?: ContentType;
}

interface SendDataOption extends ResponseOption {
    contentType?: ContentType;
}

export type File = {
    field: string;
    filename: string;
    name: string;
    type: string;
    size: number;
    buffer: Buffer;
}

export interface Request extends IncomingMessage {
    params: {
        [key: string]: string
    },
    cookies: ParsedCookie,
    query: {
        [key: string]: string
    },
    body: {
        [key: string]: string
    },
    path: string,
    file: file,
    files: file[],
    location: {
        hash: string | undefined,
        protocol: string | undefined,
        origin: string | undefined,
        username: string | undefined,
        password: string | undefined,
        hostname: string | undefined,
        port: string | undefined,
        href: string | undefined,
        query: {
            [key: string]: string
        },
        path: string
    }
}

export interface ResponseMethod {
    json: (data: any, option?: ResponseOption, headers?: OutgoingHttpHeaders) => void;
    html: (data: string, option?: ResponseOption, headers?: OutgoingHttpHeaders) => void;
    xml: (data: string, option?: ResponseOption, headers?: OutgoingHttpHeaders) => void;
    text: (data: string, option?: ResponseOption, headers?: OutgoingHttpHeaders) => void;
    sendFile: (filePath: string) => void;
    send: (buffer: any, option?: SendDataOption, headers?: OutgoingHttpHeaders) => void;
    buffer: (buffer: Buffer, option?: BufferOption, headers?: OutgoingHttpHeaders) => void;
    error: (status: number, message: string, headers?: OutgoingHttpHeaders) => void;
    redirect: (url: string, option?: ResponseOption, headers?: OutgoingHttpHeaders) => void;
}

export interface CookieOptions {
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

export interface Response extends ServerResponse, ResponseMethod {
    status: (status: number) => ResponseMethod;
    deleteCookie: (cookieName: string, options?: CookieOptions) => void;
    setCookie: (cookieName: string, cookieValue: string, options?: CookieOptions) => void;
}

export interface RouteType {
    path: string;
    method: string;
    callback: (req: Request, res: Response) => void;
}


export class Router {
    get(path: string, callback: Callback): void;
    get(path: string, middlewares: Middleware[], callback: Callback): void;
    get(path: string, middlewares: Middleware, callback: Callback): void;

    post(path: string, callback: Callback): void;
    post(path: string, middlewares: Middleware[], callback: Callback): void;
    post(path: string, middlewares: Middleware, callback: Callback): void;

    put(path: string, callback: Callback): void;
    put(path: string, middlewares: Middleware[], callback: Callback): void;
    put(path: string, middlewares: Middleware, callback: Callback): void;

    patch(path: string, callback: Callback): void;
    patch(path: string, middlewares: Middleware[], callback: Callback): void;
    patch(path: string, middlewares: Middleware, callback: Callback): void;

    delete(path: string, callback: Callback): void;
    delete(path: string, middlewares: Middleware[], callback: Callback): void;
    delete(path: string, middlewares: Middleware, callback: Callback): void;

    options(path: string, callback: Callback): void;
    options(path: string, middlewares: Middleware[], callback: Callback): void;
    options(path: string, middlewares: Middleware, callback: Callback): void;

    all(path: string, callback: Callback): void;
    all(path: string, middlewares: Middleware[], callback: Callback): void;
    all(path: string, middlewares: Middleware, callback: Callback): void;

    router(path: string, router: Router): void;
    router(path: string, middlewares: Middleware[], router: Router): void;
    router(path: string, middlewares: Middleware, router: Router): void;

    use(path: string, middlewares: ((req: Request, res: Response, next: () => void) => void)[], callback: ((req: Request, res: Response) => void) | Router): void;
    use(path: string, middlewares: (req: Request, res: Response, next: () => void) => void, callback: ((req: Request, res: Response) => void) | Router): void;
    use(path: string, middlewares: ((req: Request, res: Response, next: () => void) => void)[]): void;
    use(path: string, middlewares: (req: Request, res: Response, next: () => void) => void): void;
    use(path: string, callback: ((req: Request, res: Response) => void) | Router): void;
    use(middleware: (req: Request, res: Response, next: (err?: any) => any) => void, callback: ((req: Request, res: Response) => void) | Router): void;
    use(middlewares: ((req: Request, res: Response, next: () => void) => void)[]): void;
    use(middleware: (req: Request, res: Response, next: (err?: any) => any) => void): void;
}

export class Server extends Router {
    constructor(option?: ServerOptionsProps);

    static(route: string, folder: string, option?: StaticServeOption): void;
    static(folder: string, Option?: StaticServeOption): void;

    config(middlewares: Middleware[]): void;
    config(middleware: Middleware): void;

    listen(port: number, callback?: () => void): void;
}
