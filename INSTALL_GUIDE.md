# Uzuza — As-built Fill-in · Installation guide

*Uzuza* (Kinyarwanda: "fill in / complete") is the field app used to add customers and poles that are constructed but not shown on the LV as-built drawings (RUEAP Lot 2).

## Package contents

| File | Role |
|---|---|
| `index.html` | The app (map library and all logic included — **no customer data**) |
| `manifest.webmanifest` | App name, icon and colours used for installation |
| `sw.js` | Service worker: lets the app open and work without internet |
| `icons/` | App icons (Android, iPhone) |

All files must stay together, in the same folder structure.

**Customer list (kept private):** `Uzuza_customers_Lot2_20261107.json` is delivered **separately** and must **never** be uploaded to GitHub — a GitHub Pages site is public. Send it to the agents by WhatsApp only.

---

## A. Put the app online (supervisor, once)

A phone can only **install** the app from an **https** link. GitHub Pages is free:

1. Sign in at github.com → **New repository** → name it `uzuza` → **Public** → **Create**.
2. On the repository page: **Add file ▸ Upload files** → drag `index.html`, `manifest.webmanifest`, `sw.js` and the `icons` folder → **Commit changes**.
3. **Settings ▸ Pages** → *Source*: **Deploy from a branch** → Branch **main** / **(root)** → **Save**.
4. After 1–2 minutes the link appears: `https://<github-account>.github.io/uzuza/`
5. Send this link to the agents (WhatsApp).

**Updating the app later:** upload the new `index.html` (and the new `sw.js` if one is provided) to the same repository. Agents' phones receive the update the next time they open the app with internet ("New version installed — close and reopen Uzuza").

---

## B. Install on the agent's phone (Android, Chrome)

1. Open the link **in Chrome** (not inside WhatsApp: press ⋮ ▸ *Open in Chrome*).
2. Chrome shows **"Install app"** (or ⋮ ▸ **Install app / Add to Home screen**). Confirm.
3. The **Uzuza** icon appears on the home screen. Open it from there from now on.
4. First opening: choose your name (top right), allow **Location** when asked.
5. Download the customer list file received by WhatsApp, then in the app: **Data ▸ 📂 Load customer list** → choose `Uzuza_customers_….json`. The list stays on the phone (offline).
6. Phone settings: **Location ON**, mode **High accuracy**.

iPhone: open the link in **Safari** ▸ Share ▸ **Add to Home Screen**.

### Before going to site (with internet)
- Open the app once — it is then stored on the phone and works **offline**.
- Open the **Map** tab and browse the villages you will survey: the satellite tiles you view are kept for offline use (up to ~4,000 tiles).

---

## C. Daily use on site

1. **Customers** tab → filter by list / sector / cell. Red = conflicting data to verify, orange = data to collect.
2. Open a customer → **📍 TAKE COORDINATES (GPS)** standing at the meter → wait for the accuracy (aim ≤ 5 m).
3. Tick each point of **"To verify on site"** after correcting the field.
4. Meter type, transformer, supply pole (on the drawing or **new pole**), measured service cable, photos → **Save**.
5. New pole not on the drawing → **+ Record this new pole** (GPS at the pole, previous pole, conductor, earthing, stay).
6. Customer not in the list → **+ Customer not in list**.

## D. Sending the data (every evening)

**Data** tab → **Backup (all data + photos)** → share by WhatsApp / e-mail to the supervisor.
Data stays on the phone until a backup is sent. **Never clear Chrome data** or uninstall the app before sending the backup.

## E. Supervisor

On a PC, open the app (same link) → **Data** tab → **Load customer list** (same .json) → **Supervisor — merge backups** → select all agents' backup files → export **KMZ**, **Customers CSV**, **New poles CSV**, **GeoJSON**. Coordinates are given in WGS84 and ITRF2005 / Rwanda TM.
