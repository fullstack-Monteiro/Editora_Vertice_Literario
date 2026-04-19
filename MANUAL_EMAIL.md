# Manual de Configuração de Email — Editora Vértice Literário

Este manual explica como configurar o sistema para receber os dados dos formulários
do site (contacto, manuscritos e newsletter) directamente no email da editora.

---

## O que é o Resend?

O Resend é um serviço gratuito de envio de emails. O site usa-o para enviar
automaticamente os dados dos formulários para o email da editora.

---

## Passo 1 — Criar conta no Resend

1. Aceda a https://resend.com
2. Clique em **"Sign Up"**
3. Registe-se com o email da editora: `editoraverticeliterario@gmail.com`
4. Confirme o email de verificação que chegará à caixa de entrada

---

## Passo 2 — Obter a chave API

1. Após fazer login no Resend, clique em **"API Keys"** no menu esquerdo
2. Clique em **"Create API Key"**
3. Dê um nome, por exemplo: `vertice-site`
4. Clique em **"Add"**
5. **Copie a chave** — começa com `re_` — e guarde-a num local seguro
   (só aparece uma vez)

---

## Passo 3 — Enviar a chave ao programador

Envie a chave API ao programador do site (Bluevision Tech) para que seja
configurada no servidor. A chave tem este formato:

```
re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Passo 4 — Verificar que está a funcionar

Após o programador configurar a chave:

1. Aceda ao site
2. Preencha o formulário de contacto com um email de teste
3. Verifique se chegou um email a `editoraverticeliterario@gmail.com`

---

## Nota importante

Na conta gratuita do Resend, os emails são enviados a partir de
`onboarding@resend.dev`. Para enviar a partir de um endereço personalizado
(ex: `noreply@verticeliterario.co.mz`), seria necessário ter um domínio próprio.

Para a funcionalidade básica de receber os dados dos formulários, a conta
gratuita é suficiente.

---

## Contacto de suporte

Em caso de dúvidas, contacte o programador:
**Bluevision Tech** — https://bluevisiontech.site/ai
