<template>
  <form
    class="edit-ad-form"
    @submit.prevent="handleSubmit"
    v-if="this.advEditListUser.advertisement != null"
  >
    <div class="edit-ad-form__title">Редактирование объявления</div>
    <div class="edit-ad-form__block">
      <div class="edit-ad-form__block-title">
        Разместить как
        <span> * </span>
      </div>
      <div>
        <label for="private_person" class="edit-ad-form__radio">
          <input
            type="radio"
            value="private_person"
            id="private_person"
            v-model="formDataToSend.executorCompany"
            disabled
          />
          Частное лицо
        </label>
        <label for="comany" class="edit-ad-form__radio">
          <input
            type="radio"
            value="company"
            id="comany"
            v-model="formDataToSend.executorCompany"
            disabled
          />
          Компания
        </label>
      </div>
    </div>
    <div class="edit-ad-form__block">
      <div class="edit-ad-form__block-title">
        Разместить как
        <span> * </span>
      </div>
      <div>
        <label for="performer" class="edit-ad-form__radio">
          <input
            type="radio"
            value="performer"
            id="performer"
            v-model="formDataToSend.performerAdvertiser"
            disabled
          />
          Исполнитель
        </label>
        <label for="employer" class="edit-ad-form__radio">
          <input
            type="radio"
            value="employer"
            id="employer"
            v-model="formDataToSend.performerAdvertiser"
            disabled
          />
          Рекламодатель
        </label>
      </div>
    </div>
    <div class="edit-ad-form__block">
      <InputText
        :set-value="formDataToSend"
        :id="'title'"
        :label="'title'"
        :type="'text'"
        :placeholder="this.advEditListUser.advertisement.title"
      />
      <div class="edit-ad-form__placeholder">255 знаков осталось</div>
    </div>
    <div class="edit-ad-form__block">
      <div class="edit-ad-form__category">
        {{ this.advEditListUser.advertisement.category.category_name }}
        {{
          this.advEditListUser.advertisement.child_category.child_category_name
        }}
      </div>
    </div>
    <div class="edit-ad-form__map">
      <div class="edit-ad-form__map-title">
        Выберите местоположение на карте
      </div>
      <GmapMap
        :center="{
          lat: +this.advEditListUser.advertisement.latitude,
          lng: +this.advEditListUser.advertisement.longitude,
        }"
        :zoom="5"
        map-type-id="terrain"
        style="width: 660px; height: 400px"
        @click="addMarker"
        :marker-position="formDataToSend.position"
        :handle-set-coordinates="handleSetCoordinates"
        :handle-set-address="handleSetAddress"
      >
        <GmapMarker
          v-if="formDataToSend.position"
          :position="formDataToSend.position"
        />
      </GmapMap>
      <Notification :message="error['latitude']" v-if="error" />
      <Notification :message="error['longitude']" v-if="error" />
    </div>
    <div class="edit-ad-form__address-block">
      <div class="edit-profile__address" v-if="this.positionLatLng == null">
        <span>{{ this.advEditListUser.advertisement.country }},</span>
        <span>{{ this.advEditListUser.advertisement.region }},</span>
        <span>{{ this.advEditListUser.advertisement.city }}</span>
      </div>
      {{ this.positionLatLng }}
    </div>
    <div
      class="edit-ad-form__block"
      v-for="field in this.advEditListUser.formFields"
      :key="field.id"
    >
      <div v-if="field.price != null">
        <div
          v-if="field.price.type === 'number'"
          class="edit-ad-form__field-title"
        >
          <div class="edit-ad-form__field-title-price">
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
        <div class="edit-ad-form__section-price">
          <div @click="isShowBargainingOn">
            <div
              v-if="field.negotiable.type === 'text'"
              class="edit-ad-form__field-title"
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
              class="edit-ad-form__field-title"
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
      </div>
      <div v-if="field.payment != null">
            <div
              v-if="field.payment.type === 'select'"
              class="edit-ad-form__field-title payment"
            >
              {{ field.payment.name }}
            </div>
            <div
              v-if="field.payment.type === 'select'"
              class="edit-ad-form__select-form"
              @click="periodicitySelectOpen()"
            >
              {{ periodicity }}
              <SelectArrow v-if="!selectOpen" />
              <SelectArrowTop v-if="selectOpen" />
            </div>
            <div
              v-if="field.payment.type === 'select' && periodicitySelect"
              class="edit-ad-form__select-body"
            >
              <div v-for="period in periodicityArray" :key="period.id">
                <div @click="periodicitySelected(period.name, period.id)">
                  {{ period.name }}
                </div>
              </div>
            </div>
          </div>
      <div v-if="field.type === 'hashtags'" class="edit-ad-form__field-title">
        {{ field.name }}
        <div class="edit-ad-form__field-hint">
          {{ field.hint }}
        </div>
        <Tags
          :onChange="onTagsChange"
          class="edit-ad-form__hashtags"
          :value="advEditListUser.advertisement.hashtags"
        />
      </div>
      <div v-if="field.type === 'text'" class="edit-ad-form__field-title">
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
      <div v-if="field.type === 'text'" class="edit-ad-form__field-hint">
        {{ field.hint }}
      </div>
      <div v-if="field.type === 'number'" class="edit-ad-form__field-title">
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
      <div v-if="field.type === 'number'" class="edit-ad-form__field-hint">
        {{ field.hint }}
      </div>
      <InputCheckbox
        v-if="field.type === 'checkbox' && field.is_show === true"
        :set-value="formDataToSend"
        :id="field.key"
        :label="field.name"
      />
      <div v-if="field.type === 'checkbox'" class="edit-ad-form__field-hint">
        {{ field.hint }}
      </div>
      <div v-if="field.type === 'textarea'" class="edit-ad-form__field-title">
        {{ field.name }}
      </div>
      <InputTextarea
        v-if="field.type === 'textarea'"
        :set-value="formDataToSend"
        :id="field.key"
        :label="field.name"
        :placeholder="field.name"
      />
      <div v-if="field.type === 'textarea'" class="edit-ad-form__field-hint">
        {{ field.hint }}
      </div>
      <div v-if="field.type === 'datetime'" class="edit-ad-form__field-title">
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

      <div v-if="field.type === 'datetime'" class="edit-ad-form__field-hint">
        {{ field.hint }}
      </div>
      <div class="edit-ad-form__file" v-if="field.type === 'file'">
        <div
          v-if="field.type === 'file'"
          class="edit-ad-form__field-title-sempl"
        >
          {{ field.name }}
        </div>
        <div class="edit-ad-form__file-update">
          <div>
            <label class="edit-ad-form__file-block">
              <span class="edit-ad-form__file-upload">Загрузить</span>
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-ad-form__block">
      Фото*
      <div class="edit-ad-form__block edit-ad-form__block-photo">
        <label>
          <input
            :type="this.filePhotos"
            id="files"
            ref="files"
            multiple
            v-on:change="handleFilesUploads()"
            hidden
            accept="image/jpeg, image/png"
          />
          <div class="edit-ad-form__photos-section">
            <div
              v-for="(file, key) in files"
              :key="file.id"
              class="edit-ad-form__photos-pre"
            >
              <img v-bind:ref="'image' + parseInt(key)" />
              <div class="edit-ad-form__photos-background">
                <div
                  @click="deletePhotos(key)"
                  class="edit-ad-form__photos-delete"
                >
                  <Delete />
                </div>
              </div>
            </div>
            <div
              class="edit-ad-form__photos-block"
              v-for="photo in this.advEditListUser.advertisement
                .additional_photos"
              :key="photo.id"
            >
              <div class="edit-ad-form__photos">
                <div class="edit-ad-form__photos-background">
                  <div>
                    <Upload />
                  </div>
                  <div
                    @click="deleteAdditionalPhotoProfile(photo.id)"
                    class="edit-ad-form__photos-delete"
                  >
                    <Delete />
                  </div>
                </div>
                <img :src="photo.photo_url" alt="photo" />
              </div>
            </div>
            <span v-if="this.advEditListUser.advertisement">
              <div
                class="edit-ad-form__photos"
                v-if="
                  this.files.length < 10 &&
                  this.advEditListUser.advertisement.length < '9'
                "
                @click="addFlieType"
              >
                <PlusUpload />
              </div>
            </span>
            <div
              class="edit-ad-form__photos"
              v-if="
                this.files.length < 10 &&
                this.advEditListUser.advertisement.length == false
              "
              @click="addFlieType"
            >
              <PlusUpload />
            </div>
          </div>
        </label>
      </div>
      <Notification :message="this.errorDelete['images']" v-if="errorDelete" />
      <!-- <label>
        <input
          type="file"
          id="files"
          ref="files"
          multiple
          v-on:change="handleFilesUploads()"
          hidden
        />
        <div class="edit-ad-form__photos-section">
          <div
            v-for="(file, key) in files"
            :key="file.id"
            class="edit-ad-form__photos-pre"
          >
            <img v-bind:ref="'image' + parseInt(key)" />
          </div>
          <div
            v-for="photos in this.advEditListUser.advertisement
              .additional_photos"
            :key="photos.id"
          >
            <img :src="photos.photo_url" alt="" />
          </div>
          <div class="edit-ad-form__photos">
            <PlusUpload />
          </div>
        </div>
      </label> -->
    </div>
    <div class="edit-ad-form__block edit-ad-form__block-link">
      <InputCheckbox
        :set-value="formDataToSend"
        :id="'isHide'"
        :label="'Доступ по ссылке'"
      />
      <span title="доступ к скрытому обьявлению">
        <Question />
      </span>
    </div>
    <div class="edit-ad-form__nav-group">
      <DefaultButton :type="'submit'" class="edit-ad-form__button">
        Далее
      </DefaultButton>
      <!-- <Nuxt-link to="" class="edit-ad-form__link">
        Предварительный просмотр
      </Nuxt-link> -->
    </div>

    <Notification :message="error" v-if="error" />
  </form>
</template>

<script>
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import InputMainSelect from "@/components/atoms/inputs/InputMainSelect.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Question from "@/assets/images/icons/question.svg?inline";
import PlusUpload from "@/assets/images/icons/plus-upload.svg?inline";
import Tags from "@yaireo/tagify/dist/tagify.vue";
import Notification from "@/components/errors/Notification";
import Delete from "@/assets/images/adv/delete.svg?inline";
import Upload from "@/assets/images/adv/upload.svg?inline";

export default {
  name: "editAdForm",
  data() {
    return {
      hashtags: [],
      isShowBargaining: true,
      periodicitySelect: false,
      periodicity: "",
      selectOpen: false,
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
      formDataToSend: {
        id: "",
        performerAdvertiser: "",
        executorCompany: "",
        title: "",
        description: "",
        link: "",
        hashtags: [],
        price: "",
        amount: "",
        length: "",
        width: "",
        isHide: false,
        reach_audience: "",
        travel_abroad: false,
        ready_for_political_advertising: false,
        photo_report: false,
        make_and_place_advertising: false,
        negotiable: false,
        bargaining: false,
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
      errorDelete: null,
      advEditListUser: {},
      markers: [],
      myProfileData: {},
      markerPosition: {
        lat: 33.76,
        lng: -116.4,
      },
      positionLatLng: null,
      files: [],
      filePhotos: "file",
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
    Upload,
    Delete,
  },
  mounted() {
    this.editAdvertisement();
  },
  methods: {
    async editAdvertisement() {
      try {
        await this.$axios
          .get("/editAdvertisement", {
            params: {
              advertisement_id: this.$route.params.edit,
            },
          })
          .then((res) => {
            this.advEditListUser = res.data.data;
            this.formDataToSend.title =
              this.advEditListUser.advertisement.title;
            this.formDataToSend.description =
              this.advEditListUser.advertisement.description;
            this.formDataToSend.price =
              this.advEditListUser.advertisement.price;
            this.formDataToSend.amount =
              this.advEditListUser.advertisement.amount;
            this.formDataToSend.performerAdvertiser =
              this.advEditListUser.advertisement.advertisement_type;
            this.formDataToSend.length =
              this.advEditListUser.advertisement.length;
            this.formDataToSend.width =
              this.advEditListUser.advertisement.width;
            this.formDataToSend.executorCompany =
              this.advEditListUser.advertisement.person_type;
            this.formDataToSend.ready_for_political_advertising =
              this.advEditListUser.advertisement.ready_for_political_advertising;
            this.formDataToSend.make_and_place_advertising =
              this.advEditListUser.advertisement.make_and_place_advertising;
            this.formDataToSend.photo_report =
              this.advEditListUser.advertisement.photo_report;
            this.formDataToSend.travel_abroad =
              this.advEditListUser.advertisement.travel_abroad;
            this.formDataToSend.hashtags =
              this.advEditListUser.advertisement.hashtags;
            this.formDataToSend.reach_audience =
              this.advEditListUser.advertisement.reach_audience;
          });
        this.formDataToSend.position.lat =
          +this.advEditListUser.advertisement.latitude;
        this.formDataToSend.position.lng =
          +this.advEditListUser.advertisement.longitude;
      } catch (e) {
        this.error = e.response.data;
      }
      this.getPayment();
    },
    getPayment() {
      this.periodicityId = +this.advEditListUser.advertisement.payment;
      this.periodicity = this.periodicityArray.find(payment => payment.id === +this.advEditListUser.advertisement.payment).name;
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
    async handleSubmit() {
      const { formDataToSend } = this;
      let formData = new FormData();
      let images;
      for (var i = 0; i < this.files.length; i++) {
        images = this.files[i];
        formData.append("images[" + i + "]", images);
      }
      for (
        var i = 0;
        i < this.advEditListUser.advertisement.additional_photos;
        i++
      ) {
        images = this.advEditListUser.advertisement.additional_photos[i];
        formData.append("images[" + i + "]", images);
      }
      if (this.hashtags != undefined) {
        formData.append("hashtags", this.hashtags);
      }
      if (this.hashtags == "") {
        formData.append(
          "hashtags",
          this.advEditListUser.advertisement.hashtags
        );
      }
      formData.append("person_type", formDataToSend.executorCompany);
      formData.append("category_id", this.mainCategoryId);
      if (this.childCategoryId != undefined) {
        formData.append("child_category_id", this.childCategoryId);
      }
      formData.append("advertisement_id", this.$route.params.edit);
      formData.append("title", formDataToSend.title);
      formData.append("description", formDataToSend.description);
      formData.append("price_type", "1");
      formData.append("currency_id", "1");
      formData.append("video_url", "1");
      formData.append("price", formDataToSend.price);
      formData.append("payment", this.periodicityId);
      formData.append("is_hide", "0");
      if (formDataToSend.position.lat != "") {
        formData.append("latitude", formDataToSend.position.lat);
      }
      if (formDataToSend.position.lng != "") {
        formData.append("longitude", formDataToSend.position.lng);
      }
      if (formDataToSend.reach_audience != undefined) {
        formData.append("reach_audience", formDataToSend.reach_audience);
      }
      if (formDataToSend.travel_abroad != undefined) {
        formData.append("travel_abroad", formDataToSend.travel_abroad);
      }
      formData.append(
        "ready_for_political_advertising",
        formDataToSend.ready_for_political_advertising
      );
      if (formDataToSend.photo_report != undefined) {
        formData.append("photo_report", formDataToSend.photo_report);
      }
      formData.append(
        "make_and_place_advertising",
        formDataToSend.make_and_place_advertising
      );
      if (formDataToSend.amount !== undefined) {
        formData.append("amount", formDataToSend.amount);
      }
      if (formDataToSend.length != undefined) {
        formData.append("length", formDataToSend.length);
      }
      if (formDataToSend.width != undefined) {
        formData.append("width", formDataToSend.width);
      }
      formData.append("video", "");
      formData.append("deadline_date", "");
      formData.append("sample", "");
      formData.append("link_page", "");
      formData.append("negotiable", formDataToSend.negotiable);
      formData.append("bargaining", formDataToSend.bargaining);
      formData.append("is_hide", formDataToSend.isHide);
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
        await this.$axios.post("/updateAdvertisement", formData).then((res) => {
          this.advId = res.data.data.advertisement_id;
        });
        this.$router.push(`/dashboard/ad-promotion/${this.advId}`);
      } catch (e) {
        this.error = e.response.data;
      }
    },
    isShowBargainingOn() {
      if (this.isShowBargaining === false) {
        this.isShowBargaining = true;
      } else this.isShowBargaining = false;
    },
    onTagsChange(e) {
      this.hashtags = e.target.value;
      var newHashtag = this.hashtags.replaceAll('{"value":', " ");
      var newHashtagA = newHashtag.replaceAll("]", "");
      var newHashtagB = newHashtagA.replaceAll("[", "");
      var newHashtagC = newHashtagB.replaceAll("}", "");
      var newHashtagD = newHashtagC.replaceAll('"', "");
      var arrayHashrags = newHashtagD.split(",");
      this.hashtags = arrayHashrags;
    },
    handleFilesUploads() {
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      this.getImagePreviews();
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
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
            this.positionLatLng = responseNewObj.slice(7, 150);
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
    async deletePhotoCompany() {
      try {
        await this.$axios.delete("/deleteCompanyMainPhoto");
        this.getCompany();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    deletePhotoPrev() {
      this.imagePreview = null;
      this.uploadPhotoLoad = true;
    },
    async deleteAdditionalPhotoProfile(idPhoto) {
      this.filePhotos = "text";
      try {
        await this.$axios.delete("/deleteAdvertisementAdditionalPhoto", {
          params: {
            advertisement_id: this.$route.params.edit,
            photo_id: idPhoto,
          },
        });
        this.editAdvertisement();
        this.filePhotos = "file";
      } catch (e) {
        this.errorDelete = e.response.data;
      }
    },
    addFlieType() {
      this.filePhotos = "file";
    },
    deletePhotos(id) {
      this.filePhotos = "text";
      this.files.splice(id, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-ad-form {
  width: 80%;
  padding: 30px;

  &__title {
    font-size: $g-second-title-size;
    line-height: 28px;
  }

  &__field-title {
    font-size: $g-mobile-size;
    line-height: 14px;
    padding-bottom: 10px;

    &.payment {
      padding-top: 20px;
    }
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

  &__photos-block,
  &__photos-section {
    display: flex;
    flex-wrap: wrap;
  }

  &__photos-section {
    margin-top: 15px;
  }

  &__photos-section img {
    margin-right: 15px;
    max-width: 133px;
  }

  &__photos {
    position: relative;
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

  &__photos {
    &:hover .edit-ad-form__photos-background {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 15px;
    }
  }

  &__block-title {
    padding: 0 0 10px 0;
  }

  &__block-hashtags {
    padding: 30px 0 5px 0;
  }

  &__block {
    padding-top: 30px;

    /deep/.textarea-input {
      max-width: 362px;
    }
    span {
      color: red;
    }
  }

  &__block-link {
    display: flex;
    align-items: center;

    svg {
      margin-left: 10px;
    }
  }

  &__hashtags-section {
    border: 1px solid $mainFourthColor;
    min-height: 50px;
  }

  /deep/.edit-ad-form__hashtags {
    margin-top: 15px;
    width: 460px;
    height: 75px;
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
      cursor: not-allowed;
    }
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
  }

  &__map {
    margin-top: 25px;
  }

  &__map-title {
    font-size: $g-mobile-size;
    padding-bottom: 15px;
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

    div {
      margin-right: 30px;
    }
  }

  &__photos-pre {
    margin: 10px 30px 25px 0;
    height: 90px;
    position: relative;

    img {
      max-height: 90px;
      max-width: 133px;
    }

    &:hover {
      .edit-ad-form__photos-background {
        display: block;
      }
    }
  }
  &__block-photo {
    width: 100%;
  }

  &__photos-background {
    display: none;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
    border: 1px solid #dadada;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__field-title-sempl {
    margin-bottom: 15px;
    font-size: $g-mobile-size;
  }

  &__photos-delete {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media (max-width: $break-xlg) {
  .edit-ad-form {
    padding: 25px 5px;

    &__modal-category {
      /deep/.close-modal-btn {
        top: 15px !important;
        right: 10px !important;
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
  .edit-ad-form {
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
