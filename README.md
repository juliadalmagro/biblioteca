# Biblioteca Virtual

Instruções:

1. Extraia o zip.
2. Rode `npm install`.
3. Rode `npm start`.
4. Abra http://localhost:3000 no navegador.

Comportamento:
- Tela inicial mostra apenas login.
- Após login, usuários veem catálogo (título e autor apenas).
- Admins têm links para páginas de CRUD: /admin/livros.html e /admin/usuarios.html.
- Admin pode adicionar/editar/excluir livros e usuários; também pode alternar role de usuário.
- Admin pode ver quem pegou um livro (usuário & timestamp) via página de livros.
- Empréstimo e devolução mantêm timestamps (borrowedAt, returnedAt).
- Acesso não autorizado a rotas privadas retorna 404.
- Tudo em memória (arrays). Reiniciar o servidor limpa os dados.

Contas padrão: admin/admin e alice/password
