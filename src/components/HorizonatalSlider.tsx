import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Movie} from '../interfaces/movieInterface';

import MoviePoster from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

const HorizonatalSlider = ({title, movies}: Props) => {
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Gilroy',
            fontWeight: 'bold',
            marginLeft: 5,
          }}>
          {title}
        </Text>
      )}
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={movies}
        renderItem={({item}: any) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizonatalSlider;
