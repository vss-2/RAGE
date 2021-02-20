#!/usr/bin/env python3

import socket

HOST = '192.168.0.16'
PORT = 8080

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall('Hello, world')
    data = s.recv(1024)

print('Received', repr(data))