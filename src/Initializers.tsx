import { addEventListener } from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import Toast from 'react-native-toast-message';
import { userLoggedIn, userLoggedOut } from './features/auth/authSlice';
import { useAppDispatch } from './lib/hooks';
import { getUser } from './lib/services/UserApi';

const Initializers = () => {
  const initUserRef = useRef(false);

  const dispatch = useAppDispatch();

  const loadUser = useCallback(async () => {
    try {
      const user = await getUser();
      dispatch(userLoggedIn(user));
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(userLoggedOut());
      } else if (!initUserRef.current) {
        loadUser();
      }

      initUserRef.current = true;
    });

    return subscriber;
  }, [dispatch, loadUser]);

  useEffect(() => {
    let appState = AppState.currentState;

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          focusManager.setFocused(true);
        } else {
          focusManager.setFocused(false);
        }
        appState = nextAppState;

        // console.log(appState);
      },
    );

    onlineManager.setEventListener(setOnline => {
      return addEventListener(nextState => {
        setOnline(!!nextState.isConnected);
        console.log(nextState.isConnected ? 'connected' : 'disconnected');
      });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default Initializers;
