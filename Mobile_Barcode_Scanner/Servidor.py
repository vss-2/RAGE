#!/usr/bin/env python3

import socket
from json import loads

HOST = '192.168.0.16'
PORT = 8080

codigo_de_barras = ''

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(1024)
            if not data:
                break
            conn.sendall(data)
            codigo_de_barras = data
            print(data)
codigo_de_barras = loads(codigo_de_barras)
print(codigo_de_barras)

import cgi, urllib.request, urllib.parse, http.server
class ForkingHTTPServer (http.server.HTTPServer):
    def process_request (self, request, client_address):
        self.finish_request (request, client_address)
        self.close_request (request)


candidates = []
for test_ip in ["192.0.2.0", "198.51.100.0", "203.0.113.0"]:
   s = socket.socket (socket.AF_INET, socket.SOCK_DGRAM)
   s.connect ((test_ip, 80))
   ip_addr = s.getsockname ()[0]
   s.close ()
   if ip_addr in candidates:
      print(ip_addr)
   candidates.append (ip_addr)

print(candidates[0])