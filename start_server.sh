#!/bin/bash
cd "$(dirname "$0")"

PORT=8000
URL="http://localhost:$PORT/index.html"

# Free the port, then wait until it is really released
lsof -ti:$PORT | xargs kill -9 2>/dev/null
for _ in $(seq 1 20); do
  lsof -ti:$PORT >/dev/null 2>&1 || break
  sleep 0.25
done
if lsof -ti:$PORT >/dev/null 2>&1; then
  echo "Port $PORT is still in use. Stop whatever is using it and retry." >&2
  exit 1
fi

echo "Starting pickle cat server..."

python3 - << 'PYEOF' &
import http.server, socketserver

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()
    def log_message(self, format, *args):
        pass

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True
    def handle_error(self, request, client_address):
        # Browsers cancel audio/image transfers mid-way; that is not an error
        import sys
        if not isinstance(sys.exc_info()[1], (BrokenPipeError, ConnectionResetError)):
            super().handle_error(request, client_address)

with Server(("", 8000), CORSHandler) as httpd:
    httpd.serve_forever()
PYEOF
SERVER_PID=$!

# Only claim success once the server answers
for _ in $(seq 1 20); do
  curl -sf -o /dev/null "$URL" && break
  kill -0 $SERVER_PID 2>/dev/null || { echo "Server failed to start." >&2; exit 1; }
  sleep 0.25
done

open "$URL"
echo "Server running at $URL"
echo "Press Ctrl+C to stop."
trap 'kill $SERVER_PID 2>/dev/null' INT TERM
wait $SERVER_PID
