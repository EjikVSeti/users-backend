## Simple Users API

#### Tech: Nestjs/TypeOrm and etc.

### Installation

```bash
$ npm install
```

### Run local by docker

```bash
$   docker-compose -f docker-compose.yaml up --build
```

## Running the app

```bash
# development
$ npm run start:dev

# build
$ npm run build

# pm2 install
$ npm install pm2 -g

# production mode
$ ["pm2" , "start" , "./dist/index.js" , "--no-daemon"]
```

### Endpoints

[Swagger](http://localhost:3000/api/docs/)

