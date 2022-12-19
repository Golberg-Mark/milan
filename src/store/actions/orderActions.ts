import { createActionCreators } from 'immer-reducer';

import { OrderReducer, PlaceOrder, PlaceOrderProduct, ProductWithMatchedPriceList } from '@/store/reducers/order';
import { AsyncAction } from '@/store/actions/common';
import { userActions } from '@/store/actions/userActions';

export const orderActions = createActionCreators(OrderReducer);

export type OrderActions = ReturnType<typeof orderActions.setProducts>
  | ReturnType<typeof orderActions.setServices>
  | ReturnType<typeof orderActions.setProductsPrice>
  | ReturnType<typeof orderActions.setMatter>
  | ReturnType<typeof orderActions.setDescription>
  | ReturnType<typeof orderActions.setTotalPrice>
  | ReturnType<typeof orderActions.setTotalItemsAmount>
  | ReturnType<typeof orderActions.setOrderId>
  | ReturnType<typeof orderActions.setOrderProducts>
  | ReturnType<typeof orderActions.cleanCurrentOrder>
  | ReturnType<typeof orderActions.setIsProductsLoading>;

export const getOrganisationProductsAction = (): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const { id } = getState().user.user!.organisations[2];
    let products = await mainApiProtected.getOrganisationProducts(id);
    let priceList = await mainApiProtected.getPriceList(id);
    const results: ProductWithMatchedPriceList[] = [];
    const services: ProductWithMatchedPriceList[] = [];

    if (priceList) {
      priceList.forEach((el, i) => {
        const isExist = products.find((product) => product.productId === el.productCode);
        if (isExist) {
          const regexp = new RegExp(/^refer to search.*$/);
          const merged = {
            ...isExist,
            'priceExGST': priceList[i]['priceExGST'],
            'GST': priceList[i]['GST'],
            'priceInclGST': priceList[i]['priceInclGST'],
            'collection': priceList[i]['collection']
          };

          if (regexp.test(merged.input1.toLowerCase())) {
            services.push(merged as ProductWithMatchedPriceList);
          } else results.push(merged as ProductWithMatchedPriceList);
        }
      });
    }

    dispatch(orderActions.setProducts(results));
    dispatch(orderActions.setServices(services));
    dispatch(userActions.setPriceList(priceList));
  } catch (error: any) {
    console.log(error);
  }
};

export const getOrderItemsAction = (region: string, service: string, searchPrice?: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApi }
) => {
  try {
    dispatch(orderActions.setProductsPrice(0));
    dispatch(orderActions.setTotalItemsAmount(0));

    const changedRegion = region.toLowerCase();
    const changedService = service.toLowerCase().replaceAll(' ', '-');
    const products = await mainApi.getOrderItems(changedRegion, changedService);

    let { totalPrice, totalItemsAmount, productsPrice } = getState().order;

    dispatch(orderActions.setProductsPrice(productsPrice));
    dispatch(orderActions.setTotalPrice(totalPrice + Number(searchPrice)));
    dispatch(orderActions.setTotalItemsAmount(totalItemsAmount));
    dispatch(orderActions.setProducts(products));
  } catch (error: any) {
    console.log(error);
  }
};

export const initializeOrderAction = (
  region: string,
  service: string,
  orderItem: PlaceOrderProduct
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
      orderItems: [orderItem],
      organisationId: user!.organisations[2].id,
      userId: user!.id/*TODO: change it after adding select organisation logic*/
    };
    console.log(order);
    /*const { products } = await mainApiProtected.placeOrder(order);
    dispatch(orderActions.setOrderProducts(products));*/
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
    /*const {
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
      product.forEach((item: { isChosen: boolean, name: string }) => {
        if (item.isChosen) {
          filteredProducts.push({
            productId: product.id,
            price: product.price,
            idNumber: item.name,
            body: 'something'
          });
        }
      });
    });

    const order: PlaceOrder = {
      matter,
      description,
      region,
      service,
      totalPrice: (totalPrice + productsPrice).toFixed(2),
      fulfilmentStatus: 'fulfiled',
      products: filteredProducts,
      organisationId: user!.organisations[2].id, /!*TODO: change it after adding select organisation logic*!/
      orderType: 'regular'
    };

    const { orderId } = await mainApiProtected.placeOrder(order);
    dispatch(orderActions.setOrderId(orderId));*/
  } catch (error: any) {
    console.log(error);
  }
};
