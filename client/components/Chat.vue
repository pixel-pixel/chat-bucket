<template>
  <div class='chat'>
    <UserInfo :user='user'/>

    <div class='messages'>
      <Message v-for='msg in chatHistory' :key='msg.text' :msg='msg' />
    </div>

    <div class='controls'>
      <input type='text'>
      <button>Send message</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Message } from '~/client/types/Message.type'

@Component({name: 'Chat'})
export default class extends Vue {
  @Prop() chatHistory!: Message[]
  user =  {
    name: 'kek1',
    lastMsg: 'sfsf',
    imgURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    online: false
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
