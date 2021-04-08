<template>
  <label
    class="radio"
    :class="{
      checked: checked,
      disabled: disabled
    }"
  >
    <input
      type="radio"
      :checked="checked"
      :disabled="disabled"
      :value="value"
      @change="$emit('change', $event.target.value)"
    />
    <span class="radio-sign" />
    <span class="radio-text" v-text="calcText" />
  </label>
</template>

<script>
export default {
  name: "Radio",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    text: {
      type: String,
      default: () => ""
    },
    value: {
      type: [Number, String, Boolean],
      required: true
    },
    bindValue: {
      type: [Number, String, Boolean],
      required: true
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    checked() {
      return this.value === this.bindValue && !this.disabled
    },
    calcText() {
      return this.text ? this.text : this.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";

$radio-size: 24px;
$radio-margin: 8px;

.radio {
  cursor: pointer;
  position: relative;
  height: $radio-size;

  > * {
    vertical-align: middle;
  }

  input[type="radio"] {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
  }

  &-sign {
    display: inline-block;
    width: $radio-size;
    height: $radio-size;
    padding: 2px;
    position: relative;
    margin-right: $radio-margin;

    &::before {
      content: "";
      display: inline-block;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      border: 2px $black solid;
      border-radius: 100%;
      background-color: $white;
    }

    &::after {
      content: "";
      display: inline-block;
      box-sizing: content-box;
      width: 0;
      height: 0;
      border-radius: 100%;
      background-color: $primary;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &-text {
    font-size: 16px;
    line-height: 22px;
    padding: 1px 0;
    color: $black;
  }

  &.checked &-sign {
    color: $primary;

    &::before {
      border-color: $primary;
    }

    &::after {
      width: 12px;
      height: 12px;
    }
  }

  &.checked &-text {
    color: $primary;
  }

  &.disabled {
    cursor: not-allowed;
  }

  &.disabled &-sign {
    &::before {
      border-color: $gray-400;
    }
  }

  &.disabled &-text {
    color: $gray-400;
  }
}
</style>
