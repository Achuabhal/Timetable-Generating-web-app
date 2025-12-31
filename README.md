# 🗓️ Timetable Generating Web App

A modern, intuitive web application for generating and managing academic timetables with an elegant user interface built using React, TypeScript, and shadcn/ui components.

## ✨ Features

- **Automated Timetable Generation**: Create optimized class schedules automatically
- **Interactive UI**: Modern, responsive design with shadcn/ui components
- **Export Functionality**: Download timetables as DOCX documents using file-saver
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Dark Mode Support**: Built-in theme switching with next-themes
- **Real-time Updates**: Powered by TanStack React Query for efficient data management
- **Responsive Design**: Fully responsive interface built with Tailwind CSS

## 🚀 Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Management**: React Hook Form + Zod validation
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0
- **Document Export**: docx 9.5.1

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or bun package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Achuabhal/Timetable-Generating-web-app.git
cd Timetable-Generating-web-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
Timetable-Generating-web-app/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── lib/                # Utility functions
│   └── App.tsx             # Main application component
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🎨 UI Components

This project uses shadcn/ui components built on top of Radix UI primitives, including:

- Dialog, AlertDialog, Dropdown Menu
- Form inputs, Select, Checkbox, Radio Group
- Toast notifications (Sonner)
- Tabs, Accordion, Collapsible
- Navigation Menu, Context Menu
- And many more...

## 📝 Usage

1. **Input Details**: Enter class information, subjects, teachers, and time slots
2. **Generate**: Click generate to create an optimized timetable
3. **Review**: View and modify the generated schedule
4. **Export**: Download the timetable as a DOCX document for printing or sharing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Achuabhal**
- GitHub: [@Achuabhal](https://github.com/Achuabhal)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for blazing fast build tooling

---

⭐ If you find this project helpful, please give it a star!
