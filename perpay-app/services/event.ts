const EVENTS: { [event: string]: (...args: any[]) => void } = {}

export const on = (event: string, callback: (...data: any[]) => void) => {
  EVENTS[event] = callback
}

export const emit = (event: string, ...data: any[]) => {
  if (EVENTS[event]) {
    EVENTS[event](...data)
  }
}

export const off = (event: string) => {
  delete EVENTS[event]
}
