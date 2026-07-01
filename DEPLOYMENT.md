# 🚀 Deployment Guide

Deploy BloodConnect live with **Render** (backend API) + **Vercel** (frontend), using your existing **MongoDB Atlas** database.

Deploy order matters: **Backend first** (you need its URL for the frontend), then **Frontend**, then **link them back together**.

---

## ✅ Prerequisites

- Code pushed to GitHub (done: `Thiru194/blood-connect`)
- A MongoDB Atlas connection string (you have this)
- Free accounts on [Render](https://render.com) and [Vercel](https://vercel.com) — sign in with GitHub for both

> **Atlas network access:** In Atlas → **Network Access**, make sure `0.0.0.0/0` (allow from anywhere) is added, otherwise Render can't reach your database.

---

## 1️⃣ Deploy the Backend (Render)

1. Go to **[dashboard.render.com](https://dashboard.render.com)** → **New +** → **Web Service**.
2. Connect your GitHub and pick the **`blood-connect`** repo.
3. Configure:
   | Setting | Value |
   | --- | --- |
   | **Name** | `blood-connect-api` (or anything) |
   | **Root Directory** | `server` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |
4. Under **Environment Variables**, add:
   | Key | Value |
   | --- | --- |
   | `MONGO_URI` | your Atlas connection string |
   | `JWT_SECRET` | a long random string |
   | `CLIENT_URL` | *(leave blank for now — you'll set it in step 3)* |

   > Don't set `PORT` — Render provides it automatically and the app already reads it.
5. Click **Create Web Service** and wait for the build to finish.
6. Copy your API URL, e.g. **`https://blood-connect-api.onrender.com`**.
7. Verify it works: open `https://blood-connect-api.onrender.com/api/health` — you should see `{"status":"ok",...}`.

> ⚠️ **Free tier note:** Render spins the service down after ~15 min of inactivity, so the *first* request after idle takes ~30–50s to wake. Normal for free hosting.

---

## 2️⃣ Deploy the Frontend (Vercel)

1. Go to **[vercel.com/new](https://vercel.com/new)** → import the **`blood-connect`** repo.
2. Configure:
   | Setting | Value |
   | --- | --- |
   | **Root Directory** | `client` |
   | **Framework Preset** | Create React App (auto-detected) |
3. Expand **Environment Variables** and add:
   | Key | Value |
   | --- | --- |
   | `REACT_APP_API_URL` | `https://blood-connect-api.onrender.com/api` |

   > Use **your** Render URL from step 1, and keep the `/api` suffix.
4. Click **Deploy**. When it finishes, copy your live URL, e.g. **`https://blood-connect.vercel.app`**.

---

## 3️⃣ Link Them Together (lock down CORS)

1. Back in **Render** → your service → **Environment**.
2. Set `CLIENT_URL` to your Vercel URL, e.g. `https://blood-connect.vercel.app` (no trailing slash).
3. Save — Render redeploys automatically. Now the API only accepts requests from your frontend.

---

## 🎉 Done

Your app is live at your Vercel URL. Register an account and try it out.

### Making an admin user
New signups are regular donors. To create an admin, open your Atlas database → `users` collection → edit your user document and set `role` to `"admin"`.

---

## 🔄 Future updates

Both platforms auto-deploy on every push to `main`:

```bash
git add -A
git commit -m "your change"
git push
```

Render rebuilds the API and Vercel rebuilds the frontend automatically.

---

## 🩺 Troubleshooting

| Symptom | Fix |
| --- | --- |
| Frontend loads but login/data fails | Check `REACT_APP_API_URL` on Vercel ends with `/api` and points to the Render URL. |
| CORS error in browser console | Ensure `CLIENT_URL` on Render exactly matches your Vercel URL (no trailing slash). Redeploy after changing. |
| API 500 on any DB call | Verify `MONGO_URI` is correct and Atlas **Network Access** allows `0.0.0.0/0`. |
| First request very slow | Render free tier cold start — expected after idle. |
| 404 when refreshing a page like `/login` | Handled by `client/vercel.json` — make sure it's committed. |
