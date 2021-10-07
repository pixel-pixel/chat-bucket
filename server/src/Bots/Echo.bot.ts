import Bot from './Bot'
import { Message } from '../../../common/types/Message.type'
import * as console from 'console'

export default class EchoBot extends Bot {
  constructor(id: number) {
    super(
      id,
      'Echo bot',
      'https://artforlife.ru/wp-content/uploads/2020/12/pre-obzor-amazon-echo-4-go-pokoleniya-2020-g-novyj-zenit.jpg',
      'lorem ipsem',
      )
  }

  onMessage(msg: Message,  send: (m: Message) => void) {
    const botMsg: Message = {
      ...msg,
      senderId: msg.recipientId,
      recipientId: msg.senderId,
    }
    send(botMsg)
  }
}
