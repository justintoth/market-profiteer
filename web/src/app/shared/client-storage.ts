import { Trade } from '../models/trade.model';
import { User } from '../models/user.model';

const userKey: string = 'user';
const emailAddressKey: string = 'email-address';
const tradesKey: string = 'trades';

export abstract class ClientStorage {

  public static getEmailAddress(): string {
    return localStorage.getItem(emailAddressKey);
  }

  public static saveEmailAddress(emailAddress: string) {
    localStorage.setItem(emailAddressKey, emailAddress);
  }

  public static getUser(): User {
    let json = localStorage.getItem(userKey);
    let item:User = JSON.parse(json);
    return item;
  }

  public static saveUser(item: User) {
    localStorage.setItem(userKey, JSON.stringify(item));
  }

  public static deleteUser() {
    localStorage.removeItem(userKey);
  }

  public static getAllTrades(): Trade[] {
    let json = localStorage.getItem(tradesKey);
    let items:Trade[] = JSON.parse(json || '[]');
    return items;
  }

  public static saveAllTrades(items: Trade[]) {
    localStorage.setItem(tradesKey, JSON.stringify(items));
  }

  public static deleteAllTrades() {
    localStorage.removeItem(tradesKey);
  }

}
