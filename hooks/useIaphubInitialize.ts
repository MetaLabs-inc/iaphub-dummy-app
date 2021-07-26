import {useEffect} from 'react';
import Iaphub from 'react-native-iaphub';

export const useIaphubInitialize = () => {
  useEffect(() => {
    async function initialize() {
      await Iaphub.init({
        // The app id is available on the settings page of your app
        appId: '60e619793ac92c30680b6588',
        // The (client) api key is available on the settings page of your app
        apiKey: 'aSIMwtvAwCFxrxUN0KeIIHcJcWh0S3',
        // App environment (production by default, other environments must be created on the IAPHUB dashboard)
        environment: 'production',
      });
      await Iaphub.setUserId('idDummy5');
    }
    initialize();
  }, []);
};
