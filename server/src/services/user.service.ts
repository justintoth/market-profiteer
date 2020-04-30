import { Request, Response } from 'express';
import { Utils } from '../shared/utils';
import { JsonStorage } from '../shared/json-storage';
import { User } from './../models/user.model';

export const root = (_req: Request, res: Response) => {
  return res.send('API is working 🤓');
};

export const authenticateUser = (req: Request, res: Response) => {
  let users = JsonStorage.getAllUsers();
  let existingUser = users.find(u => u.EmailAddress.toLowerCase() === req.body.EmailAddress.toLowerCase()
    && u.Password.toLowerCase() === req.body.Password.toLowerCase());
  if (existingUser)
    console.log('Retrieved existing user: ', existingUser);
  else
    console.warn('Failed to retrieve user');
  return res.json(existingUser);
};

export const saveUser = (req: Request, res: Response) => {
  // Check if new or existing user.
  let users = JsonStorage.getAllUsers();
  let existingUser = users.find(u => req.body.Id && u.Id === req.body.Id);
  // Populate values.
  let user = existingUser || new User();
  user.EmailAddress = req.body.EmailAddress;
  user.Password = req.body.Password;
  // Prepend new user, update existing trade in place.
  if (!existingUser) {
    user.Id = Utils.generateGuid();
    users.unshift(user);
  }
  // Save users.
  JsonStorage.saveAllUsers(users);
  console.log(`Saved ${!existingUser ? 'new' : 'existing'} user: `, user);
  res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  // Remove user.
  let userId = req.params.userId;
  let users = JsonStorage.getAllUsers();
  users = users.filter(u => u.Id !== userId);
  // Save users.
  JsonStorage.saveAllUsers(users);
  console.log('Deleted user with id: ', userId);
  res.json(userId);
};