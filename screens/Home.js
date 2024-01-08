import { useEffect, useRef, useState } from "react"
import { View, Text, Image, TextInput, StyleSheet, ImageBackground } from "react-native"
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
export const Home = () => {

    const apiKey = "e2ab00c852c06c55ec110faab9c64bd4"
    const [active,setActive] = useState(false)

   
    const [imageSrc, setImageSrc] = useState(null)
    const [data,setData] = useState([])
    const [location,setLocation] = useState("")

  const handleGet  = async (e) => {
    e.preventDefault()
    
    try {

      
        const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
     const resp  = await axios.get(ApiUrl)
    setActive(true)
     setData(resp.data)   
     console.log(resp.data)
     if (  resp.data.weather[0].main === "Clouds"){
        setImageSrc(require("../assets/clouds.png"))
    } else if( resp.data.weather[0].main === "Clear"){
 setImageSrc(require("../assets/clear.png"))
    }
    else if(resp.data.weather[0].main === "Snow"){
        setImageSrc(require("../assets/snow.png"))
    }
    } catch (error) {
        console.log(error)
    }
  }
  const inputEL = useRef()




  
//   useEffect(() => {
// setActive(false)
//   }, [])






  const mainEl = useRef()

  const imagEl = useRef()
    return(
        <ImageBackground 
        resizeMode="cover"
        style={styles.home} source={require('../assets/bg.jpg')}>
  <View >
             <View style={styles.homeContent}>
                <Text style={styles.textContent} >Weather App</Text>
             </View>

             <View style={styles.inputform}>
                <TextInput
                ref={inputEL}
                onTextInput={handleGet}
                placeholderTextColor='white'
                onKeyPress={handleGet}
                 style={{borderColor: "white", paddingLeft: 15,   borderWidth: 2, padding: 6, borderRadius: 7, width: 200}}
                placeholder='Search city' onChangeText={(text) => setLocation(text)} />
                <View style={{backgroundColor: "#fff", height: 44, padding: 6, display: "flex", alignItems: "center", justifyContent: "center",borderRadius: 15,  width: 50}}>
                <EvilIcons name="search" size={32} color='black' />
                </View>
         
             </View>
            
             
             
          

             </View>
             <View  >
             <View  style={styles.imageContext}>
               <Image ref={imagEl} style={{width: 200, display: "flex", alignSelf:"center", justifyContent: "center", height: 200, resizeMode: "contain"}} source={require('../assets/mist.png')} />
             </View>
                <Text style={{fontSize: 44, textAlign: "center", paddingTop: 20}}>{data.name}</Text>
           <View style={{textAlign:"center"}}>
          {

            data.main ? <Text style={{fontSize: 30, textAlign: "center", paddingTop: 10}}>{data.weather[0].main}</Text> : null
          }
           </View>
             <View style={styles.weatherCondition}>
  <View style={{display: "flex", flexDirection:"row"}}>


<View style={styles.container}>
<Image style={{width: 30, height: 30}}  source={require("../assets/temp.png")}/>
    {
        data.main ? <Text style={{ fontSize: 20, paddingLeft: 10}}>{Math.round(data.main.temp)}F</Text> : null
    }
</View>

<View style={styles.container}>
<Image style={{width: 30, height: 30}}  source={require("../assets/humidityIcon.png")}/>
    {
        data.main ? <Text style={{ fontSize: 20, paddingLeft: 10}}>{Math.round(data.main.humidity)}%</Text> : null
    }
</View>

<View style={styles.container}>
<Image style={{width: 30, height: 30}}  source={require("../assets/wind.png")}/>
    {
        data.main ? <Text style={{ fontSize: 20, paddingLeft: 15}}>{Math.round(data.wind.speed)}km/h</Text> : null
    }
</View>
    
  </View>
             </View>
             </View>
        
        </ImageBackground>
      
    )
}

const styles = StyleSheet.create({
    home: {
        display : "flex",
        flex: 1,
          resizeMode: "cover",
        alignItems: "center"
    },
    imageContext :{
  paddingTop: 10,
  textAlign: "center"
    },

    inputform: {
        paddingTop: 30,
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    homeContent: {
        paddingTop: 40,
       
       
    },
    container: {
        margin: 8,
        display: 'flex',
        flexDirection: "row"
    },
    weatherCondition: {
  paddingTop: 20
    },
  
    textContent: {
        fontSize: 24,
        color: "#fff",
        textAlign: "center"
    }
})