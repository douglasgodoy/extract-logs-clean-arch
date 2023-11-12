# Use a imagem oficial do Node.js como base
FROM node:18

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Exponha a porta que a aplicação irá utilizar
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["node", "index.ts"]
