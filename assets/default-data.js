// 內建行程資料：Firebase 還沒設定、或資料庫還沒有資料時使用。
// 在「編輯後台」第一次儲存後，網站就會改讀 Firebase 裡的資料。

const TRIP_LINK = 'https://tw.trip.com/flights/showfarefirst?dcity=tpe&acity=bkk&ddate=2026-12-02&rdate=2026-12-06&triptype=rt&class=y&quantity=3&searchboxarg=t&nonstoponly=on&locale=zh-TW&curr=TWD';
const LOHAS_LINK = 'https://tw.trip.com/hotels/list?flexType=1&fixedDate=0&cityId=359&provinceId=0&districtId=0&countryId=4&cityName=Bangkok&destName=Lohas%20Residences%20Sukhumvit%2C%20Bangkok%2C%20Thailand&searchWord=Lohas%20Residences%20Sukhumvit&searchType=H&optionId=702065&searchValue=31%7C702065*31*702065&checkin=2026-12-02&checkout=2026-12-06&crn=1&adult=3&listFilters=29~1*29*1~3*2&curr=TWD&locale=zh-TW&old=1';
const GCP_LINK = 'https://tw.trip.com/hotels/list?city=359&checkin=2026-12-02&checkout=2026-12-06&adult=3&crn=1&children=0&locale=zh-TW&curr=TWD';
const map = (q) => ({ label: '地圖', url: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q) });

export const DEFAULT_TRIP = {
  eyebrow: 'BANGKOK · 3 人 · 5 天 4 夜',
  title: '曼谷 12/2–12/6',
  subtitle: '下午出發、住素坤逸的兩房套房，主力購物。全程包車：落地接機、每天 10 小時包車，最後一天直送機場。',
  cards: [
    { k: '去程航班（推薦）', v: '泰國航空 13:55 → 16:50', d: '桃園 T1 → 曼谷素萬那普 BKK，含託運', price: '每人來回 NT$9,700', linkLabel: '在 Trip.com 查看航班', url: TRIP_LINK },
    { k: '住宿（4 晚）', v: 'Lohas Residences Sukhumvit', d: '兩臥室套房，可免費取消，近 Nana / Terminal 21', price: '總價 NT$19,804', linkLabel: '在 Trip.com 查看房型', url: LOHAS_LINK },
    { k: '備選住宿', v: 'Grande Centre Point Ratchadamri', d: '至尊套房（一房一廳），Siam 旁，評分 9.3', price: '總價 NT$26,564', linkLabel: '在 Trip.com 搜尋', url: GCP_LINK },
  ],
  days: [
    { date: '12/2 週三', title: '抵達曼谷', tag: '接機', stops: [
      { time: '13:55', name: '桃園機場起飛', desc: '泰國航空直飛，約 3 小時 55 分', links: [] },
      { time: '16:50', name: '抵達素萬那普機場', desc: '包車司機在入境大廳舉牌接機，直送飯店', links: [{ label: '可樂旅遊 機場接送', url: 'https://www.colatour.com.tw/webDM/trip/thailand/fit.html' }] },
      { time: '18:00', name: '入住 Lohas Residences Sukhumvit', desc: '放行李、稍作休息', links: [map('Lohas Residences Sukhumvit Bangkok')] },
      { time: '晚上', name: 'Terminal 21 美食街晚餐＋逛街', desc: 'BTS Nana 搭一站到 Asok，接機那天不包晚上的車', links: [map('Terminal 21 Asok Bangkok')] },
    ] },
    { date: '12/3 週四', title: '鐵道市場＋水上市場', tag: '包車 10 小時', stops: [
      { time: '早上', name: '美功鐵道市場', desc: '司機 7 點左右到飯店接，車程約 1.5 小時', links: [
        { label: 'tripool 包車報價', url: 'https://www.tripool.app/articles/thailand-bangkok-car-charter-service' },
        { label: 'Funtime 鐵道市場行程', url: 'https://www.funtime.com.tw/localtour/maeklong-railway-market' },
        map('Maeklong Railway Market') ] },
      { time: '中午', name: '丹嫩莎朵水上市場', desc: '搭船逛市場、吃船麵；船票通常另計', links: [
        { label: 'Trip.com 水上市場行程', url: 'https://tw.trip.com/things-to-do/experiences/damnoensaduak' },
        map('Damnoen Saduak Floating Market') ] },
      { time: '下午', name: '司機送回飯店休息', desc: '留時間給媽媽休息', links: [] },
      { time: '晚上', name: '泰式按摩', desc: '飯店附近找一間放鬆', links: [] },
    ] },
    { date: '12/4 週五', title: '老城寺廟＋河岸', tag: '包車 10 小時', stops: [
      { time: '08:30', name: '大皇宮＋玉佛寺', desc: '司機送到門口；不能穿短褲、短裙、無袖', links: [{ label: '官方網站', url: 'https://www.royalgrandpalace.th' }, map('Grand Palace Bangkok')] },
      { time: '中午', name: '臥佛寺', desc: '就在大皇宮旁，走路可到', links: [map('Wat Pho Bangkok')] },
      { time: '下午', name: '鄭王廟', desc: '搭渡輪過河，司機在對岸等，河岸拍照很美', links: [map('Wat Arun Bangkok')] },
      { time: '傍晚', name: 'ICONSIAM', desc: '室內水上市場＋河景，逛完司機接回飯店', links: [map('ICONSIAM Bangkok')] },
    ] },
    { date: '12/5 週六', title: '市集與 Siam 購物', tag: '包車 10 小時', stops: [
      { time: '早上', name: '恰圖恰週末市集', desc: '只有週末開，早去比較涼；戰利品可以先放車上', links: [map('Chatuchak Weekend Market')] },
      { time: '下午', name: 'Siam Paragon / Siam Center', desc: 'Siam 商圈百貨連在一起', links: [map('Siam Paragon Bangkok')] },
      { time: '傍晚', name: 'Central World＋四面佛', desc: '天橋步行可到；晚上 BTS 演唱會散場前請司機接回', links: [map('centralwOrld Bangkok')] },
      { time: '晚上', name: '泰式按摩', desc: '逛一整天後腳底按摩', links: [] },
    ] },
    { date: '12/6 週日', title: '最後採買、回台灣', tag: '包車＋送機', stops: [
      { time: '早上', name: 'EmQuartier / Emporium', desc: 'BTS Phrom Phong 站', links: [map('EmQuartier Bangkok')] },
      { time: '中午', name: 'Big C 超市', desc: '零食伴手禮一次買齊', links: [map('Big C Rajdamri Bangkok')] },
      { time: '下午', name: '回飯店拿行李 → 司機直送機場', desc: '行李一直放車上也可以；依回程班機時間調整', links: [] },
    ] },
  ],
  budget: [
    { item: '機票', desc: '泰國航空 9,700 × 3', amount: '29,100' },
    { item: '住宿', desc: 'Lohas Residences 兩臥室套房 4 晚', amount: '19,804' },
    { item: '接機', desc: '12/2 素萬那普 → 飯店（起價，依車型）', amount: '750 起' },
    { item: '包車', desc: '12/3–12/6 每天約 10 小時，2,500–4,500 × 4 天', amount: '10,000–18,000' },
  ],
  total: { desc: '每人約 19,900–22,600', amount: '59,654–67,654' },
  notes: [
    'Lohas 訂「雙臥室套房」，選可免費取消的方案先卡位。',
    '包車建議同一家連訂 4 天，常有多日優惠；確認中文司機、7 人座、含過路費與停車費、超時怎麼算，以及司機餐費要不要另付。',
    '曼谷市區很塞，Siam 購物那天如果卡在車陣裡，BTS 反而比較快，可以請司機在下一站等。',
    '12/3、12/5、12/6 晚上 BTS 在 Rajamangala 體育場開唱，那幾晚叫車和 BTS 會比較擠，行程盡量早點收。',
    '入境前 3 天內要線上填寫泰國數位入境卡（TDAC）。',
  ],
  footer: '價格為 Trip.com 2026/10/28 早上查詢結果，含稅，隨時會變動。包車費用為一般市場行情估計（每台 10 小時 NT$2,500–4,500）；接機為可樂旅遊公告起價。',
};

// CHECK 清單的預設項目（第一次開啟清單頁時自動建立）
export const DEFAULT_CHECKLIST = [
  ['行程安排', '訂機票（泰航 12/2 13:55 去程，確認回程時間）'],
  ['行程安排', '訂 Lohas 雙臥室套房（可免費取消方案）'],
  ['行程安排', '訂 12/2 接機'],
  ['行程安排', '訂 12/3–12/6 包車（中文司機、7 人座）'],
  ['行程安排', '把每天行程傳給包車司機'],
  ['行程安排', '12/3 水上市場船票（確認包不包含）'],
  ['行程安排', '保旅遊平安險'],
  ['行程安排', '買泰國網卡或 eSIM'],
  ['行程安排', '換泰銖'],
  ['行程安排', '出發前 3 天內填 TDAC 數位入境卡（3 人都要）'],
  ['證件與錢', '護照（效期 6 個月以上）'],
  ['證件與錢', '機票、飯店、包車訂單截圖'],
  ['證件與錢', '信用卡'],
  ['證件與錢', '泰銖現金'],
  ['行李', '大皇宮穿的長褲或長裙、有袖上衣'],
  ['行李', '輕便衣物、好走的鞋'],
  ['行李', '防曬、帽子、太陽眼鏡'],
  ['行李', '摺疊傘'],
  ['行李', '常備藥品'],
  ['行李', '手機充電器、充電線'],
  ['行李', '行動電源（放隨身行李）'],
  ['行李', '折疊購物袋'],
  ['行李', '行李秤（回程戰利品）'],
].map(([group, text], i) => ({ group, text, order: i }));
