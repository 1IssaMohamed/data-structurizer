# DigitalOcean Docker Deployment Guide (Student Edition)

Since you have the GitHub Student Developer Pack and the $200 free credit, DigitalOcean is perfect. This guide will show you how to get your app live using your new Docker setup, while strictly managing your budget so you don't pay a single cent out of pocket.

---

## 🛡️ Part 1: How to Never Pay a Cent

DigitalOcean charges you by the hour, up to a monthly cap. The biggest trap beginners fall into is how "shutting down" works.

1. **Turning OFF a Droplet still costs money:** If you power off a server, you are still renting the SSD storage space holding your data. DigitalOcean will keep charging you the monthly fee.
2. **DESTROYING a Droplet stops billing:** If you want to stop paying for a project, you must go to the Droplet's settings and click **Destroy**. This deletes the server and the hard drive, completely stopping all charges.
3. **The Math:** The cheapest Droplet is ~$6/month. Over 12 months, that is $72. Your $200 credit easily covers running **two** of these servers non-stop for an entire year. 
4. **Set a Billing Alert (Crucial):**
   - In DigitalOcean, click **Billing** on the left menu.
   - Scroll down to **Billing alerts**.
   - Create an alert that emails you if your spending exceeds `$5` for the month. This ensures you never get surprised.

---

## 🚀 Part 2: Creating Your Server (Droplet)

1. Log into DigitalOcean and click **Create -> Droplets**.
2. **Region:** Choose the datacenter closest to you (e.g., New York or Toronto).
3. **Image:** Under the OS tab, select **Ubuntu 24.04 (LTS)**.
4. **Size:** 
   - Choose **Shared CPU** -> **Basic**.
   - Select the cheapest option: **Regular Intel ($6/mo)**.
5. **Authentication:** 
   - Choose **Password**.
   - Create a highly secure root password. Write this down!
6. **Finalize:** 
   - Name your droplet `algo-visualizer`.
   - Click **Create Droplet**.
   - Wait 1 minute. DigitalOcean will give you an **IP Address** (e.g., `192.168.1.100`). Copy this!

---

## 🐳 Part 3: Deploying Your Code

Now we just log into your new server, install Docker, and download your GitHub code.

### Step 1: Connect to your Server
Open your terminal on your local computer and type:
```bash
ssh root@YOUR_DROPLET_IP
```
*Type `yes` if it asks about a fingerprint, and enter the password you created.*

### Step 2: Install Docker
Run these three commands one by one to update the server and install Docker:
```bash
sudo apt update
sudo apt install docker.io -y
sudo apt install docker-compose -y
```

### Step 3: Clone Your Code
Now, download the code you just pushed to GitHub:
```bash
git clone https://github.com/1IssaMohamed/data-structurizer.git
cd data-structurizer
```

### Step 4: Launch It!
Because we containerized everything earlier, starting the app is literally one command. The `-d` flag runs it "detached" in the background, so it stays alive even when you close the terminal.
```bash
sudo docker-compose up -d --build
```

---

## 🎉 Part 4: View Your Live App!

Wait a minute or two for the containers to build. Then, open your web browser and go to:
`http://YOUR_DROPLET_IP:5173`

*(Note: Port 5173 is the port we exposed in `docker-compose.yml` for Nginx).*

Your app is now live on the internet! 

If you ever want to update the app in the future, you simply `ssh` back into the droplet, run `git pull`, and run `sudo docker-compose up -d --build` again.
