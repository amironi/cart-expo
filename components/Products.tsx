import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../reducers/cartSlice";
import { RootState } from "../reducers/store";
import AddToCartButton from "./AddToCartButton";
import products_list from "../data/products_list";
import { ISubmitPayload, ProductItem } from "../interfaces";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const Products: React.FC = () => {
  const [products, setProducts] = useState([] as ProductItem[]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [sending, setSending] = useState(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const product = products.find((product) => product.sku === item.sku);
      return acc + (product?.price ?? 0) * item.count;
    }, 0);
  }, [cartItems, products]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(products_list);
    }, 1000);
  }, []);

  const dispatch = useDispatch();

  const handleClear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleSubmit = async () => {
    setSending(true);

    const data = {} as ISubmitPayload;

    console.log("cartItems", cartItems);
    cartItems.forEach((item) => (data[item.sku] = item.count));

    // sending data to server
    // await fetch("/api/submit", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    setSending(false);

    handleClear();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {products.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productDetailsContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₪ {product.price}</Text>
            </View>
            <AddToCartButton sku={product.sku} />
          </View>
        ))}
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity
          disabled={cartItems.length === 0}
          onPress={handleClear}
          style={[styles.button, cartItems.length === 0 && { opacity: 0.5 }]}
        >
          <Text
            style={[
              styles.buttonText,
              cartItems.length === 0 && { color: "white" },
            ]}
          >
            Clear
          </Text>
        </TouchableOpacity>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPrice}>₪ {totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          disabled={cartItems.length === 0 || totalPrice === 0 || sending}
          onPress={handleSubmit}
          style={[styles.button, cartItems.length === 0 && { opacity: 0.5 }]}
        >
          <Text
            style={[
              styles.buttonText,
              cartItems.length === 0 && { color: "white" },
            ]}
          >
            Purchase
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 16,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    padding: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productDetailsContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  productName: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  productPrice: {
    marginTop: 8,
    fontSize: 14,
    color: "#8F8F8F",
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    padding: 8,
    backgroundColor: "#39BBF8",
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00000",
  },
  totalPriceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Products;
