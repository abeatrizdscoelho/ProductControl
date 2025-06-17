# CRUD de Produtos com Autenticação de Usuário

Este projeto é uma aplicação web que permite o **Cadastro, Leitura, Atualização e Exclusão (CRUD)** de produtos, com **sistema de autenticação de usuário** integrado. Desenvolvido como prática de integração entre **front-end** e **back-end**, o sistema possui uma interface intuitiva e funcional.

Os usuários precisam se cadastrar e fazer login para acessar a área de gerenciamento de produtos.

<br>

## 🔗 Demonstração do Projeto

📽️ Veja o vídeo do projeto rodando: [Clique aqui para assistir](https://link-do-video-aqui.com)

<br>

## 🔧 Tecnologias Utilizadas

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/-boostrap-0D1117?style=for-the-badge&logo=bootstrap&labelColor=0D1117) ![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)

<br>

## ⬇ Guia de Instalação

Este guia oferece instruções detalhadas sobre como baixar, configurar e executar este projeto em sua máquina local.

### Pré-requisitos
- **VSCode**: Editor de código para visualização e edição do projeto. [Baixe o VSCode](https://code.visualstudio.com/download)
- **Node.js**: Ambiente de execução de JavaScript open-source. [Baixe o Node.js](https://nodejs.org/en/download)
- **MySQL**: Banco de dados para armazenar informações necessárias ao sistema. [Baixe o MYSQL](https://dev.mysql.com/downloads/installer/)

---

### 🔁 Clonando o Repositório

```bash
git clone https://github.com/abeatrizdscoelho/ProductControl.git
  ```

---

### ⚙️ Configurando o Backend

#### 1. Abrindo um Terminal
> Abra um terminal no VSCode para configurar o backend.

#### 2. Configuração e Execução do Backend
> Navegue até a pasta do backend:
```bash
cd backend
  ```

> Instale as dependências do backend:
```bash
npm install
  ```

#### Configure o Banco de Dados
Crie um banco no MySQL (ex: ```crud_produtos```).
Crie um arquivo ```.env``` e insira suas credenciais:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/crud_produtos"
JWT_SECRET="umaChaveSuperSecreta"
  ```

> Rode as migrações:
```bash
npx prisma migrate dev
  ```

> Inicie o servidor:
```bash
node src/server.js
  ```

O back-end estará disponível em: http://localhost:3000

---

### 💻 Configurando o Frontend

#### 1. Abrindo um Novo Terminal
> Abra um novo terminal no VSCode para configurar o frontend.

#### 2. Configuração e Execução do Frontend
> Navegue até a pasta do frontend:
```bash
cd frontend
  ```

> Instale as dependências:
```bash
npm install
  ```

> Inicie a aplicação
```bash
npm start
  ```

O front-end estará disponível em: http://localhost:3001

---

### 🔗 Acessando a Aplicação
> No terminal, copie o link que aparece e abra-o no navegador de sua preferência para acessar a aplicação.
