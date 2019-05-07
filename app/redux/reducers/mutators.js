export const startFetching = s => s.set('isFetching', true);
export const stopFetching = s => s.set('isFetching', false);
export const startWatching = s => s.set('isWatching', true);
export const stopWatching = s => s.set('isWatching', false);

export const setTimestamp = p => s => s.set('timestamp', p.get('timestamp'));
export const setError = p => s => s.set('error', p.get('error'));
export const setCoords = p => s => s.set('coords', p.get('coords'));
