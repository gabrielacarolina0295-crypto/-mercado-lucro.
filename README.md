# Oportunidades ML — versão portável

Esta pasta contém uma cópia **independente** do catálogo. Ela não usa autenticação, banco de dados, integração de hospedagem ou URLs de recursos da plataforma anterior. Todas as imagens usadas pelo site estão em `assets/` e os filtros, favoritos locais e calculadora funcionam diretamente no navegador.

> **Entrega independente:** o arquivo `oportunidades-ml-portable.zip` é a cópia que deve ser guardada e hospedada. Ele não usa o backend, o banco ou as credenciais do projeto gerenciado anterior.

## Como abrir e manter

Abra `index.html` em qualquer servidor estático ou publique esta pasta completa em um serviço de hospedagem estática de sua preferência, como GitHub Pages, Cloudflare Pages, Netlify, Vercel ou um servidor próprio. Para testar em seu computador, use a extensão Live Server do VS Code ou qualquer servidor estático local; não é necessário instalar Node.js, banco de dados ou dependências do projeto.

> **Não exclua a pasta `assets/`.** Ela contém o banner, o símbolo e todas as imagens das categorias. O `index.html`, o `styles.css`, o `app.mjs` e o `filters.mjs` também devem permanecer juntos na raiz da pasta.

## Funcionalidades preservadas

| Função | Como funciona nesta cópia |
| --- | --- |
| Categorias | Semi Joias, Tecnologia, Casa & Cozinha, Automóveis, Bebês, Pets e Beleza. |
| Filtros | Categoria e margem mínima alteram o catálogo local. Investimento e estado são mantidos como critérios da futura busca. |
| Calculadora | Calcula taxa, lucro e margem no navegador. |
| Favoritos | Marca visualmente os cards na sessão atual do navegador. |

## Busca com dados reais do Mercado Livre

Esta cópia não consulta anúncios reais, pois isso precisa de uma aplicação autorizada e de um **servidor sob seu próprio controle** para proteger o Client Secret. Quando você tiver uma hospedagem própria, a recomendação é criar um pequeno backend separado, guardar as credenciais como variáveis de ambiente e fazer a tela chamar somente esse backend. Nunca coloque o Client Secret no `app.mjs` ou em qualquer arquivo público.

## Backup recomendado

Mantenha pelo menos três cópias: uma no seu computador, uma em um serviço de nuvem de sua confiança e outra em um pendrive ou disco externo. Sempre que editar o site, compacte a pasta inteira em `.zip` e salve a versão com a data no nome, por exemplo `oportunidades-ml-2026-08-25.zip`.

## Teste local

Em uma máquina com Node.js, execute:

```bash
node --test filters.test.mjs
```

Esse teste confirma a lógica de filtro e cálculo sem instalar bibliotecas externas.

## Verificação da cópia

Em 25 de agosto de 2026, esta versão foi validada abrindo diretamente o arquivo `index.html`. O catálogo com sete categorias, os filtros locais, os favoritos visuais e a calculadora carregaram a partir dos arquivos incluídos na própria pasta.
