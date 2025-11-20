# Guia Rápido de Início

Este guia vai te ajudar a colocar o cardápio digital no ar em menos de 10 minutos.

## Pré-requisitos

- Node.js 20+ instalado
- Conta no Google (para usar Google Sheets)
- Número de WhatsApp Business (ou pessoal)

## Passo 1: Clone e Instale

```bash
# Clone o repositório
git clone <seu-repositorio>
cd menu-digital

# Instale as dependências
npm install
```

## Passo 2: Configure a Planilha

### Opção A: Usar a planilha de exemplo (mais rápido)

1. Acesse a [planilha de exemplo](https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pubhtml)
2. Faça uma cópia: **Arquivo → Fazer uma cópia**
3. Edite os dados conforme seu negócio

### Opção B: Criar do zero

1. Crie uma nova planilha no Google Sheets
2. Crie 3 abas: **Cardápio**, **Config**, **Leads**

**Aba Cardápio** (primeira linha com cabeçalhos):
```
ID | Nome | Categoria | Descrição | Preço | Imagem URL | Disponível
```

**Aba Config** (primeira linha com cabeçalhos):
```
Restaurante | CNPJ | Telefone | Whatsapp | Endereço | Bairro | Cidade | Estado | Instagram | Facebook
```

**Aba Leads** (primeira linha com cabeçalhos):
```
Timestamp | Nome | Email
```

## Passo 3: Publique a Planilha

1. Abra sua planilha
2. Vá em **Arquivo → Compartilhar → Publicar na Web**
3. Selecione a aba **Cardápio** e formato **CSV**
4. Clique em **Publicar** e copie o link
5. Repita para a aba **Config** (lembre-se de selecionar a aba correta!)

## Passo 4: Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local
```

Edite o `.env.local` e adicione:

```env
# URL do CSV da aba "Cardápio" (menu)
MENU_CSV_URL=https://docs.google.com/spreadsheets/d/e/SEU_ID/pub?output=csv

# URL do CSV da aba "Config" (business)
BUSINESS_CSV_URL=https://docs.google.com/spreadsheets/d/e/SEU_ID/pub?gid=1&output=csv
```

> **Dica**: O `gid` da primeira aba geralmente é `0`, da segunda é `1`, e assim por diante.

## Passo 5: Rode o Projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e veja seu cardápio funcionando! 🎉

## Passo 6: Teste o Fluxo Completo

1. **Busque** por um produto
2. **Filtre** por categoria
3. **Clique em "Opções"** e adicione observações
4. **Adicione ao carrinho**
5. **Clique no ícone do carrinho** no canto superior direito
6. **Ajuste quantidades** se necessário
7. **Clique em "Finalizar pedido"**
8. **Preencha seus dados** no modal
9. **Clique em "Enviar pelo WhatsApp"**
10. Verifique se a mensagem está formatada corretamente

## Passo 7: Deploy (Opcional)

### Deploy na Vercel (Grátis)

1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **New Project**
4. Importe seu repositório
5. Adicione as variáveis de ambiente (mesmas do `.env.local`)
6. Clique em **Deploy**

Pronto! Seu cardápio estará online em alguns minutos.

## Próximos Passos

- [ ] Personalize as cores em `app/globals.css`
- [ ] Adicione suas próprias imagens de produtos
- [ ] Configure o formulário de leads (opcional)
- [ ] Adicione seu domínio personalizado na Vercel
- [ ] Teste em diferentes dispositivos

## Problemas Comuns

### "Não foi possível carregar o cardápio"

- Verifique se a planilha está publicada
- Confirme que o link CSV está correto
- Teste o link diretamente no navegador (deve baixar um arquivo CSV)

### "WhatsApp não abre"

- Verifique se o número está no formato correto: `5588999999999`
- Certifique-se de incluir o DDI do país (55 para Brasil)
- Não use espaços, parênteses ou hífens

### "Imagens não aparecem"

- Use URLs completas (começando com `https://`)
- Verifique se as imagens são públicas
- Teste a URL da imagem diretamente no navegador

## Suporte

Se precisar de ajuda:
1. Verifique a [documentação completa](../README.md)
2. Revise o [formato da mensagem do WhatsApp](./WHATSAPP_MESSAGE_FORMAT.md)
3. Abra uma issue no repositório

---

**Dica Pro**: Mantenha a planilha aberta em uma aba enquanto testa. Você pode editar os dados e recarregar a página para ver as mudanças (pode levar até 5 minutos devido ao cache).

