import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem } from "../reducers/cartSlice";
import { RootState } from "../reducers/store";

import { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AddToCartButton: React.FC<{ sku: string }> = ({ sku }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantity = cartItems.find((item) => item.sku === sku)?.count ?? 0;

  const dispatch = useDispatch();

  const handleIncreaseItem = useCallback(
    (sku) => {
      dispatch(increaseItem(sku));
    },
    [dispatch]
  );

  const handleDecreaseItem = useCallback(
    (sku) => {
      dispatch(decreaseItem(sku));
    },
    [dispatch]
  );

  const data = useMemo(() => {
    if (quantity === 0) {
      return {
        onClick: () => handleIncreaseItem(sku),
        text: "Add to Cart",
      };
    }
    return {
      text: `Items (${quantity})`,
    };
  }, [quantity, sku, handleIncreaseItem]);

  const { text, onClick } = data;

  return (
    <View style={styles.container}>
      {quantity >= 1 && (
        <TouchableOpacity
          onPress={() => handleDecreaseItem(sku)}
          style={styles.buttonChanger}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onClick} style={[styles.button]}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      {quantity >= 1 && (
        <TouchableOpacity
          onPress={() => handleIncreaseItem(sku)}
          style={styles.buttonChanger}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    margin: 4,
    padding: 8,
    backgroundColor: "#7A8FF8",
    shadowColor: "#7A8FF8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },

  buttonChanger: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
});

export default AddToCartButton;
