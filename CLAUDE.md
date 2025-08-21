# CLAUDE.md

Este arquivo fornece orientações para o Claude Code (claude.ai/code) ao trabalhar com código neste repositório.

## Visão Geral do Projeto

Este é um site de marketing estático para o DentalPro, um sistema de gestão de clínicas odontológicas. O site é construído com HTML, CSS e JavaScript vanilla e possui um formulário de cadastro de clínica em múltiplas etapas com simulação de processamento de pagamento integrado.

## Arquitetura e Estrutura

### Arquivos Principais
- `index.html` - Arquivo HTML principal contendo todas as seções (hero, recursos, planos, cadastro, contato)
- `styles.css` - Estilização CSS completa com design responsivo e animações
- `script.js` - Funcionalidade JavaScript para manipulação de formulários, validação e interações do usuário

### Componentes Principais

**Sistema de Navegação**
- Cabeçalho fixo com navegação de rolagem suave
- Menu hambúrguer responsivo para mobile
- Botão CTA para "Cadastrar Clínica" (linha 25 em index.html)

**Formulário de Cadastro Multi-etapas**
- Etapa 1: Coleta de dados da clínica (CNPJ, informações comerciais)
- Etapa 2: Seleção de plano com opções de cobrança (mensal/anual)
- Etapa 3: Formulário de pagamento com validação de cartão de crédito
- Validação de formulário com feedback em tempo real e formatação

**Gerenciamento de Planos**
- Três níveis de preços: Básico, Profissional, Enterprise
- Alternância entre cobrança mensal/anual com 20% de desconto anual
- Atualizações dinâmicas de preço baseadas no ciclo de cobrança

**Processamento de Pagamento**
- Processamento de pagamento simulado com atraso de 2 segundos
- Validação de formulário para número do cartão, data de validade, CVV
- Modal de sucesso com confirmação da transação

## Diretrizes de Desenvolvimento

### Modificações no Formulário
Ao modificar o formulário de cadastro:
- Manter a estrutura de 3 etapas definida em `script.js` (linhas 224-249)
- Atualizar tanto os campos HTML do formulário quanto as funções de validação JavaScript
- Garantir que a formatação do CNPJ siga os padrões brasileiros (linhas 365-372)
- Formatação do número do cartão suporta formatos padrão de cartão de crédito (linhas 374-378)

### Atualizações de Planos
Para modificar planos de preços:
- Atualizar o objeto `plans` em `script.js` (linhas 7-46)
- Modificar o HTML correspondente na seção de planos (linhas 122-181)
- Garantir que a funcionalidade de alternância de cobrança permaneça intacta

### Mudanças de Estilo
- CSS segue convenções semelhantes ao BEM com organização baseada em componentes
- Esquema de cores usa tema azul consistente (`#2563eb` primário, `#64748b` secundário)
- Breakpoints responsivos: 768px (tablet), 480px (mobile)
- Todas as animações usam transições CSS para interações suaves

### Remoção de Link de Navegação
O usuário solicitou a remoção da opção "Cadastrar Clínica" da navegação superior. Isso se refere à linha 25 em `index.html` onde o botão CTA está definido.

## Recursos Principais

### Validação de Formulário
- Validação em tempo real com feedback visual (bordas vermelhas para erros)
- Validação e formatação de CNPJ
- Validação de cartão de crédito (número, validade, CVV)
- Verificação de campos obrigatórios por etapa

### Elementos Interativos
- Navegação de rolagem suave
- Seleção de plano com preços dinâmicos
- Alternância de cobrança (mensal/anual) com atualizações de preço
- Menu mobile alternável
- Sistema modal para confirmação de sucesso

### Design Responsivo
- Abordagem CSS mobile-first
- Layouts de grade flexíveis usando CSS Grid
- Tamanhos de botão amigáveis ao toque
- Navegação recolhível para mobile

## Testes
Como este é um site estático sem processo de build:
- Testar em múltiplos navegadores (Chrome, Firefox, Safari, Edge)
- Verificar design responsivo em diferentes tamanhos de tela
- Testar validação e fluxo de envio do formulário
- Verificar rolagem suave e animações
- Verificar funcionalidade do menu mobile

## Compatibilidade de Navegadores
- Navegadores modernos com suporte a recursos ES6+
- Suporte a CSS Grid e Flexbox necessário
- Nenhum polyfill ou ferramenta de build incluída