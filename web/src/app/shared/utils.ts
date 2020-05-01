import * as moment from 'moment';

export abstract class Utils {

  public static generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public static stockMarketIsOpen(): boolean {
    let now = moment();
    let opening = moment('9:30am', 'h:mma');
    let closing = moment('4:00pm', 'h:mma');
    let dayOfWeek = now.format('dddd');

    return now.isAfter(opening) 
      && now.isBefore(closing) 
      && (dayOfWeek === 'Monday' 
        || dayOfWeek === 'Tuesday' 
        || dayOfWeek === 'Wednesday'
        || dayOfWeek === 'Thursday'
        || dayOfWeek === 'Friday')
  }

}
