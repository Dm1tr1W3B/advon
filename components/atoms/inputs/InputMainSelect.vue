<template>

  <div :class="['input-main-select']"
  >
    <label :for="label">
      <v-select
        :id="label"
        :placeholder="placeholder"
        :options="optionList"
        @input="onChange"
        :value="value"
        :label="labelName"
        :searchable="searchable"
        :disabled="disabled"
        >
      </v-select>
      <SelectArrow class="input-main-select__arrow" />
    </label>
    <div v-if="errorMessages.length">
      <p v-for="error in errorMessages" :key="error.id" class="input-main-select__error">
       {{error}}
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import vSelect from 'vue-select';
import "vue-select/src/scss/vue-select.scss";


export default {
  name: 'InputMainSelect',
  components: {
    vSelect,
    Vue,
    SelectArrow,
  },
  props: {
    optionList: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: [Object, String],
      default() {
        return {};
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    labelName: {
      type: String,
      default: 'name',
    },
    label: {
      type: String,
      default: '',
    },
    setValue: {
      type: Object,
      default() {
        return {};
      },
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(value) {
      this.setValue[this.id] = value;
    },
  },
};
</script>

<style lang="scss" scoped>
  .input-main-select {
  color: $mainColor;
  width: 230px;
  padding: 3px;
  height: 44px;
  border: 1px solid #DADADA;
  display: flex;
  align-items: center;
  position: relative;

  label {
    width: 100%;
    display: block;
  }

  &__arrow {
    position: absolute;
    top: 48%;
    right: 10px;
  }
}

/deep/ .vs__dropdown-toggle {
  border: none;
}
/deep/ .vs__dropdown-option--highlight {
  background-color: $mainColor;
}
/deep/ .vs__dropdown-menu {
  padding: 0;
  margin-top: 5px;
}
/deep/ .vs__clear {
  display: none;
}
/deep/.vs__actions {
  display: none;
}
</style>
