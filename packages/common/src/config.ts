interface IConfig {
  JWT_SECRET: string
}

let _COMMON_CONFIG: IConfig = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
};

const setCommonConfig = (config: IConfig) => {
  _COMMON_CONFIG = config;
};

export { setCommonConfig, _COMMON_CONFIG };