import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('connect_error', (err) => {
      console.error('❌ Socket connection failed:', err.message);
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessages(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (msg: string) => {
        observer.next(msg);
      });
    });
  }
}
