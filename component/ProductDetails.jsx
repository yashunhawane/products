/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import StarRating from 'react-native-star-rating';

const {height, width} = Dimensions.get('window');

const ProductDetails = ({route}) => {
  const receivedData = route.params.data;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${receivedData}`)
      .then(res => res.json())
      .then(data => {
        setProductData(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{productData.title}</Text>
      </View>

      <View style={styles.imageContainer}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={productData.images}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.image} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{productData.title}</Text>
        <Text style={styles.detailText}>{productData.category}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹.{productData.price} </Text>
          <Text style={styles.discountText}>
            - {productData.discountPercentage}% off
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={productData.rating}
            starSize={20}
            fullStarColor={'gold'}
            emptyStarColor={'gray'}
            containerStyle={{
              margin: 0,
              padding: 0,
              justifyContent: 'flex-start',
            }}
            starStyle={{margin: 0, padding: 0}}
          />
          <Text style={styles.ratingText}>{productData.rating}</Text>
        </View>

        <Text style={styles.stockText}>
          Available Stock: {productData.stock}
        </Text>
        <Text style={styles.descriptionText}>{productData.description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333333',
  },
  imageContainer: {
    height: 250,
  },
  image: {
    width: width,
    height: 250,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailsContainer: {
    padding: 15,
    marginTop: 10,
  },
  priceText: {
    fontWeight: '400',
    fontSize: 20,
  },
  discountText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    backgroundColor: '#3C3F58',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  ratingContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 17,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 17,
  },
  stockText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ProductDetails;
