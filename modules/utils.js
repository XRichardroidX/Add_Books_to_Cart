import { DateTime } from './luxon.js';

const date = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
export default date;