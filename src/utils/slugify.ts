/**
 * Converte um texto em slug URL-friendly.
 * "Lançamento de Maré do Amor" → "lancamento-de-mare-do-amor"
 */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')   // remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-')            // espaços → hífens
    .replace(/-+/g, '-');            // hífens duplos → simples
