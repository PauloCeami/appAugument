# Cardápio Digital Online

Aplicação completa de cardápio digital construída com Next.js 15 (App Router), React 19 e Tailwind CSS. O conteúdo é abastecido automaticamente a partir de uma planilha do Google Sheets, permitindo edição dinâmica dos itens sem necessidade de deploy.

> 📋 **Planilha de exemplo**: [https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pubhtml](https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pubhtml)

## ✨ Funcionalidades
- 🔍 **Busca em tempo real** por nome, descrição ou categoria
- 🏷️ **Filtro por categoria** com chips interativos (inclui "Todos")
- 🖼️ **Cards responsivos** com imagens otimizadas e estado de disponibilidade
- 📝 **Observações por item** - adicione notas específicas para cada produto
- 🛒 **Carrinho persistente** (localStorage) com ajuste de quantidades e remoção
- 💬 **Envio via WhatsApp** com modal de confirmação e dados do cliente
- 📱 **Mensagem formatada** incluindo itens, quantidades, preços, observações e dados do cliente
- 🏪 **Informações do restaurante** carregadas da aba "Configurações" (nome, endereço, CNPJ, redes sociais)
- 📊 **Formulário de cupom** que envia leads para a aba "Leads" no Google Sheets
- 🎨 **Tema claro/escuro** com armazenamento de preferência
- ⚡ **Loading states** e tratamento de erros
- 📱 **Design mobile-first** com animações sutis
- ♿ **Acessibilidade** com ARIA labels e foco visível
- 🔄 **Cache inteligente** com revalidação automática (300s para menu, 3600s para config)

## 🛠️ Stack e integrações
- [Next.js 15](https://nextjs.org/) + App Router
- [React 19](https://react.dev/) com componentes server/client
- [Tailwind CSS 4 (preview)](https://tailwindcss.com/) para estilização
- [next-themes](https://github.com/pacocoursey/next-themes) para controle de tema
- Google Sheets como CMS via exportação CSV pública (`gviz/tq?tqx=out:csv`)

## 🚀 Execução local

### Opção 1: Usar a planilha de exemplo (mais rápido)

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```

   Para usar a **planilha de exemplo fornecida**, edite o `.env.local` e adicione:
   ```env
   # URL do CSV da aba "Cardápio" (menu)
   MENU_CSV_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pub?output=csv

   # URL do CSV da aba "Config" (business)
   BUSINESS_CSV_URL=https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pub?gid=1&output=csv
   ```

3. **Rode o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000).

### Opção 2: Usar sua própria planilha

1. **Crie uma cópia da planilha de exemplo** ou crie uma nova com as mesmas colunas

2. **Publique a planilha**:
   - Abra sua planilha no Google Sheets
   - Vá em **Arquivo → Compartilhar → Publicar na Web**
   - Escolha a aba desejada e formato **CSV**
   - Copie o link gerado

3. **Configure o `.env.local`**:
   ```env
   # URL do CSV da aba "Cardápio"
   MENU_CSV_URL=https://docs.google.com/spreadsheets/d/e/SEU_ID/pub?output=csv

   # URL do CSV da aba "Config"
   BUSINESS_CSV_URL=https://docs.google.com/spreadsheets/d/e/SEU_ID/pub?gid=1&output=csv
   ```

4. **(Opcional) Para salvar leads na planilha**:
   - Crie uma conta de serviço no Google Cloud
   - Compartilhe a planilha com o email da conta de serviço
   - Configure as variáveis:
   ```env
   GOOGLE_SHEETS_ID=SEU_SHEET_ID
   GOOGLE_LEADS_RANGE=Leads!A:C
   GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-servico@projeto.iam.gserviceaccount.com
   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### Scripts úteis
- `npm run dev`: start em modo desenvolvimento (Turbopack)
- `npm run build`: build de produção
- `npm run start`: serve do build
- `npm run lint`: checagem de lint (ESLint + TypeScript)

## 📋 Estrutura da Planilha

### Aba 1 — Cardápio (menu)

A primeira aba deve conter as seguintes colunas:

| Coluna | Descrição | Exemplo | Obrigatório |
|--------|-----------|---------|-------------|
| `ID` | Identificador único | `1`, `PROD001` | Sim |
| `Nome` | Nome do produto | `Esfiha de Carne` | Sim |
| `Categoria` | Categoria do produto | `Entradas`, `Pratos Principais` | Sim |
| `Descrição` | Descrição detalhada | `Massa fina com recheio especial` | Não |
| `Preço` | Preço do produto | `8.00`, `R$ 8,00`, `8` | Sim |
| `Imagem URL` | URL da imagem | `https://exemplo.com/imagem.jpg` | Não |
| `Disponível` | Disponibilidade | `Sim`, `Não`, `TRUE`, `FALSE`, `1`, `0` | Não (padrão: Sim) |

**Exemplo de linha:**
```
1, Esfiha de Carne, Entradas, Massa fina com recheio especial de carne temperada, 8.00, https://exemplo.com/esfiha.jpg, Sim
```

### Aba 2 — Config (business)

A segunda aba deve conter as informações do negócio:

| Coluna | Descrição | Exemplo | Obrigatório |
|--------|-----------|---------|-------------|
| `Restaurante` | Nome do estabelecimento | `Restaurante Lilica` | Sim |
| `CNPJ` | CNPJ do estabelecimento | `12.345.678/0001-90` | Não |
| `Telefone` | Telefone fixo | `(88) 3333-4444` | Não |
| `Whatsapp` | WhatsApp para pedidos | `(88) 99999-9999` ou `5588999999999` | Sim |
| `Endereço` | Endereço completo | `Rua das Flores, 123` | Não |
| `Bairro` | Bairro | `Centro` | Não |
| `Cidade` | Cidade | `Fortaleza` | Não |
| `Estado` | Estado (UF) | `CE` | Não |
| `Instagram` | URL do Instagram | `https://instagram.com/restaurante` | Não |
| `Facebook` | URL do Facebook | `https://facebook.com/restaurante` | Não |

**Exemplo de linha:**
```
Restaurante Lilica, 12.345.678/0001-90, (88) 3333-4444, 5588999999999, Rua das Flores 123, Centro, Fortaleza, CE, https://instagram.com/lilica, https://facebook.com/lilica
```

### Aba 3 — Leads (opcional)

Se você configurou a integração com Google Sheets API, os leads do formulário de cupom serão salvos nesta aba:

| Coluna | Descrição |
|--------|-----------|
| `Timestamp` | Data e hora do cadastro |
| `Nome` | Nome do cliente |
| `Email` | Email do cliente |

## ✅ Critérios de Aceite

- [x] Busca e filtro por categoria funcionando (inclui "Todos")
- [x] Cards exibem nome, descrição, preço BRL, imagem/fallback e estado de disponibilidade
- [x] "Opções" abre modal para observações e quantidade
- [x] "+ Adicionar" coloca item no carrinho com qty e notes
- [x] Carrinho persiste no localStorage, mostra subtotal BRL e permite editar/remover
- [x] "Enviar pelo WhatsApp" abre modal de confirmação com campos do cliente
- [x] Mensagem do WhatsApp formatada corretamente com itens, observações e dados do cliente
- [x] Header e footer exibem dados do restaurante (endereço, cidade/estado, CNPJ, redes)
- [x] Tudo responsivo e acessível (ARIA labels, foco visível)
- [x] API endpoints `/api/menu` e `/api/business` com cache e revalidação
- [x] Tratamento de erros e estados de loading
- [x] Tema claro/escuro funcional

## 🧱 Estrutura principal
```
app/
  layout.tsx              # Layout raiz com providers e metadados
  page.tsx                # Página do cardápio (server component)
  loading.tsx             # Skeleton de carregamento
  error.tsx               # Boundary de erro
  api/
    menu/route.ts         # GET /api/menu - Retorna cardápio em JSON
    business/route.ts     # GET /api/business - Retorna config do negócio
    leads/route.ts        # POST /api/leads - Salva leads na planilha
components/
  cart/
    cart-provider.tsx     # Context API do carrinho com localStorage
    cart-button.tsx       # Botão flutuante do carrinho
    cart-sheet.tsx        # Painel lateral do carrinho
    cart-item-row.tsx     # Linha de item no carrinho
    confirm-order-modal.tsx # Modal de confirmação com dados do cliente
  layout/
    site-header.tsx       # Cabeçalho com logo e nome do restaurante
    site-footer.tsx       # Rodapé com endereço, CNPJ e redes sociais
    lead-form.tsx         # Formulário de captura de email/cupom
  menu/
    menu-screen.tsx       # Tela principal do cardápio
    menu-section.tsx      # Seção de categoria
    product-card.tsx      # Card de produto
    product-detail-dialog.tsx # Modal de detalhes com observações
    category-tabs.tsx     # Chips de filtro por categoria
    search-bar.tsx        # Barra de busca
  search/
    search-provider.tsx   # Context API de busca
  theme/
    theme-provider.tsx    # Provider de tema claro/escuro
  ui/
    button.tsx            # Componente de botão
    input.tsx             # Componente de input
    quantity-selector.tsx # Seletor de quantidade
lib/
  config-service.ts       # Fetch + parse da aba "Configurações"
  menu-service.ts         # Fetch + parse da aba "Cardápio"
  csv.ts                  # Parser de CSV manual
  utils.ts                # Helpers (formatação, sanitização)
  webhook-service.ts      # Integração com Google Sheets API
types/
  menu.ts                 # MenuItem, MenuCategory, MenuData
  cart.ts                 # CartLine, CartState, CartAction
  config.ts               # SiteConfig, SiteConfigWithComputed
data/
  fallback-menu.ts        # Dados de fallback do cardápio
  fallback-config.ts      # Dados de fallback da configuração
```

## 💬 Fluxo de Pedido via WhatsApp

1. **Cliente adiciona itens ao carrinho**
   - Pode adicionar observações específicas para cada item (ex: "sem cebola")
   - Pode ajustar quantidades

2. **Cliente clica em "Finalizar pedido"**
   - Abre modal de confirmação

3. **Cliente preenche dados**
   - Nome (obrigatório)
   - Endereço/Entrega (opcional)
   - Observações gerais do pedido (opcional)

4. **Sistema gera mensagem formatada**
   ```
   Olá, gostaria de fazer um pedido:

   *Itens:*
   - 2x Esfiha de Carne — R$ 8,00 [obs: sem limão]
   - 1x Beirute de Frango — R$ 36,00

   *Subtotal:* R$ 52,00

   *Dados do cliente:*
   Nome: William
   Endereço/Entrega: Rua Exemplo, 123 - Centro
   Observações gerais: Deixar na portaria.

   _Enviado pelo cardápio online._
   ```

5. **Abre WhatsApp com mensagem pré-preenchida**
   - Link: `https://wa.me/5588999999999?text=<mensagem_encoded>`
   - Cliente só precisa clicar em "Enviar"

## 🔧 Tratamento de Dados

### Preço
Aceita múltiplos formatos e normaliza para número:
- `8` → `8.00`
- `8.00` → `8.00`
- `R$ 8,00` → `8.00`
- `8,00` → `8.00`

Formatação de saída: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`

### Disponibilidade
Aceita múltiplos formatos:
- `Sim`, `Yes`, `TRUE`, `1` → `true`
- `Não`, `No`, `FALSE`, `0` → `false`
- Vazio → `true` (disponível por padrão)

### WhatsApp
Remove todos os caracteres não numéricos:
- `(88) 99999-9999` → `5588999999999`
- `+55 88 9 9999-9999` → `5588999999999`

### Imagens
- URLs HTTP/HTTPS são usadas diretamente
- Caminhos relativos são normalizados para `/caminho`
- Fallback para placeholder se inválido ou quebrado

## 🎨 Personalização

### Cores
As cores principais estão definidas no Tailwind CSS. Para personalizar, edite os valores em `app/globals.css`:

```css
/* Tons principais */
--color-primary: #c08954;
--color-secondary: #4c3823;
--color-background: #f9f3ea;
```

### Categorias
As categorias são derivadas automaticamente da coluna `Categoria` da planilha. Você pode personalizar ícones e descrições em `components/menu/menu-screen.tsx`:

```typescript
const CATEGORY_DETAILS: Record<string, { icon: string; description: string }> = {
  "Sua Categoria": {
    icon: "🍕",
    description: "Descrição personalizada",
  },
};
```

## 🚀 Deploy

### Vercel (Recomendado)

1. **Faça push do código para GitHub/GitLab/Bitbucket**

2. **Importe o projeto na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório

3. **Configure as variáveis de ambiente**
   - Adicione todas as variáveis do `.env.local` nas configurações do projeto
   - Especialmente importante:
     - `MENU_CSV_URL` - URL do CSV da aba "Cardápio"
     - `BUSINESS_CSV_URL` - URL do CSV da aba "Config"

4. **Deploy**
   - A Vercel fará o build e deploy automaticamente
   - Cada push na branch principal dispara um novo deploy

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js 15:
- **Netlify**: Configure build command como `npm run build` e publish directory como `.next`
- **Railway**: Adicione as variáveis de ambiente e faça deploy
- **AWS Amplify**: Configure o build settings para Next.js
- **Docker**: Use a imagem oficial do Node.js 20+

## 🔒 Segurança

- ✅ Variáveis de ambiente para dados sensíveis
- ✅ Validação de inputs no lado do cliente e servidor
- ✅ Sanitização de URLs e dados da planilha
- ✅ CORS configurado nos endpoints de API
- ✅ Rate limiting recomendado para produção (não incluído)

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se as variáveis de ambiente estão configuradas corretamente
2. Confirme que a planilha está publicada e acessível
3. Verifique os logs do console para erros
4. Abra uma issue no repositório

---

Desenvolvido com ❤️ usando Next.js, React e Tailwind CSS


