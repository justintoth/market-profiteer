import { Trade } from './../models/trade.model';
import { User } from './../models/user.model';
import fs from 'fs';

const usersJsonFilePath: string = './stores/users.json';

export abstract class JsonStorage {

  public static getAllUsers(): User[] {
    let json = fs.readFileSync(usersJsonFilePath, 'utf-8');
    if (!fs.existsSync(usersJsonFilePath))
      fs.writeFileSync(usersJsonFilePath, '[]');

    let items:User[] = JSON.parse(json);
    return items;
  }

  public static saveAllUsers(items: User[]) {
    fs.writeFileSync(usersJsonFilePath, JSON.stringify(items, null, 2));
  }

  public static getAllTrades(userId: string): Trade[] {
    let tradesJsonFilePath = `./stores/trades-${userId}.json`;
    if (!fs.existsSync(tradesJsonFilePath))
      fs.writeFileSync(tradesJsonFilePath, '[]');

    let json = fs.readFileSync(tradesJsonFilePath, 'utf-8');
    let items:Trade[] = JSON.parse(json);
    return items;
  }

  public static saveAllTrades(userId: string, items: Trade[]) {
    let tradesJsonFilePath = `./stores/trades-${userId}.json`;
    fs.writeFileSync(tradesJsonFilePath, JSON.stringify(items, null, 2));
  }

}
