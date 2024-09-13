import 'express-session';

declare module 'express-session' {
  interface SessionData {
    uploadedFile: string; // Add your custom property here
  }
}
