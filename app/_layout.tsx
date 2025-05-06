import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import * as StatusBar from "expo-status-bar";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 100,
    fade: true
});

StatusBar.setStatusBarHidden(true);

export default function RootLayout() {
    const [loaded] = useFonts({
        Khula: require('../assets/fonts/Khula.ttf')
    });
    useEffect(() => {
        if(loaded) SplashScreen.hideAsync();
    }, [loaded]);
    if(!loaded) return null;
    return (
        <Stack screenOptions={{
            headerShown: false
        }} />
    );
}
