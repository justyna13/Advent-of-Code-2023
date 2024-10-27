import fs from "fs";

function partOne(file) {
  const lines =
    fs.readFileSync(file, 'utf-8').trim().split('\n');

  const values = lines.map(line => {
    let first = line.split('').find((v) => !Number.isNaN(Number(v)));
    let last = line.split('').findLast((v) => !Number.isNaN(Number(v)));

    return Number(`${first}${last}`);
  });

  return values.reduce((sum, current) => sum + current);
}

const resultOne = partOne('./input.txt');
console.log(resultOne) // 53651

const firstNumberWordsRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|')
);

const lastNumberWordsRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|').split('').reverse().join('')
);

const wordMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
}

function partTwo(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const values = lines.map(line => {
    const firstWordMatch = line.match(firstNumberWordsRegExp);
    const firstWordIndex = firstWordMatch?.index || -1;

    const lastWordMatch = line.split('').reverse().join('').match(lastNumberWordsRegExp);
    const lastWordIndex = lastWordMatch ? line.length - lastWordMatch.index - 1 : null;

    const firstNumberIndex = line.split('').findIndex((v) => !Number.isNaN(Number(v)));
    const lastNumberIndex = line.split('').findLastIndex((v) => !Number.isNaN(Number(v)));

    const firstNumber =
      firstNumberIndex === -1 ? wordMap[firstWordMatch[0]] :
        firstWordMatch ? (
          firstNumberIndex < firstWordIndex
          ? line[firstNumberIndex]
          :
          wordMap[firstWordMatch[0]]
    ) : line[firstNumberIndex];

    const lastNumber = lastNumberIndex === -1
      ? wordMap[lastWordMatch[0].split('').reverse().join('')]
      : (
      lastWordMatch ? (
        lastNumberIndex > lastWordIndex
          ? line[lastNumberIndex]
          :
          wordMap[lastWordMatch[0].split('').reverse().join('')]
      ) : line[lastNumberIndex]
    )

    return Number(`${firstNumber}${lastNumber}`);
  });

  return values.reduce((sum, current) => sum + current);
}

const resultTwo = partTwo('./input.txt');

console.log(resultTwo) // 53894

