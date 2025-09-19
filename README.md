# 🚀 Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, featuring a sleek admin panel for content management and a beautiful responsive frontend.

## ✨ Features

### 🎨 Frontend
- **Modern Design**: Clean, responsive design with smooth animations
- **Smooth Scrolling**: GSAP-powered animations and scroll effects
- **Contact Form**: Functional contact form with email integration
- **Dynamic Content**: Real-time content loading from database
- **Mobile Responsive**: Optimized for all device sizes

### 🔧 Admin Panel
- **Secure Authentication**: JWT-based authentication system
- **Content Management**: Full CRUD operations for projects, skills, and contributions
- **Image Upload**: Cloudinary integration for image management
- **Dashboard**: Overview statistics and quick actions
- **Real-time Updates**: Instant content updates without page refresh

### 🛠 Technical Features
- **Type Safety**: Full TypeScript implementation
- **API Routes**: RESTful API endpoints with Next.js 15
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for image storage
- **Middleware**: Route protection and authentication
- **Email Service**: Nodemailer integration for contact form

## 🏗 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: GSAP with ScrollTrigger
- **Icons**: Lucide React
- **Type Checking**: TypeScript

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcryptjs
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Zod schema validation

### Development
- **Package Manager**: PNPM
- **Linting**: ESLint
- **Styling**: PostCSS with Tailwind CSS
- **Type Checking**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) or npm
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pubudu-bandara/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/portfolio
   # or use MongoDB Atlas
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

   # JWT Secret (generate a secure random string)
   JWT_SECRET_KEY=your_super_secure_jwt_secret_key_here

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Email Configuration (for contact form)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Admin Setup

1. **Create Admin User**
   
   Visit `/api/create-admin` or use the admin creation endpoint to set up your first admin user.

2. **Login to Admin Panel**
   
   Go to `/login` and use your admin credentials to access the admin dashboard at `/admin` or content editor at `/edit`.

### Email Configuration

For the contact form to work, configure your email settings:

1. **Gmail Setup** (recommended):
   - Enable 2-factor authentication
   - Generate an app password
   - Use the app password in `EMAIL_PASS`

2. **Other Email Providers**:
   - Update `EMAIL_HOST` and `EMAIL_PORT` accordingly
   - Adjust authentication method if needed

### Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your environment variables

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── projects/      # Project CRUD operations
│   │   ├── skills/        # Skills management
│   │   └── contact/       # Contact form handler
│   ├── admin/             # Admin dashboard
│   ├── edit/              # Content editor
│   ├── login/             # Login page
│   └── page.tsx           # Main portfolio page
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature components
├── lib/                   # Utility libraries
│   ├── mongodb.ts         # Database connection
│   ├── cloudinary.ts      # Image upload utilities
│   └── auth.ts            # Authentication helpers
├── models/                # Mongoose schemas
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
└── public/                # Static assets
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Route Protection**: Middleware-based route protection
- **Input Validation**: Server-side validation with Zod
- **Rate Limiting**: Basic rate limiting for contact form
- **Environment Variables**: Sensitive data stored securely

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/projects` - Fetch all projects
- `GET /api/skills` - Fetch all skills
- `POST /api/contact` - Send contact message

### Protected Endpoints (Admin only)
- `POST /api/projects` - Create new project
- `PUT /api/projects` - Update project
- `DELETE /api/projects` - Delete project
- `POST /api/skills` - Create new skill
- `PUT /api/skills` - Update skill
- `DELETE /api/skills` - Delete skill
- `POST /api/upload-project-image` - Upload project image
- `POST /api/upload-skill-image` - Upload skill image

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `POST /api/create-admin` - Create admin user (one-time)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Environment Variables**
   
   Add all environment variables in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

Make sure to:
- Set all environment variables
- Use a production MongoDB database
- Configure proper domain settings

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database scripts
node scripts/add-skills.js     # Add default skills
node scripts/add-skills-direct.js  # Direct skill addition
```

### Adding New Features

1. **Create API Route**: Add new endpoint in `app/api/`
2. **Add Database Model**: Create Mongoose schema in `models/`
3. **Update Frontend**: Add components and integrate API
4. **Add Authentication**: Use `authenticateRequest` for protected routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [GSAP](https://greensock.com/gsap/) - Animation library
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Image management

**Built with ❤️ using Next.js 15 and modern web technologies**
