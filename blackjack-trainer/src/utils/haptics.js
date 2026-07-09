// Haptic feedback utilities for native feel on iOS

let Haptics = null;

// Dynamically import Capacitor Haptics if available
async function loadHaptics() {
  try {
    const module = await import('@capacitor/haptics');
    Haptics = module.Haptics;
  } catch {
    // Running in browser without Capacitor - use vibration API fallback
    Haptics = null;
  }
}

loadHaptics();

// Light tap - for button presses
export async function hapticLight() {
  try {
    if (Haptics) {
      await Haptics.impact({ style: 'light' });
    } else if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  } catch {
    // Haptics not available
  }
}

// Medium tap - for important actions like Deal
export async function hapticMedium() {
  try {
    if (Haptics) {
      await Haptics.impact({ style: 'medium' });
    } else if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  } catch {
    // Haptics not available
  }
}

// Heavy tap - for significant events like winning
export async function hapticHeavy() {
  try {
    if (Haptics) {
      await Haptics.impact({ style: 'heavy' });
    } else if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  } catch {
    // Haptics not available
  }
}

// Success notification - for correct answers
export async function hapticSuccess() {
  try {
    if (Haptics) {
      await Haptics.notification({ type: 'success' });
    } else if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  } catch {
    // Haptics not available
  }
}

// Warning notification - for incorrect answers
export async function hapticWarning() {
  try {
    if (Haptics) {
      await Haptics.notification({ type: 'warning' });
    } else if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
  } catch {
    // Haptics not available
  }
}

// Error notification - for bust or loss
export async function hapticError() {
  try {
    if (Haptics) {
      await Haptics.notification({ type: 'error' });
    } else if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50, 30, 50]);
    }
  } catch {
    // Haptics not available
  }
}

// Selection changed - for bet adjustments
export async function hapticSelection() {
  try {
    if (Haptics) {
      await Haptics.selectionChanged();
    } else if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  } catch {
    // Haptics not available
  }
}
