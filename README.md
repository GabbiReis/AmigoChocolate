
# ChocoMigos 

<div align="center">
    
![logo-chocomigos](https://github.com/GabbiReis/AmigoChocolate/blob/main/assets/images/Logo1.png)

</div>

ChocoMigos é um aplicativo mobile desenvolvido para um trabalho do 5º período do curso de Sistemas de Informação. O objetivo do aplicativo é realizar o sorteio de amigo chocolate, facilitando a organização desse evento divertido.

## Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Uso](#uso)
- [Execução do Dockerfile](#execução-do-dockerfile)
- [Funcionalidades](#funcionalidades)
- [Licença](#licença)

## Visão Geral

ChocoMigos é um aplicativo que permite aos usuários organizar e participar de sorteios de amigo chocolate. Desenvolvido para ser usado em festas, confraternizações e eventos, o aplicativo simplifica o processo de sorteio e gestão dos participantes.

## Instalação

Para configurar o ambiente de desenvolvimento, siga estas etapas:

1. Clone o repositório:
    ```bash
    git clone https://github.com/GabbiReis/AmigoChocolate.git
    cd AmigoChocolate
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Instale o Expo CLI globalmente, se ainda não o fez:
    ```bash
    npm install -g expo-cli
    ```

## Uso

Para iniciar a aplicação no ambiente de desenvolvimento, execute:

```bash
npx expo start
```

Isso abrirá no terminal uma lista de opções onde você poderá escanear o QR code com o aplicativo Expo Go no seu dispositivo móvel, iniciar um emulador ou usar a versão web.

## Execução do Dockerfile

Para rodar a API utilizando Docker, siga os passos abaixo:

1. Certifique-se de ter o Docker instalado na sua máquina.

2. No diretório raiz do projeto, construa a imagem Docker:
    ```bash
    docker build -t chocomigos-api .
    ```

3. Após a construção da imagem, inicie um container a partir dela:
    ```bash
    docker run -d -p 8081:8081 chocomigos-api
    ```

4. A API estará rodando e acessível em `http://localhost:8081`.

## Funcionalidades

- **Login:** Permite que os usuários façam login na aplicação.
- **Cadastro:** Novo usuários podem se registrar.
- **Recuperação de Senha:** Permite a recuperação de senhas esquecidas.
- **Criação de Grupos:** Os usuários podem criar grupos para o sorteio.
- **Sorteio de Amigo Chocolate:** Realiza o sorteio entre os membros do grupo.
- **Outras Funcionalidades:** Para melhorar a experiência do usuário.
  
<div align="center">
    
  ![icon-chocomigos](https://github.com/GabbiReis/AmigoChocolate/blob/main/assets/images/Icon.svg)
  
</div>

## Licença

Este projeto está licenciado sob a licença MIT.
