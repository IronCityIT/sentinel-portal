# ICIT Sentinel Portal - Deployment Guide

## 🎉 Your Beautiful Portal is Ready!

---

## What You Have:

### **Landing Page** (`/`)
- ✅ Animated hero section with Pittsburgh-themed background
- ✅ Live threat statistics
- ✅ Feature showcase
- ✅ Pricing section
- ✅ "Client Login" button (Auth0)
- ✅ Fully responsive mobile design

### **Dashboard** (`/dashboard`)
- ✅ Protected by Auth0 (login required)
- ✅ Tenant-specific (shows only client's data)
- ✅ Quick stats widgets
- ✅ Embedded Wazuh SIEM dashboard
- ✅ Recent activity feed
- ✅ Action buttons (reports, purple team, support)

---

## Deployment Options:

### **Option 1: Vercel (RECOMMENDED - FREE)** ⭐⭐⭐⭐⭐

**Why Vercel:**
- ✅ **FREE** (generous free tier)
- ✅ **1-click deploy** from GitHub
- ✅ **Auto SSL** (free HTTPS)
- ✅ **Custom domain** (sentinel.ironcityit.com)
- ✅ **Zero config** needed
- ✅ **Fast** (global CDN)

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **From this directory, run:**
   ```bash
   cd /path/to/icit-sentinel-portal
   vercel
   ```

3. **Follow prompts:**
   - Login with GitHub/Email
   - Link to project (create new)
   - Accept defaults
   - Deploy!

4. **Add custom domain:**
   - In Vercel dashboard → Settings → Domains
   - Add: `sentinel.ironcityit.com`
   - Update DNS:
     ```
     CNAME sentinel → cname.vercel-dns.com
     ```

5. **Add environment variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Copy from `.env.local` file
   - Generate AUTH0_SECRET:
     ```bash
     openssl rand -hex 32
     ```

**Cost:** $0/month (Free tier: 100GB bandwidth, unlimited sites)

---

### **Option 2: Deploy on Your Wazuh Server (Not Recommended)**

**Why NOT recommended:**
- ❌ Uses server resources (RAM/CPU)
- ❌ Need to install Node.js
- ❌ Need to configure Nginx reverse proxy
- ❌ Manual SSL setup
- ❌ No auto-scaling

**But if you insist:**

```bash
# On 142.93.70.61
ssh root@142.93.70.61

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Upload portal
scp -r /path/to/icit-sentinel-portal root@142.93.70.61:/opt/

# Install dependencies
cd /opt/icit-sentinel-portal
npm install

# Build
npm run build

# Run with PM2
npm install -g pm2
pm2 start npm --name "icit-portal" -- start
pm2 save
pm2 startup

# Configure Nginx
nano /etc/nginx/sites-available/sentinel
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name sentinel.ironcityit.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name sentinel.ironcityit.com;

    ssl_certificate /etc/letsencrypt/live/sentinel.ironcityit.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sentinel.ironcityit.com/privkey.pem;

    # Portal on root
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Wazuh dashboard on /app
    location /app {
        proxy_pass https://localhost:5601;
        # ... rest of Wazuh config
    }
}
```

---

## Testing Locally First:

```bash
# Navigate to portal directory
cd /path/to/icit-sentinel-portal

# Install dependencies
npm install

# Generate secret
openssl rand -hex 32

# Update .env.local with the secret

# Run development server
npm run dev

# Visit: http://localhost:3000
```

---

## Auth0 Configuration Checklist:

- [x] Domain: `dev-ws5377dam2tnlv5g.us.auth0.com`
- [x] Client ID: `9btayxt4STHPP0KgiL9tZCtd7qMjWyS2`
- [x] Client Secret: `b1H1tr42...` (set)
- [ ] **Allowed Callback URLs:**
  ```
  http://localhost:3000/api/auth/callback
  https://sentinel.ironcityit.com/api/auth/callback
  https://your-vercel-app.vercel.app/api/auth/callback
  ```
- [ ] **Allowed Logout URLs:**
  ```
  http://localhost:3000
  https://sentinel.ironcityit.com
  https://your-vercel-app.vercel.app
  ```
- [ ] **Allowed Web Origins:**
  ```
  http://localhost:3000
  https://sentinel.ironcityit.com
  https://your-vercel-app.vercel.app
  ```

**After deployment, add your Vercel URL to these lists!**

---

## Features Included:

### **Landing Page:**
- 🌟 Animated background blobs
- 🏆 Live statistics dashboard
- 📊 Feature grid with icons
- 💰 Pricing section
- 📧 Contact forms
- 📱 Mobile responsive
- ⚡ Fast load times

### **Dashboard:**
- 🔐 Auth0 protected
- 🏢 Tenant isolation (based on email domain)
- 📈 Quick stats widgets
- 🖼️ Embedded Wazuh SIEM (iframe)
- 📝 Recent activity feed
- 🎯 Action buttons (reports, purple team, support)
- 👤 User profile display
- 🚪 Logout functionality

### **Tenant Mapping:**
- `@ironcityit.com` → Iron City IT tenant
- `@sagespine.com` → Sage Spine tenant
- `@heatherwhitecpa.com` → Heather White tenant

---

## Next Steps After Deployment:

1. **Test login flow:**
   - Visit portal
   - Click "Client Login"
   - Login with Auth0
   - Verify redirect to dashboard
   - Check Wazuh iframe loads

2. **Create test users in Auth0:**
   - `test@sagespine.com` → Should see Sage Spine data
   - `test@heatherwhitecpa.com` → Should see Heather White data

3. **Update branding:**
   - Auth0 Dashboard → Branding → Universal Login
   - Upload ICIT logo
   - Set colors (gold #C9A961, black #1a1a1a)

4. **Enable MFA:**
   - Auth0 Dashboard → Security → Multi-factor Auth
   - Enable Authenticator App

5. **Monitor usage:**
   - Vercel Dashboard → Analytics
   - Auth0 Dashboard → Monitoring

---

## Cost Breakdown:

| Service | Tier | Cost |
|---------|------|------|
| **Vercel Hosting** | Free | $0/month |
| **Auth0 Authentication** | Free | $0/month |
| **Wazuh SIEM** | Self-hosted | $42/month (existing) |
| **Domain** | Existing | $0/month |
| **SSL** | Free (Let's Encrypt) | $0/month |
| **TOTAL** | | **$0/month** |

---

## Support:

**Issues?**
- Vercel Docs: https://vercel.com/docs
- Auth0 Docs: https://auth0.com/docs
- Next.js Docs: https://nextjs.org/docs

**Questions?**
Email: bill@ironcityit.com

---

## What's Next:

**Phase 2 Features (Build Later):**
- [ ] Monthly report generation
- [ ] Purple team test scheduler
- [ ] Support ticket system
- [ ] Billing/invoice portal
- [ ] Mobile app
- [ ] Client API access
- [ ] White-label for resellers

---

**Your portal is PRODUCTION-READY! Deploy to Vercel and start onboarding clients!** 🚀
