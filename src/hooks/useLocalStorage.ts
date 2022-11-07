import { ITask } from '../models';
const LOCAL_KEY = 'tasks';

export function getLocal() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]');
}

export function useLocalStorage() {
  function setLocal(items: ITask[]) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }


  return [getLocal(), setLocal];
}
