class View{
    constructor(){
        this. user_list=document.querySelector('.user_list');
    }
    render(data){
      data.forEach(element => {
          const user=document.createElement('div');
          const first_name=document.createElement('span');
          const last_name=document.createElement('span');
          const email=document.createElement('span');
          const username=document.createElement('span');
          const age=document.createElement('span');
          const gender=document.createElement('span');
          const editbtn=document.createElement('button');
          const deletebtn=document.createElement('button');
          editbtn.className='edit-btn';
          deletebtn.className='delete-btn';
          editbtn.textContent='Edit';
          deletebtn.textContent='Delete';
          user.className='user_list_item';
          first_name.className='user_list_first_name';
          last_name.className='user_list_last_name';
          age.className='user_list_age';
          email.className='user_list_email';
          username.className='user_list_username';
          gender.className='user_list_gender';
          first_name.textContent=element.firstName;
          last_name.textContent=element.lastName;
          email.textContent=element.email;
          username.textContent=element.username;
          age.textContent=element.age;
          gender.textContent=element.gender;
          user.appendChild(first_name);
          user.appendChild(last_name);
          user.appendChild(email);
          user.appendChild(username);
          user.appendChild(age);
          user.appendChild(gender);
          user.appendChild(editbtn);
          user.appendChild(deletebtn);
          console.log(user)
          this.user_list.appendChild(user);
          
      });
    }
    addUser(){

    }
    sortbtn(){

    }
}
class Model{
    constructor(){
        this.url='https://dummyjson.com/users';
    }
    async getUsers(){
       const response=await fetch( `${this.url}`);
       const data=await response.json();
       return data; 
   
    }
    addUser(){

    }
    sortUser(){

    }

}
class Controller{
  constructor(Model,View){
       this.Model=Model;
       this.View=View;
       this.init();
        
  }  
  async init(){
      const val=await this.Model.getUsers();
      // console.log(val);
      this.View.render(val.users);
      
  } 
  handleAdd(){

  } 
  handleSort(){

  } 
}
const app=new Controller(new Model,new View);