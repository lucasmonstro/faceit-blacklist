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

Ask developers abouy the environment variables file(`.local.env`)

# ⌨ Development

## ⚙ Running docker

```bash
docker-compose --env-file .local.env up
```

Access the mongodb UI in http://localhost:8081 to edit documents

## ⚙ Running applications

```bash
# running web app
nx serve app

# running api
nx serve api
```
