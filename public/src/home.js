function getTotalBooksCount(books) {
  let bookCount = 0;
  for (let i = 0; i < books.length; i++) {
    bookCount += 1;
  }
  return bookCount;
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((total, account) => total + 1, 0);
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    const borrows = book.borrows;
    if (borrows[0].returned === false) {
      return acc +1
    } else {
      return acc;
    }
  }, 0);
}

function getMostCommonGenres(books) {
  let genres = {};
  let sortedGenres = [];
  //loop through books
  books.forEach(book => {
    let genre = book.genre;
    genres[genre]= (genres[genre] || 0)
   +1;
  });
  //sort genres in order of most to least common
  let keys = Object.keys(genres);
  keys.sort((a, b) => genres[b] - genres[a]);
  //loop through sorted genres and push to sortedGenres array
  keys.forEach(key => {
    sortedGenres.push({name: key, count:genres[key]});
  });
  
  //return array of sorted genres, only containing max of 5
  return sortedGenres.slice(0,5);
  }

function getMostPopularBooks(books) {
  const counts = books.reduce((acc, book) => {
    const title = book.title;
    const borrowed = book.borrows.length;
    if (acc[title] === undefined) {
      acc[title] = borrowed;
    } else {
      acc[title] += borrowed;
    }
    return acc;
  }, {});
  const sortedBooks = Object.entries(counts).sort((a, b) => 
        b[1] - a[1]);
  const mostPopularBooks = sortedBooks.slice(0,5).map(book => {
    return {
      name:book[0],
      count:book[1]
    };
  });
  return mostPopularBooks;
}

function getMostPopularAuthors (books, authors) {
  const authorCounts = {};
  books.forEach(book => {
    if (authorCounts[book.authorId]) {
      authorCounts[book.authorId] += book.borrows.length;
    } else {
      authorCounts[book.authorId] = book.borrows.length
    }
  });
  const popularAuthors = [];
  authors.forEach(author => {
    const authorId = author.id;
    if (authorCounts[authorId]) {
      const authorObject = {
        name: `${author.name.first} ${author.name.last}`,
        count: authorCounts[authorId]
      };
      popularAuthors.push(authorObject);
    }
  });
  popularAuthors.sort((a,b) => b.count - a.count);
  return popularAuthors.slice(0,5);
}
  
  
  
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
