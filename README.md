# Code-play

Code Play is a cutting-edge web application that redefines the learning experience by seamlessly integrating various widgets. Bid farewell to outdated e-learning platforms, as Code Play is meticulously crafted using modern technologies like React and Vite. It empowers you to customize your learning environment with handcrafted widgets tailored for a flexible Grid Layout system.

With Code Play, you have access to over 8 beautiful widgets, including features like 'Lecture of the Day,' a calendar, quizzes, and even Stack Overflow integration.

Worried about compatibility? Fear not! Code Play is designed to be responsive and adaptive to all screen sizes. Whether you're using a smartphone, tablet, or computer, our Grid Layout system effortlessly adjusts to your device, ensuring a seamless experience.

![Code-play intro](https://github.com/muzixiaowuwuyi/Code-play/blob/fix/style-change/Agenda-client/public/ezgif-4-080f4500a7.gif)

## Tech Stack

![Code-play tech stack](https://github.com/muzixiaowuwuyi/Code-play/blob/fix/style-change/Agenda-client/public/Frame%203.jpg)

## Installation

### 0. Prerequisites

stream requires `node 18` or above, and `docker` to run.

### 1. Clone and install dependencies

To start, clone this repo and navigate to its folder

```
# Using HTTPS
$ git clone https://github.com/muzixiaowuwuyi/Code-play.git

# Using SSH
$ git clone git@github.com:muzixiaowuwuyi/Code-play.git

$ cd Code-play
```

#### Frontend dependencies

```bash
$ cd Agenda-client
$ npm install
```

#### Backend dependencies

```bash
$ cd server
$ npm install
```

### 2. Run the app

#### Backend

Berfor starting back-end server, you should allways start the docker at first

```bash
$ cd server
$ npm run start-mongodb-docker
```

```bash
$ cd server
$ npm start
```

#### Frontend

```bash
$ cd Agenda-client
$ npm run dev
```

### 3. Test the app

#### Unit test

```
$ cd Agenda-client
$ npm run test
```

```
$ cd server
$ npm run test
```

### Contributors

[Guangzheng Li](https://github.com/muzixiaowuwuyi)

[Michele Maffei](https://github.com/itzMaffi)

[Mads Baadsmand](https://github.com/MadsPB)

[Dinara Bekeshova](https://github.com/dinarabs)

[Oguz Tugan](https://github.com/dayt47)

### Project Link

GITHUB: https://github.com/muzixiaowuwuyi/Code-play
