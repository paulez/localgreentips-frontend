const dev = {
  api: "http://localhost:8000/",
};

const prod = {
  api: "https://api.localgreentips.net/",
};

const config = process.env.REACT_APP_STAGE === 'dev'
  ? dev
  : prod;

export default config;
