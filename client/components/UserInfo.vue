<template>
  <div class='user-info'>
    <img class='user-info__photo' :src='user.imgURL' />
    <div class='user-info__text'>
      <h6 class='user-info__name'>{{ user.name }}</h6>
      <p class='user-info__info'>{{ user.lastMsg }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { User } from '../types/User.type';

@Component({name: 'UserInfo'})
export default class extends Vue {
  @Prop() user!: User
}
</script>

<style scoped>
  .user-info {
    display: flex;
    width: 100%;

    background-color: lightblue;
  }

  .user-info__photo {
    width: 12rem;
    height: 12rem;
  }
</style>
