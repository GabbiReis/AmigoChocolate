import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes/stack";
import LottieView from "lottie-react-native";

const Splash = () => {
    const navigation = useNavigation<StackTypes>();

    const animacao = require('../../../assets/Splash.json');
    
    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                loop={false}
                speed={0.5}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#6D3415',
                }}
                source={animacao}
                onAnimationFinish={() => navigation.navigate('Inicio')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Splash;
