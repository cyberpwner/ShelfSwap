export function validateISBN(isbn: string) {
  // Remove hyphens and spaces
  isbn = isbn.replace(/[-\s]/g, '');

  // Validate ISBN-10
  if (isbn.length === 10) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const char = isbn[i];
      if (i === 9 && char === 'X') {
        sum += 10; // 'X' represents 10
      } else if (!/\d/.test(char)) {
        return false; // Invalid character
      } else {
        sum += (10 - i) * parseInt(char, 10);
      }
    }
    return sum % 11 === 0;
  }

  // Validate ISBN-13
  if (isbn.length === 13) {
    if (!/^\d{13}$/.test(isbn)) return false; // Must be 13 digits
    let sum = 0;
    for (let i = 0; i < 13; i++) {
      const digit = parseInt(isbn[i], 10);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    return sum % 10 === 0;
  }

  // Invalid length
  return false;
}
