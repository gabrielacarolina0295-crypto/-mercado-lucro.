// Direção de design: teste local da lógica portável de filtro e cálculo do Oportunidades ML.
import test from "node:test";
import assert from "node:assert/strict";
import { calculateMargin, filterCategories } from "./filters.mjs";

test("filtra categorias por categoria e margem sem criar dados", () => {
  const source = [{ id: "beleza", margin: "+42%" }, { id: "pets", margin: "+32%" }];
  assert.deepEqual(filterCategories(source, { categoryId: "beleza", minMargin: 40 }), [{ id: "beleza", margin: "+42%" }]);
  assert.deepEqual(filterCategories(source, { categoryId: "todas", minMargin: 35 }), [{ id: "beleza", margin: "+42%" }]);
});

test("calcula lucro e margem com custos locais", () => {
  const result = calculateMargin({ cost: 46, price: 119.9, fee: 16, shipping: 18, extra: 5 });
  assert.equal(result.profit.toFixed(2), "31.72");
  assert.equal(result.margin.toFixed(1), "26.5");
});
