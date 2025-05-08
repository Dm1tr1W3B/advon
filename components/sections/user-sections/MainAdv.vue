<template>
  <div class="main-adv container">
<!--    <Search />-->
    <BreadCrumbs
      v-if="!categoryTrigger"
      :secondItemStorage="true"
      :lastItemName="mainAdvertisement.title"
    />
    <BreadCrumbs
      v-else-if="categoryTrigger"
      :secondItemName="mainAdvertisement.category.category_name"
      :secondItemLink="`/category/${categoryKey}`"
      :lastItemName="mainAdvertisement.title"
    />
    <div v-if="$device.isDesktop" class="main-adv__title">
      {{ mainAdvertisement.title }}
    </div>
    <div v-if="$device.isDesktop" class="main-adv__service-info-block">
      <div class="main-adv__service-info-block-left">
        <div class="main-adv__location-block">
          <Location />
          <div>
            {{ mainAdvertisement.country }} {{ mainAdvertisement.city }}
          </div>
          <Calendar />
          <div class="main-adv__date-add">
            Добавлено {{ mainAdvertisement.created_at }}
          </div>
        </div>
        <div class="price_button">
          <div class="main-adv__price">
              <span v-if="this.mainAdvertisement.price_type !== 'договорная'">
                {{ this.mainAdvertisement.price | price-break }}
                ₽
              </span>
            {{ this.mainAdvertisement.price_type }}
          </div>
          <div class="main-adv__add-to-favorites">
            <div @click="addAdvertisementFavorite">
              <div
                v-if="!mainAdvertisement.is_favorite"
                class="main-adv__add-to-favorites-container"
              >
                Добавить в избранное
                <Star
                  :class="{ activeFavorite: mainAdvertisement.is_favorite }"
                />
              </div>
            </div>
            <div
              class="main-adv__add-to-favorites-container"
              @click="deleteAdvertisementsFavorite"
              v-if="mainAdvertisement.is_favorite"
            >
              Удалить из избранного
              <Star :class="{ activeFavorite: mainAdvertisement.is_favorite }" />
            </div>
            <TokenNotProvided
              class="main-adv__token-error"
              :error-comment="errorTokenFavorite"
              v-if="errorTokenFavorite"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="main-adv__main-section"
      v-if="this.mainAdvertisement.additional_photos != null"
    >
      <div
        v-if="this.mainAdvertisement.additional_photos"
        class="main-adv__main-section-slider"
      >
        <VueSlickCarousel ref="c1" :asNavFor="$refs.c2" :focusOnSelect="true">
          <div
            v-for="photo in this.mainAdvertisement.additional_photos"
            :key="photo.id"
            class="main-adv__slider-big-container"
          >
            <img :src="photo.photo_url" alt="" class="main-adv__slider-big" />
          </div>
        </VueSlickCarousel>
        <VueSlickCarousel
          v-if="$device.isDesktop"
          ref="c2"
          :asNavFor="$refs.c1"
          :slidesToShow="this.mainAdvertisement.additional_photos.length"
          :focusOnSelect="true"
          class="main-adv__main-section-slider-small"
        >
          <div
            v-for="photo in this.mainAdvertisement.additional_photos"
            :key="photo.id"
          >
            <img :src="photo.photo_url" alt="" class="main-adv__slider-small" />
          </div>
        </VueSlickCarousel>
        <div v-if="!$device.isDesktop" class="main-adv__title-block">
          <div class="main-adv__title">
            {{ mainAdvertisement.title }}
          </div>
          <div
            v-if="$device.isTablet"
            class="main-adv__add-to-favorites"
            @click="addAdvertisementFavorite"
          >
            <div v-if="!mainAdvertisement.is_favorite">
              <span>Добавить в избранное</span>
              <Star
                :class="{ activeFavorite: mainAdvertisement.is_favorite }"
              />
            </div>
            <div
              @click="deleteAdvertisementsFavorite"
              v-if="mainAdvertisement.is_favorite"
            >
              <span>Удалить из избранного</span>
              <Star
                :class="{ activeFavorite: mainAdvertisement.is_favorite }"
              />
            </div>
            <TokenNotProvided
              class="main-adv__token-error"
              :error-comment="errorTokenFavorite"
              v-if="errorTokenFavorite"
            />
          </div>
        </div>
        <div v-if="!$device.isDesktop" class="main-adv__service-info-block">
          <div class="main-adv__service-info-block-left">
            <div class="main-adv__location-block">
              <Location />
              <div>
                {{ mainAdvertisement.country }} {{ mainAdvertisement.city }}
              </div>
              <div class="main-adv__date-add">
                Добавлено {{ mainAdvertisement.created_at }}
              </div>
            </div>
          </div>
          <div class="main-adv__service-info-block-right">
            {{ mainAdvertisement.advertisement_type }}
          </div>
          <div
            v-if="$device.isMobile"
            class="main-adv__add-to-favorites"
            @click="addAdvertisementFavorite"
          >
            <div v-if="!mainAdvertisement.is_favorite">
              <span>Добавить в избранное</span>
              <Star
                :class="{ activeFavorite: mainAdvertisement.is_favorite }"
              />
            </div>
            <div
              @click="deleteAdvertisementsFavorite"
              v-if="mainAdvertisement.is_favorite"
            >
              <span>Удалить из избранного</span>
              <Star
                :class="{ activeFavorite: mainAdvertisement.is_favorite }"
              />
            </div>
            <TokenNotProvided
              class="main-adv__token-error"
              :error-comment="errorTokenFavorite"
              v-if="errorTokenFavorite"
            />
          </div>
        </div>
<!--        <div v-if="!$device.isDesktop" class="main-adv__price_block">-->
<!--          <div class="main-adv__price">-->
<!--            <span v-if="this.mainAdvertisement.price_type !== 'договорная'">-->
<!--              {{ this.mainAdvertisement.price | price-break }}-->
<!--              ₽-->
<!--            </span>-->
<!--            {{ this.mainAdvertisement.price_type }}-->
<!--          </div>-->
<!--          <div class="main-adv__price-buttons">-->
<!--            <DefaultButton-->
<!--              class="main-adv__write-to-the-author"-->
<!--              @click.native="openModelWriteAuthor"-->
<!--            >-->
<!--              Написать автору-->
<!--            </DefaultButton>-->
<!--            <div class="main-adv__offer-your-price-wriper">-->
<!--              <DefaultButton-->
<!--                class="main-adv__offer-your-price"-->
<!--                @click.native="sendOfferPrice"-->
<!--              >-->
<!--                Предложить свою цену-->
<!--              </DefaultButton>-->
<!--              <div class="main-adv__offer-your-price-block" v-if="offerPrice">-->
<!--                <div class="main-adv__offer-your-price-title">-->
<!--                  Автор получит уведомление с вашим предложением-->
<!--                </div>-->
<!--                <div class="main-adv__offer-your-currency">-->
<!--                  <InputText-->
<!--                    :set-value="formDataToSend"-->
<!--                    :id="'offerPriceData'"-->
<!--                    :label="'offerPriceData'"-->
<!--                    :type="'number'"-->
<!--                    :placeholder="'Ваша цена'"-->
<!--                  />-->
<!--                  <div class="main-adv__currency-block">-->
<!--                    <div class="main-adv__currency">Руб</div>-->
<!--                    &lt;!&ndash; <SelectArrow /> &ndash;&gt;-->
<!--                  </div>-->
<!--                </div>-->
<!--                <DefaultButton-->
<!--                  class="main-adv__offer-your-price-button"-->
<!--                  @click.native="sendYourPrice"-->
<!--                >-->
<!--                  Отправить-->
<!--                </DefaultButton>-->
<!--                <Notification-->
<!--                  :message="errorPrice['price']"-->
<!--                  v-if="errorPrice"-->
<!--                  class="main-adv__complain-error-notification"-->
<!--                />-->
<!--                <TokenNotProvided :error-comment="errorPrice" />-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-if="priceSend" class="main-adv__complain-success">-->
<!--              <div class="main-adv__complain-success_text">-->
<!--                Ваша цена отправлена-->
<!--              </div>-->
<!--              <CloseIcon-->
<!--                @click="priceSendClose()"-->
<!--                class="main-adv__complain-success_close"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div>
          <div class="main-adv__wrap">
            <div></div>
            <div class="shadow_effect">
              <div class="main-adv__title">Описание</div>
              <div>
                {{ this.mainAdvertisement.description }}
              </div>
            </div>
<!--            <div v-if="$device.isDesktop" class="main-adv__comment-block">-->
<!--              <div class="main-adv__title">-->
<!--                Комментарии-->
<!--                <span class="main-adv__amount-comment">-->
<!--                  ({{ this.commentList.length }})-->
<!--                </span>-->
<!--              </div>-->
<!--              <div v-for="comment in this.commentList" :key="comment.id">-->
<!--                <div class="main-adv__comment-body">-->
<!--                  <div>-->
<!--                    <img :src="comment.avatar" alt="avatar" />-->
<!--                  </div>-->
<!--                  <div>-->
<!--                    <div>-->
<!--                      {{ comment.name }}-->
<!--                    </div>-->
<!--                    <div class="main-adv__comment-date-create">-->
<!--                      Оставлено-->
<!--                      {{ comment.created_at }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="main-adv__message">-->
<!--                  {{ comment.message }}-->
<!--                </div>-->
<!--              </div>-->
<!--              <div>-->
<!--                <div class="main-adv__comment-title">Оставить комментарий</div>-->
<!--                <InputTextarea-->
<!--                  :set-value="formDataComment"-->
<!--                  :id="'comment'"-->
<!--                  :label="'comment'"-->
<!--                  :placeholder="'Введите текст'"-->
<!--                />-->
<!--                <div v-if="errorComment">-->
<!--                  <Notification-->
<!--                    :message="errorComment['message']"-->
<!--                    v-if="errorComment['message'] !== 'Token not provided'"-->
<!--                  />-->
<!--                </div>-->
<!--                <DefaultButton-->
<!--                  class="main-adv__comment-button"-->
<!--                  @click.native="storeAdvertisementComment"-->
<!--                >-->
<!--                  Опубликовать-->
<!--                </DefaultButton>-->
<!--                <TokenNotProvided :error-comment="errorComment" />-->
<!--                <Notification-->
<!--                  :message="errorComment['non_field_error']"-->
<!--                  v-if="errorComment"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </div>
      </div>
      <div v-if="this.mainAdvertisement.person" class="main-adv__persob-block">
<!--        <div v-if="$device.isDesktop" class="main-adv__price_block">-->
<!--          <div class="main-adv__price">-->
<!--            <span v-if="this.mainAdvertisement.price_type !== 'договорная'">-->
<!--              {{ this.mainAdvertisement.price | price-break }}-->
<!--              ₽-->
<!--            </span>-->
<!--            {{ this.mainAdvertisement.price_type }}-->
<!--          </div>-->
<!--          <div>-->
<!--            <DefaultButton-->
<!--              class="main-adv__write-to-the-author"-->
<!--              @click.native="openModelWriteAuthor"-->
<!--            >-->
<!--              Написать автору-->
<!--            </DefaultButton>-->
<!--          </div>-->
<!--          <div class="main-adv__offer-your-price-wriper">-->
<!--            <DefaultButton-->
<!--              class="main-adv__offer-your-price"-->
<!--              @click.native="sendOfferPrice"-->
<!--            >-->
<!--              Предложить свою цену-->
<!--            </DefaultButton>-->
<!--            <div class="main-adv__offer-your-price-block" v-if="offerPrice">-->
<!--              <div class="main-adv__offer-your-price-title">-->
<!--                Автор получит уведомление с вашим предложением-->
<!--              </div>-->
<!--              <div class="main-adv__offer-your-currency">-->
<!--                <InputText-->
<!--                  :set-value="formDataToSend"-->
<!--                  :id="'offerPriceData'"-->
<!--                  :label="'offerPriceData'"-->
<!--                  :type="'number'"-->
<!--                  :placeholder="'Ваша цена'"-->
<!--                />-->
<!--                <div class="main-adv__currency-block">-->
<!--                  <div class="main-adv__currency">Руб</div>-->
<!--                  &lt;!&ndash; <SelectArrow /> &ndash;&gt;-->
<!--                </div>-->
<!--              </div>-->
<!--              <DefaultButton-->
<!--                class="main-adv__offer-your-price-button"-->
<!--                @click.native="sendYourPrice"-->
<!--              >-->
<!--                Отправить-->
<!--              </DefaultButton>-->
<!--              <Notification-->
<!--                :message="errorPrice['price']"-->
<!--                v-if="errorPrice"-->
<!--                class="main-adv__complain-error-notification"-->
<!--              />-->
<!--              <Notification-->
<!--                :message="errorPrice['non_field_error']"-->
<!--                v-if="errorPrice"-->
<!--                class="main-adv__complain-error-notification"-->
<!--              />-->
<!--              <TokenNotProvided :error-comment="errorPrice" />-->
<!--            </div>-->
<!--            <div v-if="priceSend" class="main-adv__complain-success">-->
<!--              <div class="main-adv__complain-success_text">-->
<!--                Ваша цена отправлена-->
<!--              </div>-->
<!--              <CloseIcon-->
<!--                @click="priceSendClose()"-->
<!--                class="main-adv__complain-success_close"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="shadow_effect">
          <div class="main-adv__person-block" @click="userDetail()">
            <div>
              <img
                :src="this.mainAdvertisement.person.avatar"
                alt=""
                class="main-adv__person-avatar"
              />
            </div>
            <div>
              <div class="person_name">
                {{ this.mainAdvertisement.person.name }}
              </div>
              <div class="person_info">
                <span>{{ this.mainAdvertisement.person_type }}</span>
                <span>На advon с {{ this.mainAdvertisement.person.created_at }}</span>
              </div>
              <div
                  v-if="this.mainAdvertisement.person_type != 'Компания'"
                  class="main-adv__all-advs-author"
                  @click="getAuthorAllAdvertisements"
              >
                Все объявления автора ({{
                  this.mainAdvertisement.number_advertisement
                }})
              </div>
              <div
                  v-else
                  class="main-adv__all-advs-author"
                  @click="getCompanyAllAdvertisements"
              >
                Все объявления компании ({{
                  this.mainAdvertisement.number_advertisement
                }})
              </div>
              <div class="phone_section">
                <div v-if="this.mainAdvertisement.person.phone">Контакты</div>
                <div
                    v-if="!loggedInUser"
                    @click="showContact"
                    class="main-adv__show-contact"
                >
                  Показать телефон
                </div>
              </div>
              <div
                  class="main-adv__phone-block"
                  v-if="this.mainAdvertisement.person.phone"
              >
                <div>
                  <span class="phone_title">Телефон:</span>
<!--                  <Phone />-->
                  {{ this.mainAdvertisement.person.phone }}
                  <!-- {{ this.showContactData }} -->
                </div>
              </div>
              <div class="main-adv__contacts-block">
                <div
                    v-for="contact in this.mainAdvertisement.person.contacts"
                    :key="contact.id"
                    class="main-adv__contact"
                >
                  <img :src="contact.photo_url" alt="" />
                  <div>
                    {{ contact.values }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product_information shadow_effect">
          <p>Детали</p>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.payment"
          >
            <div class="main-adv__characteristic-title">
              Оплата
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.payment }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.date_start"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.date_start_name }}
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.date_start }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.date_of_the"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.date_of_the_name }}
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.date_of_the }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.date_finish"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.date_finish_name }}
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.date_finish }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.amount"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.amount_name }}
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.amount }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.length"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.length_name }},
              {{ this.mainAdvertisement.length_hint }}
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.length }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.width"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.width_name }},
              {{ this.mainAdvertisement.width_hint }}
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.width }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.travel_abroad"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.travel_abroad_name }}
            </div>
            <div class="middle_line"></div>
            <div v-if="this.mainAdvertisement.travel_abroad === false">
              Нет
            </div>
            <div v-if="this.mainAdvertisement.travel_abroad === true">Да</div>
          </div>
          <div
              class="main-adv__characteristic line"
              v-if="this.mainAdvertisement.ready_for_political_advertising"
          >
            <div class="main-adv__characteristic-title">
              {{
                this.mainAdvertisement.ready_for_political_advertising_name
              }}
            </div>
            <div class="middle_line"></div>
            <div
                v-if="
                  this.mainAdvertisement.ready_for_political_advertising ===
                  false
                "
            >
              Нет
            </div>
            <div
                v-if="
                  this.mainAdvertisement.ready_for_political_advertising ===
                  true
                "
            >
              Да
            </div>
          </div>
          <div
              class="main-adv__characteristic line"
              v-if="this.mainAdvertisement.photo_report"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.photo_report_name }}
            </div>
            <div class="middle_line"></div>
            <div v-if="this.mainAdvertisement.photo_report === false">
              Нет
            </div>
            <div v-if="this.mainAdvertisement.photo_report === true">Да</div>
          </div>
          <p>Статистика <span class="main-adv__statistics" @click="getStatistics">Посмотреть статистику</span></p>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.reach_audience"
          >
            <div class="main-adv__characteristic-title">
              Охват аудитории:
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.reach_audience }}
            </div>
          </div>
          <div
              class="main-adv__characteristic"
              v-if="this.mainAdvertisement.number_views_day"
          >
            <div class="main-adv__characteristic-title">
              Просмотров за сутки:
            </div>
            <div class="middle_line"></div>
            <div>
              {{ this.mainAdvertisement.number_views_day }}
            </div>
          </div>
          <div
              class="main-adv__characteristic line"
              v-if="this.mainAdvertisement.make_and_place_advertising"
          >
            <div class="main-adv__characteristic-title">
              {{ this.mainAdvertisement.make_and_place_advertising_name }}
            </div>
            <div class="middle_line"></div>
            <div
                v-if="
                  this.mainAdvertisement.make_and_place_advertising === false
                "
            >
              Нет
            </div>
            <div
                v-if="
                  this.mainAdvertisement.make_and_place_advertising === true
                "
            >
              Да
            </div>
          </div>
        </div>
<!--        <div class="main-adv__social-block">-->
<!--          <div>Поделиться:</div>-->
<!--          <div class="main-adv__socials-block">-->
<!--            <div-->
<!--              v-for="social in this.mainAdvertisement.person.social"-->
<!--              :key="social.id"-->
<!--              class="main-adv__social"-->
<!--            >-->
<!--              <img :src="social.photo_url" alt="" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="main-adv__complain" @click="complaintAdv">-->
<!--          Пожаловаться на объявление-->
<!--        </div>-->
<!--        <div v-if="complaintSend" class="main-adv__complain-success">-->
<!--          <div class="main-adv__complain-success_text">-->
<!--            Ваша жалоба отправлена-->
<!--          </div>-->
<!--          <CloseIcon-->
<!--            @click="complaintSendClose()"-->
<!--            class="main-adv__complain-success_close"-->
<!--          />-->
<!--        </div>-->

        <div
          class="main-adv__complain-list"
          v-if="this.complaintAdvData"
          v-click-outside="complaintAdvOutside"
        >
          <CloseModal
            class="main-adv__close-complain"
            @click="complaintAdvClose"
          />
          <div class="main-adv__complain-list-title">
            Укажите причины жалобы
          </div>
          <div
            v-for="complain in this.complaintList"
            :key="complain.id"
            class="main-adv__complain-list-item"
          >
            <InputCheckbox
              :set-value="formDataComplain.complainTypeList"
              :id="complain.complaint_type_id + ''"
              :label="complain.complaint_type_name"
              @click.native="hanbleReOpen"
            />
          </div>
          <DefaultButton
            class="main-adv__complain-button"
            @click.native="sendComplain"
          >
            Отправить
          </DefaultButton>
          <TokenNotProvided
            class="main-adv__complain-error"
            :error-comment="errorComplain"
          />
          <Notification
            :message="errorComplain['complaint_type_ids']"
            v-if="errorComplain"
            class="main-adv__complain-error-notification"
          />
        </div>
<!--        <div class="main-adv__statistics" @click="getStatistics">-->
<!--          Статистика-->
<!--        </div>-->
<!--        <div v-if="this.banners">-->
<!--          <div v-for="banner in this.banners" :key="banner.id">-->
<!--            <a :href="banner.url">-->
<!--              <img-->
<!--                :src="banner.file.download_link"-->
<!--                :alt="banner.name"-->
<!--                class="main-adv__banner-img"-->
<!--                :title="banner.name"-->
<!--              />-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
      </div>
<!--      <div v-if="!$device.isDesktop" class="main-adv__comment-block">-->
<!--        <div class="main-adv__title">-->
<!--          Комментарии-->
<!--          <span class="main-adv__amount-comment">-->
<!--            ({{ this.commentList.length }})-->
<!--          </span>-->
<!--        </div>-->
<!--        <div v-for="comment in this.commentList" :key="comment.id">-->
<!--          <div class="main-adv__comment-body">-->
<!--            <div>-->
<!--              <img :src="comment.avatar" alt="avatar" />-->
<!--            </div>-->
<!--            <div>-->
<!--              <div>-->
<!--                {{ comment.name }}-->
<!--              </div>-->
<!--              <div class="main-adv__comment-date-create">-->
<!--                Оставлено-->
<!--                {{ comment.created_at }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="main-adv__message">-->
<!--            {{ comment.message }}-->
<!--          </div>-->
<!--        </div>-->
<!--        <div>-->
<!--          <div class="main-adv__comment-title">Оставить комментарий</div>-->
<!--          <InputTextarea-->
<!--            :set-value="formDataComment"-->
<!--            :id="'comment'"-->
<!--            :label="'comment'"-->
<!--            :placeholder="'Введите текст'"-->
<!--          />-->
<!--          <div v-if="errorComment">-->
<!--            <Notification-->
<!--              :message="errorComment['message']"-->
<!--              v-if="errorComment['message'] !== 'Token not provided'"-->
<!--            />-->
<!--          </div>-->
<!--          <DefaultButton-->
<!--            class="main-adv__comment-button"-->
<!--            @click.native="storeAdvertisementComment"-->
<!--          >-->
<!--            Опубликовать-->
<!--          </DefaultButton>-->
<!--          <TokenNotProvided :error-comment="errorComment" />-->
<!--          <Notification-->
<!--            :message="errorComment['non_field_error']"-->
<!--            v-if="errorComment"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="main-adv__hashtags shadow_effect">
      <p class="hashtag_title">Теги</p>
      <div class="hashtags">
        <div
            v-for="hashtag in this.mainAdvertisement.hashtags"
            :key="hashtag.id"
        >

          <div class="main-adv__hashtag">
            #{{ hashtag }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="main-adv__block-carousel"
      v-if="this.intersectAdvertisements.length"
    >
      <div class="main-adv__title">Похожие объявления</div>
      <VueSlickCarousel
        :arrows="false"
        v-bind="settingsAds"
        class="main-adv__slick-advs new_world"
      >
        <div v-for="ads in this.intersectAdvertisements" :key="ads.id">
          <SmallCard
            :ads-data="ads"
            :add-advertisement-favorite="addAdvertisementFavoriteSmall"
            :delete-advertisements-favorite="deleteAdvertisementsFavorite"
          />
        </div>
      </VueSlickCarousel>
    </div>
    <div class="main-adv__block-carousel" v-if="this.lastAdvertisement.length">
      <div class="main-adv__title">Вы смотрели</div>
      <VueSlickCarousel
        :arrows="false"
        v-bind="settingsAds"
        class="main-adv__slick-advs main-adv__slick-advs-viewed new_world"
      >
        <div v-for="ads in this.lastAdvertisement" :key="ads.id">
          <SmallCard :ads-data="ads" />
        </div>
      </VueSlickCarousel>
    </div>

    <!-- popup -->
    <DefaultModal v-if="openModal" :on-close="() => (openModal = !openModal)">
      <div class="main-adv__statistick-body">
        <Chart
          :data="this.statisticsData.statistics"
          :data-top="this.statisticsData"
        />
      </div>
    </DefaultModal>

    <DefaultModal
      v-if="openModalWriteToTheAuthor"
      :on-close="() => (openModalWriteToTheAuthor = !openModalWriteToTheAuthor)"
    >
      <div class="main-adv__title-message">Написать сообщение</div>
      <div class="main-adv__message-section">
        <div class="main-adv__message-block">
          <div class="main-adv__authir-block">
            <img :src="mainAdvertisement.person.avatar" alt="" />
            <div>
              {{ mainAdvertisement.person.name }}
            </div>
          </div>
          <div class="main-adv__phone-block-modal">
            <Phone />
            {{ mainAdvertisement.person.phone }}
          </div>
        </div>
        <div class="main-adv__message-text-block">
          <InputTextarea
            :set-value="formDataToSend"
            :id="'message'"
            :label="'message'"
            :placeholder="'Написать'"
          />
          <label for="files">
            <Clip />
            <input
              type="file"
              id="files"
              ref="files"
              multiple
              v-on:change="handleFilesUploads()"
              hidden
            />
          </label>
        </div>
        <div class="main-adv__message-bottom">
          <div>Вы можете прикрепить файл форматов jpg, png, pdf</div>
          <DefaultButton
            class="main-adv__message-button"
            @click.native="sendMessage"
          >
            Отправить
          </DefaultButton>
          <TokenNotProvided
            :error-comment="this.errorSendMessage"
            class="main-adv__errore-send-message"
          />
        </div>
        <Notification
          :message="errorSendMessage['non_field_error']"
          v-if="errorSendMessage"
        />
        <Notification
          :message="errorSendMessage['text']"
          v-if="errorSendMessage"
        />
      </div>
    </DefaultModal>
    <MessageSend v-if="messageSendTrigger" :close="messageSendModalClose" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultButton from "@/components/atoms/buttons/MainButton.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import SmallCard from "@/components/molecules/SmallCard.vue";
import Chart from "@/components/molecules/Chart.vue";
import Eye from "@/assets/images/icons/eye.svg?inline";
import Phone from "@/assets/images/icons/phone.svg?inline";
import Location from "@/assets/images/icons/Map_Point.svg?inline";
import Calendar from "@/assets/images/icons/Calendar.svg?inline";
import Star from "@/assets/images/icons/star.svg?inline";
import InputCheckbox from "@/components/atoms/inputs/InputCheckboxMain.vue";
import InputTextarea from "@/components/atoms/inputs/InputTextarea.vue";
import InputText from "@/components/atoms/inputs/InputText.vue";
import DefaultModal from "@/components/molecules/DefaultModal.vue";
import SelectArrow from "@/assets/images/arrow/select-arrow.svg?inline";
import Clip from "@/assets/images/icons/clip.svg?inline";
import BreadCrumbs from "@/components/molecules/BreadCrumbs.vue";
import MessageSend from "@/components/molecules/MessageSend.vue";
import CloseIcon from "@/assets/images/icons/close-small.svg?inline";

import Facebook from "@/assets/images/social/facebook.svg?inline";
import Vk from "@/assets/images/social/vk.svg?inline";
import Twiter from "@/assets/images/social/twiter.svg?inline";
import Odnoclasniki from "@/assets/images/social/odnoclasniki.svg?inline";
import Notification from "@/components/errors/Notification";
import TokenNotProvided from "@/components/errors/TokenNotProvided";
import Search from "@/components/molecules/Search.vue";
import ClickOutside from "vue-click-outside";
import CloseModal from "@/assets/images/icons/close-modal.svg?inline";

export default {
  name: "MainAdv",
  data() {
    return {
      userId: "",
      openModal: false,
      openModalWriteToTheAuthor: false,
      offerPrice: false,
      mainAdvertisement: {},
      lastAdvertisement: {},
      intersectAdvertisements: {},
      advertisementId: {},
      formDataComplain: {
        complainTypeList: {},
      },
      formDataToSend: {
        message: "",
        price: "",
      },
      formDataComment: {},
      settingsAds: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      },
      page: {},
      pageId: "",
      pageIdNew: "",
      banners: {},
      complaintList: {},
      complaintAdvData: false,
      showContactData: "",
      commentList: {},
      statisticsData: "",
      offerPriceData: "",
      files: [],
      error: null,
      errorComment: null,
      errorComplain: null,
      errorPrice: null,
      errorTokenFavorite: null,
      errorSendMessage: null,
      activeFavoriteChat: false,
      messageSendTrigger: false,
      complaintSend: false,
      priceSend: false,
      categoryTrigger: false,
      categoryKey: null,
      mainCategory: {},
    };
  },
  components: {
    VueSlickCarousel,
    DefaultButton,
    SmallCard,
    Eye,
    Phone,
    Location,
    Calendar,
    Star,
    InputCheckbox,
    InputText,
    InputTextarea,
    DefaultModal,
    Odnoclasniki,
    Twiter,
    Vk,
    Facebook,
    SelectArrow,
    Clip,
    Notification,
    TokenNotProvided,
    Chart,
    Search,
    CloseModal,
    BreadCrumbs,
    MessageSend,
    CloseIcon,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    iterationComplaint() {
      const complain = Object.keys(this.formDataComplain.complainTypeList);
      const complainArray = [];
      for (let i = 0; i < complain.length; i++) {
        if (this.formDataComplain.complainTypeList[complain[i]] != false) {
          complainArray.push(complain[i]);
        }
      }
      return complainArray;
    },
    triggerStorageBC() {
      if (localStorage.getItem("BreadCrumbsTitle") == null) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.getCategoryList();
    this.showAdvertisement();
    this.getLastAdvertisements();
    this.getIntersectAdvertisements();
    this.getPages();
    this.getAdvertisementCommentList();
  },
  directives: {
    ClickOutside,
  },
  async fetch() {
    const data = [
      this.$axios.get("/showAdvertisement", {
        params: {
          advertisement_id: this.$route.params.pathMatch,
        },
      }),
    ];
    const [mainAdvertisement] = await Promise.all(data);
    this.mainAdvertisement = mainAdvertisement.data.data;
  },
  methods: {
    hanbleReOpen() {
      setTimeout(() => {
        this.complaintAdvData = false;
      }, 0);
      setTimeout(() => {
        this.complaintAdvData = true;
      }, 0);
    },
    async showAdvertisement() {
      try {
        await this.$axios
          .get("/showAdvertisement", {
            params: {
              advertisement_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.mainAdvertisement = res.data.data;
            this.getCategoryKey();
          });
        this.userId = this.mainAdvertisement.person.id;
      } catch (e) {
        this.error = e.response.data;
      }
    },
    getCategoryKey() {
      setTimeout(() => {
        if (!this.triggerStorageBC) {
          this.categoryTrigger = true;
          this.categoryKey = this.mainCategory.find(
            (x) => x.category_id == this.mainAdvertisement.category.category_id
          ).category_key;
        }
      }, 0);
    },
    async getCategoryList() {
      try {
        await this.$axios
          .get("/getCategoryList", {
            params: {
              type: "performer",
            },
          })
          .then((res) => {
            this.mainCategory = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getLastAdvertisements() {
      try {
        await this.$axios.get("/getLastAdvertisements").then((res) => {
          this.lastAdvertisement = res.data.data;
        });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getIntersectAdvertisements() {
      try {
        await this.$axios
          .get("/getIntersectAdvertisements", {
            params: {
              advertisement_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.intersectAdvertisements = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async addAdvertisementFavorite() {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: this.$route.params.pathMatch,
        });
        this.showAdvertisement();
      } catch (e) {
        this.errorTokenFavorite = e.response.data;
      }
    },
    async getPages() {
      try {
        await this.$axios.get("/getPages").then((res) => {
          this.page = res.data.data;
        });
        for (let i = 0; i < this.page.length; i++) {
          this.pageId = this.page[0];
        }
        this.pageIdNew = this.pageId.id;
        this.getBanners();
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async getBanners() {
      try {
        await this.$axios
          .get("/getBanners", {
            params: {
              page_id: this.pageIdNew,
            },
          })
          .then((res) => {
            this.banners = res.data.data;
          });
      } catch (e) {
        this.error = e.response.data;
      }
    },
    async complaintAdv() {
      try {
        await this.$axios
          .get("/getComplaintTypeList", {
            params: {
              complaint_type: "3",
            },
          })
          .then((res) => {
            this.complaintList = res.data.data;
            this.complaintAdvData = true;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    complaintAdvClose() {
      this.complaintAdvData = false;
    },
    complaintAdvOutside() {
      this.complaintAdvData = false;
    },
    async sendComplain() {
      const { formDataComplain } = this;
      try {
        await this.$axios
          .post("/storeAdvertisementComplaint", {
            advertisement_id: this.$route.params.pathMatch,
            complaint_type_ids: this.iterationComplaint,
          })
          .then((res) => {
            this.complaintList = res.data.data;
            this.complaintAdvData = false;
            this.complaintSendOpen();
          });
      } catch (e) {
        this.errorComplain = e.response.data;
      }
    },
    async showContact() {
      this.$router.push(`/login`);
    },
    async getAdvertisementCommentList() {
      try {
        await this.$axios
          .get("/getAdvertisementCommentList", {
            params: {
              advertisement_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.commentList = res.data.data;
          });
      } catch (e) {
        this.error = e.response;
      }
    },
    async getStatistics() {
      try {
        await this.$axios
          .get("/getStatisticsForAdvertisement", {
            params: {
              advertisement_id: this.$route.params.pathMatch,
            },
          })
          .then((res) => {
            this.statisticsData = res.data.data;
          });
        this.openModal = true;
      } catch (e) {
        this.error = e.response;
      }
    },
    async storeAdvertisementComment() {
      const { formDataComment } = this;
      try {
        await this.$axios
          .post("/storeAdvertisementComment", {
            advertisement_id: this.$route.params.pathMatch,
            message: formDataComment.comment,
          })
          .then(() => {});
        this.getAdvertisementCommentList();
        formDataComment.comment = "";
      } catch (e) {
        this.errorComment = e.response.data;
      }
    },
    async sendMessage() {
      const { formDataToSend } = this;
      let formData = new FormData();
      let files = "";
      for (var i = 0; i < this.files.length; i++) {
        files = this.files[i];
        formData.append("files[" + i + "]", files);
      }
      formData.append("text", formDataToSend.message);
      formData.append("advertisement_id", this.$route.params.pathMatch);
      try {
        await this.$axios.post("/sendMessage", formData).then(() => {});
        this.openModalWriteToTheAuthor = false;
        this.messageSendModalOpen();
        formDataToSend.message = "";
      } catch (e) {
        this.errorSendMessage = e.response.data;
      }
    },
    getAuthorAllAdvertisements() {
      this.$router.push(`/all-advertisement/${this.$route.params.pathMatch}`);
    },
    getCompanyAllAdvertisements() {
      this.$router.push(
        `/all-advertisement/company${this.mainAdvertisement.person.id}`
      );
    },
    openModelWriteAuthor() {
      this.openModalWriteToTheAuthor = true;
    },
    userDetail() {
      if (this.mainAdvertisement.person_type === "Компания") {
        this.$router.push(`/company-detail/${this.userId}`);
      } else this.$router.push(`/user-detail/${this.userId}`);
    },
    sendOfferPrice() {
      if (this.offerPrice === false) {
        this.offerPrice = true;
      } else this.offerPrice = false;
    },
    async sendYourPrice() {
      const { formDataToSend } = this;
      try {
        await this.$axios
          .post("/offerYourPrice", {
            currency_id: "1",
            price: formDataToSend.offerPriceData,
            advertisement_id: this.$route.params.pathMatch,
          })
          .then(() => {});
      } catch (e) {
        this.errorPrice = e.response.data;
      }
      this.offerPrice = false;
      this.priceSendOpen();
      formDataToSend.offerPriceData = "";
    },
    handleFilesUploads() {
      this.files = this.$refs.files.files;
    },
    async addAdvertisementFavoriteSmall(id) {
      try {
        await this.$axios.post("/addAdvertisementFavorite", {
          advertisement_id: id,
        });
        this.getIntersectAdvertisements();
      } catch (e) {
        this.errorAddtoFavorite = e.response.data;
      }
    },
    async deleteAdvertisementsFavorite() {
      let advertisementIds = [];
      advertisementIds.push(this.$route.params.pathMatch);
      try {
        await this.$axios.delete("/deleteAdvertisementsFavorite", {
          params: {
            advertisement_ids: advertisementIds,
          },
        });
        this.showAdvertisement();
      } catch (e) {
        this.errorTokenFavorite = e.response.data;
      }
    },
    messageSendModalOpen() {
      this.messageSendTrigger = true;
    },
    messageSendModalClose() {
      this.messageSendTrigger = false;
    },
    complaintSendOpen() {
      this.complaintSend = true;
    },
    complaintSendClose() {
      this.complaintSend = false;
    },
    priceSendClose() {
      this.priceSend = false;
    },
    priceSendOpen() {
      this.priceSend = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-adv {
  &__title {
    font-size: $g-second-title-size;
    padding: 15px 0 20px 0;
  }

  &__main-section {
    display: flex;
    margin-top: 20px;
  }

  &__persob-block {
    width: 35%;
  }

  &__main-section-slider {
    width: 65%;
    margin-right: 30px;

    img {
      &:hover {
        cursor: pointer;
      }
    }

    /deep/.slick-prev {
      left: 0;
      z-index: 10;
    }

    /deep/.slick-next {
      right: 0;
      z-index: 10;
    }
  }

  &__slider-big-container {
    max-height: 595px;

    img {
      min-height: 100%;
      min-width: 100%;
      width: 100%;
      height: 595px;
      max-width: none;
      max-height: 595px;
      display: block;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      object-fit: cover;
    }
  }

  &__socials-block {
    display: flex;
  }

  &__slider-big {
    width: auto;
    max-height: 595px;
    margin: auto;
  }

  &__slider-small {
    width: auto;
    max-height: 80px;
    margin: 20px auto auto auto;
  }

  &__hashtag {
    display: inline-block;
    background: #d4e3f6;
    padding: 6.5px 10px;
    margin: 0 10px 10px 0;
  }

  &__decore-line {
    border: 1px solid $mainFourthColor;
    margin: 30px 0 50px 0;
  }

  &__price {
    font-size: $g-big-title-size;
    font-weight: 500;
  }

  &__write-to-the-author {
    background: $mainColor;
    margin: 25px 0 10px 0;
    max-width: 100%;

    &:hover {
      background: #4d8eee;
    }

    &:active {
      background: #1167ea;
    }
  }

  &__offer-your-price {
    border: 1px solid $mainColor;
    max-width: 100%;

    /deep/button {
      color: $mainColor;

      &:hover {
        color: $mainSecondColor;
      }
    }

    &:hover {
      background: #4d8eee;
    }

    &:active {
      background: #1167ea;
    }
  }

  &__person-block {
    display: flex;
    padding: 25px 0;

    &:hover {
      cursor: pointer;
      color: $mainColor;
      text-decoration: underline;
    }
  }

  &__person-avatar {
    width: 68px;
    height: 68px;
    margin-right: 30px;
    object-fit: cover;
  }
  &__slick-hashtags,
  &__slick-advs {
    width: 101.5%;
    margin: auto;
  }

  &__complain-success {
    margin-top: 17px;
    padding: 12px 10px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    background: #d4e3f6;
  }

  &__complain-success_close {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  /deep/.slick-prev {
    left: -18px !important;
    z-index: 1;
    width: 30px;
    height: 30px;
  }
  /deep/.slick-next {
    right: -16px !important;
    width: 30px;
    height: 30px;
  }
  /deep/.slick-prev:before {
    font-size: 30px;
  }
  /deep/.slick-next:before {
    font-size: 30px;
  }
  /deep/.slick-prev:before {
    background-image: url("@/assets/images/slick/slick-prev.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: transparent;
  }
  /deep/.slick-next:before {
    background-image: url("@/assets/images/slick/slick-next.png");
    background-size: 100%;
    transform: rotate(180deg);
    background-repeat: no-repeat;
    color: transparent;
  }

  &__service-info-block {
    display: flex;
  }

  &__service-info-block-left {
    display: flex;
    justify-content: space-between;
    width: 65%;
    margin-right: 30px;
  }

  &__service-info-block-right {
    display: flex;
    align-items: center;
    background: #d4e3f6;
    padding: 5px 30px;
  }

  &__hashtags {
    display: flex;
    flex-wrap: wrap;
  }

  &__banner-img {
    width: 362px;
    height: 362px;
  }

  &__all-advs-author {
    color: $mainColor;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__views {
    display: flex;

    svg {
      margin-right: 10px;
    }

    div {
      display: flex;
      color: $mainFifthColor;
    }
  }

  &__views-all {
    margin-right: 10px;
    padding-bottom: 20px;
  }

  &__views-all-count {
    margin-right: 20px;
  }

  &__phone-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $mainColor;
    padding: 10px 20px;
    margin-top: 15px;

    div {
      display: flex;
      align-items: center;

      svg {
        margin-right: 15px;
      }
    }
  }

  &__phone-block-modal {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    border: 1px solid $mainColor;
    padding: 10px 20px;
    margin-top: 15px;
    max-height: 44px;

    svg {
      position: relative;
      top: 0;
      left: 0;
      margin-right: 10px;
    }
  }

  &__contact {
    padding-bottom: 15px;
  }

  &__contact:last-child {
    padding-bottom: 0;
  }

  &__contacts-block {
    padding-top: 20px;

    div {
      display: flex;
      align-items: center;

      img {
        margin-right: 15px;
      }
    }
  }

  &__statistics {
    color: $mainFifthColor;
    padding: 15px 0 20px 0;
    display: inline-block;

    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__complain {
    color: $mainFifthColor;

    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__location-block {
    display: flex;
    align-items: center;
    font-size: $g-mobile-size;

    div {
      padding: 0 20px 0 10px;
    }
  }

  &__date-add {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__add-to-favorites-container {
    padding: 10px 30px;
  }

  &__add-to-favorites {
    position: relative;
    display: flex;
    align-items: center;
    background: $mainSecondColor;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    border-radius: 50px;
    font-size: $g-mobile-size;

    svg {
      margin-left: 10px;
      position: relative;
      top: 2px;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }
  }

  &__complain-button {
    background: $mainColor;
    margin-top: 10px;
    width: 320px;

    &:hover {
      background: #4d8eee;
    }

    &:active {
      background: #1167ea;
    }
  }

  &__complain-list {
    position: absolute;
    background: $mainSecondColor;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    padding: 20px;
  }

  &__complain-list-title {
    text-align: center;
    padding-bottom: 20px;
  }

  &__complain-list-item {
    padding-bottom: 20px;
  }

  &__slick-advs-viewed {
    padding-bottom: 90px;
  }

  &__comment-button {
    background: $mainColor;
    margin: 20px 0 15px 0;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__comment-title {
    padding: 25px 0 20px 0;
  }

  &__comment-body {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

    img {
      width: 48px;
      height: 48px;
      margin-right: 30px;
      object-fit: cover;
    }
  }

  &__main-section-slider-small {
    /deep/.slick-slide {
      width: 130px !important;
    }
  }

  &__comment-date-create {
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__message {
    line-height: 20px;
  }

  &__wrap {
    background: $mainSecondColor;
    padding: 25px 20px;
    margin: 30px 0 50px 0;
  }

  &__amount-comment {
    color: $mainFifthColor;
  }

  &__characteristic {
    display: inline-block;
    font-size: $g-mobile-size;
    margin-bottom: 30px;
  }

  &__characteristic:nth-child(1) {
    padding-left: 0;
  }

  &__characteristic-title {
    color: $mainFifthColor;
    line-height: 16px;
    padding-bottom: 5px;
  }

  &__characteristic-line {
    margin: 0 20px;
    display: inline-block;
    border: 1px solid $mainFourthColor;
    height: 30px;
  }

  &__social-block {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    div {
      padding-right: 10px;
    }
    svg {
      width: 24px;

      :hover {
        cursor: pointer;
      }
    }
  }

  &__message-block {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }

  &__message-section {
    width: 754px;
  }

  &__title-message {
    line-height: 21px;
    font-size: $g-font-third-size;
    padding-bottom: 30px;
  }

  &__authir-block {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      max-width: 70px;
      max-height: 70px;
    }
  }

  &__message-button {
    background: $buttonColor;
    width: 166px;
  }

  &__message-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    color: $mainFifthColor;
    font-size: $g-mobile-size;
  }

  &__offer-your-price-button {
    background: $mainColor;
    margin-top: 10px;
    max-width: 100%;

    &:hover {
      @include hover-main-color;
    }

    &:active {
      @include active-main-color;
    }
  }

  &__offer-your-price-block {
    background: $mainSecondColor;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    padding: 20px;
    position: absolute;
    top: 0;
  }

  &__offer-your-price-title {
    padding: 0px 68px 15px 68px;
    text-align: center;
    line-height: 16px;
  }

  &__offer-your-currency {
    display: flex;

    /deep/input {
      width: 186px !important;
    }
  }

  &__currency-block {
    border: 1px solid $mainFourthColor;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  &__offer-your-price-wriper {
    position: relative;
  }

  &__message-text-block {
    position: relative;

    svg {
      top: 50px;
      right: 5px;
    }
  }

  .activeFavorite {
    fill: $mainColor;
  }

  &__errore {
    position: absolute;
    top: 40px;
    color: #ff4343;
  }

  &__show-contact {
    &:hover {
      cursor: pointer;
      color: $mainColor;
    }
  }

  &__errore-send-message {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    width: 430px;
  }

  &__token-error {
    position: absolute;
    width: 430px;
    top: 43px;
    left: 0;
    z-index: 1;
    background: white;
  }

  &__complain-error {
    position: absolute;
    width: 500px;
    background: white;
    margin-top: 10px;
  }
  &__container {
    display: inline-block;
    padding: 15px 0 0 0;
  }
  &__name-route {
    color: $mainFifthColor;
    cursor: pointer;

    &:hover {
      color: $mainColor;
    }
  }

  &__complain-error-notification {
    max-width: 300px;
    padding-top: 5px;
  }

  &__close-complain {
    position: absolute;
    right: 10px;
    top: 10px;

    &:hover {
      cursor: pointer;
    }
  }

  /deep/.modal-container {
    padding: 20px;
  }
}

@media (max-width: $break-xlg) {
  .main-adv {
    padding: 10px 5px;

    &__main-section {
      flex-direction: column;
    }

    &__main-section-slider {
      width: 100%;
      margin-right: 0;
    }

    &__slider-big-container {
      height: 575px;
      img {
        transform: none;
        position: static;
      }
    }

    &__title-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
    }

    &__add-to-favorites {
      width: 190px;
      padding: 8px 15px;
      height: 30px;
    }

    &__add-to-favorites {
      div {
        display: flex;
        align-items: center;
      }

      svg {
        top: 0;
      }
    }

    &__title {
      padding: 0;
      margin-right: 30px;
    }

    &__service-info-block {
      flex-direction: column;
    }

    &__service-info-block-right {
      width: 180px;
      justify-content: center;
      margin: 15px 0;
    }

    &__price-buttons {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
    }

    &__write-to-the-author {
      margin: 0;
      width: 49%;
    }

    &__offer-your-price-wriper {
      width: 49%;
    }

    &__wrap {
      margin-bottom: 20px;
    }

    &__comment-block {
      padding: 25px 10px;
      background: #fff;
      margin-top: 20px;
    }

    &__persob-block {
      width: 100%;
      padding: 0 10px;
      background: #fff;
    }

    &__phone-block {
      width: 357px;
    }

    &__block-carousel {
      margin-top: 35px;

      .main-adv__title {
        padding-bottom: 15px;
      }

      /deep/.small-card__image-conatiner {
        margin: 0;
        max-width: none;
      }
    }

    &__message-section {
      width: 600px;
    }
  }
}

@media (max-width: $break-sm) {
  .main-adv {
    padding: 0 7px;

    &__slider-big-container {
      height: 252px;

      img {
        max-height: 252px;
      }
    }

    &__service-info-block-left {
      width: 100%;
    }

    &__main-section-slider {
      /deep/.slick-prev:before,
      /deep/.slick-next:before {
        opacity: 1;
      }

      /deep/.slick-prev {
        left: 8px !important;
      }

      /deep/.slick-next {
        right: 8px !important;
      }
    }

    &__add-to-favorites {
      position: absolute;
      width: 30px;
      height: 30px;
      padding: 0;
      bottom: 0;
      right: 0;

      div {
        padding: 7px;
      }

      svg {
        margin: 0;
      }

      span {
        display: none;
      }
    }

    &__service-info-block {
      position: relative;
    }

    &__service-info-block-right {
      margin-bottom: 0;
    }

    &__price {
      padding-top: 15px;
    }

    &__price-buttons {
      flex-direction: column;
    }

    &__write-to-the-author {
      width: 100%;
      margin-bottom: 10px;
    }

    &__offer-your-price-wriper {
      width: 100%;
    }

    &__offer-your-price-block {
      top: 44px;
    }

    &__wrap {
      padding: 10px 4px;
    }

    &__characteristic-line.line {
      display: none;
    }

    &__characteristic.line {
      display: block;
      margin-bottom: 14px;
    }

    &__decore-line {
      margin: 15px 0;
    }

    &__person-avatar {
      margin-right: 6px;
    }

    &__person-block {
      padding: 7px 0 17px;
    }

    &__phone-block {
      width: 100%;
    }

    &__banner-img {
      width: 100%;
    }

    &__block-carousel {
      /deep/.slick-prev,
      /deep/.slick-next {
        display: none !important;
      }
    }

    &__message-section {
      width: 100%;
    }

    &__message-block {
      flex-direction: column;
    }

    &__slick-advs-viewed {
      padding-bottom: 20px;
    }

    /deep/.chart {
      min-width: auto;
      width: 300px;
    }

    /deep/.small-card {
      width: 95%;
    }

    /deep/.search {
      margin-top: 0;
    }
  }
}
</style>
