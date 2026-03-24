<script lang="ts">
import { useCookies } from 'vue3-cookies'; // Importing the useCookies function from vue3-cookies package
import { defineComponent } from 'vue'; // Importing defineComponent to create a Vue component
import MenuUser from '@/components/menus/MenuUser.vue'; // Importing MenuUser component
import MenuUser3 from '@/components/menus/MenuUser3.vue'; // Importing MenuUser3 component
import router from '@/router'; // Importing the router instance
import apiService from '@/services/ApiService'; // Importing the API service for making requests

// Directive to focus an element when mounted
const focus = {
	mounted: (event) => {
		event.focus(); // Focus the element when it is mounted
	},
};

export default defineComponent({
	directives: {
		focus, // Registering the focus directive
	},
	components: { MenuUser, MenuUser3 }, // Registering child components
	data() {
		let config = this.$config(); // Accessing configuration data
		let emitter = this.$emitter(); // Accessing event emitter
		let appComponent: any = this.$appComponent; // Accessing the app component
		return {
			config, // Returning config data
			emitter, // Returning emitter
			appComponent, // Returning app component
		};
	},
});
</script>

<template>
	<!-- Header for layout other than 3 -->
	<div
		v-if="config.layout != 3"
		class="int-header h-[65px] bg-base-200 absolute w-full"
	></div>
	<!-- Header for layout 3 -->
	<div
		v-if="config.layout != undefined && config.layout == 3"
		class="int-header h-40 bg-gradient-to-b from-secondary from-90% to-neutral-content to-10% absolute z-1 w-full"
	></div>
	<div
        v-if="config.layout != undefined && config.layout == 7"
        class="int-header h-auto bg-base-content absolute w-full"
    ></div>
	<!-- Main content for logged-in users -->
	<div
		class="Framework InfoPage mi-cuenta"
		v-if="appComponent.session.logueado"
	>
		<div class="Box TextBox NoHeadBox InfoBox">
			<div class="BoxContent InfoBoxContent">
				<div class="Container ActivePageTitle">
					<span class="h1">
						<span class="text-neutral font-bold text-3xl">{{
							$t('Depósitos')
						}}</span>
					</span>
				</div>
				<div
					class="row justify-content-center w-full mx-auto ActivePageTitle2"
				>
					<!-- MenuUser component for layout other than 3 -->
					<MenuUser
						v-if="config.layout != 3"
						:page="'deposito-cuenta'"
						:MENU_ID="'3'"
					/>
					<!-- MenuUser3 component for layout 3 -->
					<MenuUser3
						v-if="config.layout != undefined && config.layout == 3"
						:page="'deposit'"
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
						<div class="Container InfoContent shadow-md">
							<div
								id="formWithdrawAmount"
								class="GeneralForm WithdrawForm WithdrawAmount bg-base-400 text-neutral p-5 rounded-xl"
								novalidate="novalidate"
							>
								<ul class="AmountFields">
									<div
										v-if="
											config.depositos != undefined &&
											config.depositos.bankAccountText !=
												undefined &&
											config.depositos.bankAccountText
										"
									>
										<li
											style="
												margin-bottom: 10px;
												margin-top: 10px;
												border-top: 1px solid #9e99ac;
												padding-top: 5px;
											"
											class="FormItem fldAmount"
											id="fldAmount"
										>
											<div class="row">
												<div
													style="
														width: 100%;
														display: inline-block;
														vertical-align: top;
													"
													class="col col-md-12"
												>
													<label
														class="FormLabel div-inline-block float-right"
														style="
															width: 100%;
															font-size: 12px;
															text-align: justify;
														"
													>
														<p>
															Bank Transfers are
															now available for
															your convenience as
															a new top method.
														</p>
														<h2>
															Account top-ups via
															Direct Funds
															Transfers are
															activated
															Monday-Fridays
															(9am-5pm)
														</h2>
														<p>
															Sports Banking
															Information for
															Direct Funds
															Transfer
														</p>
														<p>
															1. Beneficiary Name:
															Prime Sports Jamaica
															Limited
														</p>
														<p>
															Beneficiary Address:
															9A Retirement
															Crescent, Kingston 5
														</p>
														<p>
															Beneficiary Bank:
															Bank of Nova Scotia
														</p>
														<p>
															Beneficiary Account:
															000802175
														</p>
														<p>
															Branch Transit #:
															50575
														</p>
														<p>
															Account Type:
															Chequing Account
														</p>
														<p>
															Bank Address:
															Knutsford Boulevard,
															Kingston 5 (New
															Kingston)
														</p>
														<p>
															2. Beneficiary Name:
															Prime Sports Jamaica
															Limited
														</p>
														<p>
															Beneficiary Address:
															9A Retirement
															Crescent, Kingston 5
														</p>
														<p>
															Beneficiary Bank:
															Sagicor Bank Jamaica
														</p>
														<p>
															Beneficiary Account
															#5503070814
														</p>
														<p>
															Account Type:
															Savings Account
														</p>
														<p>
															Bank Address: 17
															Dominica Drive,
															Kingston 5.
														</p>
														<h2>
															Steps to complete
															Direct Funds
															Transfer via Bank
															Transfer
														</h2>
														<p>
															i. Add JustBet –
															Prime Sports Jamaica
															Limited as a
															beneficiary
														</p>
														<p>
															ii. Enter the
															desired top-up
															amount (Daily
															Deposit Limit of
															$40,000)
														</p>
														<p>
															iii. Gamers should
															include the mobile
															phone number
															associated with
															their Justbet
															Accounts.
														</p>
														<p>
															iv. Gamers should
															submit proof of
															deposit to Customers
															support via email at
															support@svlgrp.com
															or Whatsapp at
															876-836-2970
														</p>
														<p>
															v. Account top-ups
															via Direct Funds
															Transfers are
															actioned
															Mondays-Fridays
															(9am-5pm) * Gaming
															Accounts will be
															credited within 3
															hours during the
															workday. Funds
															transfers made after
															4:30pm top-up will
															be credited the next
															business day.
														</p>
														<h2>
															Note: JustBet
															customers MUST be
															the account holder
															named on the bank
															accounts from which
															the direct funds
															transfer is made.
														</h2>
													</label>
												</div>
											</div>
										</li>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.FormLabel p {
	margin: 0px 0px 12px; /* Margin for paragraph elements within FormLabel */
}
.FormLabel h2 {
	font:
		500 20px/32px Roboto,
		Helvetica Neue,
		sans-serif; /* Font styling for h2 elements within FormLabel */
	margin: 0px 0px 12px; /* Margin for h2 elements */
}
.text-qr {
	font-weight: 300; /* Light font weight for text-qr class */
}
.button-ret {
	margin-right: 5px; /* Right margin for button-ret class */
}
.button-ret.dep.cryp a {
	background: white; /* Background color for button-ret.dep.cryp anchor */
	display: block; /* Display block for anchor */
	height: 100%; /* Full height for anchor */
	width: 100%; /* Full width for anchor */
	overflow: hidden; /* Hide overflow */
}
.button-ret a {
	background: #f9d000; /* Background color for button-ret anchor */
	padding: 4px 8px; /* Padding for button-ret anchor */
	border-radius: 5px; /* Rounded corners for button-ret anchor */
	color: black; /* Text color for button-ret anchor */
	font-weight: bold; /* Bold text for button-ret anchor */
}
.button-ret {
	margin-top: 8px; /* Top margin for button-ret class */
}
.button-ret.dep {
	display: inline-block; /* Inline-block display for button-ret.dep class */
}
.button-ret.dep.cryp {
	display: inline-block; /* Inline-block display for button-ret.dep.cryp class */
	width: 210px; /* Fixed width for button-ret.dep.cryp class */
	height: 91px; /* Fixed height for button-ret.dep.cryp class */
	text-align: center; /* Center text alignment
}
.button-ret.dep.cryp .img {
	width: 78px; /* Fixed width for image within button-ret.dep.cryp */
	display: inline-block; /* Inline-block display for image */
	vertical-align: top; /* Align image to the top */
	border-radius: 100%; /* Circular border for image */
	overflow: hidden; /* Hide overflow */
	margin-right: 10px; /* Right margin for image */
}
.button-ret.dep.cryp span.name {
	font-size: 13px; /* Font size for name span */
	display: inline-block; /* Inline-block display for name span */
	width: calc(100% - 88px); /* Width calculation for name span */
	padding: 5px 10px; /* Padding for name span */
	text-align: left; /* Left text alignment for name span */
	height: 100%; /* Full height for name span */
	border-left: 1px solid #9d9d9d; /* Left border for name span */
	text-transform: uppercase; /* Uppercase text for name span */
	font-size: 12px; /* Font size for name span */
}
.cant_dep {
	font-size: 13px; /* Font size for cant_dep class */
	display: none; /* Hidden by default */
	width: calc(100% - 88px); /* Width calculation for cant_dep class */
	padding: 5px 10px; /* Padding for cant_dep class */
	text-align: left; /* Left text alignment for cant_dep class */
	height: 100%; /* Full height for cant_dep class */
	border-left: 1px solid #9d9d9d; /* Left border for cant_dep class */
}
.button-ret.dep.cryp a:hover .cant_dep {
	display: inline-block; /* Show cant_dep on hover */
}
.button-ret.dep.cryp a:hover span.name {
	display: none; /* Hide name span on hover */
}
.button-ret.dep.cryp input {
	border-radius: 15px 15px 0 0; /* Rounded top corners for input */
	height: 35px; /* Fixed height for input */
	width: 100%; /* Full width for input */
	font-weight: bold; /* Bold text for input */
	padding-left: 7px; /* Left padding for input */
	color: #888888; /* Text color for input */
}
.button-ret.dep.cryp a {
	padding: 6px 8px; /* Padding for button-ret.dep.cryp anchor */
}
.button-ret.dep.cryp a:hover {
	background: #cccccc; /* Background color on hover for button-ret.dep.cryp anchor */
}
.button-ret.dep.cryp button:focus {
	outline: none; /* Remove outline on focus for button-ret.dep.cryp button */
}
.button-ret.dep.cryp button {
	height: 36px; /* Fixed height for button */
	width: 100%; /* Full width for button */
	border-radius: 0 0 15px 15px; /* Rounded bottom corners for button */
	border: none; /* No border for button */
	background: -webkit-linear-gradient(
		90deg,
		#ad7d29 1%,
		#cc983e 48%,
		#ecc263
	) !important; /* Gradient background for button */
	font-weight: bold; /* Bold text for button */
	color: white; /* Text color for button */
}
@media (max-width: 810px) {
	.button-ret.dep.cryp {
		width: 100%; /* Full width for button-ret.dep.cryp on small screens */
	}
}
.tlt-crypto {
	text-align: center; /* Center text alignment for tlt-crypto class */
	border-bottom: 1px solid black; /* Bottom border for tlt-crypto class */
	margin-bottom: 20px; /* Bottom margin for tlt-crypto class */
}
.tlt-crypto img {
	background: white; /* Background color for image in tlt-crypto */
	padding: 5px 5px; /* Padding for image in tlt-crypto */
	position: relative; /* Relative positioning for image */
	margin-bottom: -31px; /* Negative bottom margin for image */
	width: 170px; /* Fixed width for image */
}
</style>

<!-- FILE DOCUMENTED -->
