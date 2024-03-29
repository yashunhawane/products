/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Product = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('ProductDetails', {data: item.id})
            }>
            <View style={styles.productContainer}>
              <Image
                source={{uri: item.thumbnail}}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
                  {item.discountPercentage && (
                    <Text style={styles.discountText}>
                      {item.discountPercentage}% Off
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  productContainer: {
    backgroundColor: '#ecf3f9',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 130,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C3F58',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#3C3F58',
  },
  discountText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    backgroundColor: '#3C3F58',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default Product;
