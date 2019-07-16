FROM node:10
LABEL Yangeok <wooky92@naver.com>

# Set the Working directory for API
WORKDIR /www/api

# Dependencies for running the backend API
RUN npm i -g forever 
RUN apt-get update

# Adding pependencies package
COPY package*.json ./
RUN npm i --production --silent --no-optional

# Add current folder to WORKDIR
COPY . .

# Entrypoint script
RUN cp app.sh /usr/local/bin && chmod +x /usr/local/bin/app.sh

# Expose the port
EXPOSE 80

CMD ["/usr/local/bin/app.sh"]