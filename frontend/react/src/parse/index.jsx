import { Parse } from 'parse';

try {
  const config = {
    appId: process.env.PARSE_APP_ID,
    serverURL: process.env.PARSE_URL,
  };
  Parse.initialize(config.appId);
  Parse.serverURL = config.serverURL;
} catch (e) {
  // console.log(e);
}
