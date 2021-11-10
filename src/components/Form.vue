<template>
  <div class="form">
    <v-card class="mt-3" max-width="800">
      <v-card-title class="ml-3 mt-5"> Личные данные</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="validForm" @submit.prevent="onSubmit">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.lastname"
                  :rules="[rules.required, rules.cyrillic]"
                  label="Фамилия"
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.firstname"
                  :rules="[rules.required, rules.cyrillic]"
                  label="Имя"
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.patronymic"
                  :rules="[rules.required, rules.cyrillic]"
                  label="Отчество"
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.birthday"
                  type="date"
                  :rules="[rules.required, rules.date]"
                  label="Дата рождения"
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="formData.email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <p class="text-subtitle-1 font-weight-bold">Пол</p>
                <v-radio-group v-model="formData.gender" mandatory row>
                  <v-radio label="Мужской" value="male"></v-radio>
                  <v-radio label="Женский" value="female"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <p class="text-h6 mb-0">Паспортные данные</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :value="formData.nationality"
                  :rules="[rules.required]"
                  label="Гражданство"
                  @input="onChangeNationality"
                  @focus="showDropdown = true"
                  @blur="onClickOutside"
                  dense
                  required
                ></v-text-field>
                <v-card
                  v-show="showDropdown && filteredNationality.length"
                  class="mx-auto"
                  max-width="400"
                  tile
                >
                  <v-list dense max-height="300" class="overflow-y-auto">
                    <v-list-item-group
                      v-model="selectedNationality"
                      color="primary"
                    >
                      <v-list-item
                        v-for="item in filteredNationality"
                        :key="item.id"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.nationality"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                <p v-if="!filteredNationality.length">Ничего не найдено</p>
              </v-col>
            </v-row>
            <v-container class="pa-0" v-if="isNationalitySelected && isRussian">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.passportSeries"
                    :rules="[
                      rules.required,
                      rules.numbers,
                      rules.passportSeriesRu,
                    ]"
                    label="Серия паспорта"
                    dense
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.passportNumber"
                    :rules="[
                      rules.required,
                      rules.numbers,
                      rules.passportNumberRu,
                    ]"
                    label="Номер паспорта"
                    dense
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.issuanceDate"
                    :rules="[rules.required, rules.date]"
                    type="date"
                    label="Дата выдачи"
                    dense
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container
              v-if="isNationalitySelected && !isRussian"
              class="pa-0"
            >
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.latinLastname"
                    :rules="[rules.required, rules.latin]"
                    label="Фамилия на латинице"
                    dense
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.latinFirstname"
                    :rules="[rules.required, rules.latin]"
                    label="Имя на латинице"
                    dense
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.passportNumber"
                    :rules="[rules.required, rules.numbers]"
                    label="Номер паспорта"
                    dense
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.issuanceCountry"
                    :items="citizenships"
                    item-text="nationality"
                    item-value="nationality"
                    label="Страна выдачи"
                    dense
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.passportType"
                    :items="passportTypes"
                    item-text="type"
                    item-value="type"
                    label="Тип паспорта"
                    dense
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-row>
              <v-col cols="12" md="12">
                <p class="text-subtitle-1 font-weight-bold">
                  Меняли ли фамилию или имя?
                </p>
                <v-radio-group v-model="formData.changeName" mandatory row>
                  <v-radio label="Нет" :value="false"></v-radio>
                  <v-radio label="Да" :value="true"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row v-if="formData.changeName">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.changedLastname"
                  :rules="[rules.required]"
                  label="Фамилия"
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.changedFirstname"
                  :rules="[rules.required, rules.cyrillic]"
                  label="Имя"
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="4">
                <v-btn color="primary" type="submit"> Отправить </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import citizenships from '../assets/data/citizenships.json';
import passportTypes from '../assets/data/passport-types.json';
import debounce from '../utils/debounce';

export default {
  data: () => ({
    validForm: false,
    formData: {
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      gender: 'male',
      nationality: '',
      latinLastname: '',
      latinFirstname: '',
      passportSeries: '',
      passportNumber: '',
      issuanceDate: '',
      issuanceCountry: '',
      passportType: '',
      changeName: false,
      changedLastname: '',
      changedFirstname: '',
    },
    selectedNationality: '',
    showDropdown: false,
    citizenships: citizenships,
    filteredNationality: '',
    passportTypes: passportTypes,
    rules: {
      required: (value) => !!value || 'Обязательное поле',
      passportNumberRu: (value) => value.length <= 6 || 'Максимум 6 цифр',
      passportSeriesRu: (value) => value.length <= 4 || 'Максимум 4 цифр',
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Некорректный e-mail';
      },
      cyrillic: (value) => {
        const pattern = /^[а-яА-ЯёЁ-\s]+$/;
        return pattern.test(value) || 'Только кириллица';
      },
      latin: (value) => {
        const pattern = /^[a-zA-Z-\s]+$/;
        return pattern.test(value) || 'Только кириллица';
      },
      numbers: (value) => /^[0-9]+$/.test(value) || 'Только цифры',
      date: (value) => {
        const d = new Date(value);
        if (isNaN(d) || d.getFullYear() < 1900 || d > Date.now()) {
          return 'Некорректная дата';
        } else {
          return true;
        }
      },
    },
  }),
  created() {
    this.filteredNationality = citizenships;
    this.debouncedSearchNationality = debounce(this.getNationality, 1000);
  },
  watch: {
    selectedNationality(value) {
      if (value !== undefined) {
        this.formData.nationality = this.filteredNationality[value].nationality;
      }
    },
  },
  computed: {
    isRussian: function () {
      return this.formData.nationality === 'Russia';
    },
    isNationalitySelected: function () {
      return this.formData.nationality !== '';
    },
  },
  methods: {
    onChangeNationality(value) {
      this.debouncedSearchNationality(value);
    },
    getNationality(value) {
      this.filteredNationality = citizenships.filter((item) => {
        return item.nationality.toLowerCase().includes(value.toLowerCase());
      });
    },
    onClickOutside() {
      // если сразу скрывать dropdown, то выбранное значение не попадает в инпут
      setTimeout(() => (this.showDropdown = false), 300);
    },
    onSubmit() {
      this.$refs.form.validate();
      if (!this.validForm) {
        this.$notify({
          group: 'form',
          type: 'error',
          title: 'Ошибка',
          text: 'Заполните все поля',
        });
      } else {
        this.$notify({
          group: 'form',
          type: 'success',
          text: 'Форма успешно заполнена',
        });
        console.log(JSON.stringify(this.formData));
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: center;
}
.citizenships {
  border-bottom: 1px solid grey;
}
</style>
