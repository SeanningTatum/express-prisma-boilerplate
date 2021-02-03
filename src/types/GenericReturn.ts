export interface GenericReturn<T> {
    message: string;
    code: number;
    body?: T;
}
