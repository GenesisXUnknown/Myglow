# GlowMatch 💄

**Your Personal Makeup Color Guide**

GlowMatch is an AI-powered makeup color matching app based on seasonal color analysis. Upload a selfie, discover your unique color season, and get personalized makeup recommendations tailored just for you.

![GlowMatch](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

### 🎨 Seasonal Color Analysis
- AI-powered analysis determines your color season from 12 distinct palettes
- Light Spring, Warm Spring, Clear Spring
- Light Summer, Cool Summer, Soft Summer
- Soft Autumn, Warm Autumn, Deep Autumn
- Deep Winter, Cool Winter, Clear Winter

### 💄 Personalized Makeup Recommendations
- Custom color palettes for lips, eyes, and cheeks
- Detailed makeup suggestions with color names and finishes
- Celebrity inspiration for each season
- Best colors and colors to avoid

### 👁️ Virtual Try-On
- Try on different makeup colors instantly
- See how colors look before you buy
- Save your favorite looks
- Freemium model: 5 free try-ons, then upgrade to Premium

### 📚 Curated Makeup Looks
- Professional makeup looks tailored to your season
- Complete color combinations for everyday and evening
- Mix and match from your personal palette

### 👤 Personal Profile
- Track your saved looks
- Monitor your try-on usage
- Quick access to your color analysis results

### ✨ Premium Features
- Unlimited virtual try-ons
- Exclusive makeup looks
- Advanced color analysis
- Product recommendations
- Priority support

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion 11
- **State Management:** Zustand 4
- **Routing:** React Router 6
- **Deployment:** Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/GenesisXUnknown/Myglow.git
cd Myglow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Import your repository at [vercel.com/new](https://vercel.com/new)
3. Vercel will automatically detect Vite and configure the build
4. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables are required for the basic app. For production features like payment processing, you'll need to add:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_API_URL=your_api_url
```

## 🎨 Color Seasons Explained

### Spring (Warm Undertone)
- **Light Spring:** Delicate, warm, clear colors
- **Warm Spring:** Rich, golden, vibrant colors
- **Clear Spring:** Bright, high-contrast warm colors

### Summer (Cool Undertone)
- **Light Summer:** Soft, cool, gentle colors
- **Cool Summer:** Cool, elegant, medium-contrast colors
- **Soft Summer:** Muted, cool, low-contrast colors

### Autumn (Warm Undertone)
- **Soft Autumn:** Muted, warm, earthy colors
- **Warm Autumn:** Rich, golden, warm colors
- **Deep Autumn:** Deep, warm, high-contrast colors

### Winter (Cool Undertone)
- **Deep Winter:** Deep, cool, dramatic colors
- **Cool Winter:** Cool, bright, icy colors
- **Clear Winter:** Bright, high-contrast cool colors

## 📱 Features Breakdown

### Free Features
✅ Seasonal color analysis
✅ Personalized makeup recommendations
✅ Color palette for your season
✅ 5 virtual try-ons
✅ Curated makeup looks
✅ Save favorite looks

### Premium Features
✨ Unlimited virtual try-ons
✨ Exclusive professional looks
✨ Advanced color insights
✨ Product recommendations
✨ Multiple photo storage
✨ Share looks with friends
✨ Priority support
✨ Seasonal updates

## 🔧 Project Structure

```
Myglow/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── UI.jsx         # UI component library
│   │   └── BottomNav.jsx  # Navigation component
│   ├── screens/           # Page components
│   │   ├── HomeScreen.jsx
│   │   ├── AnalyzeScreen.jsx
│   │   ├── ResultsScreen.jsx
│   │   ├── TryOnScreen.jsx
│   │   ├── LooksScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── PremiumScreen.jsx
│   ├── utils/             # Utility functions
│   │   └── colorAnalysis.js
│   ├── store.js           # Zustand state management
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── vercel.json            # Vercel deployment config
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Seasonal color analysis based on professional color theory
- Celebrity examples for inspiration
- UI design inspired by modern beauty apps

## 📞 Support

For support, email support@glowmatch.app or join our community Discord.

---

Made with 💖 by the GlowMatch team
