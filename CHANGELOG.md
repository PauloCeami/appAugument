# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2025-11-19

### ✨ Funcionalidades Principais

#### Sistema de Observações
- **Observações por item**: Clientes podem adicionar notas específicas para cada produto (ex: "sem cebola", "ponto da carne mal passado")
- **Campo de observações no modal de produto**: Textarea opcional ao adicionar item ao carrinho
- **Exibição de observações no carrinho**: Notas aparecem em itálico abaixo da descrição do produto
- **Observações na mensagem do WhatsApp**: Incluídas no formato `[obs: texto]` após cada item

#### Modal de Confirmação de Pedido
- **Dados do cliente**: Modal solicita nome (obrigatório), endereço (opcional) e observações gerais (opcional)
- **Validação**: Campo nome é obrigatório para enviar o pedido
- **UX aprimorada**: Modal com design consistente, suporte a ESC para fechar, bloqueio de scroll do body
- **Integração com WhatsApp**: Dados do cliente são incluídos na mensagem formatada

#### Mensagem do WhatsApp Formatada
- **Formato padronizado**: Mensagem segue especificação exata com seções bem definidas
- **Markdown do WhatsApp**: Usa `*negrito*` e `_itálico_` para melhor legibilidade
- **Informações completas**: Inclui itens, quantidades, preços, observações por item, subtotal e dados do cliente
- **Encoding correto**: Mensagem é codificada com `encodeURIComponent()` para caracteres especiais

### 🔧 Melhorias Técnicas

#### Tipos TypeScript
- **CartLine**: Adicionado campo opcional `notes?: string`
- **CartAction**: Novo tipo `UPDATE_NOTES` para atualizar observações
- **ProductDetailDialog**: Atualizado para aceitar e passar `notes` no callback

#### Context API do Carrinho
- **updateNotes**: Nova função para atualizar observações de itens existentes
- **buildWhatsAppMessage**: Refatorado para aceitar dados do cliente
- **buildWhatsAppLink**: Atualizado para passar dados do cliente

#### Componentes
- **ConfirmOrderModal**: Novo componente para captura de dados do cliente
- **CartSheet**: Integrado com modal de confirmação
- **ProductDetailDialog**: Campo de observações adicionado
- **CartItemRow**: Exibe observações quando presentes
- **MenuScreen**: Passa observações ao adicionar item

#### API Routes
- **GET /api/business**: Nova rota para retornar configurações do negócio em JSON
- **Cache**: Configurado com `s-maxage=3600` e `stale-while-revalidate=7200`

#### Utilitários
- **sanitizeWhatsApp**: Nova função para limpar número do WhatsApp (remove caracteres não numéricos)

### 📚 Documentação

#### README.md
- **Seção de funcionalidades**: Atualizada com emojis e descrições detalhadas
- **Guia de configuração**: Duas opções (planilha de exemplo vs. própria planilha)
- **Estrutura da planilha**: Tabelas com todas as colunas e exemplos
- **Fluxo de pedido**: Passo a passo completo do processo
- **Tratamento de dados**: Documentação de normalização de preços, disponibilidade, WhatsApp e imagens
- **Personalização**: Guia para customizar cores e categorias
- **Deploy**: Instruções para Vercel e outras plataformas
- **Critérios de aceite**: Checklist completo de funcionalidades

#### .env.example
- **Documentação completa**: Todas as variáveis de ambiente documentadas
- **Link da planilha de exemplo**: Incluído para referência
- **Exemplos práticos**: Valores de exemplo para cada variável

#### docs/WHATSAPP_MESSAGE_FORMAT.md
- **Estrutura da mensagem**: Formato exato com placeholders
- **Exemplo real**: Mensagem completa de exemplo
- **Descrição dos campos**: Explicação de cada seção
- **Implementação**: Código TypeScript comentado
- **Notas técnicas**: Detalhes sobre encoding e formatação

#### docs/QUICK_START.md
- **Guia passo a passo**: Do clone ao deploy em 10 minutos
- **Duas opções**: Usar planilha de exemplo ou criar do zero
- **Troubleshooting**: Problemas comuns e soluções
- **Próximos passos**: Checklist de personalização

### 🐛 Correções
- **Persistência de observações**: Observações agora são salvas corretamente no localStorage
- **Merge de itens**: Ao adicionar item existente, observações são preservadas ou atualizadas
- **Validação de formulário**: Nome obrigatório no modal de confirmação

### 🎨 Melhorias de UI/UX
- **Feedback visual**: Observações aparecem em cor destacada (#b37944) e itálico
- **Acessibilidade**: Labels corretos, ARIA attributes, foco visível
- **Responsividade**: Modal e campos funcionam perfeitamente em mobile
- **Consistência**: Design system mantido em todos os novos componentes

### 📦 Arquivos Modificados
- `components/cart/cart-provider.tsx`
- `components/cart/cart-sheet.tsx`
- `components/cart/cart-item-row.tsx`
- `components/menu/product-detail-dialog.tsx`
- `components/menu/menu-screen.tsx`
- `types/cart.ts`
- `lib/utils.ts`
- `README.md`
- `.env.example`

### 📦 Arquivos Criados
- `components/cart/confirm-order-modal.tsx`
- `app/api/business/route.ts`
- `docs/WHATSAPP_MESSAGE_FORMAT.md`
- `docs/QUICK_START.md`
- `CHANGELOG.md`

### 🚀 Próximas Versões (Roadmap)

#### v1.1.0 (Planejado)
- [ ] Badge "Promo" para itens com preço abaixo de limiar configurável
- [ ] Indicador "Aberto/Fechado" baseado em horário de funcionamento
- [ ] Campo de cupom funcional no rodapé
- [ ] Edição inline de observações no carrinho
- [ ] Histórico de pedidos (localStorage)

#### v1.2.0 (Planejado)
- [ ] Modo de visualização em grade/lista
- [ ] Favoritos (localStorage)
- [ ] Compartilhamento de itens
- [ ] PWA (Progressive Web App)
- [ ] Notificações push

#### v2.0.0 (Futuro)
- [ ] Backend próprio (substituir Google Sheets)
- [ ] Autenticação de clientes
- [ ] Painel administrativo
- [ ] Relatórios e analytics
- [ ] Integração com sistemas de pagamento

---

**Formato**: Este changelog segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
**Versionamento**: Este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/)

