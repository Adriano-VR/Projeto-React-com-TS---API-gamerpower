# Projeto React 

Ele  faz uso de APIs do Tailwind CSS, Firebase para autenticação, cadastro de usuário e salvamento de jogos favoritos do usuário logado, além de ter funcionalidades de filtros e pesquisa.

https://projeto-react-com-ts-api-gamerpower-2dtolv02i.vercel.app/

## Requisitos do Sistema

Certifique-se de ter as seguintes tecnologias instaladas em seu sistema antes de começar:

- Node.js
- npm (ou yarn)
- Firebase CLI (para configuração e administração do Firebase)

## Configuração

1. Clone este repositório para o seu sistema local.
2. Navegue até o diretório do projeto e execute o comando `npm install` (ou `yarn install`) para instalar as dependências.

## Configuração do Firebase

1. Crie um novo projeto no [Firebase Console](https://console.firebase.google.com/).
2. Copie as chaves de configuração do seu projeto Firebase e cole no arquivo `.env` do seu projeto. Exemplo:

- **VITE_FIREBASE_API_KEY=YOUR_API_KEY
- **VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
- **VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
- **VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
- **VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
- **VITE_FIREBASE_APP_ID=YOUR_APP_ID


3. Ative a autenticação por e-mail/senha no console do Firebase.

## Uso

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

npm run dev

Isso iniciará o servidor de desenvolvimento em `http://localhost:3000`.

## Funcionalidades

- **Autenticação de Usuário**: Os usuários podem se cadastrar e fazer login usando o Firebase Authentication.
- **Cadastro de Usuário**: Os usuários podem se cadastrar fornecendo um e-mail e uma senha.
- **Salvamento de Jogos Favoritos**: Os usuários logados podem salvar seus jogos favoritos.
- **Filtros e Pesquisa**: Funcionalidades para filtrar e pesquisar jogos.

## Contribuição

Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões de novos recursos, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
