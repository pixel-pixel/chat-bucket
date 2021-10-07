import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { User } from '../../common/types/User.type'
import { Chat } from '../../common/types/Chat.type'
import { Message } from '../../common/types/Message.type'

@WebSocketGateway(8080, { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server!: any

  users: User[] = []
  chats: Chat[] = []

  @SubscribeMessage('CREATE_USER')
  handleCreateUser() {
    const userCount = this.users.length
    const user: User = {
      id: userCount,
      name: 'Vasya Pupkin' + userCount,
      imgURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      online: true,
      info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi deserunt ea esse magnam quidem sunt? Ad aperiam, blanditiis debitis, ducimus esse fuga iure maxime molestiae praesentium recusandae, repudiandae vel?'
    }
    this.users.push(user)
    this.server.emit('UPDATE_USERS', this.users)
    this.server.emit('UPDATE_CHATS_FOR' + user.id, this.getChatsById(user.id))
    return user
  }

  @SubscribeMessage('SEND_MESSAGE')
  handleSendMessage(@MessageBody() msg: Message) {
    const { senderId, recipientId } = msg
    let chat = this.chats.find(c => (
      (c.firstId === senderId && c.secondId === recipientId) ||
      (c.firstId === recipientId && c.secondId === senderId)
    ))

    if (!chat) {
      chat = {
        firstId: senderId,
        secondId: recipientId,
        messages: []
      }
      this.chats.push(chat)
    }
    chat.messages.push(msg)
    const sendersChats = this.getChatsById(senderId)
    const recipientsChats = this.getChatsById(recipientId)
    this.server.emit('UPDATE_CHATS_FOR' + senderId, sendersChats)
    this.server.emit('UPDATE_CHATS_FOR' + recipientId, recipientsChats)
  }


  @SubscribeMessage('ENTER')
  handleEnter(@MessageBody('id') id: number) {
    console.log('enter user id:' + id)
    const user = this.users.find(u => u.id === id)
    if (user) user.online = true

    this.server.emit('UPDATE_USERS', this.users)
    this.server.emit('UPDATE_CHATS_FOR' + user?.id, this.getChatsById(user?.id ?? 0))
  }

  @SubscribeMessage('EXIT')
  handleExit(@MessageBody('id') id: number) {
    console.log('user id:' + id)
    const user = this.users.find(u => u.id === id)
    if (user) user.online = false

    this.server.emit('UPDATE_USERS', this.users)
  }

  getChatsById(id: number) {
    const res = this.chats.filter(c => (
      c.firstId === id ||
      c.secondId === id
    ))
    return res
  }
}
