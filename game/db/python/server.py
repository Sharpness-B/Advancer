# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import time

# import urllib.parse



hostName = "localhost"
serverPort = 8080


def getGetVar(path):
    if "?" in path:

        get = path.split("?")[1]

        if "&" in get:
            getList = get.split("&")
        else:
            getList = [get]

        return {key:value for key,value in [c.split("=") for c in getList]}

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
        self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))

        query_components = getGetVar(self.path)

        self.wfile.write(bytes("<p>get variables: %s</p>" % query_components, "utf-8"))

        self.wfile.write(bytes("<body>", "utf-8"))
        self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
        self.wfile.write(bytes("</body></html>", "utf-8"))




if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")