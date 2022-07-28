import { BaseSdkService } from "../../service/BaseService";
import { IModuleParams } from "../../types/modules";


class TrackService extends BaseSdkService{
    expectParams = {
        env: ['development', 'production']
    };

    run(module: IModuleParams, next) {
        console.log('module', module);
        next()
    }
}



export default new TrackService();