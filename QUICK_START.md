# 🚀 Guia Rápido de Início

## Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Planilha do Google Sheets publicada

---

## 1️⃣ Instalação

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/wlfilho/menu-digital.git
cd menu-digital

# Instale as dependências
npm install
```

---

## 2️⃣ Configuração da Planilha

### Preparar a Planilha do Google Sheets

Sua planilha deve ter **2 abas** com as seguintes estruturas:

#### **Aba 1: Cardápio** (ou "menu")
| ID | Nome | Categoria | Descrição | Preço | Imagem URL | Disponível |
|----|------|-----------|-----------|-------|------------|------------|
| 1 | Esfiha de Carne | Esfihas | Massa fina com carne temperada | 8,00 | https://... | Sim |
| 2 | Beirute de Frango | Beirutes | Pão sírio com frango grelhado | 36,00 | https://... | Sim |

#### **Aba 2: Config** (ou "business")
| Restaurante | CNPJ | Telefone | Whatsapp | Endereço | Bairro | Cidade | Estado | Instagram | Facebook |
|-------------|------|----------|----------|----------|--------|--------|--------|-----------|----------|
| Lilica Esfihas | 12.345.678/0001-90 | (88) 3333-4444 | 5588999999999 | Rua das Flores, 123 | Centro | Fortaleza | CE | https://instagram.com/lilica | https://facebook.com/lilica |

### Publicar a Planilha como CSV

1. Abra sua planilha no Google Sheets
2. Vá em **Arquivo** → **Compartilhar** → **Publicar na Web**
3. Selecione a aba **"Cardápio"**
4. Escolha o formato **"Valores separados por vírgula (.csv)"**
5. Clique em **"Publicar"** e copie o link
6. Repita para a aba **"Config"**

**Exemplo de URLs geradas:**
```
Cardápio: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv&gid=0
Config:   https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv&gid=1
```

---

## 3️⃣ Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione suas URLs:

```env
# URLs dos CSVs (cole as URLs que você copiou acima)
MENU_CSV_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pub?output=csv
BUSINESS_CSV_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pub?gid=1&output=csv

# Número do WhatsApp (com DDI, sem espaços ou caracteres especiais)
# Exemplo: 55 (Brasil) + 88 (DDD) + 999999999 (número)
NEXT_PUBLIC_WHATSAPP_NUMBER=5588999999999
```

---

## 4️⃣ Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Acesse no navegador
# http://localhost:3000
```

---

## 5️⃣ Testar a Aplicação

1. **Navegue pelas categorias** - Clique nos chips de categoria
2. **Busque produtos** - Use a barra de busca
3. **Adicione ao carrinho** - Clique em "Opções" ou "Adicionar"
4. **Abra o carrinho** - Clique no ícone flutuante
5. **Finalize o pedido** - Clique em "Enviar pelo WhatsApp"
6. **Preencha seus dados** - Nome obrigatório, endereço e observações opcionais
7. **Confirme** - Será redirecionado para o WhatsApp com a mensagem pronta

---

## 6️⃣ Deploy (Vercel)

### Opção 1: Via Interface Web

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Importe o repositório do GitHub
4. Configure as variáveis de ambiente:
   - `MENU_CSV_URL`
   - `BUSINESS_CSV_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Clique em **"Deploy"**

### Opção 2: Via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Configure as variáveis de ambiente quando solicitado
```

---

## 🔧 Solução de Problemas

### Erro: "Não foi possível carregar o cardápio"
- ✅ Verifique se as URLs dos CSVs estão corretas
- ✅ Confirme que a planilha está publicada como CSV
- ✅ Teste as URLs diretamente no navegador (deve baixar um arquivo CSV)

### Erro: "WhatsApp não abre"
- ✅ Verifique se `NEXT_PUBLIC_WHATSAPP_NUMBER` está correto
- ✅ Formato: DDI + DDD + Número (ex: 5588999999999)
- ✅ Sem espaços, parênteses ou hífens

### Imagens não aparecem
- ✅ Verifique se as URLs das imagens na planilha são válidas
- ✅ Use URLs públicas (ex: Imgur, Cloudinary, Google Drive público)
- ✅ A aplicação usa fallback automático se a imagem falhar

### Dados não atualizam
- ✅ O cache é de 30 minutos para o menu e 1 hora para config
- ✅ Aguarde ou force refresh com `Ctrl+Shift+R`
- ✅ Em desenvolvimento, reinicie o servidor

---

## 📚 Próximos Passos

- [ ] Personalize as cores no `app/globals.css`
- [ ] Adicione mais categorias na planilha
- [ ] Configure o formulário de leads (opcional)
- [ ] Adicione seu logo no header
- [ ] Configure domínio personalizado na Vercel

---

## 🆘 Suporte

- 📖 Leia o [README.md](README.md) completo
- ✅ Veja o [CHECKLIST.md](CHECKLIST.md) de requisitos
- 🐛 Abra uma [issue no GitHub](https://github.com/wlfilho/menu-digital/issues)

---

**Pronto! Seu cardápio digital está no ar! 🎉**

