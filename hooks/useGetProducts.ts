import {useEffect} from 'react';
import Iaphub, {IapHubProductInformation} from 'react-native-iaphub';

export const useGetProducts = (
  iaphubInitialized: boolean,
  setProductsForSale: (products: IapHubProductInformation[]) => void,
  setActiveProducts: (products: IapHubProductInformation[]) => void,
) => {
  useEffect(() => {
    if (iaphubInitialized) {
      Iaphub.getProductsForSale()
        .then(setProductsForSale)
        .catch(error => console.warn('error getting products for sale', error));
      Iaphub.getActiveProducts()
        .then(setActiveProducts)
        .catch(error => console.warn('error getting active products', error));
    }
    //   //The products should have the following structure
    //   // {
    //   //   id: "5e5198930c48ed07aa275fd9",
    //   //   type: "renewable_subscription",
    //   //   sku: "membership2_tier10",
    //   //   group: "3e5198930c48ed07aa275fd8",
    //   //   groupName: "subscription_group_1",
    //   //   title: "Membership",
    //   //   description: "Become a member of the community",
    //   //   price: "$9.99",
    //   //   priceAmount: 9.99,
    //   //   priceCurrency: "USD",
    //   //   subscriptionPeriodType: "normal",
    //   //   subscriptionDuration: "P1M"
    //   // },
    // }
    // getProducts();
  }, [iaphubInitialized]);
};
