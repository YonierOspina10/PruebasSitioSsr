<script lang="ts">
import { defineComponent } from 'vue';
import AppTable from '@/components/Table.vue';
import MenuUser3 from '@/components/menus/MenuUser3.vue';
import MenuUser from '@/components/menus/MenuUser.vue';
import Withdraw3 from '@/views/Balance/Withdraw3.vue';
import AppForm from '@/components/Form.vue';
import apiService from '@/services/ApiService';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import ExitIconRe from '@/components/icons/ExitIconRe.vue';

export default defineComponent({
    components: { ExitIconRe, DeleteIcon, AppForm, Withdraw3, MenuUser, MenuUser3, AppTable },
    data(){
        let appComponent: any = this.$appComponent;
        let config = this.$config(); // Retrieving configuration
        /**
         * Object to hold selected values for dropdowns.
         * @type {Object}
         */
        let arraySelects = {};
        let paypal = {}
        let notAccountPaypal = true
        let notAccountZelle = true
        let otherView = false
        let numAccountZelle = 0
        let modalDeleteAccount = false;
        let bankId = ''
        let dataOtherView = {
            nameP: '',
            id: ''
        }
        let value: any = {
            input: '',
            msg: '',
            color: '',
            validate: false,
        };
        let disabledButton: boolean = true;
        let zelle = {}
        let zelleSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M55.9893 95H45.0748C44.5827 95 44.1107 94.8092 43.7628 94.4695C43.4148 94.1298 43.2193 93.6691 43.2193 93.1888V82.82H25.5586C24.8803 82.819 24.2301 82.5556 23.7505 82.0874C23.2709 81.6192 23.001 80.9846 23 80.3225V71.945C23.0004 71.385 23.1924 70.8413 23.5455 70.4L54.8137 31.4675H26.9609C26.2813 31.4675 25.6295 31.204 25.1489 30.7349C24.6684 30.2658 24.3984 29.6296 24.3984 28.9662V19.6775C24.3984 18.3013 25.5471 17.18 26.957 17.18H43.2077V6.81125C43.2077 5.81375 44.0414 5 45.0633 5H55.9778C56.9997 5 57.8334 5.81375 57.8334 6.81125V17.18H74.4414C75.8513 17.18 77 18.3013 77 19.6775V27.6912C76.999 28.2482 76.8085 28.789 76.4583 29.2288L44.9942 68.5325H74.4414C75.8513 68.5325 77 69.6537 77 71.03V80.3187C77 80.9815 76.7306 81.6171 76.2508 82.0861C75.7711 82.555 75.1203 82.819 74.4414 82.82H57.8449V93.1888C57.8449 93.6691 57.6494 94.1298 57.3014 94.4695C56.9534 94.8092 56.4815 95 55.9893 95Z" fill="currentColor"/></svg>`
        let paypalSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M52.0489 8C63.7364 8 73.0447 16.375 75.1489 26.9458C82.9781 30.9625 87.8031 39.7667 86.1781 49.0583L85.9864 50.0208L85.7864 50.925C84.5905 56.3051 81.6502 61.1393 77.4229 64.6756C73.1956 68.2119 67.9182 70.2522 62.4114 70.4792L61.3822 70.5H55.3281L53.1739 84.2875C52.8846 86.1351 51.9824 87.8316 50.6122 89.1043C49.242 90.377 47.4836 91.1518 45.6197 91.3042L44.9406 91.3333H36.7072C34.6028 91.3338 32.5762 90.538 31.0343 89.1059C29.4924 87.6737 28.5494 85.7112 28.3947 83.6125L28.3739 83H21.3322C20.1804 82.9999 19.0411 82.7609 17.9862 82.2983C16.9314 81.8356 15.9839 81.1593 15.2036 80.3121C14.4233 79.4648 13.8271 78.465 13.4526 77.3757C13.0782 76.2864 12.9336 75.1313 13.0281 73.9833L13.0989 73.3792L21.6656 18.5708C22.106 15.7501 23.4987 13.1652 25.6121 11.2458C27.7255 9.32648 30.4323 8.1884 33.2822 8.02083L34.0156 8H52.0531H52.0489ZM74.9156 37.1125L74.8781 37.2625C73.3903 43.1856 69.9674 48.4425 65.1525 52.1992C60.3375 55.9559 54.406 57.9974 48.2989 58H40.6031L37.3531 78.8333H37.3614L36.7072 83H44.9406L47.0947 69.2125C47.4017 67.2494 48.4001 65.4605 49.9098 64.1686C51.4194 62.8766 53.3411 62.1667 55.3281 62.1667H61.3822C65.1736 62.166 68.8515 60.8727 71.8088 58.5002C74.7661 56.1277 76.8262 52.8177 77.6489 49.1167L77.8531 48.2125C78.2896 46.2624 78.2506 44.2358 77.7393 42.3039C77.2281 40.372 76.2596 38.5915 74.9156 37.1125ZM52.0531 16.3333H34.0072C33.0942 16.3338 32.2066 16.6342 31.4809 17.1882C30.7552 17.7423 30.2316 18.5194 29.9906 19.4L29.8947 19.8583L21.3322 74.6667H29.5656L32.3697 56.7125C32.6592 54.8643 33.5621 53.1672 34.9331 51.8945C36.3041 50.6217 38.0635 49.8473 39.9281 49.6958L40.6031 49.6667H48.2947C57.0447 49.6667 64.6697 43.7167 66.7947 35.2375C67.3419 33.0593 67.3996 30.7869 66.9636 28.5837C66.5276 26.3805 65.6088 24.3014 64.2733 22.4957C62.9378 20.69 61.2187 19.2028 59.2397 18.1408C57.2607 17.0789 55.071 16.4687 52.8281 16.3542L52.0489 16.3333H52.0531Z" fill="currentColor"/></svg>`
        return {
            appComponent,
            config,
            arraySelects,
            paypal,
            zelle,
            notAccountPaypal,
            notAccountZelle,
            otherView,
            dataOtherView,
            value,
            disabledButton,
            numAccountZelle,
            modalDeleteAccount,
            bankId,
            zelleSVG,
            paypalSVG
        }
    },
    mounted() {
        this.getBanks()
    },
    methods:{
       /**
        * Fetches the list of banks available for selection.
        */
       getBanks() {
           apiService.request('get_banks', {type: "digitals"}).then((response: any) => {
               if (response.code == 0) {
                   for (var i = 0; i < response.data.length; i++) {
                          if (response.data[i].Name == 'Zelle') {
                              this.zelle = response.data[i]
                          } else if (response.data[i].Name == 'Paypal') {
                              this.paypal = response.data[i]
                          }
                   }
                   Object.assign(this.arraySelects, {
                       bankList: response.data, // Update bank list
                   });

                   this.getAccount(this.paypal)
                   this.getAccount(this.zelle)
               } else {
                   this.onModal = false // Hiding modal
                   // Error response
                   this.appComponent.modal = {
                       // Setting error modal properties
                       showModal: 'notification',
                       titleModal: this.$t('Error'),
                       messageModal: this.$t(response.msg),
                       buttonModal: this.$t('Aceptar'),
                       orderModal: 'closeModal',
                   };
               }
           });
       },
        getAccount(product){
            const paramsWithdrawals = {
                State: '1',
                count: 10,
                start: 0,
                bank_id: product.Id != undefined ? product.Id : product.id != undefined ? product.id : '',
                type: 'digitals'
            };
            apiService.request('get_bank_accounts', paramsWithdrawals).then((response: any) => {
                if (response.code == 0) {
                    if (response.data.length > 0){
                        for (let i = 0; i < response.data.length; i++) {
                            if(response.data[i].bank_name == "Paypal") {
                                this.notAccountPaypal = false
                                Object.assign(this.arraySelects, {
                                    accountPaypal:  response.data,
                                });
                            }
                            else if(response.data[i].bank_name == "Zelle") {
                                this.notAccountZelle = false
                                Object.assign(this.arraySelects, {
                                    accountZelle:  response.data,
                                });
                                this.numAccountZelle = response.data.length
                            }
                        }
                    }else {
                        if (product.Name == 'Paypal' || product.nameP == 'Paypal') {
                            this.notAccountPaypal = true
                            Object.assign(this.arraySelects, {
                                accountPaypal: [],
                            });
                        } else if (product.Name == 'Zelle' || product.nameP == 'Zelle') {
                            this.notAccountZelle = true
                            Object.assign(this.arraySelects, {
                                accountZelle: [],
                            });
                            this.numAccountZelle = 0
                        }
                    }
                }else {
                    this.onModal = false // Hiding modal
                    // Error response
                    this.appComponent.modal = {
                        // Setting error modal properties
                        showModal: 'notification',
                        titleModal: this.$t('Error'),
                        messageModal: this.$t(response.msg),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
        selectBank(name) {
           this.otherView = true
            this.dataOtherView.nameP = name.Name
            this.dataOtherView.id = name.Id
        },
        onChangeValue(e: any, name: string) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?\d{10,10}$/;
            if (e.input === '') {
                e.msg = this.$t('El campo se encuentra en blanco');
                e.color = 'yellow-300';
                e.validate = false;
            } else if (name === 'Paypal') {
                if (!emailRegex.test(e.input)) {
                    e.msg = this.$t('Debe ingresar un correo electrónico válido');
                    e.color = 'error';
                    e.validate = false;
                } else {
                    e.msg = '';
                    e.color = 'green-600';
                    e.validate = true;
                }
            } else if (name === 'Zelle') {
                if (!emailRegex.test(e.input) && !phoneRegex.test(e.input)) {
                    e.msg = this.$t('Debe ingresar un correo electrónico o número telefónico válido');
                    e.color = 'error';
                    e.validate = false;
                } else {
                    e.msg = '';
                    e.color = 'green-600';
                    e.validate = true;
                }
            } else if (e.input <= 0) {
                e.msg = this.$t('El valor no supera el minimo permitido');
                e.color = 'error';
                e.validate = false;
            } else {
                e.msg = '';
                e.color = 'green-600';
                e.validate = true;
            }
            this.disabledButton = !this.value.validate;
        },
        createAccount(data, account){
           let params = {
               bank_id: data.id,
               account: account,
           }
            apiService.request('save_user_virtual_bank', params).then((response: any) => {
                if (response.code == 0) {
                    this.getAccount(data)
                    this.value.input = '';
                }else {
                    this.onModal = false // Hiding modal
                    // Error response
                    this.appComponent.modal = {
                        // Setting error modal properties
                        showModal: 'notification',
                        titleModal: this.$t('Error'),
                        messageModal: this.$t(response.msg),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
        openModal(bank_id) {
            this.modalDeleteAccount = true
            this.bankId = bank_id
        },
        deleteAccount(data, userBankId) {
           let params = [{
               userbank_id: userBankId
           }]
            apiService.request('delete_user_bank', params).then((response: any) => {
                if (response.code == 0) {
                    this.getAccount(data)
                    this.modalDeleteAccount = false
                }else {

                    this.onModal = false // Hiding modal
                    this.modalDeleteAccount = false
                    let message = response.data.result
                    // Error response
                    this.appComponent.modal = {
                        showModal: 'notification',
                        titleModal: this.$t('Error'),
                        messageModal: this.$t(message),
                        buttonModal: this.$t('Aceptar'),
                        orderModal: 'closeModal',
                    };
                }
            });
        },
   }
})
</script>

<template>
    <div
        v-if="modalDeleteAccount"
        class="modal z-[999999999] bg-neutral-content/20 "
    >
        <div class="relative w-[95%] md:w-[40%] h-[43%] md:h-[35%] bg-base-content rounded-2xl shadow-lg border-accent border-1">

            <button
                @click="modalDeleteAccount = false"
                class="absolute top-4 right-4"
            >
                <ExitIconRe width="40px" height="40px" />
            </button>
            <div class="w-full h-auto flex justify-center items-center py-7">
                <img
                    src="https://images.virtualsoft.tech/m/msj19212T1749774356.png"
                    class="object-cover object-center"
                />
            </div>
            <div class="flex flex-col items-center justify-center h-auto w-full gap-4">
                <p class="text-neutral w-full font-poppinsm text-xl text-center">
                    {{$t(
                        dataOtherView.nameP == 'Zelle'
                        ? '¿Estás seguro de que deseas eliminar esta cuenta de Zelle?'
                        : dataOtherView.nameP == 'Paypal'
                        ? '¿Estás seguro de que deseas eliminar esta cuenta de Paypal?'
                        : ''
                    )}}
                </p>
                <div class="flex justify-end items-center w-[95%] gap-3">
                    <button
                        @click="
                            modalDeleteAccount = false
                        "
                        class="bg-secondary hover:bg-secondary/70 text-neutral w-24 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                    >
                        {{$t('Cancelar')}}
                    </button>
                    <button
                        @click="
                        deleteAccount(dataOtherView, bankId)
                    "
                        class="bg-primary hover:bg-primary/70 text-neutral w-24 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                    >
                        {{$t('Aceptar')}}
                    </button>
                </div>
            </div>

        </div>
    </div>

    <!-- Header section based on layout configuration -->
    <div
        v-if="config.layout != 3 && config.layout != 7"
        class="int-header h-[65px] bg-base-200 absolute w-full"
    ></div>
    <div
        v-if="config.layout != undefined && config.layout == 3"
        class="int-header h-40 bg-gradient-to-b from-base-300 from-90% to-neutral-content to-10% absolute z-1 w-full"
    ></div>
    <div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
    <!-- Main content area for logged-in users -->
    <div
        class="Framework InfoPage mi-cuenta"
        v-if="appComponent.session.logueado"
    >
        <div class="Box TextBox NoHeadBox InfoBox">
            <div class="BoxContent InfoBoxContent">
                <!-- Active page title section -->
                <div
                    class="Container ActivePageTitle"
                    :class="
						config.layout != undefined && config.layout == 3
							? 'my-5 pb-5 border-b-2 border-solid border-primary w-full mx-auto'
							: 'ActivePageTitle2'
					"
                >
					<span class="h1">
						<span
                            class="font-bold text-3xl text-neutral"

                        >{{ $t('Registro de cuentas digitales') }}</span
                        >
					</span>
                </div>
                <!-- Menu and form content -->
                <div
                    class="row justify-content-center w-full mx-auto ActivePageTitle2"
                >
                    <MenuUser
                        v-if="config.layout != 3"
                        :page="'misbonos'"
                        :MENU_ID="'3'"
                    />
                    <MenuUser3
                        v-if="config.layout != undefined && config.layout == 3"
                        :page="'misbonos'"
                        :MENU_ID="'3'"
                    />
                    <div
                        class="BoxContent TermsContentBox HelpContentBox w-full"
                        :class="
							config.layout != undefined && config.layout == 3
								? ''
								: 'md:w-3/4 float-left md:pl-8'
						"
                    >
                        <div
                            v-if="!appComponent.infoApp"
                            class="Container InfoContent mb-5 shadow-md"
                            :class="
								config.layout != undefined && config.layout == 3
									? 'bg-base-300 text-neutral rounded-b-xl'
									: 'bg-neutral text-neutral-content rounded-xl'
							"
                        >
                            <div
                                class="BoxContent TermsContentBox HelpContentBox w-full"
                                :class="
                                config.layout != undefined && config.layout == 3
                                    ? ''
                                    : 'float-left md:pl-8'
                                "
                            >
                                <section>
                                    <div
                                        class="w-full flex flex-col justify-center items-center gap-2 text-neutral-content mb-2"
                                    >
                                        <div
                                            class="w-full bg-base-200 rounded-lg py-3 px-3"
                                            :class="
                                                otherView
                                                ? 'flex flex-col gap-4'
                                                : ''
                                            "
                                        >
                                            <div
                                                class="w-full h-auto bg-base-300 flex gap-4 rounded-xl"
                                                :class="
                                                    otherView
                                                    ? 'justify-center items-center'
                                                    : 'justify-between items-baseline flex-col p-5'
                                                "
                                            >
                                                <h3
                                                    class="w-full text-2xl font-bold text-neutral text-start ml-4"
                                                    :class="
                                                        otherView
                                                        ? ''
                                                        : 'mt-4'
                                                    "
                                                >
                                                    {{
                                                        '1. ' +
                                                        $t('Selecciona el tipo de cuenta digital')
                                                    }}
                                                </h3>

                                                <div
                                                    v-if="!otherView"
                                                    class="w-full flex flex-col items-center md:flex-row md:justify-start h-full gap-4"
                                                >
                                                    <div
                                                        v-for="(
                                                            dBank, index
                                                        ) in arraySelects.bankList"
                                                        :key="index"
                                                        class="w-64 h-72 border-1 border-accent rounded-xl flex flex-col bg-base-300 hover:bg-base-200/50 cursor-pointer"
                                                        @click="selectBank(dBank)"
                                                    >
                                                        <section
                                                            class="w-full h-[10%] flex justify-end items-center"
                                                        >
                                                            <span
                                                                class="w-28 bg-warning rounded-full mt-2 mr-3 text-[8px] text-neutral text-center font-poppinsm"
                                                                :class="
                                                                    dBank.Name == 'Paypal' && notAccountPaypal
                                                                    ? 'block'
                                                                    : dBank.Name == 'Zelle' && notAccountZelle
                                                                    ? 'block'
                                                                    : 'hidden'
                                                                "
                                                            >
                                                                {{$t('Sin cuenta registrada')}}
                                                            </span>
                                                            <span
                                                                class="w-28 bg-success rounded-full mt-2 mr-3 text-[8px] text-neutral text-center font-poppinsm"
                                                                :class="
                                                                    dBank.Name == 'Paypal' && !notAccountPaypal
                                                                    ? 'block'
                                                                    : dBank.Name == 'Zelle' && !notAccountZelle
                                                                    ? 'block'
                                                                    : 'hidden'
                                                                "
                                                            >
                                                                {{
                                                                    dBank.Name == 'Paypal'
                                                                    ? $t('1 Cuenta registrada')
                                                                    : dBank.Name == 'Zelle' && numAccountZelle == 1
                                                                    ? $t('1 Cuentas registradas')
                                                                    : dBank.Name == 'Zelle' && numAccountZelle > 1
                                                                    ? $t('2 Cuentas registradas')
                                                                    : ''
                                                                }}
                                                            </span>
                                                        </section>
                                                        <section
                                                            class="w-full h-[75%] flex flex-col justify-center items-center"
                                                        >
                                                            <p
                                                                class="font-poppinsm text-neutral text-xl"
                                                            >
                                                                {{$t(dBank.Name)}}
                                                            </p>
                                                            <div
                                                                class="w-24 h-24 text-accent-focus"
                                                                v-html="
                                                                    dBank.Name == 'Zelle'
                                                                    ? zelleSVG
                                                                    : dBank.Name == 'Paypal'
                                                                    ? paypalSVG
                                                                    : ''
                                                                "
                                                            />
                                                            <p
                                                                class="font-poppinsls text-neutral text-center text-[12px] leading-loose"
                                                            >
                                                                {{
                                                                    dBank.Name == 'Zelle'
                                                                    ? $t('Permite enviar dinero rápido entre bancos en EE.UU.')
                                                                    : dBank.Name == 'Paypal'
                                                                    ? $t('Plataforma digital para enviar y recibir pagos de forma segura.')
                                                                    : ''
                                                                }}
                                                            </p>
                                                        </section>
                                                        <section
                                                            class="w-full h-[15%] flex justify-center items-center mb-2"
                                                        >
                                                            <button
                                                                @click="selectBank(dBank)"
                                                                class="w-11/12 h-full bg-success leading-loose text-neutral rounded-lg font-poppinsm text-sm hover:bg-success-focus transition duration-300 flex justify-center items-center "
                                                            >
                                                                {{$t('Registrar cuenta')}}
                                                            </button>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                v-if="otherView"
                                                class="w-full  bg-base-300 h-auto flex flex-col justify-between items-baseline gap-2 rounded-xl"

                                            >
                                                <h3
                                                    class="w-full text-2xl font-bold text-neutral text-start mt-4 ml-4"
                                                >
                                                    {{
                                                        '2. ' +
                                                        $t('Ingresa tu información')
                                                    }}
                                                </h3>

                                                <div
                                                    class="w-full flex flex flex-col items-center md:flex-row md:justify-start h-full gap-4"
                                                >
                                                    <div
                                                        class="w-64 h-48 bg-base-200 border-1 border-accent rounded-xl flex flex-col"
                                                    >
                                                        <section
                                                            class="w-full h-full flex flex-col justify-center items-center"
                                                        >
                                                            <p
                                                                class="font-poppinsm text-neutral text-xl"
                                                            >
                                                                {{$t(dataOtherView.nameP)}}
                                                            </p>
                                                            <div
                                                                class="w-24 h-24 text-accent-focus"
                                                                v-html="
                                                                    dataOtherView.nameP == 'Zelle'
                                                                    ? zelleSVG
                                                                    : dataOtherView.nameP == 'Paypal'
                                                                    ? paypalSVG
                                                                    : ''
                                                                "
                                                            />
                                                            <p
                                                                class="font-poppinsls text-neutral text-center text-[12px] leading-loose"
                                                            >
                                                                {{
                                                                    dataOtherView.nameP == 'Zelle'
                                                                    ? $t('Permite enviar dinero rápido entre bancos en EE.UU.')
                                                                    : dataOtherView.nameP == 'Paypal'
                                                                    ? $t('Plataforma digital para enviar y recibir pagos de forma segura.')
                                                                    : ''
                                                                }}
                                                            </p>
                                                        </section>
                                                    </div>
                                                    <div
                                                        class="w-[75%] h-full flex flex-col items-center md:items-start gap-3"
                                                    >
                                                        <span class="text-[12px] text-neutral font-poppinsls text-center md:text-start">
                                                            {{
                                                                dataOtherView.nameP == 'Paypal'
                                                                ? $t('*El numero mínimo de cuentas es 1')
                                                                : dataOtherView.nameP == 'Zelle'
                                                                ? $t('*El numero mínimo de cuentas es 0 y el máximo de cuentas es 2')
                                                                : ''
                                                            }}
                                                        </span>
                                                        <label class="label p-0">
													<span
                                                        class="label-text text-neutral text-lg font-poppinsm"
                                                    >{{
                                                            $t(
                                                                dataOtherView.nameP == 'Paypal' && !notAccountPaypal
                                                                ? 'Cuentas registradas en Paypal'
                                                                : dataOtherView.nameP == 'Zelle' && !notAccountZelle
                                                                ? 'Cuentas registradas en Zelle'
                                                                :dataOtherView.nameP == 'Zelle'
                                                                ? 'Ingresa correo electronico o número celular'
                                                                : dataOtherView.nameP == 'Paypal'
                                                                ? 'Ingresa correo paypal'
                                                                : ''
                                                            )
                                                        }}</span
                                                    >
                                                        </label>
                                                        <input
                                                            @keyup="
                                                                onChangeValue(
                                                                    value,
                                                                    dataOtherView.nameP
                                                                )
                                                            "
                                                            :placeholder="
                                                                dataOtherView.nameP == 'Zelle'
                                                                ? 'Correo electronico o numero celular'
                                                                : dataOtherView.nameP == 'Paypal'
                                                                ? 'Correo paypal'
                                                                : ''
                                                            "
                                                            v-model="
                                                                value.input
                                                            "
                                                            class="input border-1 border-accent h-12 w-[95%] rounded-xl bg-base-200 text-neutral placeholder-neutral placeholder:poppins font-poppinsls"
                                                            :class="
                                                                dataOtherView.nameP == 'Paypal' && notAccountPaypal
                                                                ? 'block'
                                                                : dataOtherView.nameP == 'Zelle' && numAccountZelle < 2
                                                                ? 'block'
                                                                : 'hidden'
                                                            "
                                                        />
                                                        <section
                                                           v-for="
                                                                (account, index) in arraySelects[
                                                                    dataOtherView.nameP == 'Paypal'
                                                                    ? 'accountPaypal'
                                                                    : dataOtherView.nameP == 'Zelle'
                                                                    ? 'accountZelle'
                                                                    : ''
                                                                ]
                                                           "
                                                            :key="index"
                                                            class="input border-1 border-accent h-12 w-[95%] rounded-xl bg-base-200 flex items-center hover:bg-accent justify-between"
                                                            :class="
                                                                dataOtherView.nameP == 'Paypal' && !notAccountPaypal
                                                                ? 'block'
                                                                : dataOtherView.nameP == 'Zelle' && !notAccountZelle
                                                                ? 'block'
                                                                : 'hidden'
                                                            "
                                                        >
                                                            <p
                                                                class="text-neutral font-poppinsm"
                                                            >
                                                                {{
                                                                    index == 0
                                                                    ? '1.' + ' ' + account.account
                                                                    : index == 1
                                                                    ? '2.' + ' ' + account.account
                                                                    : ''
                                                                }}
                                                            </p>
                                                            <button
                                                                class="flex justify-center items-center mt-1"
                                                                @click="
                                                                    openModal(
                                                                        account.userbank_id
                                                                        )
                                                                "
                                                            >
                                                                <DeleteIcon
                                                                    width="30px"
                                                                    height="30px"
                                                                />
                                                            </button>
                                                        </section>
                                                        <label
                                                            class="label items-start"
                                                        >
                                                            <span
                                                                v-if="
                                                                    value.msg !=
                                                                    ''
                                                                "
                                                                        class="label-text-alt"
                                                                        :class="
                                                                    'text-' +
                                                                    value.color
                                                                "
                                                            >
                                                                {{
                                                                    value.msg
                                                                }}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div>

                                                </div>
                                                <div
                                                    class="w-[96%] flex items-center justify-end gap-3 "
                                                >
                                                    <button
                                                        @click="otherView = false"
                                                        class="bg-error hover:bg-error/70 text-neutral w-24 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                                                    >
                                                        {{$t('Atrás')}}
                                                    </button>
                                                    <button
                                                        :disabled="
                                                            disabledButton
                                                        "
                                                        class="bg-success hover:bg-success/70 text-neutral w-44 h-12 mb-2 rounded-xl text-center flex items-center justify-center font-poppinsm"
                                                        :class="
                                                            dataOtherView.nameP == 'Paypal' && !notAccountPaypal
                                                            ? 'hidden'
                                                            : dataOtherView.nameP == 'Zelle' && numAccountZelle == 2
                                                            ? 'hidden'
                                                            : ''
                                                        "
                                                        @click="
                                                            disabledButton = true;
                                                            createAccount(
                                                                dataOtherView,
                                                                value.input
                                                            )
                                                        "
                                                    >
                                                        {{$t('Agregar cuenta')}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
