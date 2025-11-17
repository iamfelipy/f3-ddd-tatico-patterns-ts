# DDD - Domain Driven Design

O domínio deste projeto está relacionado à gestão de pedidos em um sistema de e-commerce. Ele abrange funcionalidades como cadastro de clientes, produtos e pedidos. O foco está em garantir a integridade das regras de negócio, como políticas, validação e atualizações.

## Como rodar o projeto

1. **Instale o Node.js**  
   Baixe e instale a versão **22.15.0** do Node.js.

2. **Instale as dependências**  
   No diretório do projeto, execute:
   ```
   npm install
   ```

3. **Execute os testes**  
   Para rodar toda a suíte de testes:
   ```
   npm run test
   ```

---

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
