export type ErrorContract = {
    errors: string[],
    timestamp: number,
    service: string
}

export type ClientError<T> = {
    error: ErrorContract | null,
    data: T | null
}