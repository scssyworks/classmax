export type Primitives = string | boolean | number | null | undefined;
export type ClassType = Primitives | Record<string, Primitives> | ClassType[];
