/**
 * defines the names of the types inside the json structure
 */

export enum NumberObjectKey {
  VAR = "number-var",
  CONST = "number-const",
  ADD = "number-add",
  MULT = "number-mult",
  DIV = "number-div",
  POW = "number-pow",
  STRING_LENGTH = "string-length"
}

export enum BooleanObjectKey {
  VAR = "boolean-var",
  CONST = "boolean-const",
  NOT = "boolean-not",
  AND = "boolean-and",
  OR = "boolean-or",
  // Comparators
  GT = "GT",
  GE = "GE",
  LT = "LT",
  LE = "LE",
  EQ = "EQ",
  NE = "NE"
}

export enum StringObjectKey {
  VAR = "string-var",
  CONST = "string-const"
}
