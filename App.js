import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Canidate1 from './assets/trump.jpg';
import Canidate2 from './assets/kamala.jpg';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.NavBar}>
        <NavBar />
      </View>

      <View style={styles.content}>
        <Location/>
        <ElectorateContainer/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

function NavBar(){
  return (
    <View style={styles.NavBar}>
      <Text>EZVote</Text>
    </View>
  );
}

function Location(){
  return (
    <View style={styles.Location}>
      <Text>Location</Text>
      <Text>Winamac, IN</Text>
    </View>
  );
}

function ElectorateContainer(){
  return (
    <View style={styles.ElectorateContainer}>
      <Text style={{padding: 10}}>Cast Your Vote for the Supreme Leader</Text>
      <View style={styles.ImageRow}>
        <Image source={Canidate1} style={{width: 100, height: 100}} />
        <Image source={Canidate2} style={{width: 100, height: 100}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  NavBar:{
    height: 125,
    width: '100%',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },

  content:{
    flex: 1,
    alignItems: 'center',
  },

  Location:{
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'stretch',
  },

  ElectorateContainer:{
    marginTop: 5,
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    scrollable: true,
  },

  ImageRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  }
});
