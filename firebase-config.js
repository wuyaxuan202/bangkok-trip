// 把 Firebase 主控台「專案設定 → 一般 → 你的應用程式」裡的設定貼到這裡。
// 這組設定本來就會公開在網頁上，放進 GitHub 沒關係；資料安全由 firestore.rules 控制。
// 還沒設定前，網站會用內建行程，CHECK 清單只會存在各自的手機上。
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
