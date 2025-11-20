# 🎨 Guia de Personalização

Este guia mostra como personalizar a aparência e comportamento da aplicação.

---

## 🎨 Cores e Tema

### Alterar Paleta de Cores

Edite o arquivo `app/globals.css`:

```css
/* Cores principais */
--background: #f9f3ea;        /* Fundo principal */
--foreground: #4c3823;        /* Texto principal */
--primary: #d3a06f;           /* Cor primária (botões, links) */
--secondary: #e7dccd;         /* Cor secundária */
--accent: #b37944;            /* Cor de destaque */

/* Cores do carrinho */
--cart-bg: #fdf7ef;
--cart-border: #e7dccd;

/* Cores do header */
--header-bg: #fdf7ef;
--header-border: #efe3d2;
```

### Tema Escuro

As cores do tema escuro também estão em `globals.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a1410;
    --foreground: #f5e6d3;
    /* ... outras cores */
  }
}
```

---

## 🖼️ Logo e Ícones

### Substituir o Emoji do Logo

Edite `components/layout/site-header.tsx`:

```tsx
// Linha 56 - Substitua o emoji
<span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2debe] text-2xl">
  🍽️  {/* Troque por outro emoji ou use uma imagem */}
</span>

// Ou use uma imagem:
<Image 
  src="/logo.png" 
  alt="Logo" 
  width={56} 
  height={56}
  className="rounded-2xl"
/>
```

### Adicionar Favicon

Substitua o arquivo `app/favicon.ico` pela sua própria favicon.

---

## 📝 Textos e Mensagens

### Subtítulo do Header

Edite `components/layout/site-header.tsx` (linha 64):

```tsx
<p className="text-sm text-[#87735b]">
  Sabores árabes, temperos autorais e ingredientes frescos.
  {/* Troque pelo seu texto */}
</p>
```

### Mensagem de Boas-Vindas

Edite `components/layout/site-header.tsx` (linha 23):

```tsx
<span>Delícias árabes feitas com carinho todos os dias.</span>
{/* Troque pela sua mensagem */}
```

### Horário de Funcionamento

Edite `components/layout/site-header.tsx` (linha 27):

```tsx
<div className="flex items-center gap-2 rounded-full bg-[#e9dcc9] px-3 py-1 text-xs font-semibold text-[#4f3b27]">
  <span className="h-2 w-2 rounded-full bg-[#33c24d]" aria-hidden />
  Aberto até 23h  {/* Troque pelo seu horário */}
</div>
```

### Mensagem do WhatsApp

Edite `components/cart/cart-provider.tsx` (linha 225):

```tsx
const messageParts = [
  "Olá, gostaria de fazer um pedido:",  // Personalize aqui
  "",
  "Itens:",
  // ...
];
```

---

## 🏷️ Categorias e Filtros

### Ordem das Categorias

As categorias são derivadas automaticamente da planilha. Para alterar a ordem:

1. Edite a planilha e organize os itens na ordem desejada
2. A primeira aparição de cada categoria define sua posição

### Renomear "Todos"

Edite `components/menu/category-tabs.tsx` (linha 20):

```tsx
<button
  type="button"
  onClick={() => onSelectCategory(null)}
  className={/* ... */}
>
  Todos  {/* Troque por "Ver Tudo", "Completo", etc. */}
</button>
```

---

## 🛒 Carrinho

### Texto do Botão de Finalizar

Edite `components/cart/cart-sheet.tsx` (linha 95):

```tsx
<Button
  className="h-12 text-base"
  onClick={() => setIsConfirmModalOpen(true)}
>
  Enviar pelo WhatsApp  {/* Personalize aqui */}
</Button>
```

### Mensagem de Carrinho Vazio

Edite `components/cart/cart-sheet.tsx` (linha 70):

```tsx
<div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
  <ShoppingCart className="h-16 w-16 text-[#d1bda0]" aria-hidden />
  <div>
    <h3 className="text-lg font-semibold text-[#6a5336]">
      Seu carrinho está vazio  {/* Personalize */}
    </h3>
    <p className="text-sm text-[#9a8263]">
      Adicione itens do cardápio para começar  {/* Personalize */}
    </p>
  </div>
</div>
```

---

## 📱 Responsividade

### Breakpoints

Os breakpoints do Tailwind são:
- `sm`: 640px (tablet pequeno)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (desktop grande)

### Grid de Cards

Edite `components/menu/menu-section.tsx` (linha 13):

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {/* 1 coluna mobile, 2 tablet, 3 desktop */}
  {/* Troque para: sm:grid-cols-1 lg:grid-cols-2 para 2 colunas max */}
</div>
```

---

## 🔍 Busca

### Placeholder da Busca

Edite `components/menu/search-bar.tsx` (linha 35):

```tsx
<input
  type="search"
  placeholder="Buscar no cardápio..."  {/* Personalize */}
  // ...
/>
```

### Tempo de Debounce

Edite `components/search/search-provider.tsx` (linha 23):

```tsx
const timeoutId = setTimeout(() => {
  setDebouncedQuery(query);
}, 250);  // Troque para 500 para busca mais lenta, 100 para mais rápida
```

---

## 📧 Formulário de Leads

### Desabilitar Formulário

Edite a planilha na aba "Feature Config" e mude o status do "Formulário Cupom" para FALSE.

### Personalizar Textos

Edite `components/layout/lead-form.tsx`:

```tsx
<h3 className="text-lg font-semibold text-[#4c3823]">
  Receba ofertas exclusivas  {/* Personalize */}
</h3>
<p className="text-sm text-[#8d7357]">
  Cadastre-se e ganhe 10% de desconto na primeira compra  {/* Personalize */}
</p>
```

---

## 🎯 SEO e Meta Tags

### Título e Descrição

Edite `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Cardápio Digital - Seu Restaurante",  // Personalize
  description: "Peça online e receba em casa",  // Personalize
  // ...
};
```

### Open Graph (Redes Sociais)

Edite `app/layout.tsx`:

```tsx
openGraph: {
  title: "Cardápio Digital",
  description: "Peça online",
  images: ["/og-image.png"],  // Adicione sua imagem
},
```

---

## 🖼️ Imagens

### Placeholder de Imagens

Edite `lib/utils.ts` (linha 29):

```tsx
export function getImageSrc(url: string | null | undefined): string {
  if (isValidHttpUrl(url)) {
    return url!;
  }
  
  // Troque pela sua imagem padrão
  return "https://placehold.co/400x400/f2debe/6d5334?text=Sem+Imagem";
}
```

### Otimização de Imagens

As imagens são otimizadas automaticamente pelo Next.js. Para ajustar:

Edite `next.config.ts`:

```ts
images: {
  domains: ['placehold.co', 'seudominio.com'],  // Adicione domínios permitidos
  formats: ['image/avif', 'image/webp'],
},
```

---

## 🔔 Notificações e Feedback

### Toast de Sucesso (ao adicionar ao carrinho)

Atualmente não há toast. Para adicionar, instale uma biblioteca como `sonner`:

```bash
npm install sonner
```

E use em `components/menu/product-card.tsx`:

```tsx
import { toast } from 'sonner';

// No onClick do botão Adicionar:
onClick={() => {
  onAddToCart(item);
  toast.success('Item adicionado ao carrinho!');
}}
```

---

## 📊 Analytics

### Google Analytics

1. Crie uma conta no Google Analytics
2. Adicione o script no `app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 🚀 Deploy

### Variáveis de Ambiente em Produção

Na Vercel, adicione as mesmas variáveis do `.env.local`:
- `MENU_CSV_URL`
- `BUSINESS_CSV_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

### Domínio Personalizado

1. Acesse o projeto na Vercel
2. Vá em "Settings" → "Domains"
3. Adicione seu domínio (ex: cardapio.seurestaurante.com)
4. Configure o DNS conforme instruções

---

**Dica:** Sempre teste as mudanças localmente antes de fazer deploy! 🚀

