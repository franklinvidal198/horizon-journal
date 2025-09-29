# TradeJournal 2090 🚀

A futuristic trading journal web application with cutting-edge UI and comprehensive trade management features.

## 🌟 Features

- **Futuristic UI**: Dark theme with neon accents, glassmorphism effects, and smooth animations
- **Trade Management**: Create, update, delete, and track trading positions
- **Advanced Analytics**: Win rate, R:R ratios, equity curves, and performance metrics
- **Real-time Dashboard**: Live stats and recent trading activity
- **Responsive Design**: Perfect on desktop and mobile devices
- **JWT Authentication**: Secure login and user management

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Query (TanStack Query)
- **Charts**: Recharts
- **API Client**: Axios
- **Icons**: Lucide React

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Update VITE_API_URL to point to your FastAPI backend
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔧 Backend Integration

This frontend is designed to work with a FastAPI backend. Make sure your backend has the following endpoints:

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get user profile

### Trades
- `GET /api/v1/trades/` - List trades (with filtering)
- `POST /api/v1/trades/` - Create new trade
- `GET /api/v1/trades/{id}` - Get specific trade
- `PUT /api/v1/trades/{id}` - Update trade
- `DELETE /api/v1/trades/{id}` - Delete trade
- `PATCH /api/v1/trades/{id}/close` - Close trade

### Statistics
- `GET /api/v1/stats/summary` - Get trading statistics
- `GET /api/v1/stats/equity_curve` - Get account equity data

## 📱 Pages

- **Login/Signup**: Authentication with beautiful forms
- **Dashboard**: Overview of trading performance and recent activity
- **Trades**: Complete trade management with filtering and search
- **Statistics**: Advanced analytics with interactive charts
- **Profile**: User settings and account management

## 🎨 Design System

The app uses a comprehensive design system with:
- **Colors**: Electric cyan, purple, and blue with neon effects
- **Typography**: Inter font with gradient text effects
- **Components**: Glass morphism cards and animated buttons
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design approach

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── Layout.tsx    # Main app layout
├── pages/
│   ├── auth/         # Authentication pages
│   ├── Dashboard.tsx
│   ├── Trades.tsx
│   ├── Stats.tsx
│   └── Profile.tsx
├── lib/
│   ├── api.ts        # API client and types
│   └── utils.ts      # Utility functions
├── hooks/
│   └── useAuth.ts    # Authentication hook
└── styles/
    └── index.css     # Global styles and design tokens
```

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy** using your preferred platform:
   - Vercel: `npx vercel --prod`
   - Netlify: Drag `dist` folder to Netlify
   - Custom server: Serve the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Features Coming Soon

- [ ] Trade screenshots and image uploads
- [ ] Advanced filtering and search
- [ ] Export data to CSV/PDF
- [ ] Mobile push notifications
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Trading journal notes with rich text

---

Built with ❤️ for the future of trading • 2090 Edition