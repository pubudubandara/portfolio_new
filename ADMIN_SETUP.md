# Portfolio Admin Setup Guide

This portfolio includes a complete admin panel for managing skills and projects with MongoDB integration.

## 🔧 Setup Instructions

### 1. MongoDB Configuration

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and cluster

2. **Get Connection String**
   - In Atlas Dashboard, click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

3. **Update Environment Variables**
   ```bash
   # Update .env.local file
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### 2. Admin Panel Access

The admin panel is accessible at `/edit` route.

**Default Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

**To Change Credentials:**
Update the `.env.local` file:
```bash
ADMIN_USERNAME=your-custom-username
ADMIN_PASSWORD=your-secure-password
```

### 3. Features

#### Skills Management
- ✅ Add skill categories with custom icons
- ✅ Add/remove individual skills within categories
- ✅ Edit existing skill categories
- ✅ Delete skill categories
- ✅ Real-time updates on frontend

#### Projects Management
- ✅ Add new projects with details
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Add technology tags
- ✅ Set GitHub and demo links
- ✅ Mark projects as featured
- ✅ Real-time updates on frontend

#### Authentication
- ✅ Simple username/password authentication
- ✅ Session-based authentication with cookies
- ✅ Automatic logout functionality

### 4. API Endpoints

#### Skills API (`/api/skills`)
- `GET` - Fetch all skills
- `POST` - Create new skill category
- `PUT` - Update existing skill category
- `DELETE` - Delete skill category

#### Projects API (`/api/projects`)
- `GET` - Fetch all projects
- `POST` - Create new project
- `PUT` - Update existing project
- `DELETE` - Delete project

#### Authentication API (`/api/auth`)
- `POST` - Login with credentials
- `GET` - Check authentication status

### 5. How to Use

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Access Admin Panel**
   - Navigate to `http://localhost:3000/edit`
   - Login with credentials (admin/admin123)

3. **Manage Skills**
   - Click "Skills Management" tab
   - Add new skill categories or edit existing ones
   - Skills auto-update on the main portfolio page

4. **Manage Projects**
   - Click "Projects Management" tab
   - Add new projects or edit existing ones
   - Projects auto-update on the main portfolio page

### 6. Data Structure

#### Skill Schema
```typescript
{
  category: string,
  skills: string[],
  icon: string,
  timestamps: true
}
```

#### Project Schema
```typescript
{
  title: string,
  description: string,
  tech: string[],
  github: string,
  demo: string,
  featured: boolean,
  timestamps: true
}
```

### 7. Fallback Data

The application includes fallback data that displays when:
- MongoDB is not connected
- No data exists in the database
- API requests fail

This ensures the portfolio always shows content even without database setup.

### 8. Security Notes

⚠️ **Important for Production:**
- Change default admin credentials
- Use environment variables for sensitive data
- Implement proper JWT authentication
- Add rate limiting
- Use HTTPS in production
- Sanitize user inputs

### 9. Troubleshooting

**MongoDB Connection Issues:**
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure environment variables are set correctly

**Authentication Issues:**
- Clear browser cookies
- Check credentials in `.env.local`
- Restart the development server

**API Errors:**
- Check browser console for detailed errors
- Verify MongoDB connection
- Check API route logs

### 10. Next Steps

- Add image upload functionality for projects
- Implement more sophisticated authentication (JWT)
- Add user roles and permissions
- Add data export/import functionality
- Add analytics and usage tracking

## 🚀 Ready to Use!

Your portfolio now has a complete admin system. Access it at `/edit` and start managing your content!
