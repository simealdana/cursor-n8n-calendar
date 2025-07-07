# Calendar Booking System - AI-Generated Educational Project

## EDUCATIONAL PROJECT DISCLAIMER

**This is a 100% educational project and is NOT intended to solve any real-world problems or be used in production environments.**

This entire application was built using **Artificial Intelligence (AI) without any human-written code**. It serves purely as a demonstration of AI capabilities in software development and should be treated as a learning exercise.

## AI Development Process

This project was created entirely using:

### 1. **Cursor AI** - Primary Development Tool
- All code generation and project structure
- Component development and styling
- API integration and business logic
- Error handling and validation
- Documentation and comments

### 2. **n8n Workflow Automation**
- Backend API endpoints for calendar management
- Google Calendar integration
- Webhook handling and data processing
- Business logic implementation

## Project Overview

A complete calendar booking system that demonstrates:

- **Frontend**: Next.js application with TypeScript
- **Backend**: n8n workflow automation platform
- **Integration**: Google Calendar API
- **Features**: Room booking, slot management, reservation system

## Architecture

### Frontend (Next.js)
- Modern React components with TypeScript
- Responsive design and user interface
- Real-time data fetching and state management
- Form validation and error handling

### Backend (n8n)
- RESTful API endpoints
- Google Calendar integration
- Data processing and business logic
- Webhook management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- n8n instance (for backend functionality)
- Google Calendar API credentials

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd calendar-n8n-cursor
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Add your API endpoints and configuration
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_n8n_webhook_url

# Google Calendar (if needed)
GOOGLE_CALENDAR_ID=your_calendar_id
```

### n8n Setup
1. Import the provided `calendar_api.json` workflow
2. Configure Google Calendar credentials
3. Update webhook URLs to match your setup
4. Activate the workflow

## Project Structure

```
calendar-n8n-cursor/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── apiUrls.ts          # API endpoint configuration
│   ├── config.ts           # Application configuration
│   └── fetchApi.ts         # API fetching utilities
├── public/                 # Static assets
├── calendar_api.json       # n8n workflow export
└── package.json           # Dependencies and scripts
```

## Features

- **Room Management**: View available rooms and their details
- **Slot Booking**: Reserve time slots for meetings
- **Calendar Integration**: Sync with Google Calendar
- **Real-time Updates**: Live data synchronization
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error management
- **Form Validation**: Input validation and user feedback

## Security Considerations

Since this is an educational project:
- All sensitive data has been removed from the n8n workflow
- Placeholder values are used for demonstration
- No real credentials or production data are included
- The application is not intended for production use

## Learning Objectives

This project demonstrates:

1. **AI-Assisted Development**: How AI can generate complete applications
2. **Modern Web Development**: Next.js, TypeScript, and React patterns
3. **API Integration**: Connecting frontend with backend services
4. **Workflow Automation**: Using n8n for backend logic
5. **Calendar Management**: Google Calendar API integration
6. **State Management**: React hooks and data flow
7. **Error Handling**: Comprehensive error management strategies
8. **Responsive Design**: Mobile-first development approach

## Learn AI Development

Interested in building AI agents and automations like this project? Check out these resources:

### AI Agent with N8N for Beginners Course
**[Complete Course](https://simeon.cover-io.com/course)** - From zero to building production-ready AI Agents. Master N8N and create real AI agents with hands-on projects. Perfect for beginners - no coding experience needed.

**Course includes:**
- 9 comprehensive modules
- N8N basics to advanced multi-agent systems
- RAG chatbots and production deployment
- Real AI agents and automations that work in production

### AI Crafter Mentorship (1:1)
**[Apply for Mentorship](https://simeon.cover-io.com/apply)** - Build your own AI Agent with guidance, not guesswork. This 4-week, 1:1 mentorship includes weekly meetings, supporting videos, templates, and automation flows to help you build your AI Agent step by step.

## Contributing

This is an educational project, but if you want to experiment:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes only. Feel free to use it for learning and experimentation.

## Important Notes

- **No Production Use**: This application is not suitable for production environments
- **Educational Purpose**: Created solely for learning and demonstration
- **AI-Generated**: All code was written by AI, not humans
- **No Real Data**: Contains only placeholder and example data
- **Learning Tool**: Use this to understand AI capabilities in software development

## Related Resources

- [Cursor AI Documentation](https://cursor.sh/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [n8n Documentation](https://docs.n8n.io/)
- [Google Calendar API](https://developers.google.com/calendar)
- **[AI Agent with N8N Course](https://simeon.cover-io.com/course)** - Learn to build AI agents from scratch
- **[AI Crafter Mentorship](https://simeon.cover-io.com/apply)** - 1:1 guidance for building AI agents

---

**Remember**: This is a demonstration of AI capabilities in software development. The goal is to learn and understand how AI can assist in creating complete applications, not to solve real-world problems.
