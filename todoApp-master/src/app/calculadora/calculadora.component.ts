import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-calculadora",
  templateUrl: "./calculadora.component.html",
  styleUrls: ["./calculadora.component.css"],
})
export class CalculadoraComponent implements OnInit {
  currentInput = "0"
  previousInput = ""
  operation: string | null = null

  ngOnInit() {
    this.updateDisplay()
  }

  updateDisplay() {
    // La actualización del display se manejará en el template con interpolación
  }

  appendToDisplay(value: string) {
    if (this.currentInput === "0" && value !== ".") {
      this.currentInput = value
    } else {
      this.currentInput += value
    }
  }

  clearDisplay() {
    this.currentInput = "0"
    this.previousInput = ""
    this.operation = null
  }

  setOperation(op: string) {
    if (this.operation !== null) this.calculate()
    this.operation = op
    this.previousInput = this.currentInput
    this.currentInput = "0"
  }

  calculate() {
    let result: number
    const prev = Number.parseFloat(this.previousInput)
    const current = Number.parseFloat(this.currentInput)
    switch (this.operation) {
      case "+":
        result = prev + current
        break
      case "-":
        result = prev - current
        break
      case "*":
        result = prev * current
        break
      case "/":
        result = prev / current
        break
      default:
        return
    }
    this.currentInput = result.toString()
    this.operation = null
  }

  setTheme(theme: string) {
    // La lógica del tema se manejará en el componente padre o con un servicio
  }
}

