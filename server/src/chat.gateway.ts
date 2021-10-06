import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'

@WebSocketGateway(8080,{cors: true})
export class ChatGateway {
  @WebSocketServer()
  server!: any

  @SubscribeMessage('addOne')
  handleAddOne(@MessageBody() message: string) {
    this.server.emit('addOne', message + 1)
  }

}
