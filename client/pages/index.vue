<template>
  <div v-show='me' class='root'>
    <div class='chat'>
      <Chat
        v-if='chatUser !== null'
        :me='me'
        :user='chatUser'
        :messages='messages'
      />
    </div>
    <UserList
      v-if='me !== null'
      :users-data='usersData'
      :on-choose='(id) => {chatUser = users.find(u => u.id === id)}'
      class='user-list'
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { NuxtSocket } from 'nuxt-socket-io'
import { User } from '~/common/types/User.type'
import { Chat } from '~/common/types/Chat.type'

@Component({ name: 'Index' })
export default class Index extends Vue {
  socket!: NuxtSocket
  me: User | null = null
  users: User[] = []
  chatUser: User | null = null
  chats: Chat[] = []

  get messages() {
    return this.chats.find(c => (
      c.firstId === this.chatUser?.id ||
      c.secondId === this.chatUser?.id
    ))?.messages ?? []
  }

  get usersData() {
    return this.users.map(u => {
      const msgs = this.chats.find(c => (
        c.firstId === u.id ||
        c.secondId === u.id
      ))?.messages ?? []

      return {
        user: u,
        lastMsg: msgs[msgs.length - 1]?.text ?? ''
      }
    })
  }

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
      this.chats = chats
    })
  }

  checkUser() {
    const user = localStorage.getItem('user211356q1x1j10q2xq')
    if (user) {
      this.me = JSON.parse(user)
      this.enter()
      this.subsToChats()
    } else {
      this.socket.emit('CREATE_USER', null, (user: User) => {
        localStorage.setItem('user211356q1x1j10q2xq', JSON.stringify(user))
        this.me = user
        this.subsToChats()
      })
    }
  }

  enter() {
    this.socket.emit('ENTER', { id: this.me?.id })
  }

  exit() {
    this.socket.emit('EXIT', { id: this.me?.id })
  }
}
</script>

<style>
* {
  font-family: 'Helvetica', 'Arial', sans-serif;
  padding: 0;
  margin: 0;
  color: #333333;
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
  height: 3rem;
  margin: 1rem .5rem;
  padding-left: .75rem;
  padding-top: .1rem;

  color: #333333;
  font-size: 1.2rem;

  border: #c6c6c6 2px solid;
  border-radius: .3rem;
  box-sizing: border-box;
  outline: none;
}

input[type='text']:hover {
  filter: drop-shadow(0 0 5px #c6c6c6);
}

input[type='text']::placeholder {
  color: #a6a6a6;
}

input[type='text']:focus {

  border: #62ABEA 1px solid;
  filter: drop-shadow(0 0 5px #62ABEA);
}

button {
  color: white;
  font-size: 1.1rem;
  width: 25rem;
  height: 3rem;
  margin: 1rem .5rem;

  background-color: #428BCA;
  border: none;
  border-radius: .4rem;
  outline: none;
}

button:hover {
  background-color: #62ABEA;
}

button:active {
  background-color: #225BAA;
}
</style>
