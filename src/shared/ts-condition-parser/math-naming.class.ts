/**
 * defines the names of the types inside the json structure
 */

export enum NumberConditionType {
  VAR = "number-var",
  CONST = "number-const",
  ADD = "number-add",
  MULT = "number-mult",
  DIV = "number-div",
  POW = "number-pow",
  SUB = "number-subtraction",
  STRING_LENGTH = "string-length"
}

export enum BooleanConditionType {
  VAR = "boolean-var",
  CONST = "boolean-const",
  NOT = "boolean-not",
  AND = "boolean-and",
  OR = "boolean-or",
  DEFINED = 'DEFINED',
  // Comparators
  GT = "GT",
  GE = "GE",
  LT = "LT",
  LE = "LE",
  EQ = "EQ",
  NE = "NE"
}

export enum StringConditionType {
  VAR = "string-var",
  CONST = "string-const"
}
