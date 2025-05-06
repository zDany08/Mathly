import { StyleProp, ViewStyle, View, TouchableOpacity, TextStyle, Text } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export function ButtonRow({
    style,
    children
}: {
    style?: StyleProp<ViewStyle>,
    children: React.ReactNode
}) {
    return (
        <View style={[{
            flex: 1,
            flexDirection: "row",
            gap: 10
        }, style]}>{children}</View>
    );
}

export function Button({
    style,
    action,
    children
}: {
    style?: StyleProp<ViewStyle>,
    action: () => void,
    children: React.ReactNode
}) {
    const { secondaryColor }: { secondaryColor: string } = useThemeColors();
    return (
        <TouchableOpacity style={[{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: secondaryColor,
            borderRadius: 50
        }, style]} onPress={action}>
            {children}
        </TouchableOpacity>
    );
}

export function ButtonText({
    content
}: {
    content: string
}) {
    const { textColor }: { textColor: string } = useThemeColors();
    return (
        <Text style={{
            fontFamily: "Khula",
            fontSize: 30,
            color: textColor
        }}>{content}</Text>
    );
}
