const STANDARD = {
  cache: {
    duration: 24 * 60 * 60,
    prefix: "CACHE",
  },
  
}

const DEVELOPMENT = {
  cache: {
    duration: 1,
  }
}

const PRODUCTION = {

}

const configs = {
  DEVELOPMENT,
  PRODUCTION
}

const { NODE_ENV } = process.env;
const ENV = NODE_ENV ? NODE_ENV.toLowerCase() : undefined;

const envConfig = ENV ? configs[ENV] : {};

const config = {
  ...STANDARD,
  ...envConfig,
}

export default config;