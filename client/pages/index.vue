<template>
  <div v-show='me' class='root'>
    <div class='chat'>
      <Chat
        v-if='chatUser !== null'
        :me='me'
        :user='chatUser'
        :chat-history='messages'
      />
    </div>
    <UserList
      :users='users'
      :on-choose='(id) => {chatUser = users.find(u => u.id === id)}'
      class='user-list'
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { NuxtSocket } from 'nuxt-socket-io'
import { Message } from '~/common/types/Message.type'
import { User } from '~/common/types/User.type'
import { Chat } from '~/common/types/Chat.type'

@Component({ name: 'Index' })
export default class Index extends Vue {
  messages: Message[] = []

  socket!: NuxtSocket

  me: User | null = null
  users: User[] = []
  chatUser: User | null = null

  mounted() {
    this.socket = this.$nuxtSocket({
      reconnection: false
    })

    this.checkUser()
    this.subsToUsers()
  }

  subsToUsers() {
    this.socket.on('UPDATE_USERS', (arr: User[]) => {
      this.users = arr.filter(u => u.id !== this.me?.id)
    })
  }

  subsToChats() {
    this.socket.on('UPDATE_CHATS_FOR' + this.me?.id, (chats: Chat[]) => {
      console.log(chats)
    })
  }

  close() {
    this.exit()
  }

  enter() {
    this.socket.emit("ENTER", {id: this.me?.id})
  }

  exit() {
    this.socket.emit("EXIT", {id: this.me?.id})
  }

  checkUser() {
    const user = localStorage.getItem('user211356q1x1j')
    if (user) {
      this.me = JSON.parse(user)
      this.enter()
      this.subsToChats()
    } else {
      this.socket.emit("CREATE_USER", null, (user: User) => {
        localStorage.setItem('user211356q1x1j', JSON.stringify(user))
        this.me = user
        this.subsToChats()
      })
    }
    console.log('me: ' + this.me?.name)
  }
}
</script>

<style>
* {
  font-family: 'Helvetica', 'Arial', sans-serif;
  padding: 0;
  margin: 0;
}

.root {
  display: flex;
  justify-content: stretch;
  position: relative;
  width: 100vw;
  height: 100vh;
}

.user-info {
  position: relative;
  top: 0
}

.chat {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 50%;
  max-height: 100%;
}

.user-list {
  width: 50%;
}

input[type='text'] {
  width: 100%;
  height: 2.75rem;

  border-radius: .3rem;
  box-sizing: border-box;
}
</style>
