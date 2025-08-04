import { Injectable } from '@angular/core';

/**
 * Service to detect whether the current page was loaded through a hard refresh
 * (e.g. user pressed F5, Ctrl‑R, etc.) or through normal navigation such as
 * following a link or routing within the SPA.
 */
@Injectable({
  providedIn: 'root',
})
export class HardRefreshService {
  private readonly hardRefresh: boolean;

  constructor() {
    this.hardRefresh = this.detectHardRefresh();
  }

  /**
   * Determines if the current load was triggered by a browser reload.
   */
  private detectHardRefresh(): boolean {
    if (typeof performance !== 'undefined') {
      const [navigationEntry] =
        (performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]);
      if (navigationEntry) {
        return navigationEntry.type === 'reload';
      }

      // Fallback for browsers implementing the older PerformanceNavigation API
      const legacyNav = (performance as any).navigation as
        | { type: number }
        | undefined;
      if (legacyNav) {
        // 1 corresponds to TYPE_RELOAD
        return legacyNav.type === 1;
      }
    }
    return false;
  }

  /**
   * Indicates whether the page was loaded because the user reloaded the browser.
   */
  public isHardRefresh(): boolean {
    return this.hardRefresh;
  }
}

