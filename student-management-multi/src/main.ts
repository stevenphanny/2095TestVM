import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    // Add any additional providers here if needed in the future
    // For this tutorial, StudentService is provided at root level
  ]
}).catch(err => console.error(err));