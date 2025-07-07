# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/webhook
```

## How it works

The application uses a centralized configuration system:

1. **`src/config.ts`**: Contains the base API URL configuration
2. **`src/apiUrls.ts`**: Builds specific endpoint URLs using the base URL
3. **Environment variables**: Allow easy configuration for different environments

## Benefits

- **Easy environment switching**: Change API URLs without code changes
- **Centralized configuration**: All URLs are built from a single base URL
- **Development flexibility**: Use different APIs for development/staging/production

## Example URLs

With the base URL `https://your-api-domain.com/webhook`:

- Rooms: `${BASE_URL}/rooms`
- Slots: `${BASE_URL}/slots`
- Create Reservation: `${BASE_URL}/slot` 