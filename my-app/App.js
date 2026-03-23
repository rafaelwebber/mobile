import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text, Button, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num) => {
    if (shouldResetDisplay) {
      setDisplay(String(num));
      setShouldResetDisplay(false);
    } else {
      setDisplay((prev) => (prev === '0' ? String(num) : prev + num));
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation && !shouldResetDisplay) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Erro';
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const currentValue = parseFloat(display);
    const result = calculate(previousValue, currentValue, operation);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const ButtonRow = ({ children }) => (
    <View style={styles.buttonRow}>{children}</View>
  );

  const CalcButton = ({ label, onPress, mode = 'outlined', style }) => (
    <Button
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      contentStyle={styles.buttonContent}
    >
      {label}
    </Button>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Surface style={styles.displayContainer} elevation={2}>
          <Text style={styles.display} variant="headlineLarge">
            {display}
          </Text>
        </Surface>

        <View style={styles.buttonsContainer}>
          <ButtonRow>
            <CalcButton label="C" onPress={handleClear} mode="contained-tonal" />
            <CalcButton label="/" onPress={() => handleOperation('/')} />
            <CalcButton label="*" onPress={() => handleOperation('*')} />
            <CalcButton label="-" onPress={() => handleOperation('-')} />
          </ButtonRow>
          <ButtonRow>
            <CalcButton label="7" onPress={() => handleNumber(7)} />
            <CalcButton label="8" onPress={() => handleNumber(8)} />
            <CalcButton label="9" onPress={() => handleNumber(9)} />
            <CalcButton label="+" onPress={() => handleOperation('+')} mode="contained" />
          </ButtonRow>
          <ButtonRow>
            <CalcButton label="4" onPress={() => handleNumber(4)} />
            <CalcButton label="5" onPress={() => handleNumber(5)} />
            <CalcButton label="6" onPress={() => handleNumber(6)} />
            <CalcButton label="=" onPress={handleEquals} mode="contained" />
          </ButtonRow>
          <ButtonRow>
            <CalcButton label="1" onPress={() => handleNumber(1)} />
            <CalcButton label="2" onPress={() => handleNumber(2)} />
            <CalcButton label="3" onPress={() => handleNumber(3)} />
          </ButtonRow>
          <ButtonRow>
            <CalcButton label="0" onPress={() => handleNumber(0)} style={styles.zeroButton} />
            <CalcButton label="." onPress={handleDecimal} />
          </ButtonRow>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  displayContainer: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  display: {
    textAlign: 'right',
    fontFamily: 'monospace',
  },
  buttonsContainer: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  zeroButton: {
    flex: 2,
  },
});
