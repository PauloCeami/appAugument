/**
 * Formata um número como moeda brasileira (BRL)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Normaliza uma string de preço para número
 * Aceita formatos: 8, 8.00, R$ 8,00, 8,00
 */
export function sanitizePrice(rawPrice: string): number {
  const normalized = rawPrice
    .replace(/[R$\s]/gi, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');

  const price = Number.parseFloat(normalized);
  return Number.isFinite(price) ? price : 0;
}

/**
 * Sanitiza número de telefone/WhatsApp removendo caracteres não numéricos
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Normaliza campo de disponibilidade para boolean
 * Aceita: Sim/Não, TRUE/FALSE, 1/0
 */
export function parseAvailability(raw: string): boolean {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  return ['sim', 'yes', 'true', '1'].includes(normalized);
}

