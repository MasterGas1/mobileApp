import io, { Socket } from 'socket.io-client';

class SocketService {

    socket: Socket | null;
    constructor() {
        this.socket = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io('http://192.168.100.45:4001', {
                transports: ['websocket']
            });
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null
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
export default socketService