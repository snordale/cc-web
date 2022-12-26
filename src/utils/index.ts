import { permissions } from "../constants";

export const isAdmin = (perm: string) =>
  perm === permissions.admin || perm === permissions.god;

export const getArrayDiff = (arr1: any = [], arr2: any = []): any[] => {
  return arr1
    .filter((x: any) => !arr2.includes(x))
    .concat(arr2.filter((x: any) => !arr1.includes(x)));
};

export const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
