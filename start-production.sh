#!/bin/bash
# Start Ocean Connect production server
PORT=3100
export PORT=$PORT
export NODE_ENV=production
export HOST=0.0.0.0

nohup node server.js > app.log 2>&1 &
echo $! > app.pid
echo "Ocean Connect started on port $PORT (PID: $!)"
