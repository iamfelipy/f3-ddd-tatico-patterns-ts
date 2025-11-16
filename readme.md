# DDD - Domain Driven Design

O domínio deste projeto está relacionado à gestão de pedidos em um sistema de e-commerce. Ele abrange funcionalidades como cadastro de clientes, produtos, pedidos. O foco está em garantir a integridade das regras de negócio, como políticas, validação estoque e atualizações.

## Camadas e Conceitos Utilizados

Este projeto segue os princípios do DDD. Abaixo estão as principais camadas e conceitos utilizados:

- **Entidades**: Objetos com identidade própria.
- **Value Objects**: Objetos definidos somente pelos seus valores, sem identidade.
- **Agregados**: Conjunto de entidades e value objects que formam uma unidade de consistência.
- **Domain Services**: Serviços que encapsulam regras de negócio que não pertencem a uma única entidade.
- **Repositories**: Responsáveis pela persistência e recuperação dos agregados.
- **Domain Events**: Eventos que representam algo que aconteceu dentro do domínio.
- **Factories**: Responsáveis pela criação de objetos complexos.
- **Módulos**: Organização do domínio em seções menores e mais coesas.
- **Testes com Jest**: Cobertura de testes unitários do domínio utilizando o framework Jest.
