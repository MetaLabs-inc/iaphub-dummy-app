import {Alert} from 'react-native';
import Iaphub, {IapHubProductInformationWithWebhook} from 'react-native-iaphub';

export const buyProduct = async (
  sku: string,
  storeTransactionHandler?: (
    transaction: IapHubProductInformationWithWebhook,
  ) => void,
) => {
  try {
    var transaction = await Iaphub.buy(sku, {
      // Optional callback triggered before the receipt is processed
      onReceiptProcess: receipt => {
        console.log('Purchase success, processing receipt...', receipt);
      },
    });

    /*
     * The purchase has been successful but we need to check that the webhook to our server was successful as well
     * If the webhook request failed, IAPHUB will send you an alert and retry again in 1 minute, 10 minutes, 1 hour and 24 hours.
     * You can retry the webhook directly from the dashboard as well
     */
    if (transaction.webhookStatus === 'failed') {
      Alert.alert(
        'Purchase delayed',
        'Your purchase was successful but we need some more time to validate it, should arrive soon! Otherwise contact the support (support@myapp.com)',
      );
    }
    // Everything was successful! Yay!
    else {
      Alert.alert(
        'Purchase successful',
        'Your purchase has been processed successfully!',
      );
      // storeTransactionHandler(transaction);
    }
  } catch (error) {
    // Purchase popup cancelled by the user (ios only)
    if (error.code === 'user_cancelled') {
      return;
    }
    // Couldn't buy product because it has been bought in the past but hasn't been consumed (restore needed)
    else if (error.code === 'product_already_owned') {
      Alert.alert(
        'Product already owned',
        'Please restore your purchases in order to fix that issue',
        // eslint-disable-next-line no-sparse-arrays
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Restore', onPress: () => Iaphub.restore()},
          ,
        ],
      );
    }
    // The payment has been deferred (its final status is pending external action such as 'Ask to Buy')
    else if (error.code === 'deferred_payment') {
      Alert.alert(
        'Purchase awaiting approval',
        'Your purchase has been processed but is awaiting approval',
      );
    } else if (error.code === 'receipt_validation_failed') {
      /*
       * The receipt has been processed on IAPHUB but something went wrong
       * It is probably because of an issue with the configuration of your app or a call to the Itunes/GooglePlay API that failed
       * IAPHUB will send you an email notification when a receipt fails, by checking the receipt on the dashboard you'll find a detailed report of the error
       * After fixing the issue (if there's any), just click on the 'New report' button in order to process the receipt again
       * If it is an error contacting the Itunes/GooglePlay API, IAPHUB will retry to process the receipt automatically as well
       */
      Alert.alert(
        "We're having trouble validating your transaction",
        "Give us some time, we'll retry to validate your transaction ASAP!",
      );
    } else if (error.code === 'receipt_invalid') {
      /*
       * The receipt has been processed on IAPHUB but is invalid
       * It could be a fraud attempt, using apps such as Freedom or Lucky Patcher on an Android rooted device
       */
      Alert.alert(
        'Purchase error',
        "We were not able to process your purchase, if you've been charged please contact the support (support@myapp.com)",
      );
    } else if (error.code === 'receipt_request_failed') {
      /*
       * The receipt hasn't been validated on IAPHUB (Could be an issue like a network error...)
       * The user will have to restore its purchases in order to validate the transaction
       * An automatic restore should be triggered on every relaunch of your app since the transaction hasn't been 'finished'
       * Android should automatically refund transactions that are not 'finished' after 3 days
       */
      Alert.alert(
        "We're having trouble validating your transaction",
        'Please try to restore your purchases later (Button in the settings) or contact the support (support@myapp.com)',
      );
    } else if (error.code === 'cross_platform_conflict') {
      /*
       * The user has already an active subscription on a different platform (android or ios)
       * This security has been implemented to prevent a user from ending up with two subscriptions of different platforms
       * You can disable the security by providing the 'crossPlatformConflict' parameter to the buy method (Iaphub.buy(sku, {crossPlatformConflict: false}))
       */
      Alert.alert(
        `Seems like you already have a subscription on ${error.params.platform}`,
        'You have to use the same platform to change your subscription or wait for your current subscription to expire',
      );
    }
    // Couldn't buy product for many other reasons (the user shouldn't be charged)
    else {
      Alert.alert(
        'Purchase error',
        'We were not able to process your purchase, please try again later or contact the support (support@myapp.com)',
      );
    }
  }
};
