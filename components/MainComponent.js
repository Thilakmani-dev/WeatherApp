import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, Button} from 'react-native';
import {connect} from 'react-redux';
import {getLocationData, getWeatherData} from '../redux/actions';
import moment from 'moment';

const MainComponent = props => {
  console.log(props);
  const [cityName, setcityName] = useState('chennai');
  useEffect(() => {
    // props.getLocationData(cityName);
    props.getWeatherData(13.0827, 80.2707);
  }, [setcityName]);
  return (
    <ScrollView style={styles.parentContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>{cityName.toUpperCase()}</Text>
        <Button title={'X'} color={'rgba(52, 52, 52, 0.8)'}>
          {' '}
          onPress={() => setcityName('chennai')}
        </Button>
      </View>
      <View>
        {props.weather.daily !== undefined &&
          props.weather.daily.map((day, index) => {
            if (index == 0) {
              return (
                <View style={styles.mainDayContainer} key={day.dt}>
                  <View style={styles.info}>
                    <View style={styles.left}>
                      <Text style={styles.textTitle}>
                        {moment(day.dt * 1000)
                          .format('dddd')
                          .toUpperCase()}
                      </Text>
                      <Text style={styles.boldedContent}>
                        <Text style={{fontSize: 28}}>
                          {day.temp.day.toFixed(0)}
                        </Text>
                        <Text style={{fontSize: 22}}>°C</Text>
                      </Text>
                    </View>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                      }}
                    />
                  </View>
                  <View style={styles.line} />
                  <View style={styles.info}>
                    <Text style={styles.textContent}>
                      {moment(day.dt * 1000)
                        .format('D MMM, YYYY')
                        .toUpperCase()}
                    </Text>
                    <Text style={styles.textContent}>
                      {day.weather[0].main.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.line} />
                </View>
              );
            }
            if (index == 7) {
              return <View key={day.dt}></View>;
            } else {
              return (
                <View style={styles.otherDayContainer} key={day.dt}>
                  <Text style={styles.textSubTitle}>
                    {moment(day.dt * 1000)
                      .format('dddd')
                      .toUpperCase()}
                  </Text>
                  <Text style={styles.boldedContent}>
                    <Text style={{fontSize: 28}}>
                      {day.temp.day.toFixed(0)}
                    </Text>
                    <Text style={{fontSize: 22}}>°C</Text>
                  </Text>
                  <Image
                    style={{width: 50, height: 50}}
                    source={{
                      uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
                    }}
                  />
                </View>
              );
            }
          })}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    location: state.weather.locationData,
    weather: state.weather.weatherData,
    lat: state.weather.lat,
    lon: state.weather.lon,
    weatherloading: state.weather.weatherLoading,
    locationloading: state.weather.locationLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocationData: cityName => dispatch(getLocationData(cityName)),
    getWeatherData: (lat, lon) => dispatch(getWeatherData(lat, lon)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    height: 500,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262525',
    padding: 12,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: 'hidden',
  },
  headerText: {
    color: 'white',
    fontFamily: 'Roboto',
  },
  refreshText: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    color: 'white',
    fontFamily: 'Roboto',
  },
  mainDayContainer: {
    flex: 1,
    padding: 18,
    backgroundColor: '#46B2E0',
    marginBottom: 1,
    marginLeft: 12,
    marginRight: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
  },
  otherDayContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#46B2E0',
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  textTitle: {
    fontWeight: '900',
    color: 'white',
    fontSize: 28,
    fontFamily: 'Roboto',
  },
  textContent: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  textSubTitle: {
    fontWeight: '900',
    color: 'white',
    fontSize: 28,
    fontFamily: 'Roboto',
    width: '50%',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  boldedContent: {
    color: 'white',
    fontSize: 42,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
});
