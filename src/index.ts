import { 
  createSymbol, 
  addXPaddingToString, 
  alignStrings, 
  composeToLineWrappedString,
  addSeparators,
  composeToString,
  trimStringsLength,
  arrayOfElementsToString
} from './utils';

import { 
  WORDS_SEPARATOR, 
  LINE_SYMBOL, WORDS_PADDING_X, 
  MAX_WORD_WIDTH 
} from './constants';

import { Cell } from './types';

/** 
  @description 
  create class with new and table will display in console

  @example
  new PrettyTable(headings, rows)

  headings = [
    'name',
    'age',
    'grade',
    'university'
  ],

  rows = [
    [
      'Jhon', '20', '5', 'Oil and Gasoline'
    ],
    [
      'Bill', '30', '4', 'Cambridge'
    ],
    [
      'Sam', '40', '3', 'Yelle'
    ]
  ]
*/ 


export default class PrettyTable {
  private largestStringLength = 0;

  constructor(private headings: Array<string>, private rows: Array<Array<Cell>>){
    this.normalizeRows();
    this.setTrimStringsLength();
    this.setLargestStringLength();

    const table = composeToString(
      this.createHeadings(),
      this.createRows(),
      this.createLine()
    )

    console.log(table);
  }

  private normalizeRows(){
    this.rows.map((row) => {
      if(this.headings.length > row.length){
        row.push(...createSymbol(this.headings.length - row.length))
      }
    })
    this.rows = this.rows.map(arrayOfElementsToString);    
  }

  private setTrimStringsLength(){
    this.headings = trimStringsLength(this.headings, MAX_WORD_WIDTH);
    this.rows = this.rows.map(row => trimStringsLength(row, MAX_WORD_WIDTH));
  }

  private setLargestStringLength(){
    const strings = [...this.headings, ...this.rows.flat(2)];
    const largestStringLength = Math.max(...strings.map(string => String(string).length));

    this.largestStringLength = largestStringLength + WORDS_PADDING_X * 2;
  }

  private createLine(){
    const headingWidth = this.largestStringLength + WORDS_PADDING_X;

    const lineWidth = headingWidth * this.headings.length + WORDS_PADDING_X;

    return createSymbol(lineWidth, LINE_SYMBOL)
  }

  private createHeadings(){
    const headingsWithPadding = this.headings.map(addXPaddingToString);
    const headingsAligned = alignStrings(headingsWithPadding, this.largestStringLength);
    const headingsSeparated = addSeparators(headingsAligned, WORDS_SEPARATOR);

    return composeToLineWrappedString(
      this.createLine(),
      headingsSeparated.join(''),
      this.createLine()
    );
  }

  private createRow(row: Array<Cell>){
    const rowWithPadding = row.map(addXPaddingToString);
    const rowAligned = alignStrings(rowWithPadding, this.largestStringLength);

    const rowSeparated = addSeparators(rowAligned, WORDS_SEPARATOR);

    return composeToLineWrappedString(
      rowSeparated.join('')
    )
  }

  private createRows(){
    const rows = this.rows.map(row => this.createRow(row));
    return rows.join('')
  }
}