import { writable } from 'svelte/store';

export interface FaceProgress {
  assetId: string;
  processed: number;
  total: number;
}

function createStore() {
  const { subscribe, set } = writable<FaceProgress | null>(null);

  return {
    subscribe,
    setProgress(assetId: string, processed: number, total: number) {
      if (processed >= total) {
        set(null);
      } else {
        set({ assetId, processed, total });
      }
    },
    reset() {
      set(null);
    },
  };
}

export const videoFaceProgress = createStore();
