# Formato da Mensagem do WhatsApp

Este documento descreve o formato exato da mensagem enviada via WhatsApp quando o cliente finaliza um pedido.

## Estrutura da Mensagem

```
Olá, gostaria de fazer um pedido:

*Itens:*
- {Qtd}x {Nome} — {PreçoUnitário BRL} [obs: {Observações?}]
- {Qtd}x {Nome} — {PreçoUnitário BRL}
...

*Subtotal:* {Total BRL}

*Dados do cliente:*
Nome: {input obrigatório}
Endereço/Entrega: {input opcional}
Observações gerais: {input opcional}

_Enviado pelo cardápio online._
```

## Exemplo Real

```
Olá, gostaria de fazer um pedido:

*Itens:*
- 2x Esfiha de Carne — R$ 8,00 [obs: sem limão]
- 1x Beirute de Frango — R$ 36,00
- 3x Suco Natural — R$ 6,00 [obs: bem gelado]

*Subtotal:* R$ 70,00

*Dados do cliente:*
Nome: William Silva
Endereço/Entrega: Rua das Flores, 123 - Centro
Observações gerais: Deixar na portaria. Troco para R$ 100.

_Enviado pelo cardápio online._
```

## Campos

### Itens
- **Quantidade**: Número de unidades do produto
- **Nome**: Nome do produto conforme cadastrado na planilha
- **Preço Unitário**: Preço de uma unidade formatado em BRL (R$ X,XX)
- **Observações** (opcional): Notas específicas do item adicionadas pelo cliente

### Subtotal
- Soma total de todos os itens (quantidade × preço unitário)
- Formatado em BRL (R$ X,XX)

### Dados do Cliente
- **Nome** (obrigatório): Nome completo do cliente
- **Endereço/Entrega** (opcional): Endereço para entrega ou retirada
- **Observações gerais** (opcional): Notas adicionais sobre o pedido inteiro

## Implementação

A mensagem é gerada pela função `buildWhatsAppMessage` em `components/cart/cart-provider.tsx`:

```typescript
const buildWhatsAppMessage = useCallback((
  customerName?: string,
  customerAddress?: string,
  customerNotes?: string
) => {
  const itemLines = state.items.map((line) => {
    const unitPrice = formatCurrency(line.item.price);
    const notesText = line.notes ? ` [obs: ${line.notes}]` : "";
    return `- ${line.quantity}x ${line.item.name} — ${unitPrice}${notesText}`;
  });

  const parts = [
    "Olá, gostaria de fazer um pedido:",
    "",
    "*Itens:*",
    ...itemLines,
    "",
    `*Subtotal:* ${formatCurrency(total)}`,
  ];

  if (customerName || customerAddress || customerNotes) {
    parts.push("", "*Dados do cliente:*");
    if (customerName) parts.push(`Nome: ${customerName}`);
    if (customerAddress) parts.push(`Endereço/Entrega: ${customerAddress}`);
    if (customerNotes) parts.push(`Observações gerais: ${customerNotes}`);
  }

  parts.push("", "_Enviado pelo cardápio online._");

  return parts.join("\n");
}, [state.items, total]);
```

## Link do WhatsApp

O link final é gerado pela função `buildWhatsAppLink`:

```typescript
const buildWhatsAppLink = useCallback((
  customerName?: string,
  customerAddress?: string,
  customerNotes?: string
) => {
  const message = buildWhatsAppMessage(customerName, customerAddress, customerNotes);
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = sanitizeWhatsApp(config.whatsapp);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}, [buildWhatsAppMessage, config.whatsapp]);
```

## Notas Técnicas

1. **Encoding**: A mensagem é codificada com `encodeURIComponent()` para garantir que caracteres especiais sejam transmitidos corretamente
2. **Número do WhatsApp**: Deve estar no formato internacional sem espaços ou caracteres especiais (ex: `5588999999999`)
3. **Formatação**: Usa markdown do WhatsApp (`*negrito*`, `_itálico_`) para melhor legibilidade
4. **Quebras de linha**: Usa `\n` para separar linhas, que o WhatsApp renderiza corretamente

