export abstract class BaseSdkService {
    abstract expectParams: {
        [key: string]: Array<string>
    };
}