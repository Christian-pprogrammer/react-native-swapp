import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry';
import styles, { colors } from './styles/index';
import { ENTRIES1 } from './static/entries';

const SLIDER_1_FIRST_ITEM = 1;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      slider1Ref: null,
    };
  }

  _renderItem({ item, index }) {
    return (
      <View>
        <View style={[styles.imageContainer]}>
          {this.image}
          <View style={[styles.radiusMask]} />
        </View>
        <View style={[styles.textContainer]}>
          <Text>{'Title'}</Text>
          <Text style={[styles.subtitle]} numberOfLines={2}>
            {'subtitle'}
          </Text>
        </View>
      </View>
    );
  }

  get example1() {
    const { slider1ActiveSlide, slider1Ref } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>Example 1</Text>
        <Carousel
          ref={c => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={ENTRIES1}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          autoplay={false}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={slider1Ref}
          tappableDots={!!slider1Ref}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        />
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollviewContentContainer}
          indicatorStyle={'white'}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          {this.example1}
        </ScrollView>
      </View>
    );
  }
}
