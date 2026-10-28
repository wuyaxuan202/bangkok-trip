# 曼谷行程網站

三個頁面：

| 頁面 | 檔案 | 誰能用 |
|---|---|---|
| 行程 | `index.html` | 有連結的人都能看 |
| CHECK 清單 | `check.html` | 有連結的人都能打勾、新增項目，3 個人即時同步 |
| 編輯後台 | `admin.html` | 只有你指定的 Google 帳號能儲存 |

還沒設定 Firebase 之前，網站一樣能開：行程頁顯示內建行程，CHECK 清單只會存在各自的手機上。

---

## 第一步：放上 GitHub Pages

1. 在 GitHub 建立一個新的 **Public** repository，例如 `bangkok-trip`。
2. 進入 repository → **Add file → Upload files**，把這個資料夾裡的所有檔案（包含 `assets` 資料夾）拖進去，按 **Commit changes**。
3. 到 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 **Save**。
4. 等一兩分鐘，網址會是 `https://你的帳號.github.io/bangkok-trip/`。

## 第二步：建立 Firebase（免費方案就夠）

1. 到 [Firebase 主控台](https://console.firebase.google.com/)，用 Google 帳號登入，按 **新增專案**（Google Analytics 可以關掉）。
2. 專案首頁點 **網頁 `</>` 圖示** 新增網頁應用程式，取個名字，不用勾 Hosting。
3. 畫面會出現一段 `firebaseConfig = { ... }`，把裡面的值複製到這個資料夾的 **`firebase-config.js`** 對應欄位。

## 第三步：開資料庫和登入方式

1. 左側 **Firestore Database → 建立資料庫**，地區選 `asia-east1`（台灣），模式選 **正式版**。
2. 進入 Firestore 的 **規則** 分頁，把 **`firestore.rules`** 的內容整個貼上，**把 `you@gmail.com` 換成你自己的 Gmail**（要讓別人也能編輯，就加在同一個中括號裡，用逗號隔開），按 **發布**。
3. 左側 **Authentication → 開始使用 → 登入方式**，開啟 **Google** 和 **匿名** 兩種。
4. Authentication 的 **設定 → 已授權網域**，新增 `你的帳號.github.io`。

## 第四步：更新網站、第一次儲存

1. 把改好的 `firebase-config.js` 再上傳一次到 GitHub（覆蓋舊的）。
2. 打開網站的 **編輯** 頁，用 Google 登入，按 **儲存**。這會把行程存到雲端，之後行程頁就讀雲端的資料。
3. 打開 **CHECK** 頁，第一次開啟時會自動建立預設清單。

把網址傳給媽媽和同行的人就可以了，他們不用登入。CHECK 頁可以先輸入名字，打勾時會顯示是誰勾的。

---

## 常見問題

- **編輯頁按儲存出現「沒有編輯權限」**：`firestore.rules` 裡的 email 和你登入的帳號不一樣，改好後記得按發布。
- **CHECK 頁顯示「無法登入 Firebase」**：Authentication 裡的「匿名」登入沒有開。
- **Google 登入跳出錯誤 `auth/unauthorized-domain`**：已授權網域還沒加 `你的帳號.github.io`。
- **想改預設行程或預設清單**：直接改 `assets/default-data.js`，或在編輯頁修改後儲存（雲端資料優先）。

## 檔案說明

```
index.html            行程頁
check.html            CHECK 清單
admin.html            編輯後台
firebase-config.js    Firebase 設定（要自己填）
firestore.rules       資料庫權限規則（貼到 Firebase 主控台）
assets/style.css      樣式
assets/app.js         共用程式（讀取資料、Firebase 連線）
assets/default-data.js 內建行程與預設清單
```
