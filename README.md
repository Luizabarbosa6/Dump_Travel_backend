# 📸 Dump Travel

**Dump Travel** é um aplicativo mobile desenvolvido com **React Native (Expo)** e **Node.js** com banco de dados **MongoDB**, ideal para guardar fotos de viagens com localização geográfica.

---

## ✨ Funcionalidades

- 📍 Captura da **localização** atual do usuário.
- 📷 Tirar **fotos** diretamente pelo app.
- 🗺️ Visualizar os registros em **mapa**.
- 🗃️ Armazenamento de dados no **MongoDB**.
- 🧭 Interface moderna e fluida usando React Native Paper.

---

## 🛠️ Tecnologias Utilizadas

### Frontend (React Native com Expo)
- `expo`, `react-native`, `react-native-maps`, `expo-location`, `expo-image-picker`
- Navegação com `@react-navigation`
- UI com `react-native-paper`

### Backend (Node.js)
- Servidor com Express (ou similar)
- Integração com banco de dados MongoDB

### Banco de Dados
- **MongoDB** (executando localmente)

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/dump_travel_FrontEnd.git
cd dump_travel
2. Inicie o banco de dados MongoDB
Certifique-se de que o MongoDB esteja em execução localmente na sua máquina.

bash
Copiar
Editar
# Exemplo em sistemas que usam MongoDB via CLI
mongod
3. Instale e inicie o Backend
git clone https://github.com/seu-usuario/dump_travel_backend.git
Copiar
Editar
cd backend
npm install
node index.js
O backend normalmente roda em http://localhost:3000

4. Instale e inicie o Frontend (App)
Em outro terminal:

bash
Copiar
Editar
cd frontend
npm install
npx expo start
Isso abrirá o Expo Go para emuladores ou QR code para testar no celular.

📦 Estrutura do Projeto
arduino
Copiar
Editar
dump_travel/
├── backend/
│   ├── index.js
│   └── ... (rotas, controladores, config MongoDB)
├── frontend/
│   ├── App.js
│   ├── screens/
│   ├── components/
│   └── ...
├── README.md
└── ...
📱 Pré-requisitos
Node.js (v18+ recomendado)

Expo CLI (npm install -g expo-cli)

MongoDB rodando localmente

Emulador Android/iOS ou app Expo Go no celular
