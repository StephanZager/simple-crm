import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDRsln0GsvCsUyRTG0sfbmkvf1PRLoITfs",
  authDomain: "simple-crm-17b19.firebaseapp.com",
  projectId: "simple-crm-17b19",
  storageBucket: "simple-crm-17b19.firebasestorage.app",
  messagingSenderId: "238279799934",
  appId: "1:238279799934:web:6433901a20cd923e66142f"
};



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideNativeDateAdapter(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-17b19","appId":"1:238279799934:web:6433901a20cd923e66142f","storageBucket":"simple-crm-17b19.firebasestorage.app","apiKey":"AIzaSyDRsln0GsvCsUyRTG0sfbmkvf1PRLoITfs","authDomain":"simple-crm-17b19.firebaseapp.com","messagingSenderId":"238279799934"})), provideFirestore(() => getFirestore())]
};
