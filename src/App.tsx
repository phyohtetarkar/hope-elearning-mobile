import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import Initializers from './Initializers';
import MainNavigation from './MainNavigation';
import { ApiError, UnauthorizedError } from './lib/errors';
import { store } from './lib/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof UnauthorizedError) {
          return false;
        }

        if (error instanceof ApiError) {
          return false;
        }

        if (failureCount >= 1) {
          return false;
        }

        return true;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    },
  }),
});

const App = () => {
  return (
    <Provider store={store}>
      <Initializers />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>
          <MainNavigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
