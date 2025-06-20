<script setup>
import StarReview from "@/assets/images/icons/star_review.svg?inline";
export default {
  name: "Reviews",
  data() {
    return {
      reviews: [
        { name: 'Алексей', date: '20.03.25', text: 'Pirate ipsum arrgh bounty warp jack. Locker heave chains ketch swab league. Hearties driver tales pillage coffer lubber ahoy main just. Man ahoy pounders pillage shiver american lugsail arrgh shot crack. Heave maroon pillage blimey no. Cup shot nipperkin quarterdeck blow to. Blow nipper nipper lubber on. Crow\'s sail brig cat run prey pinnace spyglass weigh. Main lugsail hands blow brethren hogshead boom.' },
        { name: 'Владимир', date: '20.03.25', text: 'Pirate ipsum arrgh bounty warp jack. Locker heave chains ketch swab league. Hearties driver tales pillage coffer lubber ahoy main just. Man ahoy pounders pillage shiver american lugsail arrgh shot crack. Heave maroon pillage blimey no. Cup shot nipperkin quarterdeck blow to. Blow nipper nipper lubber on. Crow\'s sail brig cat run prey pinnace spyglass weigh. Main lugsail hands blow brethren hogshead boom.' },
        { name: 'Анастасия', date: '20.03.25', text: 'Pirate ipsum arrgh bounty warp jack. Locker heave chains ketch swab league. Hearties driver tales pillage coffer lubber ahoy main just. Man ahoy pounders pillage shiver american lugsail arrgh shot crack. Heave maroon pillage blimey no. Cup shot nipperkin quarterdeck blow to. Blow nipper nipper lubber on. Crow\'s sail brig cat run prey pinnace spyglass weigh. Main lugsail hands blow brethren hogshead boom.' },
        { name: 'Егор', date: '20.03.25', text: 'Pirate ipsum arrgh bounty warp jack. Locker heave chains ketch swab league. Hearties driver tales pillage coffer lubber ahoy main just. Man ahoy pounders pillage shiver american lugsail arrgh shot crack. Heave maroon pillage blimey no. Cup shot nipperkin quarterdeck blow to. Blow nipper nipper lubber on. Crow\'s sail brig cat run prey pinnace spyglass weigh. Main lugsail hands blow brethren hogshead boom.' },
      ],
      optionReviews: {
        slidesPerView: 1.1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
      },
    };
  },
  components: {
    StarReview,
  },
  computed: {

  },
  methods: {
  },
};
</script>

<template>
    <div class="swiper" v-swiper:reviewsSwiper="optionReviews">
      <div class="swiper-wrapper">
        <div class="swiper-slide review-card shadow_effect" v-for="(review, i) in reviews" :key="i">
          <div class="review-header">
            <h4>{{ review.name }}</h4>
            <span>{{ review.date }}</span>
          </div>
          <div class="stars">5.0 <StarReview v-for="i in 5" /></div>
          <p>{{ review.text }}</p>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
</template>

<style scoped lang="scss">
.section .social_subtitle {
  color: #6D7885;
  margin-bottom: 30px;
  font-size: 16px;
}
.reviews .swiper-container {
  overflow: visible;
}
.reviews-swiper .review-card {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  width: 300px;
}
.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.review-card.shadow_effect {
  padding: 20px !important;
}
.review-header span {
  font-size: 14px;
  color: #6D7885;
}
.review-card.shadow_effect>p {
  color: #999;
  font-size: 14px;
  line-height: 18px;
}
.reviews h4 {
  font-size: 20px;
  font-weight: 500;
}
.stars {
  color: #000;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
}
.swiper-button-prev, .swiper-button-next {
  position: absolute;
  top: -30px;
}
.swiper-button-prev {
  right: 50px;
  left: unset;
}
.swiper-button-prev:after, .swiper-button-next:after {
  font-size: 10px;
  color: #000 !important;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 30px rgba(0,0,0, 0.2), -10px -10px 30px #fff;
  border-radius: 50%;
}
.swiper-button-prev, .swiper-button-next {
  color: #000;
}
</style>