import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui';
import { colors, spacing, fontSize } from '../../src/theme';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
}

const categories = [
  { icon: 'phone-portrait', label: 'Electronics' },
  { icon: 'shirt', label: 'Fashion' },
  { icon: 'home', label: 'Home' },
  { icon: 'basketball', label: 'Sports' },
  { icon: 'book', label: 'Books' },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 79.99, originalPrice: 99.99, rating: 4.5, reviewCount: 128 },
  { id: '2', name: 'Smart Watch', price: 199.99, rating: 4.8, reviewCount: 256 },
  { id: '3', name: 'Laptop Stand', price: 49.99, originalPrice: 69.99, rating: 4.3, reviewCount: 89 },
  { id: '4', name: 'Bluetooth Speaker', price: 59.99, rating: 4.6, reviewCount: 312 },
  { id: '5', name: 'Mechanical Keyboard', price: 129.99, originalPrice: 149.99, rating: 4.7, reviewCount: 178 },
  { id: '6', name: 'Wireless Mouse', price: 39.99, rating: 4.4, reviewCount: 95 },
];

const { width } = Dimensions.get('window');
const productCardWidth = (width - spacing.md * 3) / 2;

export default function ShopScreen() {
  const [cartCount, setCartCount] = useState(2);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => {
    const discount = item.originalPrice
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;

    return (
      <Card style={styles.productCard} padding={0}>
        <View style={styles.productImage}>
          <Ionicons name="image" size={48} color={colors.textTertiary} />
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          </View>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>${item.price}</Text>
              {item.originalPrice && (
                <Text style={styles.originalPrice}>${item.originalPrice}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
              <Ionicons name="cart" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Flash Sale!</Text>
            <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          <Ionicons
            name="pricetag"
            size={80}
            color="rgba(255,255,255,0.3)"
            style={styles.bannerIcon}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productsRow}
          contentContainerStyle={styles.productsList}
          scrollEnabled={false}
        />
      </ScrollView>

      <TouchableOpacity style={styles.cartButton}>
        <Ionicons name="cart" size={24} color="#FFFFFF" />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  categoryLabel: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
  banner: {
    marginHorizontal: spacing.md,
    borderRadius: 16,
    padding: spacing.lg,
    overflow: 'hidden',
    backgroundColor: colors.primary,
  },
  bannerContent: {
    maxWidth: '60%',
  },
  bannerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  bannerIcon: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: fontSize.sm,
  },
  productsList: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  productCard: {
    width: productCardWidth,
  },
  productImage: {
    height: 120,
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  productInfo: {
    padding: spacing.sm,
  },
  productName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    height: 36,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingText: {
    fontSize: fontSize.xs,
    color: colors.text,
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 6,
  },
  cartButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
