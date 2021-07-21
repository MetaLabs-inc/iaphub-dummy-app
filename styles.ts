import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 48,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    flex: 1,
  },
  productInfoContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  emptyMessage: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    height: 120,
  },
});
