import devHost     from './dev.host';
import testHost    from './test.host';
import betaHost    from './beta.host';
import releaseHost from './release.host';

interface hostConfInterface {
    REMOTE_SERVER: any
}

let hostConf: hostConfInterface;

switch (process.env.APP_ENV_TYPE) {
    case 'dev':
        hostConf = devHost;
        break;
    case 'test':
        hostConf = testHost;
        break;
    case 'beta':
        hostConf = betaHost;
        break;
    case 'release':
        hostConf = releaseHost;
        break;
}


export {hostConf}