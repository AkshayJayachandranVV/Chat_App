import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../socket/socketService';
import { Socket , io } from 'socket.io-client';


@Component({
  selector: 'app-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  socket !: Socket
  message: string = '';
  messages: string[] = [];

  constructor(private socketService : SocketService){}

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    this.socket.on('receiveMessage', (message: string) => {
      console.log("reached the message",message)
      this.messages.push(message);
    });

    


  }

  sendMessage() {
    if (this.message.trim()) {
      this.socket.emit('sendMessage', this.message);
      this.messages.push(this.message);
      this.message = '';
    }
  }



}
