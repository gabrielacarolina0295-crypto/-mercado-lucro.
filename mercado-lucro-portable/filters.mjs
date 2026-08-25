// Direção de design: lógica portável para filtrar o catálogo de oportunidades sem serviços externos.
export function filterCategories(categories, { categoryId = "todas", minMargin = 0 }) {
  const normalizedMargin = Math.max(0, Number(minMargin) || 0);
  return categories.filter((category) => {
    const categoryMatches = categoryId === "todas" || category.id === categoryId;
    return categoryMatches && Number.parseFloat(category.margin) >= normalizedMargin;
  });
}

export function filterDescription({ categoryLabel, minMargin, maxInvestment, stateLabel }) {
  const investment = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(Math.max(0, Number(maxInvestment) || 0));
  const margin = Math.max(0, Number(minMargin) || 0);
  return `${categoryLabel} · margem a partir de ${margin}% · investimento até ${investment} · ${stateLabel}`;
}

export function calculateMargin({ cost, price, fee, shipping, extra }) {
  const salePrice = Math.max(0, Number(price) || 0);
  const marketplaceFee = salePrice * (Math.max(0, Number(fee) || 0) / 100);
  const profit = salePrice - (Math.max(0, Number(cost) || 0) + marketplaceFee + Math.max(0, Number(shipping) || 0) + Math.max(0, Number(extra) || 0));
  return { profit, margin: salePrice ? (profit / salePrice) * 100 : 0, marketplaceFee };
}
