<template>
  <div>
    <ChatListItem v-for="name in arr" :key="name">
      {{name}}
    </ChatListItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';

@Component({name: 'Index'})
export default class Index extends Vue {
  arr = ['kek', 'lol', 'lalka']
}
</script>

<style>
  * { 
    font-family: 'Helvetica', 'Arial', sans-serif; 
    padding: 0;
    margin: 0;
  }
</style>