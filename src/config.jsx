const dev = {
  api: "http://gen3:8000/",
};

const prod = {
  api: "http://api.localgreentips.net/",
};

const config = process.env.REACT_APP_STAGE === 'dev'
  ? dev
  : prod;

export default config;
