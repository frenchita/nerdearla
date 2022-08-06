# Nerdearla 2022
## _Microservicios con NodeJS_

Como extraer una funcionalidad de un monolotito y pasarla a microservicios

- Monolito
- Microservicios
- Orquestación con Kubernetes
- Skaffold
- Deploys MongoDB & MariaDB

## Features

- Modulo de usuarios
- Modulo de productos (llevamos a microservicios)
- Modulo de ordenes

## Requisitos

| Plugin | README |
| ------ | ------ |
| Docker | https://www.docker.com/ |
| Kubernetes | https://kubernetes.io/] |
| Skaffold | https://skaffold.dev/] |

Habilitar el ingress controller
```sh
minikube addons enable ingress
```

```sh
git clone https://github.com/frenchita/nerdearla.git
cd nerdearla
skaffold dev
```
