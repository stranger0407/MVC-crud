import { User } from '../model/model';

export class View {
  private user_list: HTMLElement;

  constructor() {
    const userList = document.querySelector('.user_list');
    if (!userList) {
      throw new Error('User list element not found');
    }
    this.user_list = userList as HTMLElement;
  }

  render(data: User[]): void {
    this.user_list.innerHTML = ''; // Clear existing list
    
    data.forEach((element) => {
      const user = document.createElement('div');
      user.className = 'user_list_item';

      // Create and populate user details
      const details = [
        { className: 'user_list_first_name', text: element.firstName },
        { className: 'user_list_last_name', text: element.lastName },
        { className: 'user_list_email', text: element.email },
        { className: 'user_list_username', text: element.username },
        { className: 'user_list_age', text: element.age },
        { className: 'user_list_gender', text: element.gender }
      ];

      details.forEach(detail => {
        const span = document.createElement('span');
        span.className = detail.className;
        span.textContent = detail.text;
        user.appendChild(span);
      });

      // Create edit and delete buttons
      const editbtn = document.createElement('button');
      const deletebtn = document.createElement('button');
      
      editbtn.className = 'edit-btn';
      deletebtn.className = 'delete-btn';
      
      editbtn.textContent = 'Edit';
      deletebtn.textContent = 'Delete';
      
      editbtn.value = element.id;
      deletebtn.value = element.id;

      user.appendChild(editbtn);
      user.appendChild(deletebtn);

      this.user_list.appendChild(user);
    });
  }

  addUser(): User[] {
    const addForm = document.getElementById('addForm') as HTMLFormElement;
    const container = document.getElementById('containerId');

    if (!addForm || !container) {
      console.error('Required elements not found');
      return [];
    }

    const users: User[] = [];

    // Temporary form submission handler
    const submitHandler = (e: SubmitEvent) => {
      e.preventDefault();
      
      const data = new FormData(addForm);
      const id = Date.now().toString();

      const newUser: User = {
        firstName: data.get('firstName') as string,
        lastName: data.get('lastName') as string,
        age: data.get('age') as string,
        email: data.get('email') as string,
        username: data.get('username') as string,
        gender: data.get('gender') as string,
        id: id
      };

      // Validate user data
      if (!newUser.firstName || !newUser.lastName || !newUser.email) {
        alert('Please fill in all required fields');
        return;
      }

      users.push(newUser);
      
      // Reset form and hide it
      addForm.reset();
      addForm.style.zIndex = '-1';
      container.style.opacity = '1';

      // Remove the event listener to prevent multiple submissions
      addForm.removeEventListener('submit', submitHandler);
    };

    // Add event listener to the form
    addForm.addEventListener('submit', submitHandler);

    return users;
  }
}