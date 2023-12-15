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
        bg_color: {
          backgroundColor: "black",
        },
        text_color: {
          color: "white",
        },
      };
    }
    return {
      text: `Items (${quantity})`,
      bg_color: {
        backgroundColor: "indigo",
      },
      text_color: {
        color: "white",
      },
    };
  }, [quantity, sku, handleIncreaseItem]);

  const { text, bg_color, onClick, text_color } = data;

  return (
    <View style={styles.container}>
      {quantity >= 1 && (
        <TouchableOpacity
          onPress={() => handleDecreaseItem(sku)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={onClick}
        style={[styles.button, bg_color, text_color]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
      {quantity >= 1 && (
        <TouchableOpacity
          onPress={() => handleIncreaseItem(sku)}
          style={styles.button}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

export default AddToCartButton;
