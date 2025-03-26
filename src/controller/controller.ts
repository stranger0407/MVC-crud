import { View } from '../view/view';
import { Services } from '../services/services';
import { User } from '../model/model';

export class Controller {
  private Services: Services;
  private View: View;

  constructor(Services: Services, View: View) {
    this.Services = Services;
    this.View = View;
    this.init();

    // Event Listeners
    const sortSubmit = document.getElementById('sort-submit');
    if (sortSubmit) {
      sortSubmit.addEventListener('click', this.handleSort.bind(this));
    }

    const add = document.getElementById('add_new_user');
    if (add) {
      add.addEventListener('click', this.handleAdd.bind(this));
    }
  }

  async init(): Promise<void> {
    const val = await this.Services.getUsers();
    this.View.render(val.users);
  }

  handleAdd(): void {
    const users = this.View.addUser();
    
    // If a new user was added in the form
    if (users.length > 0) {
      const newUser = users[users.length - 1]; // Get the last added user
      
      // Add the user to the service
      const updatedUsers = this.Services.addUser(newUser);
      
      // Re-render the view with updated users
      this.View.render(updatedUsers);
    }
  }

  async handleSort(): Promise<void> {
    const order = document.getElementById('order') as HTMLSelectElement;
    const sortFeild = document.getElementById('sort-feild') as HTMLSelectElement;
    
    if (!order || !sortFeild) {
      console.log('Element not exists');
      return;
    }
    
    const sortfeild1 = order.value;
    const sortfeild2 = sortFeild.value;
    
    const data = await this.Services.sortUser(sortfeild1, sortfeild2);
    this.View.render(data.users);
  }

  // Optional: Add a method to handle delete
  handleDelete(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const userId = button.value;
    
    // Implement delete logic here
    // You might want to update the Services class to include a delete method
    console.log('Delete user with ID:', userId);
  }
}