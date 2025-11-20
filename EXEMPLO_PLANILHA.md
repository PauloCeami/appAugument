# 📊 Exemplo de Dados para Planilha

Este documento mostra exemplos de como preencher sua planilha do Google Sheets.

---

## 📋 Aba 1: Cardápio (menu)

### Estrutura das Colunas

| ID | Nome | Categoria | Descrição | Preço | Imagem URL | Disponível |
|----|------|-----------|-----------|-------|------------|------------|

### Exemplos de Dados

| ID | Nome | Categoria | Descrição | Preço | Imagem URL | Disponível |
|----|------|-----------|-----------|-------|------------|------------|
| 1 | Esfiha Aberta de Carne | Esfihas | Massa fina e crocante com carne moída temperada com especiarias árabes | 8,00 | https://placehold.co/400/f2debe/6d5334?text=Esfiha | Sim |
| 2 | Esfiha Fechada de Queijo | Esfihas | Massa macia recheada com queijo derretido | 7,50 | https://placehold.co/400/f2debe/6d5334?text=Queijo | Sim |
| 3 | Esfiha de Frango | Esfihas | Frango desfiado com tempero especial | 8,00 | https://placehold.co/400/f2debe/6d5334?text=Frango | Sim |
| 4 | Beirute de Carne | Beirutes | Pão sírio com carne, queijo, alface, tomate e molho especial | 36,00 | https://placehold.co/400/f2debe/6d5334?text=Beirute | Sim |
| 5 | Beirute de Frango | Beirutes | Pão sírio com frango grelhado, queijo e salada | 34,00 | https://placehold.co/400/f2debe/6d5334?text=Frango | Sim |
| 6 | Kibe Frito | Salgados | Kibe tradicional frito, crocante por fora e macio por dentro | 6,00 | https://placehold.co/400/f2debe/6d5334?text=Kibe | Sim |
| 7 | Kibe Assado | Salgados | Kibe assado no forno com recheio de carne | 25,00 | https://placehold.co/400/f2debe/6d5334?text=Assado | Não |
| 8 | Tabule | Saladas | Salada árabe com trigo, tomate, cebola e hortelã | 18,00 | https://placehold.co/400/f2debe/6d5334?text=Tabule | Sim |
| 9 | Homus | Pastas | Pasta de grão-de-bico com tahine e azeite | 15,00 | https://placehold.co/400/f2debe/6d5334?text=Homus | Sim |
| 10 | Baklava | Sobremesas | Doce árabe de massa folhada com nozes e mel | 12,00 | https://placehold.co/400/f2debe/6d5334?text=Baklava | Sim |
| 11 | Suco de Laranja | Bebidas | Suco natural de laranja 500ml | 8,00 | https://placehold.co/400/f2debe/6d5334?text=Suco | Sim |
| 12 | Refrigerante Lata | Bebidas | Coca-Cola, Guaraná ou Fanta 350ml | 5,00 | https://placehold.co/400/f2debe/6d5334?text=Refri | Sim |

### Notas Importantes

- **ID**: Pode ser número ou texto. Se deixar vazio, será gerado automaticamente
- **Nome**: Obrigatório. Nome do produto que aparece no cardápio
- **Categoria**: Obrigatório. Agrupa os produtos (ex: Esfihas, Beirutes, Bebidas)
- **Descrição**: Opcional. Texto descritivo do produto (máx. 2-3 linhas no card)
- **Preço**: Aceita vários formatos:
  - `8` ou `8.00` (número)
  - `8,00` (vírgula decimal)
  - `R$ 8,00` (com símbolo)
- **Imagem URL**: Opcional. URL pública da imagem. Se vazio, usa placeholder
- **Disponível**: Aceita:
  - `Sim` / `Não`
  - `TRUE` / `FALSE`
  - `1` / `0`
  - Vazio = Disponível

---

## 🏢 Aba 2: Config (business)

### Estrutura das Colunas

| Restaurante | CNPJ | Telefone | Whatsapp | Endereço | Bairro | Cidade | Estado | Instagram | Facebook |
|-------------|------|----------|----------|----------|--------|--------|--------|-----------|----------|

### Exemplo de Dados

| Restaurante | CNPJ | Telefone | Whatsapp | Endereço | Bairro | Cidade | Estado | Instagram | Facebook |
|-------------|------|----------|----------|----------|--------|--------|--------|-----------|----------|
| Lilica Esfihas | 12.345.678/0001-90 | (88) 3333-4444 | 5588999999999 | Rua das Flores, 123 | Centro | Fortaleza | CE | https://instagram.com/lilica | https://facebook.com/lilica |

### Notas Importantes

- **Restaurante**: Obrigatório. Nome que aparece no header e footer
- **CNPJ**: Opcional. Aparece no footer
- **Telefone**: Opcional. Telefone fixo para contato
- **Whatsapp**: Obrigatório. Número para receber pedidos
  - Formato: DDI + DDD + Número (sem espaços, parênteses ou hífens)
  - Exemplo: `5588999999999` (55 = Brasil, 88 = DDD, 999999999 = número)
- **Endereço**: Opcional. Logradouro completo
- **Bairro**: Opcional. Bairro do estabelecimento
- **Cidade**: Opcional. Cidade
- **Estado**: Opcional. UF (ex: CE, SP, RJ)
- **Instagram**: Opcional. URL completa do perfil
- **Facebook**: Opcional. URL completa da página

**Importante:** Apenas a primeira linha de dados é lida (após o cabeçalho).

---

## 📧 Aba 3: Leads (opcional)

### Estrutura das Colunas

| Timestamp | Nome | Email |
|-----------|------|-------|

### Exemplo de Dados

| Timestamp | Nome | Email |
|-----------|------|-------|
| 2025-01-15T10:30:00 | João Silva | joao@email.com |
| 2025-01-15T11:45:00 | Maria Santos | maria@email.com |

### Notas Importantes

- Esta aba é preenchida automaticamente pelo sistema
- Não precisa adicionar dados manualmente
- Configure as credenciais da Google Sheets API para ativar

---

## 🎨 Dicas de Imagens

### Onde Hospedar Imagens

1. **Imgur** (gratuito, fácil)
   - Acesse https://imgur.com
   - Faça upload da imagem
   - Copie o link direto (termina com .jpg, .png, etc.)

2. **Cloudinary** (gratuito até 25GB)
   - Acesse https://cloudinary.com
   - Faça upload e copie a URL

3. **Google Drive** (requer configuração)
   - Faça upload no Drive
   - Compartilhe como "Qualquer pessoa com o link"
   - Use formato: `https://drive.google.com/uc?id=FILE_ID`

4. **Unsplash** (fotos gratuitas)
   - Acesse https://unsplash.com
   - Busque por "food", "arabic food", etc.
   - Copie o link da imagem

### Tamanho Recomendado

- **Formato:** Quadrado (1:1)
- **Resolução:** 400x400px ou 800x800px
- **Peso:** Máx. 200KB por imagem
- **Formato:** JPG ou PNG

---

## 📝 Exemplo de Categorias

Organize seus produtos em categorias lógicas:

### Restaurante Árabe
- Esfihas
- Beirutes
- Salgados
- Saladas
- Pastas
- Sobremesas
- Bebidas

### Pizzaria
- Pizzas Salgadas
- Pizzas Doces
- Calzones
- Bebidas
- Sobremesas

### Hamburgueria
- Hambúrgueres
- Porções
- Acompanhamentos
- Bebidas
- Sobremesas

### Lanchonete
- Lanches
- Salgados
- Sucos
- Vitaminas
- Açaí

---

## 🔄 Como Atualizar a Planilha

1. Edite a planilha normalmente no Google Sheets
2. As mudanças aparecem automaticamente no site em até 30 minutos
3. Para forçar atualização imediata:
   - Reinicie o servidor (desenvolvimento)
   - Faça redeploy (produção)
   - Ou aguarde o cache expirar

---

## ⚠️ Erros Comuns

### Produto não aparece
- ✅ Verifique se o campo "Nome" está preenchido
- ✅ Verifique se "Disponível" está como "Sim" ou "TRUE"
- ✅ Aguarde o cache atualizar (30 minutos)

### Preço aparece errado
- ✅ Use vírgula ou ponto para decimais
- ✅ Evite espaços extras
- ✅ Formato aceito: `8`, `8.00`, `8,00`, `R$ 8,00`

### Imagem não carrega
- ✅ Verifique se a URL é pública
- ✅ Teste a URL diretamente no navegador
- ✅ Use URLs que terminam com .jpg, .png, .webp

### WhatsApp não funciona
- ✅ Formato correto: `5588999999999` (DDI + DDD + número)
- ✅ Sem espaços, parênteses ou hífens
- ✅ Teste o número: `https://wa.me/5588999999999`

---

## 📥 Template Pronto

Quer começar rápido? Use este template:

**[Link para planilha de exemplo](https://docs.google.com/spreadsheets/d/e/2PACX-1vTkcj5CDZIUwgoEhpykFc_QKtYpiQh8TF9qR3jw8YxZvSilKOuR9ZDG1a5fOeWSUk1cJtlDYn26GfSk/pubhtml)**

1. Faça uma cópia da planilha
2. Edite com seus dados
3. Publique como CSV
4. Configure as URLs no `.env.local`

---

**Pronto! Sua planilha está configurada! 🎉**

