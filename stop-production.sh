#!/bin/bash
# Stop Ocean Connect production server
if [ -f app.pid ]; then
  PID=$(cat app.pid)
  kill $PID 2>/dev/null && echo "Ocean Connect stopped (PID: $PID)" || echo "Process not running"
  rm -f app.pid
else
  echo "No PID file found"
fi
