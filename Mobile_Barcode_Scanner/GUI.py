#!/usr/bin python3

from tkinter import *
import threading
import socket

raiz = Tk()

raiz.title('Scanner de código de barras')
raiz.geometry('300x300')

HOST = ''
PORT = 8080

def encontrarIP():
    candidatos = []
    for test_ip in ["192.0.2.0", "198.51.100.0", "203.0.113.0"]:
        s = socket.socket (socket.AF_INET, socket.SOCK_DGRAM)
        s.connect ((test_ip, 80))
        ip_addr = s.getsockname()[0]
        s.close ()
        if ip_addr in candidatos:
            print(ip_addr)
    candidatos.append(ip_addr)
    return candidatos[0]

def servidor():
    codigo_de_barras = ''
    print('Olá')
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        conn, addr = s.accept()
        print(HOST, PORT)
        with conn:
            print('Connected by', addr)
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                conn.sendall(data)
                codigo_de_barras = data
                print(data)
    print('Tchau')
    return

t = threading.Thread(target=servidor, daemon=True)
HOST = encontrarIP()
txt_ip = Label(raiz, text='O seu IP é: {}'.format(HOST))
txt_ip.pack()
btn_receber = Button(raiz, text='Receber código', command=t.start())
btn_receber.pack()
btn_sair = Button(raiz, text='Sair', command=raiz.destroy)
btn_sair.pack()
raiz.mainloop()

# 'POST / HTTP/1.1\r\naccept: application/json\r\nContent-Type: application/json\r\nContent-Length: 23\r\nHost: 192.168.0.16:8080\r\nConnection: Keep-Alive\r\nAccept-Encoding: gzip\r\nUser-Agent: okhttp/3.12.1\r\n\r\n{"data":"192.168.0.16"}'
# POST / HTTP/1.1
# accept: application/json
# Content-Type: application/json
# Content-Length: 23
# Host: 192.168.0.16:8080
# Connection: Keep-Alive
# Accept-Encoding: gzip
# User-Agent: okhttp/3.12.1
# 
# {"data":"192.168.0.16"}
