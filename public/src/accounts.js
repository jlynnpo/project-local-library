function findAccountById (accounts, id) {
  return accounts.filter(account => account.id === id)[0];
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(function(a,b) {
    let aLastName = a.name.last.toLowerCase();
    let bLastName = b.name.last.toLowerCase();
    if (aLastName < bLastName) {
      return -1;
    }
    if (aLastName > bLastName) {
      return 1;
    }
    return 0;
  });
}

function getTotalNumberOfBorrows(account, books) {
 let totalBorrows = 0;
  books.forEach((book) => {
    //implement helper function
    const foundAccount = findAccountById(book.borrows, account.id);
    if (foundAccount) {
      totalBorrows += 1;
    }
  });
  return totalBorrows;
}



function getBooksPossessedByAccount(account, books, authors) {
   const booksPossessed = books.filter((book) => {
       return book.borrows.some((borrowedBook) => 
           borrowedBook.id === account.id && !borrowedBook.returned);
      });
  return booksPossessed.map((book) => {
      return {...book, author:authors.find((author) => 
           author.id === book.authorId),
  };
  
         });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
