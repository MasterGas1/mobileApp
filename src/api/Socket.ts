import io, {Socket} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SocketService {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  async connect() {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    if (!this.socket) {
      this.socket = io('http://192.168.100.45:4000', {
        transports: ['websocket'],
        extraHeaders: {
          token: token,
        },
      });
    } else if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;
