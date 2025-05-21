<template>
  <form class="create-ad-form" @submit.prevent="handleSubmit">
    <div class="create-ad-form__title">Создать объявление</div>
    <div class="shadow_effect">
      <div class="create-ad-form__block">
        <div class="create-ad-form__block-title">
          Разместить как
        </div>
        <div>
          <label for="private_person" class="create-ad-form__radio custom-radio">
            <input
              type="radio"
              value="private_person"
              id="private_person"
              v-model="formDataToSend.executorCompany"
            />
            <span>{{ this.myProfileData.name }}</span>
          </label>
          <label
            for="comany"
            class="create-ad-form__radio custom-radio"
            v-if="this.myProfileData.has_company"
          >
            <input
              type="radio"
              value="company"
              id="comany"
              v-model="formDataToSend.executorCompany"
            />
            <span>{{ this.myProfileData.company_name }}</span>
          </label>
          <Notification :message="error['advertisement_type']" v-if="error" />
        </div>
      </div>
      <div class="create-ad-form__block">
        <div class="create-ad-form__block-title">
          Разместить как
          <span> * </span>
        </div>
        <div>
          <label for="performer" class="create-ad-form__radio custom-radio">
            <input
              type="radio"
              value="performer"
              id="performer"
              v-model="formDataType.performerAdvertiser"
            />
            <span>Исполнитель</span>
            <div
              title="У вас есть место под рекламу"
              class="create-ad-form__question"
            >
              <div class="create-ad-form__question-mobile">
                У вас есть место под рекламу
              </div>
            </div>
          </label>
          <label for="employer" class="create-ad-form__radio custom-radio">
            <input
              type="radio"
              value="employer"
              id="employer"
              v-model="formDataType.performerAdvertiser"
            />
            <span>Рекламодатель</span>
            <div
              title="Если вы ищете исполнителей для вашей рекламной промоакции"
              class="create-ad-form__question"
            >
              <div class="create-ad-form__question-mobile">
                Если вы ищете исполнителей для вашей рекламной промоакции
              </div>
            </div>
          </label>
        </div>
        <Notification :message="error['person_type']" v-if="error" />
      </div>
      <div class="create-ad-form__block">
        <div class="create-ad-form__block-title">
          Категория
        </div>
        <div @click="openModalCategory" class="create-ad-form__category">
          {{ this.mainCategory }}
          <SelectArrow />
        </div>
      </div>
      <div class="create-ad-form__block">
        <div class="create-ad-form__block-title">
          Название
        </div>
        <InputText
            :set-value="formDataToSend"
            :id="'title'"
            :label="'title'"
            :type="'text'"
            :placeholder="'Введите название объявления'"
        />
        <Notification :message="error['title']" v-if="error" />
        <div class="create-ad-form__placeholder">
          {{ characters }}
        </div>
      </div>
      <div class="create-ad-form__category-new" v-if="this.mainCategoryImg">
        <img
          :src="this.mainCategoryImg"
          alt=""
          class="create-ad-form__category-img"
        />
        {{ this.mainCategory }}
        <span v-if="this.childCategory"> , {{ this.childCategory }} </span>
      </div>
      <Notification :message="error['category_id']" v-if="error" />
      <Notification :message="error['child_category_id']" v-if="error" />
  <!--    <div class="create-ad-form__map">-->
  <!--      <div class="create-ad-form__map-title">-->
  <!--        Выберите местоположение на карте-->
  <!--      </div>-->
  <!--      <GmapMap-->
  <!--        :center="{ lat: 48, lng: 35 }"-->
  <!--        :zoom="5"-->
  <!--        map-type-id="terrain"-->
  <!--        style="width: 660px; height: 400px"-->
  <!--        @click="addMarker"-->
  <!--        :marker-position="formDataToSend.position"-->
  <!--        :handle-set-coordinates="handleSetCoordinates"-->
  <!--        :handle-set-address="handleSetAddress"-->
  <!--      >-->
  <!--        <GmapMarker-->
  <!--          v-if="formDataToSend.position"-->
  <!--          :position="formDataToSend.position"-->
  <!--        />-->
  <!--      </GmapMap>-->
  <!--      <Notification :message="error['latitude']" v-if="error" />-->
  <!--      <Notification :message="error['longitude']" v-if="error" />-->
  <!--    </div>-->
      <div class="create-ad-form__address-block" v-if="this.positionLatLng">
        {{ this.positionLatLng }}
      </div>
      <InputText
        :set-value="formDataToSend"
        :id="formDataToSend.position.lat"
        hidden
      />
      <InputText
        :set-value="formDataToSend"
        :id="formDataToSend.position.lng"
        hidden
      />
      <div
        class="create-ad-form__block"
        v-for="field in this.categoryFields.data"
        :key="field.id"
      >
        <div v-if="field.price != null">
          <div
            v-if="field.price.type === 'number'"
            class="create-ad-form__field-title"
          >
            <div class="create-ad-form__field-title-price">
              {{ field.price.name }}
            </div>
            <InputText
              v-if="field.price.type === 'number'"
              :set-value="formDataToSend"
              :id="field.price.key"
              :label="field.price.name"
              :type="'number'"
              :placeholder="field.price.name"
            />
          </div>
          <div class="create-ad-form__section-price">
            <div @click="isShowBargainingOn">
              <div
                v-if="field.negotiable.type === 'text'"
                class="create-ad-form__field-title"
              >
                {{ field.negotiable.name }}
              </div>
              <InputCheckbox
                v-if="
                  field.negotiable.type === 'checkbox' &&
                  field.negotiable.is_show === true
                "
                :set-value="formDataToSend"
                :id="field.negotiable.key"
                :label="field.negotiable.name"
              />
            </div>
            <div>
              <div
                v-if="field.bargaining.type === 'text'"
                class="create-ad-form__field-title"
              >
                {{ field.bargaining.name }}
              </div>
              <InputCheckbox
                v-if="
                  field.bargaining.type === 'checkbox' &&
                  field.bargaining.is_show === true &&
                  isShowBargaining
                "
                :set-value="formDataToSend"
                :id="field.bargaining.key"
                :label="field.bargaining.name"
              />
            </div>
          </div>
          <div v-if="field.payment != null">
            <div
              v-if="field.payment.type === 'select'"
              class="create-ad-form__field-title"
            >
              {{ field.payment.name }}
            </div>
            <div
              v-if="field.payment.type === 'select'"
              class="create-ad-form__select-form"
              @click="periodicitySelectOpen()"
            >
              {{ periodicity }}
              <SelectArrow v-if="!selectOpen" />
              <SelectArrowTop v-if="selectOpen" />
            </div>
            <div
              v-if="field.payment.type === 'select' && periodicitySelect"
              class="create-ad-form__select-body"
            >
              <div v-for="period in periodicityArray" :key="period.id">
                <div @click="periodicitySelected(period.name, period.id)">
                  {{ period.name }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="field.type === 'select'" class="create-ad-form__field-hint">
            {{ field.hint }}
          </div>
          <Notification
            :message="error['price']"
            v-if="error && field.price.key === 'price'"
          />
        </div>
        <div v-if="field.type === 'select'" class="create-ad-form__field-title">
          {{ field.name }}
        </div>
        <div
          v-if="field.type === 'select'"
          class="create-ad-form__select-form"
          @click="periodicitySelectOpen()"
        >
          {{ periodicity }}
          <SelectArrow v-if="!selectOpen" />
          <SelectArrowTop v-if="selectOpen" />
        </div>
        <div
          v-if="field.type === 'select' && periodicitySelect"
          class="create-ad-form__select-body"
        >
          <div v-for="period in periodicityArray" :key="period.id">
            <div @click="periodicitySelected(period.name, period.id)">
              {{ period.name }}
            </div>
          </div>
        </div>
        <div v-if="field.type === 'select'" class="create-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <div v-if="field.type === 'hashtags'" class="create-ad-form__field-title">
          {{ field.name }}
          <div class="create-ad-form__field-hint">
            {{ field.hint }}
          </div>
          <Tags :onChange="onTagsChange" class="create-ad-form__hashtags" />
        </div>
        <Notification
          :message="error['hashtags']"
          v-if="error && field.key === 'hashtags'"
        />
        <div v-if="field.type === 'text'" class="create-ad-form__field-title">
          {{ field.name }}
        </div>
        <InputText
          v-if="field.type === 'text'"
          :set-value="formDataToSend"
          :id="field.key"
          :label="field.name"
          :type="'text'"
          :placeholder="field.name"
        />
        <div v-if="field.type === 'text'" class="create-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <div v-if="field.type === 'number'" class="create-ad-form__field-title">
          {{ field.name }}
        </div>
        <InputText
          v-if="field.type === 'number'"
          :set-value="formDataToSend"
          :id="field.key"
          :label="field.name"
          :type="'number'"
          :placeholder="field.name"
        />
        <div v-if="field.type === 'number'" class="create-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <Notification
          :message="error['width']"
          v-if="error && field.key === 'width'"
        />
        <Notification
          :message="error['amount']"
          v-if="error && field.key === 'amount'"
        />
        <Notification
          :message="error['length']"
          v-if="error && field.key === 'length'"
        />
        <Notification
          :message="error['price']"
          v-if="error && field.key === 'price'"
        />
        <Notification
          :message="error['reach_audience']"
          v-if="error && field.key === 'reach_audience'"
        />
        <InputCheckbox
          v-if="field.type === 'checkbox' && field.is_show === true"
          :set-value="formDataToSend"
          :id="field.key"
          :label="field.name"
        />
        <div v-if="field.type === 'checkbox'" class="create-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <div v-if="field.type === 'textarea'" class="create-ad-form__field-title">
          {{ field.name }}
        </div>
        <InputTextarea
          v-if="field.type === 'textarea'"
          :set-value="formDataToSend"
          :id="field.key"
          :label="field.name"
          :placeholder="field.name"
        />
        <div v-if="field.type === 'textarea'" class="create-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <Notification
          :message="error['description']"
          v-if="error && field.key === 'description'"
        />
        <div v-if="field.type === 'datetime'" class="create-ad-form__field-title">
          {{ field.name }}
        </div>
        <input
          type="date"
          v-if="field.type === 'datetime' && field.key === 'date_of_the'"
          v-model="formDataToSend.datetime.date_of_the"
          :id="field.form_field_id"
        />
        <input
          type="date"
          v-if="field.type === 'datetime' && field.key === 'date_start'"
          v-model="formDataToSend.datetime.date_start"
          :id="field.form_field_id"
        />
        <input
          type="date"
          v-if="field.type === 'datetime' && field.key === 'date_finish'"
          v-model="formDataToSend.datetime.date_finish"
          :id="field.form_field_id"
        />
        <input
          type="date"
          v-if="field.type === 'datetime' && field.key === 'deadline_date'"
          v-model="formDataToSend.datetime.deadline_date"
          :id="field.form_field_id"
        />

        <div v-if="field.type === 'datetime'" class="create-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <div class="create-ad-form__file" v-if="field.type === 'file'">
          <div
            v-if="field.type === 'file'"
            class="create-ad-form__field-title-sempl"
          >
            {{ field.name }}
          </div>
          <div class="create-ad-form__file-update">
            <div>
              <label class="create-ad-form__file-block">
                <span class="create-ad-form__file-upload">Загрузить</span>
                <input
                  hidden
                  type="file"
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
              </label>
              <div
                class="create-ad-form__file-upload-secsesful"
                v-if="fileUploads"
              >
                Файл успешно загружен!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="create-ad-form__block">
        <div>Фото*</div>
        <label>
          <input
            :type="this.filePhotos"
            id="files"
            ref="files"
            multiple
            v-on:change="handleFilesUploads()"
            hidden
            accept="image/jpeg, image/png"
            class="preloadPhoto"
          />
          <div class="create-ad-form__photos-section">
            <div
              v-for="(file, key) in files"
              :key="file.id"
              class="create-ad-form__photos-pre"
            >
              <img v-bind:ref="'image' + parseInt(key)" />
              <div class="create-ad-form__photos-background">
                <div
                  @click="deletePhotos(key)"
                  class="create-ad-form__photos-delete"
                >
                  <Delete />
                </div>
              </div>
            </div>
            <div
              class="create-ad-form__photos"
              @click="addFlieType"
              v-if="this.files.length <= 4"
            >
              <PlusUpload />
            </div>
          </div>
        </label>
        <div v-if="this.limitPhotoErrore" class="create-ad-form__photos-errore">
          Максимальный лимит фотографий 5
        </div>
      </div>
      <Notification :message="error['images']" v-if="error" />
<!--      <div class="create-ad-form__block create-ad-form__block-link">-->
<!--        <InputCheckbox-->
<!--          :set-value="formDataToSend"-->
<!--          :id="'isHide'"-->
<!--          :label="'Доступ по ссылке'"-->
<!--        />-->
<!--        <span title="Ваше объявление будет доступно только по прямой ссылке">-->
<!--          <Question />-->
<!--        </span>-->
<!--      </div>-->
      <div class="create-ad-form__nav-group">
        <DefaultButton :type="'submit'" class="create-ad-form__button">
          Создать объявление
        </DefaultButton>
        <!-- <Nuxt-link to="" class="create-ad-form__link">
          Предварительный просмотр
        </Nuxt-link> -->
      </div>

      <!-- popup -->
      <DefaultModal
        v-if="openModal"
        :on-close="() => (openModal = !openModal)"
        class="create-ad-form__modal-category"
      >
        <p class="create-ad-form__modal-category-title">Выбрать категорию</p>
        <div class="create-ad-form__modal-category-body">
          <div
            v-for="category in this.category.data"
            :key="category.id"
            @click="
              getCategotyChild(
                category.category_id,
                category.category_name,
                category.photo_url
              )
            "
            class="create-ad-form__modal-category-item"
          >
            <img :src="category.photo_url" :alt="category.photo_url" />
            {{ category.category_name }}
          </div>
        </div>
      </DefaultModal>

      <DefaultModal
        v-if="openCategoryChildModal"
        :on-close="() => (openCategoryChildModal = !openCategoryChildModal)"
        class="create-ad-form__modal-category"
      >
        <p class="create-ad-form__modal-category-child-title">
          Выбрать подкатегорию
        </p>
        <div
          @click="openModalCategory"
          class="create-ad-form__modal-category-back"
        >
          Вернуться к категориям
        </div>
        <div class="create-ad-form__main-category-title">
          <img :src="this.mainCategoryImg" :alt="this.mainCategory" />
          {{ this.mainCategory }}
        </div>
        <div
          v-for="item in this.categoryChild.data.child_categories"
          :key="item.id"
          class="create-ad-form__modal-category-child-item"
        >
          <div
            @click="
              getCategotyFields(item.child_category_name, item.child_category_id)
            "
          >
            {{ item.child_category_name }}
          </div>
        </div>
      </DefaultModal>
    </div>
    <!-- end popup -->
  </form>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import InputMainSelect from "@/components/atoms/inputs/InputMainSelect.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import SelectArrow from "@/assets/images/arrow/arrow_down_select.svg?inline";
import SelectArrowTop from "@/assets/images/arrow/select-arrow-top.svg?inline";
import Question from "@/assets/images/icons/question.svg?inline";
import PlusUpload from "@/assets/images/icons/Add.svg?inline";
import Tags from "@yaireo/tagify/dist/tagify.vue";
import Notification from "@/components/errors/Notification";
import Delete from "@/assets/images/adv/delete.svg?inline";

export default {
  name: "CreateAdForm",
  data() {
    return {
      hashtags: [],
      periodicity: "В день",
      periodicityId: "1",
      periodicityArray: [
        {
          id: 1,
          name: "в день",
        },
        {
          id: 2,
          name: "в неделю",
        },
        {
          id: 3,
          name: "в месяц",
        },
        {
          id: 4,
          name: "в год",
        },
        {
          id: 5,
          name: "на 20 лет",
        },
        {
          id: 6,
          name: "навсегда",
        },
      ],
      selectOpen: false,
      periodicitySelect: false,
      isShowBargaining: true,
      formDataType: {
        performerAdvertiser: null,
      },
      formDataToSend: {
        id: "",
        payment: "",
        executorCompany: null,
        title: "",
        description: "",
        link: 0,
        hashtags: [],
        price: "",
        amount: "",
        length: "",
        width: "",
        video: "",
        reach_audience: "",
        travel_abroad: false,
        ready_for_political_advertising: false,
        photo_report: false,
        make_and_place_advertising: false,
        negotiable: false,
        bargaining: false,
        isHide: false,
        datetime: {
          date_of_the: new Date(),
          date_start: new Date(),
          date_finish: new Date(),
          deadline_date: new Date(),
        },
        position: {
          lat: "",
          lng: "",
        },
      },
      markers: [],
      markerPosition: {
        lat: 33.76,
        lng: -116.4,
      },
      positionLatLng: null,
      negotiated: null,
      file: "",
      files: [],
      user: "",
      userNew: "",
      mainCategory: "Все категории",
      childCategory: "",
      childCategoryId: "",
      mainCategoryId: "",
      category: {},
      categoryChild: {},
      categoryFields: {},
      openModal: false,
      openCategoryChildModal: false,
      error: null,
      mainCategoryImg: "",
      myProfileData: {},
      filePhotos: "file",
      fileUploads: false,
      advId: "",
      errorSizeImg: false,
      limitPhotoErrore: false,
      laodPhotoErrore: false,
      character: 255,
    };
  },
  components: {
    InputText,
    InputCheckbox,
    DefaultButton,
    InputMainSelect,
    DefaultModal,
    SelectArrow,
    InputTextarea,
    Question,
    PlusUpload,
    Tags,
    Notification,
    SelectArrowTop,
    Delete,
  },
  watch: {
    formDataType: {
      deep: true,
      handler() {
        this.categoryFields = [];
        this.category = "";
        this.categoryChild = "";
        this.mainCategory = "Все категории";
        this.mainCategoryImg = "";
      },
    },
  },
  mounted() {
    this.getProfile();
  },
  computed: {
    characters() {
      const { formDataToSend } = this;
      return 255 - (this.character = formDataToSend.title.length);
    },
  },
  methods: {
    async getProfile() {
      try {
        await this.$axios.get("/getProfile").then((res) => {
          this.myProfileData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async handleSubmit() {
      const { formDataToSend } = this;
      const { formDataType } = this;
      let formData = new FormData();
      let images;
      for (var i = 0; i < this.files.length; i++) {
        images = this.files[i];
        formData.append("images[" + i + "]", images);
      }
      formData.append("sample", this.file);
      formData.append("hashtags", this.hashtags);
      formData.append("advertisement_type", formDataType.performerAdvertiser);
      formData.append("person_type", formDataToSend.executorCompany);
      formData.append("category_id", this.mainCategoryId);
      if (this.childCategoryId != undefined) {
        formData.append("child_category_id", this.childCategoryId);
      }
      formData.append("title", formDataToSend.title);
      formData.append("description", formDataToSend.description);
      formData.append("price_type", "1");
      formData.append("currency_id", "1");
      formData.append("price", formDataToSend.price);
      formData.append("payment", this.periodicityId);
      formData.append("reach_audience", formDataToSend.reach_audience);
      formData.append("travel_abroad", formDataToSend.travel_abroad);
      formData.append(
        "ready_for_political_advertising",
        formDataToSend.ready_for_political_advertising
      );
      formData.append("photo_report", formDataToSend.photo_report);
      formData.append(
        "make_and_place_advertising",
        formDataToSend.make_and_place_advertising
      );
      if (formDataToSend.position.lat != "") {
        formData.append("latitude", formDataToSend.position.lat);
      }
      if (formDataToSend.position.lng != "") {
        formData.append("longitude", formDataToSend.position.lng);
      }
      formData.append("amount", formDataToSend.amount);
      formData.append("length", formDataToSend.length);
      formData.append("width", formDataToSend.width);
      formData.append("video", formDataToSend.video);
      formData.append("deadline_date", "");
      formData.append("link_page", "");
      formData.append("negotiable", formDataToSend.negotiable);
      formData.append("bargaining", formDataToSend.bargaining);
      formData.append("is_hide", formDataToSend.isHide);
      if (this.periodicity != "") {
        formData.append("period", this.periodicity);
      }
      formData.append("is_published", true);
      formData.append(
        "date_of_the",
        Date.parse(formDataToSend.datetime.date_of_the) / 1000
      );
      formData.append(
        "date_start",
        Date.parse(formDataToSend.datetime.date_start) / 1000
      );
      formData.append(
        "date_finish",
        Date.parse(formDataToSend.datetime.date_finish) / 1000
      );
      formData.append(
        "deadline_date",
        Date.parse(formDataToSend.datetime.deadline_date) / 1000
      );
      try {
        await this.$axios.post("/storeAdvertisement", formData).then((res) => {
          this.advId = res.data.data.advertisement_id;
        });
        this.$router.push(`/dashboard/ad-promotion/${this.advId}`);
      } catch (e) {
        this.error = e.response.data;
      }
    },
    handleFileUpload() {
      var fileInput = document.querySelector("#file");
      this.file = fileInput.files[0];
      if (this.file != "") {
        this.fileUploads = true;
      }
    },
    handleFilesUploads() {
      let uploadedFiles = this.$refs.files.files;
      if (uploadedFiles.length < 5 && this.files.length < 5) {
        for (var i = 0; i < uploadedFiles.length; i++) {
          let _URL = window.URL || window.webkitURL;
          let file, img;
          file = uploadedFiles[i];
          img = new Image();
          img.onload = function () {
            if (this.width > 450 && this.height > 395) {
            }
          };
          img.src = _URL.createObjectURL(file);
          this.files.push(uploadedFiles[i]);
          this.limitPhotoErrore = false;
        }
        this.getImagePreviews();
      } else this.limitPhotoErrore = true;
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              this.$refs["image" + parseInt(i)][0].src = reader.result;
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.files[i]);
        }
      }
    },
    async getCategoty() {
      const { formDataType } = this;
      const { formDataToSend } = this;
      try {
        await this.$axios
          .get("/getCategoryListForAdvertisement", {
            params: {
              type: formDataType.performerAdvertiser,
              person_type: formDataToSend.executorCompany,
            },
          })
          .then((response) => {
            this.category = response.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getCategotyChild(categoryId, mainCategoryName, mainCategoryImg) {
      this.mainCategoryId = categoryId;
      try {
        await this.$axios
          .get("/getChildCategoryList", {
            params: {
              category_id: categoryId,
            },
          })
          .then((response) => {
            this.categoryChild = response.data;
            if (this.categoryChild.data.child_categories.length === 0) {
              this.getCategotyFields();
            }
          });
        this.mainCategory = mainCategoryName;
        this.mainCategoryImg = mainCategoryImg;
        this.openModal = false;
        this.openCategoryChildModal = true;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    openModalCategory() {
      this.openCategoryChildModal = false;
      this.openModal = true;
      this.getCategoty();
    },
    async getCategotyFields(childCategoryName, childCategoryId) {
      try {
        await this.$axios
          .get("/getCategoryFormFields", {
            params: {
              category_id: this.mainCategoryId,
              child_category_id: childCategoryId,
            },
          })
          .then((response) => {
            this.categoryFields = response.data;
          });
        this.childCategory = childCategoryName;
        this.childCategoryId = childCategoryId;
        this.openModal = false;
        this.openCategoryChildModal = false;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    onTagsChange(e) {
      this.hashtags = e.target.value;
      let newHashtag = this.hashtags.replaceAll('{"value":', " ");
      let newHashtagA = newHashtag.replaceAll("]", "");
      let newHashtagB = newHashtagA.replaceAll("[", "");
      let newHashtagC = newHashtagB.replaceAll("}", "");
      let newHashtagD = newHashtagC.replaceAll('"', "");
      let arrayHashrags = newHashtagD.split(",");
      this.hashtags = arrayHashrags;
    },
    isShowBargainingOn() {
      if (this.isShowBargaining === false) {
        this.isShowBargaining = true;
      } else this.isShowBargaining = false;
    },
    periodicitySelectOpen() {
      if (this.periodicitySelect === false) {
        this.periodicitySelect = true;
        this.selectOpen = true;
      } else {
        this.periodicitySelect = false;
        this.selectOpen = false;
      }
    },
    periodicitySelected(value, id) {
      this.periodicity = value;
      this.periodicityId = id;
      this.periodicitySelect = false;
      this.selectOpen = false;
    },
    addFlieType() {
      this.filePhotos = "file";
    },
    deletePhotos(id) {
      this.filePhotos = "text";
      this.files.splice(id, 1);
    },
    handleSetCoordinates(data) {
      this.formDataToSend.position = data;
    },
    handleSetAddress(address) {
      this.formDataToSend.address = address;
    },
    addMarker(e) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      this.handleSetCoordinates({
        lat,
        lng,
      });
      if (this.handleSetAddress) {
        var responseObj;
        var responseNewObj;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAZ6mJgUpdJNO_WpyynnB-ZTMqFmgKYLJc`
        )
          .then(function (response) {
            return response.text();
          })
          .then((res) => {
            responseObj = JSON.parse(res);
            responseNewObj = responseObj.plus_code.compound_code;
            this.positionLatLng = responseNewObj.slice(9, 150);
            console.log(responseNewObj);
          });
      }
    },
    onMapClick(e) {
      this.markers.push({
        id: 1 + Math.max(0, ...this.markers.map((n) => n.id)),
        position: e.latLng,
      });
    },
    onMarkerClick(e) {
      this.$refs.map.panTo(e.latLng);
    },
  },
};
</script>

<style lang="scss" scoped>
.create-ad-form {
  padding: 30px;

  &__title {
    font-size: $g-second-title-size;
    line-height: 28px;
  }

  &__photos-block,
  &__photos-section {
    display: flex;
  }

  &__photos-section {
    margin-top: 15px;
  }

  &__photos-section img {
    margin-right: 15px;
  }

  &__question-mobile {
    display: none;
  }

  &__photos {
    display: flex;
    border: 1px solid $mainFourthColor;
    width: 133px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 30px 0 0;

    img {
      width: 133px;
      height: 90px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__block-title {
    padding: 0 0 10px 0;
  }

  &__block-hashtags {
    padding: 30px 0 5px 0;
  }

  &__address {
    background: #eeeeee;
    border: 1px solid $mainFourthColor;
    padding: 15px 10px;
    color: $mainFifthColor;
    width: 362px;
    margin-top: 20px;
  }

  &__address-block {
    background: #eeeeee;
    border: 1px solid $mainFourthColor;
    padding: 15px 10px;
    color: $mainFifthColor;
    width: 362px;
    margin-top: 20px;
  }

  &__block {
    padding-top: 30px;

    /deep/.textarea-input {
      max-width: 362px;
    }

    label {
      display: inline-block;
    }
  }

  &__block-link {
    display: flex;
    align-items: center;

    svg {
      margin-left: 10px;
    }
  }

  &__map {
    margin-top: 25px;
  }

  &__map-title {
    font-size: $g-mobile-size;
    padding-bottom: 15px;
  }

  &__hashtags-section {
    border: 1px solid $mainFourthColor;
    min-height: 50px;
  }

  /deep/.create-ad-form__hashtags {
    margin-top: 15px;
    width: 460px;
    min-height: 75px;
  }

  &__category {
    border: 1px solid $mainFourthColor;
    background: $mainSecondColor;
    padding: 13px 11px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 362px;

    &:hover {
      cursor: pointer;
    }
  }

  &__category-new {
    display: flex;
    align-items: center;
    margin-top: 20px;

    img {
      margin-right: 10px;
    }
  }

  &__category-img {
    width: 44px;
  }

  &__placeholder {
    color: $mainFifthColor;
    padding-top: 5px;
    font-size: $g-mobile-size;
  }

  &__button {
    background: $mainColor;
    width: 264px;
    margin-right: 30px;
  }

  &__block-price-title {
    padding-bottom: 10px;
  }

  &__radio {
    width: 180px;
    display: inline-block;
  }

  &__modal-category {
    /deep/.modal-container {
      width: 768px;
    }
  }

  &__modal-category-title {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 25px;
  }

  &__modal-category-child-title {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 15px;
  }

  &__modal-category-body {
    display: flex;
    flex-wrap: wrap;
  }

  &__modal-category-item {
    width: 115px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      cursor: pointer;
    }

    img {
      width: 68px;
      margin-bottom: 10px;
    }
  }

  &__modal-category-back {
    color: $mainColor;
    padding-bottom: 25px;

    &:hover {
      cursor: pointer;
    }
  }

  &__modal-category-child-item {
    padding-bottom: 15px;

    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__nav-group {
    display: flex;
    align-items: center;
    padding-top: 30px;
  }

  &__field-title-price {
    margin-bottom: 10px;
  }

  &__link {
    color: $mainColor;
  }

  &__main-category-title {
    padding-bottom: 50px;
    display: flex;
    align-items: center;

    img {
      width: 68px;
      height: 68px;
      margin-right: 10px;
    }
  }

  &__field-title {
    font-size: $g-mobile-size;
    line-height: 14px;
    padding-bottom: 10px;
  }

  &__field-hint {
    font-size: $g-mobile-size;
    line-height: 14px;
    color: $mainFifthColor;
    padding-top: 10px;
  }

  &__file-upload {
    background: $mainColor;
    color: $mainSecondColor !important;
    font-weight: bold;
    padding: 10px 30px;
    z-index: 10;
    position: relative;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__file-block {
    position: relative;

    /deep/input {
      position: absolute;
      left: 15px;
    }
  }

  &__section-price {
    display: flex;
    padding-bottom: 30px;

    div {
      margin-right: 30px;
    }
  }

  &__photos-pre {
    position: relative;
    img {
      max-width: 133px;
      height: 90px;
    }

    &:hover {
      .create-ad-form__photos-background {
        display: block;
      }
    }
  }

  &__field-title-sempl {
    margin-bottom: 15px;
    font-size: $g-mobile-size;
  }

  &__select-form {
    background: #ffffff;
    border: 1px solid $mainFourthColor;
    padding: 10px;
    max-width: 362px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
    }
  }

  &__select-body {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 10px;
    width: 362px;
    position: absolute;
    z-index: 1;

    div {
      padding: 5px 0;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__photos-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: none;

    &:hover {
      cursor: pointer;
    }
  }

  &__file-upload-secsesful {
    padding: 20px 0;
  }

  &__photos-errore {
    color: red;
  }

  &__question {
    display: inline-block;
    margin-left: 5px;

    &:hover {
      cursor: help;
    }
  }
}

@media (max-width: $break-xlg) {
  .create-ad-form {
    padding: 25px 5px;

    &__modal-category {
      /deep/.close-modal-btn {
        top: 15px !important;
        right: 10px !important;
      }
    }

    &__question {
      position: relative;
      &:hover {
        .create-ad-form__question-mobile {
          position: absolute;
          display: block;
          background: #fff;
          bottom: 110%;
          width: 45vw;
          left: -30vw;
          color: black;
          padding: 10px;
          background: #D4E3F6;
        }
      }
    }

    &__photos {
      width: 110px;
      height: 75px;
    }

    &__photos-section {
      flex-wrap: wrap;
    }

    &__photos-pre {
      margin-top: 10px;
      img {
        max-width: 110px;
        height: 75px;
      }
    }
  }
}

@media (max-width: $break-sm) {
  .create-ad-form {
    width: 100%;
    &__modal-category {
      /deep/.modal-container {
        padding: 19px 7px;
        width: 100%;
        height: 100vh;
        overflow-x: scroll;
      }
      /deep/.close-modal-btn {
        top: 15px !important;
        right: 10px !important;
      }
      &-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 5px;

        img {
          width: 23px;
          margin: auto 15px auto 0;
        }
      }
    }

    &__photos {
      width: 96px;
      height: 65px;
    }

    &__photos-pre {
      margin-top: 10px;
      img {
        max-width: 96px;
        height: 65px;
      }
    }

    &__block {
      padding-top: 15px;
    }
  }
}
</style>
