<template>
  <form class="create-company-form" @submit.prevent="handleSubmit">
    <div v-if="this.myProfileData.has_company != null">
      <div
        class="create-company-form__title"
        v-if="this.myProfileData.has_company === false"
      >
        Создать компанию
      </div>
      <div
        class="create-company-form__title"
        v-if="this.myProfileData.has_company === true"
      >
        Редактировать компанию
      </div>
    </div>
    <div class="create-company-form__block">
      <InputText
        :set-value="formDataToSend"
        :id="'companyName'"
        :label="'companyName'"
        :type="'text'"
        :placeholder="this.myCompanyData.name || 'Название компании*'"
      />
      <Notification :message="error['name']" v-if="error" />
      <div class="create-company-form__hint">255 знаков осталось</div>
      <div class="create-company-form__block">
        <div class="create-company-form__block-title">Логотип</div>
        <div class="create-company-form__photo-update">
          <div>
            <img
              v-if="this.imagePreview === '' && this.myCompanyData.logo"
              :src="this.myCompanyData.logo"
              alt="company"
              class="create-company-form__photo-update-preview"
            />
            <img
              v-bind:src="this.imagePreview"
              v-show="this.showPreview"
              class="create-company-form__photo-update-preview-create"
            />
          </div>
          <div>
            <DefaultCompany
              v-if="
                this.myCompanyData.logo == undefined && this.imagePreview === ''
              "
            />
          </div>
          <div>
            <label class="create-company-form__photo-block">
              <span class="create-company-form__photo-upload">Загрузить</span>
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
                accept="image/jpeg, image/png"
              />
            </label>
            <span
              v-if="this.myCompanyData.photo != null"
              class="create-company-form__photo-delete"
              @click="deletePhotoCompany"
            >
              Удалить фото
            </span>
            <span
              @click="deletePhotoPrev"
              class="create-company-form__photo-delete"
            >
              Удалить фото
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="create-company-form__photo">
      <div class="create-company-form__block-title">Фото компании</div>
      <div class="create-company-form__hint">
        Профили с фотографиями пользуются большим доверием
      </div>
      <div class="create-company-form__block create-company-form__block-photo">
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
          <div class="create-company-form__photos-section">
            <div
              v-for="(file, key) in files"
              :key="file.id"
              class="create-company-form__photos-pre"
            >
              <img v-bind:ref="'image' + parseInt(key)" />
              <div class="create-company-form__photos-background">
                <div
                  @click="deletePhotos(key)"
                  class="create-company-form__photos-delete"
                >
                  <Delete />
                </div>
              </div>
            </div>
            <div
              class="create-company-form__photos-block"
              v-for="photo in myCompanyData.additional_photos"
              :key="photo.id"
            >
              <div class="create-company-form__photos">
                <div class="create-company-form__photos-background">
                  <div>
                    <Upload />
                  </div>
                  <div
                    @click="deleteAdditionalPhotoProfile(photo.image_id)"
                    class="create-company-form__photos-delete"
                  >
                    <Delete />
                  </div>
                </div>
                <img :src="photo.photo_url" alt="photo" />
              </div>
            </div>
            <span v-if="myCompanyData.additional_photos">
              <div
                class="create-company-form__photos"
                v-if="
                  this.files.length < 10 &&
                  myCompanyData.additional_photos.length < '9'
                "
                @click="addFlieType"
              >
                <PlusUpload />
              </div>
            </span>
            <div
              class="create-company-form__photos"
              v-if="
                this.files.length < 10 &&
                this.myProfileData.has_company == false
              "
              @click="addFlieType"
            >
              <PlusUpload />
            </div>
          </div>
        </label>
        <Notification :message="error['images']" v-if="error" />
      </div>
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Описание*</div>
      <InputTextarea
        :set-value="formDataToSend"
        :id="'description'"
        :label="'description'"
        :placeholder="this.myCompanyData.description || 'Введите текст'"
      />
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Сайт</div>
      <InputText
        :set-value="formDataToSend"
        :id="'siteUrl'"
        :label="'siteUrl'"
        :type="'text'"
        :placeholder="'https://advon.me'"
      />
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Хештеги компании</div>
      <div class="create-company-form__block-second-title">
        Введите названия компаний, чьё внимание вы хотели бы обратить на это
        объявление
      </div>
      <div class="create-company-form__hashtags-block">
        <Tags
          :onChange="onTagsChange"
          class="create-company-form__hashtags"
          :value="this.myCompanyData.hashtags"
        />
        <Notification :message="error['hashtags']" v-if="error" />
      </div>
      <div class="create-company-form__block-second-title">
        Ожидаемый результат: Введите хэштеги вашей компании через запятую или
        пробел (без символа #). Вы сможете увидеть заинтересованных людей в
        рекламе вашей компании.
      </div>
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Ссылка на видео</div>
      <InputText
        :set-value="formDataToSend"
        :id="'videoUrl'"
        :label="'videoUrl'"
        :type="'text'"
        :placeholder="'https://advon.me'"
      />
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Аудио реклама</div>
      <label for="fileAudio">
        <div class="create-company-form__add-audio">
          Загрузить
          <input
            type="file"
            id="fileAudio"
            ref="fileAudio"
            hidden
            v-on:change="handleFileAudioUploads()"
            accept=".mp3"
          />
        </div>
      </label>
      <div class="create-company-form__block-second-title">
        Загрузка mp3 сэмпла. Максимальный размер файла 15 MB.
      </div>
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">
        Документ, подтверждающий, что вы имеет отношнение к компании
      </div>
      <label for="fileDocument">
        <div class="create-company-form__add-document">
          Загрузить
          <input
            type="file"
            id="fileDocument"
            ref="fileDocument"
            v-on:change="handleFileUploadDocument()"
            hidden
          />
        </div>
      </label>
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-big-title">Контакты</div>
      <GmapMap
        :center="{ lat: 48, lng: 35 }"
        :zoom="5"
        map-type-id="terrain"
        style="width: 460px; height: 250px"
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
    </div>
    <div class="create-company-form__block" v-if="this.positionLatLng != null">
      <div class="create-company-form__block-title">Адрес</div>
      <div v-if="this.positionLatLng == null">
        <span>{{ this.myCompanyData.country }}</span>
        <span>{{ this.myCompanyData.region }}</span>
        <span>{{ this.myCompanyData.city }}</span>
      </div>
      {{ this.positionLatLng }}
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Телефон компании</div>
      <InputText
        :set-value="formDataToSend"
        :id="'phone'"
        :label="'phone'"
        :type="'number'"
        :placeholder="this.myCompanyData.phone || 'Номер телефона без +'"
      />
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Дополнительный телефон</div>
      <InputText
        :set-value="formDataToSend"
        :id="'phoneExtra'"
        :label="'phoneExtra'"
        :type="'number'"
        :placeholder="'Номер телефона без +'"
      />
    </div>
    <div class="create-company-form__more-contacts-block">
      <div class="create-company-form__section-title">Eще контакты</div>
      <div class="create-company-form__more-contacts">
        <div class="create-company-form__social-select" @click="openContacts">
          <div class="create-company-form__social-select-left">
            <Facebook
              class="create-company-form__social-facebook"
              v-if="this.contactsPhoto === ''"
            />
            <img
              :src="this.contactsPhoto"
              alt="social"
              v-if="this.contactsPhoto !== ''"
            />
            <span>{{ this.contactsOption }}</span>
          </div>
          <SelectArrow />
        </div>
        <div
          v-if="openSelectContacts"
          class="
            create-company-form__social-open-list
            create-company-form__social-open-list-contacts
          "
        >
          <div
            v-for="contact in this.contacts"
            :key="contact.id"
            @click="
              addOptionContacts(contact.name, contact.id, contact.photo_url)
            "
          >
            <img :src="contact.photo_url" alt="contact" />
            {{ contact.name }}
          </div>
        </div>
        <InputText
          :set-value="formDataToSend"
          :id="'contacts'"
          :label="'contacts'"
          :type="'contacts'"
          :placeholder="'Юзернейм'"
        />
      </div>
    </div>
    <div class="create-company-form__block">
      <div class="create-company-form__block-title">Электронная почта</div>
      <InputText
        :set-value="formDataToSend"
        :id="'email'"
        :label="'email'"
        :type="'email'"
        :placeholder="'Введите емейл'"
      />
    </div>
    <div class="create-company-form__more-contacts-block">
      <div class="create-company-form__section-title">Социальные сети</div>
      <div class="create-company-form__more-contacts">
        <div class="create-company-form__social-select" @click="openSocial">
          <div class="create-company-form__social-select-left">
            <Facebook
              class="create-company-form__social-facebook"
              v-if="this.socialPhoto === ''"
            />
            <img
              :src="this.socialPhoto"
              alt="social"
              v-if="this.socialPhoto !== ''"
            />
            <span>{{ this.contactOption }}</span>
          </div>
          <SelectArrow />
        </div>
        <div
          v-if="openSelectSocial"
          class="create-company-form__social-open-list"
        >
          <div
            v-for="social in this.social"
            :key="social.id"
            @click="addOptionSocial(social.name, social.id, social.photo_url)"
          >
            <img :src="social.photo_url" alt="social" />
            {{ social.name }}
          </div>
        </div>
        <InputText
          :set-value="formDataToSend"
          :id="'socialContact'"
          :label="'socialContact'"
          :type="'socialContact'"
          :placeholder="'Юзернейм'"
        />
      </div>
    </div>
    <DefaultButton :type="'submit'" class="create-company-form__button-create">
      Сохранить
    </DefaultButton>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import InputRadio from "@/components/atoms/inputs/InputRadio.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import InputMainSelect from "@/components/atoms/inputs/InputMainSelect.vue";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import PlusUpload from "@/assets/images/icons/plus-upload.svg?inline";
import Tags from "@yaireo/tagify/dist/tagify.vue";
import Delete from "@/assets/images/adv/delete.svg?inline";
import Upload from "@/assets/images/adv/upload.svg?inline";
import DefaultCompany from "@/assets/images/default-company.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Notification from "@/components/errors/Notification";

export default {
  name: "CreateCompany",
  data() {
    return {
      hashtags: "",
      formDataToSend: {
        companyName: "",
        description: "",
        siteUrl: "",
        videoUrl: "",
        phone: "",
        phoneExtra: "",
        email: "",
        socialContact: "",
        contacts: "",
        position: {
          lat: "",
          lng: "",
        },
      },
      myCompanyData: {},
      myProfileData: {},
      file: "",
      fileAudio: "",
      fileDocument: "",
      files: [],
      filePhotos: "file",
      contactOption: "Facebook",
      contactOptionId: [],
      contactOptionIdSocial: [],
      contactOptionIdContacts: [],
      openSelectSocial: false,
      openSelectContacts: false,
      social: {},
      socialId: "",
      contactsId: "",
      socialValue: "",
      contactsValue: "",
      socialPhoto: "",
      contsctlId: "",
      contactsOption: "Facebook",
      contactsPhoto: "",
      markers: [],
      markerPosition: {
        lat: 33.76,
        lng: -116.4,
      },
      positionLatLng: null,
      showPreview: false,
      imagePreview: "",
      uploadPhotoLoad: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  mounted() {
    this.getCompany();
    this.getProfile();
    this.getSocial();
    this.getContacts();
  },
  components: {
    InputRadio,
    InputText,
    InputCheckbox,
    DefaultButton,
    InputMainSelect,
    DefaultModal,
    InputTextarea,
    PlusUpload,
    Tags,
    Upload,
    Delete,
    DefaultCompany,
    Facebook,
    SelectArrow,
    Notification,
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
      if (this.myProfileData.has_company === false) {
        const { formDataToSend } = this;
        let formData = new FormData();
        this.socialValue = formDataToSend.socialContact;
        if (this.socialId !== "" && this.socialValueSocial !== "") {
          this.contactOptionIdSocial.push({
            id: this.socialId,
            value: this.socialValue,
          });
        }
        for (var i = 0; i < this.contactOptionIdSocial.length; i++) {
          formData.append("social_media[" + i + "][id]", this.socialId);
          formData.append("social_media[" + i + "][value]", this.socialValue);
        }
        this.contactsValue = formDataToSend.contacts;
        if (this.contactsId !== "" && this.contactsValue !== "") {
          this.contactOptionIdContacts.push({
            id: this.contactsId,
            value: this.contactsValue,
          });
        }
        for (var i = 0; i < this.contactOptionIdContacts.length; i++) {
          formData.append("contacts[" + i + "][id]", this.contactsId);
          formData.append("contacts[" + i + "][value]", this.contactsValue);
        }
        if (formDataToSend.phoneExtra != "") {
          for (var i = 0; i < 1; i++) {
            formData.append(
              "additional_phones[" + i + "]",
              formDataToSend.phoneExtra
            );
          }
        }
        let images;
        for (var i = 0; i < this.files.length; i++) {
          images = this.files[i];
          formData.append("images[" + i + "]", images);
        }
        formData.append("logo", this.file);
        formData.append("name", formDataToSend.companyName);
        formData.append("email", formDataToSend.email);
        formData.append("description", formDataToSend.description);
        formData.append("site_url", formDataToSend.siteUrl);
        formData.append("video_url", formDataToSend.videoUrl);
        formData.append("phone", formDataToSend.phone);
        formData.append("hashtags", this.hashtags);
        formData.append("latitude", formDataToSend.position.lat);
        formData.append("longitude", formDataToSend.position.lng);
        formData.append("audio", this.fileAudio);
        formData.append("document", this.fileDocument);
        try {
          await this.$axios.post("/storeCompany", formData);
          this.$router.push("/dashboard/my-company");
        } catch (e) {
          this.error = e.response.data;
        }
      }
      if (this.myProfileData.has_company === true) {
        const { formDataToSend } = this;
        let formData = new FormData();
        this.socialValue = formDataToSend.socialContact;
        if (this.socialId !== "" && this.socialValueSocial !== "") {
          this.contactOptionIdSocial.push({
            id: this.socialId,
            value: this.socialValue,
          });
        }
        for (var i = 0; i < this.contactOptionIdSocial.length; i++) {
          formData.append("social_media[" + i + "][id]", this.socialId);
          formData.append("social_media[" + i + "][value]", this.socialValue);
        }
        this.contactsValue = formDataToSend.contacts;
        if (this.contactsId !== "" && this.contactsValue !== "") {
          this.contactOptionIdContacts.push({
            id: this.contactsId,
            value: this.contactsValue,
          });
        }
        for (var i = 0; i < this.contactOptionIdContacts.length; i++) {
          formData.append("contacts[" + i + "][id]", this.contactsId);
          formData.append("contacts[" + i + "][value]", this.contactsValue);
        }
        if (formDataToSend.phoneExtra != "") {
          for (var i = 0; i < 1; i++) {
            formData.append(
              "additional_phones[" + i + "]",
              formDataToSend.phoneExtra
            );
          }
        } else this.myCompanyData.additional_phones;
        let images;
        for (var i = 0; i < this.files.length; i++) {
          images = this.files[i];
          formData.append("images[" + i + "]", images);
        }
        if (this.file != "") {
          formData.append("logo", this.file);
        }
        if (formDataToSend.companyName != "") {
          formData.append("name", formDataToSend.companyName);
        } else formData.append("name", this.myCompanyData.name);
        if (formDataToSend.email != "") {
          formData.append("email", formDataToSend.email);
        } else formData.append("email", this.myCompanyData.email);
        if (formDataToSend.description != "") {
          formData.append("description", formDataToSend.description);
        } else formData.append("description", this.myCompanyData.description);
        if (formDataToSend.siteUrl != "") {
          formData.append("site_url", formDataToSend.siteUrl);
        } else formData.append("site_url", this.myCompanyData.site_url);
        if (formDataToSend.videoUrl != "") {
          formData.append("video_url", formDataToSend.videoUrl);
        } else formData.append("video_url", this.myCompanyData.video_url);
        if (formDataToSend.phone != "") {
          formData.append("phone", formDataToSend.phone);
        } else formData.append("phone", this.myCompanyData.phone);
        if (formDataToSend.hashtags != "") {
          formData.append("hashtags", this.hashtags);
        }
        if (formDataToSend.position.lat != null) {
          formData.append("latitude", formDataToSend.position.lat);
        } else formData.append("latitude", this.myCompanyData.position.lat);
        if (formDataToSend.position.lng != null) {
          formData.append("longitude", formDataToSend.position.lng);
        } else formData.append("longitude", this.myCompanyData.position.lng);
        if (this.fileAudio != "") {
          formData.append("audio", this.fileAudio);
        }
        if (this.fileDocument != "") {
          formData.append("document", this.fileDocument);
        }
        try {
          await this.$axios.post("/editCompany", formData);
          this.$router.push("/dashboard/my-company");
        } catch (e) {
          this.error = e.response.data;
        }
      }
    },
    async getCompany() {
      try {
        await this.$axios.get("/getCompany").then((res) => {
          this.myCompanyData = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.uploadPhotoLoad = false;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
    handleFileUploadDocument() {
      this.fileDocument = this.$refs.fileDocument.files[0];
    },
    handleFileAudioUploads() {
      this.fileAudio = this.$refs.fileAudio.files[0];
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
        await this.$axios.delete("/deleteCompanyAdditionalPhoto", {
          params: {
            id: idPhoto,
          },
        });
        this.getCompany();
        this.filePhotos = "file";
      } catch (e) {
        this.error = e.response.data;
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
    onTagsChange(e) {
      this.hashtags = e.target.value;
      var newHashtag = this.hashtags.replaceAll('{"value":', " ");
      var newHashtagA = newHashtag.replaceAll("]", "");
      var newHashtagB = newHashtagA.replaceAll("[", "");
      var newHashtagC = newHashtagB.replaceAll("}", "");
      var newHashtagD = newHashtagC.replaceAll('"', "");
      this.hashtags = newHashtagD;
    },
    openSocial() {
      if (this.openSelectSocial === true) {
        this.openSelectSocial = false;
      } else this.openSelectSocial = true;
      this.openSelectContacts = false;
    },
    openContacts() {
      if (this.openSelectContacts === true) {
        this.openSelectContacts = false;
      } else this.openSelectContacts = true;
      this.openSelectSocial = false;
    },
    async getSocial() {
      try {
        await this.$axios.get("/getSocial").then((res) => {
          this.social = res.data.data;
        });
      } catch (e) {
        this.error = e;
      }
    },
    async getContacts() {
      try {
        await this.$axios.get("/getContacts").then((res) => {
          this.contacts = res.data.data;
        });
      } catch (e) {
        this.error = e;
      }
    },
    addOptionSocial(option, id, photo) {
      this.socialPhoto = photo;
      this.contactOption = option;
      this.socialId = id;
      this.openSelectSocial = false;
    },
    addOptionContacts(option, id, photo) {
      this.contactsPhoto = photo;
      this.contactsOption = option;
      this.contactsId = id;
      this.openSelectContacts = false;
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
.create-company-form {
  padding: 30px;
  width: 80%;

  &__title {
    line-height: 28px;
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__hint {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-top: 5px;
  }

  &__block {
    width: 362px;
  }

  &__block-title {
    line-height: 14px;
    font-size: $g-mobile-size;
    padding: 30px 0 10px 0;
  }

  &__block-second-title {
    line-height: 14px;
    font-size: $g-mobile-size;
    color: $mainFifthColor;
  }
  &__add-audio {
    background: $mainColor;
    width: 166px;
    padding: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    color: $mainSecondColor;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  &__add-document {
    background: $mainColor;
    width: 166px;
    padding: 10px;
    margin-bottom: 45px;
    font-weight: bold;
    color: $mainSecondColor;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }
  /deep/.vue-map-container {
    margin-top: 15px;
  }

  &__block-big-title {
    font-size: $g-second-title-size;
  }

  &__button-create {
    background: $mainColor;
    width: 264px;
    margin-top: 25px;
  }

  &__photo-update {
    display: flex;

    label {
      position: relative;
      width: 68px;
    }

    label input {
      visibility: hidden;
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  &__photo-update-preview {
    width: 166px;
    height: 68px;
  }

  &__photo-update-preview-create {
    max-height: 68px;
    max-width: 166px;
  }

  &__section-title {
    line-height: 14px;
    font-size: $g-mobile-size;
    padding-bottom: 10px;
  }

  &__photo-update-size {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-top: 5px;
    width: 175px;
  }

  &__photo-upload {
    color: $mainColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__photos-block,
  &__photos-section {
    display: flex;
    flex-wrap: wrap;
  }

  &__photos {
    position: relative;
    display: flex;
    border: 1px solid $mainFourthColor;
    width: 133px;
    height: 90px;
    align-items: center;
    justify-content: center;
    margin: 10px 30px 0 0;
    min-width: 133px;

    img {
      width: 133px;
      height: 90px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__photos {
    &:hover .create-company-form__photos-background {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 15px;
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
    width: 100%;
    height: 100%;
  }

  &__photo-block {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    justify-content: center;
  }

  &__photo-delete {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    padding-top: 5px;
    margin-left: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  &__hashtags-block {
    padding: 10px 0 5px 0;
  }

  /deep/.tagify {
    min-height: 130px;
  }
  /deep/.tagify__tag__removeBtn {
    color: #2575ed !important;
    font-size: 18px;
  }
  /deep/.tagify__tag__removeBtn + div {
    background: #d4e3f6 !important;
  }
  &__more-contacts-block {
    padding: 25px 0 10px 0;
  }

  &__more-contacts {
    display: flex;
    position: relative;
  }

  &__social-block {
    padding-top: 10px;
    display: flex;
    align-items: center;

    span {
      padding-left: 10px;
    }

    svg {
      width: 21px;
      height: 21px;
    }
  }
  &__social-select {
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 166px;
    padding: 9px 10px;
    margin-right: 7px;

    &:hover {
      cursor: pointer;
    }

    svg {
      width: 20px;
    }

    span {
      padding-left: 10px;
    }
  }
  &__social-select-left {
    display: flex;
    align-items: center;
  }

  &__social-open-list {
    position: absolute;
    top: 44px;
    background: white;
    padding: 15px;
    width: 166px;
    z-index: 1;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

    div {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      cursor: pointer;

      img {
        margin-right: 10px;
      }
    }
  }

  &__social-open-list-contacts {
    z-index: 2;
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
      .create-company-form__photos-background {
        display: block;
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

  &__photos-delete {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media (max-width: $break-xlg) {
  .create-company-form {
    padding: 25px 5px;

    &__photos-section {
      flex-wrap: wrap;
    }
  }
}

@media (max-width: $break-sm) {
  .create-company-form {
    &__photos {
      width: 96px;
      height: 65px;
      min-width: 96px;
      margin-right: 8px;
    }

    &__photos-pre {
      margin-right: 8px;
      img {
        width: 96px;
        height: 65px;
      }
    }
    /deep/.vue-map-container {
      width: 100% !important;
    }
  }
}
</style>
