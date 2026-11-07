// Replacement for express-async-handler: errors thrown by the handler are
// caught by the API route (src/app/api/v1/[[...path]]/route.ts).
const asyncHandler = <T extends (...args: any[]) => any>(fn: T) => fn;

export default asyncHandler;
