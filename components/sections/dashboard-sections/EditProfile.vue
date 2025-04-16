<template>
  <div class="edit-profile">
    <form @submit.prevent="handleSubmit">
      <div class="edit-profile__title-block">
        <div class="edit-profile__title">Мой профиль</div>
        <div class="edit-profile__date-registration">
          Дата регистрации:
          {{ myProfileData.created_at }}
        </div>
      </div>
      <div class="edit-profile__name-block">
        <div class="edit-profile__name">
          <InputText
            :set-value="formDataToSend"
            :id="'name'"
            :label="'name'"
            :type="'name'"
            :placeholder="myProfileData.name"
          />
        </div>
      </div>
      <div class="edit-profile__photo">
        <div class="edit-profile__section-title">Фото профиля</div>
        <div class="edit-profile__photo-update">
          <img
            :src="myProfileData.avatar"
            alt=""
            class="edit-profile__photo-update-preview"
          />
          <div>
            <label class="edit-profile__photo-block">
              <span class="edit-profile__photo-upload">Загрузить</span>
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
                accept="image/jpeg, image/png"
              />
            </label>
            <span
              class="edit-profile__photo-delete"
              @click="deletePhotoProfile"
            >
              Удалить фото
            </span>
          </div>
        </div>
      </div>
      <div class="edit-profile__photo">
        <div class="edit-profile__section-title">Ваши фото</div>
        <div class="edit-profile__about-me-title-text">
          Загрузите побольше ваших личных фото
        </div>
        <div class="edit-profile__block">
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
            <div class="edit-profile__photos-section">
              <div
                class="edit-profile__photos-block"
                v-for="photo in myProfileData.additional_photos"
                :key="photo.id"
              >
                <div class="edit-profile__photos">
                  <div class="edit-profile__photos-background">
                    <Upload />
                    <div
                      @click="deleteAdditionalPhotoProfile(photo.id)"
                      class="edit-profile__photos-delete"
                    >
                      <Delete />
                    </div>
                  </div>
                  <img :src="photo.photo_url" alt="photo" />
                </div>
              </div>
              <div v-if="myProfileData.additional_photos">
                <div
                  class="edit-profile__photos"
                  v-if="myProfileData.additional_photos.length <= '9'"
                >
                  <PlusUpload />
                </div>
              </div>
            </div>
          </label>
        </div>
        <Notification :message="error['images']" v-if="error" />
        <Notification :message="error['additional_photos']" v-if="error" />
      </div>
      <div class="edit-profile__about-me">
        <div class="edit-profile__section-title">О себе</div>
        <div class="edit-profile__about-me-title-text">
          Профили с личной информацией пользуются большим доверием
        </div>
        <InputTextarea
          class="edit-profile__textarea"
          :set-value="formDataToSend"
          :id="'textarea'"
          :label="'textarea'"
          :placeholder="myProfileData.description"
        />
        <Notification :message="error['description']" v-if="error" />
      </div>
      <div class="edit-profile__contact-block">
        <div class="edit-profile__section-big-title">Контакты</div>
        <div>
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
      </div>
      <div
        class="edit-profile__address-block"
        v-if="this.positionLatLng != null"
      >
        <div class="edit-profile__section-title">Адрес</div>
        <div class="edit-profile__address" v-if="this.positionLatLng == null">
          <span>{{ myProfileData.country }},</span>
          <span>{{ myProfileData.region }},</span>
          <span>{{ myProfileData.city }},</span>
        </div>
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
      <div class="edit-profile__phone-block" v-if="myProfileData.phone">
        <div class="edit-profile__section-title">Телефон</div>
        <div class="edit-profile__phone">
          {{ myProfileData.phone }}
        </div>
        <InputText
          v-if="myProfileData.phone === null"
          class="edit-profile__phone-main"
          :set-value="formDataToSend"
          :id="'phone'"
          :label="'phone'"
          :type="'number'"
          :placeholder="'Номер телефона без +'"
        />
        <div
          class="edit-profile__confirm-phone"
          v-if="
            myProfileData.phone_verified_at === null &&
            myProfileData.phone != null
          "
        >
          Телефон не подтвержден
          <NuxtLink to="/registration/phone-verification">
            Подтвердить
          </NuxtLink>
        </div>
        <div
          class="edit-profile__confirm-phone"
          v-if="myProfileData.phone_verified_at !== null"
        >
          <Verified />
          Телефон подтвержден
        </div>
      </div>
      <div class="edit-profile__more-phone-block">
        <div class="edit-profile__more-phone-title">Дополнительный телефон</div>
        <div class="edit-profile__more-contacts" v-for="(phone, index) in phoneExtra" :key="phone.name">
          <InputText
            :set-value="phone"
            :id="'value'"
            :label="'value'"
            :type="'number'"
            :placeholder="'Номер телефона без +'"
          />
          <div @click="deletePhone(index)" class="edit-profile__delete-field">Удалить</div>
          <Notification :message="error[`additional_phones.${index}`]" v-if="error" />
        </div>
        <div v-if="errorPhone" class="edit-profile__error">Заполните предыдущие поля!</div>
        <div @click="addMorePhone" class="edit-profile__more-button">Добавить еще</div>
      </div>
      <div class="edit-profile__more-contacts-block">
        <div class="edit-profile__section-title">Eще контакты</div>
          <div v-for="(contact, index) in contacts" :key="contact.index" class="edit-profile__more-contacts">
            <div class="edit-profile__social-select" @click="openContacts(index)">
              <div class="edit-profile__social-select-left">
                <Facebook
                  class="edit-profile__social-facebook"
                  v-if="contact.photo_url === ''"
                />
                <img
                  :src="contact.photo_url"
                  alt="social"
                  v-else
                />
                <span>{{ contact.name }}</span>
              </div>
              <SelectArrow />
            </div>
            <div v-if="contact.trigger" class="edit-profile__social-open-list">
              <div
                v-for="contactChoose in contactsChoose"
                :key="contactChoose.id"
                @click="
                  addOptionContacts(contactChoose.name, contactChoose.id, contactChoose.photo_url, index)
                "
              >
                <img :src="contactChoose.photo_url" alt="contact" />
                {{ contactChoose.name }}
              </div>
            </div>
            <InputText
              :set-value="contact"
              :id="'values'"
              :label="'values'"
              :type="'values'"
              :placeholder="'Юзернейм'"
            />
            <Notification :message="error[`contacts.${index}.value`]" v-if="error" />
            <div @click="deleteContact(index)" class="edit-profile__delete-field">Удалить</div>
          </div>
          <div v-if="errorContacts" class="edit-profile__error">Заполните предыдущие поля!</div>
          <div @click="addMoreContacts" class="edit-profile__more-button">Добавить еще</div>
      </div>
      <div class="edit-profile__email-block">
        <div class="edit-profile__section-title">Электронаая почта</div>
        {{ myProfileData.email }}
        <div
          class="edit-profile__confirm-email"
          v-if="myProfileData.email_verified_at === null"
        >
          Email не подтвержден
          <NuxtLink to="/registration/email-verification">
            Подтвердить
          </NuxtLink>
        </div>
        <div
          class="edit-profile__confirm-email"
          v-if="myProfileData.email_verified_at !== null"
        >
          <Verified />
          Email подтвержден
        </div>
      </div>
      <div v-if="socialShow" class="edit-profile__more-contacts-block">
        <div class="edit-profile__section-title">Социальные сети</div>
        <div v-for="(socialItem, index) in social" :key="socialItem.index" class="edit-profile__more-contacts">
          <div class="edit-profile__social-select" @click="openSocial(index)">
            <div class="edit-profile__social-select-left">
              <Facebook
                class="edit-profile__social-facebook"
                v-if="socialItem.photo_url === ''"
              />
              <img
                :src="socialItem.photo_url"
                alt="social"
                v-if="socialItem.photo_url !== ''"
              />
              <span>{{ socialItem.name }}</span>
            </div>
            <SelectArrow />
          </div>
          <div v-if="socialItem.trigger" class="edit-profile__social-open-list">
            <div
              v-for="socialChooseItem in socialChoose"
              :key="socialChooseItem.id"
              @click="addOptionSocial(socialChooseItem.name, socialChooseItem.id, socialChooseItem.photo_url, index)"
            >
              <img :src="socialChooseItem.photo_url" alt="social" />
              {{ socialChooseItem.name }}
            </div>
          </div>
          <InputText
            :set-value="socialItem"
            :id="'values'"
            :label="'values'"
            :type="'values'"
            :placeholder="'Юзернейм'"
          />
          <Notification :message="error[`social_media.${index}.value`]" v-if="error" />
          <div @click="deleteSocial(index)" class="edit-profile__delete-field">Удалить</div>
        </div>
        <div v-if="errorSocial" class="edit-profile__error">Заполните предыдущие поля!</div>
        <div @click="addMoreSocial" class="edit-profile__more-button">Добавить еще</div>
      </div>
      <DefaultButton :type="'submit'" class="edit-profile__button-edit">
        Сохранить
      </DefaultButton>
    </form>
  </div>
</template>

<script>
import Verified from "@/assets/images/icons/verified.svg?inline";
import Skype from "@/assets/images/social/skype.svg?inline";
import Viber from "@/assets/images/social/viber.svg?inline";
import Telegram from "@/assets/images/social/telegram.svg?inline";
import Facebook from "@/assets/images/social/facebook.svg?inline";
import PlusUpload from "@/assets/images/icons/plus-upload.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import InputFileWithTextMulti from "@/components/molecules/InputFileWithTextMulti.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Delete from "@/assets/images/adv/delete.svg?inline";
import Upload from "@/assets/images/adv/upload.svg?inline";
import Notification from "@/components/errors/Notification";

export default {
  name: "edit-Profile",
  data() {
    return {
      formDataToSend: {
        name: "",
        textarea: "",
        email: "",
        phone: "",
        address: null,
        socialContact: "",
        social: "",
        position: {
          lat: "",
          lng: "",
        },
      },
      phoneExtra: [],
      contacts: [],
      social: [],
      socialShow: false,
      file: "",
      files: [],
      error: null,
      myProfileData: {},
      filePhotos: "file",
      errorContacts: false,
      errorPhone: false,
      errorSocial: false,
      markers: [],
      markerPosition: {
        lat: 33.76,
        lng: -116.4,
      },
      positionLatLng: null,
    };
  },
  components: {
    Skype,
    Viber,
    Telegram,
    Facebook,
    Vk,
    DefaultButton,
    InputText,
    InputTextarea,
    InputFileWithTextMulti,
    Verified,
    PlusUpload,
    SelectArrow,
    Delete,
    Upload,
    Notification,
  },
  mounted() {
    this.getContacts();
    this.getSocial();
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        await this.$axios.get("/getProfile").then((res) => {
          this.myProfileData = res.data.data;
        });
        this.formDataToSend.textarea = this.myProfileData.description;
        this.getPhoneExtra();
        setTimeout(() => {
          this.addContactsId(this.myProfileData.contacts);
          this.addSocialId(this.myProfileData.social_media);
        }, 0)
      } catch (e) {
        this.error = e.response.data;
      }
    },
    getPhoneExtra() {
      const phone = this.myProfileData.additional_phones;
      if (phone.length > 0) {
        for(let i = 0; i < phone.length; i++) {
          this.phoneExtra.push({
            value: phone[i]
          })
        }
      } else {
        this.phoneExtra.push({
          value: ""
        })
      }
    },
    addContactsId(contacts) {
      if (contacts.length > 0) {
        for (let i = 0; i < contacts.length; i++) {
          const id = this.contactsChoose.find(x => x.name == contacts[i].name).id;
          this.contacts.push({
            id: id,
            name: contacts[i].name,
            photo_url: contacts[i].photo_url,
            values: contacts[i].values,
            trigger: false,
          })
        }
      } else {
        this.contacts.push({
          id: 12,
          name: 'Facebook',
          photo_url: '',
          values: '',
          trigger: false,
        })
      }
    },
    addSocialId(social) {
      if (social.length > 0) {
        for (let i = 0; i < social.length; i++) {
          const id = this.socialChoose.find(x => x.name == social[i].name).id;
          this.social.push({
            id: id,
            name: social[i].name,
            photo_url: social[i].photo_url,
            values: social[i].values,
            trigger: false,
          })
        }
      } else {
        this.social.push({
          id: 1,
          name: 'Facebook',
          photo_url: '',
          values: '',
          trigger: false,
        })
      }
      this.socialShow = true;
    },
    async getContacts() {
      try {
        await this.$axios.get("/getContacts").then((res) => {
          this.contactsChoose = res.data.data;
        });
      } catch (e) {
        this.error = e;
      }
    },
    async getSocial() {
      try {
        await this.$axios.get("/getSocial").then((res) => {
          this.socialChoose = res.data.data;
        });
      } catch (e) {
        this.error = e;
      }
    },
    async handleSubmit() {
      const { formDataToSend } = this;
      if (formDataToSend.name === "") {
        formDataToSend.name = this.myProfileData.name;
      }
      if (formDataToSend.textarea === "") {
        formDataToSend.textarea = this.myProfileData.description;
      }
      if (formDataToSend.email === "") {
        formDataToSend.email = this.myProfileData.email;
      }
      if (formDataToSend.phone === "") {
        formDataToSend.phone = this.myProfileData.phone;
      }

      let formData = new FormData();
      for (var i = 0; i < this.social.length; i++) {
        if (this.social[i].values.length > 0) {
          formData.append("social_media[" + i + "][id]", this.social[i].id);
          formData.append("social_media[" + i + "][value]", this.social[i].values);
        }
      }

      for (var i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].values.length > 0) {
          formData.append("contacts[" + i + "][id]", this.contacts[i].id);
          formData.append("contacts[" + i + "][value]", this.contacts[i].values);
        }
      }

      for (var i = 0; this.phoneExtra.length > i; i++) {
        if (this.phoneExtra[i].value) {
          formData.append(
            "additional_phones[" + i + "]",
            this.phoneExtra[i].value
          );
        }
      }

      formData.append("name", formDataToSend.name);
      formData.append("description", formDataToSend.textarea);
      formData.append("email", formDataToSend.email);
      formData.append("phone", formDataToSend.phone);
      if (formDataToSend.position.lat != "") {
        formData.append("latitude", formDataToSend.position.lat);
      }
      if (formDataToSend.position.lng != "") {
        formData.append("longitude", formDataToSend.position.lng);
      }
      try {
        await this.$axios.post("/editProfile", formData);
        this.$router.push("/dashboard/profile");
      } catch (e) {
        this.error = e.response.data;
      }
    },
    addOption(option, id) {
      const { formDataToSend } = this;
      this.contactOption = option;
      this.socialId = id;
      this.openSelectContact = false;
    },
    addOptionSocial(option, id, photo) {
      this.socialPhoto = photo;
      this.contactOptionSocial = option;
      this.socialIdSocial = id;
      this.openSelectSocial = false;
    },
    openSocialSelect() {
      if (this.openSelectContact === true) {
        this.openSelectContact = false;
      } else this.openSelectContact = true;
    },
    addOptionContacts(option, id, photo, index) {
      this.contacts[index].photo_url = photo;
      this.contacts[index].id = id;
      this.contacts[index].name = option;
      this.contacts[index].trigger = false;
    },
    addOptionSocial(option, id, photo, index) {
      this.social[index].photo_url = photo;
      this.social[index].id = id;
      this.social[index].name = option;
      this.social[index].trigger = false;
    },
    deleteContact(id) {
      this.contacts.splice(id, 1);
    },
    deletePhone(id) {
      this.phoneExtra.splice(id, 1);
    },
    deleteSocial(id) {
      this.social.splice(id, 1);
    },
    addMoreContacts() {
      if (this.contacts?.[this.contacts.length -1]?.values != '') {
        this.contacts.push({
          id: 12,
          name: 'Facebook',
          photo_url: '',
          values: '',
          trigger: false,
        })
      } else {
        this.errorContacts = true
      }
    },
    addMoreSocial() {
      if (this.social?.[this.social.length -1]?.values != '') {
        this.social.push({
          id: 1,
          name: 'Facebook',
          photo_url: '',
          values: '',
          trigger: false,
        })
      } else {
        this.errorSocial = true
      }
    },
    addMorePhone() {
      if (this.phoneExtra?.[this.phoneExtra.length - 1]?.value != '') {
        this.phoneExtra.push({
          value: '',
        })
      } else {
        this.errorPhone = true
      }
    },
    openContacts(id) {
      if (this.contacts[id].trigger === true) {
        this.contacts[id].trigger = !this.contacts[id].trigger
      } else {
        for(let i = 0; this.contacts.length > i; i++) {
          this.contacts[i].trigger = false
        }
        this.contacts[id].trigger = !this.contacts[id].trigger
      }
    },
    openSocial(id) {
      if (this.social[id].trigger === true) {
        this.social[id].trigger = !this.social[id].trigger
      } else {
        for(let i = 0; this.social.length > i; i++) {
          this.social[i].trigger = false
        }
        this.social[id].trigger = !this.social[id].trigger
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.photoUpload();
    },
    handleFilesUploads() {
      this.files = this.$refs.files.files;
      this.photoUploads();
    },
    async photoUpload() {
      let formData = new FormData();
      formData.append("image", this.file);
      try {
        await this.$axios.post("/uploadProfileAvatar", formData);
        this.getProfile();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async photoUploads() {
      let formData = new FormData();
      let images;
      for (var i = 0; i < this.files.length; i++) {
        images = this.files[i];
        formData.append("images[" + i + "]", images);
      }
      try {
        await this.$axios.post("/uploadProfileAdditionalPhotos", formData);
        this.getProfile();
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
    async deletePhotoProfile() {
      try {
        await this.$axios.delete("/deleteProfileAvatar");
        this.getProfile();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async deleteAdditionalPhotoProfile(idPhoto) {
      this.filePhotos = "text";
      try {
        await this.$axios.delete("/deleteProfileAdditionalPhoto", {
          params: {
            id: idPhoto,
          },
        });
        this.getProfile();
        this.filePhotos = "file";
      } catch (e) {
        this.error = e.response.data;
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
.edit-profile {
  padding: 30px 0 30px 30px;
  width: 80%;

  &__title {
    font-size: $g-second-title-size;
    padding-bottom: 25px;
  }

  &__photos-block,
  &__photos-section {
    display: flex;
    flex-wrap: wrap;
  }

  &__block {
    display: inline-block;
  }

  &__more-contacts {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    position: relative;

    /deep/.notification {
      position: absolute;
      left: 0;
      bottom: 2px;
    }
  }

  &__delete-field {
    padding-left: 15px;
    color: $mainColor;
    cursor: pointer;
  }

  &__more-button {
    color: $mainColor;
    cursor: pointer;
  }

  &__error {
    color: red;
  }

  &__photos {
    position: relative;
    display: flex;
    border: 1px solid $mainFourthColor;
    width: 133px;
    height: 90px;
    align-items: center;
    justify-content: center;
    margin: 10px 30px 20px 0;

    img {
      width: 133px;
      height: 90px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__name-block {
    display: flex;
    align-items: center;
  }

  &__name {
    display: flex;
    flex-direction: column;
    width: 362px;
  }

  &__default-avatar {
    margin-right: 25px;
  }

  &__photo {
    padding-top: 25px;
  }

  &__about-me {
    padding-top: 25px;
  }

  &__about-me-text {
    padding-top: 5px;
    max-width: 460px;
    line-height: 18px;
  }

  &__contact-block {
    padding-top: 45px;
    padding-bottom: 25px;
  }

  &__photo-block {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    justify-content: center;
  }

  &__address-block {
    padding: 25px 0 10px 0;
  }

  &__phone-block,
  &__email-block {
    padding: 25px 0 10px 0;
    width: 362px;
  }

  &__phone-title,
  &__phone-email {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__confirm-phone,
  &__confirm-email {
    display: flex;
    align-items: center;
    padding: 15px 0 10px 0;
    color: $mainFifthColor;
    font-size: $g-mobile-size;

    svg {
      margin-right: 10px;
    }
  }

  &__confirm-phone a,
  &__confirm-email a {
    color: $mainColor;
    padding-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }

  &__more-contacts-block {
    padding: 25px 0 10px 0;
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

  &__social-section {
    padding: 25px 0 10px 0;
  }

  &__button-edit {
    background: $mainColor;
    width: 264px;
    margin: 30px 0 50px 0;
  }

  &__date-registration {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
    line-height: 40px;
  }

  &__title-block {
    display: flex;
    justify-content: space-between;
  }

  &__photo-update {
    display: flex;

    label input {
      visibility: hidden;
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 30px;
    }
  }

  &__photo-update-preview {
    width: 68px;
    height: 68px;
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
  }

  &__photo-upload {
    color: $mainColor;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__about-me-title-text {
    font-size: $g-mobile-size;
    color: $mainFifthColor;
    padding-bottom: 10px;
  }

  &__section-big-title {
    font-size: $g-second-title-size;
    line-height: 28px;
    padding-bottom: 15px;
  }

  &__more-phone-block {
    width: 362px;
  }

  &__more-phone-title {
    margin-bottom: 15px;
    font-size: $g-mobile-size;
  }

  &__textarea {
    width: 460px;
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

  &__photos {
    &:hover .edit-profile__photos-background {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 15px;
    }
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

  &__social-select {
    border: 1px solid #dadada;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 166px;
    padding: 11px 10px;
    margin-right: 7px;

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

  &__more-contacts {
    display: flex;
    position: relative;
  }

  &__social-open-list {
    position: absolute;
    top: 44px;
    background: white;
    padding: 15px;
    width: 166px;
    z-index: 1;

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

  &__phone-main {
    margin-bottom: 15px;
  }
}

@media (max-width: $break-xlg) {
  .edit-profile {
    width: 100%;
    min-height: 70vh;
    padding: 25px 5px;
  }
}

@media (max-width: $break-sm) {
  .edit-profile {
    min-height: 58vh;

    &__title {
      padding-bottom: 0;
    }

    &__photo-update div {
      margin-left: 0;
    }

    &__photos {
      width: 96px;
      height: 65px;
      margin-right: 5px;

      img {
        width: 96px;
        height: 65px;
      }
    }

    &__textarea {
      width: 100%;
    }

    &__title-block {
      flex-direction: column;
    }

    &__contact-block {
      padding-top: 25px;
      padding-bottom: 0;
    }

    /deep/.vue-map-container {
      width: 100% !important;
    }
  }
}
</style>
