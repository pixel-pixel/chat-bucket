<template>
  <div class='message'>
    <div class='head'>
      <span class='username'>{{ msg.username }}</span>
      <span class='time'>{{ msg.time }}</span>
    </div>

    <div class='body'>
      <p class='text'>{{ msg.text }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Message } from '~/client/types/Message.type'

@Component({name: 'Message'})
export default class extends Vue {
  @Prop() msg!: Message
}
</script>

<style scoped>
.message {
  position: relative;
  max-width: 30rem;
  min-width: 10rem;
  margin: 1rem;

  background-color: white;
  border-radius: .5rem;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  background-color: lightblue;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
}

.time {
  color: grey;
}

.body {
  padding: 1rem;
}

.message::before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  left: -.75rem;
  top: 4rem;
  border-style: solid;
  border-width: .75rem .75rem .75rem 0;
  border-color: transparent white transparent transparent;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
