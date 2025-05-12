import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../socket/socketService';
import { Socket , io } from 'socket.io-client';
import { ApiSerivice } from '../../constraints/apiSerivice';


@Component({
  selector: 'app-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  socket !: Socket
  message: string = '';
  // messages: string[] = [];
  // users: { username: string }[] = []; 

  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];


  selectedUser: any = null;

  messages = {
    1: ['Hi Alice!', 'How are you?'],
    2: ['Hey Bob!', 'Ready for the meeting?'],
    3: ['Yo Charlie!', 'Let’s catch up later.'],
  };


  currentMessages: string[] = [];

  newMessage = '';

  constructor(private socketService : SocketService,private apiService : ApiSerivice){}

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    this.socket.on('receiveMessage', (message: string) => {
      console.log("reached the message",message)
      // this.messages.push(message);
    });

    const id = Number(localStorage.getItem("user_id"))
    console.log("iddd",id)

    if(id){
    
      this.apiService.chatUsers(id).subscribe(
        (response : any) => {
          console.log(response)
          if(response && response.result){
            // this.users = response.result
          }
        },
        (error)=>{
          console.log(error)
        }
        )
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    // this.currentMessages = this.messages[user.id] || [];
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socket.emit('sendMessage', this.message);
      // this.messages.push(this.message);
      this.message = '';
    }
  }



}
