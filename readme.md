# DDD - Domain Driven Design

Projeto utilizado para o aprendizado de DDD, modelando um domínio relacionado a e-commerce.

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

   Para rodar os testes de um arquivo específico, por exemplo, os testes dos handlers de `register-user-`, use:
   ```
   npm run test -- --testPathPattern=register-user-
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
