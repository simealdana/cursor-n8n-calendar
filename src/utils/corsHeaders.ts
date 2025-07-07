/**
 * Utility function to provide consistent CORS headers
 * Use this in all API routes to ensure proper CORS handling
 */

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * Helper function to create a CORS-enabled response
 */
export function createCorsResponse(data: unknown, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

/**
 * Helper function to create an OPTIONS response for CORS preflight requests
 */
export function createOptionsResponse() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
