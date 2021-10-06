<template>
  <div class='root'>
    <div class='chat'>
      <Chat :chat-history='messages' />
    </div>
    <UserList :users='users' class='user-list' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { Message } from '~/client/types/Message.type'

@Component({ name: 'Index' })
export default class Index extends Vue {
  arr = ['kek', 'lol', 'lalka']
  messages: Message[] = [
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами?',
      time: '4:20 AM',
      isSeen: false
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами??',
      time: '4:20 AM',
      isSeen: false,
      isMy: true
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами???',
      time: '4:20 AM',
      isSeen: false
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами?',
      time: '4:20 AM',
      isSeen: false
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами??',
      time: '4:20 AM',
      isSeen: false,
      isMy: true
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами???',
      time: '4:20 AM',
      isSeen: false
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами?',
      time: '4:20 AM',
      isSeen: false
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами??',
      time: '4:20 AM',
      isSeen: false,
      isMy: true
    },
    {
      username: 'Andrii Bartish',
      text: 'Привіт, ну що там з грошами???',
      time: '4:20 AM',
      isSeen: false
    },
  ]
  users = [
    {
      name: 'kek1',
      lastMsg: 'sfsf',
      imgURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      online: false
    },
    {
      name: 'kek2',
      lastMsg: 'sfsf',
      imgURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      online: true
    },
    {
      name: 'kek3',
      lastMsg: 'sfsf',
      imgURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      online: false
    },
  ]
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
