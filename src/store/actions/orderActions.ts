import { createActionCreators } from 'immer-reducer';

import { OrderReducer, PlaceOrder, PlaceOrderProduct, RefactoredProduct } from '@/store/reducers/order';
import { AsyncAction } from '@/store/actions/common';

export const orderActions = createActionCreators(OrderReducer);

export type OrderActions = ReturnType<typeof orderActions.setProducts>
  | ReturnType<typeof orderActions.setProductsPrice>
  | ReturnType<typeof orderActions.setMatter>
  | ReturnType<typeof orderActions.setDescription>
  | ReturnType<typeof orderActions.setTotalPrice>
  | ReturnType<typeof orderActions.setTotalItemsAmount>
  | ReturnType<typeof orderActions.setOrderId>
  | ReturnType<typeof orderActions.setOrderProducts>
  | ReturnType<typeof orderActions.cleanCurrentOrder>
  | ReturnType<typeof orderActions.setIsProductsLoading>;

export const getOrderItemsAction = (region: string, service: string, searchPrice: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi }
) => {
  try {
    dispatch(orderActions.setProductsPrice(0));
    dispatch(orderActions.setTotalItemsAmount(0));

    const changedRegion = region.toLowerCase();
    const changedService = service.toLowerCase().replaceAll(' ', '-');
    const { products } = await mainApi.getOrderItems(changedRegion, changedService);
    let mappedItems: RefactoredProduct[] = [];
    let { totalPrice, totalItemsAmount, productsPrice } = getState().order;

    products.forEach((item) => {
      const newItems = item.items.map((el: string) => ({ name: el, isChosen: true }));
      productsPrice += Number(item.price) * newItems.length;
      totalItemsAmount += newItems.length;
      mappedItems = [...mappedItems, {
        ...item,
        items: newItems
      }];
    });

    dispatch(orderActions.setProductsPrice(productsPrice));
    dispatch(orderActions.setTotalPrice(totalPrice + Number(searchPrice)));
    dispatch(orderActions.setTotalItemsAmount(totalItemsAmount));
    dispatch(orderActions.setProducts(mappedItems));
  } catch (error: any) {
    console.log(error);
  }
};

export const initializeOrderAction = (
  region: string,
  service: string,
  searchPrice: string
): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const { user } = getState().user;
    const { matter, description } = getState().order;

    if (!matter || !description) return;

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: searchPrice,
      fulfilmentStatus: 'fulfiled',
      organisationId: user!.organisationId,
      orderType: 'list',
      products: [{
        productId: 1,
        name: `${region}: ${service} search`,
        price: searchPrice
      }]
    };

    const { products } = await mainApiProtected.placeOrder(order);
    dispatch(orderActions.setOrderProducts(products));
  } catch (error: any) {
    console.log(error);
  }
};

export const placeOrderAction = (
  region: string,
  service: string
): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const {
      matter,
      description,
      totalPrice,
      productsPrice,
      orderProducts,
      products
    } = getState().order;
    const { user } = getState().user;

    let filteredProducts: PlaceOrderProduct[] = [...orderProducts!];

    products!.forEach((product) => {
      if (product.items) {
        product.items.forEach((item: { isChosen: boolean, name: string }) => {
          if (item.isChosen) {
            filteredProducts.push({
              productId: product.id,
              price: product.price,
              idNumber: item.name,
              body: 'something'
            });
          }
        });
      }
    });

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: (totalPrice + productsPrice).toFixed(2),
      fulfilmentStatus: 'fulfiled',
      products: filteredProducts,
      organisationId: user!.organisationId,
      orderType: 'regular'
    };

    const { orderId } = await mainApiProtected.placeOrder(order);
    dispatch(orderActions.setOrderId(orderId));
  } catch (error: any) {
    console.log(error);
  }
};
