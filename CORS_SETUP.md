# CORS Setup Guide

## Problem
Your application was experiencing CORS (Cross-Origin Resource Sharing) issues when trying to make API calls from the frontend to external APIs.

## Solution Implemented

### 1. Next.js API Routes as Proxy
Created API routes in `src/app/api/` that act as a proxy between your frontend and the external API:

- `/api/rooms` - Proxies room data requests
- `/api/slots` - Proxies slot availability requests  
- `/api/slot` - Proxies reservation creation requests

### 2. CORS Headers Configuration
- Added proper CORS headers to all API responses
- Created a utility function (`src/utils/corsHeaders.ts`) for consistent CORS handling
- Updated `next.config.ts` with global CORS headers

### 3. Updated API URLs
Changed `src/apiUrls.ts` to use local Next.js API routes instead of direct external API calls:

```typescript
// Before (causing CORS issues)
export const API_ROOMS_URL = `${API_BASE_URL}/rooms`;

// After (CORS-safe)
export const API_ROOMS_URL = `/api/rooms`;
```

## Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Replace with your actual API base URL
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/webhook
```

## How It Works

1. Frontend makes requests to `/api/rooms`, `/api/slots`, etc.
2. Next.js API routes receive these requests
3. API routes forward requests to your external API
4. External API responses are returned with proper CORS headers
5. Frontend receives the data without CORS issues

## Benefits

- ✅ No more CORS errors
- ✅ Centralized API management
- ✅ Better error handling
- ✅ Ability to add authentication/authorization later
- ✅ Request/response logging capabilities

## Testing

To test that CORS is working:

1. Start your development server: `npm run dev`
2. Open browser developer tools
3. Check the Network tab for API calls
4. Verify no CORS errors in the Console

## Security Notes

- The current setup allows all origins (`*`) for development
- For production, consider restricting origins to your specific domain
- Add authentication headers if your API requires them 