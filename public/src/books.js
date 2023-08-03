function findAuthorById(authors, id) {
  return authors.filter(author => author.id === id)[0];
}

function findBookById(books, id) {
  return books.filter(book => book.id === id)[0];
}

function partitionBooksByBorrowedStatus(books) {
   const checkedOutBooks = [];
  const returnedBooks = [];
  books.forEach(book => {
    const firstTransaction = book.borrows[0];
    if (firstTransaction.returned) {
      returnedBooks.push(book);
    } else {
      checkedOutBooks.push(book);
    }
  });
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  book.borrows.forEach(borrow => {
    //find the account with the matching id
    const account = accounts.find(account => account.id === borrow.id);
    //if a match was found, add the account and return infoto the borrowers array
    if (account) {
      borrowers.push({...account, returned: borrow.returned});
    }
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
