export const getPages = (pagesNumber: number) => {
  const pages = [];

  for (let i = 0; i < pagesNumber; i++) {
    pages.push(i + 1);
  }

  return pages;
};
