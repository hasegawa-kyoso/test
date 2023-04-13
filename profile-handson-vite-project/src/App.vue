<template>
  <!-- <template v-if="page">
    <header>
      <div class="title">Self Introduction</div>
    </header>
    <p class="about">About me</p>
    <div class="name">HASEGAWA AI</div>

    <div class="flex-container">

      <template v-for="item in items" :key="item.id">
        <div v-if="!item.selected" class="item" @click="item.selected = !item.selected"
          @keyup.enter="item.selected = !item.selected" tabindex="0">
          <div class="content">
            <p>{{ item.en_name }}</p>
            <div>{{ item.name }}</div>
            <p>{{ item.description }}</p>
            <button class="button" type="button" @click="stockItem()"><router-link v-bind:to="item.button">View
                more</router-link></button>
          </div>
        </div>
      </template>



    </div>
  </template> -->
  <!-- <router-link to="/home">home</router-link> -->
  <router-view></router-view>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const items = ref([
  {
    id: 1,
    en_name: 'philosophy of HASEGAWA',
    name:
      '就業の理念',
    description: 'KYOSO社員として目指しているもの、会社や部署に約束する価値観をお伝えします。',
    button: '/philosophy',
    selected: false
  },
  {
    id: 2,
    en_name: 'HASEGAWA Profile',
    name:
      '社員概要',
    description: '長谷川の基本情報、趣味、スキルなどをご紹介します。',
    button: '/profile',
    selected: false
  }
])

let page = true;

/**
 * 商品の在庫状況を変更する
 * @param {object} 商品情報
 */
function stockItem() {
  page = false
}

</script>

<style scoped>
* {
  margin: 0;
}

body {
  background-color: #ffffff;
  font-family: "Franklin Gothic";
}

div {
  color: #ffffff;
  font-size: 20px;
  padding: 5px;
}

p {
  font-size: 15px;
}

.flex-container {
  display: flex;
  flex-flow: column;
}

.title {
  padding: 10px 20px;
  display: inline-block;
  font-size: xx-large;
  font-weight: bold;
  color: #0f2350;
}

.about {
  color: #0f2350;
  padding: 50px 10px 5px 100px;
}

.name {
  color: #0f2350;
  padding: 10px 10px 5px 100px;
  display: flex;
  font-size: x-large;
  font-weight: bold;
}

.content {
  font-size: large;
  padding: 50px;
  background: linear-gradient(90deg, rgba(20, 55, 90, 0.9), rgba(123, 132, 158, 0.3)), url(./こじゃけ.jpeg);
  background-repeat: no-repeat;
  background-position: center right;
  background-size: contain;
  color: #ffffff;
  margin: 1em auto;
  width: 80%;
  opacity: 0.5;
}

.header {
  margin: 0 auto;
  display: flex;
}

.button {
  border-radius: 100vh;
  font-size: 15px;
  padding: 10px 30px;
  margin-top: 20px;
  background-color: #7b849e;
  border-color: #ffffff;
  color: #ffffff;
}

.button:hover {
  background-color: #0f2350;
}

.buttonQA {
  border-radius: 7px;
  font-size: 30px;
  padding: 30px 100px;
  background-color: #0f2350;
  color: #ffffff;
}

.QA {
  display: flex;
  justify-content: center;
}

router-link {
  border-radius: 100vh;
  font-size: 15px;
  padding: 10px 30px;
  margin-top: 20px;
  background-color: #7b849e;
  border-color: #ffffff;
  color: #ffffff;
}
</style>
