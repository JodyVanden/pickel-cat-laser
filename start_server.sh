#!/bin/bash
cd "$(dirname "$0")"

# Kill anything already on port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null
sleep 0.5

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

with socketserver.TCPServer(("", 8000), CORSHandler) as httpd:
    httpd.serve_forever()
PYEOF

sleep 1
open "http://localhost:8000/index.html"
echo "Server running at http://localhost:8000/index.html"
echo "Press Ctrl+C to stop."
wait
