<script setup lang="ts">
import { ref } from 'vue'
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

var refyear  = ref();
var refmonth = ref();
var refday = ref();
var resultStr = ref();

/**
 * 占い
*/
function getAge() {

const Hval = 39; //長谷川の生年月日各桁合計

var val = 0; //ユーザの生年月日各桁合計を入れる場所
var result; //結果

const wari = 5; //割る数字

// 要素の取得

var birthYear = refyear.value;
var birthMonth = refmonth.value;
var birthDate = refday.value;
var birthday = new Date(birthYear + ',' + birthMonth + ',' + birthDate );

//  今日の日付を取得
var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth()+1;
var nowDate = now.getDate();

//入力値が数値であるか、正しい年月日であるか
if (isNaN(birthYear)) {
  return alert('年に数値を入力してください')
} else if (birthYear < 1900 || birthYear > nowYear) {
  return alert('入力年に正しい値を設定してください')
};
if (isNaN(birthMonth)) {
  return alert('月に数値を入力してください')
} else if (birthMonth < 1 || birthMonth > 12) {
  return alert('入力月に正しい値を設定してください')
};
if (isNaN(birthDate)) {
  return alert('年に数値を入力してください')
} else if (birthDate < 1 || birthDate > 31) {
  return alert('入力年に正しい値を設定してください')
};

// 関連項目チェック
// 入力年が当日年と等しいかつ入力月が当日月より大きいか
if(birthYear == nowYear && birthMonth > nowMonth){
  return alert('未来日付（月）は入力できません')
};
// 入力年が当日年と等しいかつ入力月が当日月と等しいかつ入力日が当日日より大きいか
if(birthYear == nowYear && birthMonth == nowMonth && birthDate > nowDate){
  return alert('未来日付（日）は入力できません')
};

//  妥当な日付であるか（うるう年2月29日）
var month = birthday.getMonth() + 1;
if (birthMonth != month) {
  return alert('有効な年月日で無いので見直してください')
};

/*ユーザの生年月日の各桁を合計する */
/* todo */
var tmp = 0; //一次退避
//例：1983
var valyear1 = Math.floor(birthYear / 1000); //千の位　1
tmp = birthYear - (valyear1 * 1000);//993
var valyear2 = Math.floor(tmp / 100); //百のくらい 9
tmp = tmp - (valyear2 * 100);//93
var valyear3 = Math.floor(tmp / 10); //十のくらい 8
var valyear4 = tmp - (valyear3 * 10); //一のくらい 3

var valmounth1 = Math.floor(birthMonth / 10); //十のくらい 8
var valmounth2 = birthMonth % 10; //一のくらい 3

var valday1 = Math.floor(birthDate / 10); //十のくらい 8
var valday2 = birthDate % 10; //一のくらい 3

val = valyear1 + valyear2 +valyear3 + valyear4 + valmounth1 + valmounth2 + valday1 + valday2;

/* 相性（？）計算 */
/**todo */
if(val > Hval) {
  result = val - Hval;
}
else {
  result = Hval - val;
}
result = result % wari;


/*相性*/
const saiko = 0; //マブ
const ryo = 1; //良い
const futu = 2; //普通Ï
const aku = 3; //悪い
const saiaku = 4; //最悪

// var resultStr = "";
if (result == saiko){
  resultStr.value = "最高";
}else if (result == ryo){
  resultStr.value = "良い";
}else if (result == futu){
  resultStr.value = "普通";
}else if (result == aku){
  resultStr.value = "あんまり";
}else if (result == saiaku){
  resultStr.value = "残念";
}

// console.log(resultStr);
// return resultStr;
}

</script>

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
            <template
              v-for="navitem in navitems"
              :key="navitem.id">
              <li class="nav_item"><router-link v-bind:to="navitem.button">{{ navitem.name }}</router-link></li>
            </template>
          </ul>
        </nav>
   
      </div>
      <div class="title">目標</div>
    </header>
    <div class="flex-container">
      <div>
        <p>スキルアップがしたいと思い入社しました。<br/>
          お客様のIoT支援をHW〜クラウドまで幅広く網羅しているこの部署で<br/>
          フロントエンド開発とHWの分野で一番になりたいです。<br/>
          詳しいスキルはprofileページに記載しますのでご覧ください。<br/>
          しばらく研修となりますので色々と皆さんにはお世話になります。よろしくお願いします。<br/>
          1日も早く1人前のリソースとして貢献できるように頑張ります。
        </p>
      </div>
      <div>
        <h2>さて、私と相性占いをしましょう。</h2>
        <p>あなたの誕生日を入力してください</p>
        <p>
        <input type="text" v-model="refyear" id="birthYear" size="4" maxlength="4">年
        <input type="text" v-model="refmonth" id="birthMonth" size="2" maxlength="2">月
        <input type="text" v-model.number="refday" id="birthDate" size="2" maxlength="2">日
        <!-- <input type="button" value="計算！" onclick="getAge();"> -->
        <button type="button" v-on:click="getAge()">占う</button>
        </p>
        <!-- <p><br>あなたと長谷川の相性は　<span id="resultStr"></span>　ですね</p> -->
        <p><br>あなたと長谷川の相性は　{{ resultStr }}　ですね</p>
        <!-- <script src="index_script.js"></script> -->
      </div>
    </div>
</template>

<style scoped>
* {
  margin: 0;
}
body {
  background-color: #F0F0E0 ;
}
header {
  background-color: #8DB2BA;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  /* padding: 0 20px; */
}
div {
  color: #F0F0E0;
  background-color: #edb5b5;
}
.flex-container {
  display: flex;
  flex-flow: column;
  display: flex;
  padding: 10px;
  /* 枠線を見えるようにする */
  border: solid;
  /* 枠線の色指定 */
  border-color: #F0F0E0;
  height: max-content;
  margin: 100px;
}

.title {
  padding: 10px 20px;
  display: inline-block;
  font-size: xx-large;
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
  z-index: 100;/* 重なり順を一番上にする */
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
#drawer_input:checked ~ .drawer_open span {
  background: #F0F0E0;
}

/* アイコンがクリックされたらアイコンが×印になように上下の線を回転 */
#drawer_input:checked ~ .drawer_open span::before {
  bottom: 0;
  transform: rotate(45deg);
}

#drawer_input:checked ~ .drawer_open span::after {
  top: 0;
  transform: rotate(-45deg);
}
  
/* メニューのデザイン*/
.nav_content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 100%; /* メニューを画面の外に飛ばす */
  z-index: 99;
  background: #8DB2BA;
  transition: .5s;
}

/* メニュー黒ポチを消す */
.nav_list {
  list-style: none;
  padding: 50px;
}

a{
  color: #F0F0E0;
  font-size: 15pt;
  font-weight: bold;
  text-decoration: none;
}

/* アイコンがクリックされたらメニューを表示 */
#drawer_input:checked ~ .nav_content {
  left: 0;/* メニューを画面に入れる */
}
</style>