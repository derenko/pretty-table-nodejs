import { Cell } from '../types';

export const createSymbol = (count: number = 1, symbol: string = ' ') => {
  return Array<string>(count).fill(symbol).join('')
}

export const addXPaddingToString = (string: Cell) => {
  return createSymbol() + string + createSymbol();
}

export const alignStrings = (strings: Array<string>, width: number) => {
  return strings.map(string => {
    const spacesToAddCount = string.length > width ? 0 : width - string.length;

    return string + createSymbol(spacesToAddCount);
  })
}

export const composeToLineWrappedString = (...rest: Array<string>) => {
  return rest.map(string => string + '\n').join('');
}

export const composeToString = (...rest: Array<string>) => {
  return rest.map(string => string).join('');
}

export const addSeparators = (strings: Array<string>, separator: string) => {
  return strings.map((string, i) => {
    if(i === 0) return separator + string + separator;

    return string + separator;
  })
}

export const trimStringsLength = (strings: Array<Cell>, maxLength: number) => {
  return strings.map(string => {
    string = String(string);
    if(string.length > maxLength) return string.slice(0, maxLength) + '...';
    return string;
  })
}

export const arrayOfElementsToString = (elements: Array<Cell>) => {
  return elements.map(element => String(element).toString())
}