# 📝 Description

> The FACEIT Blacklist extension project

# 🧰 Installation

## Prerequisites

- [`Node`](https://nodejs.org/en/download) v12 LTS
- Globally [`yarn`](https://yarnpkg.com/cli/install)
- Globally [`nx`](https://nx.dev/latest/node/cli/overview) commands
- [`Docker`](https://docs.docker.com/get-docker)

Install yarn packages before continue

```bash
yarn
```

Ask another developer for the environment variables file(`.development.env`)

# ⌨ Development

## ⚙ Running docker

```bash
docker-compose --env-file .development.env up
```

After applying docker-compose, you can access url http://localhost:8081 to
access mongo-express which contains the UI for editing mongodb documents

## ⚙ Running applications

```bash
# running web app
nx serve app

# running api
nx serve api
```
