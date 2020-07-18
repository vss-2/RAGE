# RabbitMQ
e outros sistemas de *MessageQueue*

### Introdução
Message Queue, também chamado de Task Queue, é um conjunto de funcionalidades que atua como facilitador no server-side. Suas ferramentas frequentemente incluem: Notificador (percebe quando servidores caem), Balanceador de Carga  (Load Balancing: distribui as tarefas de forma balanceada para os servidores que sobraram) e Heart-beat (verifica constantemente se os servidores estão ativos).

##### Baseado neste [vídeo](https://youtu.be/Cie5v59mrTg)

### Requerimentos
* Docker
* NodeJS
* RabbitMQ

### Objetivo
* Gerenciador assíncrono (1 produtor, N consumidores).

### Mão na massa
##### RBMQ.dockerfile
```
# Iniciando RMQ na porta 6969:7070 (externa:interna) dentro de um docker
docker run --name rabbitmqteste -p 6969:7070 rabbitmq

```


##### produtor.js
```javascript
# Iniciando package.json
npm init -y

# Esta bibliotca é baseada em promisses
const amqp = require("amqplib");

// Mensagem a ser enviada
const msg = {number: 259}

// Sempre bom chamar a função principal
connect();

async function connect(){
    try {
        // Fazer a conexão entre amqp e sua máquina
        const connection = await amqp.connect("amqp://localhost:6969");
        
        // Criando canal para comunicação
        const channel = await connection.createChannel();
        
        // Solicitamos criação de Queue
        const result = await channel.assertQueue("jobs");
        
        // Enviamos o número para a Queue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        
        // Lembrar de ter instalado: npm install amqplib -i
    } catch (ex) {
        console.error(ex);
    }
}
```
<br>

##### consumidor.js

```javascript
const amqp = require('amqplib'); 

connect();

async function connect(){
    try {
        const connection = await amqp.connection("amqp://localhost:6969");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        
        channel.consume("jobs", message => {
            console.log(message);
            
            // Para leitura de maior compreensão
            const input = JSON.parse(message.connect.toString());
            console.log(`Mensagem recebida: ${input.number}`);
            
            // Confirmando que a mensagem foi recebida
            if(input.number != null){
                channel.ack(message);
            }
        })
    } catch (ex) {
    
    }
}
```
