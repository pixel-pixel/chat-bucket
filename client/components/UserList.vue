<template>
  <div class='user-list'>
    <div class='user-list__btns'>
      <div class='list-btn'
           :class='{"list-btn_active": isOnline}'
           @click='isOnline = true'>
        <span class='label'>Online</span>
      </div>
      <div class='list-btn'
           :class='{"list-btn_active": !isOnline}'
           @click='isOnline = false'>
        <span class='label'>All</span>
      </div>
    </div>

    <div class='users'>
      <UserItem
        v-for='user in usersList'
        :key='user.name'
        :user='user'
        @click.native='onChoose(user.id)'
      />
    </div>

    <input v-model='search' class='input' type='text'  />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { User } from '~/common/types/User.type'

@Component({name: 'UserList'})
export default class extends Vue {
  @Prop() users!: User[]
  @Prop() onChoose!: (id: number) => void
  isOnline = false
  search = ''

  get usersList() {
    const normalizedSearch = this.search.toLowerCase()
    const searchedUsers = this.users.filter(u => {
      const normalizedName =  u.name.toLowerCase()
      return normalizedName.includes(normalizedSearch)
    })

    if (this.isOnline) {
      return searchedUsers.filter(u => u.online)
    }
    return searchedUsers
  }
}
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;

  background-color: white;
}

.user-list__btns {
  display: flex;
  justify-content: stretch;
}

.list-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;

  color: grey;
  box-sizing: border-box;
  background-color: lightgray;
  border: 1px grey solid;
  border-top: none;
}
.list-btn_active {
  color: black;

  background-color: white;
  border: none;
}

.users {
  flex-grow: 1;
}
</style>
