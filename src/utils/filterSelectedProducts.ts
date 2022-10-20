import { RefactoredProduct } from '@/store/reducers/user';

export default (products: RefactoredProduct[]) => {
  let filteredProducts: RefactoredProduct[] = [];

  products!.forEach((product) => {
    const filteredItems = product.items?.filter((item) => item.isChosen);

    if (filteredItems.length) filteredProducts = [...filteredProducts, {
      ...product,
      items: filteredItems
    }]
  });

  return filteredProducts;
};
