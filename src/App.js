// -------- AppTorch - app para ligar a lanterna de um celular (IOS/Android) com um toque ou balançar --------

// Imports do app:
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

// App - Funções e Display:
const App = () => {

    // constante de toggle de aparência e lanterna:
    const [toggle, setToggle] = useState(false);

    // Função de Toggle:
    const handleToggleChange = () => setToggle(oldToggle => !oldToggle);

    // UseEffect do flash do celular
    useEffect(() => {
        // Liga e desliga o flash do celular:
        return (Torch.switchState(toggle));
    }, [toggle]);

    // UseEffect para o balançar do celular:
    useEffect(() => {
        // Quando for chacoalhado o toggle mudará:
        const subscription = RNShake.addListener(() => {
            setToggle(oldToggle => !oldToggle);
        });

        // Quebra do evento para desmontar;
        return () => subscription.remove();
    }, []);

    // Retorno visual:
    return (
        <SafeAreaView style={toggle ? style.containerLight : style.containerDark}>
            <View>
                <TouchableOpacity onPress={handleToggleChange}>
                    <Image source={toggle
                        ? require('./assets/icons/eco-light.png')
                        : require('./assets/icons/eco-light-off.png')} style={toggle
                            ? style.lightBulbOn
                            : style.lightBulbOff} />
                    <Image source={toggle
                        ? require('./assets/icons/logo-dio.png')
                        : require('./assets/icons/logo-dio-white.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// StyleSheet do app:
const style = StyleSheet.create({
    containerDark: {
        backgroundColor: '#0e1315',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLight: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightBulbOn: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 150,
        height: 150,
    },
    lightBulbOff: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 150,
        height: 150,
        tintColor: '#FFFFFF',
    },
    lightBulbOn: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
});

// Export do app:
export default App;