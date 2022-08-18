import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

import {useState} from 'react';

const GetDimentionData = props => {
  const [data, setData] = useState({});

  const getData = async () => {
    let getDiemnsionData = await fetch(props.url);
    const result = await getDiemnsionData.json();
    setData({...result});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      {data?.dimension && (
        <View>
          <Text style={styles.dimensionTextStyle}>Dimension</Text>
          <Text style={[styles.dimensionTextStyle, {color: 'white'}]}>
            {data.dimension}
          </Text>
        </View>
      )}
      {data?.residents && (
        <View>
          <Text style={styles.dimensionTextStyle}>Residents</Text>
          <Text>{data?.residents?.length}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dimensionTextStyle: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: scale(12),
  },
});

export default GetDimentionData;
