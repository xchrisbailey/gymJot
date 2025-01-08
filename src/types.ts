export type ActionState = {
  error?: string;
  success?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // This allows for additional properties
};
