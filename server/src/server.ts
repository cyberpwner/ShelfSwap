import app from './app.js';
import { APP_CONFIG } from './constants/config.constants.js';

app.listen(APP_CONFIG.server.port, () => {
  console.log(`Server running on port ${APP_CONFIG.server.port}`);
});
