# Meta Daily Trader 📈

Meta Daily Trader é uma aplicação web desenvolvida com React e TypeScript para ajudar traders a gerenciar suas metas diárias de trading. A aplicação permite que os usuários definam metas de lucro progressivas e utilizem a técnica Pomodoro para manter o foco durante as operações.

![Meta Daily Trader Screenshot](/api/placeholder/800/400)

## 🚀 Funcionalidades

- **Cálculo Automático de Metas**:
  - Define valor inicial e porcentagem de lucro desejada
  - Gera automaticamente 5 metas progressivas
  - Cálculo preciso com valores atualizados

- **Timer Pomodoro Personalizado**:
  - Timer configurável para cada meta individual
  - Contagem regressiva em tempo real
  - Possibilidade de pausar e reiniciar
  - Tempo flexível definido pelo usuário

- **Acompanhamento de Progresso**:
  - Marcação de metas concluídas
  - Status visual do progresso
  - Feedback ao completar todas as metas
  - Sistema de pausa entre ciclos

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/meta-daily-trader.git
```

2. Entre no diretório do projeto:
```bash
cd meta-daily-trader
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## ⚙️ Estrutura do Projeto

```
meta-daily-trader/
├── src/
│   ├── components/
│   │   └── MetaDailyTrader.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuração

1. **Tailwind CSS**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. **TypeScript**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 📱 Como Usar

1. **Configuração Inicial**:
   - Digite o valor inicial de operação
   - Defina a porcentagem de lucro desejada
   - Clique em "Gerar Tabela"

2. **Gerenciamento de Metas**:
   - Cada meta mostra o valor inicial e o valor alvo
   - Use o botão "Marcar" para registrar metas concluídas
   - Configure o tempo do Pomodoro individualmente

3. **Uso do Pomodoro**:
   - Clique no ícone de configuração para ajustar o tempo
   - Inicie o timer para cada meta
   - O timer mostrará a contagem regressiva
   - Ao finalizar, marque a meta como concluída

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 👨‍💻 Autor

Seu Nome - [GitHub](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)

---

⌨️ com ❤️ por [seu-usuario](https://github.com/seu-usuario) 😊