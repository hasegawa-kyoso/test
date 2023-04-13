<template>
  <header>
    <div class="nav">

      <!-- ハンバーガーメニューの表示・非表示を切り替えるチェックボックス -->
      <input id="drawer_input" class="drawer_hidden" type="checkbox">

      <!-- ハンバーガーアイコン -->
      <label for="drawer_input" class="drawer_open"><span></span></label>

      <!-- メニュー -->
      <nav class="nav_content">
        <ul class="nav_list">
          <template v-for="navitem in navitems" :key="navitem.id">
            <li class="nav_item"><router-link v-bind:to="navitem.button">{{ navitem.name }}</router-link></li>
          </template>
        </ul>
      </nav>

    </div>
    <div class="title">Profile</div>
  </header>
  <div class="flex-container">
    <div class="left">
      <div class="icon"><img src="./icon.png" /></div>
      <div class="name">
        <div class="fam-name">{{ fam_name }}</div>
        <div class="fst-name">{{ fst_name }}</div>
      </div>
    </div>
    <div class="right">
      <!-- <template v-for="titleitem in tileitems" :key="titleitem.id"> -->
      <!-- <div class="content" v-on="setup()"> -->
        <div class="content">
        <div>{{ profileData['list'][1] }}</div>
        <!-- <div>{{ titleitem.title }}</div> -->
        <!-- <template v-for="itemval in titleitem.description" :key="itemval.val"> -->
        <!-- <li v-if="titleitem.link"><router-link v-bind:to="titleitem.linkurl">{{ itemval.val }}</router-link></li> -->
        <!-- <li v-else>{{ itemval.val }}</li> -->
        <!-- <li>{{ itemval.val }}</li> -->
        <!-- templateで囲むと中身が表示されない？？？ -->
        <!-- <li>{{ profileData.name }}</li> -->
        <!-- {{ hobbies }} -->
        <ul>
          <li v-for="item in hobbies" :key="item">
            {{ item }}
          </li>
        </ul>
        <div>{{ profileData['list'][2] }}</div>
        <li>{{ profileData.like }}</li>
        <div>{{ profileData['list'][3] }}</div>
        <li>{{ profileData.skill }}</li>
        <div>{{ profileData['list'][4] }}</div>
        <li>{{ profileData.comment }}</li>
      </div>
      <!-- </template> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const URL =
  "https://6xgh0eoqu8.execute-api.ap-northeast-1.amazonaws.com/prod/user-data";

const fam_name = "HASEGAWA";
const fst_name = "AI"

const hobbies = ref([]);


const profileData = ref(
  {
    id: "",
    name: "",
    skill: "",
    "hobby-list": [],
    like: "",
    comment: "",
    "list": []
  }
)

const navitems = ref([
  {
    id: 1,
    name:
      'TOP',
    button: '/',
    selected: false
  },
  {
    id: 2,
    name:
      '就業の理念',
    button: '/philosophy',
    selected: false
  },
  {
    id: 3,
    name:
      '社員概要',
    button: '/profile',
    selected: false
  }
])


// async getProfileData(){
//       try {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const { data } = await axios.post(URL, { method: "get" });
//         console.log(data);
//         profileData = data[0];
//       } catch (err) {
//         console.error(err);
//         profileData = null;
// }
// }



// async function getProfileData(){
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const { data } = await axios.post(URL, { method: "get" });
//     console.log(data);
//     profileData = data[0];
//   } catch (err) {
//     console.error(err);
//     // profileData.value = null;
//   }
// }


onMounted(() => {
  const error = ref(null)

  const load = async () => {
    try {
      const { data } = await axios.post(URL, { method: "get" });
      // console.log(data); //statusが OKか確認する。
      profileData.value = data[0];
      console.log(profileData);
      hobbies.value = profileData.value["hobby-list"];

      // name = profileData.value.name;

    } catch (err) {
      console.log("エラー：" + error);
    }
  }
  load();
})

// function setup() {
//   const error = ref(null)

//   const load = async () => {
//     try {
//       const { data } = await axios.post(URL, { method: "get" });
//       // console.log(data); //statusが OKか確認する。
//       profileData = data[0];
//       console.log(profileData);
//       // hobbies = profileData.value["hobby-list"];

//       // name = profileData.value.name;

//     } catch (err) {
//       console.log("エラー：" + error);
//     }
//   }
//   load();
//   return profileData;
// }

</script>



<style scoped>
* {
  margin: 0;
}

body {
  background-color: #F0F0E0;
}

header {
  background-color: #8DB2BA;
  display: flex;
}

div {
  color: #F0F0E0;
  background-color: #edb5b5;
}

.flex-container {
  display: flex;
  padding: 10px;
  /* 枠線を見えるようにする */
  border: solid;
  /* 枠線の色指定 */
  border-color: #F0F0E0;
  height: max-content;
  margin: 100px;
}

.left {
  text-align: center;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  border: 3px solid #F0F0E0;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  object-fit: cover;
}

.title {
  padding: 10px 20px;
  display: inline-block;
  font-size: xx-large;
}

.name {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  font-size: x-large;
}

.fam-name {
  display: inline;
  background-color: #F0F0E0;
  color: #edb5b5;
  border: 2px solid #F0F0E0;
  padding: 2px 10px;
  padding-right: 5px;
}

.fst-name {
  display: inline;
  border: 2px solid #F0F0E0;
  padding: 2px 10px;
  padding-left: 5px;
}

.right {
  display: flex;
  flex-flow: column;
  flex-basis: 70%;
}

.content {
  font-size: large;
}

.header {
  margin: 0 auto;
  display: flex;
}




/* チェックボックスを非表示にする */
.drawer_hidden {
  display: none;
}

/* ハンバーガーアイコンの設置スペース */
.drawer_open {
  display: flex;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
  /* 重なり順を一番上にする */
  cursor: pointer;
}

/* ハンバーガーメニューのアイコン */
.drawer_open span,
.drawer_open span:before,
.drawer_open span:after {
  content: '';
  display: block;
  height: 3px;
  width: 25px;
  border-radius: 3px;
  background: #F0F0E0;
  transition: 0.5s;
  position: absolute;
}

/* 三本線の一番上の棒の位置調整 */
.drawer_open span:before {
  bottom: 8px;
}

/* 三本線の一番下の棒の位置調整 */
.drawer_open span:after {
  top: 8px;
}

/* アイコンがクリックされたら真ん中の線を透明にする */
#drawer_input:checked~.drawer_open span {
  background: #F0F0E0;
}

/* アイコンがクリックされたらアイコンが×印になように上下の線を回転 */
#drawer_input:checked~.drawer_open span::before {
  bottom: 0;
  transform: rotate(45deg);
}

#drawer_input:checked~.drawer_open span::after {
  top: 0;
  transform: rotate(-45deg);
}

/* メニューのデザイン*/
.nav_content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 100%;
  /* メニューを画面の外に飛ばす */
  z-index: 99;
  background: #8DB2BA;
  transition: .5s;
}

/* メニュー黒ポチを消す */
.nav_list {
  list-style: none;
  padding: 50px;
}

a {
  color: #F0F0E0;
  font-size: 15pt;
  font-weight: bold;
  text-decoration: none;
}

/* アイコンがクリックされたらメニューを表示 */
#drawer_input:checked~.nav_content {
  left: 0;
  /* メニューを画面に入れる */
}
</style>
