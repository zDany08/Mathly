export type Operator = "+" | "-" | "*" | "/" | "(" | ")";

export function parenthese(expression: string): "(" | ")" {
    return isLastDigit(expression) ? ")" : "(";
}

export function findOperator(expression: string): number {
    let index: number = NaN;
    for(let i = expression.length - 1; i > 0; i--) {
        if(!["+", "-", "*", "/", "(", ")"].includes(expression[i])) continue;
        index = i;
        break;
    }
    return index;
}

export function calculate(expression: string): number | undefined {
    try {
        const result: number = eval(expression);
        return result == Infinity || result == -Infinity || isNaN(result) ? undefined : result;
    }catch(error) {
        return undefined;
    }
}

function isLastDigit(expression: string): boolean {
    const last: string = expression[expression.length - 1];
    return !isNaN(Number(last)) || last == ")";
}
