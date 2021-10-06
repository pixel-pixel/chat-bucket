<template>
  <div class='chat'>
    <UserInfo :user='user'/>

    <div class='messages'>
      <Message v-for='msg in messages' :key='msg.text' :msg='msg' />
    </div>

    <div class='controls'>
      <input v-model='messageText' type='text'>
      <button @click='sendMsg'>Send message</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { NuxtSocket } from 'nuxt-socket-io'
import { Message } from '~/common/types/Message.type'
import { User } from '~/common/types/User.type'
import { Chat } from '~/common/types/Chat.type'

@Component({name: 'Chat'})
export default class extends Vue {
  @Prop() me!: User
  @Prop() user!: User

  socket!: NuxtSocket
  messages: Message[] = []
  messageText: string = ''

  mounted() {
    this.socket = this.$nuxtSocket({
      reconnection: false
    })

    this.subsToMessages()
  }

  getMessages() {

  }

  subsToMessages() {
    this.socket.on('UPDATE_CHATS_FOR' + this.me?.id, (chats: Chat[]) => {
      console.log('kek' + chats)
      this.messages = chats.find(c => (
        c.firstId === this.user.id ||
        c.secondId === this.user.id
      ))?.messages ?? []
    })
  }

  sendMsg() {
    const msg: Message = {
      senderId: this.me.id,
      senderName: this.me.name,
      recipientId: this.user.id,
      recipientName: this.user.name,
      text: this.messageText,
      time: '4:20 AM'
    }

    this.socket.emit('SEND_MESSAGE', msg)
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  flex-grow: 1;

  background-color: lightblue;
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
}

.controls {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background: yellow;
}
</style>
