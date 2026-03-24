<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiService from '@/services/ApiService';
import AppForm from '@/components/Form.vue';
import { useCookies } from 'vue3-cookies';
import { useRoute } from 'vue-router';

/**
 * Component definition for updating user data.
 */
export default defineComponent({
    components: { AppForm },
    data() {
        // Initialize component properties
        let appComponent: any = this.$appComponent; 
        let emitter = this.$emitter(); 
        let config = this.$config();
        
        // Determine fields based on configuration and country
        let fields: any =
            this.$config() != undefined &&
            this.$config().updateData != undefined &&
            this.$config().updateData.form != undefined &&
            this.$config().updateData.form[this.$appComponent['country']] != undefined
                ? this.$config().updateData.form[this.$appComponent['country']]
                : [];
        
        // Initialize other data properties
        let arraySelects: any = {};
        let model: any = {};
        let responseRegister: any = {};
        let background: string = '';
        let windowFrame: boolean = false;
        let loadView = false;

        return {
            config,
            emitter,
            appComponent,
            fields,
            arraySelects,
            model,
            responseRegister,
            background,
            windowFrame,
            loadView,
        };
    },
    mounted() {
        // Fetch countries and populate the countryResidentList
        apiService.request('get_countries', {}).then((response: any) => {
            if (response.code == 0) {
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].value = response.data[i].Id;
                    response.data[i].name = response.data[i].Name;
                }
                Object.assign(this.arraySelects, { countryResidentList: response.data });
                
                // Set default country based on appComponent
                let countryDefault = response.data.filter((item) => {
                    return item.Iso == this.appComponent.country;
                });
                if (countryDefault.length > 0) {
                    this.model.countryResident_id = countryDefault[0].Id;
                    let value = this.model.countryResident_id;
                    let arraySelects = JSON.parse(JSON.stringify(this.arraySelects));
                    let countryIso = arraySelects['countryResidentList']
                        .filter((x) => x.Id == value)
                        .map((x) => x.Iso)[0];
                    
                    // Update fields based on country ISO
                    this.fields =
                        this.config != undefined &&
                        this.config.updateData != undefined &&
                        this.config.updateData.form != undefined &&
                        this.config.updateData.form[countryIso] != undefined
                            ? this.config.updateData.form[countryIso]
                            : this.fields;

                    // Populate arraySelects with options for select fields
                    this.fields.forEach((field) => {
                        if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                            let options: object = {};
                            options[field.optionsKey] = field.options;
                            Object.assign(this.arraySelects, options);
                        }
                    });

                    // Populate department list based on selected country
                    let departments = arraySelects['countryResidentList']
                        .filter((x) => x.Id == value)
                        .map((x) => x.departments)[0];
                    departments.forEach((department) => {
                        department.value = department.Id;
                        department.name = department.Name;
                    });
                    Object.assign(this.arraySelects, { departmentList: departments });
                    this.model['department_id'] = '';
                    this.model['city_id'] = '';
                }
                this.loadView = true;
            }
        });

        // Fetch teams if applicable
        if (
            this.fields.filter((item) => {
                return item.optionsKey == 'teamList';
            }).length > 0
        ) {
            apiService.request('get_teams', { country: this.appComponent.country }).then((response: any) => {
                if (response.code == 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].value = response.data[i].Id;
                        response.data[i].name = response.data[i].Name;
                    }
                    Object.assign(this.arraySelects, { teamList: response.data });
                    this.loadView = true;
                }
            });
        }

        // Set loadView to true if no relevant fields are found
        if (
            this.fields.filter((item) => {
                return item.optionsKey == 'countryResidentList';
            }).length == 0 &&
            this.fields.filter((item) => {
                return item.optionsKey == 'nationalityList';
            }).length == 0 &&
            this.fields.filter((item) => {
                return item.optionsKey == 'get_teams';
            }).length == 0
        ) {
            this.loadView = true;
        }

        // Populate arraySelects with options for select fields
        this.fields.forEach((field) => {
            if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                let options: object = {};
                options[field.optionsKey] = field.options;
                Object.assign(this.arraySelects, options);
            }
        });
    },
    methods: {
        /**
         * Handles form submission and updates user data.
         * @param values - The form values submitted by the user.
         */
        onSubmit(values: any) {
            // Map department_id and city_id to their respective objects
            values.department_id != undefined
                ? (values.department_id = this.arraySelects['departmentList'].filter(
                      (x) => x.Id == values.department_id,
                  )[0])
                : (values.department_id = null);
            values.city_id != undefined
                ? (values.city_id = this.arraySelects['cityList'].filter((x) => x.Id == values.city_id)[0])
                : (values.city_id = null);
            
            // Prepare parameters for API request
            let params1 = {
                city_id: values.city_id.Id,
                region_id: values.department_id.Id,
                site_id: values.site_id,
            };
            let params2 = {
                values,
            };
            console.log(params2);
            apiService.request('update_user_data', params2).then((response: any) => {
                if (response.code == 0) {
                    // Handle successful response
                } else {
                    var error_mensaje = '';
                    if (response.error_code != undefined) {
                        error_mensaje = this.$t('ERROR' + response.error_code.toString());
                    }
                    if (error_mensaje == '') {
                        error_mensaje = this.$t(
                            'Ocurrio un error inesperado en el sistema. Por favor intente mas tarde',
                        );
                    }
                }
            });
            this.closeModal();
        },
        
        /**
         * Handles changes in select fields and updates the form accordingly.
         * @param event - The event object containing the select change details.
         */
        changeSelect: function (event: any) {
            let value = event.event.target.value;
            let optionsKey = event.optionsKey;
            let arraySelects = JSON.parse(JSON.stringify(this.arraySelects));
            if (optionsKey == 'countryResidentList') {
                // Update fields based on selected country
                let countryIso = arraySelects['countryResidentList'].filter((x) => x.Id == value).map((x) => x.Iso)[0];
                this.fields =
                    this.config != undefined &&
                    this.config.updateData != undefined &&
                    this.config.updateData.form != undefined &&
                    this.config.updateData.form[countryIso] != undefined
                        ? this.config.updateData.form[countryIso]
                        : this.fields;

                // Populate arraySelects with options for select fields
                this.fields.forEach((field) => {
                    if (field.type == 'select' && field.options != undefined && field.options.length > 0) {
                        let options: object = {};
                        options[field.optionsKey] = field.options;
                        Object.assign(this.arraySelects, options);
                    }
                });

                // Populate department list based on selected country
                let departments = arraySelects['countryResidentList']
                    .filter((x) => x.Id == value)
                    .map((x) => x.departments)[0];
                departments.forEach((department) => {
                    department.value = department.Id;
                    department.name = department.Name;
                });
                Object.assign(this.arraySelects, { departmentList: departments });
                this.model['department_id'] = '';
                this.model['city_id'] = '';
            } else {
                // Update city list based on selected department
                if (optionsKey == 'departmentList') {
                    let cities = arraySelects['departmentList'].filter((x) => x.Id == value).map((x) => x.cities)[0];
                    cities.forEach((city) => {
                        city.value = city.Id;
                        city.name = city.Name;
                    });
                    Object.assign(this.arraySelects, { cityList: cities });
                    this.model['city_id'] = '';
                }
            }
        },
        
        /**
         * Closes the modal dialog.
         */
        closeModal() {
            this.appComponent.closeModal();
        },
    },
});
</script>

<template>
    <!-- Modal container for updating user data -->
    <div class="modal z-[999999999]">
        <div class="container-general w-auto flex flex-col justify-center items-center h-[98%]">
            <!-- Title section of the modal -->
            <div class="container-title bg-neutral w-full rounded-t-lg flex justify-center items-center h-16 relative">
                <h3 class="font-bold text-md md:text-xl text-success text-center w-3/5">Actualizacion de datos</h3>
            </div>
            <!-- Form section for user data update -->
            <div class="w-auto overflow-y-auto bg-neutral rounded-b-lg">
                <AppForm
                    :loading="loadView"
                    :title="''"
                    :fields="fields"
                    :styleWidth="true"
                    :window-frame="false"
                    :arraySelects="arraySelects"
                    :model="model"
                    :text-button="'Enviar'"
                    :textDown="''"
                    @onSubmit:form="onSubmit($event)"
                    @changeSelect:form="changeSelect($event)"
                />
            </div>
        </div>
    </div>
</template>

<!-- FILE DOCUMENTED -->
