import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { COLORS, VERSION } from './src/constants';
import { Dispatch, SetStateAction, useState } from 'react';
import { AppStateModel } from './src/models';
import { Navigator } from './src/navagator';

// root.render(<Page state={stateManager.getState()} dispach={stateManager.dispach} />);
// stateManager.subscribe((state) => {
//   root.render(<Page state={state} dispach={stateManager.dispach} />);
// });
const getInitialAppState: () => AppStateModel = () => {
  return {
    version: VERSION,
    lastChange: new Date().getTime(),
    theme: "auto",
    number: 0
  }
}

export default function App() {
  const [state, setState] : [AppStateModel, Dispatch<SetStateAction<AppStateModel>>] = useState(getInitialAppState);

  return (
    <>
      <StatusBar style="light"/>
      <Navigator state={state} setState={setState} />
    </>
  );
  
}
