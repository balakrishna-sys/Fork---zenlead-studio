// Global event system for communication between components
type EventCallback = (...args: any[]) => void;

class EventEmitter {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in event callback for ${event}:`, error);
        }
      });
    }
  }
}

// Global event emitter instance
export const eventEmitter = new EventEmitter();

// Event constants
export const EVENTS = {
  PAYMENT_SUCCESS: 'payment:success',
  USER_CREDITS_UPDATED: 'user:credits_updated',
  USER_PROFILE_UPDATED: 'user:profile_updated',
} as const;

// Helper functions for common events
export const emitPaymentSuccess = (data?: any) => {
  eventEmitter.emit(EVENTS.PAYMENT_SUCCESS, data);
};

export const emitUserCreditsUpdated = (credits: number) => {
  eventEmitter.emit(EVENTS.USER_CREDITS_UPDATED, credits);
};

export const emitUserProfileUpdated = (user: any) => {
  eventEmitter.emit(EVENTS.USER_PROFILE_UPDATED, user);
};
