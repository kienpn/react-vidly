// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://8574f9bce49c4c1f97bc672e6117a52c@o629595.ingest.sentry.io/5755003",
  //   {
  //     release: "1-0-0",
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  // Raven.captureException(error);
  console.log(error);
}

export default {
  init,
  log,
};
