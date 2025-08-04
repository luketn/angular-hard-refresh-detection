import { TestBed } from '@angular/core/testing';
import { HardRefreshService } from './hard-refresh.service';

describe('HardRefreshService', () => {
  let originalGetEntriesByType: typeof performance.getEntriesByType;
  let originalNavigation: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    originalGetEntriesByType = performance.getEntriesByType.bind(performance);
    originalNavigation = (performance as any).navigation;
  });

  afterEach(() => {
    performance.getEntriesByType = originalGetEntriesByType;
    (performance as any).navigation = originalNavigation;
  });

  it('detects hard refresh via PerformanceNavigationTiming', () => {
    performance.getEntriesByType = () => [{ type: 'reload' } as PerformanceNavigationTiming];
    const service = TestBed.inject(HardRefreshService);
    expect(service.isHardRefresh()).toBeTrue();
  });

  it('detects normal navigation via PerformanceNavigationTiming', () => {
    performance.getEntriesByType = () => [{ type: 'navigate' } as PerformanceNavigationTiming];
    const service = TestBed.inject(HardRefreshService);
    expect(service.isHardRefresh()).toBeFalse();
  });

  it('falls back to legacy performance.navigation API', () => {
    performance.getEntriesByType = () => [] as PerformanceNavigationTiming[];
    (performance as any).navigation = { type: 1 };
    const service = TestBed.inject(HardRefreshService);
    expect(service.isHardRefresh()).toBeTrue();
  });
});

