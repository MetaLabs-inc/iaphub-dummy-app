import {useEffect, useState} from 'react';
import Iaphub, {IapHubProductInformation} from 'react-native-iaphub';

export const useGetProducts = () => {
  const [productsForSale, setProductsForSale] = useState<
    IapHubProductInformation[]
  >([]);
  const [activeProducts, setActiveProducts] = useState<
    IapHubProductInformation[]
  >([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const productsForSale = await Iaphub.getProductsForSale();
        const activeProducts = await Iaphub.getActiveProducts();

        //The products should have the following structure
        // {
        //   id: "5e5198930c48ed07aa275fd9",
        //   type: "renewable_subscription",
        //   sku: "membership2_tier10",
        //   group: "3e5198930c48ed07aa275fd8",
        //   groupName: "subscription_group_1",
        //   title: "Membership",
        //   description: "Become a member of the community",
        //   price: "$9.99",
        //   priceAmount: 9.99,
        //   priceCurrency: "USD",
        //   subscriptionPeriodType: "normal",
        //   subscriptionDuration: "P1M"
        // },
        setProductsForSale(productsForSale);
        setActiveProducts(activeProducts);
      } catch (error) {
        console.log('error', error);
      }
    }
    getProducts();
  }, []);

  return {
    productsForSale,
    activeProducts,
  };
};
