import { useColorScheme, ColorSchemeName } from "react-native";

export function useDebugThemeColors(theme: ColorSchemeName): { primaryColor: string, secondaryColor: string, textColor: string, previewTextColor: string } {
    return theme == "dark" ? { primaryColor: "#222222", secondaryColor: "#333333", textColor: "#dddddd", previewTextColor: "#555555" } : { primaryColor: "#eeeeee", secondaryColor: "#dddddd", textColor: "#333333", previewTextColor: "#bbbbbb" };
}

export function useThemeColors(): { primaryColor: string, secondaryColor: string, textColor: string, previewTextColor: string } {
    return useDebugThemeColors(useColorScheme());
}
