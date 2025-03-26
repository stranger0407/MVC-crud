import { User } from '../model/model';

export class Services {
  private url: string;
  private users: User[] = []; // Add a local users array to manage users

  constructor() {
    this.url = 'https://dummyjson.com/users';
  }

  async getUsers(): Promise<{ users: User[] }> {
    const response = await fetch(`${this.url}`);
    if (!response.ok) {
      throw new Error(`${response.status}: Something went wrong`);
    }
    const data = await response.json();
    this.users = data.users; // Store fetched users
    return data;
  }

  // Improved addUser method to add a new user
  addUser(newUser: User): User[] {
    // Generate a unique ID if not provided
    if (!newUser.id) {
      newUser.id = Date.now().toString();
    }

    // Add the new user to the local users array
    this.users.push(newUser);
    return this.users;
  }

  // Get the current list of users
  getUserList(): User[] {
    return this.users;
  }

  async sortUser(
    sortfeild1: string,
    sortfeild2: string,
  ): Promise<{ users: User[] }> {
    const response = await fetch(
      `${this.url}?sortBy=${sortfeild2}&order=${sortfeild1}`,
    );
    const data = await response.json();
    return data;
  }
}