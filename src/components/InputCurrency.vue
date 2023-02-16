<template>
  <input class="input-amount" 
  ref="currencyInput"
  :value="internalValue" 
  :readonly="readonly"
  type="number"
  inputmode="numeric"
  pattern="[\d\.]*"
  @keypress="onKeyPress($event)"
  @focus="onFocus($event)"
  @blur="onBlur($event)" 
  />
</template>

<script>
import currency from "currency.js";
export default {
    expose: ['focus'],
    props: {
        modelValue: {
            type: [Number, null],
            required: true,
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() { 
        return {
            localValue: this.modelValue,
            internalValue: null,
        }
    },
    watch: {
        localValue(newValue) {
            this.$emit("update:modelValue", newValue);
        },
        modelValue(newValue) {
            this.localValue = newValue;
            this.internalValue = currency(newValue).value;
        },
    },
    methods: {
        focus() {
            this.$refs.currencyInput.focus(); 
            this.internalValue = ""; 
        },
        onBlur(evt) {
            this.internalValue = currency(evt.target.value).value;
            this.localValue = currency(this.internalValue).value;
        },
        onFocus(evt) {
            this.internalValue = currency(evt.target.value);
            this.$emit("focus");
        },
        onKeyPress(evt) {
            // console.log(evt.which);
            if (evt.which == 46) {
                //AQUI HARIAMOS MAGIA
                return;
            }else if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
            {
                evt.preventDefault();
            }
        }
    },
    onMounted() {
        // this.internalValue = currency(this.modelValue).format();
        this.internalValue = currency(this.modelValue);
    }
}
</script>

<style>
    .input-amount {
        height: 35px;
        font-size: x-large;
        font-weight: bolder;
        outline: none;
        border: none;
        text-align: center;
    }
</style>