# Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience with an interactive terminal interface.

## 🌟 Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Interactive Terminal**: Command-line interface for a unique browsing experience
- **Contact Form**: Email integration for direct communication
- **Dark Theme**: Sleek, modern UI with dark mode design
- **Smooth Animations**: Enhanced UX with subtle animations using Framer Motion
- **Organized Project Display**: Structured presentation of projects and experience

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- CSS Animations

### Backend
- Node.js
- Express
- Nodemailer (for the contact form)

### Deployment
- Render for hosting the full-stack application
- Custom domain setup

## 📂 Project Structure

```
Portfolio/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # React components
│       └── ...
└── server/                 # Backend Express application
    ├── routes/             # API routes
    └── server.js           # Main server file
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```
   git clone https://github.com/anubhav-qt/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Run the development server**
   ```
   npm run dev
   ```
   This will start both the React frontend (port 3000) and Express backend (port 5000).

## 💻 Usage

### Terminal Commands
The interactive terminal supports the following commands:
- `help` - Show available commands
- `about` - Learn about me
- `projects` - List all code projects
- `research` - View research projects
- `contact` - View contact information
- `skills` - List technical skills
- `education` - View education details
- `project [name]` - Show specific project details
- `clear` - Clear the terminal
- `exit` - Return to portfolio view

## 🌐 Deployment

This project is set up for deployment on [Render](https://render.com).

### Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Create a new Web Service on Render
3. Connect to your Git repository
4. Configure the build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables (EMAIL_USER, EMAIL_PASS)
6. Deploy

### Custom Domain Setup
After deployment, you can connect your custom domain through the Render dashboard.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)

