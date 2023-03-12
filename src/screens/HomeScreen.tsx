import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View, ScrollView} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import GradiantBackgraund from '../components/GradiantBackgraund';
import HorizonatalSlider from '../components/HorizonatalSlider';

import MoviePoster from '../components/MoviePoster';
import {getImageColors} from '../helpers/getColores';
import useMovies from '../hooks/useMovies';
import {GradientContext} from '../context/GradiantContext';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, isLoading, popular, topRated, upcoming} = useMovies();
  const {top} = useSafeAreaInsets(); //IOS BAJAR LA INFORMACION PARA QUE NO UTILICE EL TOUCH
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="black" size={100} />
      </View>
    );
  }

  return (
    <GradiantBackgraund>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          {/* Crousel principal */}
          <View
            style={{
              height: 440,
            }}>
            <Carousel
              data={nowPlaying}
              renderItem={({item}: any) => <MoviePoster movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              inactiveSlideScale={0.8}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          {/* peliculas populares */}
          <HorizonatalSlider title="Popular" movies={popular} />
          <HorizonatalSlider title="Top Rated" movies={topRated} />
          <HorizonatalSlider title="Up coming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradiantBackgraund>
  );
};

export default HomeScreen;
