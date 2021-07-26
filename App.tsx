import React, {useState} from 'react';
import {
  Button,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {useGetProducts} from './hooks/useGetProducts';
import {useIaphubInitialize} from './hooks/useIaphubInitialize';

import {buyProduct} from './helpers';
import {styles} from './styles';
import {IapHubProductInformation} from 'react-native-iaphub';

const App = () => {
  const {iaphubInitialized} = useIaphubInitialize();

  const [productsForSale, setProductsForSale] = useState<
    IapHubProductInformation[]
  >([]);

  const [activeProducts, setActiveProducts] = useState<
    IapHubProductInformation[]
  >([]);
  useGetProducts(iaphubInitialized, setProductsForSale, setActiveProducts);

  const buyOnPress = (sku: string) => () => buyProduct(sku);
  const productsForSaleRenderItem: FlatListProps<IapHubProductInformation>['renderItem'] =
    ({item}: ListRenderItemInfo<IapHubProductInformation>) => (
      <View style={styles.rowContainer}>
        <View style={styles.productInfoContainer}>
          <Text>{`${item.title} - ${item.priceCurrency} ${item.priceAmount}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title={'Buy'} onPress={buyOnPress(item.sku)} />
        </View>
      </View>
    );

  const activeProductsRenderItem: FlatListProps<IapHubProductInformation>['renderItem'] =
    ({item}: ListRenderItemInfo<IapHubProductInformation>) => (
      <View style={styles.rowContainer}>
        <View style={styles.productInfoContainer}>
          <Text>{`${item.title} - ${item.priceCurrency} ${item.priceAmount} - ${item.subscriptionState}`}</Text>
        </View>
      </View>
    );

  const keyExtractor: FlatListProps<IapHubProductInformation>['keyExtractor'] =
    (item, _) => item.sku;

  const ListHeaderComponent: React.FC<{title: string}> = ({title}) => (
    <View style={styles.rowContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  const ListEmptyComponent: React.FC<{message: string}> = ({message}) => (
    <View style={styles.emptyMessageContainer}>
      <Text style={styles.emptyMessage}>{message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.sectionContainer}>
        <FlatList
          ListHeaderComponent={
            <ListHeaderComponent title={'Products For Sale'} />
          }
          ListEmptyComponent={
            <ListEmptyComponent message={'No Products For Sale'} />
          }
          keyExtractor={keyExtractor}
          data={productsForSale}
          renderItem={productsForSaleRenderItem}
        />
        <FlatList
          ListHeaderComponent={
            <ListHeaderComponent title={'My Active Products'} />
          }
          ListEmptyComponent={
            <ListEmptyComponent message={'No Active Products'} />
          }
          keyExtractor={keyExtractor}
          data={activeProducts}
          renderItem={activeProductsRenderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
