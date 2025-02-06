import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private readonly DARK_MODE_KEY = 'color-theme';
  private readonly DARK_MODE_CLASS = 'dark';

  // Reactive state using Angular signals
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initializeDarkMode();
    this.setupSystemPreferenceListener();

    // Optional: Add effect to persist changes
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.DARK_MODE_KEY,
          this.isDarkMode() ? 'dark' : 'light');
      }
    });
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(mode => !mode);
    this.applyDarkModeClass();
  }

  private initializeDarkMode(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    const storedPreference = localStorage.getItem(this.DARK_MODE_KEY);
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialMode = storedPreference
      ? storedPreference === 'dark'
      : systemPreference;

    this.isDarkMode.set(initialMode);
    this.applyDarkModeClass();
  }

  private applyDarkModeClass(): void {
    if (typeof document === 'undefined') return;

    const htmlElement = document.documentElement;
    this.isDarkMode()
      ? htmlElement.classList.add(this.DARK_MODE_CLASS)
      : htmlElement.classList.remove(this.DARK_MODE_CLASS);
  }

  private setupSystemPreferenceListener(): void {
    if (typeof window === 'undefined') return;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(this.DARK_MODE_KEY)) {
        this.isDarkMode.set(e.matches);
        this.applyDarkModeClass();
      }
    });
  }
}
