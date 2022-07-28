import envConfig from '../env/config'
import developmentHost from "./development.host";
import productionHost from "./production.host";


const host = envConfig.isProduction ? productionHost : developmentHost;
export default host;
