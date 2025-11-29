<script setup>
import { ref, computed } from 'vue';
import Application from "../base/Application.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const display = ref('0');
const previousValue = ref(null);
const operation = ref(null);
const waitingForOperand = ref(false);

const handleNumber = (num) => {
  if (waitingForOperand.value) {
    display.value = String(num);
    waitingForOperand.value = false;
  } else {
    display.value = display.value === '0' ? String(num) : display.value + num;
  }
};

const handleDecimal = () => {
  if (waitingForOperand.value) {
    display.value = '0.';
    waitingForOperand.value = false;
  } else if (display.value.indexOf('.') === -1) {
    display.value += '.';
  }
};

const handleOperation = (op) => {
  const inputValue = parseFloat(display.value);

  if (previousValue.value === null) {
    previousValue.value = inputValue;
  } else if (operation.value) {
    const result = calculate(previousValue.value, inputValue, operation.value);
    display.value = String(result);
    previousValue.value = result;
  }

  waitingForOperand.value = true;
  operation.value = op;
};

const calculate = (a, b, op) => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b !== 0 ? a / b : 0;
    default: return b;
  }
};

const handleEquals = () => {
  const inputValue = parseFloat(display.value);

  if (operation.value && previousValue.value !== null) {
    const result = calculate(previousValue.value, inputValue, operation.value);
    display.value = String(result);
    previousValue.value = null;
    operation.value = null;
    waitingForOperand.value = true;
  }
};

const handleClear = () => {
  display.value = '0';
  previousValue.value = null;
  operation.value = null;
  waitingForOperand.value = false;
};

const handlePercentage = () => {
  const value = parseFloat(display.value);
  display.value = String(value / 100);
};

const handleToggleSign = () => {
  const value = parseFloat(display.value);
  display.value = String(value * -1);
};
</script>

<template>
  <application icon="/icons/calculator.png" :name="t('app.desktop.calculator')">
    <div class="calculator-wrapper">
      <div class="calculator">
        <div class="display">{{ display }}</div>

        <div class="buttons">
        <button class="btn btn-function" @click="handleClear">C</button>
        <button class="btn btn-function" @click="handleToggleSign">+/-</button>
        <button class="btn btn-function" @click="handlePercentage">%</button>
        <button class="btn btn-operator" @click="handleOperation('÷')">÷</button>

        <button class="btn" @click="handleNumber(7)">7</button>
        <button class="btn" @click="handleNumber(8)">8</button>
        <button class="btn" @click="handleNumber(9)">9</button>
        <button class="btn btn-operator" @click="handleOperation('×')">×</button>

        <button class="btn" @click="handleNumber(4)">4</button>
        <button class="btn" @click="handleNumber(5)">5</button>
        <button class="btn" @click="handleNumber(6)">6</button>
        <button class="btn btn-operator" @click="handleOperation('-')">-</button>

        <button class="btn" @click="handleNumber(1)">1</button>
        <button class="btn" @click="handleNumber(2)">2</button>
        <button class="btn" @click="handleNumber(3)">3</button>
        <button class="btn btn-operator" @click="handleOperation('+')">+</button>

        <button class="btn btn-zero" @click="handleNumber(0)">0</button>
        <button class="btn" @click="handleDecimal">.</button>
        <button class="btn btn-operator" @click="handleEquals">=</button>
      </div>
      </div>
    </div>
  </application>
</template>

<style scoped>
.calculator-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calculator {
  background: #1e1e1e;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
}

.display {
  background: #2d2d2d;
  color: #fff;
  font-size: 3rem;
  font-weight: 300;
  text-align: right;
  padding: 30px 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  word-break: break-all;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  flex: 1;
  grid-auto-rows: 1fr;
}

.btn {
  background: #505050;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

.btn-function {
  background: #a5a5a5;
  color: #000;
}

.btn-operator {
  background: #ff9500;
  color: #fff;
}

.btn-zero {
  grid-column: span 2;
  border-radius: 20px;
}

@media (max-width: 400px) {
  .calculator {
    max-width: 100%;
    padding: 15px;
  }

  .display {
    font-size: 2.5rem;
    padding: 20px 15px;
    min-height: 60px;
  }

  .btn {
    height: 55px;
    font-size: 1.3rem;
  }

  .buttons {
    gap: 10px;
  }
}
</style>