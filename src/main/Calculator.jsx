import React, { Component } from "react"
import './Calculator.css'

import Button from '../components/Button'
import Display from "../components/Display"


const inicialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    indiceValue: 0
}


export default class Calculator extends Component {
    state = {
        // state é uma variável que recebe todos os valores de inicialState
        ...inicialState
    }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...inicialState })
    }

    setOperation(operation) {
        if (this.state.indiceValue === 0) {
            this.setState({ 
                operation, 
                indiceValue: 1,
                clearDisplay: true
            })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            switch (currentOperation) {
                case '/':
                    values[0] = values[0] / values[1]
                    break;
                case '*':
                    values[0] = values[0] * values[1]
                    break;
                case '-':
                    values[0] = values[0] - values[1]
                    break;
                case '+':
                    values[0] = values[0] + values[1]
                    break;
                default:
                    break;
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                indiceValue: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(num) {
        if (num === '.' && this.state.displayValue === '0') {
            return
        }

        if (num === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + num
        this.setState({ displayValue, clearDisplay: false })
        
        if (num !== '.') {
            const i = this.state.indiceValue
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]

            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" namedClass="triple" click={this.clearMemory} />
                <Button label="/" namedClass="operation" click={this.setOperation} />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" namedClass="operation" click={this.setOperation}/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" namedClass="operation" click={this.setOperation}/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" namedClass="operation" click={this.setOperation}/>
                <Button label="0" namedClass="double" click={this.addDigit} />
                <Button label="." click={this.addDigit} />
                <Button label="=" namedClass="operation" click={this.setOperation}/>
            </div>
        )
    }
}