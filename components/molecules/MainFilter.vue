<template>
  <div class="main-filter__filter" @click="activeFilter()">
    <div class="main-filter__field-title-first">Цена</div>
    <div class="main-filter__inputs-range">
      <InputText
        :set-value="formDataToSend"
        :id="'price_from'"
        :label="'price_from'"
        :type="'number'"
        :placeholder="'От'"
      />
      <InputText
        :set-value="formDataToSend"
        :id="'price_to'"
        :label="'price_to'"
        :type="'number'"
        :placeholder="'До'"
      />
    </div>
    <div>
      <div class="main-filter__field-title">Тип объявления</div>
      <div class="main-filter__filter-person">
        <label for="all" class="custom-radio">
          <input
            type="radio"
            value=""
            id="all"
            v-model="formDataToSend.person_type"
          />
          <span>Все</span>
        </label>
        <label for="private_person" class="create-ad-form__radio custom-radio">
          <input
            type="radio"
            value="private_person"
            id="private_person"
            v-model="formDataToSend.person_type"
          />
          <span>Частные</span>
        </label>
        <label for="company" class="create-ad-form__radio custom-radio">
          <input
            type="radio"
            value="company"
            id="company"
            v-model="formDataToSend.person_type"
          />
          <span>Компании</span>
        </label>
      </div>
    </div>
    <div class="main-filter__field-title">Оплата</div>
    <div
      v-for="period in periodicityArray"
      :key="period.id"
      class="main-filter__field-checkbox"
    >
      <InputCheckbox
        :set-value="formDataToSend"
        :id="period.id"
        :label="period.name"
        @change.native="checkPayment(period.id)"
      />
    </div>
    <div class="main-filter__field-title">Охват аудитории, чел.</div>
    <div class="main-filter__inputs-range">
      <InputText
        :set-value="formDataToSend"
        :id="'reach_audience_from'"
        :type="'number'"
        :placeholder="'От'"
      />
      <InputText
        :set-value="formDataToSend"
        :id="'reach_audience_to'"
        :type="'number'"
        :placeholder="'До'"
      />
    </div>
    <div class="main-filter__field-title">Ширина, см</div>
    <div class="main-filter__inputs-range">
      <InputText
        :set-value="formDataToSend"
        :id="'width_from'"
        :type="'number'"
        :placeholder="'От'"
      />
      <InputText
        :set-value="formDataToSend"
        :id="'width_to'"
        :type="'number'"
        :placeholder="'До'"
      />
    </div>
    <div class="main-filter__field-title">Длина, см</div>
    <div class="main-filter__inputs-range">
      <InputText
        :set-value="formDataToSend"
        :id="'length_from'"
        :type="'number'"
        :placeholder="'От'"
      />
      <InputText
        :set-value="formDataToSend"
        :id="'length_to'"
        :type="'number'"
        :placeholder="'До'"
      />
    </div>
    <div class="main-filter__field-title">Количество, шт</div>
    <div class="main-filter__inputs-range">
      <InputText
        :set-value="formDataToSend"
        :id="'amount_from'"
        :type="'number'"
        :placeholder="'От'"
      />
      <InputText
        :set-value="formDataToSend"
        :id="'amount_to'"
        :type="'number'"
        :placeholder="'До'"
      />
    </div>
    <div class="main-filter__field-checkbox main-filter__field-checkbox-bottom">
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'travel_abroad'"
        :label="'Выезд за границу'"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'photo_report'"
        :label="'Предоставления фотоотчета'"
      />
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'make_and_place_advertising'"
        :label="'Сами изготовим и разместим рекламу'"
      />
    </div>
  </div>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";

export default {
  name: "MainFilter",
  data() {
    return {
      formDataToSend: {
        person_type: "",
        child_category_key: "",
        price_from: "",
        price_to: "",
        amount_from: "",
        amount_to: "",
        length_from: "",
        length_to: "",
        width_from: "",
        width_to: "",
        reach_audience_from: "",
        reach_audience_to: "",
        travel_abroad: "",
        ready_for_political_advertising: "",
        photo_report: "",
        make_and_place_advertising: "",
      },
      periodicityArray: [
        {
          id: "1",
          name: "в день",
        },
        {
          id: "2",
          name: "в неделю",
        },
        {
          id: "3",
          name: "в месяц",
        },
        {
          id: "4",
          name: "в год",
        },
        {
          id: "5",
          name: "на 20 лет",
        },
        {
          id: "6",
          name: "навсегда",
        },
      ],
    };
  },
  props: {
    activeFilter: {
      type: Function,
      default() {
        return {};
      },
    },
  },
  components: {
    InputText,
    InputCheckbox,
  },
};
</script>

<style lang="scss" scoped>
.main-filter {
  &__filter {
    width: 25%;
    padding-right: 20px;
  }

  &__field-title-first {
    padding-bottom: 10px;
  }

  &__inputs-range {
    margin-bottom: 5px;
  }

  &__field-title {
    padding: 20px 0 10px 0;
  }

  &__filter-person {
    display: flex;
    flex-direction: column;

    label {
      padding-bottom: 10px;
    }
  }

  &__field-checkbox-bottom {
    padding-top: 25px;
  }

  &__field-checkbox {
    div {
      padding-bottom: 10px;
    }
  }
}
</style>