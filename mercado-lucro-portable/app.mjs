// Direção de design: catálogo mobile escuro, verde-musgo e sinais visuais de margem para o Oportunidades ML.
function filterCategories(categories, { categoryId = "todas", minMargin = 0 }) {
  const normalizedMargin = Math.max(0, Number(minMargin) || 0);
  return categories.filter((category) => (categoryId === "todas" || category.id === categoryId) && Number.parseFloat(category.margin) >= normalizedMargin);
}

function filterDescription({ categoryLabel, minMargin, maxInvestment, stateLabel }) {
  const investment = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(Math.max(0, Number(maxInvestment) || 0));
  return `${categoryLabel} · margem a partir de ${Math.max(0, Number(minMargin) || 0)}% · investimento até ${investment} · ${stateLabel}`;
}

function calculateMargin({ cost, price, fee, shipping, extra }) {
  const salePrice = Math.max(0, Number(price) || 0);
  const marketplaceFee = salePrice * (Math.max(0, Number(fee) || 0) / 100);
  const profit = salePrice - (Math.max(0, Number(cost) || 0) + marketplaceFee + Math.max(0, Number(shipping) || 0) + Math.max(0, Number(extra) || 0));
  return { profit, margin: salePrice ? (profit / salePrice) * 100 : 0, marketplaceFee };
}

const categories = [
  { id: "semijoias", title: "Semi Joias", subtitle: "Acessórios leves", margin: "+50%", image: "assets/categoria-semijoias.jpg", tag: "Leves para enviar" },
  { id: "tecnologia", title: "Tecnologia", subtitle: "Celulares e acessórios", margin: "+35%", image: "assets/categoria-tecnologia.jpg", tag: "Compra recorrente" },
  { id: "casa", title: "Casa & Cozinha", subtitle: "Utilidades práticas", margin: "+40%", image: "assets/categoria-casa.jpg", tag: "Giro frequente" },
  { id: "automoveis", title: "Automóveis", subtitle: "Acessórios e cuidados", margin: "+30%", image: "assets/categoria-automoveis.jpg", tag: "Compra de reposição" },
  { id: "bebes", title: "Bebês", subtitle: "Itens essenciais", margin: "+38%", image: "assets/categoria-bebes.jpg", tag: "Necessidade constante" },
  { id: "pets", title: "Pets", subtitle: "Acessórios para cuidado", margin: "+32%", image: "assets/categoria-pets.jpg", tag: "Tutor recorrente" },
  { id: "beleza", title: "Beleza", subtitle: "Autocuidado e cosméticos", margin: "+42%", image: "assets/categoria-beleza.jpg", tag: "Reposição frequente" },
];

const states = ["Todos os estados", "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"];
const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);

const categoryFilter = $("#category-filter");
const marginFilter = $("#margin-filter");
const investmentFilter = $("#investment-filter");
const stateFilter = $("#state-filter");
const favorites = new Set();

categoryFilter.innerHTML = `<option value="todas">Todas as categorias</option>${categories.map((category) => `<option value="${category.id}">${category.title}</option>`).join("")}`;
stateFilter.innerHTML = states.map((state, index) => `<option value="${index === 0 ? "todos" : state}">${state}</option>`).join("");

function renderCatalog() {
  const selectedCategory = categoryFilter.value;
  const filtered = filterCategories(categories, { categoryId: selectedCategory, minMargin: marginFilter.value });
  const categoryLabel = selectedCategory === "todas" ? "Todas as categorias" : categories.find((category) => category.id === selectedCategory)?.title;
  const stateLabel = stateFilter.options[stateFilter.selectedIndex].text;
  $("#filter-summary").textContent = filterDescription({ categoryLabel, minMargin: marginFilter.value, maxInvestment: investmentFilter.value, stateLabel });
  $("#catalog-count").textContent = `${filtered.length} categoria${filtered.length === 1 ? "" : "s"} encontrada${filtered.length === 1 ? "" : "s"}`;
  $("#catalog").innerHTML = filtered.map((category) => `<article class="opportunity-card"><div class="card-image"><img src="${category.image}" alt="Categoria ${category.title}" /><span class="card-tag">${category.tag}</span><button class="favorite" type="button" aria-label="Salvar ${category.title}" aria-pressed="${favorites.has(category.id)}" data-favorite="${category.id}">☆</button></div><div class="card-content"><h3>${category.title}</h3><p>${category.subtitle}</p><div class="card-meta"><span>${category.margin}</span><span>↗</span></div></div></article>`).join("");
  $("#catalog-empty").hidden = filtered.length > 0;
  document.querySelectorAll("[data-favorite]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    renderCatalog();
  }));
}

function renderCalculator() {
  const result = calculateMargin({ cost: $("#cost").value, price: $("#price").value, fee: $("#fee").value, shipping: $("#shipping").value, extra: $("#extra").value });
  const output = $("#calculator-result");
  output.classList.toggle("negative", result.profit < 0);
  output.innerHTML = `<div><small>LUCRO ESTIMADO POR VENDA</small><strong>${money(result.profit)}</strong><small>Taxa estimada: ${money(result.marketplaceFee)}</small></div><b>${result.margin.toFixed(1)}%</b>`;
}

[categoryFilter, marginFilter, investmentFilter, stateFilter].forEach((field) => field.addEventListener("input", renderCatalog));
document.querySelectorAll(".calculator input").forEach((field) => field.addEventListener("input", renderCalculator));
document.querySelectorAll("[data-scroll]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" })));
renderCatalog();
renderCalculator();
