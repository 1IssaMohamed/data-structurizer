# Algorithm Visualizer

I made this tool to help me thorugh neetcode 75. I realized lots of times I was stuck becuase I really didnt visualize an algo correctly, esp wtih regards to ege cases. So this runs through code line by line to see exactly how the variables change with each iteration

I built this because while I was doing LeetCode, I kept getting confused about how pointers were moving in my head. Drawing it on paper was too slow, so I made this instead.

### What it does
- Runs real Python code on the backend
- Records every single step of the execution
- Sends those snapshots to the frontend
- Animates everything so you can see pointers moving, arrays sorting, and trees being searched

### The Tech
- Backend: Python 3.11 with FastAPI. It uses a worker pool so it can handle a few people at once without lagging.
- Frontend: React 19. I kept the styling simple and clean with vanilla CSS.
- Infrastructure: Dockerized so it runs the same on my laptop as it does in the cloud.

### How to run it
If you have Docker, it's the easiest way:
```bash
docker-compose up --build
```

If you want to run it manually:

1. Start the backend:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

2. Start the frontend:
```bash
cd frontend
npm install
npm run dev
```

### Safety and Limits
Since I'm hosting this, I had to add some limits so it doesn't crash or cost me a fortune:
- Algorithms are limited to 500 execution steps. If you try to sort a massive array or hit an infinite loop, it'll just stop and tell you.
- Every request has a 5-second timeout.
- The backend uses a process pool to keep the main server responsive.
