import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useEffect, useState} from 'react';
import GetDimentionData from './get_dimension_data';

const App: () => Node = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dimensionData, setDimensionData] = useState([]);

  const getAPIData = async () => {
    try {
      let response = await fetch('https://rickandmortyapi.com/api/character');
      const json = await response.json();

      setData([...json.results]);

      // let storeData = [];

      // data.map(async item => {
      //   let getDiemnsionData = await fetch(item.origin.url);
      //   const result = await getDiemnsionData.json();
      //   storeData.push(result);
      // });
      // console.log('reeee', storeData);

      // setDimensionData([...storeData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const _renderFlatListItem = ({item}) => {
    return (
      <View style={styles.sectionContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.image}} style={styles.ImageContainer} />

          <View style={{flexDirection: 'column', marginLeft: scale(16)}}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.statusAlignment}>
              <View
                style={[
                  styles.charachterStatus,
                  {
                    backgroundColor: item.status === 'Dead' ? 'red' : 'green',
                  },
                ]}
              />
              <Text style={styles.statusStyle}>{item.status} -</Text>

              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {item.species}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: scale(-5)}}>
              <Text style={styles.statusStyle}>Gender</Text>
              <Text style={[styles.statusStyle, {marginHorizontal: scale(0)}]}>
                - {item.gender}
              </Text>
            </View>
            <View>
              <GetDimentionData url={item.origin.url} />
            </View>

            <Text style={styles.locationStyle}>Last known Location:</Text>
            <Text style={{color: 'white', fontSize: scale(12)}}>
              {item.origin.name}
            </Text>

            <Text style={styles.firstSeenTextStyle}>First Seen in:</Text>
            <Text style={{color: 'white', fontSize: scale(12)}}>
              {item.location.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#202020'}}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={_renderFlatListItem}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  sectionContainer: {
    backgroundColor: '#888888',
    height: scale(260),
    width: '100%',
    marginVertical: scale(10),
    borderRadius: scale(10),
    alignSelf: 'center',
  },
  ImageContainer: {
    height: scale(260),
    width: scale(100),
    borderTopLeftRadius: scale(10),
    borderBottomLeftRadius: scale(10),
  },
  title: {
    fontSize: scale(18),
    marginTop: scale(10),
    color: 'white',
    fontWeight: 'bold',
    maxWidth: '95%',
  },
  charachterStatus: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(15),
  },
  statusStyle: {
    marginHorizontal: scale(5),
    color: 'white',
    fontWeight: 'bold',
  },
  locationStyle: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: scale(12),
    marginTop: scale(5),
  },
  firstSeenTextStyle: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: scale(12),
    marginTop: scale(5),
  },
  statusAlignment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(-5),
  },
});

export default App;
