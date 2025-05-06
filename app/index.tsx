import { useState } from "react";
import { useColorScheme, View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LucideIcon from "@react-native-vector-icons/lucide";
import { CalculationContext, useCalculationContext, CalculationState, Calculation } from "@/contexts/CalculationContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ButtonRow, Button, ButtonText } from "@/components/button";
import { Operator, parenthese, findOperator, calculate } from "@/lib/math";

export default function App() {
    const { primaryColor }: { primaryColor: string } = useThemeColors();
    const [calculation, setCalculation] = useState<Calculation>({ expression: "", result: undefined });
    return (
        <CalculationContext.Provider value={{calculation, setCalculation}}>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: primaryColor
            }}>
                <CalculationView />
                <Buttons />
            </SafeAreaView>
        </CalculationContext.Provider>
    );
}

function CalculationView() {
    const { textColor, previewTextColor }: { textColor: string, previewTextColor: string } = useThemeColors();
    const { calculation, setCalculation } = useCalculationContext();
    return (
        <View style={{
            flex: 2
        }}>
            <View style={{
                flex: 3,
                marginLeft: 20,
                marginRight: 20,
                alignItems: "flex-end"
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <ScrollView indicatorStyle={useColorScheme() == "dark" ? "white" : "black"}>
                        <Text style={{
                            fontFamily: "Khula",
                            fontSize: 46,
                            color: textColor
                        }}>{calculation.expression == "undefined" ? "Error" : calculation.expression}</Text>
                    </ScrollView>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <ScrollView>
                        <Text style={{
                            fontFamily: "Khula",
                            fontSize: 38,
                            color: previewTextColor
                        }}>{calculation.result && calculation.result}</Text>
                    </ScrollView>
                </View>
            </View>
            <Separator />
        </View>
    );
}

function Separator() {
    const { textColor }: { textColor: string } = useThemeColors();
    return (
        <View style={{
            marginLeft: 20,
            marginRight: 20,
            height: 2,
            backgroundColor: textColor,
            borderRadius: 10
        }} />
    );
}

const iconSize: number = 30;

function Buttons() {
    const { calculation, setCalculation } = useCalculationContext();
    return (
        <View style={{
            margin: 20,
            flex: 3,
            gap: 10
        }}>
            <ButtonRow>
                <Button action={() => setCalculation({ expression: "", result: undefined })}>
                    <LucideIcon name="trash-2" size={iconSize} color="#e05656" />
                </Button>
                <Button action={() => {
                    let newExpression: string = calculation.expression;
                    const lastOperatorIndex: number = findOperator(newExpression);
                    if(isNaN(lastOperatorIndex)) return;
                    newExpression = newExpression.slice(0, lastOperatorIndex + 1);
                    setCalculation({ expression: newExpression, result: calculation.result });
                }}>
                    <LucideIcon name="delete" size={iconSize} color="#e05656" />
                </Button>
                <Button action={() => addToExpression(parenthese(calculation.expression), calculation, setCalculation)}>
                    <LucideIcon name="parentheses" size={iconSize} color="#6cb942" />
                </Button>
                <Button action={() => addToExpression("+", calculation, setCalculation)}>
                    <LucideIcon name="plus" size={iconSize} color="#6cb942" />
                </Button>
            </ButtonRow>
            <ButtonRow>
                <Button action={() => addToExpression(7, calculation, setCalculation)}>
                    <ButtonText content="7" />
                </Button>
                <Button action={() => addToExpression(8, calculation, setCalculation)}>
                    <ButtonText content="8" />
                </Button>
                <Button action={() => addToExpression(9, calculation, setCalculation)}>
                    <ButtonText content="9" />
                </Button>
                <Button action={() => addToExpression("-", calculation, setCalculation)}>
                    <LucideIcon name="minus" size={iconSize} color="#6cb942" />
                </Button>
            </ButtonRow>
            <ButtonRow>
                <Button action={() => addToExpression(4, calculation, setCalculation)}>
                    <ButtonText content="4" />
                </Button>
                <Button action={() => addToExpression(5, calculation, setCalculation)}>
                    <ButtonText content="5" />
                </Button>
                <Button action={() => addToExpression(6, calculation, setCalculation)}>
                    <ButtonText content="6" />
                </Button>
                <Button action={() => addToExpression("*", calculation, setCalculation)}>
                    <LucideIcon name="x" size={iconSize} color="#6cb942" />
                </Button>
            </ButtonRow>
            <ButtonRow>
                <Button action={() => addToExpression(1, calculation, setCalculation)}>
                    <ButtonText content="1" />
                </Button>
                <Button action={() => addToExpression(2, calculation, setCalculation)}>
                    <ButtonText content="2" />
                </Button>
                <Button action={() => addToExpression(3, calculation, setCalculation)}>
                    <ButtonText content="3" />
                </Button>
                <Button action={() => addToExpression("/", calculation, setCalculation)}>
                    <LucideIcon name="divide" size={iconSize} color="#6cb942" />
                </Button>
            </ButtonRow>
            <ButtonRow>
                <Button action={() => addToExpression(".", calculation, setCalculation)}>
                    <ButtonText content="." />
                </Button>
                <Button action={() => addToExpression(0, calculation, setCalculation)}>
                    <ButtonText content="0" />
                </Button>
                <Button action={() => setCalculation({ expression: `${calculate(calculation.expression)}`, result: undefined })}>
                    <LucideIcon name="equal" size={iconSize} color="#26d8a6" />
                </Button>
            </ButtonRow>
        </View>
    );
}

function addToExpression(char: number | Operator | ".", calculation: Calculation, setCalculation: (calculation: Calculation) => void): void {
    const newExpression: string = calculation.expression + char;
    setCalculation({ expression: newExpression, result: calculate(newExpression) });
}
