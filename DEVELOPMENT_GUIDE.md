# Development Guide - Step by Step Process

This guide outlines the complete development process for building the AI-generated calendar booking system. This project was created entirely using AI tools without any human-written code.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- n8n instance
- Google Calendar API credentials
- Cursor AI (for code generation)
- Postman (for API testing)

## Step 1: Create All Models and API Endpoints

### 1.1 Define Data Models

Create the following data models for the application:

#### Room Model
```typescript
interface Room {
  id: string;
  name: string;
  email: string;
}
```

#### Slot Model
```typescript
interface Slot {
  id: string;
  name: string;
  description: string;
  status: "available" | "occupied" | "unavailable";
  startDate: string;
  endDate: string;
}
```

#### Create Reservation Model
```typescript
interface CreateReservationParams {
  roomId: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
  attendees: string[];
}

interface CreateReservationResponse {
  message: string;
}
```

### 1.2 API Endpoints to Implement

1. **GET /rooms** - Retrieve all available rooms
2. **GET /slots** - Get available time slots for a specific date and room
3. **POST /slot** - Create a new reservation
4. **DELETE /slot** - Cancel a reservation

## Step 2: Create and Test n8n Workflow

### 2.1 Import the Provided Workflow

1. Open your n8n instance
2. Import the `calendar_api.json` file
3. Configure Google Calendar credentials
4. Update webhook URLs to match your setup

### 2.2 Test Each Endpoint with Postman

#### Test GET /rooms
```http
GET https://your-n8n-instance.com/webhook/rooms
```

**Expected Response:**
```json
{
  "rooms": [
    {
      "id": "calendar@example.com",
      "name": "example-room",
      "email": "calendar@example.com"
    }
  ]
}
```

#### Test GET /slots
```http
GET https://your-n8n-instance.com/webhook/slots?date=2025-01-01&roomId=calendar@example.com
```

**Expected Response:**
```json
{
  "slots": [
    {
      "id": "available-slot-9",
      "name": "09:00 - 10:00",
      "description": "Available for booking",
      "status": "available",
      "startDate": "2025-01-01T09:00:00-04:00",
      "endDate": "2025-01-01T10:00:00-04:00"
    }
  ]
}
```

#### Test POST /slot
```http
POST https://your-n8n-instance.com/webhook/slot
Content-Type: application/json

{
  "roomId": "calendar@example.com",
  "startDate": "2025-01-01T09:00:00-04:00",
  "endDate": "2025-01-01T10:00:00-04:00",
  "name": "Team Meeting",
  "description": "Weekly team sync",
  "attendees": ["user@example.com"]
}
```

#### Test DELETE /slot
```http
DELETE https://your-n8n-instance.com/webhook/slot?slotId=event-id-here
```

### 2.3 Edge Cases to Test

1. **Invalid date format**
2. **Room not found**
3. **Slot already booked**
4. **Missing required fields**
5. **Invalid time ranges**
6. **Network timeouts**
7. **Google Calendar API errors**

## Step 3: Generate UI Code with Claude

### 3.1 Use This Prompt in Claude

Copy and paste this exact prompt into Claude:

```
UI Appearance
* Main Screen
* A light, almost white background with a soft touch of color (e.g., pastel blue) in the header.
* In the center, a white box with a light shadow contains the booking form.
* Booking Form
* Calendar: Occupies the top half of the box; clicking it opens a large, visual day picker.
* Time Picker: Directly below, with clear time zones (e.g., "09:00–10:00", "10:00–11:00").
* Room Picker: A simple card-like list with icons (a meeting table, a classroom, a break room). When a card is selected, its background color changes slightly to indicate selection.
* User Email: A simple field with a "you@email.com" placeholder and a small envelope icon.
* "Book" button: It takes up the entire width of the box at the bottom, with a prominent color (green or deep blue) and capitalized text.
* Immediate feedback
* Upon sending, a soft pop-up message appears:
* If everything goes well: "✅ Done! Your room is reserved."
* If the time slot is busy: "⚠️ Sorry, that slot is no longer available. Please choose another."
Use cases (no technical jargon)
1. Small company in need of meeting rooms
* Marta, the project manager, opens the app, chooses "Room A" at 10 AM, enters her email address, and clicks "Book." In seconds, she receives the confirmation and sends the link to the team.
2. Coworking for digital nomads
* Juan visits a coworking space, selects "Brainstorming Room" from his phone, and has everything set up without having to call reception.
3. University and Students
* A study group reserves the "Study Room" on Saturday mornings. Each student receives an email with the room number and time, avoiding confusion.
4. Mentoring or Coaching Sessions
* Laura teaches language classes and allows her students to reserve "Room 1" in 45-minute blocks; this way, she organizes her weekly schedule without overlaps.
5. Internal Company Events
* Innovation Day: Employees reserve "Room C" to present projects to the rest of the company. With the app, they quickly see what time slots are available and plan their demos.
With this description, you show not only what the app looks like, but also why it is useful in real-life contexts, without going into technical explanations.

CAN CREATE THIS UI
```

### 3.2 Expected Claude Response

Claude should provide:
- Complete React/Next.js component code
- CSS styling for the UI
- Form handling logic
- State management
- Responsive design

## Step 4: Create Next.js Project Locally

### 4.1 Initialize Project

```bash
# Create new Next.js project
npx create-next-app@latest calendar-booking-app --typescript --tailwind --eslint

# Navigate to project directory
cd calendar-booking-app

# Install additional dependencies
npm install date-fns lucide-react
```

### 4.2 Project Structure

```
calendar-booking-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── BookingForm.tsx
│   │   ├── Calendar.tsx
│   │   ├── TimePicker.tsx
│   │   ├── RoomPicker.tsx
│   │   └── Toast.tsx
│   ├── hooks/
│   │   ├── useRooms.ts
│   │   ├── useSlots.ts
│   │   └── useBooking.ts
│   ├── utils/
│   │   ├── api.ts
│   │   └── dateHelpers.ts
│   └── types/
│       └── index.ts
├── public/
└── package.json
```

## Step 5: Use Cursor AI for Code Generation

### 5.1 Open Project in Cursor

1. Open Cursor AI
2. Open the project folder
3. Use the Claude-generated code as a reference

### 5.2 Generate Components with Cursor

Ask Cursor to create:

1. **BookingForm Component**
   - Main form container
   - Form validation
   - Submit handling

2. **Calendar Component**
   - Date picker functionality
   - Visual calendar interface
   - Date selection logic

3. **TimePicker Component**
   - Time slot selection
   - Available/busy status
   - Time zone handling

4. **RoomPicker Component**
   - Room selection cards
   - Visual indicators
   - Selection state

5. **Toast Component**
   - Success/error messages
   - Auto-dismiss functionality
   - Styling

## Step 6: Integrate APIs One by One

### 6.1 Create API Configuration

```typescript
// src/fetchApi.ts
export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// src/apiUrls.ts
export const API_ROOMS_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/rooms';
export const API_SLOTS_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/slots';
export const API_CREATE_RESERVATION_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/slot';
```

### 6.2 Create Custom Hooks

#### useRooms Hook
```typescript
// src/hooks/useRooms.ts
"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_ROOMS_URL } from "@/apiUrls";

export interface Room {
  id: string;
  name: string;
  email: string;
}

interface UseRoomsResult {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

export function useRooms(): UseRoomsResult {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchApi<{ rooms: Room[] }>(API_ROOMS_URL)
      .then((data) => {
        if (isMounted) {
          setRooms(data.rooms);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch rooms");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { rooms, loading, error };
}
```

#### useSlots Hook
```typescript
// src/hooks/useSlots.ts
"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_SLOTS_URL } from "@/apiUrls";

export interface Slot {
  id: string;
  name: string;
  description: string;
  status: "available" | "occupied" | "unavailable";
  startDate: string;
  endDate: string;
}

interface UseSlotsParams {
  date: string;
  roomId: string;
}

interface SlotsResponse {
  slots: Slot[];
}

interface UseSlotsResult {
  slots: SlotsResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useSlots({ date, roomId }: UseSlotsParams): UseSlotsResult {
  const [slots, setSlots] = useState<SlotsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = async () => {
    if (!date || !roomId) {
      setSlots(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_SLOTS_URL}?date=${date}&roomId=${encodeURIComponent(
        roomId
      )}`;
      const data = await fetchApi<SlotsResponse>(url);
      setSlots(data || null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch slots";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [date, roomId]);

  return { slots, loading, error, refresh: fetchSlots };
}
```

#### useCreateReservation Hook
```typescript
// src/hooks/useCreateReservation.ts
"use client";
import { useState } from "react";
import { fetchApi } from "@/fetchApi";
import { API_CREATE_RESERVATION_URL } from "@/apiUrls";

export interface CreateReservationParams {
  roomId: string;
  startDate: string;
  endDate: string;
  name: string;
  description: string;
  attendees: string[];
}

export interface CreateReservationResponse {
  message: string;
}

export interface CreateReservationResult {
  success: boolean;
  loading: boolean;
  error: string | null;
  data: CreateReservationResponse | null;
}

export function useCreateReservation() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CreateReservationResponse | null>(null);
  
  const createReservation = async (params: CreateReservationParams): Promise<CreateReservationResult> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetchApi<CreateReservationResponse>(
        API_CREATE_RESERVATION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: params.roomId,
            startDate: params.startDate,
            endDate: params.endDate,
            name: params.name,
            description: params.description,
            attendees: params.attendees,
          }),
        }
      );

      setData(response);
      return {
        success: true,
        loading: false,
        error: null,
        data: response,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create reservation";
      setError(errorMessage);
      return {
        success: false,
        loading: false,
        error: errorMessage,
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    createReservation,
    loading,
    error,
    data,
  };
}
```

### 6.3 Test Each Integration

1. **Test Rooms Integration**
   - Verify rooms load on page load
   - Check error handling for network issues
   - Test loading states

2. **Test Slots Integration**
   - Verify slots load when date/room selected
   - Test with different dates
   - Check busy/available status display

3. **Test Booking Integration**
   - Test successful booking
   - Test booking conflicts
   - Test validation errors
   - Test network errors

## Step 7: Final Testing and Deployment

### 7.1 End-to-End Testing

1. **User Flow Testing**
   - Complete booking process
   - Error scenarios
   - Mobile responsiveness

2. **API Integration Testing**
   - All endpoints working
   - Error handling
   - Loading states

3. **UI/UX Testing**
   - Visual design matches requirements
   - Accessibility
   - Cross-browser compatibility

### 7.2 Environment Setup

```bash
# Create environment file
cp .env.example .env.local

# Add your configuration
NEXT_PUBLIC_API_BASE_URL=https://your-n8n-instance.com/webhook
```

### 7.3 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Configure n8n webhook CORS settings
   - Check API base URL configuration

2. **Date Format Issues**
   - Ensure consistent date formatting
   - Handle timezone differences

3. **Google Calendar Integration**
   - Verify credentials are correct
   - Check calendar permissions

4. **Build Errors**
   - Check TypeScript types
   - Verify all dependencies installed

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google Calendar API](https://developers.google.com/calendar)
- [Cursor AI](https://cursor.sh/)
- [Claude AI](https://claude.ai/)

---

This guide demonstrates how to build a complete application using AI tools. The process shows the power of AI-assisted development while maintaining proper software engineering practices. 