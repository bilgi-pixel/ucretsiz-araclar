// Bilgisayar hamlesini ana iş parçacığını dondurmadan hesaplayan Web Worker.
import { chooseMove } from './engine.js';

self.onmessage = (e) => {
  const { id, state, depth } = e.data;
  self.postMessage({ id, pit: chooseMove(state, depth) });
};
