window.cconfig = {
    "partner": "0",
    "maxSizeFile": 2048,
    "logo": "https://images.virtualsoft.tech/m/msjT1666887931.png",
    "favicon": "https://images.virtualsoft.tech/m/msjT1618338208.png",
    "captchaKey": "6LemRA0UAAAAAKZpj6JGt5v_vq_ZzjB2RI08C4jQ",
    "countryL": "pe",
    "baseUrlFx": "",
    "urlSkin": "http://127.0.0.1:5173/sitioVersionVue/",
    "linkIframe":"",
    "menuMobile": {
        "logo": {
            "show": true,
            "url": "https://images.virtualsoft.tech/m/msjT1666887931.png"
        },
        "urlRegistro": "/registro"
    },
    "preloader": {
        "preloader": "https://images.virtualsoft.tech/site/general/preloader1.svg",
        "logoPreloader": "https://images.virtualsoft.tech/site/doradobet/loader-doradobet.png"
    },
    "components": {
        "pe":{
            "home": [
                {
                    "id": "SliderNormalComponent",
                    "value": "Slider Normal",
                    "type": "home"
                },
                {
                    "id": "CardsIconsComponent",
                    "value": "Iconos"
                }
            ],
            "casino": [
                {
                    "id": "SliderNormalComponent",
                    "value": "Slider Normal",
                    "type": "casino"
                }
            ]
        }
    },
    "bingo": true,
    "loyalty_type":{
        "pe": true
    },
    "videoLoyalty":{
        "pe": {
            "es": {
                "login": {
                    "large": [
                        {
                            "video": "https://www.youtube.com/embed/9BvG15ZAQ58",
                            "title": "Bienvenida"
                        },
                        {
                            "video": "https://www.youtube.com/embed/VFpjqiXeOqU",
                            "title": "Revisa tus puntos"
                        },
                        {
                            "video": "https://www.youtube.com/embed/VFpjqiXeOqU",
                            "title": "Premiamos tu lealtad"
                        }
                    ],
                        "small": [
                        {
                            "idVideo": "9BvG15ZAQ58",
                            "title": "Bienvenida",
                            "date": "25 may 2022",
                            "alt": "video"
                        },
                        {
                            "idVideo": "VFpjqiXeOqU",
                            "title": "Revisa tus puntos",
                            "date": "10 ago 2022",
                            "alt": "video"
                        },
                        {
                            "idVideo": "FJ_gXMW8mBA",
                            "title": "Premiamos tu lealtad",
                            "date": "2 abr 2022",
                            "alt": "video"
                        },
                        {
                            "idVideo": "zqDT8i6wUFg",
                            "title": "Como puedes ganar fácilmente",
                            "date": "17 ago 2022",
                            "alt": "video"
                        }
                    ]
                },
                "notLogin": {
                    "large": [
                        {
                            "video": "https://www.youtube.com/embed/9BvG15ZAQ58",
                            "title": "Bienvenida"
                        },
                        {
                            "video": "https://www.youtube.com/embed/VFpjqiXeOqU",
                            "title": "Revisa tus puntos"
                        },
                        {
                            "video": "https://www.youtube.com/embed/FJ_gXMW8mBA",
                            "title": "Premiamos tu lealtad"
                        }
                    ],
                        "small": [
                        {
                            "idVideo": "9BvG15ZAQ58",
                            "title": "Bienvenida",
                            "date": "25 may 2022",
                            "alt": "video"
                        },
                        {
                            "idVideo": "VFpjqiXeOqU",
                            "title": "Revisa tus puntos",
                            "date": "10 ago 2022",
                            "alt": "video"
                        },
                        {
                            "idVideo": "FJ_gXMW8mBA",
                            "title": "Premiamos tu lealtad",
                            "date": "2 abr 2022",
                            "alt": "video"
                        },
                        {
                            "idVideo": "zqDT8i6wUFg",
                            "title": "Como puedes ganar fácilmente",
                            "date": "17 ago 2022",
                            "alt": "video"
                        }
                    ]
                }
            }
        }
    },
    "loyalty": {
        "pe": true,
        "pe": true,
        "ec": false,
        "cl": false,
        "cr": false,
        "sv": false,
        "ni": false,
        "pa": false,
        "gt": false,
        "form": {
            "pe": [
                {
                    "name": "City",
                    "label": "Ciudad:",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "widthFull": true,
                    "validationType": "string",
                    "optionsKey": "cityList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "BetShop",
                    "label": "Punto de venta:",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "widthFull": true,
                    "validationType": "string",
                    "optionsKey": "betShopList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido."
                            ]
                        }
                    ]
                }
            ]
        },
        "form2": {
            "pe": [
                {
                    "name": "Names",
                    "label": "Nombres:",
                    "placeholder": "Nombres",
                    "type": "text",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "Surnames",
                    "label": "Apellidos:",
                    "placeholder": "Apellidos",
                    "type": "text",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "Identification",
                    "label": "Identificación:",
                    "placeholder": "Identificación",
                    "type": "text",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "Phone",
                    "label": "Teléfono:",
                    "placeholder": "Teléfono",
                    "type": "number",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "Province",
                    "label": "Provincia:",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "widthFull": true,
                    "validationType": "string",
                    "optionsKey": "provinceList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "City",
                    "label": "Ciudad:",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "widthFull": true,
                    "validationType": "string",
                    "optionsKey": "cityList2",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "Address",
                    "label": "Dirección:",
                    "placeholder": "Dirección",
                    "type": "text",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "Team",
                    "label": "Equipo:",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "widthFull": true,
                    "validationType": "string",
                    "optionsKey": "teamsList",
                    "validations": []
                }
            ]
        }
    },
    "landing": {
        "deportivasEmbedRegistro": {
            "bg": "https://images.virtualsoft.tech/m/msjT1615587162.png",
            "bgHref": "/landing/registro-corto",
            "title": "<span class='t-1'>¡BONO DE BIENVENIDA!</span><span class='t-2'>DUPLICAMOS<br>TU PRIMER DEPOSITO<br>HASTA S/500.</span><div class='button-action'>¡APUESTA YA!</div>",
            "steps": {
                "one": "Regístrate aquí, simple y rapido.",
                "two": "Realiza tu primer depósito y te lo duplicamos hasta S/500.",
                "three": "¡Pronostica en tus deportes y mercados favoritos!"
            }
        },
        "casinoEmbedRegistro": {
            "bg": "https://images.virtualsoft.tech/m/msjT1615587474.png",
            "bgHref": "/landing/registro-corto",
            "title": "<span class='t-1'>¡JUEGA EN EL CASINO ONLINE!</span><span class='t-2'>Y PARTICIPA POR <br>S/40.000 EN PREMIOS</span><div class='button-action'>REGISTRATE</div>"
        },
        "registroCasino": {
            "bgCasino": "https://images.virtualsoft.tech/m/msjT1615587627.png"
        },
        "registroSports": {
            "bgSports": "https://images.virtualsoft.tech/m/msjT1615589622.png",
            "logo": "https://images.virtualsoft.tech/site/doradobet/logo-horizontalv2.png"
        },
        "sports": {
            "bgSports": "https://images.virtualsoft.tech/m/msjT1615590494.png",
            "bgHref": "/landing/registro-deportivas"
        },
        "casino": {
            "bgCasino": "https://images.virtualsoft.tech/m/msjT1615591208.png",
            "bgHref": "/landing/registro-corto",
            "steps": {
                "one": "Regístrate aquí, simple y rapido.",
                "two": "Realiza tu primer depósito y empieza a jugar",
                "three": "¡Juega en casino y participa por increíbles premios!"
            }
        },
        "app": {
            "apk_url": "https://images.virtualsoft.tech/site/app/doradobet0-0-10.apk",
            "assets": {
                "one": "https://images.virtualsoft.tech/m/msjT1616786895.png",
                "two": "https://images.virtualsoft.tech/m/msjT1616787124.png",
                "three": "https://images.virtualsoft.tech/m/msjT1616787209.png",
                "four": "https://images.virtualsoft.tech/m/msjT1616787289.png"
            }
        },
        "logo": "https://images.virtualsoft.tech/site/doradobet/logo-horizontalv2.png"
    },
    "backgrounds": {
        "pe": {
            "es": {
                "login": {
                    "torneos": {
                        "backgrounds": [
                            {
                                "url": "https://images.virtualsoft.tech/m/msjT1622746392.png",
                                "redirect": "/torneos",
                                "order": 1
                            }
                        ]
                    },
                    "bingos": {
                        "backgrounds": [
                            {
                                "url": "https://images.virtualsoft.tech/m/msjT1650553070.png",
                                "redirect": "/bingos",
                                "order": 1
                            }
                        ]
                    }
                },
                "notLogin": {
                    "torneos": {
                        "backgrounds": [
                            {
                                "url": "https://images.virtualsoft.tech/m/msjT1622746392.png",
                                "redirect": "/torneos",
                                "order": 1
                            }
                        ]
                    },
                    "bingos": {
                        "backgrounds": [
                            {
                                "url": "https://images.virtualsoft.tech/m/msjT1650553070.png",
                                "redirect": "/bingos",
                                "order": 1
                            }
                        ]
                    },
                    "sorteos": {
                        "backgrounds": [
                            {
                                "url": "https://images.virtualsoft.tech/m/msjT1662482092.png",
                                "redirect": "/sorteos",
                                "order": 1
                            }
                        ]
                    }
                }
            }
        }
    },
    "urlApi": {
        "isWsConnection": true,
        "url": "https://partnerapi.virtualsoft.tech/Lobby/Api",
        "url2": "https://admincert.virtualsoft.tech/api/api/partner_api/Lobby/Api",
        "ws": "wss://s1840.nyc1.piesocket.com/v3/CHANNELID?api_key=PUBtntUm8g2tuVArPEeFPrBAUnJU35IvAUqnY8iu&notify_self",
        "wsPie": true
    },
    "urlVirtualplay": "https://publicapi.virtualplay.co",
    "urlCasinoPlay": "https://casino.virtualsoft.tech/game/play/",
    "urlLobbyLiveCasino": "https://casino.virtualsoft.tech/game/play/?gameid=481&mode=real&provider=Ezugi",
    "urlLobbyBetgamestv": "https://casino.virtualsoft.tech/game/play/?gameid=5707&mode=real&provider=BETGAMESTV",
    "urlLobbyEvolution": "https://casino.virtualsoft.tech/game/play/?gameid=5726&mode=real&provider=Betixon",
    "urlLobbyVivogaming": "https://casino.virtualsoft.tech/game/play/?gameid=5798&mode=real&provider=VIVOGAMING",
    "urlLobbyPragmaticLive": "https://casino.virtualsoft.tech/game/play/?gameid=51434&mode=real&provider=PRAGMATIC",
    "urlLobbyPoker": "",
    "urlAffiliatesApi": "https://affiliatesapi.virtualsoft.tech",
    "virtualesList": [
        {
            "id": 3733,
            "name": "",
            "title": "Animadas",
            "urlGame": "https://casino.virtualsoft.tech/game/play/?gameid=3733&provider=ITN"
        },
        {
            "id": 580,
            "name": "",
            "title": "VirtualGeneration",
            "urlGame": "https://casino.virtualsoft.tech/game/play/?gameid=580&mode=real&provider=VGT"
        }
    ],
    "casino": {
        "bg": "https://images.virtualsoft.tech/site/doradobet/fondo-casino2.png?v=1",
        "preloaderGame": "https://images.virtualsoft.tech/m/msjT1617902779.png",
        "isLocal": true,
        "limit": 24,
        "styleVersion": 2,
        "lobbyType": 1,
        "providersType": 1,
        "inGame": {
            "deposit": false,
            "refresh": true,
            "favorite": false,
            "home": false
        },
        "preloader": "https://images.virtualsoft.tech/site/doradobet/loader-doradobet.png"
    },
    "menu": {
        "styleVersion": 1,
        "styleCorners": 1,
        "styleFullWidth": false,
        "styleScrollTop": false,
        "stylePositionTop": false,
        "casinoEnabled": true,
        "mobileMenuTop": false,
        "subMenuApuestas": false
    },
    "header": {
        "styleVersion": 1,
        "clock": false,
        "notifications": false,
        "bonos": false,
        "showMenuFooter": true,
        "showTicker": true,
        "showRedes": true,
        "cssUnlog": false,
        "logo": {
            "show": true,
            "src": "https://images.virtualsoft.tech/m/msjT1666887931.png"
        },
        "logoUrl": "https://images.virtualsoft.tech/m/msjT1666887931.png",
        "styleBalance": {
            "ni": 2,
            "pe": 1
        }
    },
    "depositos": {
        "TaxDeposit": 0,
        "TaxDepositBalance": 0
    },
    "coupons": {
        "ni": {
            "show": false
        },
        "pe": {
            "show": false
        },
        "cr": {
            "show": false
        },
        "cl": {
            "show": false
        },
        "gt": {
            "show": false
        }
    },
    "retiros": {
        "paisesNoRequiereDNI": [
            2,
            146
        ],
        "paisesNoRequiereDNILocal": [
            2,
            146,
            66,
            13,
            94,
            99,
            65,
            113
        ],
        "retiroLocal": {
            "ec": false,
            "sv": false,
            "gt": true
        },
        "onlyInteger": false,
        "textRetiro1": "Local Doradobet:",
        "textRetiro2": "Cuentas bancarias:",
        "textRetiro3": "Desde {{min}} soles",
        "textRetiro4": "hasta {{max}} soles",
        "textRetiro5": "En tu PRIMER RETIRO da clic en Verificar Cuenta, carga la foto clara y legible de tu DNI por ambos lados, una vez confirmada la cuenta podrás retirar fácilmente",
        "infoExtra": [],
        "minimoRetiro": [
            {
                "pais": 2,
                "minimo": 20
            },
            {
                "pais": 66,
                "minimo": 20
            },
            {
                "pais": 173,
                "minimo": 50
            },
            {
                "pais": 46,
                "minimo": 10000
            },
            {
                "pais": 94,
                "minimo": 2
            }
        ],
        "paisesInfoRetiro": [
            173
        ],
        "infoBanksAccounts": {
            "pe": true,
            "gt": true,
            "sv": true,
            "ec": true
        },
        "tableColumns": {
            "pe": [
                {
                    "name": "id",
                    "header": "No. Nota de Retiro",
                    "type": "text"
                },
                {
                    "name": "delete",
                    "header": "Anular",
                    "type": "button"
                },
                {
                    "name": "tipo",
                    "header": "Tipo",
                    "type": "text"
                },
                {
                    "name": "estado",
                    "header": "Estado",
                    "type": "text"
                },
                {
                    "name": "date",
                    "header": "Fecha Generacion",
                    "type": "text"
                },
                {
                    "name": "amount",
                    "header": "Valor",
                    "type": "text"
                },
                {
                    "name": "moneda",
                    "header": "Moneda",
                    "type": "text"
                },
                {
                    "name": "detalle",
                    "header": "Motivo de Rechazo",
                    "type": "text"
                }
            ],
            "gt": [
                {
                    "name": "id",
                    "header": "No. Nota de Retiro",
                    "type": "text"
                },
                {
                    "name": "delete",
                    "header": "Anular",
                    "type": "button"
                },
                {
                    "name": "tipo",
                    "header": "Tipo",
                    "type": "text"
                },
                {
                    "name": "estado",
                    "header": "Estado",
                    "type": "text"
                },
                {
                    "name": "date",
                    "header": "Fecha Generacion",
                    "type": "text"
                },
                {
                    "name": "amount",
                    "header": "Valor",
                    "type": "text"
                },
                {
                    "name": "tax1",
                    "header": "Impuesto 1",
                    "type": "text"
                },
                {
                    "name": "tax2",
                    "header": "Impuesto 2",
                    "type": "text"
                },
                {
                    "name": "valorfinal",
                    "header": "Valor Final",
                    "type": "text"
                },
                {
                    "name": "moneda",
                    "header": "Moneda",
                    "type": "text"
                }
            ]
        }
    },
    "bannersDesktop": {
        "heightHome": "h-80",
        "heightCasino": "h-40",
        "pe": {
            "es": {
                "login": {
                    "home": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1654182607.png",
                            "redirect": "/shop-bonuses",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1659383809.png",
                            "redirect": "/gestion-deposito",
                            "order": 2,
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672924828.png",
                            "redirect": "/new-casino/proveedor/PRAGMATIC",
                            "order": 3,
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672493499.png",
                            "redirect": "/bingos",
                            "alt": "",
                            "order": 4
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672670316.png",
                            "redirect": "/torneos",
                            "alt": "",
                            "order": 5
                        }
                    ],
                    "banner-left": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672670521.png",
                            "redirect": "/torneos",
                            "order": 1,
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672837290.png",
                            "redirect": "/torneos",
                            "order": 2,
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671456239.png",
                            "redirect": "/torneos",
                            "order": 3,
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1659383828.png",
                            "redirect": "/gestion/deposito",
                            "order": 4
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672752492.png",
                            "redirect": "/torneos",
                            "alt": "",
                            "order": 5
                        }
                    ],
                    "casino": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672752703.png",
                            "redirect": "/new-casino/4434",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671456692.png",
                            "redirect": "/new-casino/54241",
                            "alt": "",
                            "order": 2
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671033563.png",
                            "redirect": "/new-casino/proveedor/RUBYPLAY",
                            "alt": "",
                            "order": 3
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1669653904.png",
                            "redirect": "/new-casino/proveedor/PLAYSON",
                            "alt": "",
                            "order": 4
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1667915926.png",
                            "redirect": "/new-casino",
                            "alt": "",
                            "order": 5
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1669654008.png",
                            "redirect": "/new-casino/proveedor/PLAYSON",
                            "alt": "",
                            "order": 6
                        }
                    ],
                    "banner-composition": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1636487119.png",
                            "redirect": "/deportes",
                            "alt": "",
                            "order": 1
                        }
                    ],
                    "email": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1620149398.png",
                            "redirect": "http://google.com",
                            "alt": "test",
                            "order": 1
                        }
                    ],
                    "banner-right": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671456998.png",
                            "redirect": "/new-casino/54241",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671033652.png",
                            "redirect": "/new-casino/proveedor/7777GAMING",
                            "order": 2,
                            "alt": ""
                        },
                        {
                            "order": 3,
                            "redirect": "/deportes",
                            "url": "https://images.virtualsoft.tech/m/msjT1620157224.png",
                            "alt": ""
                        },
                        {
                            "order": 4,
                            "redirect": "/apuestas-en-vivo",
                            "url": "https://images.virtualsoft.tech/m/msjT1620157216.png",
                            "alt": ""
                        }
                    ],
                    "banner-center": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1659383809.png",
                            "redirect": "/gestion/deposito",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672924859.png",
                            "redirect": "/new-casino/proveedor/PRAGMATIC",
                            "alt": "",
                            "order": 2
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672752894.png",
                            "redirect": "/new-casino/4434",
                            "alt": "",
                            "order": 3
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672493499.png",
                            "redirect": "/bingos",
                            "alt": "",
                            "order": 4
                        }
                    ]
                },
                "notLogin": {
                    "home": [
                        {
                            "order": 1,
                            "redirect": "/programa_lealtad",
                            "url": "https://images.virtualsoft.tech/m/msjT1673456780.png",
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1659383809.png",
                            "redirect": "/registro",
                            "order": 2
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672924828.png",
                            "redirect": "/new-casino/proveedor/PRAGMATIC",
                            "alt": "",
                            "order": 3
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672493499.png",
                            "redirect": "/bingos",
                            "alt": "",
                            "order": 4
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672669989.png",
                            "redirect": "/torneos",
                            "alt": "",
                            "order": 5
                        }
                    ],
                    "banner-left": [
                        {
                            "order": 1,
                            "redirect": "/torneos",
                            "url": "https://images.virtualsoft.tech/m/msjT1672670521.png",
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1659383820.png",
                            "redirect": "/registro",
                            "order": 2
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671456239.png",
                            "redirect": "/torneos",
                            "alt": "",
                            "order": 3
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672837290.png",
                            "redirect": "/torneos",
                            "alt": "",
                            "order": 4
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672752483.png",
                            "redirect": "/torneos",
                            "alt": "",
                            "order": 5
                        }
                    ],
                    "banner-composition": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1636487119.png",
                            "redirect": "/deportes",
                            "alt": "",
                            "order": 1
                        }
                    ],
                    "casino": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672752629.png",
                            "redirect": "/new-casino",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671456692.png",
                            "redirect": "/new-casino/proveedor/ISOFTBET",
                            "alt": "",
                            "order": 2
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671033581.png",
                            "redirect": "/new-casino/proveedor/RUBYPLAY",
                            "alt": "",
                            "order": 3
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1669653904.png",
                            "redirect": "/new-casino/proveedor/PLAYSON",
                            "alt": "",
                            "order": 4
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1667915918.png",
                            "redirect": "/new-casino",
                            "alt": "",
                            "order": 5
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1669654008.png",
                            "redirect": "/new-casino/proveedor/PLAYSON",
                            "alt": "",
                            "order": 6
                        }
                    ],
                    "banner-right": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671456998.png",
                            "redirect": "/new-casino/proveedor/ISOFTBET",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1671033652.png",
                            "redirect": "/new-casino/proveedor/7777GAMING",
                            "order": 2,
                            "alt": ""
                        },
                        {
                            "order": 3,
                            "redirect": "/apuestas-en-vivo",
                            "url": "https://images.virtualsoft.tech/m/msjT1620157216.png"
                        },
                        {
                            "order": 4,
                            "redirect": "/deportes",
                            "url": "https://images.virtualsoft.tech/m/msjT1620157224.png"
                        }
                    ],
                    "banner-center": [
                        {
                            "order": 1,
                            "redirect": "/registro",
                            "url": "https://images.virtualsoft.tech/m/msjT1659383809.png",
                            "alt": ""
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672924859.png",
                            "redirect": "/new-casino/proveedor/PRAGMATIC",
                            "alt": "",
                            "order": 2
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672752894.png",
                            "redirect": "/new-casino",
                            "alt": "",
                            "order": 3
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672493499.png",
                            "redirect": "/bingos",
                            "alt": "",
                            "order": 4
                        }
                    ]
                }
            }
        }
    },
    "bannersMobile": {
        "heightHome": "h-20",
        "heightCasino": "h-20",
        "pe": {
            "es": {
                "login": {
                    "banner-center": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1663776008.png",
                            "redirect": "/registro",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1620160211.png",
                            "redirect": "/new-casino",
                            "alt": "",
                            "order": 2
                        }
                    ],
                    "banner-right": [],
                    "home": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1654955061.png",
                            "redirect": "/shop-bonuses",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672493499.png",
                            "redirect": "/bingos",
                            "alt": "",
                            "order": 2
                        }
                    ],
                    "casino": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672853472.png",
                            "redirect": "/new-casino/239621",
                            "alt": "",
                            "order": 1
                        }
                    ]
                },
                "notLogin": {
                    "banner-center": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1663776008.png",
                            "redirect": "/deportes",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1620160211.png",
                            "redirect": "/new-casino",
                            "alt": "",
                            "order": 2
                        }
                    ],
                    "home": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1654955079.png",
                            "redirect": "/programa_lealtad",
                            "alt": "",
                            "order": 1
                        },
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672493499.png",
                            "redirect": "/bingos",
                            "alt": "",
                            "order": 2
                        }
                    ],
                    "casino": [
                        {
                            "url": "https://images.virtualsoft.tech/m/msjT1672853472.png",
                            "redirect": "/new-casino/proveedor/ISOFTBET",
                            "alt": "",
                            "order": 1
                        }
                    ]
                }
            }
        }
    },
    "PROVIDERS": {
        "pe": [
            {
                "URL": "",
                "NAME": "BBVA",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666885782.png",
                "showF": true
            },
            {
                "URL": "",
                "NAME": "Interbank",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666885886.png",
                "showF": true
            },
            {
                "URL": "",
                "NAME": "Scotiabank",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666885919.png",
                "showF": true
            },
            {
                "URL": "",
                "NAME": "Visanet",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666885983.png",
                "showF": true
            },
            {
                "URL": "",
                "NAME": "Safetypay",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666886006.png",
                "showF": true
            },
            {
                "URL": "",
                "NAME": "Pagoefectivo",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666886024.png",
                "showF": true
            },
            {
                "URL": "",
                "NAME": "Astropay",
                "ICON": "https://images.virtualsoft.tech/m/msjT1666885699.png",
                "showF": true
            }
        ]
    },
    "providers": {
        "showFooterProviders": true,
        "lightColor": true
    },
    "footer": {
        "pe": {
            "social_widget": {
                "show": true,
                "facebook": "https://www.facebook.com/DoradoBet-Per%C3%BA-882370918617257/",
                "twitter": "https://twitter.com/doradobet?ref_src=twsrc%5Etfw"
            },
            "showDownloadApp": true,
            "downloadAppUrl": "/landing/app"
        },
        "styleVersion": 3,
        "showDownloadApp": false,
        "downloadAppUrl": "/landing/app",
        "darkOrLight": 1,
        "showFooter": true,
        "showSocial": true,
        "showPartners": true,
        "showMenuFooter": false,
        "showChat": true,
        "show18text": {
            "show": true,
            "src": "https://images.virtualsoft.tech/m/msjT1666885792.png"
        },
        "sponsors": {
            "pe": [
                {
                    "title": "alianza-lima",
                    "img": "https://images.virtualsoft.tech/m/msjT1666885873.png",
                    "width": 70,
                    "height": 90,
                    "show": true
                },
                {
                    "title": "Cienciano",
                    "img": "https://images.virtualsoft.tech/m/msjT1666885910.png",
                    "width": 70,
                    "height": 90,
                    "show": true
                },
                {
                    "title": "Binacional",
                    "img": "https://images.virtualsoft.tech/m/msjT1666885925.png",
                    "width": 70,
                    "height": 90,
                    "show": true
                },
                {
                    "title": "UCV",
                    "img": "https://images.virtualsoft.tech/m/msjT1666885941.png",
                    "width": 70,
                    "height": 90,
                    "show": true
                },
                {
                    "img": "https://images.virtualsoft.tech/m/msjT1666885970.png",
                    "title": "Cristal",
                    "width": 70,
                    "height": 90,
                    "href": "",
                    "show": true
                },
                {
                    "img": "https://images.virtualsoft.tech/m/msjT1666885988.png",
                    "title": "Boys",
                    "width": 70,
                    "height": 90,
                    "href": "",
                    "show": true
                },
                {
                    "img": "https://images.virtualsoft.tech/m/msjT1666886002.png",
                    "title": "Mannucci",
                    "width": 70,
                    "height": 90,
                    "href": "",
                    "show": true
                },
                {
                    "img": "https://images.virtualsoft.tech/m/msjT1666886014.png",
                    "title": "Huancayo",
                    "width": 70,
                    "height": 90,
                    "href": "",
                    "show": true
                },
                {
                    "img": "https://images.virtualsoft.tech/m/msjT1666886025.png",
                    "title": "Veritas",
                    "width": 70,
                    "height": 90,
                    "href": "",
                    "show": true
                },
                {
                    "img": "https://images.virtualsoft.tech/m/msjT1666886037.png",
                    "title": "Ayacucho",
                    "width": 70,
                    "height": 90,
                    "href": "",
                    "show": true
                }
            ]
        },
        "virtualsoft": true,
        "social_widget": {
            "show": true,
            "facebook": "https://www.facebook.com/DoradoBet-Per%C3%BA-882370918617257/",
            "twitter": "https://twitter.com/doradobet?ref_src=twsrc%5Etfw"
        },
        "license": "Este sitio web esta operado por VS Network Solutions N.V., empresa registrada el 20 de septiembre de 2021 bajo las leyes de Curacao, con el número de registro 158663 y bajo la licencia No 365/JAZ sub-licencia GLH-OCCHKTW0711042021 otorgada por el gobierno de curacao el 4 de noviembre de 2021.",
        "copyright": "© 2021 Doradobet. Todos los derechos reservados."
    },
    "SOCIAL_NEWTWORKS_HEADER": {
        "pe": [
            {
                "SOCIAL_URL": "https://www.facebook.com/DoradoBet-Perú-882370918617257/",
                "SOCIAL_NAME": "Facebook",
                "SOCIAL_ICON": "facebook"
            },
            {
                "SOCIAL_URL": "https://twitter.com/doradobet/",
                "SOCIAL_NAME": "Twitter",
                "SOCIAL_ICON": "twitter"
            },
            {
                "SOCIAL_URL": "https://www.instagram.com/doradobetperu/",
                "SOCIAL_NAME": "Instagram",
                "SOCIAL_ICON": "instagram"
            },
            {
                "SOCIAL_URL": "https://www.youtube.com/c/Doradobet/videos",
                "SOCIAL_NAME": "Youtube",
                "SOCIAL_ICON": "youtube"
            }
        ]
    },
    "SOCIAL_NEWTWORKS": {
        "pe": [
            {
                "SOCIAL_URL": "https://www.facebook.com/DoradoBet-Perú-882370918617257/",
                "SOCIAL_NAME": "Facebook",
                "SOCIAL_ICON": "fa-brands fa-facebook"
            },
            {
                "SOCIAL_URL": "https://twitter.com/doradobet/",
                "SOCIAL_NAME": "Twitter",
                "SOCIAL_ICON": "fa-brands fa-twitter"
            },
            {
                "SOCIAL_URL": "https://www.instagram.com/doradobetperu/",
                "SOCIAL_NAME": "Instagram",
                "SOCIAL_ICON": "fa-brands fa-instagram"
            },
            {
                "SOCIAL_URL": "https://www.youtube.com/c/Doradobet/videos",
                "SOCIAL_NAME": "Youtube ",
                "SOCIAL_ICON": "fa-brands fa-youtube"
            }
        ]
    },
    "homePage": {
        "styleVersion": 1,
        "showSports": true,
        "showCasino": true,
        "showLiveBetting": false,
        "showCasinoLive": true,
        "showTorneos": true,
        "showResults": false,
        "showRegistro": true,
        "showHomeCardsSide": false,
        "showHomeCardImages": false,
        "showHomeCards": false
    },
    "HOME_ICONS_NOLOGUEADO_DESKTOP": [
        {
            "MENU_ID": "accion_deportivas",
            "MENU_TITLE": "APUESTAS DEPORTIVAS",
            "MENU_URL": "/deportes",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-futbol.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_casinoslots",
            "MENU_TITLE": "CASINO",
            "MENU_URL": "/new-casino",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_registro",
            "MENU_TITLE": "REGISTRATE",
            "MENU_URL": "/registro",
            "MENU_ICON": "https://images.virtualsoft.tech/site/notes.gif",
            "MENU_SECCION": "outstanding",
            "SHADOW": "1",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_casinoenvivo",
            "MENU_TITLE": "CASINO EN VIVO",
            "MENU_URL": "/live-casino-vivo",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino-vivo-opt.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_virtuales",
            "MENU_TITLE": "APUESTAS VIRTUALES",
            "MENU_URL": "/virtuales-lobby",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-virtuales.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        }
    ],
    "HOME_ICONS_LOGUEADO_DESKTOP": [
        {
            "MENU_ID": "accion_deportivas",
            "MENU_TITLE": "APUESTAS DEPORTIVAS",
            "MENU_URL": "/deportes",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-futbol.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_casinoslots",
            "MENU_TITLE": "CASINO",
            "MENU_URL": "/new-casino",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_casinoenvivo",
            "MENU_TITLE": "CASINO EN VIVO",
            "MENU_URL": "/live-casino-vivo",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino-vivo-opt.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        },
        {
            "MENU_ID": "accion_virtuales",
            "MENU_TITLE": "APUESTAS VIRTUALES",
            "MENU_URL": "/virtuales-lobby",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-virtuales.gif",
            "MENU_SECCION": "outstanding",
            "MENU_NEWTAB": false
        }
    ],
    "HOME_ICONS_NOLOGUEADO_MOBILE": [
        {
            "MENU_ID": "accion_deportivas",
            "MENU_TITLE": "APUESTAS DEPORTIVAS",
            "MENU_URL": "/deportes",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-futbol.gif",
            "MENU_SECCION": "outstanding"
        },
        {
            "MENU_ID": "accion_casinoslots",
            "MENU_TITLE": "CASINO",
            "MENU_URL": "/new-casino",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino.gif",
            "MENU_SECCION": "outstanding"
        },
        {
            "MENU_ID": "accion_registrate",
            "MENU_TITLE": "REGISTRATE",
            "MENU_URL": "/registro",
            "MENU_ICON": "https://images.virtualsoft.tech/site/notes.gif",
            "MENU_SECCION": "outstanding",
            "SHADOW": "1"
        },
        {
            "MENU_ID": "accion_casinoenvivo",
            "MENU_TITLE": "CASINO EN VIVO",
            "MENU_URL": "/live-casino-vivo",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino-vivo-opt.gif",
            "MENU_SECCION": "outstanding"
        }
    ],
    "HOME_ICONS_LOGUEADO_MOBILE": [
        {
            "MENU_ID": "accion_deportivas",
            "MENU_TITLE": "APUESTAS DEPORTIVAS",
            "MENU_URL": "/deportes",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-futbol.gif",
            "MENU_SECCION": "outstanding"
        },
        {
            "MENU_ID": "accion_casinoslots",
            "MENU_TITLE": "CASINO",
            "MENU_URL": "/new-casino",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino.gif",
            "MENU_SECCION": "outstanding"
        },
        {
            "MENU_ID": "accion_casinoenvivo",
            "MENU_TITLE": "CASINO EN VIVO",
            "MENU_URL": "/live-casino-vivo",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-casino-vivo-opt.gif",
            "MENU_SECCION": "outstanding"
        },
        {
            "MENU_ID": "accion_virtuales",
            "MENU_TITLE": "APUESTAS VIRTUALES",
            "MENU_URL": "/virtuales-lobby",
            "MENU_ICON": "https://images.virtualsoft.tech/site/loader-virtuales.gif",
            "MENU_SECCION": "outstanding"
        }
    ],
    "mobileL": "1",
    "MENU_NOLOGUEADO_MOBILE": {
        "pe": [
            {
                "MENU_ID": "accion_registro",
                "MENU_TITLE": "REGISTRATE",
                "MENU_URL": "/registro",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20registrate.svg",
                "MENU_SECCION": "bg-success",
                "MENU_COLOR": "#000000",
                "SHADOW": 1
            },
            {
                "MENU_ID": "accion_inicio",
                "MENU_TITLE": "HOME",
                "MENU_URL": "/home",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20Inicio.svg",
                "MENU_SECCION": "SectionItem"
            },
            {
                "MENU_ID": "accion_deportivas_usuario",
                "MENU_TITLE": "APUESTAS DEPORTIVAS",
                "MENU_URL": "/deportes",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/sports.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_envivo_mobile",
                "MENU_TITLE": "APUESTAS EN VIVO",
                "MENU_URL": "/deportes-en-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Desk.svg",
                "MENU_SECCION": "SectionItem menu-vivo",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_torneos",
                "MENU_TITLE": "Torneos",
                "MENU_URL": "/torneos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Trophy.svg",
                "MENU_SECCION": "SectionItem menu-vivo torneos",
                "MENU_COLOR": "#000000",
                "ISNEW": 0
            },
            {
                "MENU_ID": "accion_virtuales",
                "MENU_TITLE": "APUESTAS VIRTUALES",
                "MENU_URL": "/virtuales-lobby",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Race%20Hourse.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_casinoslots_nologueado",
                "MENU_TITLE": "CASINO",
                "MENU_URL": "/new-casino",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Casino%20Slot%20Icon.svg",
                "MENU_SECCION": "SectionItem"
            },
            {
                "MENU_ID": "accion_casinoenvivo_nologueado",
                "MENU_TITLE": "CASINO EN VIVO",
                "MENU_URL": "/live-casino-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20Casino%20en%20vivo.svg",
                "MENU_SECCION": "SectionItem"
            },
            {
                "MENU_ID": "accion_hipica_mobile",
                "MENU_TITLE": "HÍPICA",
                "MENU_URL": "/new-casino/55584",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Race%20Hourse.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_bingos",
                "MENU_TITLE": "BINGOS",
                "MENU_URL": "/bingos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/bingo2.svg",
                "MENU_SECCION": "",
                "MENU_COLOR": ""
            },
            {
                "MENU_ID": "accion_promociones_mobile",
                "MENU_TITLE": "Promociones",
                "MENU_URL": "/promociones-bonos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20Promo.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_lealtad",
                "MENU_TITLE": "Puntos de lealtad",
                "MENU_URL": "/programa_lealtad",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/lealtad2.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            }
        ]
    },
    "MENU_FOOTER": [
        {
            "MENU_ID": "accion_terminoscondiciones_footer",
            "MENU_TITLE": "Terminos y condiciones",
            "MENU_URL": "/terminosycondiciones",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_SECCION": ""
        },
        {
            "MENU_ID": "accion_politicaprivacidad_footer",
            "MENU_TITLE": "Politica de Privacidad",
            "MENU_URL": "/politica-de-privacidad",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_SECCION": "",
            "MENU_COLOR": "#000000"
        },
        {
            "MENU_ID": "accion_contactenos_footer",
            "MENU_TITLE": "Contactenos",
            "MENU_URL": "/contactenos",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_SECCION": "",
            "MENU_COLOR": "#000000"
        },
        {
            "MENU_ID": "accion_trabajaconnosotros_footer",
            "MENU_TITLE": "Trabaja con nosotros",
            "MENU_URL": "/trabaja-con-nosotros",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000"
        },
        {
            "MENU_ID": "accion_juegoresponsable_footer",
            "MENU_TITLE": "Juego Responsable",
            "MENU_URL": "/juego-responsable",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000"
        },
        {
            "MENU_ID": "accion_afiliados_footer",
            "MENU_TITLE": "Afiliados",
            "MENU_URL": "https://afiliados.doradobet.com",
            "MENU_TARGET": "_blank",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000",
            "TYPE": "EXTERNAL"
        },
        {
            "MENU_ID": "accion_nuestrastiendas_footer",
            "MENU_TITLE": "Nuestras tiendas",
            "MENU_URL": "/geolocalizacion",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000"
        },
        {
            "MENU_ID": "accion_resultados_footer",
            "MENU_TITLE": "Resultados",
            "MENU_URL": "/resultados",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000"
        },
        {
            "MENU_ID": "accion_blog_footer",
            "MENU_TITLE": "Blog",
            "MENU_URL": "https://blog.doradobet.com",
            "MENU_TARGET": "_blank",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000",
            "TYPE": "EXTERNAL"
        },
        {
            "MENU_ID": "accion_bonos_footer",
            "MENU_TITLE": "Bonos",
            "MENU_URL": "/promociones-bonos",
            "MENU_TARGET": "",
            "MENU_ICON": "",
            "MENU_COLOR": "#000000"
        }
    ],
    "MENU_FOOTER_LIGHT": {
        "pe": [
            {
                "MENU_TITLE": "Información General",
                "MENU_LIST": [
                    {
                        "MENU_ID": "accion_reglasapuestas",
                        "MENU_TITLE": "Reglas de apuestas",
                        "MENU_URL": "/terminosycondiciones/control-riesgo",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_depositos",
                        "MENU_TITLE": "Depósitos",
                        "MENU_URL": "/terminosycondiciones/recargas-retiros-bonos",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_retiros",
                        "MENU_TITLE": "Retiros",
                        "MENU_URL": "/terminosycondiciones/recargas-retiros-bonos",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_limitesdeposito",
                        "MENU_TITLE": "Límite de Apuestas",
                        "MENU_URL": "/terminosycondiciones/topes-valor-apuesta",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_puntoslealtad",
                        "MENU_TITLE": "Puntos de lealtad",
                        "MENU_URL": "/programa_lealtad",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_tiendapremios",
                        "MENU_TITLE": "Tienda de premios",
                        "MENU_URL": "/shop-bonuses",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    }
                ],
                "show": true
            },
            {
                "MENU_TITLE": "Nuestras Secciones",
                "MENU_LIST": [
                    {
                        "MENU_ID": "accion_promociones_light",
                        "MENU_TITLE": "Promociones",
                        "MENU_URL": "/promociones-bonos",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_envivo",
                        "MENU_TITLE": "Apuestas en vivo",
                        "MENU_URL": "/apuestas-en-vivo",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_casinoslots_light",
                        "MENU_TITLE": "Casino",
                        "MENU_URL": "/new-casino",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_resultados",
                        "MENU_TITLE": "Resultados",
                        "MENU_URL": "/resultados",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_blog",
                        "MENU_TITLE": "Blog",
                        "MENU_URL": "https://blog.doradobet.com/",
                        "MENU_SECCION": "",
                        "TARGER": "blank"
                    },
                    {
                        "MENU_ID": "accion_hipica",
                        "MENU_TITLE": "Hípica",
                        "MENU_URL": "/new-casino/55584",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    }
                ],
                "show": true
            },
            {
                "MENU_TITLE": "Seguridad & Privacidad",
                "MENU_LIST": [
                    {
                        "MENU_ID": "accion_politicaprivacidad",
                        "MENU_TITLE": "Politica de Privacidad",
                        "MENU_URL": "/politica-de-privacidad",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_juegoresponsable",
                        "MENU_TITLE": "Juego Responsable",
                        "MENU_URL": "/juego-responsable",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_terminoscondiciones",
                        "MENU_TITLE": "Términos y Condiciones",
                        "MENU_URL": "/terminosycondiciones",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_preguntasfrecuentes",
                        "MENU_TITLE": "Preguntas Frecuentes",
                        "MENU_URL": "/preguntasfrecuentes",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_lavado",
                        "MENU_TITLE": "Lavado de Dinero",
                        "MENU_URL": "/terminosycondiciones/lavado-activos",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_politicaskyc",
                        "MENU_TITLE": "Políticas KyC",
                        "MENU_URL": "/terminosycondiciones/datos",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_recargasprom",
                        "MENU_TITLE": "Recargas, Retiros y Promociones",
                        "MENU_URL": "/terminosycondiciones/recargas-y-retiros",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    }
                ],
                "show": true
            },
            {
                "MENU_TITLE": "¿Necesitas Ayuda?",
                "MENU_LIST": [
                    {
                        "MENU_ID": "accion_nuestrastiendas",
                        "MENU_TITLE": "Nuestras tiendas",
                        "MENU_URL": "/geolocalizacion",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_trabajaconnosotros",
                        "MENU_TITLE": "Trabaja con nosotros",
                        "MENU_URL": "/trabaja-con-nosotros",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_afiliados",
                        "MENU_TITLE": "Programa de afiliados",
                        "MENU_URL": "https://afiliados.doradobet.com",
                        "MENU_SECCION": "",
                        "TARGER": "blank"
                    },
                    {
                        "MENU_ID": "accion_contactenos",
                        "MENU_TITLE": "Contáctanos",
                        "MENU_URL": "/contactenos",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_reclamaciones",
                        "MENU_TITLE": "Libro de Reclamaciones",
                        "MENU_URL": "/reclamaciones",
                        "MENU_SECCION": "",
                        "IS_PERU": "1",
                        "TARGER": "self"
                    },
                    {
                        "MENU_ID": "accion_ayuda",
                        "MENU_TITLE": "Ayuda",
                        "MENU_URL": "https://blog.doradobet.com/ayuda-doradobet/",
                        "MENU_SECCION": "",
                        "TARGER": "blank"
                    },
                    {
                        "MENU_ID": "accion_disputas",
                        "MENU_TITLE": "Resolución de Disputas",
                        "MENU_URL": "/terminosycondiciones/disputas",
                        "MENU_SECCION": "",
                        "TARGER": "self"
                    }
                ],
                "show": true
            }
        ]
    },
    "MENU_USUARIO_LOGUEADO_MOBILE": {
        "pe": [
            {
                "MENU_ID": "accion_inicio",
                "MENU_TITLE": "HOME",
                "MENU_URL": "/home",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20Inicio.svg",
                "MENU_SECCION": "SectionItem"
            },
            {
                "MENU_ID": "accion_depositar",
                "MENU_TITLE": "DEPOSITAR",
                "MENU_URL": "gestion/deposito",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/deposit.svg",
                "MENU_SECCION": "SectionItem deposito",
                "MENU_COLOR": "#000000",
                "IS_MOBILE": true
            },
            {
                "MENU_ID": "accion_deportivas",
                "MENU_TITLE": "APUESTAS DEPORTIVAS",
                "MENU_URL": "/deportes",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/home.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_envivo_usuario",
                "MENU_TITLE": "APUESTAS EN VIVO",
                "MENU_URL": "/deportes-en-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Desk.svg",
                "MENU_SECCION": "SectionItem menu-vivo",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_virtuales",
                "MENU_TITLE": "APUESTAS VIRTUALES",
                "MENU_URL": "/virtuales-lobby",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Race%20Hourse.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_torneos",
                "MENU_TITLE": "Torneos",
                "MENU_URL": "/torneos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Trophy.svg",
                "MENU_SECCION": "SectionItem menu-vivo",
                "MENU_COLOR": "#000000",
                "ISNEW": 0
            },
            {
                "MENU_ID": "accion_casinoslots_mobile",
                "MENU_TITLE": "CASINO",
                "MENU_URL": "/new-casino",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Casino%20Slot%20Icon.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_CLASS": ""
            },
            {
                "MENU_ID": "accion_casinoenvivo_usuario",
                "MENU_TITLE": "CASINO EN VIVO",
                "MENU_URL": "/live-casino-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20Casino%20en%20vivo.svg",
                "MENU_CLASS": ""
            },
            {
                "MENU_ID": "accion_hipica_usuario",
                "MENU_TITLE": "HÍPICA",
                "MENU_URL": "/new-casino/55584",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Race%20Hourse.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_bingos",
                "MENU_TITLE": "BINGOS",
                "MENU_URL": "/bingos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/bingo2.svg",
                "MENU_SECCION": "",
                "MENU_COLOR": ""
            },
            {
                "MENU_ID": "accion_promociones",
                "MENU_TITLE": "Promociones",
                "MENU_URL": "/promociones-bonos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/Icono%20Promo.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_lealtad",
                "MENU_TITLE": "Puntos de lealtad",
                "MENU_URL": "/programa_lealtad",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/lealtad2.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            }
        ]
    },
    "MENU_NOLOGUEADO": {
        "pe": [
            {
                "MENU_ID": "accion_inicio",
                "MENU_TITLE": "HOME",
                "MENU_URL": "/home",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/home.svg",
                "MENU_SECCION": "SectionItem"
            },
            {
                "MENU_ID": "accion_deportivas",
                "MENU_TITLE": "APUESTAS DEPORTIVAS",
                "MENU_URL": "/deportes",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/sports.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_envivo",
                "MENU_TITLE": "APUESTAS EN VIVO",
                "MENU_URL": "/deportes-en-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/en-vivo.svg",
                "MENU_SECCION": "SectionItem menu-vivo",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_torneos",
                "MENU_TITLE": "Torneos",
                "MENU_URL": "/torneos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/tournaments.svg",
                "MENU_SECCION": "SectionItem menu-vivo torneos",
                "MENU_COLOR": "#000000",
                "ISNEW": 0
            },
            {
                "MENU_ID": "accion_virtuales",
                "MENU_TITLE": "APUESTAS VIRTUALES",
                "MENU_URL": "/virtuales-lobby",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/race-horse.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_casinoslots",
                "MENU_TITLE": "CASINO",
                "MENU_URL": "/new-casino",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/casino.svg"
            },
            {
                "MENU_ID": "accion_casinoenvivo",
                "MENU_TITLE": "CASINO EN VIVO",
                "MENU_URL": "/live-casino-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/casino.svg",
                "MENU_CLASS": ""
            },
            {
                "MENU_ID": "accion_bingos",
                "MENU_TITLE": "BINGOS",
                "MENU_URL": "/bingos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/bingo2.svg",
                "MENU_COLOR": "#000000",
                "MENU_SECCION": ""
            },
            {
                "MENU_ID": "accion_otros",
                "MENU_TITLE": "OTROS",
                "MENU_URL": "/new-casino/55584",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/bingo2.svg",
                "MENU_SECCION": "",
                "MENU_COLOR": "#000000",
                "SUB_MENU": [
                    {
                        "MENU_ID": "accion_hipica",
                        "MENU_TITLE": "Hipica",
                        "MENU_URL": "/new-casino/55584"
                    }
                ]
            },
            {
                "MENU_ID": "accion_registro",
                "MENU_TITLE": "REGISTRATE",
                "MENU_URL": "/registro",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/register.svg",
                "MENU_SECCION": "",
                "MENU_COLOR": "#000000",
                "MENU_CLASS": "register bg-success shadow-clip",
                "SHADOW": 1
            }
        ]
    },
    "MENU_USUARIO_LOGUEADO": {
        "pe": [
            {
                "MENU_ID": "accion_inicio",
                "MENU_TITLE": "HOME",
                "MENU_URL": "/home",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/home.svg",
                "MENU_SECCION": "SectionItem"
            },
            {
                "MENU_ID": "accion_deportivas",
                "MENU_TITLE": "APUESTAS DEPORTIVAS",
                "MENU_URL": "/deportes",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/home.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_virtuales",
                "MENU_TITLE": "APUESTAS VIRTUALES",
                "MENU_URL": "/virtuales-lobby",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/race-horse.svg",
                "MENU_SECCION": "SectionItem",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_torneos",
                "MENU_TITLE": "Torneos",
                "MENU_URL": "/torneos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/tournaments.svg",
                "MENU_SECCION": "SectionItem menu-vivo",
                "MENU_COLOR": "#000000",
                "ISNEW": 0
            },
            {
                "MENU_ID": "accion_casinoslots",
                "MENU_TITLE": "CASINO",
                "MENU_URL": "/new-casino",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/casino.svg",
                "MENU_CLASS": "casino-down",
                "SUBMENU_USUARIO_CASINO": [
                    {
                        "MENU_ID": "accion_casinoenvivo",
                        "MENU_TITLE": "CASINO EN VIVO",
                        "MENU_URL": "/live-casino",
                        "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/livecasino.svg",
                        "MENU_CLASS": ""
                    },
                    {
                        "MENU_ID": "accion_casinoslots",
                        "MENU_TITLE": "CASINO SLOTS",
                        "MENU_URL": "/new-casino",
                        "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/casino.svg",
                        "MENU_CLASS": ""
                    },
                    {
                        "MENU_ID": "accion_betgames",
                        "MENU_TITLE": "BETGAMESTV",
                        "MENU_URL": "/betgamestv",
                        "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/livecasino.svg",
                        "MENU_CLASS": "betgames"
                    },
                    {
                        "MENU_ID": "accion_vivogaming",
                        "MENU_TITLE": "VIVOGAMING",
                        "MENU_URL": "/vivogaming",
                        "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/livecasino.svg",
                        "MENU_CLASS": "betgames"
                    }
                ]
            },
            {
                "MENU_ID": "accion_casinoenvivo",
                "MENU_TITLE": "CASINO EN VIVO",
                "MENU_URL": "/live-casino-vivo",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/livecasino.svg",
                "MENU_CLASS": "SectionItem casino-down"
            },
            {
                "MENU_ID": "accion_bingos",
                "MENU_TITLE": "BINGOS",
                "MENU_URL": "/bingos",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/bingo2.svg",
                "MENU_SECCION": "",
                "MENU_COLOR": "#000000"
            },
            {
                "MENU_ID": "accion_otros",
                "MENU_TITLE": "OTROS",
                "MENU_URL": "/new-casino/55584",
                "MENU_ICON": "https://images.virtualsoft.tech/site/menu/bingo2.svg",
                "MENU_SECCION": "",
                "MENU_COLOR": "#000000",
                "SUB_MENU": [
                    {
                        "MENU_ID": "accion_hipica",
                        "MENU_TITLE": "Hipica",
                        "MENU_URL": "/new-casino/55584"
                    }
                ]
            },
            {
                "MENU_ID": "accion_depositar",
                "MENU_TITLE": "DEPOSITAR",
                "MENU_URL": "/gestion/deposito",
                "MENU_ICON": "https://images.virtualsoft.tech/site/doradobet/icons/deposit.svg",
                "MENU_SECCION": "SectionItem deposito",
                "MENU_COLOR": "#000000",
                "MENU_CLASS": "bg-success",
                "IS_MOBILE": true
            }
        ]
    },
    "registro": {
        "styleVersion": 1,
        "paisdefault": 173,
        "paisesCorto": [
            173,
            2
        ],
        "paisesLargo": [
            13,
            33,
            66,
            94,
            99,
            113,
            65
        ],
        "tycText": {
            "show": true,
            "text": "Soy mayor de 18 anos y he leído y aceptado los Términos y condiciones generales, la política de privacidad y la política de juego responsable de Doradobet"
        },
        "showName": true,
        "recaptcha": {
            "show": true
        },
        "progressbar": {
            "textPaso1": "Información Personal",
            "textPaso2": "Información Geográfica",
            "textPaso3": "Información de Seguridad"
        },
        "cedula": {
            "minlength": 6,
            "maxlength": 9
        },
        "direccion": {
            "minlength": 6
        },
        "origenFondos": {
            "minlength": 3
        },
        "claveReg": {
            "minlength": 4
        },
        "quisknumber": {
            "minlength": 10
        },
        "password": {
            "pattern": "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$",
            "patternMessage": "Ingrese al menos una mayúscula, una minúscula y un número"
        },
        "depositLimits": [],
        "form": {
            "pe": [
                {
                    "name": "countryResident_id",
                    "label": "País de Residencia:",
                    "placeholder": "Seleccione país",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "countryResidentList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "País de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "first_name",
                    "label": "Primer Nombre:",
                    "placeholder": "Primer Nombre",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Primer nombre es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                3,
                                "La longitud del primer Nombre debe ser mayor o igual a 3 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del primer Nombre debe ser inferior o igual a 20 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "last_name",
                    "label": "Primer Apellido:",
                    "placeholder": "Primer Apellido",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Apellido es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                3,
                                "La longitud del apellido debe ser mayor o igual a 3 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del apellido debe ser inferior o igual a 20 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "gender",
                    "label": "Sexo:",
                    "type": "radio",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Sexo es requerido."
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "Masculino",
                            "value": "M",
                            "name": "sex",
                            "type": "radio",
                            "icon": "fa-solid fa-mars"
                        },
                        {
                            "title": "Femenino",
                            "value": "F",
                            "name": "sex",
                            "type": "radio",
                            "icon": "fa-solid fa-venus"
                        }
                    ]
                },
                {
                    "name": "nationality_id",
                    "label": "Nacionalidad:",
                    "placeholder": "Seleccione nacionalidad",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "nationalityList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Nacionalidad es requerida."
                            ]
                        }
                    ]
                },
                {
                    "name": "doctype_id",
                    "label": "Tipo de Documento:",
                    "placeholder": "Seleccione tipo de documento",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "docTypeList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Tipo de documento es requerido."
                            ]
                        }
                    ],
                    "options": [
                        {
                            "name": "Cédula de ciudadanía",
                            "value": "1"
                        },
                        {
                            "name": "Cédula de extrangería",
                            "value": "2"
                        },
                        {
                            "name": "Pasaporte",
                            "value": "3"
                        }
                    ]
                },
                {
                    "name": "docnumber",
                    "label": "Numero de Identificación:",
                    "placeholder": "Numero de Identificación",
                    "type": "text",
                    "icon": "fa-solid fa-id-card",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Número de documento es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del número de documento debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                15,
                                "La longitud del número de documento debe ser inferior o igual a 15 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "birth_date",
                    "label": "Fecha de Nacimiento:",
                    "placeholder": "Fecha de Nacimiento:",
                    "type": "date",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Fecha de Nacimiento es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                8,
                                "La longitud del primer Nombre debe ser mayor o igual a 8 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                11,
                                "La longitud del primer Nombre debe ser inferior o igual a 11 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(19|20)\\d\\d-(0\\d|1[012])-(0\\d|1\\d|2\\d|3[01])$",
                                "Formato no valido"
                            ]
                        },
                        {
                            "type": "when",
                            "params": [(field, schema) => {
                                if(field != undefined){
                                    let date = new Date(field+'T00:00:00').getTime();
                                    let diff_ms = Date.now() - date;
                                    let age_dt = new Date(diff_ms);
                                    let age = Math.abs(age_dt.getUTCFullYear() - 1970);
                                    return age < 18 ? schema.length(1,"Infringe edad mínima") : schema
                                }
                            }]
                        }
                    ]
                },
                {
                    "name": "phone",
                    "label": "Teléfono Celular:",
                    "placeholder": "Teléfono Celular",
                    "type": "number",
                    "icon": "fa-solid fa-mobile",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Número de celular es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                7,
                                "La longitud del número de celular debe ser mayor o igual a 7 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del número de celular debe ser inferior o igual a 20 caracteres."
                            ]
                        },
                        {
                            "type": "when",
                            "exists_phone":true,
                            "params": [(schema) => {
                                return schema
                            }]
                        }
                    ]
                },
                {
                    "name": "department_id",
                    "label": "Provincia de Residencia:",
                    "placeholder": "Provincia de Residencia...",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "departmentList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Departamento de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "city_id",
                    "label": "Ciudad de Residencia:",
                    "placeholder": "Ciudad de Residencia...",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "cityList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Ciudad de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "address",
                    "label": "Dirección del domicilio:",
                    "placeholder": "Dirección del domicilio",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Direcciόn es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                5,
                                "La longitud de la direcciόn debe ser mayor o igual a 5 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la direcciόn debe ser inferior o igual a 30 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "email",
                    "label": "Correo electrónico:",
                    "placeholder": "Ingrese su correo electrónico",
                    "type": "text",
                    "icon": "fa-solid fa-envelope",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Correo electrónico es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                5,
                                "La longitud de la direcciόn debe ser mayor o igual a 5 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la direcciόn debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "email",
                            "params": [
                                "Por favor, introduce una dirección de correo electrónico válida."
                            ]
                        }
                    ]
                },
                {
                    "name": "email2",
                    "label": "Confirmar correo electrónico:",
                    "placeholder": "Confirme correo electrónico",
                    "type": "text",
                    "icon": "fa-solid fa-envelope",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Confirmar correo electrónico es requerido."
                            ]
                        },
                        {
                            "type": "when",
                            "params": ["email",(field, schema, test) => { return field !== test.value ? schema.matches("^[0-9]+$","Correo electrónico y Confirmar correo electrónico no coinciden.") : schema}]
                        }
                    ]
                },
                {
                    "name": "password",
                    "label": "Contraseña:",
                    "placeholder": "Ingrese una contraseña",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                6,
                                "La longitud de la contraseña debe ser mayor o igual a 6 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                30,
                                "La longitud de la contraseña debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        }
                    ]
                },
                {
                    "name": "password2",
                    "label": "Confirmar contraseña:",
                    "placeholder": "Confirme su contraseña",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                6,
                                "La longitud de la contraseña debe ser mayor o igual a 6 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                30,
                                "La longitud de la contraseña debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        },
                        {
                            "type": "when",
                            "params": ["password",(field, schema, test) => { return field !== test.value ? schema.matches("^[0-9]+$","Contraseña y confirmar contraseña no coinciden.") : schema}]
                        }
                    ]
                },
                {
                    "name": "code_promo",
                    "label": "Tengo un código promocional:",
                    "placeholder": "Tengo un código promocional",
                    "type": "text",
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "acepta_terminos",
                    "label": "Soy mayor de 18 anos y he leído y aceptado los Términos y condiciones generales, la política de privacidad y la política de juego responsable de Doradobet",
                    "type": "checkbox",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "offerRegister",
                    "label": "Autorizo el envió de información sobre novedades y todo tipo de publicidad comercial en mis diferentes canales de comunicación",
                    "type": "checkbox",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "myBonus": {
        "form": {
            "pe": [
                {
                    "name": "bonuscode",
                    "label": "Código del bono:",
                    "placeholder": "Ingresar Código de Bono",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                }
            ]
        },
        "tableColumns": {
            "pe": [
                {
                    "name": "tyc",
                    "header": "TyC",
                    "type": "button"
                },
                {
                    "name": "promid",
                    "header": "Prom ID",
                    "type": "text"
                },
                {
                    "name": "id",
                    "header": "Bono ID",
                    "type": "text"
                },
                {
                    "name": "tipo",
                    "header": "Tipo Bono",
                    "type": "text"
                },
                {
                    "name": "estado",
                    "header": "Estado",
                    "type": "text"
                },
                {
                    "name": "fecha_creacion",
                    "header": "Fecha creación",
                    "type": "text"
                },
                {
                    "name": "fecha_expiracion",
                    "header": "Fecha expiración",
                    "type": "text"
                },
                {
                    "name": "valor_bono",
                    "header": "Valor bono",
                    "type": "text"
                },
                {
                    "name": "rollower",
                    "header": "Rollower",
                    "type": "text"
                },
                {
                    "name": "apuestas",
                    "header": "Apuestas",
                    "type": "text"
                },
                {
                    "name": "rollower_faltante",
                    "header": "Rollower faltante",
                    "type": "text"
                }
            ]
        }
    },
    "consultCasinoTickets": {
        "form": {
            "pe": [
                {
                    "name": "fecha_ini",
                    "label": "Fecha Inicio:",
                    "placeholder": "Fecha Inicio:",
                    "type": "date",
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "fecha_fin",
                    "label": "Fecha Fin:",
                    "placeholder": "Fecha Fin:",
                    "type": "date",
                    "validationType": "string",
                    "validations": []
                }
            ]
        },
        "tableColumns": {
            "pe": [
                {
                    "name": "ticket_id",
                    "header": "No Ticket",
                    "type": "text"
                },
                {
                    "name": "categoria",
                    "header": "Categoría",
                    "type": "text"
                },
                {
                    "name": "fecha_crea",
                    "header": "Fecha creación",
                    "type": "text"
                },
                {
                    "name": "juego",
                    "header": "Nombre del Juego",
                    "type": "text"
                },
                {
                    "name": "vlr_apuesta",
                    "header": "Apuestas",
                    "type": "text"
                },
                {
                    "name": "vlr_premio",
                    "header": "Premio",
                    "type": "text"
                },
                {
                    "name": "moneda",
                    "header": "Moneda",
                    "type": "text"
                },
                {
                    "name": "estado",
                    "header": "Estado",
                    "type": "text"
                },
                {
                    "name": "current_rtp",
                    "header": "RTP Actual",
                    "type": "text"
                }
            ]
        }
    },
    "consultDeposits": {
        "form": {
            "pe": [
                {
                    "name": "fecha_ini",
                    "label": "Fecha Inicio:",
                    "placeholder": "Fecha Inicio:",
                    "type": "date",
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "fecha_fin",
                    "label": "Fecha Fin:",
                    "placeholder": "Fecha Fin:",
                    "type": "date",
                    "validationType": "string",
                    "validations": []
                }
            ]
        },
        "tableColumns": {
            "pe": [
                {
                    "name": "recarga_id",
                    "header": "Número de deposito",
                    "type": "text"
                },
                {
                    "name": "fecha_crea",
                    "header": "Fecha Deposito",
                    "type": "text"
                },
                {
                    "name": "medio",
                    "header": "Medio",
                    "type": "text"
                },
                {
                    "name": "proveedor",
                    "header": "Código de transacción",
                    "type": "text"
                },
                {
                    "name": "valor",
                    "header": "Valor",
                    "type": "text"
                },
                {
                    "name": "valor_promocional",
                    "header": "Bono",
                    "type": "text"
                },
                {
                    "name": "total",
                    "header": "Total",
                    "type": "text"
                },
                {
                    "name": "moneda",
                    "header": "Moneda",
                    "type": "text"
                }
            ]
        }
    },
    "consultWithdrawals": {
        "form": {
            "pe": [
                {
                    "name": "fecha_ini",
                    "label": "Fecha Inicio:",
                    "placeholder": "Fecha Inicio:",
                    "type": "date",
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "fecha_fin",
                    "label": "Fecha Fin:",
                    "placeholder": "Fecha Fin:",
                    "type": "date",
                    "validationType": "string",
                    "validations": []
                }
            ]
        },
        "tableColumns": {
            "pe": [
                {
                    "name": "cuenta_id",
                    "header": "Número de retiro",
                    "type": "text"
                },
                {
                    "name": "medio",
                    "header": "Medio",
                    "type": "text"
                },
                {
                    "name": "estado",
                    "header": "Estado",
                    "type": "text"
                },
                {
                    "name": "fecha_crea",
                    "header": "Fecha Retiro",
                    "type": "text"
                },
                {
                    "name": "fecha_pago",
                    "header": "Fecha Pago",
                    "type": "text"
                },
                {
                    "name": "valor",
                    "header": "Valor",
                    "type": "text"
                },
                {
                    "name": "moneda",
                    "header": "Moneda",
                    "type": "text"
                }
            ]
        }
    },
    "cuentasBancaria": {
        "form": {
            "pe": [

                {
                    "name": "bank",
                    "label": "Banco",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "bankList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "bank2",
                    "label": "Confirmar banco",
                    "placeholder": "Confirmar banco",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "bankList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": 'when',
                            "params": ["bank",(field, schema, test) => { return field !== test.value ? schema.matches("^[A-Z]+$","Banco y confirmar banco no coinciden.") : schema}]
                        }
                    ]
                },
                {
                    "name": "account_type",
                    "label": "Tipo de cuenta",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "accountTypeList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "name": "Ahorros",
                            "value": "0"
                        },
                        {
                            "name": "Corriente",
                            "value": "1"
                        }
                    ]
                },
                {
                    "name": "client_type",
                    "label": "Tipo de cliente",
                    "placeholder": "Seleccione opción",
                    "type": "select",
                    "disabled": true,
                    "validationType": "string",
                    "optionsKey": "clientTypeList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "name": "Personal",
                            "value": "0"
                        }
                    ]
                },
                {
                    "name": "account",
                    "label": "Número de cuenta",
                    "placeholder": "Número de cuenta",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                3,
                                "Mínimo 3 caracteres"
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                25,
                                "Máximo 25 caracteres"
                            ]
                        }
                    ]
                },
                {
                    "name": "account2",
                    "label": "Confirmar número de cuenta",
                    "placeholder": "Confirme su número de cuenta",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": "when",
                            "params": ["account",(field, schema, test) => { return field !== test.value ? schema.matches("^[A-Z]+$","Número de cuenta y confirmar número de cuenta no coinciden.") : schema}]
                        }
                    ]
                },
                {
                    "name": "cod_interbank",
                    "label": "Código interbancario",
                    "placeholder": "Ingrese el código interbancario",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                20,
                                "Mínimo 20 caracteres"
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "Máximo 20 caracteres"
                            ]
                        }
                    ]
                },
                {
                    "name": "cod_interbank2",
                    "label": "Confirmar código interbancario",
                    "placeholder": "Confirmar código interbancario",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": "when",
                            "params": ["cod_interbank",(field, schema, test) => { return field !== test.value ? schema.matches("^[A-Z]+$","Código interbancario y confirmar código interbancario no coinciden.") : schema}]
                        }
                    ]
                }
            ]
        },
        "tableColumns": {
            "pe": [
                {
                    "name": "bank_name",
                    "header": "Banco",
                    "type": "text"
                },
                {
                    "name": "account",
                    "header": "Cuenta",
                    "type": "text"
                },
                {
                    "name": "interbank_code",
                    "header": "Código interbancario",
                    "type": "text"
                },
                {
                    "name": "account_type",
                    "header": "Tipo de cuenta",
                    "type": "text"
                },
                {
                    "name": "client_type",
                    "header": "Tipo de cliente",
                    "type": "text"
                },
                {
                    "name": "state",
                    "header": "Estado",
                    "type": "text"
                },
                {
                    "name": "coin",
                    "header": "Moneda",
                    "type": "text"
                },
                {
                    "name": "delete",
                    "header": "Anular",
                    "type": "button"
                }
            ]
        },
        "pe": {
            "widthF": true,
            "textCuentasBancaria1": "Las solicitudes de retiro por medio de cuentas bancarias, realizadas de lunes a sábado en el horario de 9:00 a.m. a 5:00 p.m., tienen un plazo de 5 a 72 horas hábiles para ser pagadas según la cantidad de solicitudes y el correcto funcionamiento de los servicios de los bancos.<br/><br/>En caso de tener una cuenta bancaria en otra entidad financiera que no sea BCP, por favor digite el código interbancario correctamente para evitar devoluciones de saldo y efectuar el pago sin inconvenientes.<br/><br/>Verifique que su cuenta bancaria no esté bloqueada antes de solicitar el retiro.<br/><br/>Los pagos solo se realizan únicamente a cuentas bancarias en soles."
        },
        "ec": {
            "textCuentasBancaria1": "Recuerde que la cuenta bancaria que desea registrar debe pertenecer al propietario que está registrado como titular del usuario en Doradobet."
        }
    },
    "miCuenta": {
        "form": {
            "pe": [
                {
                    "name": "first_name",
                    "label": "Primer Nombre:",
                    "placeholder": "Primer Nombre",
                    "type": "text",
                    "validationType": "string",
                    "disabled": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Primer nombre es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                3,
                                "La longitud del primer Nombre debe ser mayor o igual a 3 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del primer Nombre debe ser inferior o igual a 20 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-zA-Z])[a-zA-Z]+$",
                                "Ingrese un nombre válido: solo letras, sin espacios, sin dígitos y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "second_name",
                    "label": "Segundo Nombre:",
                    "placeholder": "Segundo Nombre:",
                    "type": "text",
                    "validationType": "string",
                    "disabled": true,
                    "validations": [
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del segundo nombre debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                100,
                                "La longitud del segundo nombre debe ser inferior o igual a 100 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-zA-Z])[a-zA-Z]+$",
                                "Ingrese un segundo nombre válido: solo letras, sin espacios, sin dígitos y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "sur_name",
                    "label": "Primer Apellido:",
                    "placeholder": "Primer Apellido",
                    "type": "text",
                    "validationType": "string",
                    "disabled": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Apellido es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del apellido debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                100,
                                "La longitud del apellido debe ser inferior o igual a 100 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-zA-Z])[a-zA-Z]+$",
                                "Ingrese un apellido válido: solo letras, sin espacios, sin dígitos y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "second_sur_name",
                    "label": "Segundo Apellido:",
                    "placeholder": "Segundo Apellido:",
                    "type": "text",
                    "validationType": "string",
                    "disabled": true,
                    "validations": [
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del segundo apellido debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                100,
                                "La longitud del segundo apellido debe ser inferior o igual a 100 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-zA-Z])[a-zA-Z]+$",
                                "Ingrese un segundo apellido válido: solo letras, sin espacios, sin dígitos y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "documentType",
                    "label": "Tipo de Documento:",
                    "placeholder": "Seleccione tipo de documento",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "docTypeList",
                    "disabled": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Tipo de documento es requerido."
                            ]
                        }
                    ],
                    "options": [
                        {
                            "name": "Cédula de ciudadanía",
                            "value": "1"
                        },
                        {
                            "name": "Cédula de extrangería",
                            "value": "2"
                        },
                        {
                            "name": "Pasaporte",
                            "value": "3"
                        }
                    ]
                },
                {
                    "name": "doc_number",
                    "label": "Numero de Identificación:",
                    "placeholder": "Numero de Identificación",
                    "type": "text",
                    "icon": "fa-solid fa-id-card",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Número de documento es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del número de documento debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                15,
                                "La longitud del número de documento debe ser inferior o igual a 15 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^[A-Za-z0-9]+$",
                                "Ingrese un número de documento válido: sin espacios y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "phone",
                    "label": "Teléfono Celular:",
                    "placeholder": "Teléfono Celular",
                    "type": "number",
                    "icon": "fa-solid fa-mobile",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Número de celular es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                7,
                                "La longitud del número de celular debe ser mayor o igual a 7 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del número de celular debe ser inferior o igual a 20 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^[0-9]+$",
                                "Ingrese un número de celular válido; sólo se permite ingresar numeros sin espacios, letras o símbolos."
                            ]
                        }
                    ]
                },
                {
                    "name": "mobile_phone",
                    "label": "Teléfono Fijo:",
                    "placeholder": "Teléfono Fijo:",
                    "type": "number",
                    "icon": "fa-solid fa-mobile",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "min",
                            "params": [
                                1,
                                "Teléfono fijo debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del teléfono fijo debe ser inferior o igual a 20 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^[0-9]+$",
                                "Ingrese un teléfono fijo válido; sólo se permite ingresar numeros sin espacios, letras o símbolos."
                            ]
                        }
                    ]
                },
                {
                    "name": "address",
                    "label": "Dirección del domicilio:",
                    "placeholder": "Dirección del domicilio",
                    "type": "text",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Direcciόn es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud de la direcciόn debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                150,
                                "La longitud de la direcciόn debe ser inferior o igual a 150 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "country",
                    "label": "País de Residencia:",
                    "placeholder": "Seleccione país",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "countryList",
                    "disabled": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "País de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "department_id",
                    "label": "Provincia de Residencia:",
                    "placeholder": "Provincia de Residencia...",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "departmentList",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Departamento de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "city_id",
                    "label": "Ciudad de Residencia:",
                    "placeholder": "Ciudad de Residencia...",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "cityList",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Ciudad de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "sex",
                    "label": "Sexo:",
                    "type": "radio",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Sexo es requerido."
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "Masculino",
                            "value": "M",
                            "name": "sex",
                            "type": "radio",
                            "icon": "fa-solid fa-mars"
                        },
                        {
                            "title": "Femenino",
                            "value": "F",
                            "name": "sex",
                            "type": "radio",
                            "icon": "fa-solid fa-venus"
                        }
                    ]
                },
                {
                    "name": "password",
                    "label": "Clave:",
                    "placeholder": "Clave:",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud de la contraseña debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la contraseña debe ser inferior o igual a 50 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "verificarCuenta": {
        "form": {
            "pe": [
                {
                    "name": "birth_date",
                    "label": "Fecha de Nacimiento:",
                    "placeholder": "Fecha de Nacimiento:",
                    "type": "date",
                    "widthFull": false,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Fecha de Nacimiento es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                8,
                                "La longitud del primer Nombre debe ser mayor o igual a 8 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                11,
                                "La longitud del primer Nombre debe ser inferior o igual a 11 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "second_name",
                    "label": "Segundo Nombre:",
                    "placeholder": "Segundo Nombre:",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Segundo nombre es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del segundo nombre debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                100,
                                "La longitud del segundo nombre debe ser inferior o igual a 100 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-zA-Z])[a-zA-Z]+$",
                                "Ingrese un segundo nombre válido: solo letras, sin espacios, sin dígitos y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "second_sur_name",
                    "label": "Segundo Apellido:",
                    "placeholder": "Segundo Apellido:",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Segundo apellido es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del segundo apellido debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                100,
                                "La longitud del segundo apellido debe ser inferior o igual a 100 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-zA-Z])[a-zA-Z]+$",
                                "Ingrese un segundo apellido válido: solo letras, sin espacios, sin dígitos y / o símbolos"
                            ]
                        }
                    ]
                },
                {
                    "name": "password",
                    "label": "Clave:",
                    "placeholder": "Clave:",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud de la contraseña debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la contraseña debe ser inferior o igual a 50 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        }
                    ]
                },
                {
                    "name": "dataURLFILE1",
                    "label": "DNI lado anterior:",
                    "placeholder": "DNI lado anterior:",
                    "type": "file",
                    "widthFull":true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "dataURLFILE2",
                    "label": "DNI lado posterior:",
                    "placeholder": "DNI lado posterior:",
                    "type": "file",
                    "widthFull":true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido."
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "changePassword": {
        "form": {
            "pe": [
                {
                    "name": "current_password",
                    "label": "Ingrese la contrasena actual:",
                    "placeholder": "Ingrese la contrasena actual:",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        }
                    ]
                },
                {
                    "name": "password",
                    "label": "Ingrese la contrasena nueva:",
                    "placeholder": "Ingrese la contrasena nueva",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                6,
                                "La longitud de la contraseña debe ser mayor o igual a 6 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                30,
                                "La longitud de la contraseña debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        }
                    ]
                },
                {
                    "name": "password2",
                    "label": "Confirme la contrasena nueva:",
                    "placeholder": "Confirme la contrasena nueva",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                6,
                                "La longitud de la contraseña debe ser mayor o igual a 6 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                30,
                                "La longitud de la contraseña debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        },
                        {
                            "type": "when",
                            "params": ["password",(field, schema, test) => { return field !== test.value ? schema.matches("^[0-9]+$","Contraseña y confirmar contraseña no coinciden.") : schema}]
                        }
                    ]
                }
            ]
        }
    },
    "contact": {
        "styleVersion": 1,
        "recaptcha": {
            "show": true
        },
        "form": {
            "pe": [
                {
                    "name": "name",
                    "label": "Nombre completo:",
                    "placeholder": "Nombre completo:",
                    "type": "text",
                    "icon": "fa-solid fa-user",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Nombre es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "email",
                    "label": "Correo electrónico:",
                    "placeholder": "Ingrese su correo electrónico",
                    "type": "text",
                    "icon": "fa-solid fa-envelope",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Correo electrónico es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                5,
                                "La longitud de la direcciόn debe ser mayor o igual a 5 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la direcciόn debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "email",
                            "params": [
                                "Por favor, introduce una dirección de correo electrónico válida."
                            ]
                        }
                    ]
                },
                {
                    "name": "phone",
                    "label": "Teléfono Celular:",
                    "placeholder": "Teléfono Celular",
                    "type": "number",
                    "icon": "fa-solid fa-mobile",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Número de celular es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                7,
                                "La longitud del número de celular debe ser mayor o igual a 7 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del número de celular debe ser inferior o igual a 20 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "body",
                    "label": "Mensaje:",
                    "placeholder": "Mensaje:",
                    "type": "textarea",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Mensaje es requerido."
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "recuperarClave": {
        "recaptcha": {
            "show": true
        },
        "recaptcha2": {
            "show": false
        },
        "notaText": {
            "show": true,
            "text": "Nota importante: esta funcionalidad le permite tanto recuperar su clave en caso de haberla olvidado como también desbloquear su usuario cuando usted ha sobrepasado el máximo número de intentos fallidos de acceso. El correo electrónico que debe suministrar es el mismo que está asociado a su cuenta de Doradobet. Una vez haga clic en el botón ENVIAR INFORMACION, por favor revise su correo donde se le darán más instrucciones: *"
        },
        "form": {
            "pe": [
                {
                    "name": "email",
                    "label": "Correo electrónico:",
                    "placeholder": "Ingrese su correo electrónico",
                    "type": "text",
                    "icon": "fa-solid fa-envelope",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Correo electrónico es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                5,
                                "La longitud de la direcciόn debe ser mayor o igual a 5 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la direcciόn debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "email",
                            "params": [
                                "Por favor, introduce una dirección de correo electrónico válida."
                            ]
                        }
                    ]
                }
            ]
        },
        "form2": {
            "pe": [
                {
                    "name": "new_password",
                    "label": "Contraseña:",
                    "placeholder": "Ingrese una contraseña",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                6,
                                "La longitud de la contraseña debe ser mayor o igual a 6 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                30,
                                "La longitud de la contraseña debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        }
                    ]
                },
                {
                    "name": "password2",
                    "label": "Confirmar contraseña:",
                    "placeholder": "Confirme su contraseña",
                    "type": "password",
                    "icon": "fa-solid fa-key",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "La contraseña es requerida."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                6,
                                "La longitud de la contraseña debe ser mayor o igual a 6 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                30,
                                "La longitud de la contraseña debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "matches",
                            "params": [
                                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\[\\]\\\\\\`~!@#$%^&*()_+={};:<>|./?,\\\"\"-]+$",
                                "La contraseña debe contener números, mayúsculas y minúsculas."
                            ]
                        },
                        {
                            "type": "when",
                            "params": ["new_password",(field, schema, test) => { return field !== test.value ? schema.matches("^[0-9]+$","Contraseña y confirmar contraseña no coinciden.") : schema}]
                        }
                    ]
                }
            ]
        }
    },
    "splaft": {
        "recaptcha": {
            "show": true
        },
        "form": {
            "pe": [
                {
                    "name": "paternal_last_name",
                    "label": "<strong>DATOS PERSONALES</strong><br><br>Apellido Paterno:",
                    "placeholder": "Apellido Paterno",
                    "type": "text",
                    "validationType": "string",
                    "disabled":true,
                    "validations": [
                    ]
                },
                {
                    "name": "mother_last_name",
                    "label": "<br><br>Apellido Materno:",
                    "placeholder": "Apellido Materno",
                    "type": "text",
                    "validationType": "string",
                    "disabled":true,
                    "validations": []
                },
                {
                    "name": "first_name",
                    "label": "Nombres:",
                    "placeholder": "Nombres",
                    "type": "text",
                    "validationType": "string",
                    "disabled":true,
                    "validations": []
                },
                {
                    "name": "nationality_id",
                    "label": "Nacionalidad:",
                    "placeholder": "Seleccione nacionalidad",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "nationalityList",
                    "disabled":true,
                    "validations": []
                },
                {
                    "name": "doc_type",
                    "label": " Tipo de Documento de identificación:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "validationType": "string",
                    "disabled":true,
                    "validations": [],
                    "options": [
                        {
                            "name": "DNI",
                            "value": "C"
                        },
                        {
                            "name": "Carnet de Extranjería",
                            "value": "E"
                        },
                        {
                            "name": "Pasaporte",
                            "value": "P"
                        },
                        {
                            "name": "Otros",
                            "value": "O"
                        }
                    ]
                },
                {
                    "name": "doc_nationality",
                    "label": "País:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "nationalityList",
                    "disabled":true,
                    "validations": []
                },
                {
                    "name": "identification",
                    "label": "Numero:",
                    "placeholder": "Numero",
                    "type": "text",
                    "disabled":true,
                    "icon": "fa-solid fa-id-card",
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "email",
                    "label": "Correo electrónico:",
                    "placeholder": "Correo electrónico:",
                    "type": "text",
                    "disabled":true,
                    "icon": "fa-solid fa-envelope",
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "phone",
                    "label": "Teléfono :",
                    "placeholder": "Teléfono ",
                    "type": "number",
                    "disabled":true,
                    "validationType": "string",
                    "validations": []
                },
                {
                    "name": "occupation",
                    "label": "Ocupación:",
                    "placeholder": "Ocupación",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "equity_capital_declaration",
                    "label": "<strong>DE LA TRANSACCIÓN Y EL ORIGEN DE LOS FONDOS</strong><br><br>1. Declaro que no soy un intermediario en esta operación y que los fondos para efectuar la apuesta materia de este premio son propios",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "Si soy",
                            "value": "S",
                            "name": "S",
                            "type": "radio"
                        },
                        {
                            "title": "No soy",
                            "value": "N",
                            "name": "N",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "origin_money_declaration",
                    "label": "2. Declaro que el origen del dinero con el que realicé esta apuesta ganadora proviene de: (ejemplos: mi trabajo, un préstamo, una herencia, un premio, un seguro, etc.)<br><br>Detallar el origen",
                    "placeholder": "Origen",
                    "type": "text",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "illegal_activities_declaration",
                    "label": "3. Declaro que el dinero con el que realicé esta apuesta ganadora en ningún caso involucra contagio con actividades ilícitas propias o de terceras personas",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "Si involucra",
                            "value": "S",
                            "name": "S",
                            "type": "radio"
                        },
                        {
                            "title": "No involucra",
                            "value": "N",
                            "name": "N",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "is_a_pep",
                    "label": "<strong>RELACIÓN CON EL SECTOR PÚBLICO (PEP)</strong><br><br><div class='text-justify'>Las personas expuestas políticamente (PEP) son personas naturales, nacionales o extranjeras, que cumplen o que en los últimos 5 años han cumplido funciones públicas destacadas o funciones prominentes en una organización internacional, en Perú o el extranjero (Por ejemplo: presidentes, ministros, gobernadores regionales, alcaldes, congresistas, jueces, fiscales, gerentes, cargos de primer nivel en entidades del Estado, organismos constitucionalmente autónomos, partidos políticos, cargos de primer nivel en las fuerzas armadas (Ejercito, Marina de Guerra y Áerea) y fuerzas de la seguridad pública (policia), embajadores y en general todos aquellos colaboradores directos y máxima autoridad de las instituciones a las que pertencen).</div><br><b>Utilizando esta definición, declaro bajo juramento que:</b><br><br>",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "SÍ SOY UNA PEP",
                            "value": "S",
                            "name": "S",
                            "type": "radio"
                        },
                        {
                            "title": "NO SOY UNA PEP",
                            "value": "N",
                            "name": "N",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "is_a_pep_detail",
                    "label": "En caso de SI, detallar el cargo",
                    "placeholder": "Cargo",
                    "type": "text",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "when",
                            "params": ["is_a_pep",(field, schema) => { return field == 'S' ? schema.required("Campo requerido") : schema}]
                        }
                    ]
                },
                {
                    "name": "family_members_pep",
                    "label": "",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "SÍ TENGO FAMILIARES DIRECTOS QUE SON PEP",
                            "value": "S",
                            "name": "S",
                            "type": "radio"
                        },
                        {
                            "title": "NO TENGO FAMILIARES DIRECTOS QUE SON PEP",
                            "value": "N",
                            "name": "N",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "family_member_fullname",
                    "label": "Nombre/ apellidos del familiar:",
                    "placeholder": "Nombre/ apellidos del familiar",
                    "type": "text",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "when",
                            "params": ["family_members_pep",(field, schema) => { return field == 'S' ? schema.required("Campo requerido") : schema}]
                        }
                    ]
                },
                {
                    "name": "know_activities_family_member",
                    "label": "",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "SI CONOZCO LAS ACTIVIDADES DE CIERTOS FAMILIARES DIRECTOS",
                            "value": "S",
                            "name": "S",
                            "type": "radio"
                        },
                        {
                            "title": "NO CONOZCO LAS ACTIVIDADES DE CIERTOS FAMILIARES DIRECTOS",
                            "value": "N",
                            "name": "N",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "situations_to_be_reported",
                    "label": "<strong>LISTADO DE PRESUNTOS CONFLICTOS DE INTERÉS EN EL RUBRO DEL NEGOCIO</strong><br><br><div class='text-justify'><b>Situaciones que deben declararse:</b><br><br>1. Tengo algún familiar directo, novio/a o roommate que labora en Interplay/ Doradobet<br>2. Soy (o algún familiar directo es) ludópata<br>3. Soy (o algún familiar directo es) deportista profesional, árbitro, juez deportivo, entrenador profesional, dirigente deportivo o alguna ocupación afín<br><br>",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "SÍ TENGO ALGO QUE DECLARAR",
                            "value": "S",
                            "name": "S",
                            "type": "radio"
                        },
                        {
                            "title": "NO TENGO NADA QUE DECLARAR",
                            "value": "N",
                            "name": "N",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "situations_to_be_reported_detail",
                    "label": "En caso de SI, detallar las situaciones:",
                    "placeholder": "Situaciones",
                    "type": "textarea",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "when",
                            "params": ["situations_to_be_reported",(field, schema) => { return field == 'S' ? schema.required("Campo requerido") : schema}]
                        }
                    ]
                },
                {
                    "name": "terms_and_conditions",
                    "label": "<div class='text-justify'>Declaro bajo juramento que la información suministrada es completamente veraz, correcta y actual, Además, pongo a su disposición toda la información general pertinente que sea relevante para el objetivo de este formulario.</div>",
                    "type": "checkbox",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "workWithUs": {
        "styleVersion": 1,
        "recaptcha": {
            "show": true
        },
        "form": {
            "pe": [
                {
                    "name": "first_name",
                    "label": "Nombre:",
                    "placeholder": "Nombre:",
                    "type": "text",
                    "widthFull": false,
                    "icon": "fa-solid fa-user",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "last_name",
                    "label": "Apellido:",
                    "placeholder": "Apellido:",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "country",
                    "label": "País de Residencia:",
                    "placeholder": "Seleccione país",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "countryList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "País de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "department",
                    "label": "Provincia de Residencia:",
                    "placeholder": "Provincia de Residencia...",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "departmentList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Departamento de residencia es requerido."
                            ]
                        }
                    ]
                },
                {
                    "name": "phone",
                    "label": "Teléfono Celular:",
                    "placeholder": "Teléfono Celular",
                    "type": "number",
                    "icon": "fa-solid fa-mobile",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Número de celular es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                7,
                                "La longitud del número de celular debe ser mayor o igual a 7 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                20,
                                "La longitud del número de celular debe ser inferior o igual a 20 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "address",
                    "label": "Dirección del domicilio:",
                    "placeholder": "Dirección del domicilio",
                    "type": "text",
                    "validationType": "string",
                    "disabled": false,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Direcciόn es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud de la direcciόn debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                150,
                                "La longitud de la direcciόn debe ser inferior o igual a 150 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "email",
                    "label": "Correo electrónico:",
                    "placeholder": "Correo electrónico:",
                    "type": "text",
                    "icon": "fa-solid fa-envelope",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Correo electrónico es requerido."
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                5,
                                "La longitud de la direcciόn debe ser mayor o igual a 5 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la direcciόn debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "email",
                            "params": [
                                "Por favor, introduce una dirección de correo electrónico válida."
                            ]
                        }
                    ]
                },
                {
                    "name": "company",
                    "label": "Empresa:",
                    "placeholder": "Empresa:",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "skype",
                    "label": "Skype:",
                    "placeholder": "Skype:",
                    "type": "text",
                    "icon": "fa-brands fa-skype",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "observation",
                    "label": "Observación:",
                    "placeholder": "Observación:",
                    "type": "textarea",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "reclamaciones": {
        "styleVersion": 1,
        "recaptcha": {
            "show": false
        },
        "form": {
            "pe": [
                {
                    "name": "establecimiento",
                    "label": "Establecimiento comercial o canal donde se genera la Queja o Reclamo:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "widthFull": true,
                    "validationType": "string",
                    "optionsKey": "establecimientoList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "nombre",
                    "label": "<strong>1.   Datos del consumidor </strong><br><br>Nombres:",
                    "placeholder": "Nombres",
                    "type": "text",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "apellido1",
                    "label": "Apellido Paterno:",
                    "placeholder": "Apellido Paterno",
                    "type": "text",
                    "widthFull": false,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "apellido2",
                    "label": "Apellido Materno:",
                    "placeholder": "Apellido Materno",
                    "type": "text",
                    "widthFull": false,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "tipo_doc",
                    "label": " Tipo de Documento de identificación:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "name": "DNI",
                            "value": "C"
                        },
                        {
                            "name": "Carnet de Extranjería",
                            "value": "E"
                        },
                        {
                            "name": "Pasaporte",
                            "value": "P"
                        },
                        {
                            "name": "Otros",
                            "value": "O"
                        }
                    ]
                },
                {
                    "name": "cedula",
                    "label": "Numero de Identificación:",
                    "placeholder": "Numero de Identificación",
                    "type": "text",
                    "icon": "fa-solid fa-id-card",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                1,
                                "La longitud del número de documento debe ser mayor o igual a 1 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                15,
                                "La longitud del número de documento debe ser inferior o igual a 15 caracteres."
                            ]
                        }
                    ]
                },
                {
                    "name": "pais_residencia",
                    "label": "País de Residencia:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "countryList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "depto_id",
                    "label": "Departamento:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "departmentList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "ciudad_id",
                    "label": "Provincia de Residencia:",
                    "placeholder": "Seleccionar",
                    "type": "select",
                    "validationType": "string",
                    "optionsKey": "cityList",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "distrito",
                    "label": "Distrito:",
                    "placeholder": "Distrito",
                    "type": "text",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "direccion",
                    "label": "Dirección del Domicilio:",
                    "placeholder": "Dirección del Domicilio",
                    "type": "text",
                    "icon": "fa-solid fa-location-dot",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "telefono",
                    "label": "Teléfono Fijo:",
                    "placeholder": "Teléfono Fijo",
                    "type": "number",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "celular",
                    "label": "Teléfono Celular:",
                    "placeholder": "Teléfono Celular",
                    "type": "number",
                    "icon": "fa-solid fa-mobile",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "email",
                    "label": "Correo electrónico:",
                    "placeholder": "Correo electrónico:",
                    "type": "text",
                    "icon": "fa-solid fa-envelope",
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        },
                        {
                            "type": "min",
                            "params": [
                                5,
                                "La longitud de la direcciόn debe ser mayor o igual a 5 caracteres."
                            ]
                        },
                        {
                            "type": "max",
                            "params": [
                                50,
                                "La longitud de la direcciόn debe ser inferior o igual a 30 caracteres."
                            ]
                        },
                        {
                            "type": "email",
                            "params": [
                                "Por favor, introduce una dirección de correo electrónico válida."
                            ]
                        }
                    ]
                },
                {
                    "name": "notificado",
                    "label": "A fin de recibir una respuesta sobre mi queja o reclamo, requiero que el mismo sea notificado por la siguiente vía:",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "Domicilio",
                            "value": "domicilio",
                            "name": "domicilio",
                            "type": "radio"
                        },
                        {
                            "title": "Correo electrónico",
                            "value": "email",
                            "name": "email",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "tipo_contratado",
                    "label": "<strong>2.   Identificación del producto o servicio contratado </strong>",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "Producto",
                            "value": "producto",
                            "name": "producto",
                            "type": "radio"
                        },
                        {
                            "title": "Servicio",
                            "value": "servicio",
                            "name": "servicio",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "detalle",
                    "label": "Detalle:",
                    "placeholder": "Detalle",
                    "type": "textarea",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "monto",
                    "label": "Monto del producto o servicio objeto de reclamo:",
                    "placeholder": "Monto",
                    "type": "number",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "tipo_reclamacion",
                    "label": "<strong>3.   Detalles de la reclamación </strong><br><br>Tipo:",
                    "type": "radio",
                    "validationType": "string",
                    "widthFull": true,
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ],
                    "options": [
                        {
                            "title": "<strong>Reclamo</strong><br>Disconformidad relacionada a los productos o servicios.",
                            "value": "reclamo",
                            "name": "reclamo",
                            "type": "radio"
                        },
                        {
                            "title": "<strong>Queja</strong><br>Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.",
                            "value": "queja",
                            "name": "queja",
                            "type": "radio"
                        }
                    ]
                },
                {
                    "name": "detalle2",
                    "label": "Detalles del reclamo o queja:",
                    "placeholder": "Detalle",
                    "type": "textarea",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "pedido",
                    "label": "Pedido:",
                    "placeholder": "Pedido",
                    "type": "textarea",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                },
                {
                    "name": "acepta_terminos",
                    "label": "Soy mayor de 18 años y he leído y aceptado los Términos y condiciones generales, la Política de privacidad y la Política de juego responsable de Doradobet",
                    "type": "checkbox",
                    "widthFull": true,
                    "validationType": "string",
                    "validations": [
                        {
                            "type": "required",
                            "params": [
                                "Campo requerido"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "termsandcondition": {
        "pe": {
            "es": [
                {
                    "order": "Tutoriales",
                    "title": "1. Tutoriales",
                    "parent": [
                        {
                            "order": "",
                            "title": "¡Aprende a Registrarse!",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/xsnltqs5WmU\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/xsnltqs5WmU\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo Depositar?",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/IO1_tt8AGkY\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/IO1_tt8AGkY\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¡Aprende a apostar!",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/Uno4r_LOMl0\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/Uno4r_LOMl0\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo Retirar?",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/PDpe3CBm_Bs\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/PDpe3CBm_Bs\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo anular notas de retiro?",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/ixt2rDuil1g\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/ixt2rDuil1g\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¡Apuesta en Virtuales!",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/Z660zF9yeOI\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/Z660zF9yeOI\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¡Aprende a jugar en los Torneos de DoradoBet",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/ZkBfONvI6GM\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/ZkBfONvI6GM\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¡Aprende a recuperar la contrasena en DoradoBet!",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/jLj4WaBQU6c\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/jLj4WaBQU6c\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Ya conoces el Blog de Doradobet?",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/embed/Q2WzoP9C4y8\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/Q2WzoP9C4y8\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Guía completa del bono de bienvenida ",
                            "content": "<figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/watch?v=1s2pDHfMCNM&amp;t=28s\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/1s2pDHfMCNM\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        }
                    ],
                    "show": true
                },
                {
                    "order": "promociones-bonos",
                    "title": "2. Promociones y Bonos",
                    "parent": [
                        {
                            "order": "promociones-bonos",
                            "title": "Bono 100% Primer Depósito Perú, hasta S/. 500. A partir del 15 febrero del 2021",
                            "content": "<p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.<br><br>- La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere DoradoBet.com. El monto máximo de bonificación a recibir es: Perú de S/.500 (PEN) en total.<br><br>- Si el usuario deposita por primera vez un monto mayor a: Perú S/.500 se le podrá acreditar como máximo S/. 500. Por ejemplo, si deposita S/. 1.000, se le activará máximo S/. 500 de bono.<br><br>- Para acceder al bono, el primer depósito deberá ser como mínimo de: Perú S/. 30.<br><br>- La oferta es válida sólo para rollover (número de veces) en la Categoría de Apuestas Deportivas de futbol. Para los siguientes mercados: - Ganador del partido - Resultado exacto<br><br>- Para poder liberar el dinero del bono, se deberá cumplir con el rollover (número de veces) x7. Es decir, deberá jugarse el valor total del bono siete veces con cuotas mayores a 1.70 en cada selección, EL BONO SE BASARA EN LAS APUESTAS REALIZADAS CON DINERO REAL, el saldo del bono no es apostable.</p><p> </p><p><strong>-IMPORTANTE:</strong> Solo se tendrán en cuenta las apuestas realizadas por un valor igual o menor al valor del bono, las apuestas que se realicen por un valor mayor únicamente sumarán el valor correspondiente al bono.</p><p>El máximo a contar por cada apuesta es el valor del bono que posee el usuario.<br><br>Ejemplo: Si el usuario tiene un bono de S/100, con un rollover de S/700, y realiza dos apuestas de S/200 cada una, solo se le sumará S/200 al rollover.<br><br>- El saldo del bono luego de ser liberado será cargado en saldo créditos (recargas).<br><br>- El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.<br><br>- Las apuestas que fueron marcadas con cash out (opción Reintegro) no se contabilizan para el rollover.</p><p><br>- Las apuestas deben de estar determinadas para que sumen al rollover.</p><p><br>- DoradoBet.com se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.<br><br>- DoradoBet.com considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.).<br><br>- DoradoBet.com se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.<br><br>- Una vez activado BONO 100% PRIMER DEPOSITO HASTA: Perú S/. 500. el usuario dispondrá de 1 mes (30 días) para poder cumplir con las condiciones indicadas en la promoción</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Yapa Doradobet",
                            "content": "<p>Realiza una apuesta combinada Pre-match de 5 o m&aacute;s eventos y te aumentamos un % de m&aacute;s en las ganancias.</p>\n\n<p>Para participar en la promoci&oacute;n debe hacer una apuesta de m&iacute;nimo 5 lineas con una cuota m&iacute;nima de 1.5 por selecci&oacute;n</p>\n\n<p>Rango de lineas y %</p>\n\n<p>De 5 a 10 lineas recibes el 3% en tus ganancias</p>\n\n<p>De 11 a 13 lineas recibes el 13% en tus ganancias</p>\n\n<p>De 14 a 15 lineas recibes el 15% en tus ganancias</p>\n\n<p> </p>\n\n<p>T&eacute;rminos &amp; Condiciones:</p>\n\n<p>1. Si cualquier selecci&oacute;n se pospone o cancela la &ldquo;Yapa Doradobet&rdquo; a&uacute;n se mantiene, pero el porcentaje agregado reflejar&aacute; el n&uacute;mero actual de selecciones ganadoras. Por ejemplo, una combinada de 6 selecciones, con 5 eventos ganadores y 1 evento pospuesto, recibir&aacute; un 3% de &ldquo;Yapa Doradobet&rdquo; a sus ganancias.</p>\n\n<p>2. La Yapa Doradobet ser&aacute; agregada autom&aacute;ticamente a tu cuenta, en saldo premios luego de ser ganada.</p>\n\n<p>3. No aplicar&aacute;n a recibir la &ldquo;Yapa Doradobet&rdquo;, las apuestas combinadas que realizaron Cashout.</p>\n\n<p>4. Doradobet se reserva el derecho de negar la &ldquo;Yapa Doradobet&rdquo; a cualquier usuario sin explicaci&oacute;n alguna. Doradobet tambi&eacute;n se reserva el derecho de restar la Yapa Doradobet en cualquier momento. Doradobet se reserva el derecho de cancelar las ganancias hechas a partir del dinero recibido por la Yapa Doradobet.</p>\n\n<p>5. Los t&eacute;rminos y condiciones de la &ldquo;Yapa Doradobet&rdquo; est&aacute;n en total acuerdo con los T&eacute;rminos y Condiciones generales de Doradobet.com</p>\n\n<p>6. Doradobet se reserva el derecho de editar y/o retirar esta promoci&oacute;n en cualquier momento y sin previo aviso.  Se les aconseja a los usuarios revisar regularmente los t&eacute;rminos y condiciones aqu&iacute; descritos para estar al d&iacute;a con cualquier cambio que pueda ocurrir.</p>\n\n<p>7. Doradobet se reserva el derecho de cancelar cualquier &ldquo;Yapa Doradobet&rdquo; y/o ganancias obtenidas a partir de comportamiento fraudulento (ya sea de un jugador o de un grupo de jugadores), incluyendo el derecho de reducir la &ldquo;Yapa Doradobet&rdquo; de la cuenta y tomar las acciones necesarias para recuperar el monto perdido a causa de un intento de fraude.</p>\n\n<p>8. Aplica para cualquier deporte que est&eacute; activo.</p>\n",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Drops & Wins Slots",
                            "content": "<p>“Drops &amp; Wins – Torneos Semanales &amp; Premios Diarios - ¡Premios en efectivo en cualquier giro!” se ejecutará en los juegos participantes, del 04 de mayo de 2022 al 08 de febrero de 2023 semanalmente (el “<strong>Período de la Promoción</strong>”). Al participar en la Promoción (como se define a continuación), usted por la presente acepta cumplir estos términos y condiciones.</p><p><br><strong>Términos y condiciones generales – Torneos Semanales y Premios Diarios (Semanas Regulares):</strong></p><p>• La promoción de Pragmatic Play “Drops &amp; Wins – Torneos Semanales &amp; Premios Diarios - ¡Premios en efectivo en cualquier giro!” (la “<strong>Promoción</strong>”) incluye cincuenta y dos (52) torneos, siendo siete (7) días de torneos (cada uno un “<strong>Torneo Semanal</strong>”) que se ejecutarán semanalmente durante el Período de la Promoción, y un total de trescientos sesenta y cuatro (364) Premios Diarios (cada uno es un “<strong>Premio Diario</strong>”), y se ejecutará diariamente durante el Período de la Promoción.</p><p>• Para participar en cualquier Torneo Semanal o Premios Diarios de la Promoción, el jugador debe abrir cualquiera de los juegos participantes y unirse a ellos.</p><p>• Para participar en la Promoción, el jugador debe realizar un giro con dinero real, que cumpla con las siguientes condiciones:</p><p>• Todos los giros con una apuesta mínima de €0,50 (o su equivalente en las monedas disponibles*) en los juegos participantes formarán parte del Torneo Semanal y de los Premios Diarios (en adelante un “<strong>Giro Cualificado</strong>”).</p><p>• Si el importe de apuesta mínima no está disponible, la apuesta mínima se redondeará hacia arriba al siguiente nivel de apuesta disponible en el juego.</p><p>• Un Giro Cualificado hará que el jugador sea elegible simultáneamente para toda la promoción “Drops &amp; Wins – Torneos Semanales &amp; Premios Diarios - ¡Premios en efectivo en cualquier giro!”.</p><p>• Para evitar dudas, cualquier porción del premio no distribuida al final de cualquier Torneo Semanal o Premios Diarios se agregará en los siguientes Torneos Semanales y/o Premios Diarios o a la siguiente Promoción de la Red.</p><p>• Los premios se pagarán teniendo en cuenta la tabla de “Premios” dentro de los juegos participantes.</p><p>• Todos los importes se muestran en el juego en la Moneda del Jugador (donde \"<strong>Moneda del Jugador</strong>\" significa la moneda del territorio en el que se encuentre).</p><p>• Los jugadores pueden ganar premios en el Torneo Semanal (Semanas Regulares) y en los Premios Diarios (Semanas Regulares) en forma de un importe fijo en efectivo, como se establece en la Tabla de Premios del Torneo Semanal (Semanas Regulares) y en la Tabla de los Premios Diarios (Semanas Regulares) (en adelante “<strong>Semanas Regulares</strong>”).</p><p>• Los jugadores pueden ganar premios en los Torneos Semanales (Semanas Multiplicadoras de Premios) y en los Premios Diarios (Semanas Multiplicadoras) en forma de multiplicador del importe de la apuesta ganadora del jugador y/o Bono de Giros Gratis como se establece en la Tabla de Premios del Torneo Semanal (Semanas Multiplicadoras de Premios) y las Tabla de Premios Diarios (Semanas Multiplicadoras de Premios) (en adelante “<strong>Semanas Multiplicadoras</strong>”).</p><p>• Las reglas de los Premios Diarios y de los Torneos Semanales se encuentran dentro de los juegos participantes.</p><p>• La tabla de los Premios Diarios se actualiza en tiempo real mostrando las posiciones actuales, así como la cantidad de premios restantes.</p><p>• Los Premios Diarios terminan diariamente cuando se dé algo de lo siguiente: (I) 18:59 CET/CEST; o (ii) cuando no queden más premios.</p><p>• Se aplican los Términos y Condiciones generales. Pragmatic Play se reserva el derecho a (i) modificar las reglas de “Drops &amp; Wins – Torneos Semanales y Premios Diarios – ¡Premios en efectivo en cualquier giro!” en cualquier momento sin previo aviso; (ii) suspender o cancelar cualquier Torneo Semanal o Premios Diarios en cualquier momento notificando dicha suspensión o cancelación lo antes posible; y/o (iii) retener los premios a su razonable discreción cuando tenga razones para creer que otorgar el premio podría violar estos términos y condiciones o la ley aplicable.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Drops & Wins CASINO EN VIVO",
                            "content": "<p><strong>CASINO EN VIVO</strong></p><p>Participa en “Drops &amp; Wins – Premios Diarios y Torneos Semanales – Ruleta, Blackjack, Mega Wheel, Baccarat y más” y gana uno de los premios en efectivo de los €500.000 premiados por mes, en nuestros Torneos Semanales y en los Premios Diarios. La promoción Drops &amp; Wins de Casino en vivo estará vigente en los juegos seleccionados, del 04 de mayo del 2022 al 08 de febrero del 2023.</p><p><strong>COMO PARTICIPAR EN LOS TORNEOS SEMANALES</strong></p><ol><li>El jugador debe inscribirse o entrar en alguno de los juegos participantes, en cada Torneo Semanal individualmente.</li><li>El jugador debe realizar una Apuesta Cualificada (como se define más adelante) en alguna mesa o juego participante en los Torneos Semanales.</li><li>Los jugadores necesitan un mínimo de dos (2) Victorias Cualificadas Consecutivas (según se definen más adelante). Cada Victoria Cualificada Consecutiva debe superior a dos veces (2x) el valor del Torneo Semanal de Ruleta y una vez (1x) el Torneo Semanal de Blackjack y el Torneo Semanal de Baccarat de la Apuesta Cualificada total para clasificar a cada Torneo Semanal por separado.</li><li>El puntaje del jugador puede aumentar con cada Victoria Cualificada Consecutiva por Torneo Semanal por separado.</li><li>Aplican los tipos y restricciones de apuesta (tal como se definen más adelante).</li><li>Cuanto mayor sea el valor total de los puntos que reciba un jugador por Victorias Cualificadas Consecutivas, mayor será su puntaje.</li><li>Los premios serán atribuidos a los jugadores en base al puntaje final indicado en la tabla de posiciones, en el respectivo juego, al final de cada Torneo Semanal por separado.</li></ol><p><strong>COMO PARTICIPAR EN LOS PREMIOS DIARIOS</strong></p><ol><li>El jugador debe ingresar en cualquiera de los juegos/mesas participantes.</li><li>El jugador debe realizar una apuesta con dinero real con un importe mínimo de €1 en cualquiera de las mesas/juegos participantes en Premios Diarios.</li><li>Cualquier Apuesta Cualificada (como se define a continuación) realizada en cualquiera de los juegos participantes puede originar un (1) premio aleatorio durante el período de la promoción.</li></ol><p><strong>TERMINOS Y CONDICIONES GENERALES</strong></p><p>• “Drops &amp; Wins – Premios Diarios &amp; Torneos Semanales – Ruleta, Blackjack, Mega Wheel, Baccarat y</p><p>más” de Pragmatic Play se ejecutará en los juegos participantes del 04 de febrero de 2022 al 08 de febrero de 2023 (“<strong>Período de la promoción</strong>”, en el que cada torneo semanal se denominará “<strong>Torneo Semanal</strong>” y cada entrega de premios diarios se denominará “<strong>Premios Diarios</strong>” y cada semana dentro del período de la promoción se denominará “<strong>Semana clasificatoria</strong>”).</p><p>• Cada Semana Cualificada dentro del Término de la Promoción incluye tres (3) Torneos Semanales independientes y siete (7) Premios Diarios independientes, en los que:</p><p>• Cada Torneo Semanal independiente está dedicado a una categoría especial de Ruleta, Blackjack y Baccarat (“<strong>Juegos de Casino en Vivo</strong>”): (i) Torneo Semanal de Ruleta; (ii) Torneo Semanal de Blackjack; y (iii) Torneo Semanal de Baccarat.</p><p><strong>•</strong> Los Premios Diarios están disponibles para todos los Juegos de Casino en Vivo. Pueden aplicarse exclusiones.</p><p>• Para participar en cualquiera de los tres (3) Torneos Semanales y/o Premios Diarios de esta Promoción, el jugador debe abrir cualquiera de las mesas/juegos participantes y aceptar participar en cada Torneo Semanal y/o Premios Diarios por separado.</p><p>• Solo se tendrán en cuenta apuestas con dinero real que cumplan con el requisito de apuesta mínima (o su equivalente en las monedas disponibles) en las mesas/juegos participantes como apuesta cualificada en los Premios Diarios (“<strong>Apuestas Cualificadas</strong>”).</p><p>• Si el importe mínimo de apuesta requerido no está disponible, el siguiente nivel de apuesta superior disponible en la mesa/juego participante se considerará como la apuesta Cualificada.</p><p>• Una (1) Apuesta Cualificada puede originar un (1) premio durante los Premios Diarios.</p><p>• Solo las primeras mil doscientas (1200) Apuestas Cualificadas por día dentro de los Premios Diarios (“Límite de Apuestas Cualificadas”) serán elegibles para cada entrega de Premios Diarios. Todas las Apuestas Cualificadas que se realicen después de alcanzar el Límite de Apuestas Cualificadas no serán consideradas para cada entrega de Premios Diarios.</p><p>• Las reglas de los Premios Diarios aleatorios y las tablas de premios están dentro de los juegos/mesas participantes. La tabla de premios se actualiza en tiempo real mostrando las posiciones actuales, así como el número de premios restantes.</p><p>• Los premios se pagarán según la tabla de “Premios” en los juegos/mesas participantes.</p><p>• Los premios se pagan a los jugadores como un importe fijo.</p><p>• El jugador puede ganar múltiples Premios Diarios.</p><p>• Los Premios Diarios terminarán diariamente cuando se dé algo de lo siguiente: (i) 18:59 CEST/CET; o (ii) cuando no queden más premios.</p><p>• No hay costo adicional para participar en la Promoción.</p><p>• El premio total mensual para todos los Torneos Semanales y Premios Diarios de la Promoción es de €500.000 en efectivo.</p><p>• El premio total para todo el Período de la Promoción es de €6.000.000 en efectivo.</p><p>• Para evitar dudas, cualquier porción de premio no distribuida al final de cualquier Torneo Semanal y/o Premios Diarios se agregará en los siguientes Torneos Semanales y/o Premios Diarios o a la siguiente Promoción de la Red.</p><p>• Todos los importes se muestran en el juego en la moneda del Jugador (la \"<strong>Moneda del Jugador</strong>\" es la moneda del territorio en el que se encuentre).</p><p>• Cualquier término en mayúscula no definido aquí tendrán el mismo significado que los términos generalmente usados en la industria del juego y las apuestas.</p><p>• Se aplican los Términos y Condiciones Generales. Pragmatic Play se reserva el derecho a (i) actualizar las reglas de la promoción “Drops &amp; Wins – Torneos Semanales y Premios Diarios – ¡Ruleta, Blackjack, Mega Wheel, Baccarat y más!” en cualquier punto sin previo aviso; (ii) suspender o cancelar cualquier Torneo Semanal o Premio Diario en cualquier momento notificando dicha suspensión o cancelación lo antes posible; (iii) retener los premios a su razonable discreción cuando tenga razones para creer que otorgar el premio podría violar estos términos y condiciones o la ley aplicable; y/o (iv) cambiar o restringir el acceso del jugador si es requerido por motivos legales, regulatorios y/o fraudulentos o similares.</p><p>• Lo anterior debe leerse en conjunto con los términos y condiciones de los juegos.</p><p><strong>TERMINOS Y CONDICIONES DE LOS TORNEOS SEMANALES</strong></p><p>• Solo se tendrán en cuenta apuestas con dinero real que cumplan con el requisito de apuesta mínima (en las monedas disponibles) en los juegos/ mesas participantes como apuesta cualificada en el Torneo Semanal de Ruleta (“<strong>Apuestas Cualificadas</strong>”).</p><p>• Si el importe de apuesta mínima no está disponible, la siguiente apuesta superior disponible en el juego/ mesa participante será considerada como la apuesta Cualificada.</p><p>• Una (1) Apuesta Cualificada debería convertir al jugador en elegible para un (1) solo Torneo Semanal a la vez.</p><p>• Una Victoria cualificada es una victoria dentro del juego por el que al jugador se le otorga el premio y el importe de la apuesta ganadora, que es mayor que dos veces (2x) la Apuesta Cualificada total realizada en cualquiera de los juegos/ mesas participantes para el respectivo Torneo Semanal de Ruleta (“<strong>Victoria Cualificada</strong>”).</p><p>• Una Victoria Cualificada es un Victoria dentro del juego por el que al jugador se le otorga el premio y el importe de la apuesta ganadora, que es mayor que una vez (1x) la Apuesta Cualificada total realizada en cualquiera de los juegos/ mesas participantes para el respectivo Torneo Semanal de Blackjack y Torneo Semanal de Baccarat (“<strong>Victoria Cualificada</strong>”).</p><p>• Una (1) Victoria Cualificada a la que le sigue a otra Victoria Cualificada en juegos consecutivos en la misma mesa o cualquier otra mesa de los juegos participantes, en el mismo Torneo Semanal, resultará en dos (2) Victorias Cualificadas Consecutivas (cada una es una “Victoria Cualificada Consecutiva”).</p><p>• El tiempo máximo entre la primera Victoria Cualificada Consecutiva y la segunda Victoria Cualificada Consecutiva está limitado por el horario del Torneo Semanal.</p><p>• La última Victoria Cualificada Consecutiva que se contará en un Torneo Semanal en curso es la Victoria Cualificada Consecutiva que el jugador haya recibido al final del Torneo Semanal. ​</p><p>• Cuando termina un Torneo Semanal, el recuento de Victorias Cualificadas Consecutivas volverá a cero y comenzará a contar desde el principio en el próximo Torneo Semanal.</p><p>• La serie de Victorias Cualificadas Consecutivas de un jugador se verá interrumpida si el jugador pierde una Apuesta Cualificada o si el premio del jugador es inferior a dos veces (2x) el total de la Apuesta Cualificada, en cuyos casos, dicha serie volverá a cero (0).</p><p>• Un mínimo de dos (2) Victorias Cualificadas Consecutivas tras realizar dos (2) Apuestas Cualificadas durante un Torneo Semanal permitirán que el jugador se ubique en la tabla de posiciones del respectivo Torneo Semanal.</p><p>• El resultado de la tabla de posiciones para cada Torneo Semanal por separado se basa en el total de puntos que se le otorguen al usuario por cada Victoria Cualificada Consecutiva en los juegos/ mesas participantes.</p><p>• El sistema de puntos del torneo se basa en Victorias Cualificadas Consecutivas con diferente distribución de puntos por cada nueva Victoria Cualificada Consecutiva.</p><p>Victorias Consecutivas Puntos</p><p>2 1</p><p>3 2</p><p>4 5</p><p>5 15</p><p>6 50</p><p>7 200</p><p>8 750</p><p>9 2.500</p><p>10 8.000</p><p>11 25.000</p><p>12 50.000</p><p>13 100.000</p><p>14 200.000</p><p>15+ 500.000</p><p>• Ejemplo de cálculo de puntaje: <i>si un jugador recibe dos (2) Victorias Cualificadas Consecutivas, se otorga al jugador un (1) punto. Si el jugador recibe otra Victoria Cualificada Consecutiva, directamente después de la Victoria Cualificada Consecutiva, se le otorgan al jugador otros dos (2) puntos. Por tanto, el jugador recibirá un total de tres (3) puntos.</i></p><p><strong>TERMINOS Y CONDICIONES DE LOS PREMIOS DIARIOS</strong></p><p>• Solo se tendrán en cuenta apuestas con dinero real con un importe mínimo de €1 (o su equivalente en las monedas disponibles) en las mesas/juegos participantes como apuesta cualificada en los Premios Diarios (“<strong>Apuestas Cualificadas</strong>”).</p><p>• Si el importe mínimo de apuesta requerido no está disponible, el siguiente nivel de apuesta superior disponible en la mesa/juego participante se considerará como la apuesta Cualificada.</p><p>• Una (1) Apuesta Cualificada puede originar un (1) premio durante los Premios Diarios.</p><p>• Las reglas de los Premios Diarios aleatorios y las tablas de premios están dentro de los juegos/mesas participantes. La tabla de premios se actualiza en tiempo real mostrando las posiciones actuales, así como el número de premios restantes.</p><p>• Los premios se pagarán según la pestana “Premios” en los juegos/mesas participantes.</p><p>• Los premios se pagan a los jugadores como un importe fijo.</p><p>• El jugador puede ganar múltiples Premios Diarios.</p><p>• Los Premios Diarios terminarán diariamente cuando se dé algo de lo siguiente: (i) 18:59 CEST/CET; o (ii) cuando no queden más premios.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Mi Marcador Doradobet",
                            "content": "<ul><li>Válido para Perú.</li><li>La oferta solo aplica una vez por usuario, persona, correo electrónico, o criterio que considere DoradoBet.com.</li><li>Inicia desde la fecha de publicación del sorteo en redes sociales y finaliza con el inicio del partido seleccionado.</li><li>Para participar en el sorteo de Instagram, <strong>debes</strong>: </li></ul><ol><li>Seguir a DoradoBet </li><li>Darle \"Me Gusta\" a la publicación de la promoción.</li><li>Comenta tu resultado con el hashtag #MiMarcadorDoradoBet y etiqueta a 3 amigos</li></ol><ul><li>Para participar en el sorteo de Instagram, <strong>debes</strong>: </li></ul><ol><li>Seguir a DoradoBet </li><li>Haz RT</li><li>Comenta tu resultado con el hashtag #MiMarcadorDoradoBet </li></ol><ul><li>En el sorteo se entregarán 3 FREEBETS DE S/30.</li><li>Se entregará un (1) premio por cliente en cada sorteo. </li><li>El cliente tiene siete (7) días para jugar el Freebet una vez sea cargado en la cuenta del usuario</li><li>El Freebet es válido para apostar en la categoría “APUESTAS DEPORTIVAS” de cualquier deporte con cuotas mayores a 1.70.</li><li>No es válido para partidos en vivo</li><li>No aplica el Cash Out</li><li>El cliente solo puede retirar las ganancias</li><li>El bono podrá ser visualizado como “Freebet” en la opción de “Saldo” o en la sección “Mis Bonos”.</li><li>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</li><li>DoradoBet.com se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</li><li>DoradoBet.com considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.).</li><li>DoradoBet.com se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</li><li>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</li></ul>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Bingo Doradobet",
                            "content": "<p>Juega al Bingo Doradobet todos los días de enero y podrás ganar Hasta S/.600 . Participa en todos los sorteos de bingo diarios a las 7:00 PM por alguno de los premios.</p><p><strong>DINAMICA</strong></p><p>Para participar en el Bingo Doradobet, el usuario deberá estar registrado en la plataforma <a href=\"http://doradobet.com/\">Apuestas Deportivas | Apuestas Online | Casino en Línea</a> .</p><p>Ingresa a la Sala Dorada</p><p>Compra los cartones que tienen un valor de S/.1</p><p>El usuario debe comprar los cartones antes del cierre de venta de dicho sorteo.</p><p>Minimo de cartones a comprar por usuario 2</p><p>Maximo de cartones a comprar por usuario 200</p><p>El sorteo dará inicio luego del cierre de venta</p><p> </p><p><strong>REGLAS DE JUEGO</strong>.</p><p>El cartón del Bingo Doradobet dispone de 25 casillas dispuestas en cinco filas horizontales y cinco verticales. Cada una de ellas va marcada con un número excepto la casilla central.</p><p>La distribución de los números en el cartón es aleatoria.</p><p>El sistema marcará los números automáticamente en cada cartón.</p><p>Nuestro bingo también tiene un indicador (tablero) para mostrar los números que ya han salido y los que aún no.</p><p>En este juego hay varias formas de ganar:</p><p>Rellenando todo el cartón (también llamado “Pleno”)</p><p>Consiguiendo una determinada figura en el cartón definida anteriormente antes de comenzar el juego (algunas de las más populares son la pirámide, cuadrado, alguna letra o número).</p><p>Se declara ganador el jugador que tenga los números correctos en el cartón.</p><p>No se declara ganador si el jugador no cumple con el reglamento del sorteo o no cumple con los números asignados.</p><p>Si varias personas cantan Bingo al mismo tiempo, el sistema procederá a un desempate y repartirá la premiación entre los ganadores.</p><p>El premio se entregará al titular del cartón, no se entregará a segundos beneficiarios o jugadores.</p><p>El cartón suministrado es válido solo para el sorteo asignado.</p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> no se hace responsable de la calidad de conexión de internet del usuario.</p><p>Si el sorteo no llega al recaudo mínimo impuesto por <a href=\"http://doradobet.com/\">Apuestas Deportivas | Apuestas Online | Casino en Línea</a> se cancelará y se hará la respectiva devolución del valor del cartón al usuario.</p><p><strong>Premios:</strong></p><p>Los premios serán repartidos de la siguiente manera:</p><p>Pleno (24 tachados): S/.300</p><p>Figura 1 (De 14 a 16 tachados): S/.180</p><p>Figura 2 (De 5 a 6 tachados): S/.120</p><p>Las figuras hacen referencias a las letras o “patrones” que se realiza con los cartones que estén disponibles.</p><p>Los premios serán cargados automáticamente en la cuenta del usuario.</p><p>Si el saldo no se carga automáticamente el premio será pagado luego de 72 horas hábiles.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Cash Back Life in Vegas ",
                            "content": "<p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>Oferta válida solo para Perú</p><p>Solo podrán participar mayores de 18 años</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doradobet.com/\">DoradoBet.com</a>.</p><p>La Promoción estará disponible de sabado a domingo por el mes de enero</p><p><strong>Fechas:</strong></p><p>7 al 8 de enero<br>14 al 15 de enero<br>21 al 22 de enero<br>28 al 29 de enero</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a cambiar las fechas de la Promoción en cualquier momento.</p><p>El bono es la devolución del 30% de las pérdidas de los usuarios en los proveedores: Ezugi- Evolution - Pragmatic Live hasta S/.800</p><p>El usuario debe apostar como mínimo un valor de S/50</p><p>El dinero reembolsado será cargado en saldo crédito (recargas) dentro de las 72 horas hábiles después de la promoción, el mínimo de reembolso es de S/. 50 por usuario</p><p>El monto máximo de bonificación a recibir es: Perú de S/. 800 (PEN) en total</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p>No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p>Los usuarios que participen en la promoción aceptan los términos y condiciones y reconocen que el incumplimiento de las mismas puede provocar su descalificación.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Bono Casino Dorado",
                            "content": "<p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">Doradobet.com</a></p><p>El bono estará disponible todos los fines de semana de enero.</p><p><strong>Fechas:</strong></p><p>07 al 08 de enero</p><p>14 al 15 de enero</p><p>21 al 22 de enero</p><p>28 al 29 de enero</p><p>Por su próximo deposito de S/.40 en adelante el usuario recibirá el 40% adicional hasta 150 soles.</p><p>El monto máximo de bonificación a recibir S/.150 en total.</p><p>Si el usuario deposita un valor mayor a S/.150 se le podrá acreditar como máximo S/.150. Por ejemplo, si deposita S/.1,000, se le activará máximo S/.150 de bono.</p><p>Para acceder al bono por deposito del casino dorado, el depósito deberá ser como mínimo de 40 soles, aplican todos los medios de pago, luego del depósito el bono será cargado a bonos por liberar.</p><p>Para poder liberar el dinero del bono, se deberá cumplir con el <strong>rollover</strong> (número de veces) <strong>x20</strong>, es decir, deberá jugarse el valor total del bono veinte veces en jugadas de casino slot en la categoría de juegos Populares.</p><p>El cliente contara con 5 días para cumplir el Rollover, este tiempo comenzara a contabilizarse a partir de activa la bonificación.</p><p>Las apuestas anuladas que fueron marcadas con rollback no se contabilizan para el rollover.</p><p>La liberación del bono SE BASARÁ EN LAS APUESTAS REALIZADAS CON DINERO REAL, el saldo del bono no es posible jugarlo hasta no cumplir las condiciones.</p><p>El saldo del bono luego de ser liberado será cargado en saldo créditos (recargas). <br>Las apuestas deben de estar determinadas para sumar al rollover.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar pronósticos o suspensión de las cuentas.</p><p><a href=\"http://doraodbet.com/\">Doradobet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> considerará la activación del bono de bienvenida para usuarios que no tienen bonos vigentes.</p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Freespins Back",
                            "content": "<p>Oferta válida solo para<strong> Perú</strong></p><p>Solo podrán participar mayores de 18 años.</p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">DoradoBet.com</a>.</p><p>La Promoción estará disponible de lunes a miércoles<strong> (todo el mes de enero)</strong><br><strong>Fechas:</strong><br>2 al 4 de enero<br>9 al 11 de enero<br>16 al 18 de enero<br>23 al 25 de enero<br>30 al 1 febrero</p><p>Para acceder a la promoción el usuario debe apostar como mínimo S/50 en todas las tragamonedas online, no aplica para el proveedor Pragmatic Slot</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a cambiar las fechas de la Promoción en cualquier momento.</p><p>El bono es la devolución del <strong>30%</strong> de las pérdidas de los usuarios en todas las tragamonedas de nuestro casino online, menos el proveedor de Pragmatic de slot, hasta <strong>S/. 600 en giros gratis.</strong></p><p>Las jugadas serán reembolsadas dentro de las 72 horas hábiles después de la promoción.</p><p>Lo mínimo a devolver son S/.10 en jugadas Gratis.</p><p>El monto máximo de bonificación a recibir es: Perú de S/. 600 (PEN) en jugadas gratis.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p>Los usuarios que participen en la promoción aceptan los términos y condiciones y reconocen que el incumplimiento de las mismas puede provocar su descalificación.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Premios Misteriosos Slot",
                            "content": "<p>¡Juega y gana en el Casino online de <a href=\"http://doradobet.com/\">DoradoBet.com</a>!</p><p>Participa por los premios misteriosos y gana maravillosos premios.</p><p>Estos premios sorpresa están acorde a los términos y condiciones generales de <a href=\"http://doradobet.com/\">DoradoBet.com</a></p><p>¡Que estas esperando para jugar y ser parte del premio misterioso!</p><p>Términos y Condiciones:</p><p>Aplica solo para Perú.</p><p>Válidos para mayores de 18 años</p><p>Los juegos que harán parte de la presente actividad promocional son los juegos:</p><ul><li><strong>Athena Ascending y Rise of Olympus 100 </strong></li></ul><p>Importante: Cada semana los juegos varían.</p><p>Para participar en los premios misteriosos, el usuario deberá tener saldo premios o créditos disponible en su cuenta de <a href=\"http://doradobet.com/\">DoradoBet.com</a>, o en su defecto recargar a través de los medios de pago establecidos.</p><p>La actividad promocional inicia todos los martes de cada semana y finaliza los días lunes. Los usuarios podrán participar durante este tiempo buscando ganar el premio misterioso.</p><p>Premio Platino: S/. 700 en jugadas Gratis en cada juego</p><p>Premio Oro: S/. 550 en jugadas Gratis en cada juego</p><p>Premio Plata: S/. 400 jugadas Gratis en cada juego</p><p>Premio Bronce: S/. 250 jugadas Gratis en cada juego</p><p>Para hacer efectivos los premios, el usuario deberá contactar nuestro servicio de chat online e informar que ha sido ganador de un premio misterioso.</p><p>El usuario consta de un tiempo estimado de 5 días a partir de ganar el premio misterioso para reclamarlo.</p><p>Para participar por el Premio Misterioso solo aplican las jugadas (Spins) realizadas en los juegos participantes en la actividad promocional.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Bono Pasión Futbolera",
                            "content": "<p>Válido para Perú.</p><p>·       La oferta solo aplica una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doradobet.com/\">DoradoBet.com</a>.</p><p>·       Usuarios online</p><p>·     <strong>  El bono estará vigente todos los lunes del mes de enero</strong></p><p><strong>Fechas</strong></p><p>02 de enero</p><p>09 de enero</p><p>16 de enero</p><p>23 de enero</p><p>30 de enero</p><p>·       El bono es del 60% de tu próximo depósito.</p><p>·       Aplica para todos los métodos de pago, <strong>menos pago efectivo.</strong></p><p>·       El monto máximo de bonificación a recibir es de <strong>S/.300</strong>. Si el usuario deposita un monto mayor a S/.300 se le acreditará como máximo S/.300. Por ejemplo, si deposita S/.1.000 se le activará S/.300 de bono.</p><p>·       Para acceder al bono, el próximo depósito deberá ser como mínimo de <strong>S/.30</strong></p><p>·       La oferta es válida sólo para la <strong>Apuestas Deportivas de Fútbol </strong>prematch y en vivo a los mercados 1x2 y Marcador Exacto, las apuestas deben contar con mínimo 3 selecciones (lineas) para la disminución del rollover.</p><p>·       Para poder liberar el dinero del bono, se deberá cumplir con el <strong>rollover X5</strong> (número de veces). Es decir, deberá jugarse el valor total del bono <strong>cinco veces</strong> con cuotas mayores a <strong>1.70</strong> en cada selección. EL BONO SE BASARÁ EN LAS APUESTAS REALIZADAS CON DINERO REAL, el saldo del bono no es apostable. Por ejemplo, si depositas S/.50, tienes que llegar a apostar S/.250 en mercados con una cuota mínima de 1.70</p><p>·       <strong>IMPORTANTE:</strong> Solo se tendrán en cuenta las apuestas realizadas por un valor igual o menor al valor del bono, las apuestas que se realicen por un valor mayor únicamente sumarán el valor correspondiente al bono.</p><p>El máximo a contar por cada apuesta es el valor del bono que posee el usuario.</p><p>Ejemplo: Si el usuario tiene un bono de S/.100, con un rollover de S/.500, y realiza dos apuestas de S/.200 cada una, solo se le sumará S/.200 al rollover.</p><p>·       Las apuestas deben de estar determinadas para sumar al rollover.</p><p>·       El saldo del bono luego de liberado será cargado en saldo créditos(recargas).</p><p>·       El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p>·       <a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>·       <a href=\"http://doradobet.com/\">DoradoBet.com</a> considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.).</p><p>·       <a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p>·       Una vez activado BONO DEL 60% EN TU PRÓXIMO DEPÓSITO HASTA S/.300. el usuario dispondrá de <strong>3 días</strong> para poder cumplir con las condiciones indicadas en la promoción</p><p>·       Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Freespinsback Pragmatic",
                            "content": "<p>Oferta válida solo para<strong> Perú</strong></p><p>Solo podrán participar mayores de 18 años.</p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">DoradoBet.com</a>.</p><p>La Promoción estará disponible los jueves y viernes<strong> (todo el mes de enero)</strong><br><strong>Fechas:</strong><br>5 al 6 de enero<br>12 al 13 de enero<br>19 al 20 de enero<br>26 al 27 de enero</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a cambiar las fechas de la Promoción en cualquier momento.</p><p>El bono es la devolución del <strong>30%</strong> de las pérdidas de los usuarios en las tragamonedas de nuestro proveedor PRAGMATIC de nuestro casino online, hasta <strong>S/. 600 en giros gratis.</strong></p><p>Las jugadas serán reembolsadas dentro de las 72 horas hábiles después de la promoción.</p><p>La apuesta minima deberá ser de S/. 30</p><p>Lo mínimo a devolver son S/. 30 en jugadas Gratis.</p><p>El monto máximo de bonificación a recibir es: Perú de S/. 600 (PEN) en jugadas gratis.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p>Los usuarios que participen en la promoción aceptan los términos y condiciones y reconocen que el incumplimiento de las mismas puede provocar su descalificación.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Torneo CASINO CLASSIC",
                            "content": "<p>¡Disfruta en nuestro Torneo CASINO CLASSIC y participa por S/.10.000 al toque! ¡Tenemos muchos premios más para ti!</p><p>Para participar en el torneo el usuario deberá registrarse en el torneo haciendo clic en el botón JUEGA YA tener saldo en su cuenta personal de <a href=\"http://doradobet.com/\">DoradoBet.com</a> o en su defecto recargar a través de los medios de pago establecidos.</p><p>El torneo inicia el día <strong>16 de diciembre de 2022 y finaliza el día 03 de enero de 2023</strong>, los usuarios podrán participar del torneo durante estos días compitiendo por el mayor número de puntos acumulad</p><p>Los proveedores que participarán para que el usuario genere puntos en el torneo son:</p><p>Ezugi</p><p>Vivo Gaming</p><p>Pragmatic Live</p><p>Betgamestv</p><p>TVbet</p><p>Evolution</p><p>La apuesta mínima total por ronda que el usuario deberá realizar para que sus apuestas generen puntos para el torneo es de S/. 5.</p><p>A continuación, podrás visualizar los puntos que se acumularán según los rangos de apuestas.</p><p>Valor apostado total por jugada.</p><p>Puntos acumulados:</p><p>S/. 5 – S/. 9.99 – 1 puntos</p><p>S/. 10 - S/. 19.99 – 5 puntos</p><p>S/. 20 – S/. 49.99 – 20 puntos</p><p>S/. 50 – S/. 99.99 – 55 puntos</p><p>S/. 100 – en adelante – 120 puntos</p><p>El usuario se identificará dentro del ranking con los números de usuario y el primer nombre. Por ejemplo: 1067**Cristian.</p><p>Todos los premios pueden ser pagados 72 horas después de finalizado el torneo, el equipo de <a href=\"http://doradobet.com/\">DoradoBet.com</a> se contactará con el usuario ganador y se le indicará cómo hacer efectivo el premio, para esto, cada jugador debe asegurarse de tener sus datos personales actualizados.</p><p>os.</p><p>Estos juegos se encuentran debidamente certificados por los laboratorios internacionales.</p><p>El jugador que se encuentre dentro del ranking de ganadores y que no reclame el respectivo premio dentro de los veinte (20) días calendario siguiente al momento del cierre del Torneo, perderá su derecho y el premio será entregado al siguiente usuario con mayor número de puntos acumulados y que no fue premiado en la lista de ganadores.</p><p>En caso de empate, se tendrá en cuenta el usuario participante con mayor número de apuestas realizadas en el torneo participante y si se comprueba empate en las apuestas el usuario ganador será el primer usuario que haya ingresado a participar en el torneo en Fecha y Hora.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> cancela el torneo si descubre usuarios apostando en grupo o abusando del espíritu de la promoción.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de cancelar este torneo en cualquier momento y sin previo aviso.</p><p>Para hacer efectivo los premios, es indispensable la presentación del documento de identidad del ganador inscrito en el sitio Apuestas Deportivas | Apuestas Online | Casino en Línea y la firma del acta de entrega.</p><p>PLAN DE PREMIOS</p><p><strong>Primer Puesto:</strong><br>S/.2.300 en saldo crédito + S/.1.700 Jugadas Gratis.<br><strong>Segundo Puesto</strong>:</p><p>S/.1.500 en saldo crédito + S/.1.000 Jugadas Gratis.<br><strong>Tercer Puesto:</strong></p><p>S/.1.200 en saldo créditos + S/.600 Jugadas Gratis.<br><strong>Del cuarto (4) puesto al Veinteavo (20) puesto:</strong></p><p>S/.100 Jugadas Gratis.</p><p>Los freespin se asignarán al juego que DoradoBet determine, los ganadores serán notificados a través de mensajería interna con el juego determinado, los ganadores tendrán un plazo de 7 días para hacer efectivos los freespin dados.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Torneo LIGAS DE EUROPA",
                            "content": "<p>¡Juega y Gana en el <strong>Torneo LIGAS DE EUROPA </strong>con DoradoBet! Acumula puntos, demuestra que eres el mejor a nivel mundial y GANA AL TOQUE MUCHOS PREMIOS.</p><p>Para participar en el torneo el usuario deberá registrarse en el torneo haciendo clic en el botón JUEGA YA tener saldo en su cuenta personal de <a href=\"http://doradobet.com/\">DoradoBet.com</a> o en su defecto recargar a través de los medios de pago establecidos.</p><p>El torneo inicia el día <strong>19 de diciembre hasta el 05 de enero de 2023</strong>, los usuarios podrán participar del torneo durante estos días compitiendo por el mayor número de puntos acumulados.</p><p>Solo aplicarán las apuestas realizadas en los partidos oficiales de <strong>las siguientes ligas:</strong></p><p>Premier League</p><p>LaLiga</p><p>Serie A</p><p>Ligue 1</p><p>Liga de Portugal</p><p>La <strong>apuesta mínima por ticket </strong>que el usuario deberá realizar para que sus apuestas generen puntos para el torneo es de <strong>S/. 5.</strong></p><p>Aplica únicamente para apuestas realizadas desde usuarios online.</p><p>Los puntos se verán reflejados al momento que se realice la apuesta.</p><p>Si se realiza cashout en una apuesta, los puntos obtenidos por esta serán restados del total de puntos.</p><p>El pago de los premios se hará cuando las apuestas estén totalmente cerradas.</p><p><strong>CONVERSIÓN DE PUNTAJE:</strong></p><p>Monto Apostados / Puntos Asignados</p><p>De 5 a 9.99 Soles 1 punto</p><p>De 10 a 19.99 Soles 5 puntos</p><p>De 20 a 49.99 Soles 20 puntos</p><p>De 50 a 99.99 Soles 55 puntos</p><p>Mas de 100 Soles 120 puntos<br><br> </p><p>Los puntos obtenidos serán multiplicados por los siguientes <strong>RANGOS DE LINEAS:</strong></p><p>Total de líneas / Multiplicador de puntaje:</p><p>De 2 a 5 líneas – 1.2</p><p>De 6 a 10 líneas – 2.6</p><p>De 11 a 15 líneas – 6.4<br><br> </p><p>Ejemplo: (Si aposto 20 soles a 3 líneas los puntos obtenidos del MONTO (20 puntos) se le multiplicara por 1.2 obteniendo un total de 24 puntos).</p><p>La <strong>cuota mínima para las líneas es de 1.5</strong> por selección.</p><p>Solo se multiplicará las líneas con cuota mínima 1.5.</p><p>El puntaje será multiplicado por las líneas que pertenezcan a las ligas participantes del torneo en cada ticket</p><p>El usuario se identificará dentro del ranking con los números de usuario y el primer nombre. Por ejemplo: 1067**Cristian.</p><p>Todos los premios se pagan 72 horas después de finalizado el torneo, el equipo de <a href=\"http://doradobet.com/\">DoradoBet.com</a> se contactará con el usuario ganador y se le indicará cómo hacer efectivo el premio, para esto, cada jugador debe asegurarse de tener sus datos personales actualizados.</p><p>El jugador que se encuentre dentro del ranking de ganadores y que no reclame el respectivo premio dentro de los veinte (20) días calendario siguiente al momento del cierre del Torneo, perderá su derecho y el premio será entregado al siguiente usuario con mayor número de puntos acumulados y que no fue premiado en la lista de ganadores.</p><p>En caso de empate, se tendrá en cuenta el usuario participante con mayor número de tickets realizados en el torneo participante y si se comprueba empate en los giros el usuario ganador será el primer usuario que haya ingresado a participar en el torneo en fecha y hora.<br><br> </p><p><strong>PLAN DE PREMIOS:</strong></p><p><strong>Primer Puesto:</strong></p><p>S/. 2.000 en Saldo Créditos + S/.700 Apuesta Gratis + S/. 300 Jugadas Gratis.</p><p><strong>Segundo Puesto:</strong></p><p>S/.1.600 Saldo Créditos + S/. 600 Apuesta Gratis + S/. 300 Jugadas Gratis.</p><p><strong>Tercer Puesto:</strong></p><p>S/. 1.300 en Saldo Créditos + S/. 400 Apuesta Gratis + S/. 300 Jugadas Gratis.</p><p><strong>Del Cuarto (4) puesto al treintavo (30) puesto.</strong></p><p>S/. 100 Apuesta Gratis + S/. 70 jugadas Gratis.</p><p>Los freespin se asignarán al juego que Doradobet determine, los ganadores serán notificados a través de mensajería interna con el juego determinado, los ganadores tendrán un plazo de 7 días para hacer efectivos los freespin dados.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> cancela el torneo si descubre usuarios apostando en grupo o abusando del espíritu de la promoción.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de cancelar este torneo en cualquier momento y sin previo aviso.</p><p>Los Freebet solo podrán ser redimidos en partidos con cuotas mayores a 2.0 en fútbol.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "Misiones Golden Days Isoftbet",
                            "content": "<p>Misiones Diarias Doradobet</p><p>Válido para Perú</p><p>Válido para usuarios registrados en la plataforma <a href=\"http://Doradobet.com\">Doradobet.com</a></p><p>La Campaña estará vigente desde el <strong>19 de diciembre hasta el 31 de enero 2023</strong></p><p>La campaña se hará de Lunes a Domingo a partir de <strong>19 de diciembre del 2022.</strong></p><p><strong>Dinámica: </strong></p><p>Los usuarios deben cumplir con las condiciones diarias para poder hacer uso del bono</p><p><strong>Lunes</strong> – Apuesta mínimo S/ 200 en el juego Gold Digger y gana 50 giros</p><p><strong>Martes</strong> – Juega 200 spin en el juego Brilliant Diamonds y gana 50 giros</p><p><strong>Miércoles</strong> - Gana S/ 250 en el juego Golden Buffalo Double Up y gana 50 giros</p><p><strong>Jueves</strong> - Apuesta mínimo S/300 en el juego Shining King Megaways y gana 50 giros</p><p><strong>Viernes </strong>- Juega 300 spin en el juego Gold Digger Megaways y gana 50 giros</p><p><strong>Sábado </strong>- Gana S/ 350 en el juego Aztec Gold Extra Gold MW - Doradobet y gana 50 giros</p><p><strong>Domingo </strong>- Apuesta S/ 400 en el juego The Ruby Megaways y gana 50 giros</p><p> </p><p><strong>Juega todos los días y gana hasta 350 giros gratis</strong></p><p>Los giros gratis se darán automáticamente luego de cumplir con las condiciones establecidas por <a href=\"http://Doradobet.com\">Doradobet.com</a></p><p>Para que se acrediten los giros es necesario que el usuario ingrese nuevamente al juego o actualice la pantalla, una vez realizada esta acción reflejaran los giros gratis.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><a href=\"http://DoradoBet.com\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p><a href=\"http://DoradoBet.com\">DoradoBet.com</a> considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.)</p><p><a href=\"http://DoradoBet.com\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos",
                            "title": "TORNEO E-SPORTS FULL",
                            "content": "<p>¡Juega y Gana en el <strong>Torneo E-SPORT FULL </strong>con DoradoBet! Acumula puntos, demuestra que eres el mejor a nivel mundial y GANA AL TOQUE MARAVILLOSOS PREMIOS.</p><p>Para participar en el torneo el usuario deberá registrarse en el torneo haciendo clic en el botón JUEGA YA tener saldo en su cuenta personal de <a href=\"http://doradobet.com/\">DoradoBet.com</a> o en su defecto recargar a través de los medios de pago establecidos.</p><p>El torneo inicia el día <strong>03 de enero y finaliza el 17 de enero del 2023</strong>, los usuarios podrán participar del torneo durante estos días compitiendo por el mayor número de puntos acumulados.</p><p>El usuario deberá tener saldo en su cuenta personal de <a href=\"http://doradobet.com/\">DoradoBet.com</a> o en su defecto recargar a través de los medios de pago establecidos.<br><br> </p><p>Juegos</p><p>Counter Strike.</p><p>Dota2.</p><p>League Of Legends.</p><p>Rocket League.</p><p>La apuesta mínima por ticket que el usuario deberá realizar para que sus apuestas generen puntos para el torneo es de S/. 5.</p><p>Aplica únicamente para apuestas realizadas desde usuarios online.</p><p>Los puntos se verán reflejados al momento que se realice la apuesta.</p><p>Si se realiza cashout en una apuesta, los puntos obtenidos por esta serán restados del total de puntos.</p><p>El pago de los premios se hará cuando las apuestas estén totalmente cerradas.</p><p> CONVERSIÓN DE PUNTAJE:</p><p><strong>Monto Apostados / Puntos Asignados:</strong></p><p>De 5 a 9.99 Soles 1 punto</p><p>De 10 a 19.99 Soles 5 puntos</p><p>De 20 a 49.99 Soles 20 puntos</p><p>De 50 a 99.99 Soles 55 puntos</p><p>Mas de 100 Soles 120 puntos</p><p>Los puntos obtenidos serán multiplicados por los siguientes rangos de lineas:</p><p><strong>Total de lineas / Multiplicador de puntaje:</strong></p><p>De 2 a 5 lineas – 1.2</p><p>De 6 a 10 lineas – 2.6</p><p>De 11 a 15 lineas – 6.4</p><p>Ejemplo: (Si aposto 20 soles a 3 lineas los puntos obtenidos del MONTO (20 puntos) se le multiplicara por 1.2 obteniendo un total de 24 puntos)</p><p>La cuota mínima para las lineas es de 1.3 por selección.</p><p>Solo se multiplicará las lineas con cuota mínima 1.3.</p><p>El puntaje será multiplicado por las líneas que pertenezcan a las ligas participantes del torneo en cada ticket</p><p>El usuario se identificará dentro del ranking con los números de usuario y el primer nombre. Por ejemplo: 1067**Cristian.</p><p>Todos los premios se pagan 72 horas después de finalizado el torneo, el equipo de <a href=\"http://doradobet.com/\">DoradoBet.com</a> se contactará con el usuario ganador y se le indicará cómo hacer efectivo el premio, para esto, cada jugador debe asegurarse de tener sus datos personales actualizados.</p><p>El jugador que se encuentre dentro del ranking de ganadores y que no reclame el respectivo premio dentro de los veinte (20) días calendario siguiente al momento del cierre del Torneo, perderá su derecho y el premio será entregado al siguiente usuario con mayor número de puntos acumulados y que no fue premiado en la lista de ganadores.</p><p>En caso de empate, se tendrá en cuenta el usuario participante con mayor número de tickets realizados en el torneo participante y si se comprueba empate en los giros el usuario ganador será el primer usuario que haya ingresado a participar en el torneo en fecha y hora.</p><p><strong>PLAN DE PREMIOS:</strong></p><p><strong>Primer Puesto:</strong></p><p>S/. 800 en saldo crédito + S/. 600 en apuesta gratis + S/. 400 en jugadas gratis.</p><p><strong>Segundo Puesto:</strong></p><p>S/. 700 en saldo crédito + S/. 500 en apuesta gratis + S/. 300 en jugadas gratis.</p><p><strong>Tercer Puesto:</strong></p><p>S/. 400 en saldo crédito + S/. 250 en apuesta gratis + S/. 150 en jugadas gratis.</p><p><strong>4° al 10° Puesto</strong>:</p><p>S/. 100 en apuesta gratis + S/. 100 en jugadas gratis.</p><p><strong>11° al 20° Puesto:</strong></p><p>S/. 100 en apuesta gratis + S/. 50 en jugadas gratis.</p><p>Los freespin se asignarán al juego que Doradobet determine, los ganadores serán notificados a través de mensajería interna con el juego determinado, los ganadores tendrán un plazo de 7 días para hacer efectivos los freespin dados.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> cancela el torneo si descubre usuarios apostando en grupo o abusando del espíritu de la promoción.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de cancelar este torneo en cualquier momento y sin previo aviso.</p><p>Los freebet solo podrán ser redimidos en futbol con cuotas mayores a 2.0</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos ",
                            "title": "Bono MEGA GIROS",
                            "content": "<p>Oferta válida solo para<strong> Perú</strong> </p><p>Solo podrán participar mayores de 18 años y usuarios seleccionados por <a href=\"http://doraodbet.com/\">Doradobet.com</a> a los cuales les llegará la comunicación de la promoción por cualquier medio que DoradoBet considere </p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación. </p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">Doradobet.com</a> </p><p>El bono estará disponible del <strong>01 al 15 enero de 2023</strong></p><p>Por su primer depósito de S/.30 en adelante el usuario recibirá 30 giros gratis.</p><p>Los freespin se asignarán en el juego que Doradobet determine, el pago será notificado a través de mensajería interna con el juego determinado, los usuarios tendrán un plazo de 7 días para hacer uso los premios otorgados. </p><p>Todos los premios se pagan 70 horas después de finalizada la promoción, el equipo de <a href=\"http://doradobet.com/\">DoradoBet.com</a> se contactará con el usuario ganador y se le indicará cómo hacer efectivo el premio, para esto, cada jugador debe asegurarse de tener sus datos personales actualizados </p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar pronósticos o suspensión de las cuentas. </p><p><a href=\"http://doraodbet.com/\">Doradobet.com</a> Se reserva el derecho de utilizar cualquier medio de comunicación para hacer efectiva la promoción </p><p><a href=\"http://doraodbet.com/\">Doradobet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado. </p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> considerará la activación del bono de bienvenida para usuarios que no tienen bonos vigentes. </p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso. <a href=\"http://doradobet.com/\">Doradobet.com</a></p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos ",
                            "title": "Torneo LAS VEGAS",
                            "content": "<p>¡Disfruta en nuestro Torneo Casino LAS VEGAS y participa por S/ 10.000 al toque! ¡Tenemos muchos premios más para ti!</p><p>El torneo inicia el día <strong>04 de enero hasta el 18 de enero 2023,</strong> los usuarios podrán participar del torneo durante estos días compitiendo por el mayor número de puntos acumulados.</p><p>Para participar en el torneo el usuario deberá registrarse en el torneo haciendo clic en el botón JUEGA YA tener saldo en su cuenta personal de <a href=\"http://doradobet.com/\">DoradoBet.com</a> o en su defecto recargar a través de los medios de pago establecidos.</p><p>Participan todos proveedores de casino en vivo para que el usuario genere puntos en el torneo</p><p>La apuesta mínima total por ronda que el usuario deberá realizar para que sus apuestas generen puntos para el torneo es de S/. 5.</p><p>A continuación, podrás visualizar los puntos que se acumularán según los rangos de apuestas.</p><p>Valor apostado total por jugada.<br><br> </p><p>Puntos acumulados:</p><p>S/. 5 – S/. 9.99 – 1 puntos</p><p>S/. 10 - S/. 19.99 – 5 puntos</p><p>S/. 20 – S/. 49.99 – 20 puntos</p><p>S/. 50 – S/. 99.99 – 55 puntos</p><p>S/. 100 – en adelante – 120 puntos</p><p>El usuario se identificará dentro del ranking con los números de usuario y el primer nombre. Por ejemplo: 1067**Cristian.</p><p>Todos los premios pueden ser pagados 72 horas después de finalizado el torneo, el equipo de <a href=\"http://doradobet.com/\">DoradoBet.com</a> se contactará con el usuario ganador y se le indicará cómo hacer efectivo el premio, para esto, cada jugador debe asegurarse de tener sus datos personales actualizados.</p><p>Estos juegos se encuentran debidamente certificados por los laboratorios internacionales.</p><p>El jugador que se encuentre dentro del ranking de ganadores y que no reclame el respectivo premio dentro de los veinte (20) días calendario siguiente al momento del cierre del Torneo, perderá su derecho y el premio será entregado al siguiente usuario con mayor número de puntos acumulados y que no fue premiado en la lista de ganadores.</p><p>En caso de empate, se tendrá en cuenta el usuario participante con mayor número de apuestas realizadas en el torneo participante y si se comprueba empate en las apuestas el usuario ganador será el primer usuario que haya ingresado a participar en el torneo en Fecha y Hora.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> cancela el torneo si descubre usuarios apostando en grupo o abusando del espíritu de la promoción.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de cancelar este torneo en cualquier momento y sin previo aviso.</p><p>Para hacer efectivo los premios, es indispensable la presentación del documento de identidad del ganador inscrito en el sitio Apuestas Deportivas | Apuestas Online | Casino en Línea y la firma del acta de entrega.<br><br> </p><p>PLAN DE PREMIOS</p><p><strong>Primer Puesto:</strong><br>S/. 2.300 en saldo crédito + S/. 1.700 Jugadas Gratis.<br><strong>Segundo Puesto</strong>:</p><p>S/. 1.500 en saldo crédito + S/. 1.000 Jugadas Gratis.<br><strong>Tercer Puesto:</strong></p><p>S/. 1.200 en saldo créditos + S/. 600 Jugadas Gratis.<br><strong>Del cuarto (4) puesto al Veinteavo (20) puesto:</strong></p><p>S/. 100 Jugadas Gratis.<br><br> </p><p>Los freespin se asignarán al juego que DoradoBet determine, los ganadores serán notificados a través de mensajería interna con el juego determinado, los ganadores tendrán un plazo de 7 días para hacer efectivos los freespin dados.</p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos ",
                            "title": "Juego Estreno",
                            "content": "<p>Promoción exclusiva para Cash-a-cabana de Playngo.</p><p>· Promoción valida solo el<strong> 13 de enero del 2023</strong></p><p>· Promoción exclusiva para clientes de DoradoBet.</p><p>· El usuario debe apostar mínimo S/10 en el juego Shamrock Miner y será acreedor de 10 giros gratis</p><p>Los giros serán entregados una vez terminada la promoción con un máximo de 72 horas hábiles.</p><p>· Valido para Perú.</p><p>· Solo podrán participar mayores de 18 años.</p><p>· La oferta solo aplica una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doradobet.com/\">DoradoBet.com</a>.</p><p>· Debe ser usuario Online.</p><p>· El incumplimiento de los Términos y Condiciones de la presente promoción o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p>· <a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>· <a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p>· No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p> </p>",
                            "show": false
                        },
                        {
                            "order": "promociones-bonos ",
                            "title": "Torneo PLAY & WIN",
                            "content": "<p>¡Juega y Gana en nuestro divertido casino online, participa hasta por S/4.200 y conviértete en el mejor jugador de casino online con Doradobet!</p><p>Para participar en el torneo el usuario deberá registrarse en el torneo haciendo clic en el botón JUEGA YA tener saldo en su cuenta personal de <a href=\"http://doradobet.com/\">DoradoBet.com</a> o en su defecto recargar a través de los medios de pago establecidos.</p><p>El torneo inicia el día <strong>09 de enero del 2023 hasta el 15 de enero del 2023</strong>, los usuarios podrán participar del torneo durante estos días compitiendo por el mayor número de puntos acumulados.</p><p><strong>Los juegos participantes son:</strong></p><p>Miner Donkey Trouble<br>Bull in a China Shop<br>Bull in a Rodeo<br>Feline Fury<br>Inmortails of Egypt<br>Reactoonz<br>Reactoonz 2<br>Gigantoonz<br>Energoonz<br>Dr. Toonz</p><p>La apuesta mínima total por ronda que el usuario deberá realizar para que sus apuestas generen puntos para el torneo es de S/. 0,4. A continuación, podrás visualizar los puntos que se acumularán según los rangos de apuestas.</p><p><strong>Valor apostado total por jugada (Spin) Puntos acumulados</strong></p><p>S/. 0,4 – S/. 0,99 – 1 punto</p><p>S/. 1 - S/. 1,99 – 6 puntos</p><p>S/. 2 – en adelante – 15 puntos</p><p>El usuario se identificará dentro del ranking con los números de usuario y el primer nombre. Por ejemplo: 1067**Cristian.</p><p>Todos los premios serán pagados 72 horas después de finalizado el torneo, el equipo de <a href=\"http://doradobet.com/\">DoradoBet.com</a> se contactará con el usuario ganador y se le indicará cómo hacer efectivo el premio, para esto, cada jugador debe asegurarse de tener sus datos personales actualizados.</p><p>Solo aplicarán las jugadas (Spins) realizadas en los juegos participantes. Estos juegos se encuentran debidamente certificados por los laboratorios internacionales.</p><p>El jugador que se encuentre dentro del ranking de ganadores y que no reclame el respectivo premio dentro de los veinte (20) días calendario siguiente al momento del cierre del Torneo, perderá su derecho y el premio será entregado al siguiente usuario con mayor número de puntos acumulados y que no fue premiado en la lista de ganadores.</p><p>En caso de empate, se tendrá en cuenta el usuario participante con mayor número de giros realizados en el torneo participante y si se comprueba empate en los giros el usuario ganador será el primer usuario que haya ingresado a participar en el torneo en Fecha y Hora.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> cancela el torneo si descubre usuarios apostando en grupo o abusando del espíritu de la promoción.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de cancelar este torneo en cualquier momento y sin previo aviso.</p><p>Para hacer efectivo los premios, es indispensable la presentación del documento de identidad del ganador inscrito en el sitio </p><p><a href=\"http://www.doradobet.com/\">Apuestas Deportivas | Apuestas Online | Casino en Línea</a> y la firma del acta de entrega.</p><p><strong>PLAN DE PREMIOS</strong></p><p><strong>Primer Puesto</strong></p><p>S/. 1.000 en saldo crédito + S/.400 Giros Gratis</p><p><strong>Segundo Puesto</strong></p><p>S/. 900 en saldo crédito + S/.200 Giros Gratis</p><p><strong>Tercer Puesto</strong></p><p>S/.700 en saldo créditos + S/.200 Giros Gratis</p><p><strong>Cuarto Puesto</strong></p><p>S/.350 en saldo créditos + S/.150 Giros Gratis</p><p><strong>Quinto Puesto</strong></p><p>S/.200 en saldo créditos + S/.100 Giros Gratis</p><p>Los freespin se asignarán al juego que Doradobet determine, los ganadores serán notificados a través de mensajería interna con el juego determinado, los ganadores tendrán un plazo de 7 días para hacer efectivos los freespin dados.</p>",
                            "show": false
                        }
                    ],
                    "show": true
                },
                {
                    "order": "control-riesgo",
                    "title": "3. Control de riesgo",
                    "parent": [
                        {
                            "order": "",
                            "title": "3. Control de riesgo",
                            "content": "<p>Nuestro control de riesgo se construye a nivel interno y en base a nuestros términos y condiciones.</p><p>El control de riesgo, es un control interno determinado por la casa de apuestas con el fin de regular cualquier tipo de acción considerada mal intencionado en el pronóstico y juegos de azar ofrecidos por la misma. La casa de apuesta estará en facultad de adquirir sistemas inteligentes los cuales realizarán probabilidades y tendrán control sobre el riesgo sobre los mercados ofrecidos.</p><p>Cuando se infrinja alguna condición en la oferta de los eventos aprobados en el mercado de apuestas o exista evidencia de que un mismo individuo o grupo de individuos ha realizado una serie de apuestas (Ej. Cuando se identifican patrones de apuestas comunes en el mismo encuentro/ mercado entre cuentas etc.)</p><p>Donde dichos individuos o grupos quieran aprovecharse de una ganancia potencial de ingreso, pagos aumentados y apuestas donde no se comprometa ningún tipo de riesgo o cualquier otra promoción que garantice las ganancias independientes del resultado, tanto de manera individual o como parte de un grupo.</p><p>En dichos casos la empresa se reserva el derecho a determinar las apuestas con el precio correcto, anular las apuestas sin riesgo o anular cualquier tipo de apuesta que vaya en contra del control de riesgo que representa cada uno de los eventos ofertados y seleccionados en la parrilla de apuestas, en caso tal de que eventos seleccionados no hayan tenido lugar, la empresa reembolsará el valor apostado al disponible para jugar.</p><p>La empresa se reserva el derecho de presentar una penalidad a dichos usuarios y dependiendo de la gravedad del caso, inactivar y ser retiradas respectivas cuentas de juego.<br><br>La empresa se reserva el derecho de suspender un mercado y/o cancelar una apuesta en cualquier momento.</p><p>Cualquier jugada considerada por el sistema que sea peligrosa podrá ser rechazada, cancelada o anulada.</p><p>Si la casa de apuestas detecta que algún usuario está realizando apuestas con patrones de juego (arbitraje u otros) está en la disposición de bloquear, limitar y vetar al usuario de la casa de apuestas.</p><p>En caso de que el usuario realice apuestas con montos demasiado altos el sistema podrá rechazar sus apuestas.</p><p>La casa de apuestas podrá generar un límite diario de juego para cada usuario sea de forma global o individual con el fin de limitar prácticas de apuestas consideradas peligrosas.</p><p>Se considerarán prácticas de apuestas peligrosas todas aquellas que conlleven: repetición de mercados de juego, montos elevados de apuesta, patrones de juego repetido tanto en montos, cuotas y opciones de apuestas etc…</p><p>La casa de apuestas se reserva el derecho de presentar penalizaciones monetarias y extracción de saldo de la cuenta del usuario en caso de que este retire dinero cargado a su cuenta por inconvenientes con alguna jugada.</p><p>La casa de apuestas se reserva el derecho de cancelar o anular cualquier mercado de juego en cualquier momento.</p><p>Si se sospecha de fraude o resultado arreglado en un evento la casa de apuestas podrá anular todas las jugadas a dicho evento sin previo aviso.</p><p>En caso de presentarse error humano o problemas con el sistema en el cual se detecten liberación de saldos de forma errónea a alguna cuenta por problemas de determinación de jugadas la casa de apuestas está en el derecho de retirar dicho saldo sin previo aviso.</p><p>En caso de que se detecte algún error en la cuota de pago, la casa de apuestas se reserva el derecho de determinar las apuestas con el precio correcto y/o anularlas según lo considere.</p><p>La casa de apuestas se reserva el derecho de anular cualquier apuesta que vaya en contra del control de riesgo.</p><p>La casa de apuestas se reserva el derecho de limitar o reducir la cantidad de apuestas o valor apostado por el usuario sin previo aviso.</p><p>Cuando se suspende una apuesta, las apuestas realizadas serán rechazadas y nos reservamos el derecho a cesar las apuestas sobre un evento o apartado concreto en cualquier momento y sin previo aviso.</p><p>En caso de presentarse algún error humano o con el sistema en el cual se detecten liberación de saldos de forma errónea a alguna cuenta o usuario online, sea esta situación correspondiente a una apuesta, deposito, retiro o cualquier tipo de transacción, la casa de apuestas está en el derecho de retirar dicho saldo sin previo aviso o en su defecto en hacer cobro de dicho saldo por medio de las herramientas internas del sistema hasta recuperar el valor liberado de forma errónea.</p><p>La casa de apuestas se reserva el derecho de anular cualquier apuesta en vivo que se encuentre por dichas razones en revisión del VAR (Asistencia al Arbitro por Vídeo). Si la apuesta es directa se anulará la apuesta y se realiza la devolución del valor apostado, en caso de que sea una apuesta parlay se anulara solo la línea de apuesta a dicho evento y el resto de las líneas se mantendrán.</p><p>La casa de apuestas se reserva el derecho de suspender o anular cualquier cuenta o saldo del usuario cuando se detecte abuso de los bonos promocionados en la plataforma.</p><p>En caso de detectar un usuario o Grupo de Usuarios que realicen acciones que evidencien un patrón de abuso de los bonos o promociones de la casa de apuestas o cualquier otra acción la cual se identifique vaya en contra del espíritu de la promoción, la casa de apuestas se reserva el derecho de suspender la cuenta o cuentas implicada y congelar el saldo del usuario o usuarios relacionados en el proceso.</p><p>La casa de apuestas se reserva el derecho de llevar a cabo de manera interna un control de riesgo de la plataforma para la identificación de los patrones que representen cualquier tipo de sospecha, fraude, abuso, colusión por parte del usuario o usuarios que realicen acciones las cuales intuyan un beneficio personal o grupal en la cual se evidencien movimientos dudosos y de patrones de riesgo con el fin de acceder y beneficiarse de la promoción de manera sistemática y enganosa que vaya en contra de los términos y condiciones o sugiera intención de aprovecharse de la casa de apuestas.</p><p>El usuario se hará responsable de mantener la seguridad de sus contrasenas de acceso y no facilitará el ingreso y uso no autorizado a su cuenta.</p><p>El usuario será responsable y acepta que todos los movimientos su cuenta fueron realizados a su nombre.</p><p>La casa de apuestas no aceptará reclamaciones ni se hace responsable si el usuario informa de sus datos de cuenta a terceros y estos usan su cuenta.</p><p>La casa de apuestas llevara un control interno sobre los movimientos de entrada y salida de dinero, para con las cuentas de los usuarios online. En caso de detectarse algún patrón considerado de riesgo o en contra de los parámetros de funcionamiento de la plataforma, la casa de apuestas se reserva el derecho de inactivar y retirar el saldo de la cuenta o cuentas implicadas en la cuestión sin previo aviso.</p><p>La casa de apuestas se reserva el derecho de inhabilitar y retener el saldo de cualquier usuario el cual sea reportado como sospechoso o tenga relaciones con movimientos de falsificación, suplantación o cualquier irregularidad en entidades bancarias y pasarelas de pago afiliados a la plataforma.</p><p>En caso de detectar un usuario o grupo de usuario utilizando de forma irregular las opciones de pago disponibles en la plataforma, con la finalidad de generar movimientos de forma sistemática sean de ingreso o salida de dinero. La casa de apuestas realizada una investigación sobre dichos movimientos y se reserva el derecho de inactivar o eliminar las cuentas implicadas sin previo aviso.</p><p>En caso de detectarse una persona la cual tenga varias cuentas registradas en la plataforma de Doradobet, la casa de apuestas se reserva el derecho de inactivar y retener cualquier saldo en dichas cuentas dado al incumplimiento de las condiciones generales y políticas de registro de datos verídicos de forma individual en la página.</p><p>Ante cualquier sospecha de suplantación o falsificación de datos de registro, la casa de apuestas se reserva el derecho de bloquear las cuentas y movimientos del usuario de forma indefinida hasta que se verifique su identidad.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "3.1 Control y prevencion de lavado de activos y financiacion del terrorismo.",
                            "content": "<p>El lavado de activos y financiación del terrorismo son delitos tipificados en la ley penal, dichos delitos constituyen uno de los problemas sociales y financieros que más afectan la economía y seguridad a nivel nacional y mundial. Por este motivo con el propósito de hacer presente a este flagelo doradobet.com se atiene a las disposiciones de cada país en que tenga actividad económica siguiendo las recomendaciones del GAFI.</p><p>Doradobet siendo consiente del alto riesgo de exposición de las actividades de juego de azar y juego novedoso, trata de prevenir y controlar este flagelo dentro de su actividad económica.</p><p>Cada uno de los asociados, empleados y directivos de doradobet.com actúan de forma ética y responsable sobre el tema implementando las medidas de seguridad necesarias para prevenir y controlar los movimientos riesgosos de dinero por medio de las siguientes acciones:</p><p>La casa de apuestas realizara un control y revisión de todos los movimientos de dinero en las cuentas de los usuarios que utilicen los servicios de doradobet.com</p><p>La casa de apuestas notificara de forma periódica a la entidad reguladora según la legislación o quien haga de sus veces los movimientos de los usuarios que tengan alto flujo de dinero en sus cuentas.</p><p>La casa de apuestas brindara toda la información necesaria y solicitada por las entidades reguladoras, penalistas y previsoras de estas flagelaciones según la legislación de cada país.</p><p>La casa de apuestas tendrá conocimiento de las diferentes entidades que regulen, verifiquen y prevengan este tipo de delitos.</p><p>A continuación, establecemos un glosario de las distintas siglas de las entidades tomadas en cuenta al momento de la prevención y control de este tema:</p><p><strong>Glosario:</strong></p><p><strong>GAFI:</strong> grupo de acción financiera internacional, es una organización que promueve las medidas y la regulación para combatir el lavado de activos y financiación del terrorismo.</p><p><strong>SARLAFT:</strong> sistema de administración de riesgo de la/ft, en donde el estado define políticas y establece directrices para la implementación de las etapas del sistema de administración de riesgos. Las entidades deben adoptarlo de acuerdo con su negocio y riesgos específicos. Consulte a su supervisor para determinar cuál sistema le aplica a su entidad.</p><p><strong>SIREL:</strong> sistemas de reporte en línea. Por este sistema las entidades deben reportar a la UIAF: reporte de operación sospechosa (ros), ausencia de ros y reportes (información) objetivos de acuerdo con la norma que aplique.</p><p><strong>UIAF:</strong> Unidad de información y analisis financiero. Es la entidad del estado encargada de centralizar, sistematizar y analizar datos relacionados con operaciones de lavado de activos, es decir, la unidad es un filtro de información que se apoya en tecnología para consolidar y agregar valor a los datos recolectados, esto le permite detectar operaciones que pueden estar relacionadas con el delito de lavado de activos.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "topes-valor-apuesta",
                    "title": "4. Topes y Valores de Apuesta",
                    "parent": [
                        {
                            "order": "",
                            "title": "4. Topes y Valores de Apuesta",
                            "content": "<p>4.1 La apuesta mínima permitida en nuestro sitio web esta determinada por el tipo de moneda que se use equivalente a USD 1.<br><br>4.2 Nos reservamos el derecho de asignar topes máximos de premiación y de apuestas diarias para cada tipo de apuesta y usuario. La plataforma, por medio de una ventana emergente, indicará al usuario cuando la apuesta solicitada es rechazada por superar los topes máximos de premiación o de ventas diarias permitidas.<br><br>4.3 Un usuario puede solicitar el aumento de un único (Ventas diarias), para que esta solicitud pueda generarse de manera exitosa, nos reservamos el derecho de realizar un previo análisis para que el usuario pueda ser notificado por dicha solicitud.<br><br>4.4 Para efectos de apuestas en mercado Par/Impar, Si el partido acaba en empate a 0-0 se determinará como un número par de goles.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "modalidades-tipos",
                    "title": "5. Modalidades y Tipos de apuestas",
                    "parent": [
                        {
                            "order": "",
                            "title": "5. Modalidades y Tipos de apuestas",
                            "content": "<p>Modalidades de Apuestas: La plataforma recibe apuestas deportivas en tres modalidades diferentes.<br><br>Apuestas prematch o antes del partido: Se reciben antes de iniciar un evento real. Todas las apuestas prematch deberán ser realizadas antes de que inicie el evento. Por errores o modificaciones de último momento en la hora de inicio de un evento, nos reservamos el derecho a cancelar cualquier apuesta prematch realizada después de iniciado el mismo y el valor de las apuestas correspondientes será reembolsado al saldo disponible para jugar.<br><br>Apuestas en vivo o apuestas en directo: Esta modalidad de apuestas se encuentran en nuestro portal en la pestana superior apuestas en vivo, se reciben antes de iniciar el evento y durante el desenvolvimiento real del evento, estas últimas con una variable grandiosa y es el movimiento de cuotas y la posibilidad de acceder a diferentes estadísticas que optimizan una posible victoria. Apostar en vivo enriquece el factor entretenimiento al máximo, ofreciendo a la vez nuevas posibilidades de hacer dinero. Las apuestas en vivo se han ido convirtiendo en las favoritas en el mercado.<br><br>Para efectos de apuestas en mercado Par/Impar, Si el partido acaba en empate a 0-0 se determinará como un número par de goles.<br><br>Tipos de apuestas: Las apuestas son Directas, Apuestas Parlay o apuestas multiples(Con opción de seleccionar apuestas secundarias)<br><br>Apuestas directas: se consideran apuestas directas  a aquellas realizas en una sola línea al resultado de un solo evento. El valor del premio resulta de multiplicar el logro o cuota asignada al evento por el valor apostado por el usuario.<br><br>Apuestas Parlay o multiple: La apuesta se realiza en dos o más líneas ( máximo 15) al resultado de varios eventos diferentes de manera simultánea, es decir, para que un Parlay se considere ganador la determinación de cada uno de los eventos incluidos debe ser acertada. El valor del premio resulta de multiplicar entre si la cuota asignada a cada uno de los eventos incluidos en la apuesta por el valor total apostado.</p><p><strong>Apuesta Sistema:</strong> Son aquellas apuestas donde el usuario selecciona la opción de combinada y combina varios resultados a uno o varios eventos, la diferencia de este a las otras apuestas es que en esta se cobrará por cada línea seleccionada y se pagará el valor correspondiente a las líneas de juego ganadas de la siguiente forma: El valor apostado se divide entre las líneas combinadas, y este valor se multiplica por la cuota de pago de las líneas ganadoras.</p><p><i>Ejemplo 1: El usuario realiza una apuesta combinada de 10 soles a dos líneas de juego de distintos eventos uno de ellos tiene una cuota de 1.40 y el otro de 1.55, el valor apostado soleas al otro, el cliente solo gano la apuesta al evento con la cuota de 1.55 por tanto el valor a ganado se calcula de la siguiente forma: 5 x 1.55 = 7,55 es decir que el usuario ganaría 7,55 soles en esta jugada.</i></p><p><i>Ejemplo 2: El usuario realiza una apuesta combinada de 12 dólares a 3 líneas de juego las cuales tienen una cuota de pago de 1.40, 1.30 y 1.45, el valor apostado se divide entre las tres líneas lo que quiere decir que el usuario ha apostado 3 dólares a cada una, el usuario gana dos de las líneas las que poseen la cuota de 1.30 y 1.45 el valor ganado se calcula de la siguiente forma: 1.30 x 3 = 3,9 y 1.40 x 3 = 4,2, el valor se calcula línea por línea y al final se suma el valor ganado en cada una así: 3,9 + 4,2 = 8,1 es decir que el cliente ha ganado 8,1 dólares en esta jugada.</i></p><p><strong>“CERRAR APUESTAS (CASHOUT)”</strong><br>La opción “Cerrar apuesta” está disponible en nuestras apuestas en modalidad Prematch y apuestas en vivo, esta opción estará disponible desde el momento en que disponemos del evento en nuestra parrilla de apuestas y seguirá disponible incluso durante el partido en vivo. Es necesario que el mercado / selección jugada esté disponible en la parrilla de apuestas. En las apuestas con más de una selección, la opción cerrar apuesta estará disponible solo si todas las selecciones están disponibles y abiertas para apostar. Si al menos una selección no está disponible (debido a un inicio de partida o debido a una suspensión del mercado), la opción cerrar apuesta no estará disponible, esta volverá a estar disponible cuando la selección suspendida se vuelva a abrir o el evento que había comenzado pueda terminarse y posteriormente determinarse el resultado.</p><p>La opción “Cerrar apuesta” está también disponible en nuestras modalidades de apuestas juego en vivo desde el momento en que disponemos del evento en nuestra parrilla de apuestas hasta el momento del tiro inicial, Es necesario que el mercado / selección jugada esté disponible en la parrilla de apuestas. Esta modalidad de apuesta funciona con la misma lógica de nuestras Apuestas Prematch.</p><p>IMPORTANTE: Una apuesta prematch tendrá disponible la opción de Cerrar Apuesta durante el partido en vivo.</p><p>El valor del retiro se calcula automáticamente y en tiempo real de acuerdo con el mercado seleccionado.</p><p>El margen de reintegro al cerrar una apuesta esta parametrizado internamente por DoradoBet.com, estos parámetros pueden cambiarse sin previo aviso. Este margen puede variar según el mercado y puede tener alguna diferencia en las diferentes modalidades disponibles en nuestro sitio web.</p><p>El margen de retiro también podrá determinarse a un jugador en específico.</p><p>Las apuestas que se liquidaron con la opción de “Cerrar apuestas” quedan EXCLUIDAS de cualquier procedimiento de reinversión de bonificación.</p><p>Nos reservamos el derecho de inhabilitar la opción de “Cerrar apuesta” de un mercado, campeonato, categoría y deporte específicos.</p><p>DoradoBet.com se reserva el derecho de excluir a un jugador de la opción de “Cancelar apuestas” a voluntad si se comprueba algún comportamiento que represente riesgo.</p><p>El valor confirmado por el usuario al momento de cerrar una apuesta será reintegrado al saldo créditos de su cuenta personal DoradoBet.com.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "terminos-condiciones",
                    "title": "6. Terminos y Condiciones",
                    "parent": [
                        {
                            "order": "",
                            "title": "Introducción",
                            "content": "<p><strong>Introducción</strong></p><p>Estos términos y condiciones y los documentos a los que se hace referencia a continuación se aplican al uso del presente sitio web ww.doradobet.com y sus servicios relacionados o conectados con el servicio de entretenimiento de juego y azar.</p><p>Debe revisar detenidamente estas Condiciones, ya que contienen información importante sobre sus derechos y obligaciones en relación con el uso del sitio web y constituyen un acuerdo legal vinculante entre usted, nuestro cliente denominado usuario online y nosotros definidos como operador de juego.</p><p>Al utilizar este Sitio Web y/o acceder al Servicio, usted, ya sea un invitado o un usuario registrado con una cuenta online, acepta quedar obligado por estas Condiciones, junto con cualquier modificación que pueda publicarse periódicamente. Si no acepta estas Condiciones, deberá abstenerse de acceder al Servicio y utilizar el Sitio Web.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Condiciones Generales",
                            "content": "<p>Este sitio web esta operado por VS Network Solutions N.V., empresa registrada el 20 de septiembre de 2021 bajo las leyes de Curacao, con el número de registro 158663 y bajo la licencia No 365/JAZ sub-licencia GLH-OCCHKTW0711042021 otorgada por el gobierno de curacao el 4 de noviembre de 2021.</p><p>Estos términos y condiciones son el acuerdo informado entre el usuario y la casa de apuestas, dicho acuerdo es aceptado al momento del registro cuando se aceptan los términos y condiciones, y se considera que cualquier persona que utilice el servicio de la casa de apuestas conoce estos términos y condiciones.</p><p>Nos reservamos el derecho de revisar y modificar las Condiciones en cualquier momento.</p><p>Debe visitar esta página periódicamente para revisar las Condiciones.</p><p>Las modificaciones serán vinculantes y entrarán en vigor inmediatamente después de su publicación en este sitio web.</p><p>Si se opone a cualquiera de estos cambios, deberá dejar de utilizar el Servicio inmediatamente.</p><p>Su uso continuado del sitio web después de dicha publicación indicará que está de acuerdo con las Condiciones modificadas.</p><p>Cualquier apuesta que no se haya resuelto antes de la entrada en vigor de las Condiciones modificadas estará sujeta a las Condiciones preexistentes.<br><br>Deportes Americanos tales como NFL, MLB, NHL y NBA (MLS no hace parte de esta regla) los cuales no sean jugados o sean jugados y se abandonen, y no continúen dentro del mismo día y la misma zona horaria local, partiendo de la hora anunciada de inicio, es decir aquellos mercados que no estén decididos dentro de las 24 horas luego de iniciado el evento serán cancelados.</p><p>(Ejemplo. si un partido de Fútbol americano es abandonado en la segunda mitad, todos los mercados de la<br>primera mitad serán cerrados de manera normal).</p><p>(Ejemplo. en el mismo caso anterior, (aquellos mercados de la segunda mitad no decididos) serán cancelados y<br>las apuestas serán devueltas a los clientes).</p><p>La casa de apuestas es una entidad económica dependiente de proveedores de juego, y distintas áreas internas, destinados a la comercialización de juego real y no real.</p><p>La casa de apuestas no es responsable por las retenciones o impuestos generados por las transacciones económicas del usuario.</p><p>En caso de discrepancia entre las especificaciones por mercado o deporte de este reglamento y el de la lengua inglesa prevalece el de la lengua inglesa.</p><p>La casa de apuestas podrá realizar en cualquier momento y sin notificación previa cualquier modificación tecnológica, de formatos o documentación.</p><p>Bajo ninguna eventualidad se podrá duplicar o copiar este acuerdo para otros fines comerciales o para el establecimiento de otras entidades con el mismo propósito económico.</p><p>El acceso del usuario al sitio web <a href=\"http://www.doradobet.com/\">www.doradobet.com</a> es voluntario, la casa de apuestas no está en obligación de informar sobre cualquier elemento informático danino que pueda afectar el funcionamiento de la plataforma.</p><p>El usuario no podrá imputar responsabilidad alguna a la casa de apuestas más allá de la operación de juego por internet, ni podrá solicitar indemnización por ningún concepto por los perjuicios ocasionados por problemas técnicos, eléctricos, de comunicación o de conexión a internet.</p><p>La casa de apuestas no garantiza el uso a continuidad o uso ininterrumpido de una sesión, ya que existe exposición a fallas en el sistema de internet que no corresponden a la plataforma.</p><p>En caso de que el usuario identifique algún acto, conducta o fallo en el servicio está en la obligación de informarlo inmediatamente a través del chat online a nuestros agentes. Así mismo el tiempo de respuesta a cualquier solicitud ya recibida es relativo, dado que cada caso requiere atención individual.</p><p>La casa de apuestas es una entidad económica internacional la cual estará sujeta únicamente a los términos y condiciones establecidos en este acuerdo.</p><p><strong>Freebet</strong></p><p>Las apuestas gratis (freebet) que sean otorgadas por medio de mensaje de texto como \"regalo\" de parte de DoradoBet, que no correspondan al premio de alguna de nuestras promociones o torneos estipulados en la plataforma, tendrán un plazo de 7 días  para ser usados.</p><p>Para liberar los freebet otorgados se debe realizar una apuesta a futbol con cuota mínima de 2.0 por el valor total de la apuesta gratis.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Responsabilidades de los jugadores",
                            "content": "<p>Usted reconoce que en todo momento al acceder al Sitio Web y utilizar el Servicio:</p><p>3.1.  El usuario debe tener la edad mínima requerida según la jurisdicción aplicable al país donde resida el usuario. Al cumplir la edad mínima requerida según la jurisdicción el usuario certifica y ostenta que está en todas sus capacidades de obrar, actuar y responsabilizarse de todas sus acciones por cuenta propia.</p><p>Confirma a la casa de apuestas que usted es mayor de 18 anos, o que tiene la edad legal en la que el juego, o las actividades de juego están permitidas bajo la ley o la jurisdicción que se aplica a usted. Nos reservamos el derecho a solicitarle en cualquier momento documentos que acrediten su edad.</p><p>3.2. Al usuario el servicio afirma que tiene capacidad legal y puede celebrar un acuerdo legal vinculante con nosotros.  Siendo consciente que en caso contrario no debe acceder al Sitio Web ni utilizar el Servicio si no tiene capacidad legal. </p><p>En caso de encontrarse en el territorio de Perú la casa de apuestas aplicara el siguiente concepto para definir y tratar a quienes incumplan con el párrafo 3.2 ostentando de ser interdictos ante el gobierno peruano citando el siguiente concepto legal:</p><p><i>“Doradobet.com confirma y expresa las bases jurídicas correspondientes por las cuales establecemos la información de base legal en la cual se expresa que Doradobet no es considerado como titular o responsable para el tratamiento y/o medidas de prevención respecto a las personas registradas como ludópatas.</i></p><p><i>Ateniéndonos expresamente según la aplicación de la “Ley para la prevención y el Tratamiento de la Ludopatía en las Salas de Juego de Casino y Maquinas de Tragamonedas” - Ley Nro. 29907, así como su Reglamento (D.S. 007-2013), se consideran como responsables y titulares de hacer cumplir la prohibición de ingreso a sus instalaciones y demás medidas de protección y prevención , aquellas empresas que cuentan con autorización expresa (por el Ministerio de Comercio Exterior y Turismo - MINCETUR) para desarrollar la actividad de explotación de salas juegos de casino y/o máquinas tragamonedas.</i></p><p><i>Siendo ello así, es necesario precisar que según la Ley 27153 – “Ley que regula la explotación de los juegos de casino y máquinas tragamonedas” y sus modificaciones, se entiende como aquellas empresas que se dedican a la explotación de juegos de casino o máquinas de tragamonedas a los establecimientos “Salas de juego” que cuentan con un determinado número de mesas de casino y máquinas de tragamonedas y que se encuentran expresamente autorizadas por la Dirección General de Juegos de Casino y Máquinas Tragamonedas del Viceministerio de Turismo del Ministerio de Comercio Exterior y Turismo – MINCETUR. </i></p><p><i>Por tanto, se desprende que, el giro de apuestas deportivas y juegos por internet no requiere contar autorización por parte el Ministerio de Comercio Exterior y Turismo – MINCETUR para realizar operaciones, puesto que esta entidad sólo es competente para “regular, autorizar, controlar y fiscalizar la explotación de juegos de casino y máquinas tragamonedas en salas de juego instaladas en espacio físico (salas de juego presenciales)”.</i></p><p><i>Con lo cual, dado el giro de apuestas deportivas y juegos por internet o virtuales no se encuentran incluidos dentro del rubro de juegos de casino ni tragamonedas; DoradoBet no se encuentra considerado como titular ni responsable de las medidas de prevención y tratamiento de Ludopatía.</i></p><p><i>Adicional a ello, al no ser considerados como Titulares, se confirma que como tal no se requiere o deba tener acceso o conocimiento de que una persona se encuentra registrada como ludópata, teniendo en base esto Doradobet está exento conforme a no ser considerado Titulares de establecer o accionar previamente alguna medida correctiva.</i></p><p><i>Con base a esto recordamos a todos los usuarios registrados que basados en la aplicación de ley para los titulares, según el Reglamento de Ley para la prevención y tratamiento de la ludopatía, son excepciones de responsabilidad y no se devuelve las apuestas, si las personas registradas como ludópata logran ingresar a la sala de juegos y participar en juegos valiéndose de engano, ardid o astucia o cuando no obstante el titular de actuado con diligencia (sistemas de identificación en el Registro, retiro de las salas de juego e impedir los juegos).”</i></p><p>3.3. Como cliente usted es residente en una jurisdicción que permite los juegos de azar. Usted no es residente de ningún país en el que esté prohibido el acceso a los juegos de azar en línea a sus residentes o a cualquier persona de dicho país. Es su única responsabilidad asegurarse de que su uso del servicio es legal.</p><p>3.4. No puede utilizar una VPN, un proxy o servicios o dispositivos similares que enmascaren o manipulen la identificación de su ubicación real. </p><p>3.5. Usted es el usuario autorizado del método de pago que utiliza. Siendo de esta forma usted como usuario responsable y acepta que todos los movimientos su cuenta fueron realizados por su persona.</p><p>3.6. Debe realizar todos los pagos a nosotros de buena fe y no intentar revertir un pago realizado o realizar cualquier acción que provoque que dicho pago sea revertido por un tercero.  Como usuario se abstendrá de realizar cualquier tipo de acción fraudulenta o de colusión para con la casa de apuestas u otro usuario.</p><p>3.7. Al realizar apuestas es consciente de que puede perder parte o la totalidad de su dinero depositado en el Servicio de acuerdo con estas Condiciones y será plenamente responsable de dicha pérdida.</p><p>3.8. Al realizar las apuestas, no debe utilizar ninguna información obtenida que infrinja la legislación vigente en el país en el que se encuentre en el momento de realizar la apuesta.</p><p>3.9. Usted no está actuando en nombre de otra parte o con fines comerciales, sino únicamente en su propio nombre como individuo a título personal.</p><p>3.10. No debe intentar manipular ningún mercado o elemento dentro del Servicio de mala fe ni de manera que afecte negativamente a la integridad del Servicio o a nosotros. Se abstendrá de modificar, alterar o cambiar el desarrollo o normativas de juego establecidos por la casa de apuestas tanto en sus términos y condiciones como en su programación de la plataforma.</p><p>3.11. No alterará el normal desarrollo de los juegos incluyendo el uso de robots, programas maliciosos, intervenciones en el código de programación o el uso de otros dispositivos etc.</p><p>3.12. No realizará ni se implicará en ningún movimiento o actividad que indique, sugiera o comprometa a un acto fraudulento o de mala fe en cualquier movimiento que incluya o se relacione con la casa de apuestas u otro usuario y solo podrán participar los usuarios que estén legalmente permitidos por la respectiva jurisdicción. </p><p>3.13. En general, debe actuar de buena fe en relación con nosotros del Servicio en todo momento y para todas las apuestas realizadas, mantendrá un comportamiento respetuoso y honesto para con los otros usuarios de juego y para con la casa de apuestas.</p><p>3.14. Usted o, en su caso, sus empleados, empleadores, agentes o familiares, no están registrados como Afiliados en nuestro programa de Afiliados.</p><p>3.15. El usuario deberá registrarse en la plataforma de la casa de apuestas una sola vez, y verificará sus datos según las condiciones de la casa de apuestas, sin presentar documentación o soportes falsos de su identidad.</p><p>3.16. Para efectos de seguridad el debe mantener las credenciales de ingreso a la plataforma seguras de tal forma que solo los pueda utilizar el titular de la cuenta siendo responsable de mantener la seguridad de sus contrasenas de acceso y no facilitará el ingreso y uso no autorizado a su cuenta.</p><p>3.17. Acepta los términos y condiciones que establezca la casa de apuestas de forma consiente y autónoma, ateniéndose a todos los parámetros de control, beneficios, obligaciones que disponga la casa de apuestas para utilizar los servicios de juego novedoso a apuestas deportivas y de casino, de forma online.</p><p>3.18. El usuario se abstendrá de no afectar de ningún modo sea leve o profundo el nombre, reputación, imagen comercial o prestigio de la casa de apuestas o de sus operadores.</p><p>3.19. El usuario no utilizara el nombre, marca o cualquier tipo de distintivo propio de la casa de apuestas en redes sociales o de forma física sin el consentimiento de la misma.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Uso Restringido",
                            "content": "<p>4.1 No utilizara el servicio de juego y azar ofrecido por www.doradobet.com como titular o por medio de terceros en caso tal de cumplir con alguna de estas definiciones presentadas a continuación:</p><p>4.1.1. Sea menor de 18 anos (o menor de la edad estipulada en las leyes de la jurisdicción aplicable a usted según el país en el cual resida).</p><p>4.1.2. No está legalmente capacitado para celebrar un acuerdo legal vinculante con nosotros siendo declarado interdicto ante el gobierno aplicable a usted o si actúa como agente o en nombre de una persona menor de 18 anos (o menor de la edad estipulada en las leyes de la jurisdicción aplicable a usted).</p><p>4.1.3. Si reside en un país en el que está prohibido el acceso a los juegos de azar en línea a sus residentes o a cualquier persona de dicho país.</p><p>4.1.4. En Doradobet.com no se aceptaran apuestas deportivas ni de casino de los países en los cuales su legislación interna lo tenga prohibido, en caso de detectar la realización de apuestas en dichos países, Doradobet se reserva el derecho de rechazar las apuestas e inactivar la cuenta del usuario</p><p>Países en los cuales se encuentran prohibidas las apuestas.</p><p>China<br>Arabia Saudita<br>India<br>Corea del norte<br>Emiratos Arabes unidos<br>Irán<br>Catar<br>Camboya<br>Estados Unidos de América y sus territorios.</p><p>Francia y sus territorios.</p><p>Países Bajos y sus territorios y los países que forman el Reino de los Países Bajos, incluidos Bonaire, San Eustaquio, Saba, Aruba, Curazao y San Martín.</p><p>Australia y sus territorios.</p><p>Reino Unido de Gran Bretana e Irlanda del Norte.</p><p>Espana.</p><p>Chipre.</p><p> </p><p> </p><p>Teniendo en cuenta esto, Doradobet solo recibirá apuestas de casino o deportivas de los países en los cuales las apuestas son legales, los usuarios que realicen apuestas deben residir de forma legal en alguno de los siguientes países</p><p> </p><p>Perú<br>Ecuador<br>El salvador<br>Nicaragua<br>Costa rica<br>Chile</p><p> </p><p>4.1.5. Tener acceso y/o recopilar apodos, direcciones de correo electrónico y/u otra información de otros Clientes por cualquier medio (por ejemplo, mediante el envío de spam, otros tipos de correos electrónicos no solicitados o el enmarcado no autorizado del Servicio o el establecimiento de enlaces a éste) independientemente si el acceso a esta información esta relacionada con su labor.</p><p>4.1.6. Interrumpir, manipular, indisponer, interferir en cualquier forma afectando o influyendo indebidamente en las actividades de juego de otros Clientes o en el funcionamiento del Servicio en general.</p><p>4.1.7. Promover o realizar anuncios comerciales o cualquier otro tipo de publicidad no solicitados, referentes a enlaces de afiliados y otras formas de solicitud que pueden ser eliminadas del Servicio sin previo aviso.</p><p>4.1.8. Debe abstenerse de actuar en cualquier forma la cual, en nuestra opinión razonable, pueda considerarse como un intento de enganar al Servicio o a otro Cliente que utilice el Servicio; o confabularse con cualquier otro Cliente que utilice el Servicio para obtener una ventaja deshonesta.</p><p>4.1.9. En caso de tener algún tipo de intención o de realizar acciones las cuales copien o se aprovechen de nuestras probabilidades para el servicio de juego y azar. Siendo a nivel general cualquier intento o intención de violar cualquiera de nuestros Derechos de Propiedad Intelectual.</p><p>4.1.10. No usara el servició para cualquier actividad ilegal o cualquier otra actividad que no este amparada bajo la ley.</p><p>4.3. Usted no puede, de ninguna manera, transferir fondos entre cuentas de jugador o realizar cualquier solicitud de cambio de titular de la cuenta.</p><p>4.4. Podemos prescindir inmediatamente su cuenta tras notificárselo por escrito si utiliza el Servicio con fines no autorizados. También podemos emprender acciones legales en caso de hacer uso indebido del sistema con finalidades de fraude o por hacerlo en determinadas circunstancias.</p><p>4.5. Los empleados de la Companía, sus licenciatarios, distribuidores, mayoristas, filiales, agencias de publicidad, promoción u otras, socios de medios de comunicación, contratistas, minoristas y miembros de las familias inmediatas de cada uno de ellos NO están autorizados a utilizar el Servicio por dinero real sin el consentimiento previo del director de la Companía o del CEO. En caso de que se descubra dicha actividad, la(s) cuenta(s) será(n) cancelada(s) inmediatamente y se perderán todas las bonificaciones/ganancias.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Registro.",
                            "content": "<p>Usted acepta que, en todo momento, cuando utilice el Servicio</p><p>5.1. Nos reservamos el derecho de rechazar una solicitud de registro de cualquier solicitante a nuestra entera discreción y sin ninguna obligación de comunicar una razón específica.</p><p>5.2. Antes de utilizar el Servicio, debe completar personalmente el formulario de registro y leer y aceptar estas Condiciones. Toda persona que se registre en <a href=\"http://www.doradobet.com/\">www.doradobet.com</a> acepta y conoce los términos y condiciones publicados en la plataforma, y acepta que dichos términos pueden ser modificados en cualquier momento por la casa de apuestas sin previo aviso.</p><p>5.3. La casa de apuestas puede solicitar cualquier documento de identificación al usuario con el fin de verificar su identidad. </p><p>5.4. Para retirar sus ganancias, podemos exigirle que se convierta en un Cliente verificado, lo que incluye la superación de determinadas comprobaciones. Es posible que se le pida una prueba de identificación válida y cualquier otro documento que se considere necesario.</p><p>Esto incluye, entre otros, un documento de identidad con fotografía (copia del pasaporte, permiso de conducir o documento nacional de identidad). </p><p>Nos reservamos el derecho de suspender las apuestas o restringir las opciones de la cuenta hasta que se reciba la información requerida. Este procedimiento se lleva a cabo de acuerdo con la normativa de juego aplicable y los requisitos legales contra el lavado de activos. Además, deberá ingresar fondos en su Cuenta de Servicio utilizando los métodos de pago establecidos en la sección de pagos de nuestro Sitio Web.</p><p>5.5. Tiene que proporcionar información de contacto exacta, incluida una dirección de correo electrónico válida (\"Dirección de correo electrónico registrada\"), y actualizar dicha información en el futuro para mantenerla exacta. </p><p>Es su responsabilidad mantener actualizados sus datos de contacto en su Cuenta. Si no lo hace, es posible que no reciba notificaciones e información importantes relacionadas con la Cuenta, incluidos los cambios que hagamos en estas Condiciones. </p><p>Identificamos y nos comunicamos con nuestros clientes a través de su dirección de correo electrónico registrada. </p><p>Es responsabilidad del Cliente mantener una cuenta de correo electrónico activa y única, proporcionarnos la dirección de correo electrónico correcta e informar a la Empresa de cualquier cambio en su dirección de correo electrónico. </p><p>Cada Cliente es totalmente responsable de mantener la seguridad de su Dirección de Correo Electrónico Registrada para evitar el uso de su Dirección de Correo Electrónico Registrada por parte de terceros. </p><p>La Empresa no será responsable de ningún dano o pérdida que se considere o se alegue como resultado de las comunicaciones entre la Empresa y el Cliente utilizando la Dirección de correo electrónico registrada. </p><p>A cualquier Cliente que no tenga una dirección de correo electrónico localizable por la Empresa se le suspenderá su Cuenta hasta que nos proporcione dicha dirección. </p><p>Suspenderemos inmediatamente su Cuenta tras notificarle por escrito a tal efecto si proporciona intencionadamente información personal falsa o inexacta. </p><p>También podremos emprender acciones legales contra usted por hacerlo en determinadas circunstancias y/o ponernos en contacto con las autoridades pertinentes, que también podrán emprender acciones contra usted.</p><p>5.6. Todos los documentos registrados en la plataforma deben de ser legales en el país de residencia actual.</p><p>5.7. El usuario es responsable de que los datos registrados sean verídicos y puedan ser verificados por la casa de apuestas.</p><p>5.8. La casa de apuestas verificará los datos de todos los usuarios para asegurarse que este haya brindado datos fidedignos y pertenecientes a un mayor de edad.</p><p>5.9. Sólo se le permite registrar una Cuenta en el Servicio ningún usuario podrá registrarse más de una vez o tener más de una cuenta. Las cuentas están sujetas a un cierre inmediato si se descubre que tiene varias cuentas registradas con nosotros. Esto incluye el uso de representantes, familiares, asociados, afiliados, partes relacionadas, personas vinculadas y/o terceros que operen en su nombre.</p><p>La casa de apuestas se reserva el derecho de inactivar, bloquear o eliminar cualquier cuenta duplicada, cualquier saldo ganado en dicha cuenta se declarará nulo y si la cuenta luego de esto le queda algún saldo depositado este será devuelto al usuario por el mismo medio que ingreso de ser posible.</p><p>5.10 Con el fin de garantizar su solvencia financiera y confirmar su identidad, podemos pedirle que nos proporcione información personal adicional, como su nombre y apellidos, o utilizar cualquier proveedor de información de terceros que consideremos necesario. En caso de que se obtenga información personal adicional a través de terceros, le informaremos sobre los datos obtenidos.</p><p>5.11. Debe mantener la confidencialidad de su contrasena para el Servicio. Siempre que la información de la cuenta solicitada haya sido suministrada correctamente, tenemos derecho a suponer que las apuestas, los depósitos y los retiros han sido realizados por usted. </p><p>Le aconsejamos que cambie su contrasena con regularidad y que nunca la reveles a terceros. Es su responsabilidad proteger su contrasena y cualquier incumplimiento de la misma será por su cuenta y riesgo. </p><p>Puede cerrar la sesión del Servicio al final de cada sesión. Si cree que la información de su Cuenta está siendo utilizada de forma indebida por un tercero, o que su Cuenta ha sido pirateada, o que su contrasena ha sido descubierta por un tercero, debe notificárnoslo inmediatamente. </p><p>Debe notificarnos si su dirección de correo electrónico registrada ha sido pirateada; no obstante, podemos pedirle que proporcione información/documentación adicional para que podamos verificar su identidad. Suspenderemos inmediatamente su cuenta una vez que tengamos conocimiento de dicho incidente. Mientras tanto, usted es responsable de toda la actividad de su Cuenta, incluido el acceso de terceros, independientemente de que el acceso haya sido autorizado por usted.</p><p>5.12. Usted no debe transmitir en ningún momento ningún contenido u otra información del Servicio a otro Cliente o a cualquier otra parte mediante una captura de pantalla (u otro método similar), ni mostrar dicha información o contenido en un marco o de cualquier otra manera que sea diferente de cómo aparecería si dicho Cliente o tercero hubiera escrito la URL del Servicio en la línea del navegador. Manteniendo la comunicación de información y contenido exclusivamente con el sitio.</p><p>5.13. Al registrarse, recibirá la posibilidad de utilizar todas las monedas disponibles en el sitio web la cual puede limitarse a la moneda local dependiendo del país. En la moneda con la cual funcione la cuenta serán manejados sus depósitos, retiros y apuestas realizadas y ganadas en el Servicio, tal y como se establece en estas Condiciones. Algunos métodos de pago no se procesan en todas las monedas. En tales casos, según el país y la disponibilidad de la moneda se brindarán los medios de pago disponibles para esa moneda. </p><p>5.14. Como operadores de juego no tenemos ninguna obligación de abrirle una Cuenta y nuestra página de registro en el sitio web es simplemente una invitación. Queda a nuestra entera discreción proceder o no a la apertura de una Cuenta para cada cliente y, en caso de que nos neguemos a abrir una Cuenta para usted, no tenemos ninguna obligación de proporcionarle una razón para la negativa.</p><p>5.15. Una vez recibida su solicitud, es posible que nos pongamos en contacto con usted para solicitarle más información y/o documentación con el fin de cumplir con nuestras obligaciones reglamentarias y legales.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Su Cuenta",
                            "content": "<p>6.1. Las cuentas pueden utilizar en la moneda local del país en el cual esté funcionando el servicio, todos los saldos de la cuenta y las transacciones aparecen en la moneda utilizada para la transacción.</p><p>6.2. No ofrecemos ningún tipo de crédito o prestamos por el uso del Servicio.</p><p>6.3. Podemos cerrar o suspender una Cuenta si no está cumpliendo o creemos razonablemente que no está cumpliendo con estos Términos, o para asegurar la integridad o equidad del Servicio o si tenemos otros motivos razonables para hacerlo. Es posible que no siempre podamos avisarle con antelación. Si cerramos o suspendemos su Cuenta debido a que no está cumpliendo con estos Términos, podemos cancelar y/o anular cualquiera de sus apuestas y retener cualquier dinero en su cuenta (incluyendo el depósito).</p><p>6.4. Nos reservamos el derecho de cerrar o suspender cualquier Cuenta sin previo aviso y devolver todos los fondos recargados, en caso de que los fondos de la cuenta sean producto de acciones fraudulentas o de mala fe dentro del sistema el saldo se considerara Nulo. No obstante, se cumplirán las obligaciones contractuales ya vencidas.</p><p>6.5. Nos reservamos el derecho a rechazar, restringir, cancelar o limitar cualquier apuesta en cualquier momento y por cualquier motivo, incluyendo cualquier apuesta que se perciba como fraudulenta con el fin de eludir nuestros límites de apuestas y/o las regulaciones de nuestro sistema.</p><p>6.6. En caso de detectar liberación de saldos de forma errónea a alguna cuenta por problemas de determinación de jugadas la casa de apuestas está en el derecho de retirar dicho saldo sin previo aviso. Si algún importe se acredita por error en su Cuenta, éste seguirá siendo de nuestra propiedad y cuando tengamos conocimiento de dicho error, se lo notificaremos y el importe se retirará de su Cuenta.</p><p>6.7. En caso de presentarse algún tipo de consumo de saldo el cual haya sido liberado de forma errónea en su cuenta, sea por cualquier situación relacionada a una apuesta, deposito, retiro o cualquier tipo de transacción, la casa de apuestas está en el derecho de retirar dicho saldo sin previo aviso y hacer efectivo el cobro de dicho saldo por medio de las herramientas internas del sistema haciendo al usuario deudor de dicho monto hasta recuperar el valor gastado.</p><p>6.8. En caso de detectar o tener conocimiento de cualquier error con respecto a su Cuenta debe informarnos inmediatamente por medio de los canales de atención. </p><p>6.9. Las apuestas son puramente para el entretenimiento y el placer y debe dejar de hacerlo tan pronto como deje de ser agradable y ameno. No apueste en absoluto nada que no pueda permitirse perder.</p><p> Si cree que ha perdido el control de sus apuestas, le ofrecemos una opción de autoexclusión. Sólo tienes que enviar un mensaje a nuestro Departamento de Atención al Cliente utilizando tu dirección de correo electrónico registrada en el que indiques que deseas autoexcluirte y esta solicitud tendrá efecto en un plazo de 24 a 72 horas desde el momento de su recepción. En este caso, su cuenta quedará inhabilitada hasta su nuevo aviso y no podrá acceder a ella.</p><p>6.10. No es posible bajo ninguna circunstancia transferir, vender o pignorar su cuenta a otra persona.  Esta prohibición incluye la transferencia de cualquier activo de valor de cualquier tipo, incluyendo, pero no limitado a la propiedad de las cuentas, ganancias, depósitos, apuestas, derechos y/o reclamaciones en relación con estos activos, legales, comerciales o de otro tipo. La prohibición de dichas transferencias también incluye, pero no se limita a, el gravamen, la pignoración, la cesión, el usufructo, el comercio, la intermediación, la hipoteca y/o la donación en cooperación con un fiduciario o cualquier otro tercero, empresa, persona física o jurídica, fundación y/o asociación de cualquier forma.</p><p>6.11. En caso de que desee cerrar su cuenta con nosotros, envíe un correo electrónico desde su dirección de correo electrónico registrada a nuestro Departamento de Atención al Cliente a través de los enlaces del sitio web.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Cuentas Inactivas",
                            "content": "<p>7.1. En caso de inactividad en la cuenta no se realizará algún cobro sobre la cuenta en sistema. </p><p>La cuenta se considerará inactiva cuando no haya entrado en su Cuenta o no ha salido de ella, ni ha utilizado el Servicio, ni ha realizado ninguna apuesta en ninguna sección del Servicio durante doce meses consecutivos o más (Actividad de la Cuenta) y su Cuenta tiene crédito.</p><p>7.2. Usted podrá siempre tendrá la opción de conectarse y retirar sus fondos.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Depósito de Fondos",
                            "content": "<p>8.1. Para poder acceder a los servicios de la cuenta personal online el usuario deberá recargar la cuenta, depositando dinero real por sea por medios electrónicos o a través de los puntos de venta autorizados.</p><p>8.2. La casa de pronósticos contara con distintos medios de depósito para comodidad del usuario, cada una con ciertos términos los cuales el usuario acepta al momento de realizar dicho depósito.</p><p>8.3. Todos los depósitos deben realizarse desde una cuenta o sistema de pago o tarjeta de crédito que esté registrada a su nombre, y cualquier depósito realizado en cualquier otra moneda se convertirá utilizando el tipo de cambio diario obtenido según el tipo de cambio vigente de nuestro propio banco o de nuestro procesador de pagos, tras lo cual su Cuenta será depositada en consecuencia. Tenga en cuenta que algunos sistemas de pago pueden aplicar tasas de cambio de moneda adicionales que se deducirán del importe de su depósito.</p><p>8.4. Pueden aplicarse comisiones a los depósitos y retiradas de los clientes, que pueden consultarse en el sitio web. En la mayoría de los casos, absorbemos las comisiones de transacción por los depósitos en su cuenta de www.doradobet.com. Usted es responsable de sus propios gastos bancarios en los que pueda incurrir por depositar fondos con nosotros. </p><p>8.5. Cualquier impuesto o costo adicional por la transacción será responsabilidad del usuario y por tanto se descontará del monto depositado.</p><p>8.6. La forma de depósito de forma electrónica la casa de pronósticos dispondrá de convenios con entidades bancarias o pasarelas de pago las cuales realizaran la transacción monetaria desde la cuenta bancaria o tarjeta del cliente o procesando ellos el depósito del cliente hasta llegar al destinatario (la casa de pronósticos).</p><p>8.7. La Companía no es una institución financiera y utiliza un procesador de pagos electrónicos de terceros para procesar los depósitos de tarjetas de crédito y débito; no son procesados directamente por nosotros. Si deposita fondos con una tarjeta de crédito o de débito, sólo se abonará en su Cuenta si recibimos un código de aprobación y autorización de la entidad emisora del pago. Si la entidad emisora de su tarjeta no da dicha autorización, no se abonarán esos fondos en su Cuenta.</p><p>8.8. El usuario se compromete a pagar íntegramente todos los pagos y cargos que se nos adeuden a nosotros o a los proveedores de pago en relación con su uso del Servicio. </p><p>8.9. Acepta no realizar ningún cargo o renunciar o cancelar o revertir de cualquier otra manera cualquiera de sus depósitos, y en cualquier caso nos reembolsará y compensará por dichos depósitos no pagados, incluyendo cualquier gasto en el que incurramos en el proceso de cobro de su depósito, y acepta que cualquier ganancia de las apuestas que utilicen esos fondos cargados de nuevo se perderá.</p><p>8.10. Como titular de la cuenta reconoce y acepta que su cuenta de jugador no es una cuenta bancaria y que, por lo tanto, no está garantizada, asegurada o protegida de otro modo por ningún sistema de seguro de depósitos o bancario ni por ningún otro sistema de seguro similar de cualquier otra jurisdicción, incluida, entre otras, su jurisdicción local. Además, la cuenta de jugador no devenga intereses sobre ninguno de los fondos depositados en ella.</p><p>8.11. Si decide aceptar alguna de nuestras ofertas promocionales o de bonificación introduciendo un código de bonificación durante el depósito, acepta las Condiciones de Bonificación y los términos de cada bonificación específica.</p><p>8.12. Son prohibidos todos los depósitos de fondos procedentes de actividades delictivas y/o ilegales y/o no autorizadas.</p><p>8.13. Si deposita utilizando su tarjeta de crédito, se recomienda que conserve una copia de los registros de las transacciones y una copia de estos Términos.</p><p>8.14. Los juegos de azar por Internet pueden ser ilegales en la jurisdicción en la que usted se encuentra; si es así, usted no está autorizado a utilizar su tarjeta de pago para depositar en este sitio. Es su responsabilidad conocer las leyes relativas al juego en línea en su país de domicilio.</p><p>8.15. El usuario no podrá imputar responsabilidad a la casa de pronósticos sobre el funcionamiento de las plataformas de depósito propiedad de terceros (entidades bancarias/pasarelas de pago).</p><p>8.16. En caso de que la transacción no pueda ser verificada y confirmada por la entidad bancaria, la entidad depositante retendrá el dinero hasta que esta pueda ser confirmada o en caso de que este proceso no se realice retendrá el dinero por 12 meses. En tal caso el usuario deberá acercarse al punto donde depósito y tratar directamente con el servicio de la entidad bancaria.</p><p>8.17. Ante cualquier reclamación el usuario deberá presentar el comprobante de pago.</p><p>8.18. Cualquier inconveniente con la transacción de depósito bancario deberá ser reportado de inmediato a los agentes del chat online. </p><p>8.19. El usuario no podrá imputar responsabilidad a la casa de pronósticos en caso de que su transacción no sea aprobada por la entidad bancaria.</p><p>8.20. En caso de retrasos de aprobación por parte de la pasarela de pago el usuario podrá solicitar revisión del estado de su depósito través de los canales de atención de Doradobet.</p><p>8.21. Si se presenta alguna dificultad con un deposito la cual tenga relación directa con el medio de pago usado, o directamente adjudicado a la entidad tercera para los depósitos, nos reservamos el derecho de limitar nuestra acción en dicho trámite y redireccionar al usuario con la entidad correspondiente.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Retiro de Fondos",
                            "content": "<p>9.1. Puede retirar los fondos ganados por su actividad de juego y azar que tenga en su cuenta de jugador presentando una solicitud de retiro de acuerdo con nuestras condiciones. El importe mínimo de retirada por transacción es de 30 soles. Con la excepción de un cierre de cuenta, en cuyo caso podrá retirar la totalidad del saldo.</p><p>9.2. No se cobran comisiones directamente por parte de la casa de apuestas sobre los retiros realizados de las cuentas online. </p><p>9.3. Nos reservamos el derecho de solicitar un documento de identidad con fotografía, la confirmación de la dirección o realizar procedimientos de verificación adicionales (solicitar su selfie, concertar una llamada de verificación, etc.) con el fin de verificar la identidad antes de conceder cualquier retirada de fondos de su Cuenta. También nos reservamos el derecho a realizar una verificación de identidad en cualquier momento mientras dure su relación con nosotros.</p><p>9.4. Todos los retiros de fondos deben realizarse a la tarjeta de débito, crédito, cuenta bancaria o método de pago original utilizado para realizar el pago en su Cuenta. Podemos, y siempre a nuestra propia discreción, permitirle retirar a un método de pago desde el que no se originó su depósito original. Esto siempre estará sujeto a controles de seguridad adicionales.</p><p>9.5. Si desea retirar fondos, pero su cuenta está inaccesible, inactiva, bloqueada o cerrada, póngase en contacto con nuestro Departamento de Atención al Cliente.</p><p>9.7. Tenga en cuenta que no podemos garantizar la tramitación satisfactoria de las retiradas o los reembolsos en caso de que infrinja la política de uso restringido de servicios de juego y azar en su país de residencia. </p><p>9.8. En el instante que el jugador desee realizar el retiro de dinero de su cuenta de juego presentados en saldo de crédito, el operador debe aceptar y ordenar el pago en un máximo de 72 horas hábiles.</p><p>9.9. Tenga en cuenta que la casa de apuestas antes de realizar cualquier transacción de pago verificará que la información suministrada por el jugador en el proceso de apertura de la cuenta. Además de que el jugador haya cumplido con la condición de pronosticar el 50% sobre cada depósito para adquirir los créditos.</p><p>9.10. Las notas de retiro destinadas a ser pagadas por medio de transferencia no podrán ser anuladas, dado que estas entran en un proceso de verificación para su pago.</p><p>9.11. Cualquier impuesto o costo por la transacción del pago deberá ser asumido por el usuario por tanto estos podrán ser descontados por el banco sobre el valor transferido.</p><p>9.12. Las notas de retiro solo serán pagadas una vez, cualquier copia de esta no será aceptada por el sistema.</p><p>9.13. El valor máximo de retiro es igual al saldo disponible para retirar en la cuenta del usuario.</p><p>9.14. Solo se aceptará el formato de nota de retiro propio del sistema, es por este motivo que el sistema permite guardar el archivo o imprimirlo para su posterior pago.</p><p>9.15. Contaremos con opción de retiro en efectivo en los diferentes locales relacionados comercialmente con la entidad o redes aliadas para transacciones con la casa de apuestas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Operaciones de pago y procesadores",
                            "content": "<p>10.1. El cliente es totalmente responsable de pagar todas las obligaciones adquiridas con la casa de apuestas. El usuario debe realizar todos los pagos a nosotros de buena fe y no intentar revertir un pago realizado o tomar cualquier acción que provoque que dicho pago sea revertido por un tercero con el fin de evitar una responsabilidad legítimamente incurrida. </p><p>El usuario se compromete a reembolsar cualquier cargo, denegación o anulación de pago que realice y cualquier pérdida que suframos como consecuencia de ello. Nos reservamos el derecho de imponer también una tasa de administración por cada devolución de cargo, denegación o anulación de pago que realice.</p><p>10.2. Nos reservamos el derecho a utilizar procesadores de pagos electrónicos y/o bancos comerciales de terceros para procesar los pagos realizados por usted, y usted acepta quedar obligado por sus términos y condiciones, siempre que se le comuniquen y que dichos términos no entren en conflicto con estas Condiciones.</p><p>10.3. Todas las transacciones realizadas en nuestro sitio web podrían ser comprobadas para evitar el lavado de dinero o la actividad de financiación del terrorismo. Las transacciones sospechosas se comunicarán a las autoridades competentes.</p><p>10.4. La casa de apuestas realizara un control y revisión de todos los movimientos de dinero en las cuentas de los usuarios que utilicen los servicios de <a href=\"http://www.doradobet.com\">www.doradobet.com</a>.</p><p>10.5. La casa de apuestas notificara de forma periódica a la entidad reguladora según la legislación o quien haga de sus veces los movimientos de los usuarios que tengan alto flujo de dinero en sus cuentas.</p><p>10.6. La casa de apuestas brindara toda la información necesaria y solicitada por las entidades reguladoras, penalistas y previsoras de estas flagelaciones según la legislación de cada país.</p><p>10.7. La casa de apuestas tendrá conocimiento de las diferentes entidades que regulen, verifiquen y prevengan este tipo de delitos.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Dificultades de sistema",
                            "content": "<p>11.1. En caso de error o mal funcionamiento de nuestro sistema o procesos, todas las apuestas quedarán anuladas. Usted tiene la obligación de informarnos inmediatamente en cuanto tenga conocimiento de cualquier error en el Servicio. </p><p>11.2. En caso de que se produzcan errores de comunicación o del sistema, o bugs o virus en relación con el Servicio y/o los pagos realizados a usted como resultado de un defecto o error en el Servicio, no seremos responsables ante usted ni ante ningún tercero de los costes, gastos, pérdidas o reclamaciones directas o indirectas que surjan o resulten de dichos errores, y nos reservamos el derecho a anular todos los juegos/apuestas en cuestión y a tomar cualquier otra medida para corregir dichos errores.</p><p>11.3. Hacemos todo lo posible para asegurarnos de no cometer errores al publicar las líneas de las casas de apuestas. Sin embargo, si como resultado de un error humano o de problemas en el sistema se acepta una apuesta a una cuota que es: materialmente diferente de las disponibles en el mercado general en el momento en que se hizo la apuesta; o claramente incorrecta dada la probabilidad de que el evento ocurra en el momento en que se hizo la apuesta, entonces nos reservamos el derecho a cancelar o anular esa apuesta, o a cancelar o anular una apuesta hecha después de que haya comenzado un evento.</p><p>11.4. Tenemos derecho a recuperar de usted cualquier cantidad pagada en exceso y a ajustar su cuenta para rectificar cualquier error. Un ejemplo de este tipo de error podría ser cuando un precio es incorrecto o cuando introducimos un resultado de un evento de forma incorrecta. Si no hay fondos suficientes en su Cuenta, podemos exigirle que nos pague el importe pendiente correspondiente a las apuestas erróneas. En consecuencia, nos reservamos el derecho a cancelar, reducir o eliminar cualquier jugada pendiente, tanto si se ha realizado con fondos derivados del error como si no.</p><p>11.5. La casa de apuestas se reserva el derecho de cancelar o anular cualquier mercado de juego en cualquier momento y a su discreción con la finalidad de mantener la transparencia y veracidad en el servicio de juego.</p><p>11.6. La casa de apuestas se reserva el derecho de anular cualquier apuesta que vaya en contra del control de riesgo, además de eliminar cualquier retiro generado en base a algún error en sistema el cual muestre liberaciones de saldo erróneas. </p><p>11.7. Nos reservamos el derecho y a nuestra discreción de solucionar errores o inconvenientes masivos en la plataforma, sin brindar detalles específicos sobre la cuestión al usuario, manteniendo segura la propiedad intelectual del software. </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Reglas de juego, reembolsos y cancelaciones.",
                            "content": "<p>Las generalidades de juego son todas aquellas consideraciones que deberán ser tomadas en cuenta para cualquier apuesta, dichas generalidades solo pueden variar de acuerdo a las disposiciones de mercado de juego por deporte especificadas más adelante.</p><p>12.1. El ganador de un evento se determinará en la fecha de la liquidación del evento, y no reconoceremos las decisiones protestadas o anuladas a efectos de las apuestas.</p><p>12.2. Todos los resultados publicados serán definitivos después de 72 horas y no se admitirán consultas después de ese periodo de tiempo. Dentro de las 72 horas siguientes a la publicación de los resultados, sólo reajustaremos/corregiremos los resultados debido a errores humanos, errores del sistema o errores cometidos por la fuente de resultados de referencia.</p><p>12.3. Si el resultado de un partido es anulado por cualquier razón por el órgano de gobierno del partido dentro del período de pago, se devolverá todo el dinero.</p><p>12.4. Si se produce un empate en un partido en el que se ofrece la opción de empate, se perderán todas las apuestas por la victoria o la derrota de un equipo. Si no se ofrece la opción de empate, todos los participantes recibirán un reembolso en caso de empate en el partido. Y si no se ha ofrecido la opción de empate, entonces la prórroga contará, si se juega.</p><p>12.5. Si un resultado no puede ser validado por nosotros, por ejemplo, si la transmisión del evento se interrumpe (y no puede ser verificada por otra fuente) entonces, a nuestra elección, las apuestas en ese evento serán consideradas inválidas y las apuestas reembolsadas.</p><p>12.6. Los importes mínimos y máximos de las apuestas en todos los eventos serán determinados por nosotros y están sujetos a cambios sin previo aviso por escrito. También nos reservamos el derecho de ajustar los límites en las cuentas individuales.</p><p>12.7. Los clientes son los únicos responsables de las transacciones de su propia Cuenta. Una vez que una transacción se ha completado, no puede ser modificada. No nos responsabilizamos de las apuestas perdidas o duplicadas realizadas por el Cliente y no atenderemos solicitudes de discrepancia porque una jugada falte o esté duplicada. Los clientes pueden revisar sus transacciones en la sección Mi Cuenta del sitio después de cada sesión para asegurarse de que todas las apuestas solicitadas fueron aceptadas.</p><p>12.8. Un partido tendrá acción siempre que los dos equipos sean correctos, e independientemente de la cabecera de la Liga en la que se coloque en nuestro Sitio Web.</p><p>12.9. Las fechas y horas de inicio mostradas en el Sitio Web para los partidos de eSport son sólo una indicación y no se garantiza que sean correctas. Si un partido es suspendido o aplazado, y no se reanuda en un plazo de 48 horas a partir de la hora de inicio real programada, el partido no tendrá acción y las apuestas serán reembolsadas. La excepción es cualquier apuesta sobre si un equipo/jugador avanza en un torneo, o gana el torneo, tendrá acción independientemente de un partido suspendido o pospuesto.</p><p>12.10. Si un evento es publicado por nosotros con una fecha incorrecta, todas las apuestas tendrán acción basadas en la fecha anunciada por el organismo rector.</p><p>12.11. Si un equipo está usando suplentes, el resultado sigue siendo válido ya que fue la elección del equipo usar los suplentes.</p><p>12.12. La empresa se reserva el derecho de eliminar eventos, mercados y cualquier otro producto del sitio web.</p><p>12.13. La explicación detallada de nuestras reglas de apuestas deportivas se encuentra en la página separada: REGLAS DE APUESTAS DEPORTIVAS</p><p>12.14. La casa de apuestas se reserva el derecho de establecer límites de ganancia por usuario y mercado de juego según lo considere.</p><p>12.13. Todas las apuestas dependen de los mercados ofrecidos por la casa de apuestas</p><p>12.14. Las opciones de apuesta tendrán especificaciones en el nombre de la opción basadas en la lógica establecida del mercado de apuestas global.</p><p>12.15. La casa de apuestas no aceptara reclamaciones basadas en desconocimiento del mercado global de juego y el funcionamiento de las opciones ofrecidas.</p><p>12.16. En caso de reclamaciones la casa de apuestas estará en derecho de citar párrafos de propiedad externa los cuales ayuden a entender el funcionamiento de los mercados de juego ofrecidos.</p><p>12.17. Las cuotas y opciones de juego pueden variar de acuerdo al mercado en cualquier momento y sin previo aviso, estos cambios no afectaran las apuestas ya confirmadas y registradas en el sistema.</p><p>12.18. El único cálculo para pago aceptado por la casa de apuestas será el propio cálculo del sistema de la casa de apuestas.</p><p>12.19. Las reservas de juego podrán ser afectadas por los cambios de cuotas y  cambios en los mercados ofrecidos por la casa de apuestas.</p><p>12.20. El primer equipo mostrado en la plataforma siempre será considerado como el equipo local, en caso de que el juego se lleve a cabo en terreno neutral la casa de apuestas determinara cuál de los dos equipos presentar como local para sus mercados de juego.</p><p>12.21. La casa de apuestas solo reconocerá los resultados a partidos que sean determinados en cancha, cualquier decisión tomada en escritorio no será tomada en cuenta para la determinación de jugadas.</p><p>12.22. La casa de apuestas no reconoce juegos protestados, decisiones equivocadas o cualquier modificación dictada por la liga después de que un evento allá sido jugado. </p><p>12.23. Para la determinación de ganadores solo será considerado el tiempo oficial del evento más el tiempo de reposición adicionado por la autoridad del juego   .</p><p>12.24. Las únicas apuestas en las que se tomara en cuenta tiempo extra serán las apuestas a clasificación y todas aquellas que especifiquen que incluyen tiempo extra. </p><p>12.25. Las únicas apuestas en las que se considerara la determinación por penaltis serán los mercados a clasificación por rondas, ganador de la copa o aquellas que especifiquen que son apuestas a penaltis.</p><p>12.26. Si un evento se suspende antes de culminar el tiempo reglamentario de juego, las apuestas a dicho evento se considerarán nulas excepto las apuestas en vivo cuyas opciones hayan sido determinadas antes de la suspensión del evento.</p><p>12.27. Cuando un evento sea suspendido, aplazado, cancelado o abandonado se considerará un evento como “no acción”. Si el evento no se juega en las próximas 48 horas la línea de apuesta se cierra como \"no acción\" y se efectúa el resto de líneas que presente la jugada, si dicha jugada presenta una sola apuesta directa se reembolsará el valor apostado a la cuenta del usuario.</p><p>12.28. En caso de que un evento sea aplazado, cancelado o suspendido la casa de apuestas se reserva el derecho de bloquear el botón de “retirar apuesta” dado que dicha jugada ha entrado en un estado especial de proceso de determinación “no acción”.</p><p>12.29. Las transmisiones en vivo de la plataforma solo son de carácter informativo, estas no son responsables de los resultados oficiales del evento.</p><p>12.30. La casa de apuestas no tendrá responsabilidad sobre problemas de mecanografía o nombre de los equipos presentados en la plataforma o dificultades en la conjugación de verbos de las opciones de apuesta.</p><p>12.31. El usuario no podrá solicitar la anulación de una jugada por el motivo de equivocación en la selección de la opción de apuesta o cuando la casa de apuestas considere que el valor apostado es demasiado alto.</p><p>12.32 El usuario no podrá retirar una apuesta después de que esta haya cumplido la fecha de programación inicial del evento o eventos a los que apostó.</p><p>12.33. La casa de apuesta utilizará fuentes de resultados oficiales propios, los cuales no serán usados en caso de error o cuando no coincidan con la realidad del partido.</p><p>12.34. La opción de cashout (retirar apuesta) no podrá ser utilizada en eventos en vivo cuando el mercado de apuesta haya sido retirado de la parrilla.</p><p>12.35. La casa de apuestas se reserva el derecho de anular cualquier apuesta en vivo que se encuentre por dichas razones en revisión del VAR (Asistencia al Arbitro por Vídeo). Si la apuesta es directa se anulará la apuesta y se realiza la devolución del valor apostado, en caso de que sea una apuesta parlay se anulara solo la línea de apuesta a dicho evento y el resto de las líneas se mantendrán.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Comunicaciones y anuncios",
                            "content": "<p>13.1. Todas las comunicaciones y notificaciones que usted nos envíe en virtud de estas Condiciones deberán enviarse a través del chat online de Atención al Cliente en el Sitio Web.</p><p>13.2. Todas las comunicaciones y avisos que le enviemos en virtud de estas Condiciones, a menos que se especifique lo contrario en estas Condiciones, se publicarán en el Sitio Web y/o se enviarán a la dirección de correo electrónico registrada que tenemos en nuestro sistema para el Cliente en cuestión. El método de dicha comunicación será a nuestra única y exclusiva discreción.</p><p>13.3. Todas las comunicaciones y notificaciones que se realicen en virtud de estas Condiciones, ya sea por usted o por nosotros, se harán por escrito en idioma espanol y deberán enviarse a la dirección de correo electrónico registrada en su cuenta.</p><p>13.4. De vez en cuando, podemos ponernos en contacto con usted por correo electrónico con el fin de ofrecerle información sobre apuestas, ofertas promocionales únicas y otra información de <a href=\"http://www.doradobet.com\">www.doradobet.com</a>. Usted acepta recibir dichos correos electrónicos cuando acepta estas Condiciones al registrarse en el Sitio Web. Puede optar por no recibir dichas ofertas promocionales de nuestra parte en cualquier momento enviando una solicitud al Servicio de Atención al Cliente.</p><p>13.5. Al aceptar los términos y condiciones de la pagina web,  el usuario acepta la recepción de promociones e información por los diversos medios de contacto registrados en la pagina al momento de la creación de la cuenta, tales como correo electrónico y numero telefónico. <br>En caso de no desear la recepción de las promociones y bonos en correo o numero telefónico, debe realizar la solicitud por medio del chat online.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Asuntos fuera de nuestro control",
                            "content": "<p>No podemos hacernos responsables de ningún fallo o retraso en la prestación del Servicio debido a un acontecimiento de Fuerza Mayor que pueda considerarse razonablemente fuera de nuestro control, a pesar de que hayamos tomado medidas preventivas razonables.</p><p>Por ejemplo, en caso de: un caso fortuito; un conflicto comercial o laboral; un corte de electricidad; un acto, fallo u omisión de cualquier gobierno o autoridad; una obstrucción o fallo de los servicios de telecomunicaciones; o cualquier otro retraso o fallo causado por un tercero, y no seremos responsables de ninguna pérdida o dano resultante que pueda sufrir. En tal caso, nos reservamos el derecho de cancelar o suspender el Servicio sin incurrir en ninguna responsabilidad.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Responsabilidad",
                            "content": "<p>15.1. En la medida en que lo permita la legislación aplicable, no le indemnizaremos por ninguna pérdida o dano razonablemente previsible (ya sea directo o indirecto) que pueda sufrir si no cumplimos nuestras obligaciones en virtud de estas condiciones, a menos que incumplamos las obligaciones que nos impone la ley (incluso si causamos la muerte o lesiones personales por nuestra negligencia), en cuyo caso no seremos responsables ante usted si dicho incumplimiento se atribuye a: <br>(i) a su propia culpa; (ii) a un tercero ajeno a nuestro cumplimiento de estas condiciones (por ejemplo, problemas debidos al funcionamiento de la red de comunicaciones, a la congestión y a la conectividad o al funcionamiento de su equipo informático); o (iii) a cualquier otro acontecimiento que ni nosotros ni nuestros proveedores hubiéramos podido prever o evitar aunque hubiéramos tenido un cuidado razonable. Como este servicio es para uso exclusivo de los consumidores, no seremos responsables de ninguna pérdida comercial de ningún tipo.</p><p>15.2. En el caso de que se nos considere responsables de cualquier acontecimiento en virtud de estas condiciones, nuestra responsabilidad total ante usted, en virtud de estas condiciones o en relación con ellas, no superará (a) el valor de las apuestas o de los pronósticos que haya realizado a través de su cuenta con respecto a la apuesta o al producto que haya dado lugar a la responsabilidad en cuestión, o (b) 500 euros en total, lo que sea menor.</p><p>15.3. Le recomendamos encarecidamente que (i) tenga cuidado de verificar la idoneidad y la compatibilidad del servicio con su propio equipo informático antes de utilizarlo; y (ii) tome precauciones razonables para protegerse contra programas o dispositivos daninos, incluso mediante la instalación de software antivirus.</p><p>15.4. La casa de apuestas, tendrá registro detallado y analítico de todos los movimientos del usuario de los últimos 3 meses.</p><p>15.5. La casa de apuestas, tendrá un consolidado del valor correspondiente a la suma total del dinero implicado en todos los movimientos de la cuenta del usuario. (depósitos, apuestas deportivas, apuestas a casino, retiros y bonos).</p><p>15.6. La casa de apuestas, realizará revisiones periódicas de los movimientos de todos los usuarios.</p><p>15.7. La casa de apuestas deberá controlar las restricciones subjetivas o correspondientes a los movimientos de juego en la cuenta del usuario con el fin de evitar cualquier riesgo. (control de riesgo). El cual aplica tanto para cuentas activas como inactivas.</p><p>15.8. La casa de apuestas registrará en la cuenta del usuario todos sus movimientos (depósitos, apuestas deportivas, apuestas a casino, retiros y bonos).</p><p>15.9. La casa de apuestas notificará a las autoridades competentes cualquier violación, anomalía o movimiento de fraude detectado en los movimientos de cualquier usuario.</p><p>15.10. La casa de apuestas adoptará todas las medidas de protección de datos (hábeas data reservador) para proteger los datos personales del usuario.</p><p><strong>Anexo: </strong>la casa de apuestas podrá modificar este contrato en cualquier momento y notificara de la modificación al usuario por cualquiera de los siguientes medios según la casa de apuestas lo decida e-mail, mensaje de texto o publicación de los nuevos términos y condiciones en la plataforma donde el usuario accede a sus servicios de juego, en caso de que el usuario encuentre alguna modificación que considere inaceptable, la única medida que podrá tomar será la de prescindir de los servicios de la casa de apuestas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Juegos de azar de los menores de edad",
                            "content": "<p>16.1. Si sospechamos que usted es o recibe una notificación de que es actualmente menor de 18 anos o que era menor de 18 anos (o menor de edad según lo estipulado en las leyes de la jurisdicción aplicable a usted) cuando realizó cualquier apuesta a través del Servicio, su Cuenta será suspendida (bloqueada) para evitar que realice más apuestas o retire dinero de su Cuenta.</p><p>A continuación, investigaremos el asunto, incluyendo si ha estado apostando como agente o en nombre de una persona menor de 18 anos (o menor de edad según lo estipulado en las leyes de la jurisdicción aplicable a usted).</p><p> Si se comprueba que usted (a) es actualmente; (b) era menor de 18 anos o por debajo de la mayoría de edad que se le aplica en el momento pertinente; o (c) ha estado apostando como agente para o a instancias de una persona menor de 18 anos o por debajo de la mayoría de edad que se le aplica:</p><p>- se retendrán todas las ganancias que se abonen actualmente o que deban abonarse en su Cuenta;</p><p>- todas las ganancias obtenidas al apostar a través del Servicio mientras se es menor de edad deberán ser abonadas a nosotros cuando se le solicite (si no cumple con esta disposición, trataremos de recuperar todos los costes asociados a la recuperación de dichas sumas); y/o</p><p>- todo el dinero depositado en su Cuenta que no sea una ganancia le será devuelto O se retendrá hasta que cumpla los 18 anos, a nuestra entera discreción. Nos reservamos el derecho a deducir las tasas de transacción de pago del importe a devolver, incluidas las tasas de transacción de los depósitos en su cuenta de &lt;suwebsite.com&gt; que hayamos cubierto.</p><p>16.2. Esta condición también se aplica a usted si es mayor de 18 anos, pero está realizando sus apuestas dentro de una jurisdicción que especifica una edad superior a los 18 anos para apostar legalmente y usted está por debajo de esa edad mínima legal en esa jurisdicción.</p><p>16.3. En el caso de que sospechemos que está incumpliendo las disposiciones de esta cláusula o que está intentando ampararse en ellas con un propósito fraudulento, nos reservamos el derecho a tomar las medidas necesarias para investigar el asunto, incluyendo la información a los organismos policiales pertinentes.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Fraude",
                            "content": "<p>17.1. Recurriremos a sanciones penales y contractuales contra cualquier Cliente implicado en fraude, deshonestidad o actos delictivos. Retendremos el pago a cualquier Cliente cuando se sospeche de alguno de ellos. </p><p>17.2. El Cliente indemnizará y será responsable de pagarnos, previa solicitud, todos los costes, cargos o pérdidas que suframos o en los que incurramos (incluidas las pérdidas directas, indirectas o consecuentes, el lucro cesante, la pérdida de negocio y la pérdida de reputación) que se deriven directa o indirectamente del fraude, la deshonestidad o los actos delictivos del Cliente.</p><p>17.3. Cuando se infrinja alguna condición en la oferta de los eventos aprobados en el mercado de apuestas o exista evidencia de que un mismo individuo o grupo de individuos ha realizado una serie de apuestas (Ej. Cuando se identifican patrones de apuestas comunes en el mismo encuentro/ mercado entre cuentas etc.)</p><p>17.4. Donde dichos individuos o grupos quieran aprovecharse de una ganancia potencial de ingreso, pagos aumentados y apuestas donde no se comprometa ningún tipo de riesgo o cualquier otra promoción que garantice las ganancias independientes del resultado, tanto de manera individual o como parte de un grupo.</p><p>17.5. En dichos casos la empresa se reserva el derecho a determinar las apuestas con el precio correcto, anular las apuestas sin riesgo o anular cualquier tipo de apuesta que vaya en contra del control de riesgo que representa cada uno de los eventos ofertados y seleccionados en la parrilla de apuestas, en caso tal de que eventos seleccionados no hayan tenido lugar, la empresa reembolsará el valor apostado al disponible para jugar.</p><p>17.6. La empresa se reserva el derecho de presentar una penalidad a dichos usuarios y dependiendo de la gravedad del caso, inactivar y ser retiradas respectivas cuentas de juego.<br><br>17.7. La empresa se reserva el derecho de suspender un mercado y/o cancelar una apuesta en cualquier momento.</p><p>17.8. Cualquier jugada considerada por el sistema que sea peligrosa podrá ser rechazada, cancelada o anulada.</p><p>17.9. Si la casa de apuestas detecta que algún usuario está realizando apuestas con patrones de juego (arbitraje u otros) está en la disposición de bloquear, limitar y vetar al usuario de la casa de apuestas.</p><p>17.10. La casa de apuestas podrá generar un límite diario de juego para cada usuario sea de forma global o individual con el fin de limitar prácticas de apuestas consideradas peligrosas.</p><p>17.11. Se considerarán prácticas de apuestas peligrosas todas aquellas que conlleven: repetición de mercados de juego, montos elevados de apuesta, patrones de juego repetido tanto en montos, cuotas y opciones de apuestas etc.</p><p>17.12. La casa de apuestas se reserva el derecho de presentar penalizaciones monetarias y extracción de saldo de la cuenta del usuario en caso de que este retire dinero cargado a su cuenta por inconvenientes con alguna jugada.</p><p>17.13. La casa de apuestas se reserva el derecho de cancelar o anular cualquier mercado de juego en cualquier momento.</p><p>17.14. Si se sospecha de fraude o resultado arreglado en un evento la casa de apuestas podrá anular todas las jugadas a dicho evento sin previo aviso.</p><p>17.15. En caso de presentarse error humano o problemas con el sistema en el cual se detecten liberación de saldos de forma errónea a alguna cuenta por problemas de determinación de jugadas la casa de apuestas está en el derecho de retirar dicho saldo sin previo aviso.</p><p>17.16. En caso de que se detecte algún error en la cuota de pago, la casa de apuestas se reserva el derecho de determinar las apuestas con el precio correcto y/o anularlas según lo considere.</p><p>17.17. La casa de apuestas se reserva el derecho de anular cualquier apuesta que vaya en contra del control de riesgo.</p><p>17.18. La casa de apuestas se reserva el derecho de suspender o anular cualquier cuenta o saldo del usuario cuando se detecte abuso de los bonos promocionados en la plataforma.</p><p>17.19. En caso de detectar un usuario o Grupo de Usuarios que realicen acciones que evidencien un patrón de abuso de los bonos o promociones de la casa de apuestas o cualquier otra acción la cual se identifique vaya en contra del espíritu de la promoción, la casa de apuestas se reserva el derecho de suspender la cuenta o cuentas implicada y congelar el saldo del usuario o usuarios relacionados en el proceso.</p><p>17.20. La casa de apuestas se reserva el derecho de llevar a cabo de manera interna un control de riesgo de la plataforma para la identificación de los patrones que representen cualquier tipo de sospecha, fraude, abuso, colusión por parte del usuario o usuarios que realicen acciones las cuales intuyan un beneficio personal o grupal en la cual se evidencien movimientos dudosos y de patrones de riesgo con el fin de acceder y beneficiarse de la promoción de manera sistemática y enganosa que vaya en contra de los términos y condiciones o sugiera intención de aprovecharse de la casa de apuestas.</p><p>17.21. El usuario se hará responsable de mantener la seguridad de sus contrasenas de acceso y no facilitará el ingreso y uso no autorizado a su cuenta.</p><p>17.22. El usuario será responsable y acepta que todos los movimientos su cuenta fueron realizados a su nombre.</p><p>17.23. La casa de apuestas no aceptará reclamaciones ni se hace responsable si el usuario informa de sus datos de cuenta a terceros y estos usan su cuenta.</p><p>17.24. La casa de apuestas llevara un control interno sobre los movimientos de entrada y salida de dinero, para con las cuentas de los usuarios online. En caso de detectarse algún patrón considerado de riesgo o en contra de los parámetros de funcionamiento de la plataforma, la casa de apuestas se reserva el derecho de inactivar y retirar el saldo de la cuenta o cuentas implicadas en la cuestión sin previo aviso.</p><p>17.25. La casa de apuestas se reserva el derecho de inhabilitar y retener el saldo de cualquier usuario el cual sea reportado como sospechoso o tenga relaciones con movimientos de falsificación, suplantación o cualquier irregularidad en entidades bancarias y pasarelas de pago afiliados a la plataforma.</p><p>17.26. En caso de detectar un usuario o grupo de usuario utilizando de forma irregular las opciones de pago disponibles en la plataforma, con la finalidad de generar movimientos de forma sistemática sean de ingreso o salida de dinero. La casa de apuestas realizada una investigación sobre dichos movimientos y se reserva el derecho de inactivar o eliminar las cuentas implicadas sin previo aviso.</p><p>17.27. En caso de detectarse una persona la cual tenga varias cuentas registradas en la plataforma de Doradobet, la casa de apuestas se reserva el derecho de inactivar y retener cualquier saldo en dichas cuentas dado al incumplimiento de las condiciones generales y políticas de registro de datos verídicos de forma individual en la página.</p><p>17.28. Ante cualquier sospecha de suplantación o falsificación de datos de registro, la casa de apuestas se reserva el derecho de bloquear las cuentas y movimientos del usuario de forma indefinida hasta que se verifique su identidad.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Propiedad Intelectual",
                            "content": "<p>18.1. Cualquier uso no autorizado de nuestro nombre y logotipo puede dar lugar a acciones legales contra usted.</p><p>18.2. En la relación entre el cliente y el operador (nosotros), somos los únicos propietarios de los derechos sobre el Servicio, nuestra tecnología, software y sistemas comerciales (Backoffice)</p><p> así como de nuestras probabilidades.</p><p>no debe utilizar su perfil personal para su propio beneficio comercial (como vender su actualización de estado a un anunciante)</p><p>al seleccionar un apodo para su Cuenta, nos reservamos el derecho de eliminarlo o reclamarlo si lo consideramos oportuno.</p><p>18.3. No podrá utilizar nuestra URL, marcas comerciales, nombres comerciales y/o imagen comercial, logotipos (\"Marcas\") y/o nuestras probabilidades en relación con cualquier producto o servicio que no sea nuestro, que de alguna manera pueda causar confusión entre los Clientes o en el público o que de alguna manera nos desprestigie.</p><p>18.4. Salvo lo dispuesto expresamente en estas Condiciones, nosotros y nuestros licenciantes no le concedemos ningún derecho, licencia, título o interés, expreso o implícito, sobre los Sistemas o las Marcas, y todos esos derechos, licencias, títulos e intereses los conservamos específicamente nosotros y nuestros licenciantes. Usted se compromete a no utilizar ningún dispositivo automático o manual para controlar o copiar las páginas web o el contenido del Servicio. Cualquier uso o reproducción no autorizada puede dar lugar a acciones legales contra usted.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Su licencia ",
                            "content": "<p>19.1. Sujeto a estas Condiciones y a su cumplimiento, le concedemos una licencia no exclusiva, limitada, no transferible y no sub-licenciable para acceder y utilizar el Servicio únicamente para sus fines personales no comerciales. Nuestra licencia para usted termina si nuestro acuerdo con usted bajo estos Términos termina.</p><p>19.2. Salvo en lo que respecta a su propio contenido, usted no podrá en ningún caso modificar, publicar, transmitir, transferir, vender, reproducir, cargar, publicar, distribuir, ejecutar, mostrar, crear obras derivadas o explotar de cualquier otra manera el Servicio y/o cualquier contenido del mismo o el software incluido en él, salvo que lo permitamos expresamente en estas Condiciones o de otro modo en el Sitio Web. 19.2. Ninguna información o contenido del Servicio o puesto a su disposición en relación con el Servicio puede ser modificado o alterado, fusionado con otros datos o publicado de ninguna forma, incluyendo, por ejemplo, el raspado de pantallas o bases de datos y cualquier otra actividad destinada a recoger, almacenar, reorganizar o manipular dicha información o contenido.</p><p>19.3. Cualquier incumplimiento por su parte de esta Cláusula puede constituir también una violación de nuestros derechos de propiedad intelectual y otros derechos de propiedad de terceros, lo que puede exponerle a una responsabilidad civil y/o a un proceso penal.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Su conducta y seguridad",
                            "content": "<p>20.1. Para su protección y la de todos nuestros Clientes, está estrictamente prohibida la publicación de cualquier contenido en el Servicio, así como la conducta relacionada con el mismo y/o con el Servicio, que sea de alguna manera ilegal, inapropiada o indeseable (\"Comportamiento Prohibido\").</p><p>20.2. Si usted incurre en un Comportamiento Prohibido, o nosotros determinamos, a nuestra entera discreción, que usted está incurriendo en un Comportamiento Prohibido, su Cuenta y/o su acceso o uso del Servicio pueden ser cancelados inmediatamente sin previo aviso. Otro Cliente, un tercero, las autoridades competentes y/o nosotros podremos emprender acciones legales contra usted por haber incurrido en una Conducta Prohibida.</p><p>20.3. El Comportamiento Prohibido incluye, pero no se limita a, acceder o utilizar el Servicio parapromover o compartir información que usted sabe que es falsa, enganosa o ilegal; llevar a cabo cualquier actividad ilegal o ilícita, como, por ejemplo, pero sin limitarse a ello, cualquier actividad que fomente o promueva cualquier actividad o empresa delictiva, que viole la privacidad u otros derechos de otro Cliente o de cualquier otro tercero o que cree o propague virus informáticos; perjudicar a los menores de edad de cualquier manera; transmitir o poner a disposición cualquier contenido que sea ilegal, danino, amenazante, abusivo, tortuoso, difamatorio, vulgar, obsceno, lascivo, violento, odioso, o racial o étnicamente o de otro modo objetable; transmitir o poner a disposición cualquier contenido que el usuario no tenga derecho a poner a disposición en virtud de cualquier ley o relación contractual o fiduciaria, incluyendo, sin limitación, cualquier contenido que infrinja los derechos de autor, marca comercial u otros derechos de propiedad intelectual y de propiedad; transmitir o poner a disposición cualquier contenido o material que contenga cualquier virus de software u otro código informático o de programación (incluyendo HTML) disenado para interrumpir, destruir o alterar la funcionalidad del Servicio, su presentación o cualquier otro sitio web, software o hardware informático.</p><p>Interferir, interrumpir o realizar ingeniería inversa en el Servicio de cualquier manera, incluyendo, sin limitación, interceptar, emular o redirigir los protocolos de comunicación utilizados por nosotros, crear o utilizar trampas, mods o hacks o cualquier otro software disenado para modificar el Servicio, o utilizar cualquier software que intercepte o recopile información desde o a través del Servicio; recuperar o indexar cualquier información del Servicio utilizando cualquier robot, arana u otro mecanismo automatizado; participar en cualquier actividad o acción que, a nuestra entera e irrestricta discreción, resulte o pueda resultar en una estafa o fraude para otro Cliente transmitir o poner a disposición de los usuarios cualquier tipo de publicidad o envío masivo no solicitado o no autorizado como, por ejemplo, correo basura, mensajería instantánea, \"spim\", \"spam\", cartas en cadena, esquemas piramidales u otras formas de solicitación; crear Cuentas en el Sitio Web por medios automatizados o bajo pretextos falsos o fraudulentos hacerse pasar por otro Cliente o por cualquier otro tercero, o cualquier otro acto o hecho que consideremos razonablemente contrario a nuestros principios comerciales.</p><p>La lista anterior de Conductas Prohibidas no es exhaustiva y puede ser modificada por nosotros en cualquier momento o de vez en cuando. Nos reservamos el derecho a investigar y a tomar todas las medidas que, a nuestra entera discreción, consideremos apropiadas o necesarias dadas las circunstancias, incluyendo, sin limitación, la eliminación de las publicaciones del Cliente del Servicio y/o la cancelación de su Cuenta, y a tomar cualquier medida contra cualquier Cliente o tercero que, directa o indirectamente, incurra en Comportamientos Prohibidos, o permita a sabiendas que un tercero incurra directa o indirectamente en ellos, con o sin previo aviso a dicho Cliente o tercero.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Enlaces a otros sitios web",
                            "content": "<p>El Servicio puede contener enlaces a sitios web de terceros que no son mantenidos por nosotros ni están relacionados con nosotros, y sobre los que no tenemos ningún control. Los enlaces a estos sitios web se proporcionan únicamente para comodidad de los clientes, y no son investigados, supervisados o comprobados por nosotros en cuanto a su exactitud o integridad. Los enlaces a dichos sitios web no implican ningún tipo de aprobación por nuestra parte ni ninguna afiliación con los sitios web enlazados, su contenido o su(s) propietario(s). No tenemos ningún control ni responsabilidad sobre la disponibilidad ni su exactitud, integridad, accesibilidad y utilidad. En consecuencia, cuando acceda a dichos sitios web, le recomendamos que tome las precauciones habituales al visitar un nuevo sitio web, incluida la revisión de su política de privacidad y sus condiciones de uso.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Peticiones",
                            "content": "<p>22.1. Si tiene alguna duda o pregunta en relación con estas Condiciones, debe ponerse en contacto con nuestro Departamento de Atención al Cliente a través de los enlaces del Sitio Web y utilizar su dirección de correo electrónico registrada en todas las comunicaciones con nosotros.</p><p>22.2. Sin perjuicio de lo anterior, no asumimos responsabilidad alguna ante usted o ante terceros al responder a cualquier queja que recibamos o al tomar medidas en relación con la misma.</p><p>22.3. Si un Cliente no está satisfecho con la forma en que se ha resuelto una apuesta, deberá proporcionar los detalles de su queja a nuestro Departamento de Atención al Cliente. Haremos todo lo posible para responder a las consultas de esta naturaleza en el plazo de unos días (y en cualquier caso, tenemos la intención de responder a todas estas consultas en el plazo de 28 días desde su recepción).</p><p>22.4. Las reclamaciones deben presentarse en un plazo de tres (3) días a partir de la fecha en que se haya decidido la apuesta en cuestión. No se atenderá ninguna reclamación después de este plazo. El Cliente es el único responsable de las transacciones de su Cuenta.</p><p>22.5. En caso de que surja una disputa entre usted y nosotros, nuestro Departamento de Atención al Cliente intentará llegar a una solución acordada. En caso de que nuestro Departamento de Atención al Cliente no pueda llegar a una solución acordada con usted, el asunto se elevará a nuestra dirección.</p><p>22.6. En caso de que todos los esfuerzos por resolver una disputa a satisfacción del Cliente hayan fracasado, el Cliente tiene derecho a presentar una reclamación ante nuestro organismo de licencias Gaming Services Provider N.V. </p><p>22.7. Si el Usuario desea presentar una queja, reclamo en referencia al servicio brindado por parte de www.Doradobet.com, el cliente deberá ponerse en contacto con el servicio de atención al cliente explicando detalladamente las razones de dicho requerimiento.</p><p>22.8. Cualquier petición, queja o reclamo que el Usuario Solicitante tenga sobre los Servicios deberá manifestarlo directamente al Usuario Prestador.</p><p>22.9. Doradobet, facilitará canales de atención a través de los cuales el cliente podrá transmitir aquellas peticiones, quejas o reclamos.</p><p>22.10. Doradobet pone a disposición el Chat online, correo electrónico, redes sociales como whatsapp, Facebook e Instagram. Además de canales de atención presencial como las agencias comerciales y las oficinas de Doradobet.</p><p>22.11. Según el tipo de requerimiento, el área de atención podrá remitir al cliente a comunicarse con un área en específico, con la finalidad de brindar cercanía y facilidad de respuesta para con el usuario.</p><p>22.12. En caso de presentarse reclamos, quejas, solicitudes o cualquier tipo de requerimiento relacionado a una organización económica tercerizada asociada a Doradobet.com, según el caso Doradobet.com se reserva el derecho de validar y delimitar su responsabilidad frente a dicho requerimiento y declinar dichas solicitudes en caso tal de que estas correspondan a una atención directa con la organización tercerizada. En estos casos nos reservamos el derecho transferir al usuario con la entidad encargada directamente.</p><p>22.13. En caso de cualquier situación de conflicto que exista en relación al saldo del cliente, movimientos de saldos, determinación de apuestas, promocionales, jugadas en el casino o cualquier tipo de información, o el buen manejo de su movimiento de saldo o situación entre el operador y el usuario, Doradobet.com se reserva el derecho de llegar a un acuerdo de retribución con el usuario de forma interna y a su discreción. Tomando en cuenta que esta medida solo podrá ser ofrecida por Doradobet como operador de juego y solo aplicará en casos específicos detallados en el manejo interno y a discreción de la empresa.</p><p>22.14. En caso de ocurrir algún tipo de comunicación errónea por parte del operador, este se reserva el derecho de corregir dicha comunicación enviando un mensaje de notificación a los usuarios relacionados con dicho incidente.</p><p>22.15. Doradobet.com se reserva el derecho de dar discreción a ciertos requerimientos teniendo en cuenta las medidas de privacidad y política de manejo de datos de los proveedores y demás asociados internos a la entidad.</p><p>22.16. No se aceptarán reclamos o quejas en caso de incurrir en dificultades que afecten el buen funcionamiento del sistema ocasionadas por fallas con la operatividad del dispositivo usado por el cliente.</p><p>22.17. La casa de juego no se hace responsable en caso de problemas o fallos en la conexión a internet del cliente la cual afecte el funcionamiento de la plataforma.</p><p>22.18. Una vez el usuario presente una solicitud, requerimiento o queja a la empresa esta será revisada por el equipo de servicio al cliente, donde se brindará una respuesta informativa en las primeras 24 horas hábiles y en caso de que el requerimiento esté relacionado con algún área diferida del servicio al cliente directo esta será escalada al área encargada dentro de la organización.</p><p>22.19. Las peticiones tendrán una respuesta inicial de 24 a 72 horas hábiles, este parámetro de tiempo comprende la respuesta inicial, para respuestas finales o solución a requerimientos los cuales conlleven un proceso de mayor amplitud el usuario será notificado sobre la prolongación y estado de su caso.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Cesión",
                            "content": "<p>Los términos y condiciones ni ninguno de los derechos u obligaciones que se derivan de las mismas pueden ser cedidos por usted sin nuestro previo consentimiento por escrito, que no será denegado de forma injustificada. </p><p>La casa de apuestas puede ceder la totalidad o parte de nuestros derechos y obligaciones en virtud del presente documento a cualquier tercero sin previo aviso y sin hacer solicitud de consentimiento a los usuarios siempre y cuando dicho tercero sea capaz de proporcionar un servicio de calidad sustancialmente similar al Servicio, publicando una notificación por escrito a tal efecto en el Servicio.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Divisibilidad",
                            "content": "<p>En el caso de que alguna disposición de estas Condiciones sea considerada por cualquier autoridad competente como inaplicable o inválida, la disposición en cuestión se modificará para permitir su aplicación de acuerdo con la intención del texto original en la mayor medida permitida por la legislación aplicable. La validez y aplicabilidad de las restantes disposiciones de estas Condiciones no se verán afectadas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Incumplimiento de las presentes Condiciones",
                            "content": "<p>Sin limitar nuestros otros recursos, podemos suspender o cancelar su Cuenta y negarnos a seguir proporcionándole el Servicio, en cualquier caso, sin notificárselo previamente, si, en nuestra opinión razonable, incumple cualquier término importante de estas Condiciones. No obstante, se le notificará con prontitud cualquier medida de este tipo que se tome.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Disposiciones Generales",
                            "content": "<p><strong>26. Disposiciones generales</strong></p><p>26.1<strong>. Duración del acuerdo.</strong> Estas Condiciones permanecerán en pleno vigor y efecto mientras usted acceda o utilice el Servicio o sea un Cliente o visitante del Sitio Web. Estos Términos sobrevivirán a la terminación de su Cuenta por cualquier motivo.</p><p>26.2. <strong>Género.</strong> Las palabras que significan el número singular incluirán el plural y viceversa, las palabras que significan el género masculino incluirán los géneros femenino y neutro y viceversa y las palabras que significan personas incluirán individuos, sociedades, asociaciones, fideicomisos, organizaciones no incorporadas y corporaciones.</p><p>26.3. <strong>Renuncia.</strong> Ninguna renuncia por nuestra parte, ya sea por conducta o de otro modo, a un incumplimiento o amenaza de incumplimiento por su parte de cualquier término o condición de estas Condiciones será efectiva o vinculante para nosotros a menos que se haga por escrito y esté debidamente firmada por nosotros, y, a menos que se disponga lo contrario en la renuncia por escrito, se limitará al incumplimiento específico al que se haya renunciado. El hecho de que no hagamos cumplir en algún momento cualquier término o condición de estas Condiciones no se interpretará como una renuncia a dicha disposición o al derecho de hacerla cumplir en cualquier otro momento.</p><p>26.4. <strong>Reconocimiento.</strong> Al acceder o utilizar el Servicio en lo sucesivo, usted reconoce haber leído, comprendido y aceptado todos y cada uno de los párrafos de estas Condiciones. En consecuencia, por la presente renuncia irrevocablemente a cualquier argumento, reclamación, demanda o procedimiento futuro en contra de cualquier cosa contenida en estas Condiciones.</p><p>26.5. <strong>Idioma.</strong> En caso de que exista una discrepancia entre la versión en inglés de estas normas y cualquier otra versión en otro idioma, se considerará correcta la versión en inglés.</p><p>26.6. <strong>Ley aplicable.</strong> Estas Condiciones se rigen por la legislación vigente en Curazao.</p><p>26.7. <strong>Acuerdo completo.</strong> Estas Condiciones constituyen el acuerdo completo entre usted y nosotros con respecto a su acceso y uso del Servicio, y sustituye a todos los demás acuerdos y comunicaciones anteriores, ya sean orales o escritos, con respecto al objeto del presente documento.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "recargas-retiros-bonos",
                    "title": "7. Depositos, Retiros y Bonos",
                    "parent": [
                        {
                            "order": "",
                            "title": "7.1 Recargar o Depositar",
                            "content": "<p>1. 7.1 Recargas o Depósitos<br><br>Para hacer uso de la cuenta dentro de nuestra plataforma un usuario debe recargar acercándose a cualquiera de los puntos de venta habilitados para recargar, indicar su número de cliente, el valor a recargar y entregar el dinero correspondiente. La Información sobre los puntos de recarga se consigue a través de nuestro chat en vivo, ubicado en nuestra página web en la parte inferior izquierda. La empresa NO realiza anulación o devolución de recargas. 2. Cuando se determine que el valor recargado a la cuenta del usuario difiera del valor recargado por alguno de nuestros medios, ya sea físico, pasarelas de pago o vía transferencias bancarias, la empresa podrá sin previo aviso, bloquear o hacer los ajustes necesarios para corregir los errores presentados, en que caso de que se evidencie alteraciones por parte del usuario con el fin de aprovecharse de errores sistemáticos, la cuenta quedará bloqueada hasta solucionar el incoveniente.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "7.2 Retiros Notas de retiro.",
                            "content": "<p>El USUARIO no podrá retirar el saldo depositado en la cuenta, solo el saldo ganado por sus operaciones de apuesta puede ser retirado de la cuenta.</p><p>La CASA DE APUESTAS abonará al saldo de retiro del USUARIO el valor correspondiente a las ganancias obtenidas por las apuestas realizadas en la plataforma de manera inmediata.</p><p>La CASA DE APUESTAS tendrá un máximo de 72 horas hábiles para realizar cualquier pago de ganancias.</p><p>La CASA DE APUESTAS solo le permitirá realizar retiros a los clientes cuyos datos registrados en el momento de la creación de la cuenta hayan sido verificados.</p><p>Para hacer efectiva una nota de retiro en un punto de venta o agencia de Doradobet el usuario debe presentar su DNI al cajero para validar sus datos.</p><p>Solo puede cobrar el titular de la cuenta, no se aceptan cobro a través de terceros.</p><p>Los retiros en puntos de venta y agentes serán pagados según disponibilidad de caja, en caso contrario se depositará el dinero directo a la cuenta bancaria titular del cliente.</p><p>Para realizar un retiro, el usuario ONLINE debe en primera instancia generar la nota de retiro correspondiente.</p><p>El valor máximo a retirar es igual al saldo disponible para retirar.</p><p>El usuario ONLINE puede eliminar una nota de retiro ya generada si posteriormente decide no realizar el retiro.</p><p>Una nota de retiro generada se paga una sola vez, es decir, copias de la misma no serán pagadas porque el sistema solo aceptará el cobro la primera vez.</p><p>Para generar la nota de retiro el usuario debe ingresar a nuestra plataforma, ir al menú principal y elegir la opción Gestión&gt;&gt;Generar nota de retiro, en esta opción el usuario podrá verificar la cantidad o saldo disponible para retirar; teniendo en cuenta esto, se genera la nota de retiro por el valor deseado, imprimir o guardar imagen de la nota de retiro y para finalizar deberá dirigirse a cualquiera de nuestro puntos de venta y presentar el documento de identidad junto la nota de retiro impresa para poder redimir la nota de retiro correspondiente.</p><p>El retiro mínimo por agencia o punto de venta será mínimo de 1 Sol hasta 1.999 Soles diarios. Los cuáles se pueden pagar en caja y de acuerdo a la disponibilidad que se tenga en el punto de venta. Los importes iguales o mayores a S/2000, se realizarán por medios de pago bancarizados (transferencias bancarias, pasarelas de pago, tarjetas de crédito o débito, etc).</p><p>La CASA DE APUESTAS contará con una opción de retiro por cuenta bancaria en la cual se pagará el premio por medio de una consignación a la cuenta personal del USUARIO. Para acceder a esta opción el usuario deberá verificar sus datos personales cargando imagen por ambas caras del documento de identidad en la opción “Verificar Cuenta”</p><p>La verificación de cuenta debera llevarse a cabo con la documentación de identidad del cliente, Solo se aceptaran documentos oficiales emitidos o reconocidos por el estado. (DNI, Pasaporte, Carnet o cédula de Extranjeria).</p><p>Si no logró cargar la foto de cada cara de su DNI, envíelo a verificacioneslog@doradobet.com. Procesaremos su solicitud para que pueda realizar sus retiros fácilmente (solo es necesario hacerlo una vez).</p><p>La validación de sus datos se lleva a cabo de lunes a viernes en el horario de 9 a.m. a 5 p.m. y puede tomar de 24 a 72 horas hábiles según la cantidad de solicitudes ingresadas durante el día.</p><p>El retiro mínimo por transferencia bancaria es de 50 Soles hasta 70.000 soles</p><p>Las solicitudes de retiro por medio de cuentas bancarias, realizadas de lunes a viernes en el horario de 9:00 a.m. a 5:00 p.m., tienen un plazo de 24 a 72 horas hábiles para ser pagadas según la cantidad de solicitudes y el correcto funcionamiento de los servicios de los bancos.</p><p>En caso de tener una cuenta bancaria en otra entidad financiera que no sea BCP, por favor digite el código interbancario correctamente para evitar devoluciones de saldo y efectuar el pago sin inconvenientes.</p><p>Los pagos solo se realizan únicamente a cuentas bancarias en soles.</p><p>Las notas de retiro destinadas a ser pagadas por medio de transferencia no podrán ser anuladas, dado que estas entran en un proceso de verificación para su pago.</p><p>Cualquier impuesto o costo por la transacción del pago deberá ser asumido por el USUARIO por tanto estos podrán ser descontados por el banco sobre el valor transferido.</p><p>La CASA DE APUESTAS cuenta con 72 horas hábiles después de la confirmación de datos del usuario por medio del correo electrónico o la plataforma para realizar el pago de la nota de retiro.</p><p>Interplay busca garantizar la transparencia y seguridad de sus operaciones, la confianza del cliente, el cumplimiento de la ley aplicable a su giro negocio y de sus normas internas, así como prevenir, controlar y reportar las situaciones o riesgos a los que Interplay podría estar expuesto en materia de Lavado de activos y Financimiento del Terrorismo, para ello se reserva el derecho de solicitar a los clientes, de manera adicional al documento de identificación, una Declaración Jurada de identificación al Cliente, en cada oportunidad de solicitud de retiro premios mayores a S/8,000.00.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "7.3 Retiros Cobro premios de Tickets ganadores.",
                            "content": "<p>7.3 Si no se trata de un usuario ONLINE sino de un cliente que realizo un ticket en un punto de venta y dicha apuesta resulta ganadora, el cliente debe dirigirse al mismo punto de venta donde realizo la apuesta para que allí sea cancelado el valor del premio correspondiente. El cliente debe presentar el ticket original (o reimpreso) por el sistema, en buen estado y legible.<br><br>El usuario tendrá hasta 90 días para hacer el reclamo de su ganancia, el tiquete expira después de 90 días.<br><br>Un ticket ganador se paga una única vez, es decir, reimpresiones de un ticket no serán pagadas si el sistema ya registra el premio como pagado.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "7.4 Recargas Retiros y Promociones",
                            "content": "<p><strong>Recargas, retiros y promociones</strong></p><p><strong>Recargas</strong></p><p>Para poder acceder a los servicios de la cuenta personal online el usuario deberá recargar la cuenta, depositando dinero real por sea por medios electrónicos o a través de los puntos de venta autorizados.</p><p>La casa de pronósticos contara con distintos medios de depósito para comodidad del usuario, cada una con ciertos términos los cuales el usuario acepta al momento de realizar dicho depósito.</p><p><strong>Recargas en puntos de venta.</strong></p><p>En primera instancia contará con las recargas directas a través de nuestros puntos de venta, el usuario podrá consultar las direcciones de dichos puntos a través del chat online.</p><p>Las recargas no podrán ser anuladas, o retiradas de la cuenta dado que este es un saldo que el cliente a destinado de forma consiente y voluntaria para su uso en la plataforma de <a href=\"http://www.ecuabet.com\">www.Doradobet.com</a></p><p>El monto mínimo de recarga será de 1 sol.</p><p>El usuario deberá acercarse a un punto de venta indicar su número de cliente y el valor a recargar. En caso de no recordar o no saber su número de cliente puede recargar informando su DNI o el correo electrónico registrado.</p><p>Cualquier inconveniente con la recarga debe ser informado de forma inmediata al chat online para su pronta resolución.</p><p>El usuario deberá presentar el recibo de recarga para cualquier reclamación sobre su depósito.</p><p><strong>Recargas por medios electrónicos o entidades bancarias.</strong></p><p>La segunda forma de depósito será de forma electrónica la casa de pronósticos dispondrá de convenios con entidades bancarias o pasarelas de pago las cuales realizaran la transacción monetaria desde la cuenta o depósito del cliente hasta la casa de pronósticos.</p><p>El depósito mínimo por medios electrónicos u medios online es de 30 soles.</p><p>El usuario podrá ingresar a estas opciones de depósito por medio de su cuenta ingresando a la opción servicios – gestión – depositar, allí encontrará las distintas opciones de depósito.</p><p>Cualquier impuesto o costo adicional por la transacción será responsabilidad del usuario y por tanto se descontará del monto depositado.</p><p>Todo depósito realizado por transacción bancaria puede tener un tiempo de espera de 30 minutos a una hora, dado que el depósito debe ser aprobado por la entidad bancaria.</p><p>La casa de pronósticos no se hace responsable por demoras o lentitud en la aprobación de transacciones dado que dicho trámite depende de la pasarela de pago y la entidad bancaria.</p><p>El usuario no podrá imputar responsabilidad a la casa de pronósticos sobre el funcionamiento de las plataformas de depósito propiedad de terceros (entidades bancarias/pasarelas de pago).</p><p>Ante cualquier reclamación el usuario deberá presentar el comprobante de pago.</p><p>Cualquier inconveniente con la transacción de depósito bancario deberá ser reportado de inmediato a los agentes del chat online.</p><p>El usuario no podrá imputar responsabilidad a la casa de pronósticos en caso de que su transacción no sea aprobada por la entidad bancaria.</p><p>En caso de que la transacción no pueda ser verificada y confirmada por la entidad bancaria, la entidad depositante retendrá el dinero hasta que esta pueda ser confirmada o en caso de que este proceso no se realice retendrá el dinero por 12 meses. En tal caso el usuario deberá acercarse al punto donde depósito y tratar directamente con el servicio de la entidad bancaria.</p><p>En caso de retrasos de aprobación por parte de la pasarela de pago el usuario podrá solicitar revisión del estado de su depósito través de los canales de atención de Doradobet.</p><p><strong>Retiros y pagos.</strong></p><p><strong>Por politicas de seguridad solo se permitira un activo a la vez por cliente.</strong></p><p><strong>Retiro a través de los puntos de venta.</strong></p><p>Forma de pago de premios y retirada de fondos: el jugador se hace acreedor de un premio, este premio se refleja inmediatamente a la cuenta de juego asociada por él jugador.</p><p>En el instante que el jugador desee realizar el retiro de dinero de su cuenta de juego presentados en saldo de crédito, el operador debe aceptar y ordenar el pago en un máximo de 72 horas hábiles, pago que deberá hacerse por el medio de pago elegido por el cliente. El operador verificará lo siguiente:</p><ol><li>La información suministrada por el jugador en el proceso de apertura de la cuenta.</li><li>Que el jugador haya cumplido con la condición de pronosticar el 50% sobre cada depósito para adquirir los créditos.</li></ol><p>El usuario podrá retirar sus ganancias en efectivo en los distintos puntos de venta.</p><p>El valor máximo de retiro es igual al saldo disponible para retirar en la cuenta del usuario.</p><p>Para realizar un retiro a través de un punto de venta el usuario debe:</p><p>Ingresar a su cuenta, ir a la opción de servicios- gestión – retirar, allí deberá seleccionar el modo de retiro “punto de venta”, escribir el monto y hacer en la opción retirar.</p><p>El usuario debe dirigirse al punto de venta con la nota de retiro impresa y su documento de identidad.</p><p>Las notas de retiro solo serán pagadas una vez, cualquier copia de esta no será aceptada por el sistema.</p><p>Solo se aceptará el formato de nota de retiro propio del sistema, es por este motivo que el sistema permite guardar el archivo o imprimirlo para su posterior pago.</p><p>El usuario podrá anular la nota de retiro posteriormente de haberla realizado, para esto debe ingresar a la opción anular nota de retiro, escribir el número de la nota, consultarla y hacer clic en anular.</p><p>En caso de que se refiera al pago de un ticket físico realizado a través de un punto de venta el cliente debe dirigirse al punto con el ticket, y este posteriormente será verificado por el cajero y pagado de forma inmediata.</p><p>El punto de venta podrá dar un tiempo de espera al cliente para el pago de sus premios en caso de que este no posea el dinero en el momento.</p><p>Las notas de retiro no tienen fecha de caducidad.</p><p><strong>Retiro por medio de transferencia bancaria.</strong></p><p>La casa de pronósticos contará con una opción de retiro por cuenta bancaria en la cual se pagará el premio por medio de una consignación a la cuenta personal del usuario.</p><p>Inicialmente el cliente para acceder a este tipo de retiro debe verificar su cuenta subiendo las imágenes de su documento de identidad por ambas caras al sistema. Ingresando a la opción servicios – gestión – verificar cuenta.</p><p>Allí deberá cargar el archivo de imagen de su documento de identidad por la cara posterior y la cara anterior y hacer clic en enviar.</p><p>Doradobet revisara los datos del cliente y verificara que estos sean correctos. Una vez hecho esto la cuenta aparecerá como verificada y se activará la opción de retiro por transferencia bancaria.</p><p>Es obligatorio realizar el proceso de verificación antes de generar un retiro.</p><p>Para acceder a esta forma de retiro el usuario debe ingresar a su cuenta en la opción servicios – cuentas bancarias he inscribir su código interbancario, número de cuenta y especificar el banco.</p><p>El usuario deberá generar una nota retiro y seleccionar como tipo de pago, transferencia bancaria de esta forma el sistema guardará la nota para ser pagada por medio de consignación bancaria.</p><p>Las notas de retiro destinadas a ser pagadas por medio de transferencia no podrán ser anuladas, dado que estas entran en un proceso de verificación para su pago.</p><p>Cualquier impuesto o costo por la transacción del pago deberá ser asumido por el usuario por tanto estos podrán ser descontados por el banco sobre el valor transferido.</p><p>La casa de pronósticos cuenta con 72 horas hábiles después de la confirmación de datos del usuario por medio del correo electrónico para realizar el pago de la nota de retiro.</p><p><strong>Promociones y bonos.</strong></p><p><br>Estas son las condiciones generales para los bonos de regalo y promociones que acepta el usuario una vez se registra o usa el servicio de la casa de pronósticos.</p><p>La casa de pronósticos dispondrá de unos términos y condiciones específicos por bono y/o promoción según la ubicación geográfica.</p><p>El usuario acepta ser partícipe de todas las promociones y bonos ofrecidos por la casa de pronósticos.</p><p>Las promociones y bono tendrán un tiempo límite establecido por la casa de pronósticos.</p><p>El área encargada cuenta con 72 horas hábiles para el pago de las promociones, dentro de las cuales no se contemplan fines de semana, dependiendo de la eventualidad este horario puede extenderse un poco mas.</p><p>La casa de pronósticos se reserva el derecho de modificar y/o cancelar cualquier bono o promoción antes de su lanzamiento o que ya se encuentra activa.</p><p>La casa de pronósticos podrá contar con la condición de rollo ver (pronosticar cierta cantidad de dinero un número determinado de veces) para liberación de los bonos y promociones.</p><p>El usuario tendrá disponible la opción de bonos por liberar en su consulta de saldos para verificar los bonos activos que están pendientes por su liberación en saldo en la cuenta.</p><p>Al aceptar los términos y condiciones generales, el usuario acepta implícitamente los términos y condiciones que la casa de pronóstico especifique por los bonos y promociones actuales y a futuro.</p><p>La casa de pronósticos determinara un tiempo de expiración para sus bonos, generalmente este es de 30 días en los cuales el usuario deberá cumplir los términos y condiciones de liberación especificados para el bono, en caso de no cumplirlos la casa de pronósticos se reserva el derecho de anular el saldo del bono.</p><p>La casa de pronósticos se reserva el derecho de suspender o anular cualquier cuenta o saldo del usuario cuando se detecte abuso de los bonos promocionados en la plataforma.</p><p>El usuario autoriza a la casa de pronóstico de usar su nombre en campanas publicitarias de ganadores de bonos o promociones. El usuario estará en total disposición de participar en actividades publicitarias que lo impliquen directamente (fotos, videos, testimonios etc…)</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "Reglas generales, corrección y liquidación de apuestas",
                    "title": "8. Reglas generales, corrección liquidación de apuestas",
                    "parent": [
                        {
                            "order": "",
                            "title": "8.1 Reglas de deportes y explicación de mercados",
                            "content": "<p><i><strong>Reglas Generales</strong></i></p><p>El resultado de un mercado se liquida una vez que se determine.</p><p>Si un mercado no se determina durante el evento, la companía liquidará el resultado del evento una vez que finalice la duración normal (tiempo regular) del evento, a menos que se indique lo contrario en el sitio oficial.</p><p><i>Ejemplo 1</i>: <strong>Ganador del partido 1X2</strong> el mercado de un evento es determinado después de la finalización de la duración normal (tiempo regular) de un evento. En Fútbol 1x2 el ganador del partido es determinado después de los 90 minutos, incluyendo tiempo de reposición.</p><p>En caso de que un evento se extienda a tiempo extra (donde el tiempo regular no determine el el ganador) todos los mercados que estén sujetos a “incluye tiempo extra” serán determinados y liquidados después de terminar el tiempo extra. Cualquier penal u otro factor decisivo que pueda continuar no se tienen en cuenta, a menos que se indique lo contrario.</p><p>Los eventos que no comiencen a tiempo por alguna razón o incluso se hayan pospuesto, puede que se mantengan abiertas las apuestas y seguirán siendo válidas si se comienza el evento dentro de las 48 horas a partir de la hora de inicio oficial. En cualquier caso, la empresa se reserva , a su propia discreción, el derecho de anular todas las apuestas de dichos eventos pospuestos y reembolsar las apuestas a los clientes.</p><p>Los eventos abandonados después de su hora de inicio y que continúen dentro de las 48 horas posteriores a dicha hora, la empresa se reserva el derecho de mantener todas las apuestas válidas y liquidar de acuerdo con el resultado.</p><p>Los eventos abandonados después de su hora de inicio y que no se continúe dentro de las 48 horas, la companía liquidará todos los mercados determinados que se encuentren decididos en el terreno de juego y anula el resto reembolsando las apuestas a los clientes. Sin embargo, en casos como este, la companía se reserva, a su propia discreción, el derecho de anular todas las apuestas de dichos eventos abandonados y reembolsar las apuestas a los clientes.</p><p>En la regla general anterior hay excepciones como en:</p><p>Los partidos de<strong> Tenis </strong>se mantendrán abiertos con todas las apuestas válidas hasta que la fuente oficial declare lo contrario. En estos casos, la regla de las 48 horas no aplica. Sin embargo y en caso de que un jugador se retire, todos los mercados que hayan sido determinados en el campo serán liquidados mientras que todos los demás serán declarados como cancelados y nulos. Para aclarar, si un jugador se retira antes de que concluya el último punto, el mercado “Ganador del encuentro” será cancelado , pero todos los mercados relacionados con sets o juegos específicos serán liquidados respectivamente.</p><p>En caso de que los siguientes juegos deportivos de EE. UU. , como MLB, NHL y NBA (la NFL y la MLS no están incluidas en esta regla) no comienzan o comienzan y se abandonan y no se reanudan en el mismo día, en la zona horaria local desde el inicio tiempo anunciado, todas las apuestas no decididas se anularán.</p><p>(Ejemplo. Si un partido de Fútbol americano es abandonado en la segunda mitad, todos los mercados de la primera mitad serán cerrados de manera normal).</p><p>(Ejemplo. En el mismo caso anterior, (aquellos mercados de la segunda mitad no decididos) serán cancelados y las apuestas serán devueltas a los clientes).</p><p>En caso de eventos de la NFL abandonados o pospuestos, todos los mercados se consideran nulos a menos que el partido continúe en el mismo horario semanal de la NFL (de jueves a miércoles, hora local del estadio).</p><p><strong>Liga de beisbol MLB:</strong> El mercado “Moneyline” (Ganador del encuentro) es considerado decidido si los oficiales de la liga lo consideran completado y si:</p><ol><li>Al menos 5 entradas se completan en su totalidad.</li><li>4.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera. En el resto de los casos, las apuestas se cancelan.</li></ol><p>Para aclarar, las apuestas en los demás mercados(totales,handicap,etc) se mantendrán, a menos que ya están decididas si:</p><ol><li>al menos 9 entradas se completan.</li><li>8.5 entradas se han completado y el equipo local (o el equipo bateando en segundo) va en la delantera.</li></ol><p>En todos los demás casos, las apuestas se cancelarán. En el evento de una “Mercy Rule”, todas las apuestas se mantendrán y decidirán en base al resultado en ese momento.</p><p>Liga de beisbol MLB, todas las <strong>Líneas de Pitcher</strong> (Mercados <strong>PL </strong>para Moneyline, Handicap y Totales) serán cancelados en caso de que el pitcher inicial listado cambie.Las apuestas realizadas en las Líneas de Pitchers incluirán la indicación (PL) en el tiquete y en el historial de apuestas. En caso de que el indicador (PL) no sea visible en el tiquete, la apuesta está hecha en las líneas de Acción y se cerrarán respectivamente. Las Líneas de Acción serán liquidadas basándose en el resultado del evento sin importar que los pitchers hayan cambiado antes. Cualquier Línea de Pitcher ofrecida de nuevo luego de un cambio seguirá las mismas reglas anteriormente mencionadas. Las líneas de Acción siguen los reglamentos generales con ciertas excepciones en la MLB, como se mencionó antes.</p><p>En un partido de Béisbol de<strong> 7 entradas</strong>, todos los mercados se consideran decididos si:</p><ol><li>Al menos 7 entradas se completan</li><li>6.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera.</li></ol><p>La excepción es el mercado “Moneyline” o ganador que se considera decidido si:</p><ol><li>Al menos 5 entradas se completan</li><li>4.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera.</li></ol><p>En todos los demás casos, las apuestas serán canceladas.</p><p>La companía se reserva el derecho de no aceptar en su totalidad o parcialmente una apuesta sin dar una razón al cliente. Si una apuesta no se acepta, el dinero será reembolsado al cliente.</p><p>Antes del inicio de un evento, la companía se reserva,en su propia discreción, el derecho de cancelar en su totalidad o parcialmente una apuesta incluso luego de ser aceptada sin dar una razón al cliente.</p><p>Luego del inicio de un evento, la companía se reserva, en su propia discreción, el derecho de cancelar en su totalidad o parcialmente una apuesta incluso luego de ser liquidada, si hay una razon valida para esto, como:</p><p>● Error en la escritura(considerable) del evento,de las probabilidades o del tiempo de inicio del evento.</p><p>● El cliente intentó sobrepasar los límites de la companía (Ganancias potenciales) y del control de riesgo al realizar varias apuestas similares o idénticas, o abriendo más de una cuenta.</p><p>● El cliente está obteniendo ventaja de cualquier anuncio público o información reservada que determine el resultado de su apuesta.</p><p>● El cliente combinó apuestas relacionadas.</p><p>● El cliente está participando activamente en el evento, siendo jugador, árbitro, cuerpo técnico o tiene una relación directa o indirecta con los participantes del evento.</p><p>● La companía sufrió un error técnico al ofrecer cuotas o eventos erróneos.</p><p>● Cualquier otra razón válida comunicada debidamente al cliente por su petición.</p><p>Las ganancias máximas por tiquete son de ……(...... . EUR)</p><p>Nuestra companía se reserva el derecho de cancelar todas las apuestas de un evento, si hay algún cambio en referencia al terreno de juego del evento.</p><p>Nuestra empresa se reserva el derecho de cancelar todas las apuestas de un evento, si se presentan cambios radicales en las circunstancias de un evento como la duración del tiempo de juego, la distancia en una carrera o el número de periodos, etc.</p><p>En caso de que la companía tenga sospechas de que un evento disponible para apuestas deportivas presenta fraude o tiene una alta probabilidad de estar manipulado y el resultado de dicho evento, revelado antes para ciertos individuos, la companía se reserva el derecho de :</p><p>● Mantener tiquetes específicos sin liquidar</p><p>● Informar a las entidades y cuerpos reguladores sobre esto(ESSA, Sportradar, Federations), dependiendo de a cuál autoridad o entidad está relacionado el evento.</p><p>● Esperar a que un veredicto de dichas entidades sea revelado como retroalimentación.</p><p>● Liquidar o cancelar las apuestas en base al veredicto de dichas entidades.</p><p>En el evento y durante el proceso de realizar apuestas, y el sistema presente alguna interrupción de carácter técnico, la companía seguirá con las revisiones estándares tales como disponibilidad de fondos, corroboración de precios, etc y se reserva el derecho de aceptar o rechazar la apuesta respectivamente. En dicho caso, el cliente necesita iniciar sesión en cuanto el sistema se encuentre operando correctamente de nuevo y visitar su historial de apuestas para confirmar si la apuesta fue aceptada o no.</p><p>Cualquier decisión tomada por el VAR (<strong>Video Assistant Referee) </strong>que intervenga con alguna decisión sancionada por los oficiales en el terreno de juego( incluyendo decisiones pasivas como permitir que se siga jugando antes de revisar el VAR), por ende, alterando la situación del partido al momento en que la apuesta se realizó, resultará en la cancelación de todas las apuestas realizadas en el intervalo de tiempo desde el momento en que ocurrió el incidente hasta cuando el árbitro tome una decisión final luego de revisar el VAR, a menos que las probabilidades ofrecidas en la apuesta no sean afectadas por el uso del VAR o ya hayan sido ajustadas por el uso del VAR cuando se aceptó la apuesta. La Liquidación de todas las más apuestas que no tengan relación con el uso del VAR, incluyendo aquellas que hayan sido decididas por alguna jugada durante el incidente original y la decisión final del árbitro, que no están influenciadas/alteradas por el uso del VAR se mantendrán como apuestas válidas.</p><p>En función de resultados, las revisiones del VAR se consideran como sucedidas desde el momento del incidente original ya que el VAR sería utilizado eventualmente si la jugada no hubiera sido detenida inmediatamente. La companía se reserva el derecho de cambiar apuestas liquidadas previamente en el caso de que la liquidación anterior no sea precisa luego de la decisión final del árbitro, teniendo en cuenta que esta decisión haya sido realizada y comunicada antes del final del encuentro y/o intervalo de tiempo listado.</p><p>Dirigido a la experiencia del usuario y aun mejor resultado visual, nuestra companía aplica dos dígitos decimales para truncar las probabilidades en pantalla. Los cálculos de las probabilidades totales se realizan usando un redondeo de seis dígitos decimales, mientras que las ganancias totales siempre serán truncadas en el segundo dígito decimal. Cualquier diferencia notada, es producto del redondeo de cuotas explicado previamente.</p><p>2. Explicación de tipos de apuestas específicos</p><p>Anotadores: Primero, Ultimo, Anotador en cualquier momento</p><p>Las apuestas se aplican solo al tiempo regular. Los goles en propia puerta (según la autoridad oficial) se omiten o cuentan como \"sin goleador\" si el juego solo tiene \"goles en propia puerta\".</p><p>Apostar al primer goleador será ANULADO si un jugador nunca juega o entra al terreno de juego después de que se haya marcado el primer gol del partido, excepto en el caso de un gol en propia puerta, que se ignora.</p><p>Apostar al último goleador será ANULADO si un jugador nunca juega. La puntuación de jugador se aplica a cualquier jugador, independientemente de la hora en que ingresó al juego.</p><p>Apostar al goleador en cualquier momento se aplica a cualquier jugador involucrado en el juego, independientemente de la hora en que ingrese al juego. Las apuestas sobre el goleador en cualquier momento serán ANULADAS si un jugador nunca juega.</p><p>En caso de que se suspenda un partido pero haya al menos un Goleador, se aplican las apuestas al primer Goleador y las apuestas al último Goleador se anulan. Siempre que el mercado de goleadores de este jugador se establezca como ganador y las apuestas a otros jugadores se anularán.</p><p>Las reglas anteriores se refieren a los mercados \"Primer goleador / goleador en cualquier momento y 1X2\" y \"Primer goleador / goleador en cualquier momento y puntaje correcto\".</p><p>Otros mercados especiales para jugadores</p><p><i><strong>Futbol</strong></i></p><p><strong>Total de disparos del jugador / Disparos del jugador por encima/por debajo</strong>: las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de disparos del jugador a la portería / Disparos del jugador a la portería por encima/por debajo</strong>: las apuestas se aplican al tiempo reglamentario más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de cartas de jugador / cartas de jugador por encima / por debajo</strong>: las apuestas se aplican al tiempo regular más las horas extra (si las hubiera). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Jugador Total derribos / Jugador derribos por encima / por debajo</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de asistencias de jugador / Más / menos de asistencias de jugador</strong>: las apuestas se aplican al tiempo regular más las prórrogas (si las hubiera). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de pases del jugador / Pases del jugador más/menos:</strong> las apuestas aplican en el tiempo regular más el tiempo extra (Si corresponde). La tanda de penaltis no será tomada en cuenta para el resultado. Si el jugador mencionado no se encuentra en la formación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Jugadores vs Jugador (H2H) mercados</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i><strong>Baloncesto</strong></i></p><p>Todos los mercados especiales de jugadores de baloncesto se liquidan de acuerdo con la fuente oficial correspondiente. Posible tiempo de prórroga se incluye en la liquidación de todos los mercados disponibles.</p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i><strong>Hockey sobre hielo</strong></i></p><p><strong>En cualquier momento / Xº goleador (EN VIVO)</strong>: las apuestas se aplican solo al tiempo reglamentario. Todos los jugadores ofrecidos se consideran participantes. Si un jugador no incluido en la lista marca un gol, todas las apuestas a los jugadores incluidos en la lista son válidas. Para fines de liquidación, sólo se consideran los goles y las asistencias marcadas durante el tiempo reglamentario. Tenga en cuenta que si el marcador después del tiempo reglamentario es 0-0, todas las apuestas se liquidarán como pérdidas. Se mantendrán todas las apuestas sobre jugadores que estaban en la lista pero que abandonaron el juego antes de que terminara el partido (como lesiones o expulsiones).</p><p><strong>Jugador que anote un punto (EN VIVO)</strong>: las apuestas se aplican solo al tiempo reglamentario. Todos los jugadores ofrecidos se consideran corredores. Si un jugador no incluido en la lista obtiene un punto, todas las apuestas a los jugadores incluidos en la lista se mantienen. Para fines de liquidación, sólo se consideran los goles y las asistencias marcadas durante el tiempo reglamentario. Tenga en cuenta que si el marcador después del tiempo reglamentario es 0-0, todas las apuestas se liquidarán como pérdidas. Se mantendrán todas las apuestas sobre jugadores que estaban en la lista pero que abandonaron el juego antes de que terminara el partido (como lesiones o expulsiones).</p><p><strong>Total de asistencias del jugador (por encima / por debajo) (PREMATCH</strong>): las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de goles del jugador (por encima / por debajo) (PREMATCH):</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de atajadas del jugador (por encima/ por debajo) (PREMATCH)</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Puntos totales del jugador (por encima/ por debajo) (PREMATCH)</strong>: las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de disparos del jugador (por encima/ por debajo) (PREMATCH)</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de disparos del jugador a puerta (por encima/ por debajo) (PREMATCH)</strong>: las apuestas se aplican al tiempo regular más el tiempo extra (si lo hubiera). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i><strong>Béisbol</strong></i></p><p>Todos los mercados especiales de jugadores de béisbol se liquidan de acuerdo con la fuente oficial correspondiente. Las entradas adicionales potenciales jugadas se incluyen en la liquidación de todos los mercados disponibles..</p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> las apuestas se aplican al tiempo regular más la entrada adicional (si corresponde). Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidan como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i><strong>fútbol americano</strong></i></p><p>Todos los mercados especiales de jugadores de fútbol americano se liquidan de acuerdo con la fuente oficial correspondiente. Las horas extraordinarias potenciales se incluyen en la liquidación de todos los mercados disponibles.</p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i><strong>Regla “dead heat”</strong></i></p><p>Cuando no hay un ganador individual o hay un empate entre dos, tres o más competidores, la regla “Dead Heat” aplicará. Esto quiere decir que las cuotas se dividirán entre el número de participantes que hayan quedado en empate en esa posición.</p><p>Por ejemplo: Empate en Carreras de Caballos, o empate en el mercado “Jugador con más anotaciones” en un campeonato.</p><p>Dos jugadores empatan en el número de goles en un campeonato. Jugador 1 pagó 3.00 y jugador 2 pagó 1.5</p><p>Las cuotas serán divididas entre 2 y la apuesta será pagada regularmente.</p><p>Jugador 1 se pagará con cuotas de 3.00 / 2 = 1.5.</p><p>Jugador 2 se pagará con cuotas de 1.5 / 2 = 0.75.</p><p><i><strong>Reglas para mercados de clasificación</strong></i></p><p><strong>Se Clasificará: </strong>este mercado consiste en predecir cuál de los equipos pasará a la siguiente ronda del torneo. Para esta opción, se tendrán en cuenta los resultados tanto de la primera etapa como de la segunda etapa, incluyendo el tiempo extra y los tiros desde el punto penalti, en caso de que estos ocurran.</p><p><strong>Método de Victoria</strong></p><p>En este mercado se debe predecir cuál será la manera en la que se clasificará el equipo a la siguiente fase del torneo.</p><p>Por ejemplo, si la selección fué:</p><p><strong>Equipo Local Tiempo Extra OT (Juventus Turin Tiempo Extra (OT)): </strong>Se estará indicando que la definición del mercado ocurrirá durante el tiempo extra.</p><p><strong>Equipo Local Tiempo Regular (Juventus Turin Tiempo Regular): </strong>Se estará indicando que la definición del mercado ocurrirá durante el tiempo regular + el tiempo de reposición.</p><p><strong>Equipo Visitante Penaltis (Ajax Penaltis):</strong> Se estará indicando que la definición del mercado ocurrirá durante los tiros de penalti.</p><p><strong>Crear apuesta</strong></p><p>La función Crear Apuesta le da al jugador la oportunidad de combinar selecciones del mismo evento en un cupón de apuestas. Si una selección que participa en un cupón de la función Crear Apuesta es nulo/empujado, entonces todo el cupón de apuestas también es nulo/empujado, INDEPENDIENTEMENTE del resultado de las otras selecciones que participan en la función.</p><p>Por ejemplo, en el partido LA Lakers vs Toronto Raptors, creamos un cupón de Crear Apuesta con LA Lakers para ganar, Más de 220,5 puntos en el partido y Jugador X - Más de 29,5 puntos. En caso de que el jugador X no participe en el partido, la selección por sus puntos (más de 29,5) se declara nula. Por lo tanto, todo el el cupón de Crear Apuesta se liquida como nulo ya que la selección participa en una función Crear Apuesta.</p><p><i><strong>Fútbol Pago Anticipado</strong></i></p><p>Con la oferta Fútbol Pago Anticipado, puedes apostar antes del inicio del partido en el mercado 1X2 (ganador local o visitante) y si tu equipo tiene 2 goles de ventaja en cualquier momento del partido, ganas automáticamente ¡sin tener que esperar a que termine el partido!</p><p>La oferta es válida para apuestas simples, múltiples, de sistema y de creación de apuestas realizadas en el mercado 1X2 (ganador local o visitante) UNICAMENTE antes del inicio del partido y no durante el partido. La oferta no se aplica a las apuestas realizadas en la selección de empate en cada juego.</p><p>Su apuesta se paga en su totalidad si su equipo tiene dos goles de ventaja en cualquier momento del partido, independientemente del resultado final.</p><p>Esta oferta no se aplicará a las apuestas en las que se haya utilizado Cash Out. En múltiples, la concesión de la oferta para una/s determinada/s selección/es de la apuesta no se verá afectada retrospectivamente si el cliente cobra las apuestas de las selecciones restantes.</p><p>Todas las ganancias se acreditarán lo antes posible una vez que el equipo esté dos goles por delante. Esta oferta no se aplicará cuando una apuesta se haya cobrado por completo. Cuando una apuesta se haya cobrado parcialmente y su equipo tenga dos goles de ventaja, la apuesta se liquidará según la apuesta activa restante.</p><p>Si su apuesta se paga anticipadamente de acuerdo con esta oferta, no se volverá a pagar si su selección gana el partido.</p>",
                            "show": false
                        }
                    ],
                    "show": true
                },
                {
                    "order": "condiciones-especificas-por-deporte",
                    "title": "9. Condiciones Especificas por Deporte",
                    "parent": [
                        {
                            "order": "",
                            "title": "9.1 Fútbol",
                            "content": "<p><i><strong>FÚTBOL</strong></i></p><p><i><strong>MERCADOS PRINCIPALES</strong></i></p><p><strong>1X2:</strong> El cliente debe predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana)</p><p><strong>Doble oportunidad:</strong> El cliente debe predecir predecir el resultado de todo el partido. Hay 3 resultados posibles 1X ( al final del partido el equipo local gana o empata), X2 ( al final del partido el equipo visitante gana o empata), 12 (al final del partido gana equipo local o el equipo visitante)</p><p><strong>Total (Más /Menos): </strong>El cliente debe predecir si el número de goles marcados durante todo el partido estará por encima o por debajo de la línea estipulada<br><br>La opción Más (0.25): Si en el partido hay 0 goles PERDIDO | 1 gol GANADO</p><p>La opción Más (0.5) Si en el partido hay 0 goles PERDIDO | 1 gol GANADO</p><p>La opción Más (0.75): Si en el partido hay 0 goles PERDIDO | 1 gol GANA LA MITAD DEL PREMIO | 2 goles o más GANADO<br>La opción Más (1.0): Si en el partido hay 0 goles PERDIDO | 1 gol ANULADO | 2 goles o más GANADO<br>La opción Más (1.25): Si en el partido hay 0 goles PERDIDO | 1 gol PIERDE MITAD DEL PREMIO | 2 goles o más GANADO<br>La opción Mas (1.5): Si en el partido hay 0 y 1 gol PERDIDO | 2 goles o más GANADO<br>La opción Más (1.75): Si en el partido hay 0 y 1 gol PERDIDO | 2 goles GANA LA MITAD DEL PREMIO | 3 goles o más GANADO<br>La opción Más (2.0): Si en el partido hay 0 y 1 gol PERDIDO | 2 goles ANULADO | 3 goles o más GANADO<br>La opción Más (2.25):Si en el partido hay 0 y 1 gol PERDIDO | 2 goles PIERDE LA MITAD DEL PREMIO | 3 goles o más GANADO<br>La opción Más (2.5): Si en el partido hay 0, 1 y 2 goles PERDIDO | 3 goles o más GANADO<br>La opción Más (2.75): Si en el partido hay 0, 1 y 2 goles PERDIDO | 3 goles GANA LA MITAD DEL PREMIO| 4 goles o más GANADO<br>La opción Más (3.0): Si en el partido hay 0, 1 y 2 goles PERDIDO | 3 goles ANULADO| 4 goles o más GANADO<br>La opción Más (3.25): Si en el partido hay 0, 1 y 2 goles PERDIDO | 3 goles PIERDE LA MITAD DEL PREMIO| 4 goles o más GANADO<br>La opción Más (3.5): Si en el partido hay 0, 1, 2 Y 3 goles PERDIDO | 4 goles o más GANADO<br>La opción Más (3.75): Si en el partido hay 0, 1, 2 y 3 goles PERDIDO | 4 goles GANA LA MITAD DEL PREMIO| 5 goles o más GANADO<br>La opción Más (4.0): Si en el partido hay 0, 1, 2, 3 goles PERDIDO | 4 goles ANULADO| 5 goles o más GANADO<br>La opción Más (4.25): Si en el partido hay 0, 1, 2 y 3 goles PERDIDO | 4 goles PIERDE LA MITAD DEL PREMIO| 5 goles o más GANADO<br>La opción Más (4.5): Si en el partido hay 0, 1, 2 3 y 4 goles PERDIDO | 5 goles o más GANADO<br>La opción Más (4.75): Si en el partido hay 0, 1, 2, 3 y 4 goles PERDIDO | 5 goles GANA LA MITAD DEL PREMIO| 6 goles o más GANADO<br>La opción Más (5.0): Si en el partido hay 0, 1, 2, 3 y 4 goles PERDIDO | 5 goles ANULADO| 6 goles o más GANADO<br>La opción Más (5.25): Si en el partido hay 0, 1, 2, 3 y 4 goles PERDIDO | 5 goles PIERDE LA MITAD DEL PREMIO| 6 goles o más GANADO<br>La opción Más (5.5): Si en el partido hay 0, 1, 2, 3, 4 y 5 goles PERDIDO | 6 goles o más GANADO<br>La opción Más (5.75): Si en el partido hay 0, 1, 2, 3, 4 y 5 goles PERDIDO | 6 goles GANA LA MITAD DEL PREMIO| 7 goles o más GANADO<br>La opción Más (6.0): Si en el partido hay 0, 1, 2, 3, 4 y 5 goles PERDIDO | 6 goles ANULADO| 7 goles o más GANADO<br>La opción Más (6.25): Si en el partido hay 0, 1, 2 , 3, 4 y 5 goles PERDIDO | 6 goles PIERDE LA MITAD DEL PREMIO| 7 goles o más GANADO<br>La opción Más (6.5): Si en el partido hay 0, 1, 2, 3, 4, 5 y 6 goles PERDIDO | 7 goles o más GANADO<br>La opción Mas (6.75) Si en el partido hay 0,1, 2, 3, 4, 5, 6 PERDIDO | 7 goles GANA LA MITAD DEL PREMIO | 8 goles o más GANADO.<br>La opción Más (7.0): Si en el partido hay 0, 1, 2, 3, 4, 5 y 6 goles PERDIDO | 7 goles ANULADO| 8 goles o más GANADO<br>La opción Más (7.25): Si en el partido hay 0, 1, 2 , 3, 4, 5 y 6 goles PERDIDO | 7 goles PIERDE LA MITAD DEL PREMIO| 8 goles o más GANADO<br>La opción Más (7.5): Si en el partido hay 0, 1, 2, 3, 4, 5, 6 y 7 goles PERDIDO | 8 goles o más GANADO<br>La opción Más (7.75): Si en el partido hay 0, 1, 2, 3, 4, 5 y 7 goles PERDIDO | 8 goles GANA LA MITAD DEL PREMIO | 8 goles o más GANADO<br>La opción Más (8.0): Si en el partido hay 0, 1, 2, 3, 4, 5, 6 y 7 goles PERDIDO | 8 goles ANULADO| 9 goles o más GANADO<br>La opción Más (8.25): Si en el partido hay 0, 1, 2 , 3, 4, 5, 6 y 7 goles PERDIDO | 8 goles PIERDE LA MITAD DEL PREMIO| 9 goles o más GANADO<br>La opción Más (8.5): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles PERDIDO | 9 goles o más GANADO<br>La opción Más (8.75): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles PERDIDO | 9 goles GANA LA MITAD DEL PREMIO | 10 goles o más GANADO<br>La opción Más (9.0): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles PERDIDO | 9 goles ANULADO| 10 goles o más GANADO<br>La opción Más (9.25): Si en el partido hay 0, 1, 2 , 3, 4, 5, 6, 7 y 8 goles PERDIDO | 9 goles PIERDE LA MITAD DEL PREMIO| 10 goles o más GANADO<br>La opción Más (9.5): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 goles PERDIDO | 10 goles o más GANADO<br>La opción Más (9.75): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 goles PERDIDO | 10 goles GANA LA MITAD DEL PREMIO | 11 goles o más GANADO<br>La opción Más (10): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 goles PERDIDO | 10 goles ANULADO| 11 goles o más GANADO</p><p><strong>MENOS</strong><br>La opción Menos (0.5) Si en el partido hay 0 goles GANADO | 1 gol PERDIDO<br>La opción Menos (0.75): Si en el partido hay 0 goles GANADO | 1 gol PIERDE LA MITAD DEL PREMIO | 2 goles o más PERDIDO<br>La opción Menos (1.0): Si en el partido hay 0 goles GANADO | 1 gol ANULADO | 2 goles o más PERDIDO<br>La opción Menos (1.25): Si en el partido hay 0 goles GANADO | 1 gol GANA LA MITAD DEL PREMIO | 2 goles o más PERDIDO<br>La opción Menos (1.5): Si en el partido hay 0 Y 1 gol GANADO | 2 goles PERDIDO<br>La opción Menos (1.75): Si en el partido hay 0 Y 1 gol GANADO | 2 goles PIERDE LA MITAD DEL PREMIO | 3 goles o más PERDIDO<br>La opción Menos (2.0): Si en el partido hay 0 y 1 gol GANADO | 2 goles ANULADO | 3 goles o más PERDIDO<br>La opción Menos (2.25): Si en el partido hay 0 y 1 gol GANADO | 2 goles GANA LA MITAD DEL PREMIO | 3 goles o más PERDIDO<br>La opción Menos (2.5): Si en el partido hay 0, 1 y 2 goles GANADO | 3 goles o más PERDIDO<br>La opción Menos (2.75): Si en el partido hay 0, 1 y 2 goles GANADO | 3 goles PIERDE LA MITAD DL PREMIO | 4 goles o más PERDIDO<br>La opción Menos (3.0): Si en el partido hay 0, 1 y 2 goles GANADO | 3 goles ANULADO | 4 goles o más PERDIDO<br>La opción Menos (3.25): Si en el partido hay 0, 1 y 2 goles GANADO | 3 goles GANA LA MITAD DEL PREMIO | 4 goles o más PERDIDO<br>La opción Menos (3.5): Si en el partido hay 0, 1, 2 Y 3 goles GANADO | 4 goles o más PERDIDO .<br>La opción Menos (3.75): Si en el partido hay 0, 1, 2 y 3 goles GANADO | 4 goles PIERDE LA MITAD DEL PREMIO | 5 goles o más PERDIDO<br>La opción Menos (4.0): Si en el partido hay 0, 1, 2 y 3 goles GANADO | 4 goles ANULADO | 5 goles o más PERDIDO<br>La opción Menos (4.25): Si en el partido hay 0, 1, 2 y 3 goles GANADO | 4 goles GANA LA MITAD DEL PREMIO | 5 goles o más PERDIDO<br>La opción Menos (4.5): Si en el partido hay 0, 1, 2 3 y 4 goles GANADO | 5 goles o más PERDIDO<br>La opción Menos (4.75): Si en el partido hay 0, 1, 2, 3 y 4 goles GANADO | 5 goles PIERDE LA MITAD DEL PREMIO | 6 goles o más PERDIDO<br>La opción Menos (5.0): Si en el partido hay 0, 1, 2, 3 y 4 goles GANADO | 5 goles ANULADO | 6 goles o más PERDIDO<br>La opción Menos (5.25): Si en el partido hay 0, 1, 2, 3 y 4 goles GANADO | 5 goles GANA LA MITAD DEL PREMIO | 6 goles o más PERDIDO<br>La opción Menos (5.5): Si en el partido hay 0, 1, 2, 4 y 5 goles GANADO | 6 goles o más PERDIDO<br>La opción Menos (5.75): Si en el partido hay 0, 1, 2, 3, 4 y 5 goles GANADO | 6 goles PIERDE LA MITAD DEL PREMIO | 7 goles o más PERDIDO<br>La opción Menos (6.0): Si en el partido hay 0, 1, 2, 3, 4 y 5 goles GANADO | 6 goles ANULADO | 7 goles o más PERDIDO<br>La opción Menos (6.25): Si en el partido hay 0, 1, 2, 3, 4 y 5 goles GANADO | 6 goles GANA LA MITAD DEL PREMIO | 7 goles o más PERDIDO<br>La opción Menos (6.5): Si en el partido hay 0, 1, 2, 4, 5 y 6 goles GANADO | 7 goles o más PERDIDO<br>La opción Menos (6.75): Si en el partido hay 0, 1, 2, 3, 4, 5 y 6 goles GANADO | 7 goles PIERDE LA MITAD DEL PREMIO | 8 goles o más PERDIDO<br>La opción Menos (7.0): Si en el partido hay 0, 1, 2, 3, 4, 5 y 6 goles GANADO | 7 goles ANULADO | 8 goles o más PERDIDO<br>La opción Menos (7.25): Si en el partido hay 0, 1, 2, 3, 4, 5 y 6 goles GANADO | 7 goles GANA LA MITAD DEL PREMIO | 8 goles o más PERDIDO<br>La opción Menos (7.5): Si en el partido hay 0, 1, 2, 4, 5, 6 y 7 goles GANADO | 8 goles o más PERDIDO<br>La opción Menos (7.75): Si en el partido hay 0, 1, 2, 3, 4, 5, 6 y 7 goles GANADO | 8 goles PIERDE LA MITAD DEL PREMIO | 9 goles o más PERDIDO<br>La opción Menos (8.0): Si en el partido hay 0, 1, 2, 3, 4, 5, 6 y 7 goles GANADO | 8 goles ANULADO | 9 goles o más PERDIDO<br>La opción Menos (8.25): Si en el partido hay 0, 1, 2, 3, 4, 5, 6 y 7 goles GANADO | 8 goles GANA LA MITAD DEL PREMIO | 9 goles o más PERDIDO<br>La opción Menos (8.5): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles GANADO | 9 goles o más PERDIDO<br>La opción Menos (8.75): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles GANADO | 9 goles PIERDE LA MITAD DEL PREMIO | 10 goles o más PERDIDO<br>La opción Menos (9.0): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles GANADO | 9 goles ANULADO | 10 goles o más PERDIDO<br>La opción Menos (9.25): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7 y 8 goles GANADO | 9 goles GANA LA MITAD DEL PREMIO | 10 goles o más PERDIDO<br>La opción Menos (9.5): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 goles GANADO | 10 goles o más PERDIDO<br>La opción Menos (9.75): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 goles GANADO | 10 goles PIERDE LA MITAD DEL PREMIO | 11 goles o más PERDIDO<br>La opción Menos (10): Si en el partido hay 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 goles GANADO | 10 goles ANULADO | 11 goles o más PERDIDO</p><p><strong>¿Se clasifica?: </strong>El cliente debe predecir si el equipo seleccionado se clasificará para la siguiente fase del torneo.</p><p><strong>ambos equipos anotan (GG/NG):</strong> Hay dos posibles resultados: GG(ambos equipos marcan al menos un gol cada uno durante todo el partido), NG (uno o ambos no marcan ningún gol durante todo el partido)</p><p><strong>Apuesta sin empate (DNB):</strong> Este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, tiene que haber un equipo ganador. Lo que significa que, si el partido termina en empate, se reembolsará el dinero apostado. Por ejemplo,si un resultado final da como resultado un empate, la apuesta se liquidará como cancelada.</p><p><strong>Próximo gol: </strong>el cliente debe predecir qué equipo marcará el próximo gol, hay 3 posibles resultados: 1 (el equipo local marcará el próximo gol), ninguno marcará el siguiente gol, 2(el equipo visitante marcará el próximo gol)</p><p><strong>Que equipo ganara el resto del partido: </strong>Independientemente del puntaje real del evento, en el momento de realizar la apuesta, el puntaje del evento se considerara 0-0</p><p><strong>Marcador exacto:</strong> El cliente debe predecir el resultado exacto de un partido, es decir, el puntaje exacto al final de los 90 minutos del tiempo reglamentario, por ejemplo: (1-0,3-0,2-3…)</p><p><strong>Handicap (2 way): </strong>se debe predecir el ganador del juego con un margen de gol respectivo. A los goles propuestos en el handicap se le suma o resta la puntuación correcta, y luego de dicha operación se determinará quién gana: equipo local, empate o equipo visitante</p><p><strong>Handicap (3 way): </strong>El cliente debe predecir el resultado final del partido teniendo en cuenta el hándicap entre paréntesis.</p><p><i>Por ejemplo, (0:1) indica que el equipo visitante tiene un gol de ventaja, mientras que (1:0) indica que el equipo local tiene un gol de ventaja.</i></p><p> </p><p> </p><p><i>Tipos de apuestas disponibles en este mercado:</i></p><p><i>1H (0:1): El equipo local gana el partido con 2 o más goles de diferencia</i></p><p><i>XH (0:1): El equipo local gana el partido con 1 gol de diferencia</i></p><p><i>2H (0:1): El equipo visitante gana el partido o empata</i></p><p><i>1H (0:2): el equipo local gana el partido con 3 o más goles de diferencia</i></p><p><i>XH (0:2): el equipo local gana el partido con 2 goles de diferencia</i></p><p><i>2H (0:2): el equipo de visitante gana, empata o pierde el partido con un gol de diferencia</i></p><p><i>1H (0:3): el equipo local gana el partido con 4 o más goles de diferencia</i></p><p><i>XH (0:3): El equipo local gana el partido con 3 goles de diferencia</i></p><p><i>2H (0:3): el equipo de visitante gana el partido,empata o pierde con 1 o 2 goles de diferencia</i></p><p><i>1H (1:0): el equipo local gana o empata el partido</i></p><p><i>XH (1:0): el equipo visitante gana el partido con un gol de diferencia</i></p><p><i>2H (1:0): el equipo visitante gana el partido con 2 o más goles de diferencia</i></p><p><i>1H (2:0): el equipo local gana,empata o pierde el partido con 1 gol de diferencia</i></p><p><i>XH (2:0): el equipo visitante gana el partido con 2 goles de diferencia</i></p><p><i>2H (2:0): el equipo local gana el partido con 3 o más goles de diferencia</i></p><p><i>1H (3:0): el equipo local gana,empate o pierde con 1, o 2 goles de diferencia</i></p><p><i>XH (3:0): el equipo visitante gana el partido con 3 goles de diferencia</i></p><p><i>2H (3:0): el equipo visitante gana el partido con 4 o más goles de diferencia</i></p><p><strong>medio tiempo / tiempo completo: </strong>el cliente debe predecir el resultado del primer tiempo del partido junto al resultado del partido completo. Los posibles resultados son: (1/1, 1/X, 1/2, X/1, X/X, X/2, 2/1, 2/X y 2/2).</p><p><strong>Último gol: </strong>en este mercado el cliente debe predecir cuál de los dos equipos anotará el último gol del partido.</p><p>Si el cliente selecciona “ninguna opción” , estará indicando que no anotaran más goles.</p><p><strong>Margen de victoria:</strong> En este tipo de apuestas, el cliente debe predecir qué equipo ganará y su margen de victoria</p><p><strong>Local Total: </strong>El cliente debe predecir si el total de goles marcados por el equipo local durante todo el partido serán por encima o por debajo de la línea indicada.</p><p><strong>Visitante Total: </strong>El cliente debe predecir si el total de goles marcados por el equipo visitante durante todo el partido serán por encima o por debajo de la línea indicada.</p><p><strong>Goles exactos:</strong> El cliente debe predecir los goles exactos anotados durante el partido, los posibles resultados son 0 goles,1,2,3,4,+5</p><p><strong>Qué equipo marcará:</strong> Se debe predecir si solo el equipo local,el equipo visitante, ambos equipos o ninguno marcará en el partido. Consisten en seleccionar SI o NO, en algunas de las diferentes opciones que aparecen en el mercado. .</p><p><strong>Apuesta sin local (1 sin apuesta):</strong> Se debe predecir si el equipo visitante ganará el partido o si el partido termina en empate. Si el equipo local gana el partido, la apuesta será considerada como cancelada.</p><p><strong>Apuesta sin visitante (2 sin apuesta):</strong> Se debe predecir si el equipo local ganará el partido o si el partido termina en empate. Si el equipo visitante gana el partido, la apuesta será considerada como cancelada</p><p><strong>Goles exacto local:</strong> Se debe predecir el número exacto de goles marcados por el equipo local durante el partido. Los posibles resultados son: 0 goles, 1,2,3+.</p><p><strong>Goles exacto visitante:</strong> Se debe predecir el número exacto de goles marcados por el equipo visitante durante el partido. Los posibles resultados son: 0 goles, 1,2,3+</p><p><strong>Par/Impar:</strong> Se debe predecir si el resultado del partido es par o impar, si el partido termina 0-0, el mercado ganador será el par.</p><p><strong>Par/Impar Local: </strong>Se debe predecir si el número de goles anotados por el equipo local será par o impar. Si el equipo local no anotó ningún gol la selección ganadora será par.</p><p><strong>Par/Impar Visitante:</strong> Se debe predecir si el número de goles anotados por el equipo visitante será par o impar. Si el equipo visitante no anotó ningún gol la selección ganadora será par.</p><p><strong>Local anota: </strong>Se debe predecir si el equipo local anotará al menos un gol durante el partido.</p><p><strong>El visitante anota: </strong>Se debe predecir si el equipo visitante anotará al menos un gol durante el partido.</p><p><strong>Multigoles: </strong>Se debe predecir el número de goles marcados durante el partido basado en en los diferentes rangos ofrecidos.</p><p><strong>Local Multigoles: </strong>Se debe predecir el número de goles anotados por el equipo local durante el partido basado en los diferentes rangos ofrecidos.</p><p><strong>Visitante Multigoles: </strong>Se debe predecir el número de goles anotados por el equipo visitante durante el partido basado en los diferentes rangos ofrecidos</p><p><strong>Siguiente forma de anotar: </strong>Se debe predecir el tipo de anotación entre los siguientes resultados.</p><p>➔Tiro libre: el gol debe ser marcado directamente desde el tiro libre o desde un tiro de esquina para calificar como gol de tiro libre. Los tiros desviados cuentan siempre que se conceda el gol a quien cobró el tiro libre o el saque de esquina</p><p>➔ Penalti: El gol debe ser marcado directamente de un penalti. Goles después de un rebote de un penalti fallido no se tendrán en cuenta.</p><p>➔ Gol en propia puerta: si el gol es considerado como un gol en propia puerta</p><p>➔ Cabezazo : El último toque del goleador debe ser con la cabeza.;</p><p>➔ Disparo: el gol debe ser anotado por cualquier parte del cuerpo que no sea la cabeza y los otros tipos no se aplican.</p><p>➔ Sin gol.</p><p><strong>¿Habrá tanda de penales?: </strong>Se debe predecir si en el partido habrá una tanda de penaltis</p><p><strong>Tiempo extra Si/No</strong>:<strong> </strong>Se debe predecir si el partido pasara para periodo de prórroga</p><p><strong>Método de victoria : </strong>se debe predecir el método de victoria del equipo local o del equipo visitante. se ofrecen seis (6) resultados posibles:</p><p>– Equipo local gana en el tiempo reglamentario</p><p>– Equipo visitante gana en el tiempo reglamentario</p><p>– Equipo local gana en el tiempo complementario</p><p>– Equipo visitante gana en el tiempo complementario</p><p>– Equipo local gana tras los tiros desde el punto penal</p><p>– Equipo visitante gana tras los tiros desde el punto penal</p><p><strong>Prórroga y gol: </strong>Se debe predecir si el partido pasará a la prórroga y si habrá gol o no en el tiempo de prórroga <strong>Prórroga - 1x2: </strong>Se debe predecir el resultado 1x2 de la prórroga.</p><p><strong>Prórroga - Que equipo ganara el resto del partido : </strong>independientemente del puntaje real del evento, en el momento de realizar la apuesta, el puntaje del evento se considerará 0-0. El mercado considerará solo el tiempo de prórroga.</p><p><strong>Prórroga - próximo en anotar: </strong>Se debe predecir qué equipo anotará durante el tiempo de prórroga, Hay 3 posibles resultados: 1(equipo local anotara),X(los equipos empatan), 2(equipo visitante anotara)</p><p><strong>Prórroga - total: </strong>Se debe predecir si el total de goles anotados durante la prórroga estará por encima o por debajo del margen ofrecido.</p><p><strong>Prórroga – handicap: </strong>Se debe predecir el resultado final de la prórroga, teniendo en cuenta el hándicap entre paréntesis. Por ejemplo,(0:1) indica que el equipo visitante tiene un gol de ventaja, mientras que (1:0) indica que el equipo local tiene un gol de ventaja.</p><p><strong>Prórroga - Marcador correcto: </strong>Se debe predecir el marcador correcto de la prórroga.</p><p><strong>Tanda de penaltis- ganador: </strong>se debe predecir qué equipo ganará la tanda de penaltis (1-2).</p><p><strong>Tanda de penaltis - X penalti anotado:</strong> Se debe predecir si el penalti “X” se anotará o no durante la tanda de penaltis</p><p><strong>Tanda de penaltis - X Gol: </strong>Se debe predecir qué equipo anotará el gol X durante la tanda de penaltis. 3 posibles resultados: 1, X, 2.</p><p><strong>Tanda de penaltis - margen de victoria: </strong>Se debe predecir el margen de victoria para la tanda de penaltis para el equipo local o visitante, o si el partido termina en empate<strong>.</strong></p><p><strong>Tanda de penaltis – total: </strong>Se debe predecir si el total de goles anotados durante la tanda de penaltis serán por encima o por debajo del margen ofrecido.</p><p><strong>Tanda de penaltis- total del equipo local: </strong>Se debe predecir si el total de goles anotados por el equipo local durante la tanda de penaltis serán por encima o por debajo del margen ofrecido.</p><p><strong>Tanda de penaltis- total del equipo visitante: </strong>Se debe predecir si el total de goles anotados por el equipo visitante durante la tanda de penaltis serán por encima o por debajo del margen ofrecido.</p><p><strong>Tanda de penaltis - goles exactos: </strong>Se debe predecir el número exacto de goles anotados durante la tanda de penaltis. Hay 7 posibles resultados: 0-4,5,6,7,8,9,10+.</p><p><strong>Tanda de penaltis - Par/Impar: </strong>Se debe predecir si el número de goles anotados durante la tanda de penales es par o impar.</p><p><strong>Tanda de penaltis - Local Par/Impar: </strong>Se debe predecir si el número de goles anotados por el equipo local durante la tanda de penales es par o impar</p><p><strong>Tanda de penaltis - Visitante Par/Impar: </strong>Se debe predecir si el número de goles anotados por el equipo visitante durante la tanda de penales es par o impar.</p><p><strong>Tanda de penaltis - marcador exacto: </strong>Se debe predecir el marcador exacto durante la tanda de penaltis.</p><p><strong>Tanda de penaltis - Ganador y total :</strong> Se debe predecir el ganador de la tanda de penaltis y a su vez con el número de goles anotados teniendo en cuenta el margen ofrecido</p><p> </p><p><i><strong>Mercados de Primera Mitad</strong></i></p><p> </p><p><strong>Primera Mitad - 1x2: </strong>Se debe predecir cuál será el resultado únicamente de la primera mitad. Los goles marcados en la segunda mitad no se tendrán en cuenta.</p><p><strong>Primera Mitad - Totales: </strong>Se debe predecir si el número total de goles marcados únicamente durante la primera mitad, estarán por encima o por debajo del margen indicado.</p><p><strong>Primera Mitad - Qué equipo ganará el resto: </strong>Sin importar cuál sea el resultado actual del evento, en el momento de realizar la apuesta el resultado del evento será considerado como 0-0. El mercado solo considera la primera mitad.</p><p><strong>Primera Mitad - Próximo en anotar: </strong>Se debe predecir qué equipo durante la primera mitad anotará el siguiente gol. Existen 3 posibles resultados: 1 (anota el equipo local), X (ambos equipos empatan), 2 (anota el equipo visitante).</p><p><strong>Primera Mitad - Doble oportunidad: </strong>Se debe predecir cuál será el resultado de la primera mitad. Existen 3 posibles resultados: 1X (al finalizar la primera mitad, el equipo local gana o empata), X2 (al finalizar la primera mitad, el equipo visitante gana o empata), 12 (al finalizar la primera mitad, el equipo local gana o el visitante gana).</p><p><strong>Primera Mitad - Apuesta sin empate: </strong>Se debe predecir qué equipo ganará únicamente la primera mitad. Si la primera mitad termina en empate para ambos equipos, la apuesta será retornada.</p><p><strong>Primera Mitad Handicap (2 Way): </strong>Se debe predecir cuál será el resultado final de la primera mitad, tomando en cuenta el handicap especificado en los paréntesis.</p><p><strong>Primera Mitad Handicap (3 Way): </strong>Se debe predecir cuál será el resultado final de la primera mitad, tomando en cuenta el handicap especificado en los paréntesis. Por ejemplo, (0:1) quiere decir que el equipo Visitante tiene un gol de ventaja, así como (1:0) quiere decir que el equipo Local tiene un gol de ventaja.</p><p><strong>Primera Mitad - Local goles exactos: </strong>Se debe predecir cuál será la cantidad exacta de goles del equipo Local durante la primera mitad del evento.</p><p><strong>Primera Mitad - Visitante goles exactos: </strong>Se debe predecir cuál será la cantidad exacta de goles del equipo Visitante durante la primera mitad del evento.</p><p><strong>Primera Mitad - par/impar: </strong>Se debe predecir si el número de goles marcados únicamente durante la primera mitad, serán pares o impares. El resultado 0-0 es considerado como par.</p><p><strong>Primera Mitad - Ambos equipos anotan: </strong>Se debe predecir que ambos equipos anotarán por lo menos un gol cada uno durante la primera mitad del evento, O que un solo equipo o ambos equipos NO anotarán ningún gol durante la primera mitad.</p><p><strong>Primera Mitad - Local portería a cero: </strong>Portería a cero es un término utilizado para describir a un equipo al cual no le ha anotado ningún gol. Se debe predecir si el equipo Local mantendrá la portería a cero goles anotados durante la primera mitad del evento.</p><p><strong>Primera mitad- Visitante portería a cero: </strong>Portería a cero es un término utilizado para describir a un equipo al cual no se le ha anotado ningún gol. Se debe predecir si el equipo Visitante mantendrá la portería a cero goles anotados durante la primera mitad del evento.</p><p><strong>Primera Mitad - 1x2 &amp; ambos equipos anotan: </strong>Se debe predecir el resultado de la primera mitad del evento y además que ambos equipos anotarán o no únicamente durante la primera mitad.</p><p><strong>Primera mitad - 1x2 total: </strong>Se debe predecir la combinación del resultado de la primera mitad del evento más si los goles durante la primera mitad estarán por encima o por debajo del margen seleccionado. Existen 6 posibles resultados:</p><p>Local &amp; Mas de: El equipo Local gana la primera mitad y el total de goles es más del margen seleccionado.</p><p>Local &amp; Menos de: El equipo Local gana la primera mitad y el total de goles es menos del margen seleccionado</p><p>Empate &amp; Más de: La primera mitad termina en empate y el total de goles es más del margen seleccionado.</p><p>Empate &amp; Menos de: La primera mitad termina en empate y el total de goles es menos del margen seleccionado.</p><p>Visitante &amp; Más de: El equipo visitante gana la primera mitad y el total de goles es más del margen seleccionado.</p><p>Visitante &amp; Menos de: El equipo visitante gana la primera mitad y el total de goles es menos del margen seleccionado.</p><p><strong>Primera Mitad - Marcador exacto: </strong>Se debe predecir cuál será el marcador exacto de la primera mitad del evento.</p><p><strong>Primera Mitad - multigoles: </strong>Se debe predecir el número de goles marcados durante la primera mitad del evento basándose en los diferentes rangos ofrecidos.</p><p><strong>Primera mitad - Local anotará: </strong>Se debe predecir que en algún momento el equipo Local anotará un gol durante la primera mitad del evento.</p><p><strong>Primera Mitad - Visitante anotará: </strong>Se debe predecir que en algún momento el equipo Visitante anotará un gol durante la primera mitad del evento.</p><p><strong>Primera Mitad - Doble oportunidad &amp; GG/NG: </strong>Se debe predecir el resultado de la primera mitad del evento con 3 posibles doble resultados (1X, 12, X2), además de si ambos equipos marcarán o no marcarán.</p><p><strong>Primera Mitad - 1x2 o GG/NG: </strong>Se debe predecir el resultado de la primera mitad del partido O si ambos equipos, o ningún equipo anotará durante la primera mitad del evento.</p><p> </p><p><i><strong>Mercados de Segunda Mitad</strong></i></p><p> </p><p><strong>Segunda Mitad - 1x2: </strong>Se debe predecir el resultado únicamente de la segunda mitad del evento. Los goles marcados en la primera mitad no se tendrán en cuenta.</p><p><strong>Segunda Mitad - Totales: </strong>Se debe predecir si el total de goles marcados únicamente durante la segunda mitad estarán por encima o por debajo del margen indicado.</p><p><strong>Segunda Mitad - Qué equipo ganará el resto: </strong>Sin importar cuál sea el resultado actual del evento en el momento de realizar la apuesta el resultado del evento será considerado como 0-0. El mercado solo considera la segunda mitad.</p><p><strong>Segunda Mitad - Próximo en anotar: </strong>Se debe predecir qué equipo durante la segunda mitad anotará el siguiente gol. Existen 3 posibles resultados: 1 (anota el equipo local), X (ambos equipos empatan), 2 (anota el equipo visitante).</p><p><strong>Segunda Mitad - Doble oportunidad: </strong>Se debe predecir cuál será el resultado de la primera mitad. Existen 3 posibles resultados: 1X (al finalizar la primera mitad, el equipo local gana o empata), X2 (al finalizar la primera mitad, el equipo visitante gana o empata), 12 (al finalizar la primera mitad, el equipo local gana o el visitante gana).</p><p><strong>Segunda Mitad - Apuesta sin empate: </strong>Se debe predecir qué equipo ganará únicamente la segunda mitad. Si la segunda mitad termina en empate para ambos equipos, la apuesta será retornada.</p><p><strong>Segunda Mitad Handicap (2 Way): </strong>Se debe predecir cuál será el resultado final de la segunda mitad, tomando en cuenta el handicap especificado en los paréntesis.</p><p><strong>Segunda Mitad Handicap (3 Way): </strong>Se debe predecir cuál será el resultado final de la segunda mitad, tomando en cuenta el handicap especificado en los paréntesis. Por ejemplo, (0:1) quiere decir que el equipo Visitante tiene un gol de ventaja, así como (1:0) quiere decir que el equipo Local tiene un gol de ventaja.</p><p><strong>Segunda Mitad - Local goles exactos: </strong>Se debe predecir cuál será la cantidad exacta de goles del equipo Local durante la primera mitad del evento.</p><p><strong>Segunda Mitad - Visitante goles exactos: </strong>Se debe predecir cuál será la cantidad exacta de goles del equipo Visitante durante la primera mitad del evento.</p><p><strong>Segunda Mitad - par/impar: </strong>Se debe predecir si el número de goles marcados únicamente durante la segunda mitad, serán pares o impares. El resultado 0-0 es considerado como par.</p><p><strong>Segunda Mitad - Ambos equipos anotan: </strong>Se debe predecir que ambos equipos anotarán por lo menos un gol cada uno durante la segunda mitad del evento, O que un solo equipo o ambos equipos no anotarán ningún gol durante la segunda mitad.</p><p><strong>Segunda Mitad - Local portería a cero: </strong>Portería a cero es un término utilizado para describir a un equipo al cual no le ha anotado ningún gol. Se debe predecir si el equipo Local mantendrá la portería a cero goles anotados durante la segunda mitad del evento.</p><p><strong>Segunda mitad- Visitante portería a cero: </strong>Portería a cero es un término utilizado para describir a un equipo al cual no se le ha anotado ningún gol. Se debe predecir si el equipo Visitante mantendrá la portería a cero goles anotados durante la segunda mitad del evento.</p><p><strong>Segunda Mitad - 1x2 &amp; ambos equipos anotan: </strong>Se debe predecir el resultado de la segunda mitad del evento y además que ambos equipos marcarán únicamente durante la segunda mitad.</p><p><strong>Segunda mitad - 1x2 total: </strong>Se debe predecir la combinación del resultado de la primera mitad del evento más si los goles durante la primera mitad estarán por encima o por debajo del margen seleccionado. Existen 6 posibles resultados:</p><p>1 &amp; Mas de: El equipo Local gana la segunda mitad y el total de goles es más del margen seleccionado.</p><p>1&amp; Menos de: El equipo Local gana la segunda mitad y el total de goles es menos del margen seleccionado</p><p>X &amp; Más de: La segunda mitad termina en empate y el total de goles es más del margen seleccionado.</p><p>X &amp; Menos de: La segunda mitad termina en empate y el total de goles es menos del margen seleccionado.</p><p>2 &amp; Más de: El equipo visitante gana la segunda mitad y el total de goles es más del margen seleccionado.</p><p>2 &amp; Menos de: El equipo visitante gana la segunda mitad y el total de goles es menos del margen seleccionado.</p><p><strong>Segunda Mitad - Marcador exacto: </strong>Se debe predecir cuál será el marcador exacto de la primera mitad del evento. </p><p><strong>Primera Mitad - multigoles: </strong>Se debe predecir el número de goles anotados durante la segunda mitad del evento basándose en los diferentes rangos ofrecidos.</p><p><strong>Segunda Mitad Local anotará: </strong>Se debe predecir que en algún momento el equipo Local marcará un gol durante la segunda mitad del evento.</p><p><strong>Segunda Mitad Visitante anotará: </strong>Se debe predecir que en algún momento el equipo Visitante anotará un gol durante la segunda mitad del evento.</p><p><strong>Segunda Mitad - Doble oportunidad &amp; GG/NG: </strong>Se debe predecir el resultado de la segunda mitad del evento con 3 posibles doble resultados (1X, 12, X2), además de si ambos equipos marcarán o no marcarán.</p><p><strong>Segunda Mitad - 1x2 o GG/NG: </strong>Se debe predecir el resultado de la segunda mitad del partido O si ambos equipos, o ningún equipo marcará durante la segunda mitad del evento.</p><p> </p><p><i><strong>Mercados Combinados</strong></i></p><p> </p><p><strong>1X2 &amp; GG: </strong>Se debe predecir si ambos equipos marcarán, junto con el resultado final del evento. 6 posibles resultados son ofrecidos:</p><p>1 &amp; GG: El equipo local gana y ambos equipos marcan gol.</p><p>X &amp; GG: Ambos equipos empatan y ambos equipos marcan gol.</p><p>2 &amp; GG: El equipo visitante gana y ambos equipos marcan gol.</p><p>1 &amp; NG: El equipo local gana y al menos, uno de los dos no marca gol.</p><p>X &amp; NG: Ambos equipos empatan y al menos uno de los dos equipos no marca gol.</p><p>2 &amp; NG: El equipo visitante gana y al menos, uno de los dos no marca gol.</p><p><strong>Total &amp; GG/NG</strong>: Se debe predecir el mercado Total (Más de / Menos de, goles) junto con predecir el si ambos equipos marcan al menos un gol durante todo el evento (GG) o que uno o ninguno de los dos equipos marca ningún gol durante todo el evento (NG). Son ofrecidos 4 posibles: Más de &amp; GG, Más de NG, Menos de GG, Menos de NG.</p><p><strong>1X2 &amp; Más de/Menos de: </strong>Se debe predecir el resultado del evento junto con el número de goles marcados durante el evento teniendo en cuenta el margen de goles seleccionado. Son posibles 6 resultados: 1 &amp; Más de ‘’X’’, X &amp; Más de ‘’X’’, 2&amp;Más de ‘’X’’, 1&amp;Menos de ‘’X’’, X&amp;Menos de ‘’X’’, 2&amp;Menos de ‘’X’’.</p><p><strong>Primer tiempo/Tiempo completo &amp; GG/NG: :</strong> Se debe predecir el resultado del primer tiempo/tiempo completo del evento junto con predecir si ambos equipos marcan o no marcan. Son posibles 4 resultados:</p><p>no/no, si/no, si/si, no/si.</p><p><strong>Total 2.5 o GG/NG: </strong>Se debe predecir si el número total de goles en el evento es Más de o Menos de la cantidad de margen seleccionada O si ambos equipos, un solo equipo o ningún equipo anotará durante el evento. Son posibles 4 resultados:</p><p>Más de 2.5 o NG, Más de 2.5 o GG, Menos de 2.5 o NG, Menos de 2.5 o GG</p><p><strong>1x2 &amp; Total (Más de/Menos de) &amp; GG/NG : </strong>Se debe predecir la combinación del resultado final del evento, más el resultado del mercado ambos equipos, un solo equipo, o ningún equipo anota gol, además de si el resultado será más de o menos del margen especificado.</p><p><strong>1x2 &amp; Multigoles {Margen}: </strong>Se debe predecir la combinación del resultado final del evento, además de si rango total de goles marcados durante el evento estará dentro del margen especificado.</p><p><strong>Ambos equipos anotan + Multigoles {Margen}: </strong>Se debe predecir la combinación del mercado ambos equipos anotan, además de si el rango de goles totales anotados durante el evento estará entre el rango de goles indicado.</p><p><strong>Primer gol &amp; 1x2 (Matchflow): </strong>Se debe predecir si el final del evento será local, empate o visitante, junto con cuál equipo anotará el primer gol del evento, Son posibles 7 resultados</p><p>Local-Primer gol &amp; 1</p><p>Local-Primer gol &amp; X</p><p>Local-Primer gol &amp; 2</p><p>Visitante-Primer gol &amp; 1</p><p>Visitante-Primer gol &amp; X</p><p>Visitante-Primer gol &amp; 2</p><p>Sin goles (0-0).</p><p><strong>Doble oportunidad (Evento) &amp; Primera mitad GG/NG: </strong>Se debe predecir el resultado del evento teniendo en cuenta 3 posibles resultados con doble oportunidad (1X, 12, 2X) y si ambos equipos, un solo equipo o ningún equipo anotan únicamente durante la primera mitad del evento.</p><p><strong>Doble oportunidad (Evento) &amp; Segunda mitad GG/NG: </strong>Se debe predecir el resultado del evento teniendo en cuenta 3 posibles resultados con doble oportunidad (1X, 12, 2X) y si ambos equipos, un solo equipo o ningún equipo anotan únicamente durante la segunda mitad del evento.</p><p><strong>Doble oportunidad &amp; GG/NG: </strong>Se debe predecir el resultado del evento teniendo en cuenta 3 posibles resultados con doble oportunidad (1X, 12, 2X) además de si ambos o ninguno de los equipos anotan.</p><p><strong>Doble oportunidad &amp; Total: </strong>Se debe predecir el resultado del evento teniendo en cuenta 3 posibles resultados con doble oportunidad (1X, 12, 2X) además de si el total de goles estará por encima o por debajo del margen seleccionado.</p><p><strong>Medio tiempo/Tiempo completo &amp; Total: </strong>Se debe predecir los resultados del medio tiempo/tiempo completo, además de si el total de goles estará por encima o por debajo del margen seleccionado.</p><p><strong>Medio tiempo/Tiempo completo &amp; Primera mitad totales: </strong>Se debe predecir los resultados del medio tiempo/tiempo completo, además de si el total de goles durante la primera mitad del evento estará por encima o por debajo del margen seleccionado.</p><p><strong>Medio tiempo/Tiempo completo &amp; Goles exactos: </strong>Se debe predecir el resultado del primer tiempo/tiempo completo del evento junto con predecir cuál será el marcador exacto durante todo el evento.</p><p><strong>3 Posibilidades combinadas : (Local o más de, Local o menos de, Empate o más de, Empate o menos de, Visitante o más de, Visitante o menos de, Local o GG, Empate o GG, Visitante o GG, Local o alguna portería a cero, Empate o algúna portería a cero, Visitante o alguna portería a cero): </strong>Se debe predecir el resultado del evento O si ambos equipos, un equipo o ningún equipo marcará en el partido O la cantidad de goles del evento.</p><p><strong>Primera mitad Menos de &amp; Segunda mitad Menos de: </strong>Se debe predecir tanto que el número de goles de la primera mitad estará por debajo del margen especificado como que el número de goles de la segunda mitad estará por debajo del margen especificado.</p><p>Ejemplo: Menos de 1,5/Menos de 1,5. Esta selección es ganadora si el total de goles durante la primera mitad está por debajo de 1,5, además de si el total de goles durante la segunda mitad está por debajo de 1,5.</p><p><strong>Primera mitad Menos de &amp; Segunda mitad Más de: </strong>Se debe predecir tanto que el número de goles de la primera mitad estará por debajo del margen especificado como que el número de goles de la segunda mitad estará por encima del margen especificado.</p><p>Ejemplo: Menos de 1,5/Más de 1,5. Esta selección es ganadora si el total de goles durante la primera mitad está por debajo de 1,5, además de si el total de goles durante la segunda mitad está por encima de 1,5.</p><p><strong>Primera mitad Más de &amp; Segunda mitad menos de: </strong>Se debe predecir tanto que el número de goles de la primera mitad estará por encima del margen especificado como que el número de goles de la segunda mitad estará por debajo del margen especificado.</p><p>Ejemplo: Más de 1,5/Menos de 1,5. Esta selección es ganadora si el total de goles durante la primera mitad está por encima de 1,5, además de si el total de goles durante la segunda mitad está por debajo de 1,5.</p><p><strong>Primera mitad Más de &amp; Segunda mitad Más de: </strong>Se debe predecir tanto que el número de goles de la primera mitad estará por encima del margen especificado como que el número de goles de la segunda mitad estará por encima del margen especificado.</p><p>Ejemplo: Más de 1,5/Menos de 1,5. Esta selección es ganadora si el total de goles durante la primera mitad está por encima de 1,5, además de si el total de goles durante la segunda mitad está por encima de 1,5.</p><p><strong>Medio Tiempo O Tiempo Completo: </strong>Se debe predecir el resultado ganador del evento o de la mitad del mismo. Solo es necesario que ocurra para que la selección sea ganadora.</p><p><strong>1X2 Medio Tiempo/Doble Oportunidad Tiempo Completo: </strong>Se debe predecir el resultado del medio tiempo junto con tres posibles resultados de Doble Oportunidad del evento (1X, 2X, 12).</p><p><strong>Doble Oportunidad Medio Tiempo/1X2 Tiempo Completo:</strong> Se debe predecir el resultado de Doble Oportunidad de la primera mitad junto con el resultado final del evento.</p><p><strong>Doble Oportunidad Medio Tiempo/Doble Oportunidad Tiempo Completo: </strong>Se debe predecir el resultado ganador de doble oportunidad de ambos, tanto Medio Tiempo como Tiempo Completo.</p><p><strong>Doble oportunidad o Ambos equipos marcan:</strong> Tienes que pronosticar el resultado ganador del partido (Doble Oportunidad) O si ambos, uno o ninguno de los equipos marcarán en el partido. Solamente tiene que ocurrir una predicción para que la apuesta sea ganadora.</p><p><strong>Doble Oportunidad o Más de/Menos de:</strong> Tienes que pronosticar el resultado ganador del partido (Doble Oportunidad) O si ambos, uno o ninguno de los equipos marcarán en el partido. Solo tiene que ocurrir una predicción para que la apuesta sea ganadora</p><p><strong>Más de {Total} {$Competitor1} + Más de {Total} {$Competitor2}: </strong>Tienes que pronosticar si el número de goles en el equipo local será superior al margen indicado, más si el número de goles en el equipo visitante será superior al margen indicado.</p><p><strong>Más de {Total} {$Competitor1} + Menos de {Total} {$Competitor2}: </strong>Tienes que pronosticar si el número de goles en el equipo local será superior al margen indicado, más si el número de goles en el equipo visitante será inferior al margen indicado.</p><p><strong>Menos de {Total} {$Competitor1} + Menos de {Total} {$Competitor2}:</strong> Tienes que pronosticar si el número de goles en el equipo local será inferior al margen indicado, más si el número de goles en el equipo visitante será inferior al margen indicado</p><p><strong>Menos de {Total} {$Competitor1} + Más de {Total} {$Competitor2}: </strong>Tienes que pronosticar si el número de goles en el equipo local será inferior al margen indicado, más si el número de goles en el equipo visitante será superior al margen indicado.</p><p><i><strong>MERCADOS DE TIRO DE ESQUINA</strong></i></p><p><strong>Tiros de esquina 1x2: </strong>Se debe predecir qué equipo registrará el mayor número de tiros de esquina en el encuentro. Los tiros de esquina que sean concedidos, pero no realizados no serán tenidos en cuenta para la liquidación de apuestas.</p><p><strong>Siguiente Tiro de esquina: </strong>Se debe predecir qué equipo registrará el siguiente tiro de esquina.</p><p><strong>Último Tiro de Esquina: </strong>Se debe predecir qué equipo registrará el último tiro de esquina del encuentro.</p><p><strong>Handicap en Tiros de Esquina: </strong>Se debe predecir qué equipo registrará el mayor número de córners en el encuentro tomando en cuenta el margen del handicap ofrecido.</p><p><strong>Total de tiros de Esquina: </strong>Se debe predecir si el total de tiros de esquina del encuentro es mayor o menor que el margen total ofrecido.</p><p><strong>Total de tiros de Esquina del equipo Local: </strong>Se debe predecir si el total de tiros de esquina del encuentro registrados por el equipo Local es mayor o menor que el margen total ofrecido.</p><p><strong>Total de tiros de Esquina del equipo Visitante: </strong>Se debe predecir si el total de tiros de esquina del encuentro registrados por el equipo Visitante es mayor o menor que el margen total ofrecido.</p><p><strong>Rango de tiros de esquina: </strong>Se debe predecir el rango del número de tiros de esquina totales en el encuentro.</p><p><strong>Rango de tiros de esquina del equipo local: </strong>Se debe predecir el rango del número de tiros de esquina totales registrados por el equipo local en el encuentro.</p><p><strong>Rango de tiros de esquina del equipo visitante: </strong>Se debe predecir el rango del número de tiros de esquina totales registrados por el equipo visitante en el encuentro.</p><p><strong>Tiros de esquina par/impar:</strong>. Se debe predecir si el total de tiros de esquina del encuentro es un número par o impar. Sin tiros de esquina: Par.</p><p><strong>Primero en registrar x Tiros de esquina:</strong> Se debe predecir qué equipo registrará el número x de tiros de esquina antes que el otro.</p><p><strong>Tiros de esquina 1x2 - Primera mitad: </strong>Se debe predecir qué equipo registrará el mayor número de tiros de esquina en la primera mitad del encuentro.</p><p><strong>Tiro de esquina Xth - Primera mitad: </strong>Se debe predecir qué equipo registrará el tiro de esquina número X en la primera mitad del encuentro.</p><p><strong>Primera Mitad - Último Tiro de Esquina: </strong>Se debe predecir qué equipo registrará el último tiro de esquina durante la primera mitad del encuentro.</p><p><strong>Primera Mitad - Handicap en Tiros de Esquina: </strong>Se debe predecir qué equipo registrará el mayor número de tiros de esquina durante la primera mitad del encuentro, tomando en cuenta el margen del handicap ofrecido.</p><p><strong>Primera Mitad - Total de tiros de Esquina: </strong>Se debe predecir si el total de tiros de esquina durante la primera mitad del encuentro es mayor o menor que el margen total ofrecido.</p><p><strong>Primera Mitad - Total de tiros de Esquina del equipo Local: </strong>Se debe predecir si el total de tiros de esquina durante la primera mitad del encuentro registrados por el equipo Local es mayor o menor que el margen total ofrecido.</p><p><strong>Primera Mitad - Total de tiros de Esquina del equipo Visitante: </strong>Se debe predecir si el total de tiros de esquina durante la primera mitad del encuentro registrados por el equipo Visitante es mayor o menor que el margen total ofrecido.</p><p><strong>Primera Mitad - tiros de Esquina exactos del equipo Local: </strong>Se debe predecir el número exacto de tiros de esquina durante la primera mitad del encuentro registrados por el equipo Local. Hay 4 posibles resultados: 0-1, 2, 3, 4+.</p><p><strong>Primera Mitad - tiros de Esquina exactos del equipo Visitante: </strong>Se debe predecir el número exacto de tiros de esquina durante la primera mitad del encuentro registrados por el equipo Local. Hay 4 posibles resultados: 0-1, 2, 3, 4+.</p><p><strong>Primera Mitad - Rango de tiros de esquina: </strong>Se debe predecir el rango del número de tiros de esquina totales durante la primera mitad del encuentro.</p><p><strong>Primera Mitad - Tiros de esquina par/impar:</strong> Se debe predecir si el total de tiros de esquina durante la primera mitad del encuentro es un número par o impar. Sin tiros de esquina: Par.</p><p><strong>Primera Mitad - Primero en registrar x Tiros de esquina:</strong> Se debe predecir qué equipo registrará el número x de tiros de esquina antes que el otro durante la primera mitad del encuentro.</p><p><strong>Total de tiros de esquina (Más de-Exacto-Menos de): </strong>Tienes que predecir si el número de los tiros de esquina durante el partido será más de, menos de o exacto que el margen indicado<strong>.</strong></p><p><strong>1a Mitad - Total de tiros de esquina (Más de-Exacto-Menos de): </strong>Tienes que predecir si el número de los tiros de esquina en la primera mitad será más de, menos de o exacto que el margen indicado<strong>.</strong></p><p> </p><p><i><strong>MERCADOS DE TARJETAS</strong></i></p><p><strong>Mercados de tarjetas</strong></p><p>Una tarjeta amarilla cuenta como 1 tarjeta. Una tarjeta roja cuenta como dos tarjetas. Si un jugador recibe una tarjeta amarilla más una segunda amarilla, llevando a una tarjeta roja, esto cuenta en total como 3 tarjetas. Como resultado de esto, un jugador no puede recibir más de 3 tarjetas. La liquidación de apuestas estará basada en toda la información disponible sobre tarjetas que se presenten durante la duración del evento. Las tarjetas mostradas después del pitazo final no serán tomadas en consideración para la Liquidación de apuestas. Tarjetas mostradas a personas que no estén jugando el encuentro(Jugadores que ya hayan dejado el campo, Directores, jugadores en la banca que aún no participan en el encuentro) no serán tomadas en consideración para la liquidación de apuestas.</p><p><strong>Mercados de tarjetas con puntos</strong></p><p>Una tarjeta amarilla cuenta como 10 puntos y una roja más una segunda amarilla cuentan como 25. La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta. Como resultado de esto, un jugador no puede recibir más de 35 puntos. La liquidación de apuestas estará basada en toda la información disponible sobre tarjetas que se presenten durante la duración del evento. Las tarjetas mostradas después del pitazo final no serán tomadas en consideración para la liquidación de apuestas. Tarjetas mostradas a personas que no estén jugando el encuentro( Jugadores que ya hayan dejado el campo, Directores, jugadores en la banca que aún no participan en el encuentro) no serán tomadas en consideración para la liquidación de apuestas.</p><p><strong>Tarjetas 1x2: </strong>Se debe predecir qué equipo registrará el mayor número de tarjetas en el tiempo reglamentario del encuentro</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Siguiente Tarjeta: </strong>Se debe predecir qué equipo registrará la siguiente tarjeta especificada en la apuesta durante el tiempo reglamentario del encuentro.</p><p><strong>Total de puntos por tarjetas: </strong>Se debe predecir si el total de los puntos por tarjetas del encuentro es mayor o menor que el margen total ofrecido.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Total de Tarjetas</strong>: Se debe predecir si el total de tarjetas del encuentro es mayor o menor que el margen total ofrecido.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Total de Tarjetas del equipo Local</strong>: Se debe predecir si el total de tarjetas del encuentro registradas por el equipo Local es mayor o menor que el margen total ofrecido.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Total de Tarjetas del equipo Visitante</strong>: Se debe predecir si el total de tarjetas del encuentro registradas por el equipo Visitante es mayor o menor que el margen total ofrecido.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Tarjetas Exactas: </strong>Se debe predecir el total exacto de tarjetas durante el encuentro.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Tarjetas Exactas del Equipo Local: </strong>Se debe predecir el total exacto de tarjetas registradas por el equipo Local durante el encuentro.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Tarjetas Exactas del Equipo Visitante: </strong>Se debe predecir el total exacto de tarjetas registradas por el equipo Visitante durante el encuentro.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Rango de puntos por tarjeta:</strong> Se debe predecir el rango en el que se encuentran el total de puntos por tarjeta durante el encuentro</p><p>Hay 5 posibles resultados: 0-3, 31-45, 46-60, 61-75, 76+.</p><p><strong>Expulsión: </strong>Se debe predecir si habrá alguna tarjeta roja durante el encuentro.</p><p><strong>Expulsión en el equipo local: </strong>Se debe predecir si habrá alguna tarjeta roja registrada por el equipo Local durante el encuentro.</p><p><strong>Expulsión en el equipo Visitante: </strong>Se debe predecir si habrá alguna tarjeta roja registrada por el equipo Visitante durante el encuentro.</p><p><strong>Primera Mitad -</strong> <strong>Tarjetas 1x2: </strong>Se debe predecir qué equipo registrará el mayor número de tarjetas durante el primer tiempo del encuentro</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad -</strong> <strong>Siguiente Tarjeta: </strong>Se debe predecir qué equipo registrará la siguiente tarjeta especificada en la apuesta durante el primer tiempo del encuentro.</p><p><strong>Primera Mitad -Total de puntos por tarjetas : </strong>Se debe predecir si el total de los puntos por tarjetas registradas en la primera mitad del encuentro es mayor o menor que el margen total ofrecido.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos. La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad - Total de Tarjetas</strong>: Se debe predecir si el total de tarjetas durante la primera mitad del encuentro es mayor o menor que el margen total ofrecido.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad - Total de Tarjetas del Equipo Local </strong>: Se debe predecir si el total de tarjetas registradas para el equipo Local durante la primera mitad del encuentro es mayor o menor que el margen total ofrecido</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad - Tarjetas exactas: </strong>Se deberá predecir el número exacto de tarjetas registradas durante la primera mitad del encuentro.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad - Tarjetas exactas del Equipo Local: </strong>Se deberá predecir el número exacto de tarjetas registradas por el equipo Local durante la primera mitad del encuentro.</p><p> </p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad - Tarjetas exactas del Equipo Visitante: </strong>Se deberá predecir el número exacto de tarjetas registradas por el equipo Visitante durante la primera mitad del encuentro.</p><p>➔ <i>Tarjeta amarilla = 10 puntos, Tarjeta roja = 25 puntos, La segunda tarjeta amarilla que lleva a una tarjeta roja no se cuenta.</i></p><p><strong>Primera Mitad - Rango de puntos por tarjeta:</strong> Se debe predecir el rango en el que se encuentran el total de puntos por tarjeta durante el primer tiempo del encuentro</p><p>Hay 4 posibles resultados: 0-10, 11-25, 26-40, 41+.</p><p><strong>Primera Mitad - Expulsión: </strong>Se debe predecir si habrá alguna tarjeta roja durante la primera mitad del encuentro.</p><p><strong>Primera Mitad - Expulsión en el equipo Local: </strong>Se debe predecir si habrá alguna tarjeta roja registrada por el equipo Local durante la primera mitad del encuentro.</p><p><strong>Primera Mitad - Expulsión en el equipo visitante: </strong>Se debe predecir si habrá alguna tarjeta roja registrada por el equipo visitante durante la primera mitad del encuentro.</p><p> </p><p><i><strong>Mercados de Anotación / Mercados Especiales por Jugador</strong></i></p><p>Las apuestas se aplican solo al tiempo reglamentario. Los goles en propia puerta (según la autoridad oficial) se omiten o cuentan como \"sin goleador\" si el juego solo tiene \"goles en propia puerta\".</p><p>Al realizar una apuesta en el mercado <strong>\"Primer goleador\"</strong>, la apuesta será cancelada si el jugador nunca juega o entra al terreno de juego después de que se haya anotado el primer gol del partido, excepto en el caso de un gol en propia meta, que se ignora.</p><p>Al realizar una apuesta en el mercado <strong>“Último goleador”</strong>, la apuesta será cancelada si un jugador nunca juega.</p><p>Las apuestas en el mercado <strong>“X jugador anotará en cualquier momento”, </strong>se aplica para cualquier jugador que haya jugado, independientemente del momento en que el jugador ingresó al terreno. Las apuestas en este mercado serán canceladas si el jugador nunca juega</p><p>En caso de que un partido se suspenda pero haya al menos un goleador, se liquidan las apuestas del primer goleador y las apuestas del último jugador se cancelan.</p><p><strong>X jugador anotará en cualquier momento: </strong>Se debe predecir que el jugador elegido anotará al menos un gol durante el partido. Si el jugador seleccionado no participa en el partido, la apuesta se cancelará.</p><p><strong>Primer goleador:</strong> Se debe predecir si el jugador elegido anotará el primer gol del partido. Si un jugador nunca juega o entra a la cancha después de que se haya marcado el primer gol del juego, la apuesta es cancelada</p><p>Si el jugador elegido no anota el primer gol y es reemplazado, la apuesta se liquida como pérdida</p><p><strong>Próximo goleador:</strong> Se debe predecir si el jugador seleccionado marcará el gol \"x\" en el partido. Si el jugador seleccionado no participa en el partido, la apuesta se cancelará.</p><p><strong>Último goleador: </strong>Se debe predecir que el jugador elegido anotará el último gol del partido. Si el jugador elegido no participa en el partido, la apuesta se cancelará. Si el jugador elegido no marca ningún gol durante el partido, la apuesta se pierde, incluso si el jugador fue reemplazado antes de que se haya anotado el último gol</p><p><strong>X jugador anotará en cualquier momento y 1x2: </strong>Se debe predecir el jugador que anotará en cualquier momento, además de predecir el resultado del juego. Válido solamente para tiempo reglamentario.</p><p><strong>X jugador anotará en cualquier momento y marcador correcto: </strong>Se debe predecir el jugador que anotará en cualquier momento del partido, además de predecir la puntuación final exacta del juego.Valido Solamente tiempo reglamentario.</p><p><strong>Jugador en anotar el gol “x” y marcador correcto: </strong>Se debe predecir el jugador que anotará el gol \"x\" en el partido además de predecir el marcador correcto del partido. Válido solamente para tiempo reglamentario.</p><p><strong>Jugador en anotar el gol “x” y 1x2: </strong>Se debe predecir el jugador que anotará el gol \"x\" en el partido además de predecir el resultado del partido. Válido solamente para tiempo reglamentario.</p><p><strong>Jugador en marcar 2 o más goles: </strong>Se debe predecir que el jugador elegido anotará al menos dos goles durante el partido. Si el jugador que ha elegido no participa en el partido, la apuesta es cancelada. Si el jugador participa en el partido y no marca al menos dos goles, la apuesta se pierde independientemente del resultado final del partido.</p><p><strong>Jugador en marcar 3 o más goles: </strong>Se debe predecir que el jugador elegido anotará al menos tres goles durante el partido. Si el jugador que ha elegido no participa en el partido, la apuesta es cancelada. Si el jugador participa en el partido y no anota al menos tres goles, la apuesta se pierde independientemente del resultado final del partido</p><p><strong>Jugador del equipo local en anotar el gol “x”: </strong>Se debe predecir que el jugador del equipo local elegido anotara el gol “x” en el partido. Si el jugador elegido no participa en el partido, la apuesta se anulará.</p><p><strong>Jugador del equipo visitante en anotar el gol “x”: </strong>Se debe predecir que el jugador del equipo visitante elegido anotara el gol “x” en el partido. Si el jugador elegido no participa en el partido, la apuesta se anulará.</p><p> </p><p><i><strong>Otros Mercados</strong></i></p><p> </p><p><strong>Medio tiempo/Tiempo completo marcador exacto: </strong>Se debe predecir el marcador exacto tanto del medio tiempo como del tiempo completo del evento. Ejemplo:</p><p>Marcador del Medio tiempo 0-0, Marcador del tiempo completo 2-0.</p><p>La selección ganadora para este ejemplo es 0-0/2-0.</p><p><strong>Rango de goles: </strong>Se debe predecir el rango de goles marcados durante el evento. Son posibles 4 resultados:</p><p>0-1, 2-3,4-6,7+</p><p><strong>Local gana a cero: </strong>Se debe predecir si el Local ganará o no ganará habiendo concedido un gol a su oponente, Son posibles 2 resultados: Si (El local gana sin ningún gol concedido a su rival) o No (Cualquier otro resultado).</p><p><strong>Visitante gana a cero: </strong>Se debe predecir si el Visitante ganará habiendo concedido un gol o no a su oponente. Son posibles 2 resultados: Si (El local gana sin ningún gol concedido a su rival) o No (Cualquier otro resultado).</p><p><strong>Mitad de mayor marcador: </strong>Se debe predecir cuál de las dos mitades del evento contará con la mayor cantidad de goles anotados.</p><p><strong>Ambas mitades más de 1.5: </strong>Se debe predecir que más de 1.5 goles son anotados en cada mitad, esto significa que, más de 1.5 goles son marcados en la primera mitad y más de 1.5 en la segunda mitad.</p><p><strong>Ambas mitades menos de 1.5: </strong>Se debe predecir que menos de 1.5 goles son anotados en cada mitad, esto significa que, menos de 1.5 goles son marcados en la primera mitad y menos de 1.5 en la segunda mitad.</p><p><strong>Local gana ambas mitades: </strong>Se debe predecir que el equipo Local ganará tanto la primera como la segunda mitad del evento.</p><p><strong>Visitante gana ambas mitades: </strong>Se debe predecir que el equipo visitante ganará tanto la primera como la segunda mitad del evento.</p><p><strong>Local gana cualquier mitad: </strong>Se debe predecir que el equipo Local gana alguna de las mitades, sea la primera o sea la segunda mitad.</p><p><strong>Visitante gana cualquier mitad: </strong>Se debe predecir que el equipo Visitante gana alguna de las mitades, sea la primera o sea la segunda mitad.</p><p><strong>Local mitad de mayor marcador: </strong>Se debe predecir cuál de las dos mitades del evento tendrá la mayor cantidad de goles anotados por el equipo Local.</p><p><strong>Visitante mitad de mayor marcador: </strong>Se debe predecir cuál de las dos mitades del evento tendrá la mayor cantidad de goles anotados por el equipo Visitante.</p><p><strong>Local anota en ambas mitades: </strong>Se debe predecir si el equipo Local anotará al menos un gol tanto en la primera como en la segunda mitad.</p><p><strong>Visitante anota en ambas mitades: </strong>Se debe predecir si el equipo Visitante anotará al menos un gol tanto en la primera como en la segunda mitad.</p><p><strong>Gol en propia puerta: </strong>Se debe predecir si un autogol será anotado durante el evento.</p><p><strong>Penalti en el evento: </strong>Se debe predecir si tomará lugar o no tomará lugar un penalti por parte de, ya sea el equipo Local o el equipo Visitante. El penalti debe ser cobrado para ser tenido en cuenta. Cualquier penalti concedido y que sea anulado por el VAR no será tenido en cuenta. La ronda de penalti no es tenida en cuenta.</p><p><strong>Anota un penalti: </strong>Se debe predecir si un penalti concedido en el evento será anotado por el equipo Visitante o por el equipo Local.</p><p><strong>Falla un penalti: </strong>Se debe predecir si un penalti concedido en el evento será fallado por el equipo Visitante o por el equipo Local.</p><p><strong>Remonta: </strong>Se debe predecir si el equipo Local o Visitante ganará el partido después de haber estado por detrás en el marcador.</p><p><strong>Local remonta: </strong>Se debe predecir si el equipo Local ganará el evento después de haber estado por detrás en el marcador.</p><p><strong>Visitante remonta: </strong>Se debe predecir si el equipo Visitante ganará el evento después de haber estado por detrás en el marcador.</p><p><strong>Revisión del VAR S/N:</strong> Se debe predecir si habrá o no habrá una decisión por parte del VAR (con jugada revisada en el monitor) en un evento seleccionado durante únicamente el tiempo reglamentario. La prórroga no será tenida en cuenta. La liquidación de apuestas realizadas en mercados de VAR, serán validadas en la página oficial de la federación.</p><p><strong>Multimarcador 1,2,3,4,5</strong>: Se debe predecir si la selección escogida contendrá el marcador correcto del evento. Son posibles 5 mercados para elegir.</p><p>Ejemplo: Se puede elegir 0-0 / 1-1 / 0-1 / 1-0.</p><p>Si el evento finaliza con alguno de los resultados seleccionados, la apuesta será ganadora.</p><p><strong>Posición del balón 1X2: </strong>Se debe predecir cuál de los equipos seleccionados tendrá una mayor posesión del balón de acuerdo al margen especificado. Solo se considera el tiempo reglamentario.</p><p><strong>Goles totales de la jornada X: </strong>Se debe predecir la cantidad total de goles anotados durante la Jornada X del campeonato seleccionado. En caso de que un solo partido sea pospuesto para son añadidos dos goles</p><p><strong>Goles totales dia X: </strong>Tienes que predecir el número total de goles marcados en la Jornada X del mencionado Campeonato. Se conceden dos goles en el caso de un solo partido aplazado en un día específico; en caso de que se pospongan 2 o más partidos, todas las apuestas serán anuladas.</p><p>Ejemplo: Total de goles de la Jornada 36 Italia - Serie B: e.g.: Total de goles Matchday 36 Italia - Serie B = WIN más de 15</p><p>Es ganadora si la suma de los goles marcados en todos los partidos de la Serie B es 16+</p><p><strong>Tiros del partido a puerta:</strong> Tendrá que pronosticar si el número total de tiros a puerta realizados por ambos equipos en el tiempo regular (90 Min.) es menor (menos) o mayor (más) que la línea indicada.</p><p><strong>Tiros de partido:</strong> Tendrá que pronosticar si el número total de tiros totales realizados por ambos equipos en el tiempo regular (90 Min.) es menor (menos) o mayor (más) que la línea indicada.</p><p><strong>Posesión de balón competidor 1: </strong>Tendrá que pronosticar si en el partido, el competidor 1 registrará un porcentaje de posesión de balón menor (Menos) o mayor (Más) que el margen especificado durante el tiempo regular y la prórroga, incluida.</p><p><strong>Posesión de balón competidor 2: </strong>Tendrá que pronosticar si en el partido, el competidor 2 registrará un porcentaje de posesión de balón menor (Menos) o mayor (Más) que el margen especificado durante el tiempo regular y la prórroga, incluida.</p><p> </p><p> </p><ul><li><i><strong>Mercados Rápidos/ Mercados por Intérvalo</strong></i></li></ul><p>➔ Los mercados serán liquidados basándose en el tiempo de Gol anunciado por la Televisión. Si este no se encuentra disponible, será considerado el reloj del encuentro.</p><p>➔ Los mercados de Gol se liquidan basándose en el tiempo en que el balón cruza la línea de meta, y no desde el tiempo en que se patea el esférico.</p><p>➔ El mercado de Intervalo de tiros de esquina será liquidado basándose en el tiempo que se pateó el esférico y no cuando fue concedido al equipo.</p><p>➔ El mercado de Intervalo de tarjetas será liquidado basándose en el tiempo que se enseñó la tarjeta al jugador y no en el momento que la infracción fue cometida.</p><p>➔ Los mercados de fuera de juego serán liquidados basándose en el tiempo en el que el árbitro de la decisión oficial. Esta regla se aplicará a su vez, en caso del uso del VAR.</p><p>➔ Los mercados de penaltis serán liquidados basándose en el tiempo en que el árbitro anuncie la decisión oficial. Esta regla se aplicará a su vez, en caso del uso del VAR.</p><p>➔ Penaltis concedidos pero no cobrados no serán tomados en cuenta</p><p>Este tipo de mercados pueden ser ofrecidos en intervalos de minutos como 1, 5, 10, 15, etc; de acuerdo a la situación del partido. Dentro de esta oferta, se puede encontrar mercados de goles, tiros de esquina, tarjetas con la fórmula 1x2, más/menos, handicap.</p><p><strong>Rango de 1 minuto:</strong></p><p>Va desde el segundo 00:00 al segundo 00:59</p><p><strong>Rango de 5 minuto:</strong></p><p>Los minutos del 1 al 5 van desde el segundo 00:00 al segundo 04:59</p><p><strong>Rango de 10 minuto:</strong></p><p>Los minutos del 1 al 10 van desde el segundo 00:00 al segundo 09:59</p><p><strong>Rango de 15 minuto:</strong></p><p>Los minutos del 1 al 15 van desde el segundo 00:00 al segundo 14:59</p><p><strong>Regla 1: </strong>En caso de que el intervalo seleccionado contenga la opción NO o NINGUNO. Así que, si la apuesta fue registrada antes del partido, significa que no habrá goles , tiros libres, tarjetas, etc; de acuerdo con el mercado seleccionado. Si la apuesta se genera en vivo, quiere decir que desde ese momento no habrá goles , tiros libres, tarjetas, etc; de acuerdo con el mercado seleccionado.</p><p><strong>Regla 2</strong>:<strong> </strong>En caso de que el intervalo seleccionado contenga la opción minuto 45 (final de primera mitad) o minuto 90(Final de la segunda mitad o tiempo reglamentario) el tiempo complementario será tomado en cuenta.</p><p><strong>Mercados de 1 minuto:</strong></p><p>➔1 minuto - goles total desde a hasta b</p><p>➔1 minuto - tiros de esquinas totales desde a hasta b</p><p>➔1 minuto - tarjetas totales desde a hasta b</p><p>➔1 minuto - fueras de juego totales desde a hasta b</p><p>➔1 minuto - penaltis totales desde a hasta b</p><p><strong>Mercados de 5, 10, 15 minutos:</strong></p><p>➔1x2 desde a hasta b</p><p>➔X gol desde a hasta b</p><p>➔goles total desde a hasta b</p><p>➔Tiros de esquinas 1x2 desde a hasta b</p><p>➔Tiro de esquina X desde a hasta b</p><p>➔ Hándicap de Tiros de esquina desde a hasta b</p><p>➔Tiros de esquina totales desde a hasta b</p><p>➔Tiros de esquina totales del competidor 1 desde a hasta b</p><p>➔Tiros de esquina totales del competidor 2 desde a hasta b</p><p>➔Par/impar Tiros de esquina desde a hasta b</p><p><strong>10 minutos - 1x2: </strong>Se debe predecir el resultado de los primeros diez(10) minutos. Los sucesos deben suceder entre 0:00 y 09:59 para ser considerados como parte de los primeros 10 minutos. Reportes oficiales de las ligas organizando los eventos y reportes de los proveedores oficiales serán utilizados el resultado correcto.</p><p><strong>Cuando se marcará un gol(intervalo de 15 minutos):</strong> Se debe predecir si habrá un gol dentro del intervalo de tiempo seleccionado: hay 7 posibles resultados:</p><p>1-15</p><p>16-30</p><p>31-45</p><p>46-60</p><p>61-75</p><p>76-90</p><p>ninguno</p><p><strong>Cuando se marcará un gol(intervalo de 10 minutos):</strong> Se debe predecir si habrá un gol dentro del intervalo de tiempo seleccionado: hay 10 posibles resultados:</p><p> </p><p>1-10</p><p>11-20</p><p>21-30</p><p>31-40</p><p>41-50</p><p>51-60</p><p>61-70</p><p>71-80</p><p>81-90</p><p>Ninguno</p><p> </p><p><i><strong>Fútbol - Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el equipo ganador del torneo de acuerdo a las estadísticas oficiales de la competición.</p><p><strong>Top2, Top4, Top6, Top8, Top10: </strong>Se debe predecir si el equipo seleccionado terminará en la respectiva posición seleccionada al finalizar la competencia.</p><p><strong>Posición más alta en la liga: </strong>Se debe predecir cuál de los equipos seleccionados alcanzará la posición más alta<strong> </strong>al finalizar el torneo o la temporada seleccionada, considerando los puntos reales. Si los equipos terminan la competencia con la misma cantidad de puntos, se considerará la clasificación oficial publicada por la Liga de Fútbol del país respectivo para determinar el ganador.</p><p><strong>Última posición: </strong>Se debe predecir si el equipo o jugador indicado terminará en la última posición de la competencia.</p><p><strong>Mejor Equipo Promovido: </strong>Se debe predecir qué equipo recientemente promovido terminará en la posición más alta en el torneo seleccionado. En caso de haber un empate, las apuestas se determinarán con la clasificación oficial de la liga al final del partido final de la temporada programada. Los playoffs de final de temporada serán tenidos en cuenta.</p><p><strong>Terminará en el Top-medio: </strong>Se debe predecir qué equipos seleccionados terminaran en el top de la mitad del torneo/liga seleccionada (por ejemplo, en una liga de 16 equipos, predecir si terminara en la posición 1-8).</p><p><strong>Ganador (Sin/Con) – Equipos: </strong>Se debe predecir el equipo ganador de la competición seleccionada (Qué equipo del mercado terminará más alto en la competición seleccionada)sin tomar en consideración el o los equipos mencionados. Por ejemplo, Premier League 2020/21-Sin/Con los Seis Grandes, significa el equipo que terminó mejor en la Premier League en la temporada 2020/21 sin considerar a Arsenal, Chelsea, Liverpool, Manchester City, Manchester Utd y Tottenham.</p><p><strong>Equipo en anotar más goles: </strong>Se debe predecir cuál será el equipo con más goles anotados durante todo el torneo. Si dos o más equipos anotan la misma cantidad de goles será aplicada la regla del Dead Heat.</p><p><strong>Equipo en anotar menos goles: </strong>Se debe predecir cuál será el equipo con menos goles anotados durante todo el torneo. Si dos o más equipos anotan la misma cantidad de goles será aplicada la regla del Dead Heat.</p><p><strong>Mejor equipo del torneo: </strong>Se debe predecir qué equipo de la confederación llegará más lejos durante la competencia. En caso de haber un empate entre muchos equipos y son eliminados en la misma fase, será aplicada la regla del Dead Heat.</p><p><strong>Mejor Goleador: </strong>Se debe predecir qué jugador anotará más goles durante el torneo. Los goles anotados en otras competiciones no serán tenidos en cuenta. Si el jugador seleccionado participa al menos una vez en la temporada, este tipo de mercado permanecerá válido, en caso contrario las apuestas en este jugador serán canceladas.</p><p><strong>Descenderá: </strong>Se debe predecir qué equipo o equipos descenderán de la división.</p><p><strong>Jugador con más asistencias:</strong> Se debe predecir qué jugador conseguirá más asistencias durante el torneo seleccionado. Los resultados serán tomados del sitio oficial de la federación.</p><p><strong>Ganador del Grupo: </strong>Se debe predecir qué equipo terminará con el mayor número de puntos del grupo en el cual se encuentre.</p><p><strong>Etapa de Eliminación: </strong>Se debe predecir en qué fase un equipo determinado será eliminado de la competición.</p><p><strong>Equipo en recibir más goles: </strong>Se debe predecir qué equipo recibirá más goles durante su participación a lo largo de la competencia.</p><p><strong>Equipo en anotar más goles: </strong>Se debe predecir qué equipo anotará más goles durante su participación a lo largo de la competencia.</p><p><strong>Anotador Top por equipo:</strong> La opción termina como el máximo goleador de su equipo. La opción \"Sin goleador\" significa que nadie marcará goles en el equipo dado. En el caso de un empate entre dos o más jugadores, se aplicará la regla Dead Heat.</p><p><strong>Clasifica a Final/ Semi-Final/ Cuarto de final: </strong>Se debe predecir si el equipo o jugador especificado alcanzará a llegar a la ronda especificada de la competición escogida.</p><p><strong>Ganador &amp; Maximo goleador: </strong>Se debe predecir qué equipo ganará el torneo seleccionado junto con cuál será el jugador con más goles anotados. Las reglas para el Ganador y el Máximo goleador aplican para este mercado y ambas selecciones deben ganar para que el mercado combinado sea ganador.</p><p><strong>Mejor Jugador del Torneo: </strong>Se debe predecir qué jugador será nombrado mejor jugador del torneo. Los resultados para la determinación del mercado serán tomados de la federación.</p><p><strong>Grupo del Ganador: </strong>Se debe predecir cuál será el grupo del equipo que ganará el torneo seleccionado.</p><p><strong>Grupo de Clasificación: </strong>Se debe predecir si el equipo seleccionado, el cual proviene del grupo mencionado clasificará (si) o no clasificará (no).</p><p><strong>Eliminación en tiros de Penalti: </strong>Se debe predecir si el equipo seleccionado será<strong> </strong>eliminado de la competencia en una ronda de penaltis durante el torneo.</p><p><strong>Pronóstico Perfecto - </strong>Este tipo de apuesta consiste en elegir dos selecciones las cuales la primera terminará en primera posición y la selección resultado en la segunda posición, y además que clasifican a la siguiente ronda. Para ganar este mercado se debe predecir correctamente la primera y segunda selección escogidas, las cuales deben estar en el orden correcto especificado.</p><p><strong>Puntos exactos de grupo: </strong>Se debe predecir exactamente cuantos puntos obtendrá el equipo seleccionado en la fase de grupos.</p><p><strong>Doble Avance: </strong>Este mercado consiste en predecir qué dos equipos seleccionados de un grupo en concreto avanzan a un grupo específico o fase del torneo, sin importar cual sea su posición final en la tabla. Para ganar este mercado ambos equipos deben clasificar.</p><p> </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.2 Basquetbol",
                            "content": "<p>El baloncesto o básquetbol es un deporte en el cual compiten dos equipos de cinco jugadores cada uno. El objetivo es introducir la pelota (balón) en el aro (cesta o canasta) del equipo contrario y anotar la mayor cantidad de puntos para ganar.</p><p><br><strong>Generalidades De Juego.</strong></p><p>Solo se tomarán en cuenta para determinación de resultados los 45 minutos oficiales de juego divididos en 4 cuartos de juego de 15 minutos cada uno, además del tiempo agregado que se hubiese perdido por lesiones, cambios o sustituciones durante el partido.</p><p>Solo se tomará en cuenta el tiempo extra para las opciones que especifiquen que incluyen tiempo extra.</p><p>Cuando un evento sea suspendido, aplazado, cancelado o abandonado se considerará un evento como “no acción” Si el evento no se juega en las próximas 48 horas la línea de apuesta será anulada y se efectúa el resto de líneas que presente la jugada, si la jugada presenta una sola apuesta directa se reembolsará el valor apostado a su cuenta.</p><p>Se considerará primera mitad de juego al tiempo de juego correspondiente a los dos primeros cuartos del evento dado que estos dos cuartos suman la mitad del tiempo oficial del partido, de este mismo modo se considerarán los dos últimos cuartos como segunda mitad de juego.</p><p>Se considerará cuarto a los 12 minutos de juego que dura cada división de tiempo durante el partido. (Se tomará en cuenta cualquier tiempo de reposición que se dé durante el cuarto como parte de este).</p><p>Los mercados de apuestas referentes a mitades o cuartos se distinguirán uno del otro dado que cada uno específica a que tiempo de juego corresponde cada uno.<br> </p><p>Cualquier apuesta que haga referencia a un jugador en específico en el partido y este se quede en la banca se considerara como anulada.</p><p><br><i><strong>BALONCESTO</strong></i></p><p><i><strong>Mercados Principales</strong></i></p><p> </p><p><strong>Ganador(incl.Prórroga): </strong>Se debe predecir cuál será el ganador del evento sin importar cual sea el margen de puntos. Este mercado siempre incluye Prórroga.</p><p><strong>Total (Más de/Menos de) (incl.Prórroga):</strong> Se debe predecir si el número total de puntos marcados durante el evento, estarán por encima o por debajo del margen indicado. Por ejemplo: Más de 215.5 - Menos de 215.5. Este mercado incluirá Prórroga.</p><p><strong>Handicap (Margen) (incl.Prórroga): </strong>Se debe predecir el ganador del evento añadiendo o sustrayendo la cantidad de puntos especificada en el margen al resultado del evento.</p><p><strong>Puntos totales por equipo (Local - Visitante) (incl.OT): </strong>Se debe predecir el total de puntos anotados por uno de los dos equipos eligiendo ya sea el Local o el Visitante. Este mercado incluirá Prórroga.</p><p><strong>Par/Impar (Primera mitad o Segunda mitad) (incl.Prórroga):</strong> Se debe predecir si el resultado para Primera mitad o la Segunda mitad será un número Par o Impar. Este mercado incluirá Prórroga.</p><p><strong>Ganador 1X2: </strong>Se debe predecir si la victoria será para el equipo Local o el equipo Visitante, otorgando la opción de escoger el empate.</p><p><strong>Medio tiempo/Tiempo completo: </strong>Se debe predecir cuál equipo ganará en la Primera mitad y al finalizar el evento.</p><p><strong>Rango de puntos: </strong>Se debe predecir si los puntos durante el evento estarán incluidos entre margen de puntos seleccionados, de modo que, si el rango seleccionado es (151-160) el total de puntos no puede estar por fuera de este intervalo.</p><p><strong>Ganador + Total: </strong>Se debe predecir el resultado de dos mercados principales combinados, donde se debe predecir quién ganará el evento junto con cuántos puntos (Más de/Menos de) serán marcados durante el evento.</p><p><strong>Punto X (incl. Prórroga):</strong> Se debe predecir qué equipo marcará el punto X durante el evento incluyendo la Prórroga.</p><p><strong>Carrera a los X puntos: </strong>Se debe predecir cuál equipo llegará primero a los X puntos. Por ejemplo: Qué equipo llegará primero a los 50 puntos.</p><p><strong>Margen de Victoria: </strong>Se debe predecir la diferencia de puntos de distancia que un equipo tendrá ante su rival al finalizar el evento.</p><p><strong>Prórroga si/no – habrá prórroga: </strong>Se debe predecir si el evento contará con prórroga.</p><p><strong>Total (más de-exacto-menos de) – 3 posibilidades: </strong>Mercado que permite elegir 3 diferentes posibilidades, las cuales son más de/menos de X número de puntos o número exacto de X puntos.</p><p><strong>Cualquier equipo máximos puntos totales consecutivos (Más/Menos): </strong>Se debe predecir si algún equipo logrará más o menos que los puntos consecutivos ocurridos en algún momento del evento.</p><p><strong>Local/Visitante máximos puntos totales consecutivos (Más/Menos): </strong>Se debe predecir si el equipo Local o Visitante logrará más o menos que los puntos consecutivos ocurridos en algún momento del evento.</p><p><strong>Cualquier equipo lidera por X: </strong>Se debe predecir si algún equipo liderará el evento por X puntos en algún momento del evento.</p><p><strong>Local/Visitante lidera por X: </strong>Se debe predecir si el equipo Local o Visitante liderará el evento por X puntos en algún momento del evento.</p><p><strong>Tipo de anotación X punto (incl. Prórroga): </strong>Se debe predecir cuál será el tipo de anotación del punto X durante el evento. Son posibles 6 resultados:</p><p>Competidor 1 1 puntos</p><p>Competidor 1 2 puntos</p><p>Competidor 1 3 puntos</p><p>Competidor 2 1 puntos</p><p>Competidor 2 2 puntos</p><p>Competidor 2 3 puntos</p><p><strong>X cuarto – X punto: </strong>Se debe predecir cuál equipo anotará el punto X durante el cuarto seleccionado.</p><p> </p><p><i><strong>Mercados de Primera mitad</strong></i></p><p><strong>Primera Mitad - Apuesta sin empate: </strong>Se debe predecir el ganador de la primera mitad, en caso de que la mitad termine en empate todas las apuestas serán canceladas para este mercado, si la mitad no se completa este mercado será cancelado.</p><p><strong>Primera mitad - Handicap: </strong>Se debe predecir el ganador de la primera mitad<strong> </strong>añadiendo o sustrayendo el margen especificado al resultado de la mitad, si la mitad no se completa este mercado será cancelado.</p><p><strong>Primera mitad - Total (Más de/Menos de): </strong>Se debe predecir si el número total de puntos durante la primera mitad estará por encima o por debajo del margen especificado, si la mitad no se completa este mercado será cancelado. </p><p><strong>Primera mitad - Local/Visitante (Más de/Menos de): </strong>Se debe predecir si el número total de puntos por el equipo seleccionado (Local o Visitante) durante la primera mitad estará por encima o por debajo del margen especificado, si la mitad no se completa este mercado será cancelado.</p><p><strong>Primera mitad - 1x2: </strong>Se debe predecir cuál será la opción ganadora en la primera mitad<strong>.</strong></p><p><strong>Primera mitad - par/impar: </strong>Se debe predecir si la cantidad total de puntos anotados durante la primera mitad será par o impar, si la mitad no se completa este mercado será cancelado.</p><p> </p><p><i><strong>Mercados de Segunda mitad</strong></i></p><p><strong>2a Mitad -  Apuesta sin empate: </strong>Debe pronosticar el ganador de la segunda mitad (sin incluir el tiempo extra), si la mitad termina en empate, todas las apuestas se anularán para este mercado, si la mitad no se completa, este mercado se anulará.</p><p><strong>Segunda mitad - Handicap: </strong>Se debe predecir el ganador de la segunda mitad (No incluye Prórroga)<strong> </strong>añadiendo o sustrayendo el margen especificado al resultado de la mitad, si la mitad no se completa este mercado será cancelado.</p><p><strong>Segunda mitad - 1x2: </strong>Se debe predecir cuál será la opción ganadora en la segunda mitad(No incluye Prórroga).</p><p><strong>Segunda  mitad - par/impar: </strong>Se debe predecir si la cantidad total de puntos anotados durante la segunda mitad (No incluye Prórroga) será par o impar, si la mitad no se completa este mercado será cancelado.</p><p> </p><p><i><strong>Mercados por Cuartos</strong></i></p><p><strong>1er-2do-3er-4to CUARTO: </strong>Los mercados por cuarto permiten apostar en el resultado final en cada uno de los periodos del evento.</p><p><strong>Ganador del X Cuarto: </strong>Se debe predecir el ganador del cuarto seleccionado.</p><p><strong>X Cuarto 1x2: </strong>Se debe predecir el resultado del ´´X´´ Cuarto, Son posibles 3 selecciones: Equipo Local, Equipo visitante y empate (X).</p><p><strong>X Cuarto Apuesta sin empate: </strong>Se debe predecir el ganador del ´´X´´ cuarto, en caso de que el ´´X´´ cuarto termine en empate todas las apuestas serán canceladas para este mercado, si el ´´X´´ cuarto no se completa este mercado será cancelado.</p><p><strong>X Cuarto Handicap: </strong>Se debe predecir el ganador del ´´X´´ cuarto<strong> </strong>añadiendo o sustrayendo el margen especificado al resultado de la mitad, si el cuarto no se completa este mercado será cancelado.</p><p><strong>X Cuarto Total: </strong>Se debe predecir si el número total de puntos durante el ´´X´´ cuarto estará por encima o por debajo del margen especificado, si el cuarto no se completa este mercado será cancelado. </p><p><strong>X Cuarto Total Local/Visitante: </strong>Se debe predecir si el número total de puntos marcados por el equipo seleccionado durante el ´´X´´ cuarto estará por encima o por debajo del margen especificado, si el cuarto no se completa este mercado será cancelado.</p><p><strong>X Cuarto Margen de victoria: </strong>Se debe predecir la diferencia de puntos de distancia que un equipo tendrá ante su rival al finalizar el X cuarto. .</p><p><strong>Cuarto de mayor puntaje: </strong>Se debe predecir cuál cuarto tendrá la mayor cantidad de puntos anotados al finalizar el evento.</p><p><strong>X Cuarto - Último en anotar: </strong>Se debe predecir qué equipo anotará el último punto en el cuarto seleccionado.</p><p><strong>*Todos los cuartos o mitades deben ser completados para determinar el ganador.</strong></p><p> </p><p><i><strong>Mercados Especiales por Jugador</strong></i></p><p><strong>Puntos por jugador (Más de/Menos de): </strong>Se debe predecir la cantidad de puntos que el jugador especificado anotará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Asistencias por jugador (Más de /Menos de): </strong>Se debe predecir la cantidad de asistencias que el jugador especificado obtendrá durante el evento, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Rebotes por jugador (Más de/Menos de): </strong>Se debe predecir la cantidad de rebotes que el jugador especificado obtendrá durante el evento, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Puntos por campo de 3 puntos de jugador (Más de/Menos de): </strong>Se debe predecir la cantidad de 3-puntos de campo que el jugador especificado anotará durante el evento. sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).<strong> </strong></p><p><strong>Robos por jugador (Más de/Menos de): </strong>Se debe predecir la cantidad de robos que el  jugador logrará durante el evento, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).<strong> </strong></p><p><strong>Bloqueos por jugador (Más de/Menos de): </strong>Se debe predecir la cantidad de bloqueos que el  jugador logrará durante el evento, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).<strong> </strong></p><p><strong>Puntos + rebotes + asistencias por jugador (Más de/Menos de): </strong>Se debe predecir el resultado combinado de los puntos, rebotes y asistencias que el jugador especificado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Rebotes + asistencias por jugador (Más de/Menos de): </strong>Se debe predecir el resultado combinado de  rebotes y asistencias que el jugador especificado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Triple-double por jugador: </strong>Se debe predecir si el jugador especificado logrará un triple-double (10 en 3 categorías de estadísticas principales, tales como puntos, rebotes, asistencias, robadas, bloqueadas), sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Primer jugador por anotar: </strong>Se debe predecir cuál será el primer jugador del evento en anotar el primer punto (el jugador seleccionado debe empezar jugando el evento, en caso contrario la apuesta será cancelada).</p><p><strong>Primer jugador en anotar un punto de campo de 3: </strong>Se debe predecir cuál será el primer jugador del evento en anotar el primer punto de campo de 3 puntos (el jugador seleccionado debe empezar jugando el evento, en caso contrario la apuesta será cancelada).</p><p><strong>Mayor puntuación para el equipo: </strong>Se debe predecir cuál será el jugador que marque la mayor cantidad de puntos para su equipo.</p><p><strong>H2H puntos por jugador: </strong>Se debe predecir cuál de los jugadores seleccionados anotará la mayor cantidad de puntos.</p><p><strong>H2H rebotes por jugador: </strong>Se debe predecir cuál de los jugadores seleccionados logrará la mayor cantidad de rebotes.</p><p><strong>Head-to-head asistencias por jugador: </strong>Se debe predecir cuál de los jugadores seleccionados logrará la mayor cantidad de asistencias.</p><p><strong>Puntos por jugador (Al menos): </strong>Se debe predecir cuántos puntos al menos el jugador seleccionado anotará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Asistencias por jugador (Al menos): </strong>Se debe predecir cuántas asistencias al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Rebotes por jugador (Al menos): </strong>Se debe predecir cuántos rebotes al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Puntos de campo de 3 puntos por jugador (Al menos): </strong>Se debe predecir cuántos puntos de campo de 3 puntos al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Robadas por jugador (Al menos): </strong>Se debe predecir cuántas robadas al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Bloqueos por jugador (Al menos): </strong>Se debe predecir cuántos bloqueos al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p><strong>Puntos + rebotes + asistencias por jugador (Al menos): </strong>Se debe predecir cuántos puntos, rebotes y asistencias combinadas al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).<strong> </strong></p><p><strong>Rebotes + asistencias por jugador:  </strong>Se debe predecir cuántos rebotes y asistencias combinadas al menos el jugador seleccionado logrará, sólo válido para tiempo reglamentario a menos que el mercado especifique (Incl. Prórroga).</p><p> </p><p><i><strong>Baloncesto - Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo de acuerdo a las estadísticas oficiales de la competición. </p><p><strong>H2H Campeonato (Temporada regular): </strong>Se debe predecir cuál de los dos equipos seleccionados anotará más puntos durante el torneo. Puntos marcados en otras competiciones no serán tenidos en cuenta en este mercado. Si ambos equipos marcan la misma cantidad de puntos, el mercado se cancela.</p><p><strong>Más /Menos Puntos (Temporada regular): </strong>Se debe predecir si el número total de puntos marcados en la ronda del campeonato estarán por encima o por debajo del margen especificado. En caso de que uno o más eventos sean cancelados/interrumpidos<strong> </strong>y los eventos o partes pendientes no afecten las apuestas y los mercados, los resultados permanecerán como válidos (en este caso cualquier evento repetido será irrelevante), en cualquier otro caso se cancelarán las apuestas. </p><p><strong>Marcador correcto de las series Playoff (4/7 o 3/5): </strong>Se debe predecir el resultado final de la serie de partidos entre los 2 equipos seleccionados. Solo serán contadas como fuente de resultados aquellos sitios oficiales designados a la competición. Si la serie no es completada, este tipo de mercado será cancelado.</p><p><strong>H2H se clasifica: </strong>Se debe predecir cuál de los dos equipos seleccionados pasará la ronda de clasificación o la ronda de los play-off. </p><p><strong>Finalistas: </strong>Se debe predecir cuáles serán los dos equipos que se enfrentarán cara a cara en la final del toreno.</p><p><strong>Mejor jugador marcador: </strong>Se debe predecir el jugador que anotará más puntos durante el torneo especificado. Puntos anotados en cualquier otra competición no serán tenidas en cuenta para este tipo de apuestas. Si el jugador elegido participa en al menos un evento, este tipo de apuesta permanecerá válida, en el caso contrario será cancelada.</p><p><strong>H2H Anotadores:</strong> Se debe predecir cuál de los dos jugadores seleccionados anotará más puntos durante el torneo seleccionado. Los puntos marcados en otras competencias no serán tenidos en cuenta para este tipo de mercado. Si ambos jugadores anotan la misma cantidad de puntos el mercado será cancelado.</p><p><strong>Mejor jugador del Torneo (MVP):</strong> Se debe predecir qué jugador será seleccionado como el Mejor Jugador (MVP), del evento, Solo serán contadas como fuente de resultados aquellos sitios oficiales designados a la competición. Si el jugador no aparece en ninguna tabla de clasificaciones de ninguno de los eventos incluidos en el mercado, las apuestas de este mercado para el jugador elegido serán canceladas.</p><p><strong>Descenderá</strong>: Se debe predecir cuál será el equipo que descenderá al puesto más bajo del campeonato nacional. Solo a modo de información, cualquier decisión tomada antes o durante los playoffs será tenida en cuenta. Las decisiones tomadas al finalizar los playoffs no serán tenidas en cuenta.</p><p><strong>Ganador de la Conferencia: </strong>Se debe predecir el ganador de la conferencia del torneo seleccionado de acuerdo a la clasificación oficial de la competencia </p><p><strong>Ganador de la División: </strong>Se debe predecir el ganador de la División del torneo seleccionado de acuerdo a la clasificación oficial de la competencia<strong>.</strong></p><p><strong>Top4, Top6, Top8, Top10: </strong>Se debe predecir si el equipo seleccionado terminará en la respectiva posición seleccionada al finalizar la competencia.</p><p><strong>Victorias en la Temporada Regular (Más de/Menos de): </strong>Se debe predecir el número total de victorias (más de/menos de) para el equipo seleccionado durante el torneo de acuerdo al sitio oficial de la competencia. </p><p><strong>Premios - Most Improved Player (Temp. Regular): </strong>Se debe predecir qué jugador recibirá el premio al Jugador de Mayor Progreso (Most Improved Player) de la temporada en particular.</p><p><strong>Jugador Defensivo del año (Temporada regular): </strong>Se debe predecir qué jugador ganará el premio al Jugador Defensivo del año en la temporada en particular.</p><p><strong>Premios - Sixth man of the year: </strong>Se debe predecir a cuál jugador se le otorgará el premio (Sixth Man of the Year) en la temporada en particular.</p><p><strong>Alcanzará los Playoffs (Si/No): </strong>Se debe predecir si el equipo seleccionado alcanzará a llegar a los playoffs (si) o (no) durante el torneo de acuerdo al ranking oficial de la competencia. </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.3 Fútbol Americano",
                            "content": "<p><i><strong>Fútbol Americano </strong></i></p><p><i><strong>Mercados principales:</strong></i></p><p><strong>MoneyLine (Ganador): </strong>Se debe predecir el ganador del partido sin importar el margen de puntos   </p><p><strong>Total (incl. OT) (Menos/Más):</strong> Se debe predecir si el número de puntos anotados durante todo el juego estará por encima o por debajo de la línea ofrecida, Incluye prórroga </p><p><strong>Total equipo local (Menos/Más)</strong> Se debe predecir si el número total de puntos anotados por el equipo local estará por encima o por debajo de la línea ofrecida,  incluye prórroga </p><p><strong>Total equipo visitante (Menos/Más)</strong> Se debe predecir si el número total de puntos anotados por el equipo visitante estará por encima o por debajo de la línea ofrecida,  Incluye prórroga</p><p><strong>Mercados de medio tiempo y cuartos: </strong>para estos tipos de apuestas en cuartos o mitades específicas, se debe jugar en la totalidad de ese periodo para que las apuestas sean válidas, a menos que el resultado ya se haya determinado.Los mercados de la segunda mitad incluye prórroga, si se juega. El 4º cuarto no incluye prórroga</p><p><strong>Carrera a X puntos (incl. Prórroga): </strong>Se debe predecir qué equipo alcanzará primero los “X”puntos, Incluye prórroga   </p><p><strong>Próximo equipo en anotar (incl. Prórroga): </strong>Se debe predecir qué equipo será el siguiente en conseguir una anotación. Hay 3 posibles resultados: 1(Equipo local anotara), X (Ninguno anotara) y 2 (Equipo visitante anotara) </p><p><strong>Próximo tipo de anotación (incl. Prórroga): </strong>Se debe predecir cuál será el siguiente método de anotación, hay 4 posibles resultados: touchdown, gol de campo,safety o ninguno </p><p><strong>Cuarto con la puntuación más alta: </strong>Se debe predecir en qué cuarto se realizará la mayor cantidad de puntos anotados </p><p><strong>Mitad con la puntuación más alta:</strong> Se debe predecir en qué mitad se realizará la mayor cantidad de puntos anotados </p><p><strong>Total touchdowns (incl. prórroga): </strong>Se debe predecir si el número total de touchdowns anotados durante el partido y la prórroga.</p><p><strong>Total puntos de campo anotados (incl. Prórroga): </strong>Se debe predecir si el número total de puntos de campo anotados durante el partido y la prórroga.</p><p><strong>Total turnovers (incl.Prórroga): </strong>Se debe predecir el número total de turnovers durante el partido y la prórroga.</p><p><strong>Total sacks (incl. Prórroga): </strong>Se debe predecir el número total de sacks durante el partido y la prórroga </p><p><strong>Equipo en anotar “X” gol de campo (incl. Prórroga): </strong>Se debe predecir qué equipo anotará el X gol de campo durante el partido y la prórroga </p><p><strong>¿Habrá prórroga?: </strong>Se debe predecir si habrá prórroga en el juego.</p><p><strong>Impar/Par (incl. Prórroga): </strong>Se debe predecir si el total de puntos anotados durante el partido es número impar o par.<strong> </strong>si el resultado final es 0:0, las apuestas se liquidarán como par.</p><p>I<strong>mpar /Par local (incl. Prórroga)</strong>: Se debe predecir si el número total de goles anotados por el equipo local durante el partido es un número par o impar; de lo contrario, si el resultado final es 0: 0, las apuestas se liquidarán como par.</p><p>I<strong>mpar /Par visitante (incl. Prórroga)</strong>: Se debe predecir si el número total de goles anotados por el equipo visitante durante el partido es un número par o impar; de lo contrario, si el resultado final es 0: 0, las apuestas se liquidarán como par.</p><p> </p><p><i><strong>Mercados de Primera mitad</strong></i></p><p><strong>Primera mitad - 1x2: </strong>Se debe predecir el resultado de la primera mitad, hay tres posibles resultados: 1(Equipo local gana), X(Empate) y 2(Equipo visitante gana).Los puntos anotados en la segunda mitad no se tendrán en cuenta y sii la mitad no se completa el mercado se cancela</p><p><strong>Primera mitad - handicap:  </strong>Se debe predecir cuál será el resultado final de la primera mitad, teniendo en cuenta el margen ofrecido.Si la mitad no se completa el mercado se cancela. </p><p><strong>Primera mitad - total:  </strong>Se debe predecir si el número total de puntos anotados únicamente durante la primera mitad, estarán por encima o por debajo del margen ofrecido.Si la mitad no se completa el mercado se cancela</p><p><strong>Primera mitad - apuesta sin empate: </strong>Se debe predecir el ganador de la primera mitad, si la mitad termina en empate, todas las apuestas se cancelaran para este mercado, si la mitad no se completa el mercado se cancela.<strong> </strong></p><p><strong>Primera mitad - Impar/Par: </strong>Se debe predecir si el número total de puntos anotados durante la primera mitad es un número par  o impar. </p><p><strong>Primera mitad - Equipo local  Impar/Par: </strong>Se debe predecir si el número total de puntos anotados por el equipo local durante la primera mitad es un número par o impar.</p><p><strong>Primera mitad - Equipo visitante  Impar/Par: </strong>Se debe predecir si el número total de puntos anotados por el equipo visitante durante la primera mitad es un número par o impar.</p><p><strong>Primera mitad - next score:  </strong>Se debe predecir qué equipo será el siguiente en conseguir una anotación durante el primer tiempo. Hay 3 posibles resultados: 1(Equipo local anotara), X (Ninguno anotara) y 2 (Equipo visitante anotara) .</p><p><i><strong>Mercados de Segunda mitad </strong></i></p><p> </p><p><strong>Segunda mitad - 1x2: </strong>Se debe predecir el resultado de la segunda mitad,hay tres posibles resultados: 1(Equipo local gana), X(Empate) y 2(Equipo visitante gana). Si la mitad no se completa el mercado se cancela</p><p><strong>Segunda mitad - handicap:  </strong>Se debe predecir cuál será el resultado final de la segunda mitad, teniendo en cuenta el margen ofrecido.Si la mitad no se completa el mercado se cancela. </p><p><strong>Segunda mitad - total:  </strong>Se debe predecir si el número total de puntos anotados únicamente durante la segunda mitad, estarán por encima o por debajo del margen ofrecido.Si la mitad no se completa el mercado se cancela</p><p> </p><p><strong>Segunda mitad (incl.prórroga) - apuesta sin empate: </strong>Se debe predecir el ganador de la segunda mitad, si la mitad termina en empate, todas las apuestas se cancelaran para este mercado, si la mitad no se completa el mercado se cancela.<strong> </strong></p><p> </p><p> </p><p><i><strong>Mercados por Cuartos</strong></i></p><p><strong>Primer,segundo, tercer, cuarto -Cuartos:</strong> Los mercados de apuestas de cuartos permiten al jugador apostar sobre el resultado final de cada uno de los cuartos elegidos.</p><p><strong>Cuarto - 1x2:</strong> Se debe predecir el resultado del cuarto seleccionado, los posibles resultados  son: 1(Equipo local gana), X(empata) y 2(Equipo visitante gana). Si el cuarto no se completa, este mercado se cancelará.</p><p><strong>Cuarto - total: </strong>Se debe predecir si el número total de puntos anotados únicamente durante el cuarto seleccionado, estarán por encima o por debajo del margen ofrecido. Si el cuarto no se completa el mercado se cancelará.</p><p><strong>Cuarto - Apuesta sin empate: </strong>Se debe predecir el ganador del cuarto seleccionado, si el cuarto termina en empate, todas las apuestas se cancelarán para este mercado, si el cuarto no se completa el mercado se cancela.</p><p><strong>Cuarto - handicap: </strong>Se debe predecir cuál será el resultado final del cuarto seleccionado, teniendo en cuenta el margen ofrecido.Si el cuarto no se completa el mercado se cancela. </p><p><i><strong>Mercados de drive</strong></i></p><p><strong>“X” drive de la jugada Y- tipo de jugada del competidor: </strong>Se debe predecir si el tipo de jugada es un rush o un pase.  Solo un pase adelantado cuenta como una jugada de pase por definición. Un sack también se considera una jugada de pase.</p><p><strong>“X” drive de la jugada Y - Pase completado del competidor:</strong> Se debe predecir si habrá un pase completo durante la jugada indicada. Por definición, solo un pase hacia adelante se tomará en consideración para una jugada de pase. </p><p><strong>“X”  drive de la jugada Y - Total de yardas ganadas del competidor: </strong>Se debe predecir el total de yardas ganadas durante el juego indicado. No se considerarán las yardas ganadas mediante penalizaciones</p><p><strong>“X” drive de la jugada  Y - Primer down del competidor: </strong>Se debe predecir si el competidor ganará un nuevo primer down durante la jugada indicada. Un touchdown solo se acredita como un nuevo primer down cuando lo anota la ofensiva. Los primeros intentos y yardas ganadas por penalizaciones de juego no serán considerados para liquidar la apuesta<strong> </strong></p><p><strong>“X” drive de la jugada Y - Sack del competidor: </strong>Se debe predecir si habrá un sack o no en la jugada indicada.<strong> </strong></p><p><strong>“X” drive de la jugada Y - Resultado del competidor: </strong> Se debe predecir el resultado del drive durante la jugada indicada de los competidores  (despeje, touchdown, intento de gol de campo) Los diferentes resultados se liquidarán como \"otros\"</p><p>   *En caso de que no haya jugadas, todos los mercados se liquidarán con la siguiente jugada o se anularán si el drive termina antes de llegar a la jugada respectiva..</p><p>  ** En caso de que el drive finalice antes de que se alcance el número de juego respectivo, todos los mercados para el juego respectivo se considerarán cancelados. Esto incluye despejes y goles de campo..</p><p>*** Las yardas de gol de campo no se considerarán para el total de yardas ganadas en una jugada.</p><p> </p><p><i><strong>Mercados especiales por jugador:</strong></i></p><p><strong>Yardas de pase por jugador: </strong>Se debe predecir la cantidad de yardas de pase que hará el jugador elegido solo  en el tiempo reglamentario a menos que el mercado lo especifique. (Incl.Prórroga)</p><p><strong>Yardas de pase por jugador (al menos): </strong>Se debe predecir cuántas yardas de pase al menos que hará el jugador elegido solo  en el tiempo reglamentario a menos que el mercado lo especifique. (Incl.Prórroga)</p><p><strong>Pases completados por jugador: </strong>Se debe predecir la cantidad de pases completados que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique. (Incl.Prórroga) </p><p><strong>Pases completados por jugador (al menos): </strong>Se debe predecir al menos la cantidad mínima de pases completados del jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>touchdown por pase de Jugador: </strong>Se debe predecir la cantidad de touchdown de pase que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>Touchdown por pase de jugador (al menos): </strong>Se debe predecir al menos la cantidad mínima de touchdown por pase que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga) <strong>Intentos de rush del jugador: </strong>se debe predecir la cantidad de intentos de rush  que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>Intentos de rush del jugador: (al menos): </strong>Se debe predecir al menos la cantidad mínima de intentos de rush  que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>Rushing yards del jugador: </strong>Se debe predecir la cantidad de rushing yards que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).</p><p><strong>Rushing yards del jugador (al menos): </strong>Se debe predecir la cantidad mínima de de rushing yards que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga) </p><p><strong>Rushing touchdowns del jugador: </strong>Se debe predecir la cantidad de rushing touchdowns que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga) </p><p><strong>Rushing touchdowns del jugador (al menos): </strong>Se debe predecir la cantidad mínima de rushing touchdowns que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>Recepciones de jugador: </strong>Se debe predecir la cantidad de recepciones que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga) .</p><p><strong>Recepciones de jugador (al menos): </strong>Se debe predecir la cantidad mínima de recepciones que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>Receiving yards de jugador: </strong>Se debe predecir la cantidad de receiving yards que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).</p><p><strong>Receiving yards de jugador (al menos): </strong>Se debe predecir la cantidad mínima de receiving yards que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).</p><p><strong> Receiving touchdowns de jugador: </strong>Se debe predecir la cantidad de receiving touchdowns que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).</p><p><strong> Receiving touchdowns de jugador (al menos): </strong>Se debe predecir la cantidad mínima de receiving touchdowns que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).</p><p><strong>Jugador que anotará el primer touchdown: </strong>Se debe predecir qué jugador anotará el primer touchdown del partido.</p><p><strong>Total de intercepciones lanzadas por el QB:</strong> Se debe predecir la cantidad de intercepciones totales que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga). </p><p><strong>¿Que QB hará el pase más largo?: </strong>se debe predecir qué QB hará el pase más largo  solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).</p><p><strong>Sacks de jugador: </strong>Se debe predecir la cantidad de capturas que hará el jugador elegido solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga).   </p><p><strong>Jugador con el rush más largo:  </strong>Se debe predecir qué jugador hará el rush mas largo solo en el tiempo reglamentario a menos que el mercado lo especifique (Incl.Prórroga)</p><p><strong>Jugador que hará el primer intento de rush:  </strong>Se debe predecir qué jugador hará el primer intento de rush en el partido</p><p><strong>Jugador que realizará la primera intercepción : </strong>Se debe predecir qué jugador realizará la primera intercepción del partido</p><p><strong>Jugador que realizará un pase completo: </strong>Se debe predecir qué jugador realizará el primer pase completo del partido</p><p><strong>Jugador que realizará el rush más largo: </strong>Se debe predecir qué jugador realizará el rush más largo del partido </p><p><strong>Jugador que realizará la intercepción más larga: </strong>Se debe predecir qué jugador realizará la intercepción más larga del partido</p><p><strong>H2h  Yardas de pase: </strong>Se debe predecir cuál de los jugadores ofrecidos registrara la mayor cantidad de yardas de pases durante el partido   </p><p><strong>H2h pases completados: </strong>Se debe predecir cuál de los jugadores ofrecidos registrara la mayor cantidad de pases completados durante el partido </p><p><strong>H2h rushing yards: </strong>Se debe predecir cuál de los jugadores ofrecidos registrara la mayor cantidad de rushing yards durante el partido </p><p><strong>H2h receiving yards: </strong>Se debe predecir cuál de los jugadores ofrecidos registrara la mayor cantidad de receiving yards durante el partido </p><p><strong>H2h recepciones: </strong>Se debe considerar cuál de los jugadores ofrecidos registrara la mayor cantidad de recepciones durante el partido </p><p><i><strong>Fútbol Americano-Outrights:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Ganador de la división/conferencia: </strong>Se<strong> </strong>debe predecir el ganador de la división o conferencia en cuestión  de acuerdo con la clasificación oficial de la competencia.</p><p><strong>Victorias de la temporada regular -Equipo:</strong> Debes predecir cuántas victorias (más/menos) obtendrá el equipo elegido de acuerdo con el ranking oficial de la competencia<strong>.</strong></p><p><strong>¿Llegarán a los playoffs? - Equipo:</strong> Se debe predecir si el equipo mencionado llegará al playoff del torneo en cuestión según el ranking oficial de la competición.. </p><p><strong>Top4, Top6, Top8, Top10: </strong>Se debe predecir si el equipo elegido terminará en la posición respectiva cuando termine la competencia.</p><p><strong>“X” elección en el draft : </strong>Se debe predecir quién será la “X” elección en el draft mencionado</p><p><strong>Posición en el draft - Jugador: </strong>Se debe predecir qué posición obtendrá el jugador ofrecido en el draft mencionado  <strong>H2H - Resultado correcto de la serie: </strong>Se debe predecir el resultado final de la serie de partidos entre los 2 equipos indicados. Se considerarán válidos únicamente los sitios oficiales de cada competición.</p><p><strong>H2H - ¿Cuándo terminará la serie ?: </strong>Se debe predecir en cuántos partidos terminará la serie de partidos entre los 2 equipos indicados. Se considerarán válidos únicamente los sitios oficiales de cada competición.</p><p><strong>H2H - Ganador: </strong>Se debe predecir cuál de los dos equipos indicados se clasificará en la fase de clasificación o ronda de play-off determinada.</p><p><strong>Premios - Jugador más valioso: </strong>Se debe  predecir quién ganará el premio al jugador más valioso de la temporada en cuestión</p><p><strong>Premios- novato ofensivo del año: </strong>Se<strong> </strong>debe predecir quién ganará el premio al jugador ofensivo novato del año de la temporada en cuestión</p><p><strong>Premios - Novato defensivo del año: </strong>Se debe predecir quién ganará el premio al Jugador defensivo novato del año de la temporada en cuestión.</p><p><strong>Para llegar al Superbowl: </strong>Se debe predecir si el equipo seleccionado llegará al Superbowl (Sí) o (No) durante el torneo según el ranking oficial de la competencia.</p><p><strong>Equipo - Posición en el Draft:</strong> Se debe predecir cuál será la posición del equipo en el Draft en cuestión.</p><p><strong> Super Bowl - Conferencia ganadora: </strong>Se debe predecir de qué conferencia vendrá el ganador del Super Bowl.</p><p><strong>Super Bowl - División ganadora: </strong>Se debe predecir de qué división vendrá el ganador de la superbowl.</p><p><strong>Super Bowl - Equipo para ganar el sorteo de la moneda: </strong>Se debe predecir qué equipo ganará el sorteo de la moneda en el Superbowl.</p><p><strong>Super Bowl - MVP: </strong>Se debe predecir que predecir qué jugador será el MVP de la Superbowl.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.4 Boxeo/MMA",
                            "content": "<p><i><strong>BOXEO/MMA</strong></i></p><p>El sonido de la campana es la señal para el inicio de la primera ronda a efectos de apuestas. Cuando un peleador no puede responder a la campana para la siguiente ronda, entonces el otro peleador será considerado el ganador en la ronda anterior.</p><p>Una ronda en MMA cuenta como completa si pasa los 2:30; en boxeo debe superar 1:30 min.</p><p>Cuando una pelea se declara como \"No contest\" (Pelea sin decisión) todas las apuestas serán anuladas, con la excepción de aquellas apuestas que ya hayan sido liquidadas por el desarrollo del evento.</p><p><strong>Empate o empate técnico :</strong> Empate se da por puntos. El empate técnico ocurre si el árbitro detiene la pelea antes de que comience la ronda, por cualquier razón salvo knockout, knockout técnico o descalificación.</p><p><strong>Knockout:</strong> Un knockaut es cuando un luchador no se levanta después de la cuenta de 10. El knockout técnico es cuando se aplica la regla de los 3 nocauts o si el árbitro así lo decide. Cualquier retiro en la esquina se considerará un knockout técnico a menos que la pelea se decida por los puntos de los jueces o si se declara como \"No contest\".</p><p><strong>Decisión Técnica:</strong> Se decide por los puntos de marcador de los árbitros antes del final de la pelea</p><p><i><strong>Mercados de boxeo:</strong></i></p><p><strong>Ganador: </strong>Predice el ganador del evento<strong>.</strong></p><p><strong>Ganador(1X2): </strong>Se debe predecir el ganador de la pelea,Hay 3 posibles resultados, Gana 1, gana 2 o empate.</p><p><strong>Total de rondas:</strong> Se debe predecir el total de rondas disputadas durante la pelea en términos de más o menos.</p><p><strong>Método de victoria : </strong>Se debe predecir quién ganará la pelea y cuál será el método de victoria, (KO, decisión o empate).</p><p><strong>La pelea irá a decisión (si/no): </strong>Se debe  predecir si la pelea completara todos los rounds y el método de victoria es la decisión de los jueces.</p><p><strong>Ganador &amp; Rondas exactas: </strong>Se debe predecir el ganador de la pelea y exactamente cuantas rondas tendrá la misma, o empate/decisión.</p><p><strong>Ganador &amp; rango de rondas: </strong>Se debe predecir el ganador de la pelea y exactamente dentro de cual rango acabará la misma.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.5 Beisbol",
                            "content": "<p><i><strong>BÉISBOL</strong></i></p><p><strong>Reglas de beisbol</strong></p><p> </p><p><strong>Liga de beisbol MLB:</strong> El mercado “Moneyline” (Ganador del encuentro) es considerado decidido si los oficiales de la liga lo consideran completado y si: </p><ol><li>Al menos 5 entradas se completan en su totalidad.</li></ol><p><strong>O</strong></p><ol><li>4.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera. En el resto de los casos, las apuestas se cancelan.</li></ol><p> </p><p> Para aclarar, todos los demás mercados se consideran decididos si :</p><ol><li>al menos 9 entradas se completan.</li></ol><p><strong>O</strong></p><ol><li>8.5 entradas se han completado y el equipo local (o el equipo bateando en segundo) va en la delantera. </li></ol><p> </p><p>En todos los demás casos, las apuestas se cancelarán. En el evento de una “Mercy Rule”, todas las apuestas se mantendrán y decidirán en base al resultado en ese momento.</p><p>Liga de beisbol MLB, todas las <strong>Líneas de Pitcher</strong> (Mercados <strong>PL </strong>para Moneyline, Handicap y Totales) serán cancelados en caso de que el pitcher inicial listado cambie.Las apuestas realizadas en las Líneas de Pitchers incluirán la indicación (PL) en el tiquete y en el historial de apuestas. En caso de que el indicador (PL) no sea visible en el tiquete, la apuesta está hecha en las líneas de Acción y se cerrarán respectivamente. Las Líneas de Acción serán liquidadas basándose en el resultado del evento sin importar que los pitchers hayan cambiado antes. Cualquier Línea de Pitcher ofrecida de nuevo luego de un cambio seguirá las mismas reglas que las antes mencionadas.Las líneas de Acción siguen los reglamentos generales con ciertas excepciones en la MLB, como se mencionó antes. </p><p> </p><p> </p><p> </p><p>En un partido de Béisbol de<strong> 7 entradas jugadas</strong>, todos los mercados  se consideran decididos si:</p><ol><li>Al menos 7 entradas se completan</li></ol><p><strong>O</strong></p><ol><li>6.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera.</li></ol><p> </p><p>La excepción es la moneyline (ganador del partido) que se considera decidido si:</p><ol><li>se completan al menos 5 entradas</li></ol><p><strong>O</strong></p><p>2. Se completan 4.5 entradas y el equipo local (o el equipo que bate en segundo lugar) está adelante..</p><p>En todos los demás casos, las apuestas se liquidan como canceladas.</p><p> </p><p><i><strong>Mercados principales</strong></i></p><p><strong>Money Line (1/2) (incl. entradas extras): </strong>Esta apuesta es equipo contra equipo, independientemente del lanzador abridor.</p><p><strong>Handicap (incl. entradas extras): </strong>Se predecir el ganador de todo el partido sumando o restando el margen indicado al resultado del partido, incluidas las entradas adicionales.</p><p><strong>Total (incl. entradas extras): </strong>En esta apuesta debes especificar el número total de carreras logradas por ambos equipos.</p><p><strong> Total de carreras del Local (incl. entradas extras)</strong> En esta apuesta se debe especificar el número total de carreras logradas por el equipo de casa.</p><p><strong> Total de carreras del visitante(incl. entradas extras)</strong> En esta apuesta se debe especificar el número total de carreras logradas por el equipo de Visitante.</p><p><strong>Hits Totales (incl. entradas extras)</strong> <strong>: </strong>En esta apuesta debes especificar el número total de aciertos logrados por ambos equipos.</p><p><strong>Hits Totales del Local (incl. entradas extras):</strong> En esta apuesta debes especificar el número total de aciertos logrados por el equipo Local.</p><p><strong>Hits Totales del Visitante (incl. entradas extras)</strong> <strong>:</strong> En esta apuesta debes especificar el número total de aciertos logrados por el equipo Visitante.</p><p><strong>Gana la entrada actual o  la siguiente: </strong>La primera y la segunda parte de la entrada especificada deben completarse, excepto cuando el equipo que golpea el segundo está ganando cuando el juego está suspendido o abandonado.</p><p><strong>Total de carreras en la entrada X:</strong> La primera y la segunda parte de la entrada especificada deben completarse, a menos que la apuesta ya haya sido liquidado.</p><p><strong>Puntaje de la entrada actual o la siguiente: </strong>La primera y la segunda parte de la entrada especificada deben completarse, a menos que la apuesta ya haya sido liquidado.</p><p><strong>Marcador de la entrada actual / Hit en ½ entrada o en el siguiente: </strong>La primera y la segunda parte de la entrada específica deben completarse a menos que se haya completado una carrera o se haya realizado un hit, cuando el juego sea suspendido o abandonado.</p><p><strong>Equipo con el mayor número de hits en la entrada actual o la siguiente: </strong>La primera y la segunda parte de la entrada especificada deben completarse, a menos que la apuesta ya haya sido liquidado.</p><p><strong>Hits totales en la entrada actual o la siguiente o total de carreras en la entrada actual o la siguiente :</strong> La primera y la segunda parte de la entrada especificada deben completarse, a menos que la apuesta ya haya sido liquidado.</p><p><strong>Líder después de x entrada: </strong> La primera y la segunda parte de la entrada especificada deben completarse, a menos que la apuesta ya haya sido liquidado.</p><p><strong>Mercados de 'Primero en anotar X'/totales del equipo/Hits Totales: </strong>Se aplicará la regla de las 8½  entradas, a menos que las apuestas ya se hayan resuelto o que los finales naturales (p. Ej., Sin suspender el partido) del partido determinen las apuestas.</p><p>Si un partido llega a un empate y el final natural del partido (p. Ej. Sin suspender el partido) requiere un ganador, las apuestas en los mercados 'Carrera hasta xx' serán anuladas. Por ejemplo, si un juego de la MLB se suspende o se abandona, o se suspende con un marcador de 3-3 después de 10 entradas, las apuestas en la cuarta carrera se anularán. Las apuestas en los mercados de 5, 6 o 7 carreras se liquidarán como nulas.</p><p> </p><p><strong>Siguiente equipo en anotar:</strong> En el caso de que se suspenda el partido, se valorarán todas las apuestas a carreras que ya se hayan anotado. Las apuestas en la próxima carrera en el momento de la suspensión o abandono serán anuladas.</p><p><strong>Margen de victoria: </strong>Se aplicará la regla de las 8 1⁄2 entradas. Incluye entradas adicionales para MLB (Major League Baseball). Para MLB, un juego que termina en empate, las apuestas que no ofrecen una opción de empate serán anuladas; en el caso de eventos que no sean de la MLB en los que el juego pueda terminar en empate, esa opción estará disponible.</p><p><strong>Cuando será anotada la primera carrera (incl. entradas extras): </strong>Predice en qué inning será anotada la primera carrera.</p><p><strong>Ganador y Total : </strong>Este mercado de apuestas combina dos mercados de apuestas principales en los que debes predecir quién ganará el partido y cuántas carreras totales (más / menos) se anotarán en el partido.</p><p><strong>IMPORTANTE: </strong>Le recomendamos que considere el siguiente ejemplo en el mercado de margen de ganancia en nuestro modo de juego en vivo. Nuestra plataforma puede mostrar el mercado de la siguiente manera: +3 (carreras), -3 (carreras) Donde el signo (+) significa equipo local y el signo (-) equipo visitante, &gt; = + 3 and &lt;= - 3 donde el primero significa más o igual a 3 carreras del equipo local y el segundo menor              o igual a 3 carreras del equipo visitante.</p><p><strong>Máximo número de carreras consecutivas: </strong>Se debe predecir qué equipo marcará la mayor cantidad de carreras consecutivas.<br><strong>Carreras exactas en la entrada con más carreras : </strong>Tienes que predecir el número exacto de carreras en la entrada con la puntuación más alta.</p><p><strong>Rango de carreras  (incl. entradas extras) : </strong>Se debe predecir un rango dentro del cual estarán las carreras totales del evento.</p><p><strong>Resultado del X lanzamiento: </strong>Se debe predecir el resultado del lanzamiento mencionado.</p><p><strong>Hit en el lanzamiento X: </strong>Se debe predecir si habrá un hit en el lanzamiento mencionado o no.</p><p><strong>Home run en el lanzamiento: </strong>Se debe predecir si habrá un hit en el lanzamiento mencionado o no.</p><p><i><strong>Mercados por entradas:</strong></i></p><p><strong>X entrada- 1X2: </strong>Predecir el resultado de la entrada mencionada.</p><p><strong>X entrada - total: </strong>En esta apuesta debes especificar el número total de carreras logradas por ambos equipos en la entrada mencionada</p><p><strong>X entrada - equipo en anotar:  </strong>Se debe predecir qué equipo marcará en la entrada mencionada.</p><p><strong>X entrada - handicap: </strong>Se debe predecir el ganador de la entrada mencionada sumando o restando el margen indicado al resultado del partido.</p><p><strong>X entrada- hits totales : </strong>Se debe predecir el número total de hits de la entrada mencionada.</p><p><strong>X entrada -hits totales  por equipo: </strong>Se debe predecir el número total de hits para el equipo local o visitante de la entrada mencionada.</p><p><strong>Entrada  1 a 5 - 1X2: </strong>Predice el resultado de las entradas 1 a 5.</p><p><strong>Entrada 1 a 5 - total: </strong>Se debe especificar el número total de carreras logradas por ambos equipos en las entradas 1 a 5.</p><p><strong>Entrada 1 a 5 - handicap: </strong>Se debe predecir el ganador de las entradas 1 a 5 sumando o restando el margen indicado al resultado del partido.</p><p><strong>Entrada 1 a 5 -  hits totales : </strong>Se debe predecir el número total de hits de las entradas 1 a 5.</p><p><strong>Entrada 1 a 5 - hits totales  por equipo:  </strong>Se debe predecir el número total de hits para el equipo local o visitante en las entradas 1 a 5.</p><p><strong>Equipo en ganar más entradas: </strong>Se debe predecir qué equipo ganará más entradas en el partido.</p><p><strong>Equipo con la entrada con mayor puntuación : </strong>Se debe predecir qué equipo tendrá la puntuación más alta en una sola entrada (o si habrá un empate).</p><p><strong>Habrá entradas extra: </strong>Se debe predecir si el evento (sí-no) tendrá entradas extra.</p><p><strong>primeras x entradas 1x2 &amp; 1x2 (inc. entradas extras): </strong>Se debe predecir el resultado de las primeras X entradas, así como el resultado al final del partido.</p><p><strong>Ambos equipos en anotar más de x.5 carreras (inc. entradas extras): </strong>Se debe predecir si ambos equipos anotarán más de X carreras en el partido o no.</p><p><strong>Primero en anotar X carreras (inc. entradas extras):</strong> Se debe predecir qué equipo llegará primero en X carreras, incluidas las prórrogas.</p><p><strong>Equipo local bateara en la novena entrada : </strong>Se debe predecir si el equipo local batea en la novena entrada.</p><p><strong>Total de entradas sin carreras: </strong>Se debe predecir cuántas entradas terminarán sin anotar (0-0).</p><p><strong>entrada con más carreras : </strong>Se debe predecir cuál será la entrada con la puntuación más alta.</p><p><strong>¿Cuándo se decidirá el encuentro?: </strong> Se debe predecir en qué entrada se decidirá el partido.</p><p> </p><p><i><strong>Mercados especiales por Jugador</strong></i></p><p><strong>Ponches de Jugador: </strong>Se debe predecir la cantidad de ponches que hará el jugador específico.</p><p><strong>Ponches de Jugador(Mínimo): </strong>Consiste en predecir al menos cuántos ponches hará el jugador específico.</p><p><strong>Hits del Jugador: </strong> Consiste en predecir al menos cuántos golpes dará el jugador específico.</p><p><strong>Bases totales del Jugador(Mínimo): </strong>Consiste en predecir al menos cuántas bases totales hará el jugador específico.</p><p><strong>hits + runs + rbi del jugador: </strong>Consiste en predecir la cantidad de hits, carreras y rbi combinados que hará el jugador específico.</p><p><strong>hits + runs + rbi del jugador(mínimo): </strong>Consiste en predecir al menos cuántos hits, carreras y rbi combinados hará el jugador específico.</p><p><strong>Cuadrangulares de Jugador(at least): </strong>Consiste en predecir al menos cuántos cuadrangulares hará el jugador específico.</p><p><strong>H2H bases totales: </strong>Consiste en predecir cuál de los jugadores mencionados registrará más bases totales en el partido.</p><p><strong>H2H ponches totales: </strong>Consiste en predecir cuál de los jugadores mencionados registrará más ponches en el partido.</p><p><strong>Hits del Jugador + total  de bases: </strong>Consiste en predecir la cantidad de golpes combinados y el total de bases que hará el jugador específico.</p><p><strong>Total de bases del jugador + carreras + rbi: </strong>Consiste en predecir la cantidad de bases, carreras y rbi totales combinados que hará el jugador específico.</p><p> </p><p><i><strong>Béisbol-Outrights: </strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo dado de acuerdo con el ranking oficial de la competencia.</p><p><strong>Ganador Division / Conferencia: </strong>Se debe  predecir el ganador de la división o conferencia determinada de acuerdo con el ranking oficial de la competencia.</p><p><strong>Puntos en la temporada regular - Equipo: </strong>Se debe predecir cuántos puntos (más / menos) acumulará el equipo mencionado de acuerdo con el ranking oficial de la competencia.</p><p><strong>H2H -Puntaje exacto de la serie: </strong>Se debe predecir el resultado final de la serie de partidos entre los 2 equipos indicados. A los efectos de informar se considerarán válidos únicamente los sitios oficiales de cada competición.</p><p><strong>H2H - Cuando acabará la serie?: </strong>Se debe predecir en cuántos partidos terminará la serie de partidos entre los 2 equipos indicados. A los efectos de informar se considerarán válidos únicamente los sitios oficiales de cada competición.</p><p><strong>H2H - Ganador: </strong>Se debe predecir cuál de los dos equipos indicados se clasificará en la fase de clasificación o ronda de play-off determinada.</p><p><strong>Llegarán a las eliminatorias? - Equipo: </strong>Se debe predecir si el equipo mencionado llegará a los playoffs del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Top4, Top6, Top8, Top10: </strong>Se debe predecir si el equipo seleccionado terminará en la posición superior respectiva cuando termine la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.6 Tenis",
                            "content": "<p><i><strong>TENIS</strong></i></p><p><i><strong>Reglas generales:</strong></i></p><p>Los partidos de <strong>tenis </strong>se mantendrán abiertos y sus apuestas válidas hasta que los oficiales o el organismo que organice el evento declare un ganador. En dichos casos, la regla de 48 horas no es válida. Sin embargo y en caso de un retiro de  algún jugador, todos los mercados que hayan sido decididos en el juego serán liquidados respectivamente y todos los demás se cancelarán. Para aclarar, si un jugador se retira antes que el último punto se complete, el mercado del ganador del encuentro será cancelado pero todos los mercados relacionados con sets o juegos específicos que hayan sido decididos durante el encuentro, se liquidarán respectivamente.</p><p><strong>Tie Break</strong>: Es un juego que se da cuando dos competidores alcanzan la puntuación 6-6 en cualquier set y consiste en que uno de los dos jugadores llegue a 7 puntos con una diferencia de 2 puntos con su rival, cabe mencionar que para el mercado más/menos, el tie break cuenta como solo un juego, sin importar la longitud del mismo.</p><p><strong>Super Tie Break:</strong> Tiene una descripción similar al Tie break, con la diferencia de que uno de los dos jugadores llega a los 10 puntos con una diferencia de 2 puntos con su rival, cabe mencionar que para el mercado más/menos, el tie break cuenta como solo un juego, sin importar la longitud del mismo. Un tie break o super tie break se considera válido si la decisión de dicho tie break se realiza antes del comienzo del mismo.</p><p> </p><p> </p><p><strong>Como se manejan los Tie breaks en grandes torneos</strong></p><p><strong>Australian Open</strong>. En el Australian Open,  en juegos sencillos se usa el método super tie break cuando el puntaje del juego en el último set es 6-6. Para dobles, en el Australian Open y el US Open, los jugadores jugarán un tiebreak en lugar de un set final.</p><p><strong>French Open</strong>. El French Open es el único Grand Slam que no utiliza tie breaks para decidir un ganador del set final en partidos individuales.</p><p><strong>US Open.</strong> Para el US Open, los jugadores usan un tie break de 12 puntos en el acontecimiento de un empate 6-6.</p><p><strong>Wimbledon</strong>. En Wimbledon, si los jugadores empatan en el juego 12 del set final, se jugará una ronda de tie break.</p><p><i><strong>Mercados principales</strong></i></p><p><strong>Ganador (1,2):</strong> Consiste en predecir el ganador del partido sin importar la diferencia de puntos.</p><p><strong>Hándicap de juegos </strong>(margen): Se debe predecir el ganador del partido adicionando o sustrayendo el margen indicado  al resultado final del encuentro.</p><p><strong>Hándicap de Sets: </strong>Se debe predecir el resultado del partido en términos de sets adicionando o sustrayendo el margen indicado  al resultado final del encuentro.</p><p><strong>Resultado Correcto:</strong> Se debe predecir el resultado exacto  del partido en términos de sets ganados por cada jugador. Si uno de los jugadores se retira, este mercado será considerado como invalido.</p><p><strong>Juegos Totales (Más/Menos): </strong>Se debe predecir si el  total de juegos en el encuentro es mayor o menor que el margen total ofrecido.</p><p><strong>Impar/Par juegos : </strong>Se debe predecir si el  total de juegos durante el encuentro es un número par o impar.</p><p><strong>Juegos Totales (Más/Menos) Jugador 1: </strong>Se debe predecir si el total de juegos del jugador 1 será menos o más que el margen indicado. Un tie break se considera como 1 juego. La cantidad de juegos completados será indicada en la liquidación de apuestas como el segundo número dentro de las llaves. Si un jugador se retira, las apuestas con un margen no decidido en el juego se cancelarán. </p><p><strong>Juegos Totales (Más/Menos) Jugador 2: </strong>Se debe predecir si el total de juegos del jugador 2 será menos o más que el margen indicado. Un tie break se considera como 1 juego. La cantidad de juegos completados será indicada en la liquidación de apuestas como el segundo número dentro de las llaves. Si un jugador se retira, las apuestas con un margen no decidido en el juego se cancelarán. </p><p><strong>Ganador &amp; Total: </strong>Consiste en predecir el ganador del partido y si el total de juegos es mayor o menor que el margen ofrecido.</p><p><strong>Tiebreak (si / no):</strong> <strong> </strong>Se debe predecir si habrá o no un tie break en el partido.</p><p><strong>Deuce en el partido (Si/No): </strong>\"Deuce en el partido\" quiere decir que en algún momento, el resultado de algún juego llegará a un puntaje de  40-40.</p><p><i><strong>Mercados por Set </strong></i></p><p><strong>Ganador del 1er Set:</strong> Se debe predecir el ganador del primer set. La apuesta se cancela si el primer set no se completa.</p><p><strong>Ganador del 2ndo Set:</strong> Se debe predecir el ganador del segundo set.La apuesta se cancela si el segundo set no se completa.</p><p><strong>Ganador del Set X :</strong>  Se debe predecir el ganador del set numero X. La apuesta se cancela si X set no se completa.</p><p><strong>Doble resultado (Primer set/ partido):</strong> Se debe predecir el ganador del primer set y del ganador del partido en un solo mercado de apuesta.</p><p><strong>Jugador 1 gana exactamente 1 set:</strong> Se debe predecir si el jugador 1 gana un solo set durante el partido.</p><p><strong>Jugador 2 gana exactamente 1 set:</strong> Se debe predecir si el jugador 2 gana un solo set durante el partido.</p><p><strong>Sets Exactos: </strong>Se debe predecir la cantidad exacta de sets en el partido.</p><p><strong>Total de sets:</strong> Se debe predecir si el  total de sets del encuentro es mayor o menor que el margen total ofrecido.</p><p><strong>Cualquier set a cero: </strong>Se debe predecir si al menos alguno de los sets acabará con un resultado de 6/0 o 0/6 como resultado exacto.</p><p><strong>Hándicap de juegos del Set X:</strong> Se debe predecir el ganador del set X adicionando o sustrayendo el margen indicado  al resultado final del encuentro. La apuesta se cancela si dicho set no se completa.</p><p> </p><p><strong>Total de juegos del Set X:</strong> Se debe predecir si el número total de juegos completados durante el set X es mayor o menor que el margen ofrecido.</p><p> </p><p><strong>Resultado correcto del Set X: </strong>Se debe predecir el resultado exacto del set X. Si el set mencionado no se completa, las apuestas se cancelan.</p><p><strong>Jugador 1 gana un(1) set:</strong> Se debe predecir si el jugador 1 gana o no, al menos un solo set durante el partido. Hay dos posibles resultados: SI y NO.</p><p><strong>Jugador 2 gana un(1) set:</strong> Se debe predecir si el jugador 2 gana o no, al menos un solo set durante el partido. Hay dos posibles resultados: SI y NO.</p><p><strong>Set X Impar/Par: </strong>Se debe predecir si el número total de juegos completados durante el set X es un número par o impar.</p><p><strong>Habrá un tiebreak en el Set X : </strong> Se debe predecir si habrá un tiebreak durante el set X.</p><p><strong>Set “N” - Primero en ganar  X juegos: </strong>Se debe predecir qué jugador conseguirá X juegos ganados antes en un set específico.</p><p><strong>Quién ganará Juegos (X y Y) del set N :</strong> El mercado consiste en predecir qué jugador ganará los juegos X y Y en el se N, Ejemplo: 1( juegos 6 y 7) segundo set( apuesta al jugador 1) - X ( juegos 6 y 7) segundo set( apuesta al empate) - 2 ( juegos 6 y 7) segundo set( apuesta al jugador 2). </p><p><strong>Quién ganará el punto X en el juego Y en el set N? (Incluye apuestas en vivo): </strong>Predice el jugador que ganará el punto X en el juego Y en el set N. Ejemplo: el jugador Wawrinka gana el primer punto del juego 10 en el tercer set del partido.</p><p><strong>Quién ganará el juego X en el set(1, 2, 3, 4,5)? (Incluye apuestas en vivo):</strong> Predice el jugador que ganará el juego X del set especificado en la apuesta. Ejemplo: 1 (juego 10)  segundo set - 2 (juego 10)  segundo set.</p><p><strong>Número exacto de puntos en el juego X (Primer set) (Incluye apuestas en vivo): </strong>Se debe predecir el número exacto de puntos completados en el juego escogido del primer set en la apuesta.</p><p><strong>Deuce en el juego (Si/No): </strong>\"Deuce en el partido\" quiere decir que, en algún momento, el resultado del juego actual llegará a un puntaje de  40-40.</p><p><strong>Resultado del juego X (Set N) jugador 1 o 2 (0-15-30-40):</strong> Consiste en predecir el ganador de un juego, y cuantos puntos conseguirá el jugador rival (0-15-30-40), lo que significa que si se apuesta a:  jugador 1 a 30, significa que el juego lo ganará el jugador 1 y el jugador 2 conseguirá 30 puntos.</p><p><strong>Set “N” juego X - Impar/Par puntos: </strong>Consiste en predecir si el número de puntos jugados en un juego de un set, será par o impar</p><p><strong>Set “N” juego X - puntuación correcta o quiebre:</strong> Consiste en predecir el ganador de un juego, y cuantos puntos conseguirá el jugador rival (0-15-30-40), o si habrá un quiebre durante el servicio del juego mencionado.</p><p><strong>Set “N” juego Y - Primero en marcar x puntos: </strong>Se debe predecir qué jugador conseguirá X puntos ganados antes en un juego específico.</p><p><strong>Set “N” game Y - Ganador primeros x puntos: </strong>Se debe predecir qué jugador conseguirá marcar X puntos ganados antes en un juego específico.</p><p> </p><p><i><strong>Tenis - Outrights</strong></i></p><p><strong>Ganador :</strong> Se debe predecir el ganador del torneo designado de acuerdo al ranking de la competencia.</p><p><strong>Etapa de Eliminación:</strong> Predice en qué ronda será eliminado el jugador seleccionado.</p><p><strong>Llegará a la final:</strong> Predice si el jugador seleccionado llegará a la final del torneo en cuestión. </p><p><strong>Nombre de los Finalistas:</strong> Se debe predecir quienes serán los dos jugadores en llegar a la final del torneo en cuestión.</p><p><strong>Cuarto ganador: </strong>Se debe predecir si el ganador del torneo vendrá del 1er/2do/3er/4to cuarto.</p><p><strong>Mitad ganadora: </strong>Se debe predecir si el ganador del torneo vendrá de la mitad de abajo o la mitad de arriba.</p><p><strong>Ganador 1/2/3/4/ cuarto</strong>: Se debe predecir el ganador del cuarto (1st/2nd/3rd/4th).</p><p><strong>Quién llegará más lejos: </strong>Se debe predecir cuál de los dos jugadores listados llegará más lejos en el torneo que el otro.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.7 Voleibol/voleibol de playa",
                            "content": "<p><i><strong>VÓLEIBOL</strong></i></p><p>Un partido de voleibol no tiene una duración específica, el partido depende de los sets ganados por cada equipo, una vez que un equipo gana 3 sets con un máximo de 5 sets, el partido termina.</p><p>Si un partido no se completa, las apuestas al final de los partidos se cancelarán y se reembolsará la apuesta, pero si se determinaron los mercados de apuestas, no sucederá ya que es el balance del juego en vivo.</p><p><i><strong>Mercados Principales:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir si el ganador del partido será el equipo local (1) o el equipo visitante (2)</p><p><strong>Hándicap de puntos: </strong>se debe predecir el ganador de todo el partido (en puntos ganados) sumando o restando el margen indicado al resultado del partido (en puntos).</p><p><strong>Puntos Totales: </strong>Se debe predecir si el total de puntos anotados por ambos equipos será mayor o menor que el número dado en el mercado de apuestas elegido.</p><p><strong>Sets exactos: </strong>Se debe<strong> </strong>predecir si el número total de sets jugados en el partido será mayor o menor que el número dado en el mercado de apuestas elegido.</p><p><strong>¿Habrá un 4to set?: </strong>Se Debe predecir si se jugará o no  el 4to set del partido.</p><p><strong>¿Habrá un 5to set?: </strong>Se debe predecir si se  jugará o no  el 5to set del partido para definir el equipo ganador.</p><p><strong>Puntuación correcta: tienes que predecir la puntuación correcta del partido en términos de sets ganados por cada equipo.</strong></p><p><strong>Equipo local para ganar un set: </strong>Se debe predecir si el equipo local ganará al menos un set.</p><p><strong>Equipo visitante para ganar un set: </strong>Se debe  predecir si el equipo visitante ganará al menos un set.</p><p><strong>El equipo local ganará exactamente un set: </strong>Se debe predecir si el equipo local ganará exactamente un set<strong>.</strong></p><p><strong>El equipo visitante ganará exactamente un set: </strong>Se debe predecir si el equipo visitante ganará exactamente un set.</p><p><strong>El equipo local ganará exactamente dos sets: </strong>Se debe predecir si el equipo local ganará exactamente dos sets.</p><p><strong>El equipo visitante ganará exactamente dos sets: </strong>Se debe predecir si el equipo visitante ganará exactamente dos sets</p><p><strong>¿Cuántos sets se decidirán por puntos extra?: </strong>Se debe predecir cuántos sets alcanzarán puntos extra (el ganador del set tiene más de 25 puntos).</p><p><strong>“X” Set - “N” Punto: </strong>Se debe predecir qué equipo ganará el punto N del set X.</p><p> </p><p><i><strong>Mercados de Set:</strong></i></p><p><strong>1ro/2do/3ro/4to/5to set - Ganador: </strong>Se debe predecir si el ganador del set mencionado será el equipo local (1) o el equipo visitante (2)</p><p><strong>1ro/2do/3ro/4to/5to set - Total de puntos: </strong>Se debe predecir si el total de puntos acumulados por ambos equipos en un set determinado estará por encima o por debajo del margen ofrecido en el mercado.</p><p><strong>1ro/2do/3ro/4to/5to set - Hándicap de puntos: </strong>Se debe predecir el ganador del set mencionado (en puntos ganados) sumando o restando el margen indicado al resultado del partido (en puntos).</p><p><strong>1ro/2do/3ro/4to/5to set - par / impar: </strong>predice si el total de puntos acumulados por ambos equipos en el X set  será un número par o impar.</p><p><strong>1ro/2do/3ro/4to/5to set - carrera a X puntos: </strong>Se debe predecir qué equipo alcanzará X puntos primero para el Set elegido</p><p><i><strong>Mercados de Outright:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Top4, Top6, Top8, Top10: </strong>Se<strong> </strong>debe predecir si el equipo seleccionado terminará en la posición superior respectiva cuando termine la competencia.</p><p> </p><p><i><strong>voleibol de playa</strong></i></p><p>Un partido de voleibol de  playa no tiene una duración determinada, el partido depende de los sets ganados por cada equipo</p><p>Si un jugador es reemplazado por otro jugador antes del inicio del partido, todas las apuestas serán anuladas. Si un partido comienza pero no se completa, todas las apuestas basadas en el resultado final se considerarán nulas, con la excepción de los mercados donde el resultado ya se ha determinado.</p><p> </p><p><i><strong>Mercados Principales:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir si el ganador del partido será el equipo local (1) o el equipo visitante (2)</p><p><strong>Sets exactos: </strong>Se debe<strong> </strong>predecir si el número total de sets jugados en el partido será mayor o menor que el número dado en el mercado de apuestas elegido..</p><p><strong>Puntuación correcta: </strong>Se debe predecir la puntuación correcta del partido en términos de sets ganados por cada equipo.</p><p><strong>Hándicap de puntos: </strong>Se debe  predecir el ganador de todo el partido (en puntos ganados) sumando o restando el margen indicado al resultado del partido (en puntos).</p><p><strong>Puntos Totales: </strong>Se debe predecir si el total de puntos anotados por ambos equipos será mayor o menor que el número dado en el mercado de apuestas elegido<strong>.</strong></p><p><strong>¿Cuántos sets se decidirán por puntos extra?: Se debe predecir cuántos sets alcanzarán puntos extra.</strong></p><p><i><strong>Mercados por Set:</strong></i></p><p><strong>1ro/2do/3ro/4to/5to set - Ganador: </strong>Se debe predecir si el ganador del set mencionado será el equipo local (1) o el equipo visitante (2)</p><p><strong>1ro/2do/3ro/4to/5to set - Total de puntos: </strong>Se debe predecir si el total de puntos acumulados por ambos equipos en un set determinado estará por encima o por debajo del margen ofrecido en el mercado.</p><p><strong>1ro/2do/3ro/4to/5to set - Hándicap de puntos: </strong>Se debe predecir el ganador del set mencionado (en puntos ganados) sumando o restando el margen indicado al resultado del partido (en puntos).</p><p><strong>1ro/2do/3ro/4to/5to set - par / impar: </strong>predice si el total de puntos acumulados por ambos equipos en el X set  será un número par o impar.</p><p><strong>1ro/2do/3ro/4to/5to set - carrera a X puntos: </strong>Se debe predecir qué equipo alcanzará X puntos primero para el Set elegido</p><p> </p><p><i><strong>Mercados Outright:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.8 Rugby",
                            "content": "<p><i><strong>RUGBY / RUGBY LEAGUE</strong></i></p><p>A menos que se especifique lo contrario, todas las apuestas en partidos de Rugby / Rugby League se calculan para 80 minutos de juego, lo que incluye cualquier tiempo adicional agregado por el árbitro, si un partido se suspende antes del final del tiempo reglamentario, todas las apuestas en ese partido serán anuladas, excepto por aquellos mercados que ya se hayan liquidado.</p><p><i><strong>Mercados Principales:</strong></i></p><p><strong>1X2: </strong>Se debe  predecir el resultado de todo el partido. Hay 3 resultados posibles: 1 (el equipo local gana), X (los equipos empatarán), 2 (el equipo visitante gana).</p><p><strong>Doble oportunidad: </strong>Se debe predecir el resultado de todo el partido. Hay 3 resultados posibles: 1X (al final del partido el equipo local gana o empata), X2 (al final del partido el equipo visitante gana o empata), 12 (al final del partido el equipo local gana o el equipo visitante gana).</p><p><strong>Apuesta sin empate: </strong>este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador, lo que significa que, si el partido termina en empate, se devolverá el dinero apostado. Por ejemplo, si un resultado final da como resultado un empate, la apuesta se liquidará como cancelada..</p><p><strong>Hándicap: </strong>apuesta en la que se debe decidir el ganador del juego con un margen de gol respectivo. La puntuación correcta se suma o resta de los puntos propuestos en el hándicap, y luego de dicha operación se determinará quién gana: equipo de casa, empate o equipo visitante.</p><p><strong>Handicap (3 way): </strong>Se debe predecir el resultado final del partido teniendo en cuenta el hándicap entre paréntesis. Por ejemplo, (0: 1) indica que el equipo visitante tiene un gol de ventaja, mientras que (1: 0) indica que el equipo local tiene un gol de ventaja.</p><p><strong>Total: </strong>Se debe predecir si el número total de puntos anotados durante todo el partido estará por encima o por debajo del margen ofrecido.</p><p><strong>Total del equipo: </strong>Se debe predecir si el número total de puntos anotados por el equipo local o visitante durante todo el partido estará por encima o por debajo del margen indicado<strong>.</strong></p><p><strong>Margen de victoria: </strong>Se debe predecir el margen de victoria en el partido para el equipo local o visitante, o si el partido termina en empate<strong>.</strong></p><p><strong>Medio tiempo/Tiempo completo:</strong> Se debe predecir el resultado del primer tiempo del partido junto con el resultado de todo el partido. Los posibles resultados son: (1/1, 1 / X, 1/2, X / 1, X / X, X / 2, 2/1, 2 / X y 2/2).</p><p><strong>Mitad con mayor puntuación: </strong>Se debe predecir cuál de las dos mitades del partido tendrá una mayor cantidad de puntos.</p><p><strong>Impar/Par: </strong>Se debe predecir si el resultado del partido es un número par o impar, si el resultado del partido es \"0: 0\", las apuestas se cuentan como \"par\"<strong>.</strong></p><p><strong>Rango de puntos: </strong>Se debe predecir el rango de puntos durante el partido.</p><p><strong>¿Clasificara?: </strong>Se debe predecir si el equipo elegido se clasificará para la siguiente fase del torneo.</p><p><strong>¿Qué equipo ganará la final?: </strong>Se debe predecir qué equipo ganará la final del torneo seleccionado.</p><p><strong>¿Qué equipo ganará el 3er lugar?: </strong>Se debe predecir qué equipo se clasificará en la tercera posición en el torneo seleccionado.</p><p><strong>¿Qué equipo gana el resto del partido?: </strong>Se debe predecir  quién ganará el resto del partido. Desde el momento en que se realiza la apuesta, la puntuación cuenta como 0: 0 independientemente de la puntuación real del partido.</p><p><strong>Prórroga - 1x2: </strong>Se debe predecir qué equipo ganará el tiempo extra del juego.</p><p><strong>Primera jugada anotadora (Prelive): </strong>Se debe predecir cómo se anotarán los primeros puntos del partido. 6 son los posibles resultados:</p><p>Equipo local con intento</p><p>Equipo local con penalti</p><p>Equipo local con un  drop goal</p><p>Equipo visitante con intento</p><p>Equipo visitante con penalti</p><p>Equipo local con un  drop goal</p><p> </p><p><strong> Primero En anotar x puntos: </strong>Se debe predecir qué equipo llegará primero a X puntos durante el partido.</p><p><strong>Próxima jugada puntuable (en vivo): </strong>Se debe predecir cómo se anotarán los puntos X en el partido. 6 son los posibles resultados:</p><p>Equipo local con intento</p><p>Equipo local con penalti</p><p>Equipo local con un  drop goal</p><p>Equipo visitante con intento</p><p>Equipo visitante con penalti</p><p>Equipo local con un  drop goal</p><p> </p><p><i><strong>Mercados de primera mitad:</strong></i></p><p><strong>Primera mitad - 1X2: </strong>Se debe predecir el resultado de la primera mitad. Hay 3 resultados posibles: 1 (el equipo local gana), X (los equipos empatarán), 2 (el equipo visitante gana).</p><p><strong>Primera mitad - Doble oportunidad: </strong>Se debe predecir el resultado de la primera mitad. Hay 3 resultados posibles: 1X (al final del partido el equipo local gana o empata), X2 (al final del partido el equipo visitante gana o empata), 12 (al final del partido el equipo local gana o el equipo visitante gana).</p><p><strong>1er tiempo - Apuesta sin empate: </strong>este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador, lo que significa que, si el primer tiempo termina en empate, se reembolsará el dinero apostado . Por ejemplo, si la primera mitad resulta en un empate, la apuesta se liquidará como cancelada.</p><p><strong>1er tiempo - Hándicap: </strong>apuesta en la que el ganador del primer tiempo debe decidirse con un margen de gol respectivo. A los puntos propuestos en el hándicap se le suma o resta la puntuación correcta, y luego de dicha operación se determinará quién gana: equipo de casa, empate o equipo visitante.</p><p><strong>1er tiempo - Hándicap (3 vías): </strong>Se debe predecir el resultado del 1er tiempo teniendo en cuenta el hándicap entre paréntesis. Por ejemplo, (0: 1) indica que el equipo visitante tiene un gol de ventaja, mientras que (1: 0) indica que el equipo local tiene un gol de ventaja.</p><p><strong>1er tiempo - Total:</strong> Se debe predecir si el número total de puntos anotados durante el primer tiempo estará por encima o por debajo del margen indicado.</p><p><strong>1er tiempo - Total del equipo: </strong>Se debe predecir si el número total de puntos anotados por el equipo local o visitante durante el primer tiempo estará por encima o por debajo del margen indicado.</p><p><strong>1er tiempo - Total de intentos:</strong> Se debe predecir si el número total de intentos anotados durante el primer tiempo estará por encima o por debajo del margen ofrecido.</p><p><strong>1er tiempo - Total de intentos del equipo: </strong>Se debe predecir si el número total de intentos anotados por el equipo local o visitante durante el primer tiempo estará por encima o por debajo del margen indicado.</p><p><strong>Primera mitad - Impar/Par: </strong>Se debe predecir si el resultado de la primera mitad es un número par o impar, si el resultado es \"0: 0\", las apuestas se cuentan como \"pares\".</p><p><strong>1er tiempo: qué equipo gana el resto: </strong>Se debe predecir  quién ganará el resto del 1er tiempo. Desde el momento en que se realiza la apuesta, la puntuación cuenta como 0: 0 independientemente de la puntuación real del partido..</p><p><strong>1.er tiempo: margen de victoria: </strong>Se debe predecir el margen de victoria en el primer tiempo del partido para el equipo local o visitante, o si el partido termina en empate..</p><p><strong>1.er tiempo: margen de victoria: </strong>Se debe predecir el margen de victoria en el primer tiempo del partido para el equipo local o visitante, o si el partido termina en empate.</p><p><strong>Primera mitad: Primer equipo en anotar x puntos: </strong>Se debe predecir qué equipo llegará primero a X puntos durante la primera mitad del partido.</p><p><strong>Primera mitad - Try - 1X2: </strong>Se debe predecir el resultado de la primera mitad en los try logrados. Hay 3 resultados posibles: 1 (el equipo local gana), X (los equipos empatarán), 2 (el equipo visitante gana).</p><p><strong>Primera mitad - try - Doble oportunidad: </strong>Se debe predecir el resultado de la primera mitad en los try logrados. Hay 3 resultados posibles: 1X (al final de la primera mitad  del partido el equipo local gana o empata), X2 (al final de la primera mitad del partido el equipo visitante gana o empata), 12 (al final de la primera mitad del partido gana el equipo local o el equipo visitante gana).</p><p><strong>1er tiempo - Try -Apuesta sin empate: </strong>este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador en los try logrados, lo que significa que, si el primer tiempo termina en empate, el Se reembolsará el dinero de la apuesta. Por ejemplo, si la primera mitad de los intentos logrados resulta en un empate, la apuesta se liquidará como cancelada.</p><p><strong>1er tiempo - try - Handicap: </strong>apuesta en la que el ganador del primer tiempo en los try conseguidos debe decidirse con un margen de gol respectivo. A los intentos propuestos en el hándicap se le suma o resta el puntaje correcto, y luego de dicha operación se determinará quién gana: equipo de casa, empate o equipo visitante.</p><p><strong>1er tiempo - Try - Handicap (3-Way): </strong>apuesta en la que el ganador del primer tiempo en los try conseguidos debe decidirse con un margen de gol respectivo. A los intentos propuestos en el hándicap se le suma o resta el puntaje correcto, y luego de dicha operación se determinará quién gana: equipo de casa, empate o equipo visitante.</p><p><strong>Primera mitad - Try - Impar/Par: </strong>Se debe predecir si el resultado de la primera mitad en try logrados es un número par o impar, si el resultado del partido es \"0:0\", las apuestas se cuentan como \"par\".</p><p> </p><p><i><strong>Mercados combinados:</strong></i></p><p><strong>1X2 y total:</strong> este mercado de apuestas combina dos mercados de apuestas principales en los que debe predecir quién ganará el partido (o empatará) y cuántos puntos totales (más/menos) se anotarán en el partido.</p><p><i><strong>Mercados de try:</strong></i></p><p><strong>Try - 1X2: </strong>Se debe  predecir el resultado de todo el partido en los try logrados. Hay 3 resultados posibles: 1 (el equipo local gana), X (los equipos empatarán), 2 (el equipo visitante gana).</p><p><strong>Try - Doble oportunidad: </strong>Se debe predecir el resultado de todo el partido en los try logrados. Hay 3 resultados posibles: 1X (al final del partido el equipo local gana o empata), X2 (al final del partido el equipo visitante gana o empata), 12 (al final del partido el equipo local gana o el equipo visitante gana).</p><p><strong>Try - Apuesta sin empate: </strong>este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador en los try logrados, lo que significa que, si el partido termina en empate, la apuesta de dinero será reembolsada. Por ejemplo, si una puntuación final en los try logrados da como resultado un empate, la apuesta se liquidará como cancelada.</p><p><strong>Try - Handicap: </strong>apuesta en la que el ganador del juego en los try conseguidos debe decidirse con un margen de gol respectivo. A los try propuestos en el hándicap se le suma o resta el puntaje correcto, y luego de dicha operación se determinará quién gana: equipo de casa, empate o equipo visitante.</p><p><strong>Try - Handicap (3-Way): </strong>apuesta en la que el ganador del juego en los try conseguidos debe decidirse con un margen de gol respectivo. Se suma o resta la puntuación correcta de los try propuestos en el hándicap, y luego de dicha operación se determinará quién gana: equipo de casa, empate o equipo visitante..</p><p> </p><p><strong>Try - Total de try: </strong>Se debe predecir si el número total de try anotados durante el partido estará por encima o por debajo del margen ofrecido<strong>.</strong></p><p><strong>Try - Total de try del equipo: </strong>Se debe predecir si el número total de try anotados durante el partido del equipo local o visitante será superior o inferior al margen indicado..</p><p><strong>try - Impar / Par: </strong>Se debe predecir si el resultado del partido en los try logrados es un número par o impar, si el resultado del partido es \"0: 0\", las apuestas se cuentan como \"par\".</p><p> </p><p><i><strong>Rugby / Rugby League -Outright:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia. </p><p><strong>Victorias de la temporada regular - Equipo: </strong>Se debe predecir cuántas victorias (más/menos) obtendrá el equipo mencionado de acuerdo con el ranking oficial de la competencia.</p><p><strong>Más derrotas de la temporada regular - Equipo: </strong>Se debe predecir cuántos perdidos (más / menos) obtendrá el equipo mencionado de acuerdo con el ranking oficial de la competencia.</p><p><strong>H2H - Ganador: </strong>Se debe predecir cuál de los dos equipos indicados se clasificará en la fase de clasificación o ronda de play-off determinada.. </p><p><strong>Para llegar a la gran final: </strong>Se debe predecir si el equipo seleccionado llegará a la gran final (Sí) o no (No) durante el torneo de acuerdo con el ranking oficial de la competencia.</p><p><strong>Para llegar a los Playoffs: </strong>Se debe predecir si el equipo seleccionado llegará a los playoffs (Sí) o no (No) durante el torneo según el ranking oficial de la competición. </p><p><strong>Top4, Top6, Top8: </strong>Tienes que predecir si el equipo seleccionado terminará en la posición superior respectiva cuando termine la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.9 Balonmano",
                            "content": "<p><i><strong>BALONMANO</strong></i></p><p> </p><p>Todas las apuestas de <strong>Balonmano</strong> estarán basadas  en los 60 minutos de juego a menos que algo diferente sea establecido. La Prórroga no será tenida en cuenta ni afectará el resultado de la segunda mitad y no se tendrá en cuenta para el recuento de las apuestas de la segunda mitad. Si los 60 minutos de juego no son completados las apuestas serán canceladas y el dinero será retornado.</p><p>El evento debe ser completado para que las apuestas se mantengan válidas (a menos que el mercado esté decidido). Todas las apuestas en vivo no incluyen Prórroga, mercados tales como: 1x2, Handicap, Par/Impar, Margen de Victoria, Doble oportunidad excepto mercados como: Se clasifica/ Gana la copa/ Ganador después de Prórroga etc.</p><p> </p><p><i><strong>Mercados Principales</strong></i></p><p><strong>1X2: </strong>Se debe predecir el resultado del evento. Las apuestas son aceptadas solo para el tiempo regular, sin contar la Prórroga, con los resultados de victoria para el Local, para el empate o para la victoria del Visitante.</p><p><strong>Total: </strong>Según un determinado margen dado en este mercado, se debe predecir si habrá más o menos goles durante el tiempo reglamentario del evento.</p><p><strong>Handicap: </strong>Se debe predecir el ganador del evento con el respectivo margen de gol. El margen es añadido o sustraído del resultado final, después de esta operación, se determina quién gana el evento, equipo Local, empate o equipo Visitante.</p><p><strong>Doble Oportunidad: </strong>Se debe predecir el resultado del evento. Son posibles 3 resultados: 1X (Local gana o empate), 12 (Local o Visitante gana) o X2 (empate o Visitante gana).</p><p><strong>Apuesta sin empate: </strong>Se debe predecir el ganador del evento y debe ser necesariamente en un equipo ganador, lo que significa que, si el evento termina en empate, la apuesta será cancelada y el dinero retornado.</p><p><strong>Par/Impar: </strong>Se debe predecir si el número total de goles durante el evento será un número Par o Impar, si el resultado del evento termina en 0-0, las apuestas serán determinadas como Par.</p><p><strong>Medio tiempo/Tiempo completo: </strong>Se debe predecir qué equipo ganará al finalizar el primer tiempo, y qué equipo ganará al finalizar el tiempo completo en el tiempo regular.</p><p><strong>Margen de Victoria: </strong>Se debe predecir qué equipo ganará y cuál será el margen de distancia en goles que el equipo ganador tendrá frente a su oponente.</p><p><strong>Carrera a los X Goles: </strong>Se debe predecir qué equipo llegará primero a los X goles. </p><p><strong>Handicap (3 way): </strong>Debe pronosticar el resultado final del partido teniendo en cuenta el hándicap entre paréntesis.</p><p><strong>Totales por equipo : </strong>Sobre un determinado valor dado en el mercado, se debe predecir si habrá más o menos goles durante el tiempo reglamentario del evento para el equipo Local o Visitante.</p><p><strong>Mercados de Primera / Segunda mitad:</strong> En esta sección se encontrarán todos los mercados principales para postar sujetos a un tiempo determinado, ya sea el primer o segundo tiempo del evento.</p><p><strong>1X2 &amp; Totales:</strong> Se debe predecir qué equipo ganará el evento en el tiempo regular junto a una determinada cantidad ‘Más de/Menos’ de goles en el mercado, se requieren de ambas predicciones para ganar la combinación en la apuesta.</p><p><strong>Mitad de mayor marcador: </strong>Se debe predecir cuál de las dos mitades presentará el mayor número de goles anotados comparado con la otra.</p><p><strong>Mitad con mayor marcador de equipo: </strong>Se debe predecir cuál de las dos mitades presentará el mayor número de goles anotados comparado con la otra para uno de los dos equipos, ya sea Local o Visitante.</p><p><strong>Equipo con la mitad de más goles: </strong>Se debe predecir cuál de los dos equipos tendrá la mitad con mayor cantidad de goles anotados comparado con el equipo rival.</p><p><strong>Rango de goles: </strong>Se debe predecir, según un rango de goles seleccionado, cuantos goles serán anotados en total por parte de ambos equipos.</p><p><strong>Rango de goles por equipo: </strong>Se debe predecir, según un rango de goles seleccionado, cuantos goles serán anotados en total por parte de ambos equipos, por parte del Local y Visitante.</p><p><strong>Gol X (incl. Prórroga): </strong>Se debe predecir qué equipo marcará el gol X, incluyendo la Prórroga.</p><p><strong>Prórroga - Total: </strong>Se debe predecir si el número total de goles durante la Prórroga estará por encima o por debajo del margen seleccionado.</p><p><strong>Prórroga - Handicap: </strong>Se debe predecir el resultado final de la Prórroga tomando en cuenta el número de handicap especificado en los paréntesis.</p><p> </p><p><i><strong>Mercados de Primera Mitad</strong></i></p><p><strong>Primera mitad - 1x2: </strong>Se debe predecir el resultado de la primera mitad.</p><p><strong>Primera mitad - Doble oportunidad: </strong>Se debe predecir el resultado únicamente de la primera mitad del evento. Son posibles 3 resultados: 1X (Local gana o empate), 12 (Local o Visitante gana) o X2 (empate o Visitante gana).</p><p><strong>Primera mitad - Apuesta sin empate: </strong>Se debe predecir el ganador únicamente de la primera mitad y debe ser necesariamente en un equipo ganador, lo que significa que, si el evento termina en empate en la primera mitad, la apuesta será cancelada y el dinero retornado.</p><p><strong>Primera mitad -1a mitad- handicap x:y: </strong>Debe pronosticar el resultado final del partido teniendo en cuenta el hándicap entre paréntesis.</p><p><strong>Primera mitad -1a mitad- handicap: </strong>apuesta en la que se debe decidir el ganador del primer tiempo con un margen de gol respectivo. A los goles propuestos en el hándicap se suma o resta el puntaje correcto, y luego de dicha operación, se determinará quién gana: equipo local, empate o equipo visitante.</p><p><strong>Primera mitad - Total: </strong>Según un determinado margen dado en este mercado, se debe predecir si habrá más o menos goles durante la primera mitad del evento.<strong> </strong></p><p><strong>Primera mitad - Local total: </strong>Según un determinado margen dado en este mercado, se debe predecir si habrá más o menos goles por parte del equipo Local durante la primera mitad del evento.</p><p><strong>Primera mitad - Visitante total: </strong>Según un determinado margen dado en este mercado, se debe predecir si habrá más o menos goles por parte del equipo Visitante durante la primera mitad del evento.</p><p><strong>Primera mitad - Par/Impar: </strong>Se debe predecir si el número total de goles durante la primera mitad del evento será un número Par o Impar, si el resultado de la primera mitad termina en 0-0, las apuestas serán determinadas como Par.</p><p><strong>Primera mitad - 1x2 &amp; Total: </strong>Se debe predecir qué equipo ganará la primera mitad junto a una determinada cantidad ‘Más de/Menos’ de goles en el mercado, se requieren de ambas predicciones para ganar la combinación en la apuesta.</p><p><strong>Primera mitad - Margen de Victoria: </strong>Se debe predecir qué equipo ganará la primera mitad del evento  y cuál será el margen de distancia en goles que el equipo ganador tendrá frente a su oponente al finalizar la primera mitad.</p><p><strong>Primera mitad - Rango de goles: </strong>Se debe predecir, según un rango de goles seleccionado, cuantos goles serán anotados en total por parte de ambos equipos únicamente durante la primera mitad del evento.</p><p><strong>Primera mitad - Local rango de goles: </strong>Se debe predecir, según un rango de goles seleccionado, cuantos goles serán anotados en total por parte del equipo Local únicamente durante la primera mitad del evento.</p><p><strong>Primera mitad - Visitante rango de goles: </strong>Se debe predecir, según un rango de goles seleccionado, cuantos goles serán anotados en total por parte del equipo Visitante únicamente durante la primera mitad del evento.</p><p> </p><p><i><strong>Mercados de Segunda Mitad</strong></i></p><p><strong>Segunda mitad - 1x2: </strong>Se debe predecir el resultado de la segunda mitad del evento.</p><p><strong>Segunda mitad - Doble oportunidad: </strong>Se debe predecir el resultado únicamente de la segunda mitad del evento. Son posibles 3 resultados: 1X (Local gana o empate), 12 (Local o Visitante gana) o X2 (empate o Visitante gana)</p><p><strong>Segunda mitad - Apuesta sin empate: </strong>Se debe predecir el ganador únicamente de la segunda mitad y debe ser necesariamente en un equipo ganador, lo que significa que, si el evento termina en empate en la segunda mitad, la apuesta será cancelada y el dinero retornado.</p><p><strong>Segunda mitad - Par/Impar: </strong>Se debe predecir si el número total de goles durante la segunda mitad del evento será un número Par o Impar, si el resultado de la segunda mitad termina en 0-0, las apuestas serán determinadas como Par.</p><p> </p><p><i><strong>Balonmano-Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo seleccionado de acuerdo al ranking oficial de la competencia.</p><p> </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.10 Futsal",
                            "content": "<p><i><strong>FÚTBOL SALA</strong></i></p><p>Un evento de Fútbol Sala es considerado como oficial si se juegan 40 minutos de juego.</p><p>Todos los eventos serán determinados con el resultado final del tiempo regular, a no ser que algo distinto sea indicado. El tiempo regular debe ser completado para que las apuestas puedan mantenerse válidas, a no ser que algo distinto sea indicado</p><p>Las apuestas serán válidas dentro del tiempo reglamentario; sumado al tiempo añadido por el árbitro debido al tiempo perdido por lesiones y sustituciones. Prórroga, gol de oro y definición en tiros de penalty no serán tenidos en cuenta para las apuestas en este deporte.</p><p><i><strong>Mercados de Fútbol Sala:</strong></i></p><p><strong>Ganador – 1X2: </strong>Se debe predecir el resultado ganador con 3 posibles resultados: Equipo Local gana (1), resultado final es empate (X) o el equipo Visitante gana (2)<strong>.</strong> </p><p><strong>Doble oportunidad (1X-12-X2): </strong>Se debe predecir el ganador con dos posibles resultados por selección: 1X (Local gana o empate), 12 (Local o Visitante gana) o X2 (empate o Visitante gana).</p><p><strong>*Si el partido es jugado en un terreno neutral, el equipo mencionado de primero será considerado como Local.</strong></p><p><strong>Próximo en anotar: </strong>Se debe predecir cuál de los dos equipos anotará el próximo gol. Es posible también apostar en ‘’sin gol’’ (no habrá un próximo gol).</p><p><strong>Ambos equipos anotan: </strong>Para este mercado existen dos posibilidades (Si-No), de modo que ambos equipos marcan o no al menos un gol cada uno.</p><p><strong>Par/Impar goles Total, Visitante y totales: </strong>Se debe predecir si el total de goles del evento será Par o Impar. Si el evento termina en un empate 0-0 se considerará par. Si el evento es suspendido todas las apuestas serán canceladas.</p><p><strong>Total (Equipo Local – Equipo Visitante): </strong>Se debe predecir el número de goles del evento marcados por ambos equipos o por un equipo en específico. Por ejemplo, se apuesta en ́ Más de ́ ́ quiere decir que los goles totales están por encima de una cantidad especifica, si se apuesta en ´´Menos de ́ ́ quiere decir que los goles totales están por debajo de una cantidad específica.</p><p><strong>Quién ganará el resto del evento (Aplica para apuesta en Vivo): </strong>En este mercado en vivo, se debe predecir qué equipo ganará el resto del evento. En el momento en que la apuesta es realizada, el conteo de goles se establece como 0-0 sin importar los goles previos.</p><p><strong>Apuesta sin empate: </strong>Se debe predecir el resultado final del evento, de modo que se apuesta en cuál será el equipo ganador solamente, de tal forma, si el evento termina en empate, la apuesta será cancelada y el dinero será reembolsado.</p><p><strong>Handicap: </strong>Se debe predecir que el ganador del evento se decidirá con el respectivo margen de goles. El resultado escogido es añadido o sustraído del resultado final, de este modo se decidirá cuál será el resultado ganador: Local, empate o Visitante.</p><p><strong>Marcador exacto: </strong>Se debe predecir el resultado exacto del evento al finalizar los 40 minutos.</p><p><strong>Margen de Victoria: </strong>Se debe predecir qué equipo ganará y cuál será el margen de distancia en goles que el equipo ganador tendrá frente a su oponente.</p><p><strong>Local rango de goles: </strong>Se debe predecir según un rango de goles seleccionado, cuantos goles en total serán marcados por el equipo Local.</p><p><strong>Visitante rango de goles: </strong>Se debe predecir según un rango de goles seleccionado, cuantos goles en total serán marcados por el equipo Visitante</p><p> </p><p> </p><p><i><strong>Mercados de Primera Mitad</strong></i></p><p><i><strong> </strong></i></p><p><strong>Primera mitad – 1x2: </strong>Se debe predecir el resultado ganador solamente de la primera mitad con 3 posibles resultados: Equipo Local gana (1), resultado final es empate (X) o el equipo Visitante gana (2).</p><p><strong>Primera mitad – Qué equipo gana el resto del evento: </strong>Sin importar el resultado actual de la primera mitad, al momento de realizar la apuesta el resultado del evento se tomará como 0-0.</p><p><strong>Primera mitad - Gol X: </strong>Se debe predecir qué equipo anotará el gol X durante la primera mitad del evento con 3 posibles resultados: 1 (Local anota), ninguno, 2 (Visitante anota).</p><p><strong>Primera mitad – Handicap: </strong>Se debe predecir el resultado final de la primera mitad tomando en cuenta el margen de puntos de handicap especificado entre los paréntesis.</p><p><strong>Primera mitad – Total: </strong>Se debe predecir si el número total de goles durante la primera mitad estará por encima o por debajo del margen especificado.</p><p> </p><p><i><strong>Otros Mercados</strong></i></p><p> </p><p><strong>Prórroga – 1x2: </strong>Se debe predecir el resultado ganador de la Prórroga con 3 posibles resultados: Equipo Local gana (1), resultado final es empate (X) o el equipo Visitante gana (2).</p><p><strong>Prórroga – Qué equipo gana el resto: </strong>Sin importar el resultado actual de la Prórroga, al momento de realizar la apuesta el resultado del evento se tomará como 0-0</p><p><strong>Prórroga – Gol X: </strong>Se debe predecir qué equipo anotará el gol X durante la Prórroga del evento con 3 posibles resultados: 1 (Local anota), ninguno, 2 (Visitante anota).</p><p><strong>Prórroga – Total: </strong>Se debe predecir si el número total de goles durante la Prórroga estará por encima o por debajo del margen especificado.</p><p><strong>Tiros de Penalti – Ganador: </strong>Se debe predecir el ganador de la ronda de penalty.</p><p><strong>Tiros de Penalti -  Gol X: </strong>Se debe predecir qué equipo anotará el gol X en la ronda de penalti.<strong> </strong></p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.11 Hockey Hielo",
                            "content": "<p><i><strong>HOCKEY SOBRE HIELO / HOCKEY SOBRE HIERBA</strong></i></p><p>El resultado de una apuesta en un evento de hockey sobre hielo / hockey sobre hierba basado solamente en el tiempo reglamentario. A menos que se aclare lo contrario, tiempo extra y penaltis no afectarán la liquidación de apuestas.</p><p> </p><p><i><strong>Mercados Principales</strong></i></p><p> </p><p><strong>Moneyline/Ganador (incl.prórroga y penaltis): </strong>Se debe predecir el ganador del partido, incluyendo tiempo extra y penaltis.</p><p><strong>1X2:</strong> Se debe predecir si el ganador del encuentro será el equipo local, visitante o si  el resultado del tiempo reglamentario es empate, las apuestas se aceptan solamente en tiempo reglamentario, excluyendo prórroga y el resultado de una tanda de penaltis.</p><p><strong>Handicap (incl.prórroga y penaltis) (2-Way): </strong>Se debe predecir el ganador del partido completo  adicionando o sustrayendo la cantidad de puntos especificada en el margen al resultado del evento, incluyendo tiempo extra y penaltis (Tandas de penaltis cuentan como 1 gol).</p><p> </p><p><strong>Total (incluido prórroga y penaltis): </strong>Se debe predecir si el número total de goles marcados durante el partido será superior o inferior al margen ofrecido, incluido el tiempo extra y los penaltis (la tanda de penaltis cuenta como \"1\").</p><p><strong>Ambos equipos anotan (GG / NG):</strong> Se debe predecir si ambos equipos marcarán al final del partido.</p><p><strong>Par / impar (incluyendo prórroga y penaltis): </strong>Se<strong> </strong>debe predecir si el resultado del partido es un número par o impar, si el resultado del partido es \"0:0\", las apuestas se cuentan como \"par\", incluidos los posibles tiempos extra y penaltis. (el resultado de los penaltis cuenta como '1').</p><p><strong>Primer gol: </strong>Se debe predecir<strong> </strong>qué equipo marcará el primer gol del partido.</p><p><strong>Último gol:</strong> Se debe predecir qué equipo marcará el último gol del partido.</p><p><strong>Doble oportunidad:</strong></p><p><strong>1X: </strong>Si el resultado es gana el equipo local o un empate</p><p><strong>2X: </strong>Si el resultado es gana el equipo visitante o un empate</p><p><strong>1.2: </strong>Si el resultado es gana el equipo local o gana el equipo visitante<strong> </strong></p><p> </p><p><strong>Total (Más/Menos): </strong>Se debe predecir si las puntuaciones al final del tiempo reglamentario serán más o menos según el número elegido en el mercado.</p><p><strong>Hándicap (2 vías):</strong> Se debe predecir el ganador de todo el partido sumando o restando el margen indicado al resultado del partido.</p><p><strong>Apuesta sin empate: </strong>este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador, lo que significa que, si el partido termina en empate, se reembolsará el dinero apostado. Por ejemplo, si un resultado final da como resultado un empate, la apuesta se liquidará como cancelada.</p><p><strong>Total del equipo local/visitante: </strong>tienes que predecir si el número total de goles marcados por el equipo local o visitante durante el partido estará por encima o por debajo del margen ofrecido.</p><p><strong>Margen de victoria: </strong>mercado de apuestas que predice la diferencia que tendrá un equipo de su oponente al final del partido.</p><p><strong>Puntuación correcta: </strong>Se debe<strong> </strong>predecir la puntuación final del evento al final del tiempo reglamentario.</p><p><strong>¿Habrá tiempo extra? </strong>Se debe predecir si habrá tiempo extra en el partido o no.</p><p><strong>Hándicap (3 vías): </strong>Se debe predecir el ganador de todo el partido sumando o restando el margen indicado al resultado del partido.</p><p><strong>Período de puntuación más alto: </strong>Se debe<strong> </strong>predecir cuál de los períodos tendrá el mayor número de goles.</p><p><strong>¿En qué periodo el equipo local tendrá la puntuación más alta?:</strong> Se debepredecir cuál de los períodos el equipo local tendrá el mayor número de goles.</p><p><strong>¿En qué periodo el equipo visitante tendrá la puntuación más alta?:</strong> Se debe<strong> </strong>predecir cuál de los períodos tendrá el equipo visitante el mayor número de</p><p> </p><p><strong>Impar/Par:</strong> Se debe predecir si el número de goles al final del evento representará un número par o impar.</p><p>Las apuestas sobre más / menos, incluidas las 3 opciones (más / menos / empate ... goles), se sugieren para el tiempo regular solo en todos los juegos de hockey, independientemente del campeonato.</p><p>Si como resultado del partido el número total de goles marcados es igual al total de la apuesta y solo se brindan dos opciones (mayor o menor, sin la opción de “empatar… goles”), se reembolsará el dinero apostado.</p><p><strong>Quién ganará el resto del partido - Quién ganará el resto de la primera mitad (incluye apuestas en vivo): </strong>este es un mercado en vivo, usted apuesta a quién ganará el resto del partido (al seleccionar el mercado, el evento tendrá una puntuación de 0-0 independientemente de la puntuación real en el momento de apostar).</p><p><strong>Quién ganará el resto del partido, incluidas las prórrogas y los penaltis (incluye apuesta en vivo):</strong></p><p>Este es un mercado en vivo, usted apuesta a quién ganará el resto del partido (al seleccionar el mercado, el evento tendrá una puntuación de 0-0 independientemente de la puntuación real en el momento de la apuesta). El tiempo extra y la tanda de penaltis están incluidos en la apuesta.</p><p> </p><p><strong>1X2 y total: </strong>este mercado de apuestas combina dos mercados de apuestas principales en los que debes predecir quién ganará el partido y cuántos goles totales (más / menos) se marcarán en el partido.</p><p><strong>Apuesta sin Local: </strong>Se debe predecir<strong> </strong>si el equipo visitante gana el partido o si el partido termina en empate. Si el equipo local gana el partido, la apuesta se considerará cancelada.</p><p><strong>apuesta sin visitante: </strong>Se debe predecir<strong> </strong>si el equipo local gana el partido o si el partido termina en empate. Si el equipo visitante gana el partido, la apuesta se considerará cancelada.</p><p><strong>Goles exactos: </strong>Se  debe predecir el número exacto de goles que se anotará durante todo el partido.</p><p><strong>Goles exactos del local: </strong>Se debe predecir el número exacto de goles que anotará el equipo local durante todo el partido.</p><p><strong>Goles exactos de visitante:</strong> Se debe predecir el número exacto de goles que anotará el equipo visitante durante todo el partido.</p><p><strong>Qué equipo marcará: </strong>Se debe predecir qué equipo marcará durante el partido. 4 son los posibles resultados: Solo el equipo 1, Solo el equipo 2, Ambos equipos, Ninguno.</p><p><strong>Portería a 0 del equipo local: </strong>La portería a cero es un término que se utiliza para describir a un equipo que no ha concedido ningún gol. Tienes que predecir si el equipo local mantendrá la portería a cero durante todo el partido.</p><p><strong>Portería a 0 del equipo visitante: </strong>La portería a cero es un término que se utiliza para describir a un equipo que no ha concedido ningún gol. Tienes que predecir si el equipo visitante mantendrá la portería a cero durante todo el partido</p><p><strong>1x2 y ambos equipos marcarán: </strong>Se debe predecir el resultado del partido y si ambos equipos marcarán o no solo en la primera mitad.</p><p><strong>Prórroga - 1x2: </strong>Se debe predecir el resultado 1X2 del período de prórroga.</p><p><strong>Prórroga  - doble oportunidad: </strong>Se<strong> </strong>debe predecir el resultado solo para la doble posibilidad del período de prórroga</p><p><strong>1X: </strong>si el resultado es una victoria en casa o un empate</p><p><strong>2X: </strong>si el resultado es una victoria como visitante o un empate</p><p><strong>12:</strong> Si el resultado es una victoria en casa o una victoria como visitante</p><p> </p><p><strong>prórroga - X gol: </strong>Se debe predecir qué equipo marcará el siguiente gol durante el tiempo extra. Hay 3 resultados posibles: 1 (equipo local anota), X (ninguno anota), 2 (equipo visitante anota).</p><p><strong>Prórroga- total: </strong>Se debe predecir si el número total de goles marcados durante la prórroga es por encima o debajo del margen ofrecido.</p><p><strong>prórroga - total: </strong>Se debe predecir si el número total de goles marcados durante el tiempo extra solo será superior o inferior al margen ofrecido.</p><p><strong>prórroga -Local sin apuesta: </strong>Se debe predecir si el equipo visitante ganará el tiempo extra o si el partido termina en empate. Si el equipo local gana el partido, la apuesta se considerará cancelada.</p><p><strong>prórroga - visitante sin apuesta: </strong>Se debe predecir si el equipo local ganará el tiempo extra o si el partido termina en empate. Si el equipo visitante gana el partido, la apuesta se considerará cancelada.</p><p><strong>Tanda de penaltis - ganador: </strong>Se debe predecir qué equipo ganará la tanda de penales (1-2)<strong>.</strong></p><p><strong>Tanda de penaltis - X gol: </strong>Se debe predecir qué equipo marcará el gol \"x\" durante la tanda de penaltis. 3 Posibles resultados: 1, X, 2.</p><p><strong>X gol &amp; 1x2: </strong>Se debe predecir si el resultado final del partido será 1, X o 2 y qué equipo marcará el gol x del partido. </p><p><strong>X período 1x2 y 1x2: </strong>Se debe predecir si el resultado final del período seleccionado y el resultado final del partido. Los posibles resultados son:</p><p> Equipo local y equipo local</p><p>Empate y equipo local</p><p>Equipo visitante y equipo local</p><p>Equipo local y Empate</p><p>Empate y Empate</p><p>Equipo visitante y empate</p><p>Equipo local y equipo visitante</p><p>Empate y equipo visitante</p><p>Equipo visitante y equipo visitante</p><p> </p><p><strong>Local ganará todos los períodos: </strong>Se debe predecir si el equipo de casa ganará todos los períodos durante el partido.</p><p><strong>visitante ganará todos los períodos: </strong>Se debe predecir si el equipo de casa ganará todos los períodos durante el partido.</p><p><strong>Local para ganar cualquier período: </strong>tienes que predecir si el equipo local ganará algún período durante el partido.</p><p><strong>visitante para ganar cualquier período: </strong>tienes que predecir si el equipo visitante ganará algún período durante el partido.</p><p><strong>El equipo local anotará en todos los períodos: </strong>Se debe predecir si el equipo local anotará en todos los períodos durante el partido.</p><p><strong>El equipo visitante anotará en todos los períodos: </strong>Se debe predecir si el equipo visitante anotará en todos los períodos durante el partido.</p><p><strong>Todos los periodos sobre x.5: </strong>Se debe predecir si todos los periodos terminarán sobre x.5 (0.5,1.5,2.5 ..) durante el partido.</p><p><strong>Todos los períodos por debajo de x.5: </strong>Se debe predecir si todos los períodos terminarán por debajo de x.5 (0.5,1.5,2.5 ..) durante el partido.</p><p> </p><p><strong>Tipo de puntuación: </strong>tienes que predecir el tipo de puntuación del gol x: 6 son los posibles resultados:</p><p><strong>incluso fuerza</strong></p><p><strong>juego de poder</strong></p><p><strong>falto de mano de obra</strong></p><p><strong>tiro de penalti</strong></p><p><strong>red vacía</strong></p><p><strong>sin gol</strong></p><p><strong>Tipo de puntuación de local x: </strong>tienes que predecir el tipo de puntuación del gol x<strong>.</strong></p><p><strong>Visitante x tipo de gol: t</strong>ienes que predecir el tipo de gol del gol x</p><p>.</p><p> </p><p><i><strong>Mercados de periodos</strong></i></p><p><strong>1º-2º-3º PERÍODO: </strong>Los mercados de apuestas de período permiten al jugador apostar sobre el resultado final de cada uno de los períodos.</p><p> </p><p><strong>Período 1X2: </strong>Se debe predecir si el ganador en el período mencionado será el equipo local - equipo visitante o si, en cambio, el resultado final será un empate, las apuestas se aceptan solo en el tiempo reglamentario, excluyendo las prórrogas y el resultado de los tiros penales de la serie.</p><p><strong>Periodo Empate sin apuesta: </strong>este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador en el período mencionado, lo que significa que, si el partido termina en empate, la apuesta de dinero será reembolsado. Por ejemplo, si un resultado final da como resultado un empate, la apuesta se liquidará como cancelada.</p><p><strong>Período de doble oportunidad:</strong></p><p><strong>1X: </strong>si el resultado es una victoria del equipo local o un empate en el período mencionado</p><p><strong>2X: </strong>si el resultado es una victoria del equipo visitante o un empate en el período mencionado</p><p><strong>1.2: </strong>Si el resultado es una victoria del equipo local o visitante fuera en el período mencionado</p><p><strong>Hándicap de período (2 way): </strong>Se debe predecir el ganador del período mencionado sumando o restando el margen ofrecido al resultado del período.</p><p><strong>Total del período: </strong>Se debe predecir si el número total de goles anotados durante el período mencionado estará por encima o por debajo del margen ofrecido</p><p><strong>Primer gol del período: </strong>Se debe predecir qué equipo anotará el primer gol del período ofrecido.</p><p><strong> Último gol del periodo: </strong>Se debe predecir qué equipo anotará el último gol del período ofrecido<strong>.</strong></p><p><strong>Ambos equipos anotarán durante el periodo: </strong>Se debe predecir si ambos equipos marcarán o no en el período mencionado.</p><p><strong>Período - total Equipo local: </strong>Se debe predecir si el número total de goles anotados por el equipo local durante el período mencionado será superior o inferior al margen ofrecido.</p><p><strong>Período - total Equipo visitante: </strong>Se debe predecir si el número total de goles anotados por el equipo visitante durante el período mencionado será superior o inferior al margen ofrecido.</p><p><strong>Período - goles exactos: </strong>Se debe predecir el número exacto de goles que se anotarán durante el período ofrecido.</p><p><strong>Período - goles exactos del equipo local: </strong>Se debe predecir el número exacto de goles que anotará el equipo local durante el período ofrecido.</p><p><strong>Período - goles exactos del equipo visitante: </strong>Se debe predecir el número exacto de goles que anotará el equipo visitante durante el período ofrecido.</p><p><strong>Período: qué equipo marcará: </strong>Se debe predecir qué equipo anotará durante el período mencionado. 4 son los posibles resultados: Solo el equipo local, Solo el equipo visitante, Ambos equipos, Ninguno.</p><p><strong>Periodo  - Portería a 0 del local: </strong>La portería a cero es un término que se utiliza para describir a un equipo que no ha concedido ningún gol. Tienes que predecir si el equipo local mantendrá la portería a cero durante el período mencionado.</p><p><strong>Periodo  - Portería a 0 del visitante: </strong>La portería a cero es un término que se utiliza para describir a un equipo que no ha concedido ningún gol. Tienes que predecir si el equipo visitante mantendrá la portería a cero durante el período mencionado.</p><p><strong>Período - marcador correcto: </strong>Se debe predecir el marcador final al final del período mencionado.</p><p><strong>Período- qué equipo gana el resto: </strong>este es un mercado en vivo, usted apuesta a quién ganará el resto del período mencionado (al seleccionar el mercado, el evento tendrá una puntuación de 0-0 independientemente de la puntuación real en ese momento de apuestas).</p><p><strong>Período - par/impar: </strong>Se debe predecir si el número de goles al final del período mencionado representará un número par o impar.</p><p> </p><p><i><strong>Mercados especiales de jugador </strong></i></p><p><strong>Goles de jugador (al menos): </strong>Se debe predecir al menos cuántos goles hará el jugador elegido, solo tiempo regular a menos que el mercado lo especifique (Inc OT).</p><p><strong>Asistencia de jugador (al menos): </strong>Se debe predecir al menos cuántas asistencias hará el jugador elegido, solo tiempo regular a menos que el mercado lo especifique (Inc OT).</p><p><strong>Tiros de jugador a portería (al menos): </strong>Se debe predecir al menos cuántos tiros a portería hará el jugador específico, solo tiempo estándar a menos que el mercado lo especifique (Inc OT). Los tiros que no son a portería no cuentan.</p><p><strong>Atajadas de jugador (al menos): </strong>Se debe predecir al menos cuantas atajadas hará el jugador específico, solo tiempo estándar a menos que el mercado lo especifique (Inc OT).</p><p><strong>Puntos de jugador (al menos): </strong>Se debe predecir al menos cuántos puntos (goles y asistencias combinados) hará el jugador específico, solo tiempo estándar a menos que el mercado lo especifique (Inc OT).</p><p><strong>Tiros de jugador a puerta (más/menos): </strong>Se debe  predecir la cantidad de tiros a puerta que hará el jugador específico, solo tiempo estándar a menos que el mercado lo especifique (Inc OT). Los tiros que no son a portería no cuentan.</p><p><strong>Atajadas de jugador  (más/menos): </strong>Se debe  predecir la cantidad de atajadas que hará el jugador específico, solo en el tiempo estándar a menos que el mercado lo especifique (Inc OT).</p><p> </p><p><i><strong>Hockey Sobre Hielo / Hockey Sobre Hierba - Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Ganador de división/conferencia: </strong>Se debe predecir el ganador de la división o conferencia determinada de acuerdo con el ranking oficial de la competencia. </p><p><strong>Puntos de la temporada regular - Equipo: </strong>Se debe predecir cuántos puntos (más / menos) acumulará el equipo mencionado de acuerdo con el ranking oficial de la competencia..</p><p><strong>¿Llegarán a los playoffs? - Equipo: </strong>Se debe predecir si el equipo mencionado llegará al playoff del torneo en cuestión según el ranking oficial de la competición.. </p><p><strong>Top4, Top6, Top8, Top10: </strong>Se debe predecir si el equipo seleccionado terminará en la posición superior seleccionada cuando termine la competencia.</p><p><strong>X elección del draft: </strong>Se debe  predecir quién será la X elección en el draft mencionado.</p><p><strong>Posición en el Draft - Jugador: </strong>Se debe predecir qué posición obtendrá el jugador mencionado en el Draft mencionado.</p><p><strong>H2H - Resultado correcto de la serie: </strong>Se debe predecir el resultado final de la serie de partidos entre los 2 equipos indicados. A los efectos de informar se considerarán válidos únicamente los sitios oficiales de cada competición.</p><p><strong>H2H - ¿Cuándo terminará la serie ?: </strong>Se debe predecir en cuántos partidos terminará la serie de partidos entre los 2 equipos indicados. A los efectos de informar se considerarán válidos únicamente los sitios oficiales de cada competición.</p><p><strong>H2H - Ganador: Se </strong>debe predecir cuál de los dos equipos indicados se clasificará en la fase de clasificación o ronda de play-off determinada.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.12 Snooker (Billar Ingles).",
                            "content": "<p><i><strong>SNOOKER</strong></i></p><p> </p><p>Si un partido comienza, pero no termina por algún motivo, todas las apuestas ofrecidas sobre el resultado final del partido son canceladas.</p><p>Para propósitos de las apuestas, sólo se contarán las bolas que hayan entrado \"legalmente\"</p><p> Ej. cuando hay una \"bola de foul\" involucrada, las bolas ingresadas no serán consideradas. Las apuestas se liquidarán en consecuencia.</p><p> </p><p><i><strong>Mercados de snooker:</strong></i></p><p>En el caso de un re-rack en cualquiera de los marcos, se aplicarán las siguientes reglas:</p><p><strong>Ganador del frame:</strong> todas las apuestas son válidas y se liquidarán según el ganador oficial del frame</p><p><strong>Apuestas decididas: </strong>todas las apuestas cuyo resultado se haya determinado antes del re-rack serán válidas. Cualquier evento posterior al re-rack será irrelevante para las apuestas.</p><p><strong>Apuestas indecisas: </strong>todas las apuestas cuyo resultado no se haya determinado antes del re-rack se liquidarán únicamente de acuerdo con los eventos que ocurrieron después del re-rack. Cualquier evento anterior al re-rack será irrelevante para las apuestas.</p><p>Todas las apuestas que se refiere al resultado final del frame (por ejemplo: apuestas totales, apuestas pares / impares) se liquidarán con el resultado oficial del frame.</p><p> </p><p><strong>Apuesta de frame (resultado exacto): </strong>la apuesta se refiere al resultado final exacto en el total de frame jugados.</p><p><strong>Ganador de frame: </strong>esta apuesta se refiere al ganador de un frame determinado. Este frame debe completarse para que las apuestas sean válidas.</p><p><strong>Total:</strong> Se debe predecir el total de puntos que se ganarán en el partido.</p><p><strong>Primero en llegar a 3 frame: </strong>Se debe predecir quién será el primero en llegar a 3 frame. Algunos de los jugadores deben llegar a 3 frame para que las apuestas sean válidas.</p><p><i><strong>Mercados de outrights:</strong></i></p><p><strong>Ganador: </strong>Se<strong> </strong>debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.13 Cricket",
                            "content": "<p> </p><p>Todas las apuestas se liquidarán de acuerdo al resultado oficial.</p><p> </p><p>Los partidos de cricket constan de un o dos innings, los mercados del primer inning en un partido jugado con un inning solo (por ejemplo, eventos T10, T20) se consideran mercados de tiempo completo para fines resultantes. En un partido con dos innings (p. ej., Test Series), los mercados de 1er y 2do inning corresponderán a cada inning por separado a efectos de los resultados, los mercados acumulativos para el tiempo completo no incluirán ningún inning en la descripción de los mercados</p><p> </p><p>Si se cancela un partido antes de que se haya realizado cualquier jugada, todos los mercados se considerarán nulos a menos que el partido sea reanudado dentro de las 48 horas posteriores a su hora de inicio estipulada.</p><p>En el caso de que no se complete un over, todos los mercados indecisos en este over específico se considerarán nulos a menos que la entrada haya llegado a su conclusión natural, por ejemplo:declaración, equipo a tope, etc.</p><p> </p><p>Algunos torneos pueden durar hasta 5 días (p. Ej., Serie de pruebas), los mercados decididos se generarán instantáneamente, los mercados que requieran que un evento se complete por completo (p. Ej., Ganador, hándicap) se obtendrán después de que los eventos se anuncien oficialmente como completados.</p><p> </p><p>Si los mercados permanecen abiertos con una puntuación incorrecta que tiene un impacto significativo en los precios, nos reservamos el derecho de anular las apuestas.</p><p> </p><p> </p><p><i><strong>Mercados de Cricket </strong></i></p><p><strong>Ganador (incluido super over): </strong>Se debe predecir el ganador del partido (el resultado incluye el super over).</p><p><strong>Total (Más/Menos): S</strong>e debe predecir si las carreras serán superiores o inferiores a un número ofrecido en todo el evento. </p><p><strong>Hándicap asiático: </strong>Se debe predecir quién ganará el juego con hándicap (sin empate). </p><p><strong>1X2: </strong>Se debe predecir el ganador del partido (el resultado no incluye el super over). Opciones disponibles: Equipo local, Empate, Equipo visitante.</p><p><strong>Puntuación correcta: </strong>Se debe predecir cuál será la puntuación correcta  al final del juego.</p><p><strong>Doble oportunidad: </strong>Se debe predecir el resultado de todo el partido. Hay 3 resultados posibles: 1X (al final del partido el equipo local gana o empata), X2 (al final del partido el equipo visitante gana o empata), 12 (al final del partido el equipo local gana o el equipo visitante gana).</p><p><strong>Para marcar más fours: qué equipo anotará más fours: </strong>Se debe predecir qué equipo anotará más fours. Un four<strong> </strong>se anota si la pelota rebota, o rueda por el suelo, antes de tocar o pasar por el borde del campo. Si no toca el borde del campo, debe tocar el suelo más allá.</p><p><strong>Para anotar más Sixes: ¿Qué equipo marcará más Sixes?: </strong>Sixes es un término en cricket que significa que la pelota vuela sobre el límite sin tocar el suelo dentro del campo, lo que acredita al bateador en 6 carreras en lugar de 4..</p><p><strong>Total (Más / Menos) - Fours: </strong>Se debe predecir si el número total de Fours anotados en el juego estará por debajo o por encima de la línea ofrecida </p><p><strong>Total (Más/Menos) -  Sixes:</strong> Se debe predecir si el número total de Sixes anotados en el juego estará por debajo o por encima de la línea ofrecida.</p><p><strong>Total (Más / Menos) - Equipo Local / Visitante: </strong>Se debe predecir si las carreras serán superiores o inferiores a un número ofrecido en todo el evento para el equipo Local / Visitante. El resultado incluye el super over.</p><p><strong>Impar / Par: </strong>Se debe predecir si el total de carreras logradas durante un período de tiempo específico será un número par o impar</p><p><strong>Equipo local/visitante impar/par: </strong>Se debe predecir si el total de carreras logradas durante un período de tiempo específico será un número par o impar para el equipo local / visitante.</p><p><strong>Emparejamiento con mayor puntaje en la apertura: </strong>qué equipo anotará la mayor cantidad de carreras antes de perder su primer wicket.</p><p><strong>Cómo caerá el primer wicket:</strong> Se debe predecir cuál será el método del primer wicket. Los resultados posibles serían: Atrapado,Lanzado,LBW,Run out,Stumped y cualquier otra (incluye Sent Off/Retired Out).</p><p><strong>Método de dismissal 6-Way: Se debe predecir cuál será el método de dismissal 6-Way: </strong>Los resultados posibles serían: Atrapado,Lanzado,LBW,Run out,Stumped y cualquier otra (incluyendo Sent Off/Retired Out).</p><p>Cuál será el método Dimissal. Las opciones disponibles son: Caught, Bowled, LBW, Run Out, Stumped o cualquier otro (incluyendo Sent Off/Retired Out). Si no caen más wickets las apuestas serán canceladas.</p><p><strong>Método de despido: </strong>El próximo despido será un agarre o no. Los resultados disponibles son atrapados o no.</p><p><strong>Carreras en la caída del equipo local/visitante de Wicket: </strong>número total de carreras para el equipo local / visitante después de golpear el wicket del otro equipo.</p><p><strong>Over at fall of Wicket Local / Away Team: </strong>Se<strong> </strong>predice en qué Over el siguiente wicket del equipo local / visitante caerá. Como ejemplo, si un wicket cae después de 6.2 overs, la liquidación se realiza en el séptimo over. Si se puede determinar la liquidación de las apuestas, se liquidarán en consecuencia. Por ejemplo, en el caso de que un equipo abandone el campo debido a una interrupción durante más de 15, se liquidarán los excesos anteriores inferiores a este. Sin embargo, los sobrepasos superiores a este se anularán.</p><p><strong>Total de carreras  impar/par en un Over: </strong>Predecir si el total de carreras logradas durante un over especificado será un número par o impar.</p><p><strong>Total de carreras  impar/par en un Over - equipo local/visitante:</strong> Predecir si el total de carreras logradas durante un over especificado será un número par o impar para el equipo local/visitante.</p><p><strong>Total de carreras en un  Over:</strong> Predecir si las carreras estarán por encima o por debajo de un número determinado en un over específico. El over debe ser completado para que las apuestas sean válidas a menos que ya estén decididas.</p><p><strong>Total de carreras en un  Over</strong> <strong> - equipo local/visitante:</strong> Predecir si las carreras estarán por encima o por debajo de un número determinado en un over específico para el equipo local/visitante.  El over debe ser completado para que las apuestas sean válidas a menos que ya estén decididas.</p><p><strong>Total de carreras en un  Over</strong> <strong> - equipo local/visitante 1er Inning: </strong> Predecir si las carreras estarán por encima o por debajo de un número determinado en un over específico para el equipo local/visitante en el  1er inning. El over debe ser completado para que las apuestas sean válidas a menos que ya estén decididas.</p><p><strong>Total de carreras en un  Over</strong> <strong> - equipo local/visitante 2ndo Inning: </strong> Predecir si las carreras estarán por encima o por debajo de un número determinado en un over específico para el equipo local/visitante en el  1er inning. El over debe ser completado para que las apuestas sean válidas a menos que ya estén decididas.</p><p><strong>Wicket en Over -  local/visitante:</strong> Predecir si habrá un wicket o no en un over especificado para el equipo local / visitante. Si una entrada termina durante un Over, esa Over se considerará completa a menos que la entrada termine debido a las inclemencias del tiempo, en cuyo caso se anularán todas las apuestas anuladas.</p><p><strong> Equipo local / visitante: </strong>Se debe<strong> </strong>predecir si el número de carreras para el equipo local / visitante en la X delivery será por encima / por debajo de una línea ofrecida</p><p><strong>Para ganar el lanzamiento:</strong> Se debe predecir qué equipo ganará la moneda lanzando al aire al comienzo del juego.</p><p><strong>Un fifty anotado en el partido:</strong> Se debe predecir si habrá al menos un bateador que anote 50 carreras o más. Si un partido se reduce en exceso y un resultado oficial del partido está disponible, todas las apuestas se mantendrán. En el caso de una interrupción y el partido no se reanuda dentro de las 48 horas, todas las apuestas indecisas serán anuladas.</p><p><strong>Un Hundred anotado en el partido: </strong>Se debe predecir si habrá al menos un bateador que anote 100 carreras o más. Si un partido se reduce en exceso y un resultado oficial del partido está disponible, todas las apuestas se mantendrán. En el caso de una interrupción y el partido no se reanuda dentro de las 48 horas, todas las apuestas indecisas serán anuladas..</p><p><strong>Más Run Outs</strong>: Se ve predecir qué equipo tendrá más run outs. Un Run out generalmente ocurre cuando los bateadores intentan correr entre los portillos, y el equipo de fildeo logra llevar la pelota a un portillo antes de que el bateador haya hecho su terreno en ese extremo. Si un partido se abandona por cualquier motivo, todas las apuestas indecisas se cancelarán  a menos que ya se haya determinado la liquidación. Si un partido se reduce en overs y se alcanza un resultado del partido, el equipo que consiguió la mayoría de los run-outs mientras fildeaba, independientemente de la cantidad de overs lanzados, será el ganador.</p><p><strong>Mejor bateador - Equipo local / visitante: </strong>Se debe<strong> </strong>predecir el mejor bateador del equipo local / visitante. El que haga más carreras para el equipo local / visitante será el ganador. Aquellos que comenzaron el partido pero no batearon se consideran perdedores. Las apuestas realizadas a cualquier jugador que no participe en el partido serán anuladas. En el caso de que más de un jugador logre el mismo número de carreras, se considerará ganador al que tenga el mejor índice de puntuación.</p><p><strong>Top Bowler - Equipo Local/Visitante: </strong>Se debe predecir el Top Bowler para el equipo Local/Visitante. Aquel que tenga mayor cantidad de Wickets será el ganador. Si dos o más Bowlers tienen el mismo número de Wickets, aquel con el menor número de carreras será considerado ganador. Si los lanzadores tienen 0 Wickets, todas las apuestas serán canceladas. Apuestas puestas en un jugador que no se presente será cancelado.</p><p><strong>Hombre del evento:</strong> Se debe predecir cuál será el jugador nombrado  el mejor jugador del evento. Las apuestas se liquidarán según el jugador oficialmente declarado del partido.</p><p><strong>Batsman marcará un Fifty en el evento: </strong>Se debe predecir qué jugador anotará un Fifty en el evento.</p><p><strong>Los Primeros 6 Overs anotados: </strong>Se debe predecir qué equipo tiene la mayor cantidad de carreras comparadas a los primeros 6 Over para ambos equipos<strong>. </strong>En el caso de haber la misma cantidad de carreras para ambos equipos, las apuestas serán canceladas.</p><p><strong>Jugador en anotar mas Sixes: </strong>Se debe predecir cuál jugador anotará la mayor cantidad de SIxes en el evento. En caso de haber más de un jugador con el mismo número de Sixes,  será considerado como ganador aquel que tenga el mayor ratio de anotación.</p><p><strong>Mayor puntuación individual: </strong>Se debe predecir si el puntaje individual más alto en carreras logradas por cualquier jugador estará por encima o por debajo de la línea específica. </p><p><strong>Total (Más de/Menos de) Wides: </strong>Se debe predecir si el número de Wides lanzados en el evento estarán por encima o por debajo de la línea especificada.</p><p><strong>Total (Más de/Menos de) Ducks: </strong>Se debe predecir si el número de Ducks en el evento estarán por encima o por debajo de la línea seleccionada.</p><p><strong>Total (Más de/Menos de) Wickets: </strong>Se debe predecir si el número de Wickets realizados en el evento estarán por encima o por debajo de la línea especificada.</p><p><strong>Total (Más de/Menos de) Extras: </strong>Se debe predecir si el número de Extras en el evento estará por encima o por debajo de la línea especificada.</p><p><strong>Caída del primer wicket: </strong>Se debe predecir cuántas carreras se anotarán en la caída del primer wicket.</p><p><strong>Caída del primer Wicket - Local/Visitante: </strong>Se debe predecir cuántas carreras por parte del Local/Visitante se anotarán en la caída del primer wicket.</p><p><strong>Equipo con el mejor Batsman:</strong> Se debe predecir cuál será el equipo con el mejor Batsman del juego.</p><p><strong>Equipo con el mejor Bowler: </strong>Predice en qué equipo estará el mejor jugador de bolos del juego.</p><p><strong>Mejor bateador total (más / menos): </strong>Se debe predecir<strong> </strong>si el puntaje en carreras para el puntaje del mejor bateador estará por encima o por debajo de una línea específica.</p><p><strong>Over de mayor anotación - Total (Más de/Menos de):</strong> Se debe predecir si el resultado total del Over con mayor puntuación estará por encima o por debajo de la línea especificada.</p><p><strong>Total (Más de/Menos de) Run Outs: </strong>Se debe predecir si el número de Runs Out estará por encima o por debajo de la línea seleccionada.</p><p><strong>Hándicap de evento: </strong>Se debe predecir qué equipo ganará el evento junto con los hándicap en outs y carreras.</p><p><strong>Ganará el sorteo y el evento: </strong>Se debe predecir si el equipo seleccionado ganará el sorteo de la moneda y el evento.</p><p><strong>Total (Más de/Menos de) Primer Over: </strong>Se debe predecir si el resultado en carreras en el primer Over estará por encima o por debajo de la línea especificada.</p><p><strong>Habrá un Super Over en el evento?: </strong>Se debe predecir si habrá un Super Over en el evento.</p><p><strong>Evento empatado: </strong>Se debe predecir si el evento terminará empatado en el tiempo regular. Un empate ocurre cuando en la conclusión de una jugada, ambos equipos han completado sus innings y su puntuación es igual a la del equipo rival.</p><p><strong>Evento completado: </strong>Predecir si el evento será completado?. Un evento se considera completo si existe un resultado oficial del mismo<strong>.</strong></p><p> </p><p><i><strong>Mercados Outright:</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo seleccionado de acuerdo al ranking de la competición.</p><p><strong>Ganador de las Series: </strong>Se debe predecir<strong> </strong>qué equipo ganará la serie (Pareja de juego)</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.14 Formula 1",
                            "content": "<p>La Fórmula 1, también abreviada como F1, es la máxima competición de automovilismo internacional y el deporte motor más popular y prestigioso del mundo.</p><p><strong>Generalidades de juego.</strong></p><p>Todas las carreras del Mundial de F1 deberán completar las vueltas necesarias al circuito o recorrido para alcanzar la distancia de 305 km. y ni una vuelta más. La única excepción, recogida expresamente en el Reglamento, es la del GP de Mónaco, en el que la distancia mínima a recorrer será de tan sólo 260 km</p><p>Con independencia de la distancia recorrida, un GP no puede prolongarse más allá de dos horas si no ha mediado suspensión de la carrera. En condiciones normales un GP viene a durar entre 90 y 100 minutos, siempre que los monoplazas hayan podido circular a su velocidad normal; sin embargo, las salidas a pista del coche de seguridad enlentecen el ritmo, y aquí es cuando puede ser de aplicación esta regla de las dos horas. En el momento en que hayan transcurrido 120 minutos desde la senal de salida.</p><p>Si la carrera es suspendida por cualquiera de las causas previstas en el art.41, el tiempo de suspensión se anadirá a las dos horas mencionadas en el punto anterior.</p><p>Para la determinación de ganadores solo se tomará en cuenta las carreras que finalicen en su totalidad, el tiempo oficial establecido, en caso de suspensión la casa de apuestas tendrá 48 horas para determinar el evento no acción y anular las apuestas a la carrera, manteniendo solo las apuestas en vivo determinadas antes de la suspensión. Si el evento se reanuda en las próximas 48 horas las apuestas se mantendrán.</p><p><br>Cuando un evento sea suspendido, aplazado, cancelado o abandonado se considerará un evento como “no acción” Si el evento no se juega el mismo día, todas las apuestas se declaran nulas y se devolverá el valor apostado en las apuestas directas y en las apuestas parlay se anulara la línea de juego y se distribuirá nuevamente el valor apostado sobre las líneas restantes.<br><br><strong>Mercados de Juego.</strong><br><br><strong>Top 3 – Clasificación:</strong> En esta opción de juego apostaremos a la clasificación final de la carrera en este caso tendremos las opciones de juego: 1mer lugar; 2do lugar; 3er lugar. Seleccionaremos que corredor quedara en cada posición y el orden.<br><br><strong>Margen de la victoria – Clasificación:</strong> En este caso nos referimos al tiempo de diferencia entre el ganador del primer y el segundo lugar. Apostaremos a por cuantos segundos el primer jugador gano la carrera frente al segundo lugar.<br><br>&lt;0.15 S: Entre el primer y segundo lugar habrán menos de 15 segundos de diferencia.<br>0.15 - 0.30 S: Entre el primer y segundo lugar habrán de 15 a 30 segundos de diferencia.<br>&gt;0.30 S: Entre el primer y segundo lugar habrán, más de 30 segundos de diferencia.<br><br><strong>Cabeza a Cabeza – Clasificación:</strong> En esta opción de juego apostaremos a cuales de los corredores clasificaran como ganadores de la copa cabeza a cabeza. Quienes serán los corredores que se disputaran el primer y segundo lugar de la copa.<br><br><strong>Top 3 – Carrera:</strong> En este caso apostaremos a que corredores quedaran en primer, segundo y tercer lugar, en una carrera en específico. Es decir la opción solo aplica a la carrera, No a la clasificación de la copa. Las opciones disponibles para el agrupador son: 1mer lugar; 2do lugar y 3er lugar.<br><br><strong>Margen de la victoria – Carrera:</strong> Este agrupador hace referencia a los segundos de diferencia entre el ganador del primer y segundo lugar. Las opciones de juego son:<br><br>&lt;5 S: Entre el primer y segundo lugar habrá menos de 5 segundos de diferencia.<br>5 - 10 S: Entre el primer y segundo lugar habrá entre 5 a 10 segundos de diferencia.<br>&gt;10 S: Entre el primer y segundo lugar habrá más de 10 segundos de diferencia.<br><br><strong>Habrá un periodo de seguridad:</strong> Esta opción de apuesta se refiere a si habrá algún intermedio para revisión de seguridad de la pista y los automóviles de los corredores. Las opciones de apuesta disponibles son: Si/No.<br><br><strong>Total clasificación:</strong> En esta opción de juego apostaremos a la cantidad de corredores que clasificaran a la siguiente carrera, esta opción de juego funcionara con un margen de Más/Menos establecido por la casa de apuestas.<br><br><strong>Vuelta más rápida:</strong> En este caso la apuesta se refiere a que piloto correrá la vuelta más rápida en la carrera.<br><br><strong>Cabeza a Cabeza – Carrera:</strong> En esta opción de juego apostaremos a los corredores que quedaran en primera y segunda posición en la carrera, definiendo esta por un cabeza a cabeza.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.15 Dardos",
                            "content": "<p><i><strong>Dardos</strong></i></p><p> </p><p>Se considera que un juego de dardos ha comenzado cuando se lanza el primer dardo en la primera ronda del primer set. Si el número de sets indicado no se completa, las apuestas por el resultado exacto serán anuladas.</p><p>La puntuación más alta posible con tres dardos es 180, obtenida cuando los tres dardos caen en el triple 20 (el término se puede encontrar en muchos mercados).</p><p> </p><p><i><strong>Mercados principales: </strong></i></p><p><strong>1X2:</strong> El cliente debe predecir el resultado de todo el partido. hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana).</p><p><strong>Hándicap de Sets: </strong>Se debe predecir el resultado del partido en términos de sets adicionando o sustrayendo el margen indicado  al resultado final del encuentro.</p><p><strong>Total 180s: </strong>Se debe predecir si el número total de 180s conseguidos en el partido por ambos jugadores estará por encima o por debajo del margen indicado.</p><p> </p><p><strong>Mayor número de 180s: </strong>Se debe predecir qué jugador logrará la mayor cantidad de 180 en el partido (o si habrá un empate).</p><p> </p><p><strong>180s Handicap: </strong>Se debe predecir el resultado en términos de 180 logrados por cada jugador sumando o restando al resultado final el margen especificado en la apuesta.</p><p><strong>Total 180s equipo Local: </strong>Se debe predecir si el número total de 180 conseguidos en el partido por el jugador 1 estará por encima o por debajo del margen indicado.</p><p><strong>Total 180s equipo visitante : </strong>Se debe predecir si el número total de 180 conseguidos en el partido por el jugador 2 estará por encima o por debajo del margen indicado.</p><p><strong>Hándicap  de Set (3-way): </strong>Se debe predecir el resultado en términos de sets ganados por cada jugador sumando o restando al resultado final el margen especificado en la apuesta.</p><p><strong>Resultado correcto (en sets): </strong>Se debe predecir la puntuación correcta en sets de todo el partido.</p><p><strong>Jugador consigue un 180: </strong>Se debe predecir qué jugador alcanzará los 180 seleccionados en el partido (o si no habrá ninguno).</p><p> </p><p><i><strong>Mercados rápidos:</strong></i></p><p><strong>X set - N tramo Ganador : </strong>Se debe predecir qué jugador ganará la tramo N del set X.</p><p><strong>X set - Resultado correcto (en tramo): </strong>Se debe predecir el puntaje correcto en tramos del mencionado conjunto.</p><p><strong>X set - handicap de tramos: </strong>Se debe<strong> </strong>predecir el ganador del set mencionado (en tramos) sumando o restando el margen indicado al resultado del partido (en tramos).</p><p><strong>X set - total de tramos: </strong>Se debe predecir si el total de dardos lanzados por un jugador para ganar un tramo específico estará por encima o por debajo del margen indicado.</p><p><strong>X set - Impar/par tramos: </strong>Predecir si el total de tramos jugados en el set dado será un número par o impar.</p><p><strong>X set leg x - total de dardos: </strong>Tienes que predecir si el total de dardos lanzados por un jugador para ganar un tramo específico estará por encima o por debajo del margen indicado. </p><p><strong>X tramo de juego x - jugador con mayor puntuación en x visita: </strong>Tienes que predecir qué jugador anotará más puntos en una visita específica.</p><p><strong>X set tramo x - rango de puntos en X visita: </strong>Tienes que predecir cuál será el rango de puntos de la visita específica de un jugador.</p><p><strong>X set tramo x- checkout resultado x:y+ : </strong>Tienes que predecir si la puntuación de checkout de una visita específica será superior o inferior a 40.5</p><p><strong>X set tX set - checkout color:</strong> Tienes que predecir si el color del checkout de un tramo específica será rojo o verde.</p><p><strong>X set - más 180s: </strong>Tienes que predecir qué jugador conseguirá más 180s en el set mencionado (o si habrá un empate). </p><p><strong>X set - total 180s: </strong>Tienes que predecir si el número total de 180s conseguidos en el mencionado set por ambos jugadores estará por encima o por debajo del margen indicado. </p><p><strong>X set - Total de 180s del equipo local: </strong>Tienes que predecir si el número total de 180s conseguidos en el mencionado set por el jugador 1 estará por encima o por debajo del margen indicado. </p><p><strong>X set - Total de 180s del equipo visitante: </strong>Tienes que predecir si el número total de 180s conseguidos en el mencionado set por el jugador 2 estará por encima o por debajo del margen indicado. </p><p><strong>X set Tramo X - algún jugador anotará un 180: </strong>Tienes que predecir si algún jugador conseguirá un 180 en el set y la manga mencionada (o si no habrá ninguno). </p><p> </p><p><strong>X set Tramo X - equipo local anotará un 180: </strong>Tienes que predecir si el jugador 1 logrará un 180 en el set y el tramo mencionado (o si no habrá ninguno).</p><p><strong>X set Tramo X - equipo local anotará un 180: </strong>Tienes que predecir si el jugador 2 logrará un 180 en el set y el tramo mencionados (o si no habrá ninguno).</p><p> </p><p><i><strong>Mercados Outright:</strong></i></p><p><strong>Ganador: </strong>Tienes que predecir el ganador del torneo en cuestión según la clasificación oficial de la competición.</p><p><strong>Top 2: </strong>Tienes que predecir los finalistas del torneo en cuestión según la clasificación oficial de la competición.</p><p><strong>Quién llegará más lejos:</strong> Predecir cuál de los jugadores mencionados llegará a la fase posterior (o a la misma).</p><p><strong>Etapa de eliminación:</strong> Predecir en qué ronda será eliminado el jugador seleccionado. </p><p><strong>Nacionalidad ganadora: </strong>Tienes que predecir la nacionalidad del ganador.</p><p><strong>Mitad ganadora:</strong> Tienes que predecir que el ganador del torneo saldrá de la mitad superior o de la mitad inferior.</p><p><strong>Cuarto ganador: </strong>Tienes que predecir que el ganador del torneo saldrá del 1º/2º/3º/4º cuarto.</p><p><strong>Ganador por primera vez: </strong>Tienes que predecir si habrá un ganador por primera vez o no.</p><p><strong>Ganador del décimo cuarto: </strong>Tienes que predecir el ganador del cuarto mencionado (1º/2º/3º/4º).</p><p> </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.16 Bádminton",
                            "content": "<p><i><strong>BADMINTON </strong></i></p><p>En caso de que un partido no se complete, todos los mercados no decididos serán cancelados. Sí un jugador o equipo se retira,  todos los mercados no decididos serán cancelados.</p><p><strong>Mercados principales: </strong></p><p><strong>Ganador (1,2):</strong> Consiste en predecir el ganador del partido sin importar la diferencia de puntos.</p><p><strong>Resultado Correcto:</strong> Se debe predecir el resultado exacto  del partido en términos de sets ganados por cada jugador. Si uno de los jugadores se retira, este mercado será considerado como invalido.</p><p><strong>Hándicap de puntos </strong>(margen): Se debe predecir el ganador del partido adicionando o sustrayendo el margen indicado  al resultado final del encuentro, en puntos.</p><p><strong>Puntos Totales (Más/Menos): </strong>Se debe predecir si el  total de puntos en el encuentro es mayor o menor que el margen total ofrecido.</p><p><strong>Impar/Par juegos : </strong>Se debe predecir si el  total de juegos durante el encuentro es un número par o impar.</p><p><strong>X juego - Ganador: </strong>Predice el ganador del juego seleccionado.</p><p><strong>X juego - Puntos Totales: </strong>Se debe predecir si el total de puntos acumulados por ambos equipos en un juego determinado estará por encima o por debajo del margen ofrecido en el mercado.</p><p><strong>X juego - Handicap de puntos: </strong>Se debe predecir el ganador del juego mencionado (en puntos ganados) sumando o restando el margen indicado al resultado del partido (en puntos).</p><p><strong>X juego -  par / impar: </strong>predice si el total de puntos acumulados por ambos equipos en el juego X  será un número par o impar.</p><p><strong>X juego -  carrera a X puntos: </strong>Se debe predecir qué equipo alcanzará X puntos primero para el juego elegido.</p><p><strong>X juego -  Punto X: </strong> Se debe predecir qué jugador/equipo obtendrá el punto seleccionado en dicho juego.</p><p> </p><p><strong>Outrights:</strong></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p> </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.17 Squash",
                            "content": "<p><i><strong>SQUASH</strong></i></p><p>Si un jugador se retira, se rinde o es descalificado, todos los mercados no decididos son considerados como nulos. Si el árbitro otorga  puntos de penalización, todas las apuestas permanecen válidas. </p><p><i><strong>Mercados Principales: </strong></i></p><p><strong>Ganador (1,2): </strong>Mercado que consiste en predecir el ganador del evento sin importar el margen de puntos.</p><p><strong>Marcador Exacto: </strong>Se debe predecir el resultado exacto del evento en términos de sets ganados por cada jugador. Si un jugador se retira durante el evento, todos los mercados se consideran nulos.</p><p><strong>X Juego - Ganador:</strong> Se debe predecir el ganador del juego seleccionado.</p><p><strong>X Juego - Puntos Totales: </strong>Se debe predecir si el total de puntos acumulados por ambos equipos en el juego seleccionado estará por encima o por debajo del número seleccionado.</p><p><strong>X Juego - Hándicap de puntos: </strong>Se debe predecir el ganador del juego seleccionado (En puntos ganados) sumando o sustraendo el margen de puntos seleccionado al resultado del evento (En puntos).</p><p><strong>X Juego - par/impar: </strong>Se debe predecir si el total de puntos acumulados por ambos equipos en el juego seleccionado será un número  par o impar.</p><p><strong>X Juego - carrera a los X puntos: </strong>Se debe predecir qué equipo alcanzará primero los X puntos primero en el juego seleccionado.</p><p><strong>X Juego - X punto: </strong>Se debe predecir qué equipo ganará el X punto seleccionado en el juego seleccionado.</p><p><i><strong>Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo seleccionado de acuerdo al resultado oficial de la competencia.</p><p> </p><p><strong>X Juego - carrera a los X puntos: </strong>Se debe predecir qué equipo alcanzará primero los X puntos primero en el juego seleccionado.</p><p><strong>X Juego - X punto: </strong>Se debe predecir qué equipo ganará el X punto seleccionado en el juego seleccionado.</p><p><i><strong>Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir el ganador del torneo seleccionado de acuerdo al resultado oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.18 Ciclismo",
                            "content": "<p><i><strong>CICLISMO</strong></i></p><p>El resultado de una apuesta en una competición de ciclismo se basa en los primeros resultados oficiales publicados. Si una carrera se acorta o se ve afectada por las condiciones climáticas, las apuestas se liquidarán de acuerdo con las decisiones tomadas por los sitios  oficiales del torneo.</p><p> </p><p>Si una carrera se cancela oficialmente, todas las apuestas relacionadas se considerarán canceladas. Siempre que se posponga o suspenda una carrera por etapas, todas las apuestas relacionadas serán válidas hasta que la carrera se complete o cancele. El ganador de la carrera será el que ocupe el primer lugar en el podio. Cualquier descalificación, dada después de la carrera, no se tendrá en cuenta a la hora de liquidar las apuestas.</p><p> </p><p><i><strong>Mercados de ciclismo:</strong></i></p><p><strong> Ganador: </strong>Se debe predecir el ganador de la carrera o competición.</p><p><strong>Ganador del grupo: </strong>Se debe predecir cuál de los ciclistas nombrados incluidos en la apuesta alcanzará el mejor posicionamiento dentro del grupo. Si uno o más ciclistas del grupo se retiran antes del comienzo de la carrera, se cancelarán todas las apuestas..</p><p><strong>Podio: </strong>Se debe predecir que el ciclista elegido alcanzará el podio (primera, segunda o tercera posición).</p><p><strong>Top 6: </strong>Se debe predecir que el ciclista elegido completará la carrera dentro de las primeras seis posiciones.</p><p><strong>Top 10: </strong>Se debe  predecir que el ciclista elegido completará la carrera dentro de las diez primeras posiciones.</p><p><strong>H2H: </strong>Se debe predecir cuál de los dos ciclistas especificados en la apuesta logrará la mejor posición en el evento general. Siempre que en una etapa uno de los dos ciclistas sea descalificado durante una etapa avanzada de la competencia que su oponente ni siquiera haya alcanzado, el participante descalificado será considerado ganador.</p><p>Si uno de los dos corredores se retira o es descalificado durante una de las etapas de la carrera, el corredor que permanezca en la carrera será considerado ganador.</p><p>Si ambos competidores no alcanzan la siguiente etapa, la apuesta será anulada.</p><p><strong>Ganador de la etapa: </strong>El ganador de la etapa será el que ocupe el primer lugar en el podio. No se tendrá en cuenta ninguna descalificación a la hora de liquidar las apuestas.</p><p>No participantes: Si un corredor se retira de la competencia o es descalificado cuando la carrera o etapa ya ha comenzado, las apuestas a este corredor se liquidarán como Pérdidas.</p><p><strong>Apuestas de emparejamiento - por etapa y clasificación general: </strong>al menos uno de los corredores o equipos debe completar la etapa o carrera para que la apuesta de emparejamiento sea válida. Si ambos no terminan la etapa o la carrera, todas las apuestas serán anuladas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.19 Golf",
                            "content": "<p><i><strong>GOLF</strong></i></p><p>La regla Dead Heat se aplica a los mercados donde una selección de empate no se ofrece explícitamente, como los mercados de 2ball y 3ball</p><p>Esta regla sucede cuando hay más de un jugador en una sola posición en el ranking. La regla establece que la apuesta debe dividirse por el número de competidores involucrados en el empate y luego liquidarse con las probabilidades normales. Con la regla del Dead Heat, las ganancias potenciales se vuelven a calcular en función del número de competidores con el mismo rendimiento.</p><p> </p><p>Se considera que un jugador ha jugado una vez que ha arrancado en el evento. En el caso de que un jugador se retire después de haber arrancado, las apuestas se perderán en las apuestas en outrights, de grupo, de partido o de 18 hoyos.</p><p> </p><p>Cuando un torneo se reduzca del número programado de hoyos por cualquier motivo (es decir, condiciones climáticas adversas),las apuestas en outrights realizadas antes de la ronda final completa se liquidarán en función del jugador al que se le haya otorgado el trofeo si se han completado los 36 hoyos del torneo. Si se han completado menos de 36 hoyos o se han realizado apuestas en outrights después de la ronda final completa, las apuestas serán anuladas.</p><p> </p><p><strong>Outrights/Apuestas tempranas  </strong>en cualquier jugador que participe en un torneo de clasificación pero luego no se clasifique para el torneo principal será clasificado como perdedor.</p><p> </p><p>Torneos en las skins estarán sujetos a la regla  Dead-Heat en el evento en el que algunos jugadores ganen la misma cantidad de dinero en premios al final de la competencia especificada. Si se juegan hoyos adicionales para declarar un ganador definitivo, este será tomado para la liquidación de apuestas.</p><p> </p><p><i><strong>Mercados de Golf: </strong></i></p><p><strong>Ganador del torneo: </strong>Se debe predecir el ganador del torneo seleccionado.</p><p><strong>Ganador del grupo: </strong>Se debe predecir cuál de los jugadores seleccionados incluidos en la apuesta alcanzarán  la mejor posición final en el torneo.</p><p><strong>Podio: </strong>Se debe predecir cuál sea el jugador seleccionado, si terminará en el top 3 en el torneo seleccionado, incluyendo empates.</p><p><strong>Top 6: </strong>Se debe predecir cuál sea el jugador seleccionado, si terminará en el top 6 en el torneo seleccionado, incluyendo empates.</p><p><strong>Top 10: </strong>Se debe predecir cuál sea el jugador seleccionado, si terminará en el top 10 en el torneo seleccionado, incluyendo empates.</p><p><strong>Top 20: </strong>Se debe predecir cuál sea el jugador seleccionado, si terminará en el top 20 en el torneo seleccionado, incluyendo empates.</p><p><strong>Top Nacionalidad ganadora: </strong>Se debe predecir cuál de los jugadores seleccionados, de la nacionalidad seleccionada alcanzará la mejor posición final en el torneo.</p><p><strong>Top Continental: </strong>Se debe predecir cuál de los jugadores seleccionados, del continente seleccionado alcanzará la mejor posición final en el torneo.</p><p><strong>Margen de Victoria: </strong>Basado en el número de golpes entre el jugador ganador y la(s) persona(s) que termina(n) en segundo lugar (incluye un precio para que el torneo pase a un desempate). En caso de condiciones meteorológicas adversas que afecten al torneo, la liquidación se mantendrá siempre que se jueguen un mínimo de 36 hoyos de un torneo.</p><p><strong>Habrá un Playoff?: </strong>Se debe predecir si habrá un Playoff (un hoyo extra) o no durante el tour mencionado.</p><p><strong>Habrá hoyo en uno: Will there be a Hole in one?: </strong>Se refiere a hoyo en uno (jugador que logra hoyo con un solo golpe) que se registra en las rondas de la competencia durante el torneo. En caso de que el clima afecte el torneo las apuestas se mantendrán válidas mientras se haya jugado un mínimo de 36 hoyos en el torneo. En el caso de que se registre un hoyo en uno, pero no se jueguen 36 hoyos, la opción \"sí\", \"hacer un hoyo en uno\", se considerará ganadora.</p><p><strong>Top Jugador zurdo: </strong>Tienes que pronosticar cuál de los jugadores zurdos incluidos en la apuesta logrará la mejor posición final en el torneo.</p><p><strong>Top Ex ganador: </strong>Se debe predecir cuál de los jugadores nombrados que han ganado previamente el título mencionado en el pasado, incluido en la apuesta, logrará la mejor posición final en el torneo.</p><p><strong>Jugador en clasificarse: </strong>Pasa o no la clasificación, El torneo debe aplicar el método de clasificación para que las apuestas sean válidas. En caso de que un torneo emplee varios sistemas de clasificación, la liquidación estará basada en que un jugador juegue o no en la siguiente ronda siguiendo el primer corte oficial de la clasificación.</p><p><strong>Líder en la primera ronda: </strong>Se debe predecir cuál de los jugadores seleccionados incluidos en la apuesta alcanzará la mejor posición final en la ronda 1.</p><p><strong>Top X (5,10,20) Primera ronda: </strong>Se debe predecir si los jugadores seleccionados incluidos en la apuesta alcanzarán la posición top X en la primera ronda.</p><p><strong>Apuestas en Outright incluyendo “Campo”: </strong>No-Jugadores - no hay apuestas aparte de aquellas en el “Campo ``.El precio por “El Campo” incluye a todos los jugadores no mencionados en el mercado. Las apuestas aceptadas son solo de ganador. Aplican las reglas de apuestas en Outrights.</p><p><strong>Apuesta sin un jugador específico: </strong>Aplica la regla de Dead heat al ganador a menos que el jugador excluido no gane el torneo. La regla también aplica a la división de cada posible resultado de las apuestas.</p><p><strong>Group betting: </strong>El ganador será el jugador que obtenga la posición más alta al final del torneo. Cualquier jugador que pierda la clasificación (Cut) será considerado un perdedor. Si todos los jugadores fallan la clasificación (Cut), la puntuación más baja después de que se haya realizado la clasificación (Cut) determinará la liquidación de las apuestas. No participante: no se aplicarán deducciones de apuesta de acuerdo con la Regla 4 (c) de Tattersalls. Se aplican las reglas de empate, excepto cuando el ganador se determina mediante un desempate.<strong>   </strong></p><p>Si el torneo se ve afectado por condiciones meteorológicas adversas, las apuestas se liquidarán siempre que haya un ganador del torneo y se complete un mínimo de 36 hoyos. El ganador será el jugador que esté liderando al final de la última ronda completada.</p><p> </p><p><strong>Posición final de jugador: </strong>En caso de empate en una posición final, se contará la posición empatada. Por ejemplo, un empate con otros 5 jugadores por el octavo lugar contará como una posición final del octavo lugar.</p><p> </p><p><strong>Hoyo 54, 72 y 90 Apuesta del encuentro: </strong>Si el torneo se ve afectado por condiciones meteorológicas adversas, las apuestas se liquidarán siempre que haya un ganador del torneo y se complete un mínimo de 36 hoyos. El ganador será el jugador que esté liderando al final de la última ronda completada</p><p> </p><p>Si un jugador falla la clasificación (Cut) el otro jugador es considerado como ganador. Si ambos jugadores fallan la clasificación (Cut), la puntuación más baja luego de haberse realizado la clasificación (Cut) determinará la liquidación del mercado.</p><p> </p><p>Si un jugador es descalificado o se retira después de haber comenzado la competencia, ya sea antes de haber completado dos rondas o luego de que los dos jugadores hayan pasado la clasificación (Cut), el jugador restante se considera como ganador.</p><p> </p><p>Si un jugador es descalificado durante la ronda 3 o la ronda 4, aún si el otro jugador no alcanzó la clasificación (Cut), en ese caso, el jugador descalificado se considera como ganador.</p><p> </p><p>Un precio será ofrecido por el empate, y en caso de un empate, todas las apuestas a cualquier jugador para ganar, serán determinadas como pérdidas.</p><p> </p><p><strong>Encuentros de Torneo</strong>: Justo como lo anterior mencionado, con la diferencia de que en caso de empate, las apuestas serán canceladas.</p><p><strong>Six shooter:</strong> Se aplican las reglas de Dead-Heat. La regla 4 puede aplicarse en el caso de un No Participante. Los jugadores que comiencen pero no completen su ronda serán considerados perdedores.Aplica la regla empate. La regla 4 se puede aplicar en caso de un No-Jugador. Jugadores que inicien la ronda pero no la terminen, serán tomados como perdedores.</p><p><strong>Five shooter: </strong>Como arriba pero con cinco golfistas agrupados.</p><p><strong>Apuestas en 18 hoyos:</strong> El ganador será el jugador con el menor puntaje sobre los 18 hoyos. Jugadores que son emparejados pero que no completan la ronda serán clasificados como perdedores.</p><p><strong>18 hoyos - 2,3ball:</strong>Las apuestas se mantienen desde el momento en que los jugadores golpean el primer hoyo. Si una ronda es abandonada, entonces las apuestas en esa ronda son canceladas.</p><p> </p><p><strong>Las apuestas en 2,3ball </strong>se mantendrán independientemente de si los emparejamientos / grupos reales difieren. Para los torneos que utilizan el sistema de puntuación Stableford, se considera ganador al anotador de puntos más alto durante la ronda. Se anulan las apuestas de no-participantes,  2 y 3 bolas. En las apuestas de 2 bolas en las que no se ofrece un precio por el empate, las apuestas se anularán en caso de empate. Si se ofrece un precio por un empate, esto regirá la liquidación. En las apuestas de 3 bolas aplica la regla Dead Heat.</p><p> </p><p>Para todas las demás apuestas que involucren grupos de más de 3 jugadores juntos en 18 hoyos (por ejemplo, 7 bolas, 9 bolas, etc.) se aplican las reglas de Dead Heat.Apuestas de No-Jugado, Se aplicarán las deducciones de acuerdo con la Regla 4 c de Tattersalls.</p><p> </p><p><strong>Cuatrobolas:</strong> Las apuestas son válidas una vez que ambas parejas hayan salido del primer hoyo.</p><p><strong>Apuestas en Handicap:</strong> sustraer o adicionar el hándicap del total final para determinar el ganador. El torneo debe completarse; de ​​lo contrario, las apuestas se anularán. Cualquier jugador que no pase el corte será considerado un perdedor. Any non-runner Rule 4 and SP place terms will apply. Dead heat rules apply.Cualquier regla SP y regla 4 aplicará. Aplica la regla Dead-Heat.</p><p><strong>Encuentros míticos:</strong> El ganador será el jugador con la puntuación más baja en 18 hoyos. Si los resultados están nivelados después de 18 hoyos, las apuestas se anularán.</p><p>Jugador en hacer la ronda más baja, aplica la regla Dead-Heat.</p><p> </p><p>Puntuación de la ronda de un jugador individual. La línea se puede ajustar en juego. Todas las apuestas se anularán si el jugador no completa la ronda.</p><p> </p><p><strong>Ganador del siguiente hoyo - 3 balls:</strong> Todas las apuestas se anularán si ambos jugadores no dan el primer golpe en el hoyo designado. La liquidación de las apuestas se determina cuando los jugadores abandonan el green.</p><p><strong>Ganador del siguiente hoyo - 2 balls:</strong> Todas las apuestas se anularán si ambos jugadores no dan el primer golpe en el hoyo designado. La liquidación de las apuestas se determina cuando los jugadores abandonan el green.</p><p><strong>Total del siguiente hoyo:</strong> Las apuestas se liquidan según la puntuación combinada de los jugadores nombrados en el hoyo indicado. Todas las apuestas se anularán si todos los jugadores no completan el hoyo designado. La liquidación de las apuestas se determina cuando los jugadores abandonan el campo.</p><p><strong>Puntaje del jugador seleccionado en el siguiente hoyo : </strong>Todas las apuestas se anularán si el jugador no completa el hoyo designado. La liquidación de las apuestas se determina cuando el jugador abandona el green.</p><p><strong>Líder al final de la ronda:</strong> Tienes que predecir quién liderará al final de la ronda mencionada. Se aplican las reglas de Dead Heat.</p><p><strong>Mercados en Matchplay: </strong> Si un partido no comienza (por ejemplo, un jugador lesionado o descalificado antes del inicio de un partido), todas las apuestas en ese partido serán anuladas.</p><p> </p><p>Las apuestas en los mercados que se pueden liquidar utilizando el torneo oficial y los resultados de los partidos (incluida la puntuación correcta del partido final y las apuestas de partidos individuales) se liquidarán utilizando esos resultados. Esto incluye cuando un partido termina antes de tiempo, ya sea por acuerdo de los jugadores o por lesión.</p><p>Todos los demás mercados en los que un partido termina antes de que se completen los 18 hoyos (por ejemplo, por acuerdo), como el puntaje del partido, se liquidarán como si los hoyos restantes sin completar fueran empates.Por ejemplo, se considerará que un jugador 2 en el hoyo 13 cuando termina el partido ha ganado 2 y 1 (en el hoyo 17). Las apuestas de un solo hoyo no completadas serán anuladas.</p><p><strong>Greensomes:</strong> Las apuestas se liquidarán según el resultado oficial del tour.</p><p> </p><p><strong>Cuartetos : </strong>Las apuestas son válidas una vez que ambas parejas hayan salido del primer hoyo.</p><p> </p><p><strong>Apuestas en partidos de 36 hoyos: </strong>La liquidación estará basada en el jugador que consiga la posición más alta al final de 36 hoyos. Si se reduce el número de rondas jugadas, p. Ej. En caso de mal tiempo, las apuestas se liquidarán siempre que un jugador haya ganado el trofeo (las apuestas se mantendrán siempre que haya un ganador considerado y se completen un mínimo de 18 hoyos).</p><p> </p><p>Si un jugador es descalificado o se retira después de comenzar antes de completar dos rondas, el otro jugador se considerará ganador.</p><p> </p><p>Se ofrecerá un precio por el empate y, en caso de empate, se perderán las apuestas para que cualquiera de los jugadores gane.</p><p> </p><p>Ryder Cup/Solheim Cup/Walker Cup/Warburg Cup/Presidents Cup y cualquier otro “evento internacional”</p><p>Todos los mercados, incluidos Outright, Empate sin apuesta, Handicap, Máximo anotador de puntos, Mercados de puntuación correcta, se liquidarán según el resultado oficial a menos que se indique lo contrario. En la copa de los Presidentes  ‘Levanta el trofeo’ (sin la opción de empate), la regla dead-heat aplicará.</p><p><strong>Partidos sencillos:</strong> Si un partido individual termina en empate, las apuestas serán anuladas.</p><p><strong>Mercados de resultado correcto: </strong>Todos los partidos programados deben completarse en su totalidad para que las apuestas sean válidas, independientemente de si los partidos se prorrogan.</p><p><strong>Mercados de Lider (día): </strong>La liquidación se basará en la puntuación después de la cantidad programada de partidos en el formato especificado, independientemente de si los partidos se transfieren.</p><p><strong>Mercados de Líder (dia-formato): </strong>La liquidación se basará en la puntuación después de la cantidad programada de partidos en el formato especificado, independientemente de si los partidos se transfieren.</p><p><strong>Encuentros con mayor número de puntos: </strong>Los mercados se liquidarán en todo el torneo. Si un partido individual termina en empate, las apuestas serán anuladas. Las apuestas se mantendrán una vez que el jugador haya iniciado.</p><p><strong>Puntaje de victoria </strong>- La liquidación se realizará al completar 72 hoyos (o 90 para los torneos cuando corresponda); de lo contrario, las apuestas se anularán.</p><p><strong>Ganará o no un torneo importante</strong> - Los 4 grandes son US Open, US Masters, USPGA y British Open.</p><p><strong>Ganancia mejorada</strong>: se refiere a las apuestas absolutas en torneos.</p><p><strong>Partidos en llegar a los 18 hoyos: </strong>La cantidad programada de partidos debe comenzar para que las apuestas tengan validez. El número de partidos en los que ambos equipos dan el primer golpe en el hoyo 18 se utilizará a efectos de liquidación.</p><p><strong>Equipo en conseguir el primer Punto completo:</strong> A efectos de liquidación, el ganador será el primer equipo que gane un partido programado y, como resultado, obtenga un punto completo. En caso de que todos los partidos programados terminen en empate, las apuestas se anularán.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.20 Waterpolo",
                            "content": "<p><i><strong>WATERPOLO</strong></i></p><p><i><strong>Mercados Principales</strong></i></p><p><strong>1X2:</strong> El cliente debe  predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana).</p><p><strong>Total (Más /Menos): </strong>El cliente debe predecir si el número de goles marcados durante todo el partido estará por encima o por debajo de la línea estipulada </p><p><i><strong>Waterpolo Outrights</strong></i></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.21 Carreras de autos",
                            "content": "<p><i><strong>CARRERA DE AUTOS</strong></i></p><p>El resultado de una apuesta en un evento de Fórmula 1, Nascar, Indy Car, Rally se basa en los primeros resultados oficiales publicados. No se tendrán en cuenta las decisiones tomadas por la federación oficial ( (incluido, entre otros, la FIA) y que afecten o modifiquen el resultado obtenido en el campo de la carrera.</p><p>Cada carrera comienza con la vuelta de calentamiento. Si el piloto que el usuario ha seleccionado no está en la parrilla de salida para la vuelta de calentamiento, o listo para comenzar la carrera desde el pit lane, la apuesta se cancelara y se reembolsará la apuesta, si se suspende una carrera y no hay un resultado oficial declarado, todas las apuestas en esa carrera serán anuladas.</p><p> </p><p><i><strong>Mercados de carrera de autos:</strong></i></p><p><strong>Ganador (carrera): </strong>Se debe predecir que el piloto elegido será el ganador de la carrera. </p><p><strong>Constructor ganador (carrera): </strong>Se debe predecir a qué equipo pertenece el piloto ganador.</p><p><strong>Margen de victoria (carrera): </strong>Se debe predecir si equipo/piloto ganará la carrera con el margen ofrecido. </p><p><strong>Ganador del grupo (carrera): </strong>Se debe predecir si el piloto elegido será el ganador del grupo seleccionado durante la carrera.</p><p><strong>Top 3 (carrera):</strong> Se debe predecir si el piloto elegido alcanzará la posición del podio.</p><p><strong>Top 6 (carrera): </strong>Se debe predecir que el piloto seleccionado terminará la carrera dentro de las primeras seis posiciones. Para ser considerado ganador, el piloto debe completar al menos el 90% de las vueltas completadas por el ganador redondeado al número entero de vueltas más cercano.</p><p><strong>Top 10 (carrera): </strong>Se<strong> </strong>debe predecir que el piloto seleccionado terminará la carrera dentro de las primeras diez posiciones. Para ser considerado ganador, el piloto debe completar al menos el 90% de las vueltas completadas por el ganador redondeado al número entero de vueltas más cercano. </p><p><strong>H2H (Carrera): </strong>Se debe predecir cuál de los dos pilotos ofrecidos en la apuesta logrará la mejor posición en la carrera. Si estos pilotos se retiran o son descalificados en la misma vuelta, este tipo de apuesta se considerará cancelada. Si uno o más de los pilotos enumerados en la apuesta no pueden participar en la carrera, este tipo de apuesta se considerará nula.</p><p><strong>Ambos coches terminan con puntos: </strong>Se debe predecir si ambos coches del equipo seleccionado terminarán la carrera dentro de las diez primeras posiciones.</p><p><strong>Ambos autos clasificados: </strong>Se<strong> </strong>debe predecir si ambos autos del equipo seleccionado serán clasificados o no de acuerdo con el informe oficial de la federación (incluido, entre otros, la FIA)</p><p><strong>piloto que ganara la carrera, la posición de pole  y la vuelta más rápida: </strong>esto también se llama hat-trick y tienes que predecir qué piloto ganará la carrera, la posición de pole y hará  la vuelta más rápida.</p><p><strong>Primer piloto en hacer una parada en boxes:</strong> Se debe predecir qué piloto hará la primera parada en boxes durante la carrera.</p><p><strong>Posición de la parrilla del ganador: </strong>Se debe predecir la posición de salida del piloto ganador de la carrera</p><p><strong>Nacionalidad del piloto ganador:</strong> Se debe predecir la nacionalidad del ganador de la carrera. </p><p><strong>Conductor clasificado/no clasificado:  </strong>Se debe predecir si el conductor será clasificado o no de acuerdo con el informe oficial de la federación (incluido, entre otros, la FIA), publicado después de la carrera principal. Para ser considerado clasificado, el piloto debe completar al menos el 90% de las vueltas completadas por el ganador redondeando hacia abajo al número entero de vueltas más cercano. </p><p><strong>Número de pilotos clasificados: </strong>Se<strong> </strong>debe predecir cuántos coches/pilotos se clasificarán de acuerdo con el informe oficial de la federación (incluido, entre otros, la FIA) publicado después de la carrera principal. </p><p><strong>Vuelta más rápida: </strong>Se debe predecir qué piloto realizará la vuelta más rápida durante la carrera principal del Gran Premio. </p><p><strong>Retiro del primer piloto: </strong>Se debe predecir qué piloto se retirará primero durante la carrera principal del Gran Premio. Un conductor descalificado o que sufre un accidente se considera retirado. Si dos o más pilotos se retiran durante la misma vuelta, se considerarán iguales, independientemente del orden en el que se retiraron. </p><p><strong>Retiro del primer constructor: </strong>Se debe predecir qué equipo se retirará primero durante la carrera principal del Gran Premio. Un conductor descalificado o que sufre un accidente se considera retirado. Si dos o más pilotos se retiran durante la misma vuelta, se considerarán iguales, independientemente del orden en el que se retiraron.</p><p><strong>Coche de seguridad:</strong> Se debe predecir si los cuidados de seguridad saldrán a la pista durante la carrera. </p><p><strong>Coche de seguridad virtual: </strong>Se debe predecir si el sistema de seguridad virtual saldrá a la pista durante la carrera. </p><p><strong>Ganador (Pole): </strong>Se debe predecir que el piloto seleccionado logrará la mejor posición durante la sesión de calificación. </p><p><strong>Podio (Pole): </strong>Se debe predecir que el piloto seleccionado concluirá la sesión de calificación en primera, segunda o tercera posición.</p><p><strong>H2H (Pole): </strong>Se debe predecir cuál de los dos pilotos especificados en la apuesta logrará la mejor posición en la sesión de clasificación. </p><p><strong>Margen de victoria (Pole): </strong>Se debe predecir qué equipo / piloto ganará la pole con el margen aplicado. </p><p><strong>Ganador de grupo (Pole): </strong>Se debe predecir que el piloto seleccionado será el ganador del grupo seleccionado durante la sesión de Pole.</p><p><strong>Ganador (práctica): </strong>Se debe predecir  que el piloto elegido logrará la mejor posición durante la sesión de práctica.. </p><p><strong>Podio (práctica): </strong>Se debe predecir  que el piloto elegido concluirá la sesión de práctica en primera, segunda o tercera posición.</p><p><strong>H2H (Práctica): </strong>Se debe predecir cuál de los dos pilotos especificados en la apuesta logrará la mejor posición en la sesión de práctica.</p><p><strong>Ganador del campeonato (Pilotos y Constructores): </strong>Este tipo de mercado se liquidará en base al total de puntos conseguidos por los pilotos, inmediatamente después de la ceremonia de presentación del podio del último Gran Premio de la temporada.</p><p> </p><p><strong>Piloto / equipo de campeonato H2h(general):</strong> Se debe predecir qué piloto / equipo establecerá la mejor posición en el campeonato de pilotos actual. Si ambos pilotos / equipos logran los mismos puntos en la temporada, el ganador será declarado con los mismos criterios usados por la federación oficial (incluido, entre otros, la FIA); lo que significa que sólo se considerarán las mejores ubicaciones en las temporadas para determinar el ganador.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.22 Carreras de motos",
                            "content": "<p><i><strong>CARRERA DE MOTOS</strong></i></p><p>El resultado de una apuesta en un evento de MotoGP, Moto2, Moto3, Superbike, Speedway se basa en los primeros resultados oficiales publicados. No se tomarán en consideración las decisiones tomadas por la federación oficial  (incluido, entre otros, la FIM) y que afecten o modifiquen el resultado logrado en el campo de la carrera.</p><p> </p><p>Siempre que una carrera se posponga o suspenda oficialmente, todas las apuestas relacionadas seguirán siendo válidas si el evento se lleva a cabo antes de la medianoche del día siguiente a la fecha establecida originalmente para la carrera. Si no se reanuda o si no se completa dentro del plazo mencionado, todas las apuestas relacionadas con el evento se considerarán canceladas.</p><p> </p><p><i><strong>Mercados de carrera de motos:</strong></i></p><p><strong>Ganador (carrera): </strong>Se debe predecir si el piloto elegido será el ganador de la carrera. </p><p><strong>Podio (carrera): </strong>Se debe  predecir si el piloto elegido alcanzará el podio (primera, segunda o tercera posición).</p><p><strong>H2H (Carrera): </strong>Se debe predecir cuál de los dos pilotos especificados en la apuesta logrará la mejor posición en la carrera. En caso de que ambos pilotos se retiren o sean descalificados en la misma vuelta, este tipo de apuesta se considerará cancelada. </p><p><strong>Ganador (Pole): </strong>Se debe predecir si el piloto elegido logrará la mejor posición durante la sesión de calificación. </p><p><strong>Podio (Pole): </strong>Se debe  predecir si el piloto elegido concluirá la sesión de calificación en primera, segunda o tercera posición.</p><p><strong>H2H (Pole): </strong>Se debe predecir cuál de los dos pilotos especificados en la apuesta logrará la mejor posición en la sesión de clasificación.</p><p><strong>Lo mejor del grupo (carrera, pole): </strong>Se<strong> </strong>debe predecir qué piloto alcanzará la posición más alta en el grupo seleccionado. En caso de que uno de los pilotos del grupo no participe en la competición seleccionada, la apuesta se considerará cancelada.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.23 Deportes de invierno",
                            "content": "<p><i><strong>DEPORTES DE INVIERNO</strong></i></p><p>Se refiere a los deportes de invierno como el esquí de fondo, el esquí alpino, los saltos de esquí, el biatlón, el bobsled, el esquí estilo libre, el patinaje artístico, el snowboard, el skeleton, el patinaje de velocidad, el patinaje de velocidad sobre pista corta, el curling, el luge, la combinación nórdica, etc. cuentan como resultados oficiales, independientemente de cualquier descalificación posterior. Si no hay ceremonia de podio, el resultado se determinará de acuerdo con el resultado oficial declarado al final de la competencia por el organismo regulador.</p><p><strong>Eventos</strong> <strong>pospuestos o cancelados: </strong>Si, por cualquier motivo, un evento (que no sean los Juegos Olímpicos o los Campeonatos del Mundo) se pospone o cancela, todas las apuestas en ese evento serán anuladas a menos que la competencia se lleve a cabo dentro de las 48 horas posteriores a la hora originalmente programada para comenzar, o una organización reguladora declare un resultado oficial dentro de las 48 horas. </p><p> </p><p><i><strong>Mercados de deportes de Invierno</strong></i></p><p><strong>Ganador: </strong>Predice el ganador del evento<strong>.</strong></p><p><strong>Podio:</strong> Se debe predecir que el jugador seleccionado llegará al podio(primera, segunda o tercera posición.)</p><p><strong>H2H: </strong> Si uno de los dos participantes no comienza, las apuestas se anularán. Si ninguno de los participantes finaliza la carrera, las apuestas se anularán.Si uno de los participantes logra terminar la carrera y el otro no, el primero mencionado será el ganador. Si uno de los concursantes no termina y el otro no califica después de la preliminar, el competidor mejor clasificado en la preliminar será el ganador.</p><p>Si ninguno de los participantes se clasifica después de la preliminar, el mejor clasificado en la preliminar será el ganador. Si uno de los participantes no logra finalizar después de haber superado la preliminar y el otro no logra pasar la preliminar, el primero mencionado será el ganador.</p><p> </p><p><strong>Grupo del ganador :</strong> Se debe predecir cuál de los competidores especificados para este tipo de apuesta obtendrá el mejor resultado en el evento. Si alguno de los competidores no completa la competencia, el ganador será el que haya obtenido el mejor cronometraje durante la fase anterior. En el caso de competencias que constan de dos carreras, si ambos competidores se retiran en la primera carrera, la apuesta se declarará nula.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.24 E-sports",
                            "content": "<p><i><strong>E-SPORTS</strong></i></p><p> </p><p><strong>Reglas Generales</strong></p><p> </p><p>Cuando un evento involucra a los mismos dos jugadores o equipos que juegan múltiples juegos o mapas, por ejemplo, \"al mejor de 3\", y uno o más juegos o mapas no se juegan porque el resultado del evento ya ha sido determinado, apuestas en juegos no jugados o los mapas son cancelados y se reembolsan las apuestas.</p><p>Las fechas y horas de inicio se muestran sólo con fines informativos y pueden no ser precisas.</p><p> </p><p>Cuando un evento se cancela, pospone o interrumpe y no se completa dentro de las 48 horas posteriores a la hora de inicio programada originalmente, las apuestas en ese evento se anularán y se reembolsarán. Sin embargo, los juegos o mapas que se completan dentro de las 48 horas se liquidan  normalmente, incluso si los juegos o mapas adicionales que se suponía que eran parte del mismo enfrentamiento se cancelan o posponen aún más.</p><p> </p><p>En el caso de mercados numerados (como el ganador de una ronda específica en Counter Strike: GO, o el equipo que anota una muerte numerada en particular en League of Legends o DOTA2), el número determina el objetivo que cuenta para la apuesta . No se garantiza que las palabras como \"siguiente\" en el nombre del mercado sean correctas, ya que las transmisiones pueden retrasarse y no siempre podemos avanzar en el índice con precisión cuando se marca un objetivo o se completa una ronda. Todas las apuestas son liquidadas teniendo en cuenta el objetivo o ronda particular especificada, sin importar si hay alguna otra formulación del mercado o su tiempo de apertura en relación a cuando la apuesta fue realizada.</p><p> </p><p>Si el número programado de rondas o mapas cambia, o si los mercados se ofrecen erróneamente en función de un número diferente de rondas o mapas del número realmente programado, las apuestas se basan en el margen ganador (incluido el hándicap), el total de rondas / mapas, puntajes correctos, etc.Son canceladas y se reembolsan las apuestas.</p><p> </p><p>Se mantienen las apuestas al ganador del mapa y al ganador del enfrentamiento si un mapa no se juega o se otorga a un jugador o equipo por walkover o por defecto sin que el juego haya comenzado, todas las apuestas en ese mapa y en el enfrentamiento en su conjunto se anularán y se reembolsarán las apuestas. Las apuestas relacionadas únicamente con los mapas que se juegan son válidas. Se considera que un mapa ha comenzado tan pronto como comienza el reloj del juego o el equipo o el jugador realiza una acción del juego relacionada con ese mapa, incluidas selecciones, prohibiciones y compras de armas.</p><p><i><strong>Reglas de Counter Strike:GO </strong></i></p><p>La mayoría de las apuestas por mapa están basadas en el número de rondas estipulado(Mejor de 30) excluyendo rondas extra en caso de empate, si se ofrece el mercado de ganador de un mapa X sin la opción de Empate, el mercado será liquidado contando las rondas extras jugadas</p><p> </p><p><strong>Vocabulario:</strong></p><ul><li>•<strong> T / CT (Terroristas / Contra-Terroristas)</strong>: título de nombre específico para el equipo claro y oscuro. </li><li>• <strong>Ronda</strong>:  El equipo gana las rondas para poder ganar el mapa. La ronda se gana cuando: 1) Un equipo elimina al otro.</li><li>2) Los terroristas logran detonar la bomba. 3) Los Contra-Terroristas ganan, cuando la bomba no detona en los 120 segundos desde el inicio de la ronda. El equipo que logre ganar 16 rondas ganará el mapa.</li><li><strong>Tiempo extra:</strong> En el caso de empate en mapa, marcador 15:15, el primer tiempo extra es jugado en formato Bo6. En caso de otro empate (18:18), se jugará otro tiempo extra con las mismas reglas. Este proceso se repite hasta que haya un ganador. Las reglas del tiempo extra pueden variar por cada torneo.</li><li><strong>Ronda de Pistola:</strong> ronda 1 y ronda 16 en un mapa.</li></ul><p> </p><p> </p><p> </p><p> </p><p><i><strong>Reglas de Dota2 </strong></i></p><p>Para las apuestas que involucran torres, todas las torres destruidas cuentan como destruidas por el equipo contrario, incluso si el último golpe fue de un Minion.</p><p> </p><p>Para las apuestas que involucran barracones, todos los barracones destruidos cuentan cómo destruidos por el equipo contrario, incluso si el último golpe fue de un súbdito. Los cuarteles a distancia y cuerpo a cuerpo de cada par cuentan como cuarteles separados, por lo que cada equipo tiene un total de seis cuarteles.</p><p> </p><p>Para las apuestas que involucran eliminaciones (que no sean \"First Blood\"), la transmisión oficial o la API del juego, si está disponible, es definitiva para determinar si la muerte de un Campeón cuenta como una eliminación.</p><p>Por ejemplo, cuando un Campeón muere debido al daño de una torre o un minion sin la participación de un Campeón enemigo, es posible que no se registre como una muerte en la transmisión, en cuyo caso no cuenta como una muerte a los efectos de la liquidación de la apuesta.</p><p> </p><p>Para las apuestas en First Blood, la transmisión o la puntuación API oficial debe registrar la muerte como First Blood. Cuando, por ejemplo, un compañero de equipo niega una muerte, es posible que no se cuente como First Blood (independientemente de si está registrada como muerte en el contador de muertes transmitidas), en cuyo caso no contará como First Blood para fines de liquidación de apuestas. Para evitar dudas, todos los mercados de eliminaciones que no sean \"First Blood\" se liquidan en función del contador de muertes, pero una muerte que se registre en el contador de muertes contará como First Blood solo si se anuncia como tal.</p><p> </p><p>Para las apuestas en Roshans, se considera que el equipo que anota el último hit en Roshan según lo determinado por la transmisión o la API del juego, si está disponible, ha matado al Roshan, independientemente del jugador que tome la aegis of the Inmortal. </p><p> </p><p>Para las apuestas que involucran al siguiente equipo que anota un objetivo en particular o al equipo que anota la mayor cantidad de un objetivos en particular, donde se ofrece una opción de “ninguno” o “empate” y es el resultado ganador, las apuestas en cualquiera de los equipos son perdedoras. Cuando no se ofrezca tal selección y ninguno de los equipos sea un ganador, todas las apuestas en el mercado se anularán y se reembolsarán las apuestas.</p><p> </p><p>Cuando un equipo se rinde, las apuestas son válidas y se liquidan de la siguiente manera. Para las apuestas que involucran al ganador del mapa, el equipo ganador es el equipo que no se rindió. Las apuestas que involucran a Roshans, cuarteles y eliminaciones se establecen en función de la situación en el momento en que se produce la rendición.</p><p>Las apuestas que involucran torres, se liquidan como si el equipo ganador hubiera destruido el número mínimo de torres adicionales requeridas teóricamente para ganar el juego normalmente desde la posición en la que se produjo la rendición. Por ejemplo, si el equipo ganador ha destruido todas las torres de nivel 1 y una torre de nivel 2, se considerará que ha destruido tres torres más (siete en total), ya que habría tenido que destruir al menos una torre de nivel 3 y las dos torres antiguas han ganado el juego normalmente desde esa posición.</p><p><strong>Vocabulario:</strong></p><p>• <strong>Ancient</strong>: Es el objetivo principal del mapa. El primer equipo en destruir el Ancient del equipo contrario gana el mapa. </p><p>• <strong>GG</strong>: Esto permite al equipo correspondiente rendirse cuando se escribe en el chat para todos.</p><p>• <strong>Dire / Radiant</strong>: Es el título representando el nombre del equipo oscuro/claro. </p><p>• <strong>Kill</strong>:  Es el puntaje del equipo claro/oscuro, lo que representa el número total de veces que miembros del equipo rival han sido eliminados. </p><p>• <strong>Aegis</strong>: Es un objeto que aparece después que el objetivo del juego “Roshan” es eliminado. Puede ser recogido por un jugador.</p><p>• <strong>Tower</strong>: Es un objetivo de cada equipo, que puede ser destruido por el equipo rival. </p><p>• <strong>Barracks</strong>:  Es un objetivo de cada equipo, que puede ser destruido por el equipo rival.</p><p> </p><p> </p><p><i><strong>Reglas de League of Legends (LoL)</strong></i></p><p>Para las apuestas que involucran torres, todas las torres destruidas cuentan como destruidas por el equipo contrario, incluso si el último golpe fue de un Minion.</p><p> </p><p>Para las apuestas que involucran inhibidores, todos los inhibidores destruidos cuentan cómo destruidos por el equipo contrario, incluso si el último golpe fue de un súbdito. Para las apuestas que involucran la cantidad de inhibidores destruidos, cada uno de los seis inhibidores cuenta solo una vez, incluso si se destruye, reaparece y se destruye nuevamente. Para las apuestas que involucran al siguiente inhibidor destruido, cada destrucción de un inhibidor cuenta por separado, incluso cuando haya aparecido y esté siendo destruido por un segundo o un tiempo posterior.</p><p> </p><p>Para las apuestas que involucran eliminaciones (incluida \"First Blood\", que en League of Legends es sinónimo de la primera eliminación en el mapa), la transmisión oficial o la API del juego, si está disponible, es definitiva para determinar si la muerte de un Campeón cuenta como una muerte. Por ejemplo, cuando un Campeón muere debido al daño de una torre o un súbdito sin la participación de un Campeón enemigo, es posible que no se registre como una muerte en la transmisión, en cuyo caso no cuenta como una muerte a los efectos de la determinación de la apuesta.</p><p> </p><p>Para las apuestas que involucran al siguiente equipo que anota un objetivo en particular o al equipo que anota la mayor cantidad de un objetivos en particular, donde se ofrece una opción de “ninguno” o “empate” y es el resultado ganador, las apuestas en cualquiera de los equipos son perdedoras. Cuando no se ofrezca tal selección y ninguno de los equipos sea un ganador, todas las apuestas en el mercado se anularán y se reembolsarán las apuestas.</p><p> </p><p> </p><p>Cuando un equipo se rinde, las apuestas son válidas y se liquidan de la siguiente manera. Para las apuestas que involucran al ganador del mapa, el equipo ganador es el equipo que no se rindió. Las apuestas que involucran dragones, barones y muertes se establecen en función de la situación en el momento en que se produce la rendición. Las apuestas que involucran torres e inhibidores se liquidan como si el equipo ganador hubiera destruido el número mínimo de torres y / o inhibidores adicionales requeridos teóricamente para ganar el juego normalmente desde la posición en la que se produjo la rendición.</p><p>Por ejemplo, si algún inhibidor del equipo perdedor está caído en el momento de la rendición, no se considera que se haya destruido ningún inhibidor adicional. Si no hay ningún inhibidor del equipo perdedor, se considera que el equipo ganador ha destruido un inhibidor adicional, dando prioridad a un inhibidor que ya ha sido destruido si tal inhibidor existe y ha aparecido.</p><p> Si el equipo ganador ha destruido todas las torres de nivel 1 y una torre de nivel 2, se considerará que ha destruido tres torres más (siete en total), ya que habría tenido que destruir al menos una torre de nivel 3 y los dos nexus Torres han ganado el juego normalmente desde esa posición.</p><p> </p><p><strong>Vocabulario:</strong></p><p>• <strong>Nexus</strong>: Es el objetivo principal del mapa. El primer equipo en destruir el “Nexus” del equipo rival  gana el mapa. </p><p>• <strong>Kill</strong>: Es el puntaje del equipo (Azul/Rojo) lo que representa es el número total de veces que han eliminado a miembros del equipo contrario.</p><p>• <strong>Turret</strong>: Es un objetivo específico de los equipos que puede ser destruido por el equipo contrario. </p><p>• <strong>Inhibitor</strong>:  Es un objetivo específico de los equipos que puede ser destruido por el equipo contrario.</p><p>• <strong>Dragon</strong>: Es un objetivo del juego que puede ser eliminado por los jugadores.</p><p>• <strong>Baron</strong>: Es un objetivo del juego que puede ser eliminado por los jugadores.</p><p> </p><p><i><strong>Mercados Generales *</strong></i></p><p>*Uno o más mercados de una sección en concreto pueden ser encontrados en diferentes títulos de e-sports ofrecidos en nuestra plataforma. Unos de los títulos son los siguientes:  <strong>Kog (King of Glory), Rainbow Six, Starcraft, WoW (World of Warcraft), Valorant, GoW (God of War), HALO, HOTS (Heroes of the Storm), Rocket League y SMITE</strong>.</p><p><strong>Ganador: </strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos.</p><p><strong>Ganador(1x2): </strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos; o si el evento terminará en empate en tiempo regular.</p><p><strong>Hándicap de mapas : </strong>Se apuesta en el ganador del encuentro tomando en cuenta un margen específico de mapas. Al resultado final se le adicionan o sustraen el margen de mapas escogido en la apuesta, y en base a esto, se liquidará la apuesta si gana el equipo local o visitante.</p><p><strong>Ejemplo evento NomGaming vs Team Spotnet:</strong></p><p><strong>Nom-Gaming (-1.5)</strong> ➔Este mercado se refiere a que Non ganará el primer mapa dándole una desventaja de -1.5 rondas ( si el mapa acaba 3-0 a favor de Nom, la apuesta se liquidará como ganada ya que el resultado sería 1- 0).</p><p><strong>Team Spotnet (+1.5)</strong> ➔  Este mercado provee una ventaja de +1.5 a Team spotnet en todos los mapas establecidos en el evento. Si el evento acaba 2-1, la apuesta sería ganadora ya que el resultado luego del hándicap sería 2 - 2.5.</p><p><strong>Total de mapas:</strong> Se refiere al número total de mapas que el evento tendrá dependiendo del formato (BO1,BO3,BO5).</p><p><strong> Marcador Exacto (mapas): </strong>Se refiere al resultado exacto del evento en términos de mapas, Resultados posibles son:</p><p>0: 2 - 1: 2</p><p>2: 0 - 2: 1</p><p><strong>Primer Mapa - ganador (incl. Prórroga) - Segundo Mapa - ganador (incl. Prórroga):</strong> Este mercado define solo el ganador del primer o segundo mapa del evento incluyendo prórroga.</p><p><strong>Primer Mapa - Ganador 1X2</strong> : Este mercado define el ganador del primer mapa del evento. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana).</p><p><i><strong>Mercados de CS:GO </strong></i></p><p><strong>Ganador: </strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos.</p><p><strong>Primer Mapa - total de rondas(incl. Prórroga):</strong> Este mercado predice si el mapa disponible en el momento tendrá más o menos de 26.5 rondas, incluyendo prórroga.</p><p><strong>Primer Mapa - handicap de rondas (incl. Prórroga):</strong> En este mercado se le da una ventaja o desventaja al equipo X sobre el total de rondas que haya en el mapa seleccionado.</p><p>Ejemplo partida Ffamix vs Exdt:</p><p><strong>Ffamix (-2.5) </strong>➔ Este mercado se refiere a que Ffamix ganará el primer mapa dándole una desventaja de -2.5 rondas ( si el mapa acaba 6-2, la apuesta se liquidará como ganada ya que el resultado sería 3.5 - 2).</p><p><strong>Exdt (+2.5) </strong>➔ Este mercado se refiere a que Exdt ganará el primer mapa dándole una ventaja de +2.5 rondas ( si el mapa acaba 6-5, la apuesta se liquidará como ganada ya que el resultado sería 6 - 7.5).</p><p><strong>X Mapa Prórroga(si/no): </strong>Predice si habrá periodo de prórroga en el mapa X.</p><p><strong>X Mapa - 1era ronda de pistolas, Ganador: </strong>Se predice que equipo ganará la primera ronda de pistola del mapa X.</p><p><strong>X Mapa - 2da ronda de pistolas, Ganador: </strong>Se predice que equipo ganará la segunda ronda de pistola del mapa X.</p><p><strong>X Mapa - Equipo en ganar la siguiente ronda: </strong>Se predice cuál de ambos equipos gana la siguiente ronda en el primer mapa. </p><p><strong>X Mapa - primero en ganar 3/6/9/12: </strong>Predice que equipo será el primero en ganar 3/6/9/12 rondas en un mapa específico.</p><p> </p><p><i><strong>CS:GO Mercados adicionales</strong></i></p><p><strong>Equipo a ganar por lo menos 1 Mapa si/no: </strong>Se debe predecir si el equipo seleccionado ganará o no por lo menos un Mapa en una partida en concreto. </p><p><strong>Tiempo Extra Si/No: </strong>Se debe predecir si habrá tiempo extra o no. </p><p><strong>Ganador de Ronda de Pistola (Primera y Segunda Ronda de Pistola): </strong>Que equipo (Terrorista / Contra-Terrorista) ganará la ronda de pistola (Ronda 1 / 16)<strong>. </strong></p><p><strong>Ganador de primera mitad</strong>: Que equipo (Terrorista / Contra-Terrorista) tendrá el mayor número de rondas ganadas después de las primeras 15 rondas jugadas. </p><p>Ganador de la segunda mitad: Que equipo (Terrorista / Contra-Terrorista) tendrá el mayor número de rondas ganadas después de la ronda 15 y antes de que se concluya el mapa como empate o ganado por algún equipo.</p><p> </p><p> </p><p> </p><p><i><strong>Mercados de Dota2 </strong></i></p><p><strong>Ganador: </strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos.</p><p><strong>X mapa - 1er aegis: </strong>La liquidación de esta apuesta está ligada a que un equipo consiga el Immortals´s Aegis y no quien derrote al roshan en X mapa.</p><p><strong>X mapa - 1era torre:</strong> Se predice cuál de ambos equipos destruye una torre antes en el mapa X. </p><p><strong>X mapa - 1er Cuartel: </strong>Se predice cuál de ambos equipos destruye un cuartel antes en el mapa X. </p><p><strong>Primer mapa - ganador:</strong> Predice el ganador del primer mapa, sin incluir tiempo de prórroga.</p><p><strong>Segundo mapa - ganador: </strong>Predice el ganador del primer mapa, sin incluir tiempo de prórroga.</p><p><strong>Primer mapa - eliminaciones, apuesta sin empate:</strong> Se predice el ganador del primer mapa en términos de eliminaciones conseguidas, teniendo en cuenta que si estas quedan en empate, las apuestas se cancelan.</p><p><strong>Primer mapa - handicap de bajas: </strong>Se predice el ganador del primer mapa en términos de eliminaciones conseguidas dándole una ventaja o desventaja al equipo seleccionado como el que tendrá el mayor número de eliminaciones.</p><p><strong>Total de mapas:</strong> Se refiere al número total de mapas que el evento tendrá dependiendo del formato, (BO1,BO3,BO5)</p><p><strong>Hándicap de Mapas: </strong>Se apuesta en el ganador del encuentro tomando en cuenta un margen específico de mapas. Al resultado final se le adicionan o sustraen el margen de mapas escogido en la apuesta, y en base a esto, se liquidará la apuesta si gana el equipo local o visitante.</p><p><strong>X Mapa - Equipo en destruir la siguiente torre: </strong>Se predice cuál de ambos equipos destruye la siguiente torre en el mapa especificado.</p><p><strong>X Mapa - Equipo en realizar la primera sangre: </strong> Se predice cuál de ambos equipos realizará la primera eliminación  en el mapa especificado.</p><p><strong>X Mapa - Equipo con más eliminaciones : </strong>Se predice cuál de ambos equipos realizará el mayor número de eliminaciones  en el mapa especificado.</p><p><strong>X Mapa - Equipo en realizar la siguiente eliminación:  </strong>Se predice cuál de ambos equipos realizará la siguiente eliminación  en el mapa especificado.</p><p><strong>X Mapa - Equipo en eliminar el siguiente Roshan: </strong>Predice cuál equipo eliminará el siguiente Roshan en el mapa escogido.</p><p><strong>X Mapa - Eliminaciones totales Impar/Par: </strong>Se predice si el total de eliminaciones será un número par o impar.</p><p><strong>X Mapa - Eliminaciones totales Más/Menos: </strong>Se predice si el total de eliminaciones será mayor o  menor que el margen ofrecido.</p><p><strong>X Mapa - Total de Roshans : </strong>Predice el número exacto de Roshans que serán eliminados en el mapa X.</p><p><strong>X Mapa - Eliminaciones de Roshan totales Más/Menos: </strong>Se predice si el total de eliminaciones de roshan será mayor o  menor que el  margen ofrecido.</p><p><strong>X Mapa - Total de Torres Destruidas Más/Menos:</strong>Se refiere al número de torres destruidas en el mapa seleccionado.</p><p><strong>X Mapa  - Tiempo de juego Más/Menos:</strong> Se debe predecir si el total de minutos de X mapa será mayor o menor al margen ofrecido.</p><p> </p><p><strong>Equipo en registrar una Rampage: </strong>Se debe predecir qué equipo , o no, logrará un rampage, qué sucede cuando un jugador elimina en poco tiempo a 5 enemigos por sí solo. Si no hay un rampage en el mapa, las apuestas se consideran como pérdidas.</p><p><strong>Equipo en registrar una ultraKill: : </strong>Se debe predecir qué equipo , o no, logrará una ultrakill, que sucede cuando un jugador elimina en poco tiempo a 4 enemigos por sí solo. Si no hay una ultrakill en el mapa, las apuestas se consideran como pérdidas.</p><p><strong>X Mapa  - Tiempo de juego Más/Menos:</strong> Se debe predecir si el total de minutos de X mapa será mayor o menor al margen ofrecido</p><p><strong>X Mapa - Handicap a equipo con más eliminaciones: </strong>Se apuesta a quien será el ganador del mapa teniendo en cuenta un margen respectivo de eliminaciones. Al resultado se le sustrae o adiciona el número margen propuesto en el handicap.</p><p><strong>X Mapa - primero en realizar 5/10/15/20 eliminaciones: </strong>Predice que equipo será el primero en alcanzar 5/10/15/20 eliminaciones en un mapa específico.</p><p> </p><p><i><strong>Dota2 Mercados adicionales</strong></i></p><p><strong>Equipo a ganar por lo menos 1 Mapa si/no: </strong>Se debe predecir si el equipo seleccionado ganará o no por lo menos un Mapa en una partida en concreto. </p><p><strong>Duración del mapa:</strong> Se debe predecir si la duración del juego tras finalizar un mapa será mayor o menor al tiempo especificado. Resultado:  Si la duración de la partida es igual al tiempo especificado en el mercado, el mercado se resuelve como mayor. El mercado se liquida basándose en la pantalla final de resultados que está disponible por medio del steam API, una vez concluye el mapa.</p><p><strong>Mapa X Kill</strong>: El ganador de este mercado es el equipo que consiga la muerte número x tomando en cuenta la suma de las muertes de ambos equipos.</p><p><strong>Map Rampage</strong>: Si por lo menos un jugador, del equipo Claro u Oscuro, ha obtenido 5 o más bajas en un corto plazo de tiempo y este suceso sea anunciado en el juego. </p><p><strong>Map Ultrakill</strong>:Si por lo menos un jugador, del equipo Claro u Oscuro, ha obtenido 4 o más bajas en un corto plazo de tiempo y este suceso sea anunciado en el juego. </p><p><strong>Mapa Beyond Godlike</strong>: Si por lo menos un jugador, del equipo Claro u Oscuro, ha obtenido 10 o más bajas sin ser abatido y este suceso sea anunciado en el juego.</p><p><strong>Mapa Megacreeps</strong>: Se debe predecir si todas los barracones Claros u Oscuros son destruidos y este suceso sea anunciado en el juego.</p><p><strong>Map Type of activated rune spawned at specific map time</strong>: Tipo de runa, que aparece en un momento específico del juego (linea especificada) y es activada (O capturada y activada luego) por uno de los jugadores.</p><p> </p><p> </p><p><i><strong>Mercados de League of Legends </strong></i></p><p><strong>Ganador:</strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos.</p><p><strong>Hándicap de mapas : </strong>Se apuesta en el ganador del encuentro tomando en cuenta un margen específico de mapas. Al resultado final se le adicionan o sustraen el margen de mapas escogido en la apuesta, y en base a esto, se liquidará la apuesta si gana el equipo local o visitante.</p><p><strong>Total de mapas:</strong> Se refiere al número total de mapas que el evento tendrá dependiendo del formato, (BO1,BO3,BO5).</p><p><strong> Marcador Exacto (mapas): </strong>Se refiere al resultado exacto del evento en términos de mapas, Resultados posibles son:</p><p>0: 2 - 1: 2</p><p>2: 0 - 2: 1</p><p><strong>Primer mapa - primer inhibidor:</strong> Se predice cuál de ambos equipos destruye el inhibidor en el primer mapa. </p><p><strong>Primer mapa - primera torre:</strong> Se predice cuál de ambos equipos destruye una torre antes en el primer mapa. </p><p><strong>Primer mapa - primer dragón:</strong> Se predice cuál de ambos equipos derrota un dragón antes en el primer mapa. </p><p><strong>Primer mapa - primer barón:</strong> Se predice cuál de ambos equipos derrota un baron antes en el primer mapa. </p><p><strong>Primer mapa - primera eliminación :</strong> Se predice cuál de ambos equipos realizará la primera eliminación  en el primer mapa.</p><p><strong>X Mapa - Equipo en destruir la siguiente torre: </strong>Se predice cuál de ambos equipos destruye la siguiente torre en el mapa especificado.</p><p><strong>X Mapa - Equipo en realizar la primera sangre: </strong> Se predice cuál de ambos equipos realizará la primera eliminación  en el mapa especificado.</p><p><strong>X Mapa - Equipo con más eliminaciones : </strong>Se predice cuál de ambos equipos realizará el mayor número de eliminaciones  en el mapa especificado.</p><p><strong>X Mapa - Equipo en realizar la siguiente eliminación:  </strong>Se predice cuál de ambos equipos realizará la siguiente eliminación  en el mapa especificado.</p><p><strong>X Mapa - Eliminaciones totales Impar/Par: </strong>Se predice si el total de eliminaciones será un número par o impar.</p><p><strong>X Mapa - Eliminaciones totales Más/Menos: </strong>Se predice si el total de eliminaciones será mayor o  menor que el margen ofrecido.</p><p><strong>X Mapa - Total de Torres Destruidas Más/Menos: </strong>Se refiere al número de torres destruidas en el mapa seleccionado.</p><p><strong>X Mapa  - Tiempo de juego Más/Menos:</strong> Se debe predecir si el total de minutos de X mapa será mayor o menor al margen ofrecido.</p><p><strong>X Mapa - Handicap a equipo con más eliminaciones: </strong>Se apuesta a quien será el ganador del mapa teniendo en cuenta un margen respectivo de eliminaciones. Al resultado se le sustrae o adiciona el número margen propuesto en el handicap.</p><p><strong>X Mapa - primero en realizar 5/10/15/20 eliminaciones: </strong>Predice que equipo será el primero en alcanzar 5/10/15/20 eliminaciones en un mapa específico.</p><p><strong>X Mapa - Ambos equipos destruyen un inhibidor: </strong>Predice si ambos equipos destruirán un inhibidor en el mapa seleccionado.</p><p><strong>X Mapa - Ambos equipos eliminan un Baron: </strong>Predice si ambos equipos eliminan un Baron en el mapa seleccionado.</p><p> </p><p><strong>X Mapa -  Ambos equipos eliminan un dragón : </strong>Predice si ambos equipos eliminan un dragón en el mapa seleccionado.</p><p><strong>X Mapa - Equipo en destruir el siguiente inhibidor:</strong> Predice cuál equipo destruirá el siguiente inhibidor en el mapa escogido.</p><p><strong>X Mapa - Equipo en eliminar el siguiente barón: </strong>Predice cuál equipo eliminará el siguiente Barón en el mapa escogido.</p><p><strong>X Mapa - Equipo en eliminar el siguiente dragón: </strong>Predice cuál equipo eliminará el siguiente Barón en el mapa escogido.</p><p><strong>X Mapa - Total de  Barones eliminados: </strong>Predice el número exacto de Barones eliminados en el mapa X.</p><p><strong>X Mapa - Total de  Barones eliminados Más/Menos: </strong>Predice si el número de Barones eliminados supera o no el margen ofrecido en el mapa seleccionado.</p><p><strong>X Mapa -  Total de Dragones eliminados : </strong>Predice el número exacto de Dragones eliminados en el mapa X.</p><p><strong>X Mapa -  Total de Dragones eliminados Más/Menos: </strong>Predice si el número de dragones eliminados en el mapa X es mayor o menor al margen ofrecido.</p><p><strong>X Mapa - Total de  inhibidores destruidos:  </strong>Predice el número exacto de inhibidores destruidos en el mapa X.</p><p><strong>X Mapa - Total de  inhibidores destruidos Más/Menos: </strong>Predice si el número de inhibidores destruidos en el mapa X es mayor o menor al margen ofrecido.</p><p><strong>Equipo en registrar una PentaKill: </strong>Se debe predecir qué equipo , o no, logrará una pentakill, que sucede cuando un jugador elimina en poco tiempo a 5 enemigos por sí solo. Si no hay una pentakill en el mapa, las apuestas se consideran como pérdidas.</p><p><strong>Equipo en registrar una Quadra Kill: : </strong>Se debe predecir qué equipo , o no, logrará una quadrakill, que sucede cuando un jugador elimina en poco tiempo a 4 enemigos por sí solo. Si no hay una quadrakill en el mapa, las apuestas se consideran como pérdidas.</p><p><strong>X Mapa -  Equipo en eliminar el Heraldo de la Grieta: </strong>Predice cuál equipo eliminará al Heraldo de la grieta en el mapa escogido.</p><p> </p><p><i><strong>Extra League of Legends Markets</strong></i></p><p><strong>Equipo a ganar por lo menos 1 Mapa si/no: </strong>Se debe predecir si el equipo seleccionado ganará o no por lo menos un Mapa en una partida en concreto.</p><p><strong>Duración del mapa:</strong> Se debe predecir si la duración del juego tras finalizar un mapa será mayor o menor al tiempo especificado. Resultado:  Si la duración de la partida es igual al tiempo especificado en el mercado, el mercado se resuelve como mayor. El mercado se liquida basándose en la pantalla final de resultados que está disponible por medio del steam API, una vez concluye el mapa.</p><p><strong>Mapa X Kill</strong>: El ganador de este mercado es el equipo que consiga la muerte número x tomando en cuenta la suma de las muertes de ambos equipos.</p><p><strong>Mapa Total Torretas</strong>: Se debe predecir si la cuenta final de torres destruidas (Basado en la puntuación del juego, que es la suma de las torres azules + las torres rojas destruidas) en un mapa en concreto estará por encima o por debajo de la figura establecida. </p><p><strong>Mapa QuadraKill</strong>:  Si por lo menos un jugador, del equipo Azul o Rojo, ha obtenido 4 o más bajas en un corto plazo de tiempo y este suceso sea anunciado en el juego.</p><p><strong>Map PentaKill</strong>: Si por lo menos un jugador, del equipo Azul o Rojo, ha obtenido 5 o más bajas en un corto plazo de tiempo y este suceso sea anunciado en el juego.</p><p><strong>Mapa Xth Dragon type</strong>: Tipo del 1ero / 2do dragón aparecido desde el inicio del mapa. </p><p><strong>Mapa Dragon soul type</strong>: Tipo del 3er dragón aparecido desde el inicio del mapa. </p><p><strong>Mapa Certain type of dragon kill</strong>: Si un dragón de cierto tipo será aniquilado por lo menos una vez en un mapa en concreto.</p><p> </p><p> </p><p><i><strong>Mercados de Call of Duty </strong></i></p><p><strong>Ganador: </strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos.</p><p><strong>Hándicap de mapas : </strong>Se apuesta en el ganador del encuentro tomando en cuenta un margen específico de mapas. Al resultado final se le adicionan o sustraen el margen de mapas escogido en la apuesta, y en base a esto, se liquidará la apuesta si gana el equipo local o visitante.</p><p><strong>Total de mapas:</strong> Se refiere al número total de mapas que el evento tendrá dependiendo del formato, (BO1,BO3,BO5).</p><p><strong> Marcador Exacto (mapas): </strong>Se refiere al resultado exacto del evento en términos de mapas, Resultados posibles son:</p><p>0: 2 - 1: 2</p><p>2: 0 - 2: 1</p><p><strong>X Mapa - Equipo en ganar la ronda N : </strong>Predice qué equipo ganará la ronda N en el mapa indicado X.</p><p><strong>X Mapa - primero en ganar 3/6/9/12 rondas: </strong>Predice qué equipo ganará antes 3/6/9/12 rondas, en el mapa X.</p><p><strong>X Mapa - total de rondas(incl. Prórroga):</strong> Este mercado predice si el mapa disponible en el momento tendrá más o menos de 26.5 rondas, incluyendo prórroga.</p><p><strong>X Mapa - handicap de rondas (incl. Prórroga):</strong> En este mercado se le da una ventaja o desventaja al equipo X sobre el total de rondas que haya en el mapa seleccionado.</p><p>Ejemplo partida Ffamix vs Exdt:</p><p><strong>Ffamix (-2.5) </strong>➔ Este mercado se refiere a que Ffamix ganará el primer mapa dándole una desventaja de -2.5 rondas ( si el mapa acaba 6-2, la apuesta se liquidará como ganada ya que el resultado sería 3.5 - 2).</p><p><strong>Exdt (+2.5) </strong>➔ Este mercado se refiere a que Exdt ganará el primer mapa dándole una ventaja de +2.5 rondas ( si el mapa acaba 6-5, la apuesta se liquidará como ganada ya que el resultado sería 6 - 7.5).</p><p><strong>X Mapa Tiempo extra (si/no): </strong>Predice si habrá rondas extra en el mapa X.</p><p><strong>X Mapa puntos totales anotados Over/Under:</strong> Predice el total de rondas jugadas en el mapa X mencionado.</p><p> </p><p><i><strong>Mercado de Overwatch </strong></i></p><p><strong>Ganador:</strong>Predice el ganador del evento, de acuerdo al número de mapas ofrecidos.</p><p><strong>Hándicap de mapas : </strong>Se apuesta en el ganador del encuentro tomando en cuenta un margen específico de mapas. Al resultado final se le adicionan o sustraen el margen de mapas escogido en la apuesta, y en base a esto, se liquidará la apuesta si gana el equipo local o visitante.</p><p><strong>Total de mapas:</strong> Se refiere al número total de mapas que el evento tendrá dependiendo del formato, (BO1,BO3,BO5.</p><p><strong> Marcador Exacto (mapas): </strong>Se refiere al resultado exacto del evento en términos de mapas, Resultados posibles son:</p><p>0: 2 - 1: 2</p><p>2: 0 - 2: 1</p><p><strong>X Mapa - Equipo en ganar la ronda N : </strong>Predice qué equipo ganará la ronda N en el mapa indicado X.</p><p><strong>X Mapa - primero en ganar 3/6/9/12 rondas: </strong>Predice qué equipo ganará antes 3/6/9/12 rondas, en el mapa X.</p><p><strong>X Mapa - total de rondas(incl. Prórroga):</strong> Este mercado predice si el mapa disponible en el momento tendrá más o menos de 26.5 rondas, incluyendo prórroga.</p><p><strong>X Mapa - handicap de rondas (incl. Prórroga):</strong> En este mercado se le da una ventaja o desventaja al equipo X sobre el total de rondas que haya en el mapa seleccionado.</p><p>Ejemplo partida Ffamix vs Exdt:</p><p><strong>Ffamix (-2.5) </strong>➔ .Este mercado se refiere a que Ffamix ganará el primer mapa dándole una desventaja de -2.5 rondas ( si el mapa acaba 20-10, la apuesta se liquidará como ganada ya que el resultado sería 17.5-10).</p><p><strong>Exdt (+2.5) </strong>➔Este mercado se refiere a que Exdt ganará el primer mapa dándole una ventaja de +2.5 rondas ( si el mapa acaba 15-15, la apuesta se liquidará como ganada ya que el resultado sería 17.5-15).</p><p><strong>X Mapa Tiempo extra (si/no): </strong>Predice si habrá rondas extra en el mapa X.</p><p><strong>X Mapa puntos totales anotados Over/Under:</strong> Predice el total de rondas jugadas en el mapa X mencionado.</p><p> </p><p><i><strong>Mercados de FIFA</strong></i></p><p><strong>1X2:</strong> El cliente debe predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana)</p><p><strong>Apuesta sin empate (DNB):</strong> Este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, tiene que haber un equipo ganador. Lo que significa que, si el partido termina en empate, se reembolsará el dinero apostado. Por ejemplo,si un resultado final da como resultado un empate, la apuesta se liquidará como cancelada.</p><p><strong>Total (Más /Menos): </strong>El cliente debe predecir si el número de goles marcados durante todo el partido estará por encima o por debajo de la línea estipulada</p><p><i><strong>Mercados de NBA 2K</strong></i></p><p><strong>Ganador 1X2: </strong>Se debe predecir si la victoria será para el equipo Local o el equipo Visitante, otorgándo la opción de escoger el empate.</p><p><strong>Money Line (Ganador 1, 2) (incl.Prórroga):</strong> Se debe predecir cuál será el ganador del evento sin importar cual sea el margen de puntos. Este mercado siempre incluye Prórroga.</p><p> </p><p><strong>Total (Más de/Menos de) (incl.Prórroga):</strong> Se debe predecir si el número total de puntos marcados durante el evento, estarán por encima o por debajo del margen indicado. Por ejemplo: Más de 215.5 - Menos de 215.5. Este mercado incluirá Prórroga.</p><p> </p><p><strong>Handicap (Margen) (incl.Prórroga): </strong>Se debe predecir el ganador del evento añadiendo o sustrayendo la cantidad de puntos especificada en el margen al resultado del evento.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.25 Fútbol de playa",
                            "content": "<p><i><strong>FUTBOL DE PLAYA</strong></i></p><p><i><strong>Mercados Principales:</strong></i></p><p><i><strong>1X2: </strong></i>Tienes que predecir el resultado de todo el partido (3 períodos de 12 minutos). Hay 3 resultados posibles: 1 (el equipo local gana), X (los equipos empatarán), 2 (el equipo visitante gana).</p><p>OUTRIGHTS:</p><p><i><strong>Ganador: </strong></i>debes predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Ganador de Grupo:</strong> Apuesta por el equipo que finaliza con la mayor cantidad de puntos en su grupo  </p><p><i><strong> </strong></i></p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.26 Biatlón/Atletismo",
                            "content": "<p><i><strong>BIATLÓN: </strong></i></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>H2H: </strong>Se debe predecir cuál de los dos participantes especificados en la apuesta logrará la mejor posición en el evento general. En caso descalifiquen a los dos participantes o ambos se retiren durante la misma etapa<strong> </strong>de la competencia, las apuestas en este mercado serán canceladas.</p><p><i><strong>BIATLON / ATLETISMO</strong></i></p><p><i><strong>Outrights</strong></i></p><p><strong>Ganador: </strong>Se debe predecir que el jugador seleccionado será el ganador del torneo/evento.</p><p> </p><p><strong>H2H:</strong>  Se debe predecir cuál de los dos jugadores mencionados tendrá una mejor posición en el torneo/evento. En caso de que los dos jugadores se retiren o acaben descalificados en el mismo periodo de la competición el mercado se liquida como nulo. </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.27 Pesapallo",
                            "content": "<p><i><strong>PESAPALLO:</strong></i></p><p><i><strong>Mercados Principales: </strong></i></p><p><strong>1X2:</strong> El usuario debe predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana)</p><p> </p><p><strong>Outrights</strong></p><p> </p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.28 Salto de esquí",
                            "content": "<p><i><strong>SALTO DE ESQUÍ:</strong></i></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Top 3:</strong> Se debe predecir si el participante elegido alcanzará la posición del podio, incluyendo posición compartida.</p><p><strong>H2H: </strong>Se debe predecir cuál de los dos Participantes especificados en la apuesta logrará la mejor posición en el evento general. En caso descalifiquen a los dos participantes o ambos se retiren durante la misma etapa<strong> </strong>de la competencia, las apuestas en este mercado serán canceladas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.29 Hurling",
                            "content": "<p><i><strong>HURLING: </strong></i></p><p><i><strong> </strong></i></p><p><i><strong>Mercados Principales: </strong></i></p><p><i><strong> </strong></i></p><p><strong>Ganador(1X2): </strong>Se debe predecir el ganador de la pelea. Hay 3 posibles resultados, Gana 1, gana 2 o empate X.</p><p> </p><p><strong>Outrights</strong></p><p> </p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p> </p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.30 Fútbol Australiano",
                            "content": "<p><i><strong>FÚTBOL AUSTRALIANO:</strong></i></p><p><i><strong> </strong></i></p><p>Todos los mercados excluyen el tiempo extra, a menos que se especifique lo contrario en dicho mercado. Estos mercados se cerrarán de acuerdo al resultado de los 80 minutos de juego a menos que se especifique lo contrario en dicho mercado. Estos 80 minutos incluyen tiempo de reposición por lesión o por la suspensión temporal del partido.</p><p> </p><p><i><strong>Mercados Principales: </strong></i></p><p><strong>1X2:</strong> El cliente debe predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana)</p><p><strong>Apuesta sin empate (DNB):</strong> Este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, si el partido termina en empate, se reembolsará el dinero apostado. Por ejemplo,si un resultado final da como resultado un empate, la apuesta se liquidará como cancelada.</p><p><strong>Total (Más /Menos): </strong>El cliente debe predecir si el número de goles marcados durante todo el partido estará por encima o por debajo de la línea estipulada </p><p><strong>Handicap (2 way): </strong>se debe predecir el ganador del juego con un margen de gol respectivo. A los goles propuestos en el handicap se le suma o resta la puntuación correcta, y luego de dicha operación se determinará quién gana: equipo local, empate o equipo visitante </p><p><strong>Local Total: </strong>El cliente debe predecir si el total de goles marcados por el equipo local durante todo el partido serán por encima o por debajo de la línea indicada.</p><p><strong>Visitante Total: </strong>El cliente debe predecir si el total de goles marcados por el equipo visitante durante todo el partido serán por encima o por debajo de la línea indicada.</p><p><strong>Par/Impar:</strong>  Se debe predecir si el resultado del partido es par o impar, si el partido termina 0-0, el mercado ganador será el par.</p><p><strong>Par/Impar Local:  </strong>Se debe predecir si el número de goles anotados por el equipo local será par o impar. Si el equipo local no anotó ningún gol la selección ganadora será par.</p><p><strong>Par/Impar Visitante:</strong> Se  debe predecir si el número de goles anotados por el equipo visitante será par o impar. Si el equipo visitante no anotó ningún gol la selección ganadora será par.</p><p><strong>1x2 y  total: </strong> Se debe predecir la combinación del resultado del evento más si los goles estarán por encima o por debajo del margen seleccionado. Existen 6 posibles resultados:</p><p>Local &amp; Mas de: El equipo Local gana y el total de goles es más del margen seleccionado.</p><p>Local &amp; Menos de: El equipo Local gana y el total de goles es menos del margen seleccionado</p><p>Empate &amp; Más de: El evento termina en empate y el total de goles es más del margen seleccionado.</p><p>Empate &amp; Menos de: El evento termina en empate y el total de goles es menos del margen seleccionado.</p><p>Visitante &amp; Más de: El equipo visitante gana y el total de goles es más del margen seleccionado.</p><p>Visitante &amp; Menos de: El equipo visitante gana y el total de goles es menos del margen seleccionado.</p><p><i><strong>Mercados por Cuartos:</strong></i></p><p><strong>X Cuarto 1x2: </strong>Se debe predecir el resultado del ´´X´´ Cuarto, Son posibles 3 selecciones: Equipo Local, Equipo visitante y empate (X).</p><p><strong>X Cuarto Apuesta sin empate: </strong>Se debe predecir el ganador del ´´X´´ cuarto, en caso de que el ´´X´´ cuarto termine en empate todas las apuestas serán canceladas para este mercado, si el ´´X´´ cuarto no se completa este mercado será cancelado.</p><p><strong>X Cuarto Handicap: </strong>Se debe predecir el ganador del ´´X´´ cuarto<strong> </strong>añadiendo o sustrayendo el margen especificado al resultado de la mitad, si el cuarto no se completa este mercado será cancelado.</p><p><strong>X Cuarto Total: </strong>Se debe predecir si el número total de puntos durante el ´´X´´ cuarto estará por encima o por debajo del margen especificado, si el cuarto no se completa este mercado será cancelado. </p><p><strong>X Cuarto Total Local/Visitante: </strong>Se debe predecir si el número total de puntos marcados por el equipo seleccionado durante el ´´X´´ cuarto estará por encima o por debajo del margen especificado, si el cuarto no se completa este mercado será cancelado.</p><p><strong>X Cuarto Margen de victoria: </strong>Se debe predecir la diferencia de puntos que un equipo tendrá ante su rival al finalizar el X cuarto. </p><p><strong>X Cuarto par/impar: </strong>Se debe predecir si el número total de puntos marcados por el equipo seleccionado durante el ´´X´´ cuarto será un número par o impar.</p><p><i><strong>Outrights</strong></i></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><strong>Top4, Top8:  </strong>Se debe predecir si el equipo seleccionado ocupará la posición respectivamente seleccionada al final del torneo.</p><p><strong>Llegará a la final: </strong>Se debe predecir si el equipo seleccionado llegará a la final del torneo.</p><p><strong>Mayor número de victorias/derrotas en la temporada regular:</strong> Se debe predecir cuál equipo obtendrá el mayor número de victorias/derrotas al final del torneo de acuerdo con los resultados oficiales del mismo.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.31 Tenis de mesa",
                            "content": "<p><i><strong>TENIS DE MESA</strong></i></p><p><i><strong>Mercados Principales: </strong></i></p><p><strong>Ganador (1,2):</strong> Consiste en predecir el ganador del partido sin importar la diferencia de puntos.</p><p><strong>Hándicap de juegos </strong>(margen): Se debe predecir el ganador del partido adicionando o sustrayendo al resultado final del encuentro el margen indicado.</p><p><strong>Juegos Totales (Más/Menos): </strong>Se debe predecir si el  total de juegos en el encuentro es mayor o menor que el margen total ofrecido.</p><p><strong>Resultado Correcto:</strong> Se debe predecir el resultado exacto  del partido en términos de sets ganados por cada jugador. Si uno de los jugadores se retira, este mercado será considerado como invalido.</p><p><strong>Puntos Totales: </strong>Se debe predecir si el total de puntos anotados por ambos equipos será mayor o menor que el número dado en el mercado de apuestas elegido.</p><p><strong>¿Cuántos juegos serán decididos por puntos extra? : </strong>Se debe predecir cuántos juegos durante el encuentro se extienden a puntos extra para ser decididos( El ganador del set tiene más de 11 puntos).</p><p><strong>Juegos exactos: </strong>Se debe predecir el número de juegos exactos durante el encuentro.</p><p> </p><p><i><strong>Mercados por Juegos:</strong></i></p><p><strong>Ganador del Juego X :</strong>  Se debe predecir el ganador del juego número X. La apuesta se cancela si X juego no se completa.</p><p><strong>Puntos totales del juego X : </strong>Se debe predecir si el  total de puntos en el juego X es mayor o menor que el margen total ofrecido.</p><p><strong>Hándicap de Puntos en el juego X </strong>: Se debe predecir el ganador del Juego X adicionando o sustrayendo el margen indicado  al resultado final del Juego X.</p><p><strong>X Juego par/impar: </strong>Se debe predecir si el número total de puntos marcados por ambos equipos durante el Juego ´´X´´ será un número par o impar.</p><p><strong>Carrera a los N puntos en el Juego X: </strong>Se debe predecir cuál equipo llegará primero a los N puntos durante el juego X.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.32 Baloncesto 3x3",
                            "content": "<p><i><strong>Baloncesto 3x3</strong></i></p><p><i><strong>Mercados Principales:</strong></i></p><p><strong>Money Line (Ganador) (Incl. TE):</strong> Se debe predecir el ganador sin importar el margen de puntos. Este mercado incluye tiempo extra.</p><p><strong>Total (Mayor/Menor) (Incl. TE):</strong>  Se debe predecir si el total de puntos marcados entre ambos equipos será mayor o menor que el margen ofrecido en el mercado seleccionado. Por ejemplo: Mayor que 215.5 - Menor que 215.5. Este mercado incluye tiempo extra.</p><p><strong>Handicap (margen) (Incl. TE):</strong> Se debe predecir el ganador del partido añadiendo o sustrayendo el margen indicado al resultado del partido. Este mercado incluye tiempo extra.</p><p><strong>Ganador del partido 1X2:</strong> Se debe predecir si el ganador será el equipo local, el equipo visitante o si será empate. No incluye tiempo extra.</p><p><strong>Par/Impar (Incl. TE):</strong> Se debe predecir si el resultado del partido será un número par o impar. Este mercado incluye tiempo extra.</p><p><strong>Total de puntos por equipo (Local -Visitante) (Incl. TE): </strong>Se debe predecir si el total de puntos del equipo local o del equipo visitante será mayor o menor que el número establecido en el mercado seleccionado. Por ejemplo: Mayor que 215.5 - Menor que 215.5. Este mercado incluye tiempo extra.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.33 Bandy",
                            "content": "<p><i><strong>BANDY</strong></i></p><p><i><strong>Mercados Principales</strong></i></p><p><strong>1X2:</strong> El cliente debe predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana)</p><p><strong>Total (Más /Menos): </strong>El cliente debe predecir si el número de goles marcados durante todo el partido estará por encima o por debajo de la línea estipulada</p><p><i><strong>Bandy Outrights</strong></i></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.34 Unihockey",
                            "content": "<p><i><strong>UNIHOCKEY</strong></i></p><p><i><strong>Mercados Principales</strong></i></p><p><strong>1X2:</strong> El cliente debe predecir el resultado de todo el partido. Hay 3 resultados posibles : 1( el equipo local gana), X(los equipos empatan), 2 (el equipo visitante gana)</p><p><strong>Handicap: </strong>Se debe predecir el ganador del partido añadiendo o sustrayendo el margen indicado al resultado del partido.</p><p><strong>Total (Más /Menos): </strong>El cliente debe predecir si el número de goles marcados durante todo el partido estará por encima o por debajo de la línea estipulada </p><p><i><strong>Unihockey Outrights</strong></i></p><p><i><strong>Ganador: </strong></i>Se debe predecir el ganador del torneo en cuestión de acuerdo con el ranking oficial de la competencia.</p><p><i><strong> </strong></i></p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.35 Kabaddi",
                            "content": "<p><i><strong>KABADDI</strong></i></p><p><i><strong>Mercados principales</strong></i></p><p><strong>1X2: </strong> Tienes que predecir el resultado de todo el partido. Hay 3 resultados posibles: 1 (el equipo local gana), X (los equipos empatarán), 2 (el equipo visitante gana).</p><p><strong>Total (Más / Menos): </strong>Tienes que predecir si el número total de puntos anotados durante todo el partido estará por encima o por debajo de la línea indicada.</p><p><strong>Doble oportunidad: </strong>tienes que predecir el resultado de todo el partido. Hay 3 resultados posibles: 1X (al final del partido el equipo local gana o empata), X2 (al final del partido el equipo visitante gana o empata), 12 (al final del partido el equipo local gana o el equipo visitante gana).</p><p><strong>Apuesta sin empate:</strong> este mercado de apuestas consiste en lo siguiente, para definir una apuesta como ganadora, necesariamente debe haber un equipo ganador, lo que significa que, si el partido termina en empate, se reembolsará el dinero de la apuesta. Por ejemplo, si un resultado final da como resultado un empate, la apuesta se liquidará como nula.</p><p><strong>Hándicap: </strong>Tienes que predecir el ganador de todo el partido sumando o restando el hándicap indicado al resultado del partido.</p><p> </p><p><strong>Margen de victoria: </strong>mercado de apuestas que predice la cantidad de diferencia que un equipo tendrá de su oponente al final del partido, por ejemplo, el equipo local por 1-5 puntos.</p><p><strong>Mitad / Final: </strong>tienes que predecir el resultado del primer tiempo del partido junto con el resultado de todo el partido. Los posibles resultados son: (1/1, 1 / X, 1/2, X / 1, X / X, X / 2, 2/1, 2 / X y 2/2).</p><p><strong>Total del equipo local: </strong>Tienes que predecir si el número total de puntos anotados, de equipo local, durante todo el partido estará más o menos de la línea indicada.</p><p><strong>Total del equipo visitante: </strong>tienes que predecir si el número total de puntos anotados, del equipo visitante, durante todo el partido estará más o menos de la línea indicada.</p><p><strong>Mitad con mayor puntuación: </strong>tienes que predecir qué mitad tendrá los más puntos anotados.</p><p><strong>Impar / Par:</strong> Tienes que predecir si el resultado del partido es un número par o impar, si el resultado del partido es \"0: 0\", las apuestas se cuentan como \"pares\".</p><p> </p><p><i><strong>Mercados de la primera mitad</strong></i></p><p><strong>1a mitad -  Apuesta sin empate: </strong>Tienes que predecir el ganador de la primera mitad, si la mitad termina en empate, todas las apuestas serán anuladas, si la mitad no se completa, este mercado se anulará.</p><p><strong>1a mitad - doble oportunidad: </strong>Tienes que predecir el resultado de la primera mitad. Hay 3 resultados posibles: 1X (al final de la 1a mitad el equipo local gana o empata), X2 (al final de la 1a mitad el equipo visitante gana o empata), 12 (al final de la 1a mitad el equipo local gana o el equipo visitante gana).</p><p><strong>1a mitad - Hándicap: </strong>Tienes que predecir el ganador de la 1ª mitad sumando o restando el margen indicado al resultado de la mitad, si la mitad no se completa este mercado se anulará.</p><p><strong>1a mitad - Total (Menos / Más): </strong>Debe predecir si el número total de puntos anotados durante la primera mitad estará más o menos de la línea dada, si la mitad no se completa, este mercado se anulará.</p><p><strong>1a mitad -  Local/Visitante Total (Menos / Más): </strong>Tienes que predecir si el número total de puntos anotados por el equipo nombrado (Local o Visitante) durante la 1ª mitad estará más o menos de la línea indicada, si la mitad no se completa, este mercado se anulará.</p><p><strong>1a mitad - par / impar:</strong> Tienes que predecir si el número total de puntos anotados en la primera mitad será par o impar, si la mitad está incompleta, este mercado se anulará.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.36 Bolo césped",
                            "content": "<p><i><strong>BOLO CÉSPED </strong></i></p><p><strong>Principales Mercados</strong></p><p><strong>Ganador (1,2):</strong> Mercado de apuestas que consiste en pronosticar el ganador del partido independientemente del margen de puntos.</p><p> </p><p><strong>Hándicap Sets</strong>: Tienes que pronosticar el resultado en términos de sets ganados por cada jugador sumando o restando al resultado final del margen especificado en la apuesta.</p><p> </p><p><strong>Marcador correcto:</strong> Tienes que pronosticar el marcador correcto del partido en términos de sets ganados por cada jugador. Si un jugador se retira durante el partido, todas las apuestas no decididas se considerarán nulas. </p><p> </p><p><strong>Sets Totales (Más de/Menos de):</strong> Tienes que pronosticar si el número total de sets jugados en el partido estará por encima o por debajo del margen indicado.</p><p> </p><p><strong>X  Set - 1X2:</strong> Tienes que predecir el resultado del X set. Hay 3 posibles resultados: 1 (el jugador 1 gana), X (los jugadores empatarán), 2 (el jugador 2 gana).</p><p> </p><p><strong>X  set - empate sin apuesta:</strong> debe pronosticar el ganador de la primera mitad, si la mitad termina en empate, todas las apuestas se anularán, si la mitad no se completa, este mercado se anulará.</p><p> </p><p><strong>X set - Hándicap:</strong> Hay que pronosticar el ganador del set mencionado (en puntos ganados) sumando o restando el margen indicado al resultado del set (en puntos).</p><p> </p><p><strong>X set - Total:</strong> Predice si el total de puntos acumulados por ambos jugadores en el set mencionado estará por encima o por debajo de la línea.</p><p> </p><p><strong>X  set - Jugador 1/2 total:</strong> Debe pronosticar si el número total de puntos anotados por el jugador mencionado durante el set dado estará por encima o por debajo de la línea indicada, si el set está incompleto, este mercado se anulará.</p><p><i><strong>Bolo césped Outrights</strong></i></p><p><strong>Ganador: </strong>Debe pronosticar el ganador del torneo de acuerdo con la clasificación oficial de la competencia.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.37 Pádel tenis",
                            "content": "<p><i><strong>PÁDEL TENIS</strong></i></p><p><i><strong>Mercados Principales</strong></i></p><p><strong>Ganador (1,2):</strong> Mercado de apuestas que consiste en pronosticar el ganador del partido independientemente del margen de puntos.</p><p><strong>Hándicap de juegos</strong> (margen): Hay que pronosticar el ganador del partido sumando o restando la margen indicada al resultado del partido.</p><p><strong>Handicap de sets: </strong>Hay que pronosticar el resultado en términos de sets ganados por cada jugador sumando o restando al resultado final el margen especificado en la apuesta.</p><p><strong>Resultado Correcto: </strong>Tienes que pronosticar el resultado correcto del partido en términos de sets ganados por cada jugador. Si un jugador se retira durante el partido, todas las apuestas no decididas se considerarán nulas. </p><p><strong>Juegos Totales (Más/Menos): </strong>Hay que pronosticar si el número total de juegos jugados en el partido estará por encima o por debajo del margen indicado.</p><p><strong>Juegos pares/impares: </strong>Hay que pronosticar si al final del partido, el total delos juegos es un número par o impar.</p><p><strong>Juegos Totales (Más/Menos) Jugador 1: </strong>Tienes que pronosticar si el número total de juegos para el jugador 1 estará por encima o por debajo del margen indicado. Un desempate se considera un juego. La cantidad de juegos jugados se indicará en la liquidación de la apuesta con el segundo número entre paréntesis. Si el partido no se completa, todas las apuestas no decididas se considerarán nulas. </p><p><strong>Juegos Totales (Más/Menos) Jugador 2: </strong>Tienes que pronosticar si el número total de juegos para el jugador 2 estará por encima o por debajo del margen indicado. Un desempate se considera un juego. La cantidad de juegos jugados se indicará en la liquidación de la apuesta con el segundo número entre paréntesis. Si el partido no se completa, todas las apuestas no decididas se considerarán nulas.</p><p><strong>Ganador &amp; Total: </strong>Tienes que pronosticar el ganador del partido y si el número de juegos jugados está por encima o por debajo de la margen indicada.</p><p><strong>Tiebreak (si / no):</strong> <strong> </strong>Hay que pronosticar si habrá Tie-break en el partido.</p><p><strong>Deuce en el partido (Si/No): </strong>\"Deuce en el partido\" significa que el puntaje del juego alcanzará un puntaje de 40-40.</p><p><strong>Ganador del 1er set:</strong> Tienes que pronosticar el ganador del primer Set. La apuesta se considerará \"anulada\" si no se completa el primer set.</p><p><strong>Ganador del 2o set:</strong> Tienes que pronosticar el ganador del segundo Set. La apuesta se considerará \"anulada\" si no se completa este set.</p><p><strong>Set “X” Ganador:</strong> Tienes que pronosticar el ganador del Set “X”. La apuesta se considerará \"anulada\" si no se completa este set.</p><p><strong>Doble resultado (Primer set/partido):</strong>  Predecir el ganador del primer set, y al final del partido en un único mercado de apuestas.</p><p><strong>Jugador 1 en ganar exactamente 1 set:</strong> Hay que pronostica si el jugador 1 tendrá una victoria de 1 set durante el partido.</p><p><strong>Jugador 2 en ganar exactamente 1 set:</strong> Hay que pronostica si el jugador 2 tendrá una victoria de 1 set durante el partido.</p><p><strong>Sets exactos: </strong>Tienes que pronosticar el número exacto de sets durante el partido.</p><p><strong>Sets totales: </strong>Tienes que pronosticar si el número total de sets jugados en el partido estará por encima o por debajo del margen indicado.</p><p><strong>Cualquier set a cero: </strong>Hay que pronosticar si al menos uno de los sets del partido terminará con marcador exacto 6-0 / 0-6.</p><p><strong>Set “X” Hándicap juegos:</strong> Hay que pronosticar el ganador del Set “X” sumando o restando el margen indicado al resultado del partido. Si el partido no se completa, todas las apuestas no decididas se considerarán nulas. </p><p><strong>Set “X” Total juegos: </strong>Debe pronosticar si el número total de juegos jugados en el Set “X” durante el partido estará por encima o por debajo del margen indicado. </p><p><strong>Set “X” Resultado correcto: </strong>Tienes que pronosticar la puntuación correcta exacta del Set “X”. Si no se completa el set mencionado, todas las apuestas no decididas se considerarán nulas.</p><p><strong>Jugador 1 en ganar 1 set:</strong> Tienes que pronosticar si el jugador 1 ganará, o no, al menos un set en el partido. Hay dos resultados posibles: Sí y NO. </p><p><strong>Jugador 2 en ganar 1 set:</strong> Tienes que pronosticar si el jugador 2 ganará, o no, al menos un set en el partido. Hay dos resultados posibles: Sí y NO. </p><p><strong>Set “X” par/impar: </strong>Debe pronosticar si el número total de juegos jugados en el Set “X” durante el partido será par o impar.</p><p><strong>Set “X” habrá tiebreak: </strong>Hay que pronosticar si en el Set “X” habrá Tie-break.</p><p><strong>Set \"N\" - carrera a x juegos: </strong>Tienes que pronosticar qué jugador llegará primero a \"X\" juegos en el set específico.</p><p><strong>¿Quién ganará el juego (X e Y) del set n?: </strong>Mercado de apuestas que consiste en predecir el jugador que ganará los juegos x e y para el set n. Por ejemplo: 1 (juegos 6 y 7) 2do set (Donde la apuesta es para el jugador de casa) - X (juego 6 y 7) 2do set (Donde se apuesta por el empate) - 2 (Juego 6 y 7) 2do set (Donde se apuesta por el jugador visitante).</p><p><strong>¿Quién ganará el punto X en el juego Y en el set n? (Incluye apuestas de juegos en vivo): </strong>Predecir el jugador que ganará el punto x del juego y del set n. Por ejemplo, el jugador Wawrinka tendrá una victoria en el 1er punto en el juego 10 del 3er set del partido.</p><p><strong>¿Quién ganará el juego x del set (1, 2, 3, 4,5)? (Incluye apuestas de juegos en vivo):</strong> Prediga el jugador que ganará el juego x del conjunto especificado en el mercado de apuestas. Por ejemplo: 1 (juego 10) 2° set - 2 (juego 10) 2° set.</p><p><strong>Número exacto de puntos en el juego X (1er set): (Incluye apuestas en vivo):</strong> Predice el número exacto de puntos jugados en el juego elegido en el mercado de apuestas del primer set.</p><p><strong>Deuce en el juego si-no (Incluye apuestas en vivo): </strong>\"Deuce en el juego\" significa que el puntaje del juego alcanzará un puntaje de 40-40.</p><p><strong>Resultado del juego X (Set N) Jugador 1 o 2 (0-15-30-40):</strong> Consiste en predecir el ganador de un juego, y cuantos puntos hará el jugador contrario (0-15-30-40), es decir, si eliges el jugador 1 al 30 significa que el juego lo gana el jugador 1, pero el jugador 2 anota 30 puntos.</p><p><strong>Set “N” juego x - puntos pares/impares: </strong>Consiste en predecir si el número de puntos jugados en un juego de un set, será par o impar.</p><p><strong>Set \"N\" juego x - puntuación correcta o descanso: </strong>Consiste en predecir el ganador de un juego, y cuántos puntos hará el jugador contrario (0-15-30-40), o si habrá un break de serve en dicho juego.</p><p><strong>Set \"N\" juego Y - carrera a x puntos: </strong>Prediga el jugador que llegará primero a X puntos en el juego específico.</p><p><strong>Set \"N\" juego Y - primer ganador de x puntos:  </strong>Prediga el jugador que ganará los primeros X puntos en el juego específico.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "9.38 Reglas generales",
                            "content": "<p><i><strong>Reglas Generales</strong></i></p><p><strong>1.1</strong> El resultado de un mercado se liquida una vez que se determine. </p><p>Si un mercado no se determina durante el evento, la compañía liquidará el resultado del evento una vez que finalice la duración normal (tiempo regular) del evento, a menos que se indique lo contrario en el sitio oficial. </p><p><i>Ejemplo 1</i>: <strong>Ganador del partido 1X2</strong> el mercado de un evento es determinado después de la finalización de la duración normal (tiempo regular) de un evento. En Fútbol 1x2 el ganador del partido es determinado después de los 90 minutos, incluyendo tiempo de reposición. </p><p>En caso de que un evento se extienda a tiempo extra (donde el tiempo regular no determine el el ganador) todos los mercados que estén sujetos a “incluye tiempo extra” serán determinados y liquidados después de terminar el tiempo extra. Cualquier penal u otro factor decisivo que pueda continuar no se tienen en cuenta, a menos que se indique lo contrario. </p><p>Los eventos que no comiencen a tiempo por alguna razón o incluso se hayan pospuesto, puede que se mantengan abiertas las apuestas y seguirán siendo válidas si se comienza el evento dentro de las 48 horas a partir de la hora de inicio oficial. En cualquier caso, la empresa se reserva , a su propia discreción, el derecho de anular todas las apuestas de dichos eventos pospuestos y reembolsar las apuestas a los clientes.   </p><p>Los eventos abandonados después de su hora de inicio y que continúen dentro de las 48 horas posteriores a dicha hora, la empresa se reserva el derecho de mantener todas las apuestas válidas y liquidar de acuerdo con el resultado. </p><p>Los eventos abandonados después de su hora de inicio y que no se continúe dentro de las 48 horas, la compañía liquidará todos los mercados determinados que se encuentren decididos en el terreno de juego  y anula el resto reembolsando las apuestas a los clientes. Sin embargo, en casos como este, la compañía se reserva, a su propia discreción, el derecho de anular todas las apuestas de dichos eventos abandonados y reembolsar las apuestas a los clientes. </p><p>En la regla general anterior hay excepciones como en:</p><p>Los partidos de<strong> Tenis </strong>se mantendrán abiertos con todas las apuestas válidas hasta que la fuente oficial declare lo contrario. En estos casos, la regla de las 48 horas no aplica. Sin embargo y en caso de que un jugador se retire, todos los mercados que hayan sido determinados en el campo serán liquidados mientras que todos los demás serán declarados como cancelados y nulos. Para aclarar, si un jugador se retira antes de que concluya el último punto, el mercado “Ganador del encuentro” será cancelado , pero todos los mercados relacionados con sets o juegos específicos serán liquidados respectivamente. </p><p>En caso de que los siguientes juegos deportivos de  EE. UU. , como MLB, NHL y NBA (la NFL y la MLS no están incluidas en esta regla) no comienzan o comienzan y se abandonan y no se reanudan en el mismo día, en la zona horaria local desde el inicio tiempo anunciado, todas las apuestas no decididas se anularán.</p><p>(Ejemplo. Si un partido de Fútbol americano es abandonado en la segunda mitad, todos los mercados de la primera mitad serán cerrados de manera normal).</p><p>(Ejemplo. En el mismo caso anterior, (aquellos mercados de la segunda mitad no decididos) serán cancelados y las apuestas serán devueltas a los clientes).</p><p>En caso de eventos de la NFL abandonados o pospuestos, todos los mercados se consideran nulos a menos que el partido continúe en el mismo horario semanal de la NFL (de jueves a miércoles, hora local del estadio).</p><p><strong>Liga de beisbol MLB:</strong> El mercado “Moneyline” (Ganador del encuentro) es considerado decidido si los oficiales de la liga lo consideran completado y si: </p><ol><li>Al menos 5 entradas se completan en su totalidad.</li></ol><p><strong>O</strong></p><ol><li>4.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera. En el resto de los casos, las apuestas se cancelan.</li></ol><p> Para aclarar, las apuestas en los demás mercados(totales,handicap,etc) se mantendrán, a menos que ya están decididas si:</p><ol><li>al menos 9 entradas se completan.</li></ol><p><strong>O</strong></p><ol><li>8.5 entradas se han completado y el equipo local (o el equipo bateando en segundo) va en la delantera. </li></ol><p>En todos los demás casos, las apuestas se cancelarán. En el evento de una “Mercy Rule”, todas las apuestas se mantendrán y decidirán en base al resultado en ese momento.</p><p>Liga de beisbol MLB, todas las <strong>Líneas de Pitcher</strong> (Mercados <strong>PL </strong>para Moneyline, Handicap y Totales) serán cancelados en caso de que el pitcher inicial listado cambie.Las apuestas realizadas en las Líneas de Pitchers incluirán la indicación (PL) en el tiquete y en el historial de apuestas. En caso de que el indicador (PL) no sea visible en el tiquete, la apuesta está hecha en las líneas de Acción y se cerrarán respectivamente. Las Líneas de Acción serán liquidadas basándose en el resultado del evento sin importar que los pitchers hayan cambiado antes. Cualquier Línea de Pitcher ofrecida de nuevo luego de un cambio seguirá las mismas reglas anteriormente mencionadas. Las líneas de Acción siguen los reglamentos generales con ciertas excepciones en la MLB, como se mencionó antes. </p><p>En un partido de Béisbol de<strong> 7 entradas</strong>, todos los mercados  se consideran decididos si:</p><ol><li>Al menos 7 entradas se completan</li></ol><p><strong>O</strong></p><ol><li>6.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera.</li></ol><p>La excepción es el mercado “Moneyline” o ganador que se considera decidido si:</p><ol><li>Al menos 5 entradas se completan</li></ol><p><strong>O</strong></p><ol><li>4.5 entradas se completan y el equipo local (o el equipo bateando en segundo) va en la delantera.</li></ol><p>En todos los demás casos, las apuestas serán canceladas.</p><p><strong>1.2</strong> La compañía se reserva el derecho de no aceptar en su totalidad o parcialmente una apuesta sin dar una razón al cliente. Si una apuesta no se acepta, el dinero será reembolsado al cliente.</p><p><strong>1.3 </strong>Antes del inicio de un evento, la compañía se reserva,en su propia discreción, el derecho de cancelar  en su totalidad o parcialmente una apuesta incluso luego de ser aceptada sin dar una razón al cliente.</p><p> </p><p>Luego del inicio de un evento, la compañía se reserva, en su propia discreción, el derecho de cancelar en su totalidad o parcialmente una apuesta incluso luego de ser liquidada, si hay una razon valida para esto, como:</p><p>●      Error en la escritura(considerable) del evento,de las probabilidades o del tiempo de inicio del evento.</p><p>●       El cliente intentó sobrepasar los límites de la compañía (Ganancias potenciales) y del control de riesgo al realizar varias apuestas similares o idénticas, o abriendo más de una cuenta.</p><p>●     El cliente está obteniendo ventaja de cualquier anuncio público o información reservada que determine el resultado de su apuesta.</p><p>●       El cliente combinó apuestas relacionadas.</p><p>●       El cliente está participando activamente en el evento, siendo jugador, árbitro, cuerpo técnico o tiene una relación directa o indirecta con los participantes del evento. </p><p>●       La compañía sufrió un error técnico al ofrecer cuotas o eventos erróneos.</p><p>●       Cualquier otra razón válida comunicada debidamente al cliente por su petición.</p><p><strong>1.4</strong> Las ganancias máximas por tiquete son de ……(...... . EUR)</p><p><strong>1.5</strong> Nuestra  compañía se reserva el derecho de cancelar todas las apuestas de un evento, si hay algún cambio en referencia al terreno de juego del evento.</p><p><strong>1.6</strong>. Nuestra  empresa se reserva el derecho de cancelar todas las apuestas de un evento, si se presentan cambios radicales en las circunstancias de un evento como la duración del tiempo de juego, la distancia en una carrera o el número de periodos, etc.</p><p><strong>1.7</strong>  En caso de que la compañía tenga sospechas de que un evento disponible para apuestas deportivas presenta fraude o tiene una alta probabilidad de estar manipulado y el resultado de dicho evento, revelado antes para ciertos individuos, la compañía se reserva el derecho de :</p><p>●       Mantener tiquetes específicos sin liquidar</p><p>●       Informar a las entidades y cuerpos reguladores sobre esto(ESSA, Sportradar, Federations), dependiendo de a cuál autoridad o entidad está relacionado el evento.</p><p>●      Esperar a que un veredicto de dichas entidades sea revelado como retroalimentación.</p><p>●       Liquidar o cancelar las apuestas en base al veredicto de dichas entidades.</p><p><strong>1.8</strong> En el evento y durante el proceso de realizar apuestas, y el sistema presente alguna interrupción de carácter técnico, la compañía seguirá con las revisiones estándares tales como disponibilidad de fondos, corroboración de precios, etc y se reserva el derecho de aceptar o rechazar la apuesta respectivamente. En dicho caso, el cliente necesita iniciar sesión en cuanto el sistema se encuentre operando correctamente de nuevo y visitar su historial de apuestas para confirmar si la apuesta fue aceptada o no.</p><p><strong>1.9</strong>.Cualquier decisión tomada por el VAR (<strong>Video Assistant Referee) </strong>que intervenga con alguna decisión sancionada por los oficiales en el terreno de juego( incluyendo decisiones pasivas como permitir que se siga jugando antes de revisar el VAR), por ende, alterando la situación del partido al momento en que la apuesta se realizó, resultará en la cancelación de todas las apuestas realizadas en el intervalo de tiempo desde el momento en que ocurrió el incidente hasta cuando el árbitro tome una decisión final luego de revisar el VAR, a menos que las probabilidades ofrecidas en la apuesta no sean afectadas por el uso del VAR o ya hayan sido ajustadas por el uso del VAR cuando se aceptó la apuesta. La Liquidación de todas las más apuestas que no tengan relación con el uso del VAR, incluyendo aquellas que hayan sido decididas por alguna jugada durante el incidente original y la decisión final del árbitro, que no están influenciadas/alteradas por el uso del VAR se mantendrán como apuestas válidas.</p><p>En función de resultados, las revisiones del VAR se consideran como sucedidas desde el momento del incidente original ya que el VAR sería utilizado eventualmente si la jugada no hubiera sido detenida inmediatamente. La compañía se reserva el derecho de cambiar apuestas liquidadas previamente en el caso de que la liquidación anterior no sea precisa  luego de la decisión final del árbitro, teniendo en cuenta que esta decisión haya sido realizada y comunicada antes del final del encuentro y/o intervalo de tiempo listado.</p><p><strong>1.10</strong> Dirigido a la experiencia del usuario y aun mejor resultado visual, nuestra compañía aplica dos dígitos decimales para truncar las probabilidades en pantalla. Los cálculos de las probabilidades totales se realizan usando un redondeo de seis dígitos decimales, mientras que las ganancias totales siempre serán truncadas en el segundo dígito decimal. Cualquier diferencia notada, es producto del redondeo de cuotas explicado previamente.</p><p>2. Explicación de tipos de apuestas específicos</p><p>Anotadores: Primero, Último, Anotador en cualquier momento </p><p>Las apuestas se aplican solo al tiempo regular. Los goles en propia puerta (según la autoridad oficial) se omiten o cuentan como \"sin goleador\" si el juego solo tiene \"goles en propia puerta\". </p><p>Apostar al primer goleador será ANULADO si un jugador nunca juega o entra al terreno de juego después de que se haya marcado el primer gol del partido, excepto en el caso de un gol en propia puerta, que se ignora.</p><p>Apostar al último goleador será ANULADO si un jugador nunca juega. La puntuación de jugador se aplica a cualquier jugador, independientemente de la hora en que ingresó al juego. </p><p>Apostar al goleador en cualquier momento se aplica a cualquier jugador involucrado en el juego, independientemente de la hora en que ingrese al juego. Las apuestas sobre el goleador en cualquier momento serán ANULADAS si un jugador nunca juega. </p><p>En caso de que se suspenda un partido pero haya al menos un Goleador, se aplican las apuestas al primer Goleador y las apuestas al último Goleador se anulan. Siempre que el mercado de goleadores de este jugador se establezca como ganador y las apuestas a otros jugadores se anularán.</p><p>Las reglas anteriores se refieren a los mercados \"Primer goleador / goleador en cualquier momento y 1X2\" y \"Primer goleador / goleador en cualquier momento y puntaje correcto\".</p><p>Otros mercados especiales para jugadores</p><p><i><strong>Futbol</strong></i></p><p><strong>Total de disparos del jugador / Disparos del jugador por encima/por debajo</strong>: las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de disparos del jugador a la portería / Disparos del jugador a la portería por encima/por debajo</strong>: las apuestas se aplican al tiempo reglamentario más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de cartas de jugador / cartas de jugador por encima / por debajo</strong>: las apuestas se aplican al tiempo regular más las horas extra (si las hubiera). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Jugador Total derribos / Jugador derribos por encima / por debajo</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de asistencias de jugador / Más / menos de asistencias de jugador</strong>: las apuestas se aplican al tiempo regular más las prórrogas (si las hubiera). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de pases del jugador / Pases del jugador más/menos:</strong> las apuestas aplican en el tiempo regular más el tiempo extra (Si corresponde). La tanda de penaltis no será tomada en cuenta para el resultado. Si el jugador mencionado no se encuentra en la formación inicial del partido, las apuestas se liquidan como nulas.</p><p> </p><p><strong>Jugadores vs Jugador (H2H) mercados</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas. </p><p> </p><p><i><strong>Baloncesto</strong></i></p><p>Todos los mercados especiales de jugadores de baloncesto se liquidan de acuerdo con la fuente oficial correspondiente. Posible tiempo de prórroga se incluye en la liquidación de todos los mercados disponibles. </p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i> </i></p><p><i><strong>Hockey sobre hielo</strong></i></p><p><strong>En cualquier momento / Xº goleador (EN VIVO)</strong>: las apuestas se aplican solo al tiempo reglamentario. Todos los jugadores ofrecidos se consideran participantes. Si un jugador no incluido en la lista marca un gol, todas las apuestas a los jugadores incluidos en la lista son válidas. Para fines de liquidación, sólo se consideran los goles y las asistencias marcadas durante el tiempo reglamentario. Tenga en cuenta que si el marcador después del tiempo reglamentario es 0-0, todas las apuestas se liquidarán como pérdidas. Se mantendrán todas las apuestas sobre jugadores que estaban en la lista pero que abandonaron el juego antes de que terminara el partido (como lesiones o expulsiones).</p><p><strong>Jugador que anote un punto (EN VIVO)</strong>: las apuestas se aplican solo al tiempo reglamentario. Todos los jugadores ofrecidos se consideran corredores. Si un jugador no incluido en la lista obtiene un punto, todas las apuestas a los jugadores incluidos en la lista se mantienen. Para fines de liquidación, sólo se consideran los goles y las asistencias marcadas durante el tiempo reglamentario. Tenga en cuenta que si el marcador después del tiempo reglamentario es 0-0, todas las apuestas se liquidarán como pérdidas. Se mantendrán todas las apuestas sobre jugadores que estaban en la lista pero que abandonaron el juego antes de que terminara el partido (como lesiones o expulsiones).</p><p><strong>Total de asistencias del jugador (por encima / por debajo) (PREMATCH</strong>): las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de goles del jugador (por encima / por debajo) (PREMATCH):</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de atajadas del jugador (por encima/ por debajo) (PREMATCH)</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Puntos totales del jugador  (por encima/ por debajo) (PREMATCH)</strong>: las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de disparos del jugador (por encima/ por debajo) (PREMATCH)</strong>: Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p><strong>Total de disparos del jugador a puerta (por encima/ por debajo) (PREMATCH)</strong>: las apuestas se aplican al tiempo regular más el tiempo extra (si lo hubiera). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no está en la alineación inicial del partido, las apuestas se liquidan como nulas.</p><p> </p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). La posible tanda de penaltis no contará para la liquidación. Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p> </p><p><i><strong>Béisbol</strong></i></p><p>Todos los mercados especiales de jugadores de béisbol se liquidan de acuerdo con la fuente oficial correspondiente. Las entradas adicionales potenciales jugadas se incluyen en la liquidación de todos los mercados disponibles.. </p><p> </p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> las apuestas se aplican al tiempo regular más la entrada adicional (si corresponde). Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidan como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p><i> </i></p><p><i><strong>fútbol americano</strong></i></p><p>Todos los mercados especiales de jugadores de fútbol americano se liquidan de acuerdo con la fuente oficial correspondiente. Las horas extraordinarias potenciales se incluyen en la liquidación de todos los mercados disponibles.</p><p> </p><p><strong>Jugador vs Jugador (H2H) mercados:</strong> Las apuestas se aplican al tiempo regular más el tiempo extra (si corresponde). Si el jugador que figura en la lista no participa en absoluto en el partido, las apuestas se liquidarán como nulas. En caso de empate entre los jugadores, las apuestas son nulas.</p><p> </p><p> </p><p><i><strong>REGLA “DEAD HEAT”</strong></i></p><p>Cuando no hay un ganador individual o hay un empate entre dos, tres o más competidores, la regla “Dead Heat” aplicará. Esto quiere decir que las cuotas se dividirán entre el número de participantes que hayan quedado en empate en esa posición. </p><p>Por ejemplo: Empate en Carreras de Caballos, o empate en el mercado “Jugador con más anotaciones” en un campeonato. </p><p>Dos jugadores empatan en el número de goles en un campeonato. Jugador 1 pagó 3.00 y jugador 2 pagó 1.5</p><p>Las cuotas serán divididas entre 2 y la apuesta será pagada regularmente.</p><p>Jugador 1 se pagará con cuotas de  3.00 / 2 = 1.5.</p><p>Jugador 2 se pagará con cuotas de 1.5 / 2 = 0.75.</p><p> </p><p> </p><p><i><strong>REGLAS PARA MERCADOS DE CLASIFICACIÓN</strong></i></p><p><strong>Se Clasificará: </strong>este mercado consiste en predecir cuál de los equipos pasará a la siguiente ronda del torneo. Para esta opción, se tendrán en cuenta los resultados tanto de la primera etapa como de la segunda etapa, incluyendo el tiempo extra y los tiros desde el punto penalti, en caso de que estos ocurran.</p><p><strong>Método de Victoria</strong></p><p>En este mercado se debe predecir cuál será la manera en la que se clasificará el equipo a la siguiente fase del torneo.</p><p>Por ejemplo, si la selección fué:</p><p><strong>Equipo Local Tiempo Extra OT (Juventus Turin Tiempo Extra (OT)): </strong>Se estará indicando que la definición del mercado ocurrirá durante el tiempo extra.</p><p><strong>Equipo Local Tiempo Regular (Juventus Turin Tiempo Regular): </strong> Se estará indicando que la definición del mercado ocurrirá durante el tiempo regular + el tiempo de reposición.</p><p><strong>Equipo Visitante Penaltis (Ajax Penaltis):</strong> Se estará indicando que la definición del mercado ocurrirá durante los tiros de penalti.</p><p><strong>Crear apuesta</strong></p><p>La función Crear Apuesta le da al jugador la oportunidad de combinar selecciones del mismo evento en un cupón de apuestas. Si una selección que participa en un cupón de la función Crear Apuesta es nulo/empujado, entonces todo el cupón de apuestas también es nulo/empujado, INDEPENDIENTEMENTE del resultado de las otras selecciones que participan en la función.</p><p>Por ejemplo, en el partido LA Lakers vs Toronto Raptors, creamos un cupón de Crear Apuesta con LA Lakers para ganar, Más de 220,5 puntos en el partido y Jugador X - Más de 29,5 puntos. En caso de que el jugador X no participe en el partido, la selección por sus puntos (más de 29,5) se declara nula. Por lo tanto, todo el el cupón de Crear Apuesta se liquida como nulo ya que la selección participa en una función Crear Apuesta.</p><p> </p><p> </p><p><i><strong>Fútbol Pago Anticipado</strong></i></p><p>Con la oferta Fútbol Pago Anticipado, puedes apostar antes del inicio del partido en el mercado 1X2 (ganador local o visitante) y si tu equipo tiene 2 goles de ventaja en cualquier momento del partido, ganas automáticamente ¡sin tener que esperar a que termine el partido!</p><p>La oferta es válida para apuestas simples, múltiples, de sistema y de creación de apuestas realizadas en el mercado 1X2 (ganador local o visitante) ÚNICAMENTE antes del inicio del partido y no durante el partido. La oferta no se aplica a las apuestas realizadas en la selección de empate en cada juego.</p><p>Su apuesta se paga en su totalidad si su equipo tiene dos goles de ventaja en cualquier momento del partido, independientemente del resultado final.</p><p>Esta oferta no se aplicará a las apuestas en las que se haya utilizado Cash Out. En múltiples, la concesión de la oferta para una/s determinada/s selección/es de la apuesta no se verá afectada retrospectivamente si el cliente cobra las apuestas de las selecciones restantes.</p><p>Todas las ganancias se acreditarán lo antes posible una vez que el equipo esté dos goles por delante. Esta oferta no se aplicará cuando una apuesta se haya cobrado por completo. Cuando una apuesta se haya cobrado parcialmente y su equipo tenga dos goles de ventaja, la apuesta se liquidará según la apuesta activa restante.</p><p>Si su apuesta se paga anticipadamente de acuerdo con esta oferta, no se volverá a pagar si su selección gana el partido.</p><p><i><strong>Béisbol Pago Anticipado </strong></i></p><p>Con la oferta Baseball de Pago Anticipado, puedes apostar antes del inicio del partido en el mercado Ganador (ganador local o visitante) y si tu equipo se adelanta 5 runs en cualquier momento del partido, ganas automáticamente ¡sin tener que esperar a que termine el partido!</p><p>La oferta es válida para apuestas simples, múltiples, de sistema y de Crear Apuesta realizadas en el mercado Ganador (Ganador local o visitante) ÚNICAMENTE antes del comienzo del partido y no durante el partido. </p><p>Su apuesta se paga en su totalidad si su equipo tiene cinco runs en cualquier momento del partido, independientemente del resultado final.</p><p>Esta oferta no se aplicará a las apuestas en las que se haya utilizado Cash Out. En múltiples, la concesión de la oferta para una/s determinada/s selección/es de la apuesta no se verá afectada retrospectivamente si el cliente cobra las apuestas de las selecciones restantes.</p><p>Todas las ganancias se acreditarán lo antes posible una vez que el equipo esté dos goles por delante. Esta oferta no se aplicará cuando una apuesta se haya cobrado por completo. Cuando una apuesta se haya cobrado parcialmente y su equipo tenga dos goles de ventaja, la apuesta se liquidará según la apuesta activa restante.</p><p>Si su apuesta se paga anticipadamente de acuerdo con esta oferta, no se volverá a pagar si su selección gana el partido.</p><p>La oferta no es válida para las Pitcher Lines relevantes (Money Line PL).</p><p><i><strong>0% MARGEN EN FÚTBOL 1X2</strong></i></p><p>Esta función le brinda la oportunidad de realizar una apuesta en el mercado 1X2 con un margen del 0 % (esto significa que el operador recibe una comisión del 0 %, lo que hace que las cuotas ofrecidas sean lo más competitivas posible).</p><p>La función de margen del 0 % es válida para apuestas simples, múltiples y de sistema realizadas en el mercado 1X2 con la indicación del 0 %, ÚNICAMENTE antes del comienzo del partido y no durante el partido.</p><p>El margen del 0 % es una oferta independiente, por lo que no interfiere con ninguna otra oferta (bonos, bonos acumulados, oferta de pago anticipado, etc.)</p>",
                            "show": false
                        }
                    ],
                    "show": true
                },
                {
                    "order": "condiciones-generales-apuestas-en-vivo",
                    "title": "10. APUESTAS EN VIVO (Live – En vivo Durante el evento) condiciones generales",
                    "parent": [
                        {
                            "order": "",
                            "title": "10.1 Disponibilidad.",
                            "content": "<p>Los eventos se ofrecen a discreción nuestra, No garantizamos tener disponible todos los tipos de apuestas a lo largo del evento, esta van cambiando a consideración de la plataforma. Se ofrecen ligas seleccionadas y deportes tales como: Futbol, Tenis, Rugby, Dardos, Baloncesto, Hockey en hielo, Balonmano, Voleibol, Cricket etc. Todas las Apuestas en Vivo deberán ser hechas exclusivamente en línea. Los eventos en Vivo son ofrecidos en deportes y ligas seleccionadas y tenga en cuenta que el nombre de los mismos también puede presentar cambios.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.2 Errores en lineas.",
                            "content": "<p>En la eventualidad de que un error obvio haya sido identificado, todas las apuestas con ese error serán canceladas. En la eventualidad de que el formato de un encuentro difiera de nuestra información desplegada, nos reservamos el derecho de anular cualquier apuesta.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.3 Transmision.",
                            "content": "<p>Senor Usuario Por favor tenga en cuenta que las transmisiones descritas como “en vivo” pueden presentar un retraso en la transmisión satelital, por lo tanto El grado de retraso puede variar entre clientes dependiendo del sistema a través del cual están recibiendo la información, por lo tanto se le recomienda a los usuarios contar con una buena conexión a internet para que sea mucho más efectivo el uso y aprovechamiento de la plataforma.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.4 Formato cuotas.",
                            "content": "<p>En base a que somos una Empresa internacional, con presencia en diferentes países, queremos brindarle a todos nuestros usuarios la posibilidad de cambiar el formato de cuotas para poder realizar las apuestas, el usuario puede seleccionar su formato preferido en el menú desplegable situado en parte superior derecha, todas las cuotas aparecerán automáticamente en el formato seleccionado, como se ve a continuación:<br>Sin tener en cuenta el tipo de formato que selecciones las ganancias potenciales serán las mismas; esta opción le permite al usuario visualizar las ganancias en diferentes formatos para mayor entendimiento.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.5 Fluctuacion de cuotas",
                            "content": "<p>Todas las cuotas están sujetas a fluctuaciones, a menos que se especifique de otra forma, todas las cuotas están basadas en el desenvolvimiento real del evento Durante el ‘tiempo reglamentario’ (los términos ‘tiempo regular, ‘tiempo completo’, ‘90 minutos de juego’ “tiempo reglamentario y ‘tiempo normal’) son todos utilizados para denotar un período de tiempo que incluye su tiempo de reposición pero no el tiempo extra, tandas de penales, etc.). Estos cambios o fluctuación de cuotas se podrán evidenciar cuando el recuadro este totalmente en blanco.<br>En la esquina superior del rectángulo del mercado de apuestas, el color rojo me indica que mi cuota disminuyo y el color verde que mi cuota aumento, este cambio se hace en cuestión de segundos, por lo tanto al “aceptar cambio de cuotas” el usuario está siendo consiente que el premio que puede obtener por dicho evento puede variar hasta así el sistema le<br>haya permitido confirmar la apuesta.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.6 Opcion 'aceptar automaticamente cualquier cambio de cuota'",
                            "content": "<p>Dependiendo del deporte, las cuotas pueden cambiar drásticamente de un momento a otro. Si la opción de 'Aceptar cualquier cambio de cuota' se Activa durante la confirmación. Las apuestas serán aceptadas al precio de las cuotas del mercado actual sin ninguna alerta. Tenga en cuenta que para confirmar su apuesta en algunos evento es como requisito aceptar el cambio de cuotas por lo tanto Los jugadores son responsables de activar o desactivar esta opción a su discreción</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.7 Proceso Aprobacion de Apuestas.",
                            "content": "<p>Senor usuario es de vital importancia el conocimiento del proceso en el que incurre una apuesta para ser aprobada. Este proceso puede tardar hasta tres minutos más posibles retrasos en la transmisión como se explica en el numeral 8.3. En el proceso de aprobación se realiza una evaluación y control de la apuesta que está ingresando el usuario, en caso tal de que la apuesta no sea aprobada por el sistema esta será rechazada y la suma del valor apostado será reembolsado en el saldo disponible para jugar.UNA APUESTA NO SERA CONSIDERADA COMO VALIDA HASTA QUE SE MUESTRE EL EN HISTORIAL DEL CONSUMIDOR, EN CASO DE INCERTIDUMBRE SOBRE LA VALIDEZ DE UNA APUESTA, SE SOLICITA AL CLIENTE QUE COMPRUEBE LAS APUESTAS ABIERTAS (PENDIENTES) O PONGASE EN CONTACTO CON NUESTRO SERVICIO DE ATENCION AL CLIENTE (CHATONLINE).<br>IMPORTANTE: SENOR USUARIO TENGA EN CUENTA, SI LA PLATAFORMA LLEGA A DETECTAR ALGUNA ANOMALIA O ALGUNA SITUACION DE RIESGO, NOS RESERVAMOS EL DERECHO DE LA ELIMINACION O CANCELACION DE LAS APUESTAS.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.8 Determinacion",
                            "content": "<p>La valoración o determinación de las apuestas se realiza tan pronto como el resultado de una línea ofrecida se conozca, nuestro sistema necesita obtener el resultado oficial para poder valorar las apuestas pendientes; este proceso puede demorar varios minutos. Si el resultado de una línea ofrecida no puede ser verificado oficialmente, nos reservamos el derecho de retrasar la valoración hasta que se obtenga confirmación oficial. Para efectos de apuestas donde el resultado final se pueda dar durante el evento, el usuario podrá ingresar a la opción historial y mirar cual es el estado actual de su juego. En la eventualidad de una valoración incorrecta de alguna línea ofrecida, nos reservamos el derecho de corregirla en cualquier momento. Importante tener en cuenta: la Plataforma puede demorarse hasta 24 horas para hacer la respectiva valoración.Las transmisiones en vivo de la plataforma solo son de carácter informativo, estas no son responsables de los resultados oficiales del evento.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.9 Acceso opcion “Historial”",
                            "content": "<p>Cabe aclarar que la consulta de tickets de las apuestas normales que se realizan antes de iniciado el evento no se reflejan de la misma manera para las apuestas en vivo, por lo tanto senor usuario lo invitamos a que verifique sus eventos seleccionados desde el Historial, este lo podrá encontrar en la parte superior de la plataforma de apuestas en vivo o en Virtual.<br>Es en esta opción donde el usuario podrá encontrar una maravillosa herramienta para verificar el estado de sus apuestas en vivo, el usuario puede filtrarlas por fechas y podrá visualizar todo lo relacionado a las jugadas con sus respectivas ganancias potenciales y ganancias netas. Para obtener más información sobre una apuesta específica, tan solo deberá desplazar el puntero del ratón sobre la apuesta respectiva.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.10 Bloqueo o suspension de Mercados de apuestas",
                            "content": "<p>El usuario no podrá realizar una apuesta siempre que ocurra algo importante como un gol, una expulsión etc., esta acción ocurre puesto que la plataforma como reacción bloquea las opciones de apuesta con el objetivo de actualizar de nuevo las cuotas</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.11 Eventos “No accion”",
                            "content": "<p>Eventos que sean suspendidos, serán consideradas como “no acción” y las apuestas realizadas previamente a la suspensión quedan a evaluación de la plataforma. Para más información los invitamos a referirse a nuestras *Reglas generales para conocer cómo se valora una apuesta en este caso en particular.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.12 Eventos Aplazados",
                            "content": "<p>Encuentro programados que por condiciones ajenas a la plataforma son reprogramados con el fin de jugarse en otra fecha. Ejemplo se aplaza un encuentro por condiciones meteorológicas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "10.13 Tipos de apuestas JUEGO EN VIVO",
                            "content": "<p>Simples: La apuesta simple es el tipo de apuesta más sencilla, el usuario debe seleccionar un pronóstico por el que desee apostar, A continuación introducir el valor que desea jugar y por ultimo confirmar su apuesta, si acierta el resultado ganará la apuesta.<br><br>Combinadas: Una apuesta combinada consiste en agrupar una serie de eventos los cuales formarán una única apuesta. Es decir, que si por ejemplo se apuesta a hacer una combinada con 4 eventos deportivos, se está apostando sobre los 4 eventos simultáneamente como si fuesen un único evento y por los tanto depende del acierto de todos para ganar. La cantidad apostada será indivisible entre los eventos (Opción de hacer un Parlay hasta de 14 eventos).<br><br>Sistema: Es un tipo de apuesta combinada mucho más dinámica, aquí ya no existe la uniformidad de la apuesta combinada, ni la dependencia de acertar todos los eventos para ganar, cada evento escogido de un “sistema” tiene su propia apuesta, esto quiere decir que si se escogen 4 eventos estos tendrán una validez individual, es decir en vez de pagarse por una puesta como en la combinada se paga como si fueran 4 apuestas, como si se apostara por 4 eventos tipo apuestas.<br>IMPORTANTE: A diferencia del Parlay normal donde todas las líneas seleccionadas por el usuario debían ser acertadas para dar lugar a una apuesta ganadora, en la modalidad de Parlay combinado el usuario no necesita acertar en todas las líneas. Su ganancia será proporcional a las líneas ganadoras.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "apuestas-virtuales",
                    "title": "11. Apuestas virtuales.",
                    "parent": [
                        {
                            "order": "",
                            "title": "11.1 Apuestas virtuales.",
                            "content": "<p>Una nueva tendencia que coge fuerza en el sector del juego online! En esta modalidad ofrecemos encuentros deportivos simulados virtualmente. Lo primero que debes hacer en ingresar a nuestra plataforma y seleccionar la pestana de “Virtuales” y una vez allí se desplegarán una serie de competiciones a escoger.<br>En esta sección de apuestas deportivas, tenemos seis disciplinas en las que puedes jugar: Fútbol, Carrera de caballos, Carrera de perros, Baloncesto y Tenis con diferentes mercados que hacen aún más interesante y entretenido el juego.<br>Carrera de Caballos – Carrera de Perros. Apuestas directas:<br><br>Ganador: Si se apuesta a “Ganador”, se apuesta sobre al ganador que deberá llegar primero en la carrera y se ganará en caso de que el caballo elegido sea el vencedor.<br>Apuestas combinadas:<br><br>Exacta: Realizar una apuesta exacta implica que se apueste por el primer y segundo puesto en una sola carrera y estos deberán cruzar la meta en el orden exacto elegido.<br><br>Trifecta: En una apuesta Trifecta se apuesta por el primer, segundo, tercer puesto en una carrera y estos deberán quedar en el orden exacto en que se haya apostado.</p><p><strong>Jackpot</strong></p><p>El Jackpot es un acumulado referido de las apuestas, este acumulado tiene un proceso de crecimiento mediante el cual este va aumentando según la cantidad apostada al juego o proveedor que este ofreciendo este acumulado.</p><p>El Jackpot es un premio el cual es otorgado a un cliente de manera aleatoria, es decir es un sorteo el cual se realiza entre los clientes que estén usando el producto donde el jackpot este disponible. Al momento de definirse las jugadas en el producto el sistema arrojara un mensaje informando la jugada ganadora de dicho acumulado y su valor</p><p>El acumulado del jackpot será cargado al saldo premios del cliente al momento de realizarse dicho sorteo, este proceso es realizado por el sistema automáticamente.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "preguntas-frecuentes-juego-en-vivo",
                    "title": "12. Preguntas frecuentes juego en vivo.",
                    "parent": [
                        {
                            "order": "",
                            "title": "12.1 ¿Como funcionan las apuestas en juego en vivo?",
                            "content": "<p>Si usted selecciona la opción apuesta juego en vivo se abrirá la plataforma que le permitirá realizar dicha acción, En el lado Izquierdo encontrará una visita detallada de todos los demás eventos que se están ofreciendo en ese momento<br>En el centro aparecerán los pronósticos y las opciones disponibles para el evento seleccionado, haga clic sobre una opción de apuesta de su elección para que este se agregue a su parrilla de apuestas, esta parrilla de apuestas la podrá visualizar en la parte derecha de la página, a continuación introduzca el<br>monto o valor que desee apostar y luego proceda a confirmar su apuesta con o sin “aceptar cambio de cuotas”.<br>A continuación, sus pronósticos serán verificados. Si su apuesta es aceptada, el usuario recibirá una notificación de la confirmación de su apuesta, una vez esta haya sido realizada con éxitos y el evento haya sido finalizado podrá verificar en la opción historial toda la información referente a esta apuesta.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.2 ¿Porque cambian constantemente las cuotas?",
                            "content": "<p>Las apuestas en vivo se ofrecen simultáneamente a un evento, por ellos las cuotas son modificadas continuamente en función del desarrollo real del juego.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.3 ¿Como elimino de la parrilla de apuestas los pronosticos seleccionados para evitar generar un doble apuesta?",
                            "content": "<p>Las apuestas en vivo se ofrecen simultáneamente a un evento, por ellos las cuotas son modificadas continuamente en función del desarrollo real del juego.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.4 ¿Cuanto es el valor minimo para realizar una apuesta?",
                            "content": "<p>El valor mínimo para realizar una apuesta esta determinada por el tipo de moneda que se use equivalente a USD1.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.5 ¿Cuanto es mi ganancia Maxima por apuesta y por depositar?",
                            "content": "<p>Nos reservamos el derecho de asignar topes máximos de premiación y de apuestas diarias para cada tipo de apuesta y usuario.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.6 ¿Por que si gano mi apuesta no conseguia las ganancias?",
                            "content": "<p>Senor usuario(a) si su apuesta resulto ganadora, pero aún no se ve reflejada en su historial, recuerde que debe esperar como mínimo 24 horas para que el resultado se vea reflejado en su apuesta, de lo contrario lo invitamos a comunicarse con nuestro chatonline</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.7 ¿Donde puedo ver mis apuestas?",
                            "content": "<p>Una vez que se hizo una apuesta, los detalles de la misma aparecerán en el lado derecho de la página parte superior, A continuación ingresar al historial y filtrar la fecha deseada. Para obtener información detallada, situarse en la apuesta con el cursos del mouse y darle clic. Este automáticamente desplegara toda la información.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.8 ¿Para hacer una apuesta que tengo que pagar?",
                            "content": "<p>Para que un usuario online pueda hacer uso de la plataforma debe tener saldo disponible en su cuenta. Si el saldo de la cuenta es cero, puede realizar una recarga en todos nuestros puntos autorizados. El valor recargado aparecerá automáticamente en la cuenta recargada. Para obtener más información acerca de nuestros puntos de venta autorizados, lo invitamos a que se comunique con nuestro chatonline, nuestros asesores estarán dispuestos a brindarle toda la información necesaria.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.9 ¿Hasta que minuto el sistema me permite realizar apuestas?",
                            "content": "<p>El sistema lo permitirá dependiendo de las condiciones y apuestas al encuentro.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.10 ¿En un evento aplazado que sucede con mi apuesta?",
                            "content": "<p>En nuestros términos y condiciones encontrara reglas específicas para este tipo de situaciones, lo invitamos a echarle un vistazo al numeral eventos denominado como “no acción”.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.11 ¿Cuanto tardan las apuestas en determinarse en juego en vivo?",
                            "content": "<p>Intentamos determinar las apuestas lo antes posible. En el caso de algunos eventos, necesitamos la confirmación oficial antes de poder determinar las apuestas y por ello es posible que se produzcan pequenos retrasos. Nuestra intención es determinar las apuestas en el plazo de una hora tras el final del evento y, en el caso de las apuestas en directo, hacerlo durante el evento cuando los resultados estén disponibles o con un máximo de 24 horas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "12.12 ¿Como Funciona el Handycap asiatico?",
                            "content": "<p>Todas las apuestas de 'Hándicap asiático' se determinan de una forma muy parecida a las apuestas con hándicap normal. La diferencia es que las apuestas se devuelven si el resultado del evento es un empate después de aplicar el 'Hándicap asiático'.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "casino-vivo",
                    "title": "13. Casino y Casino en vivo",
                    "parent": [
                        {
                            "order": "",
                            "title": "13. Casino y Casino en vivo",
                            "content": "<p>La plataforma de doradobet.com ofrece una modalidad de casino en el cual el usuario podrá interactuar y experimentar un ambiente de casino de forma cómoda y segura desde su hogar, en esta modalidad se cuentan con apuestas a ruletas, maquinas traga monedas, blackjack, baccarat, etc…</p><p> </p><p><strong>Generalidades de juego.</strong></p><p>La casa de apuestas solo realizara devoluciones de dinero por errores de sistema los cuales serán corroborados con el proveedor de casino. Dado que el funcionamiento de esta opción es igual a un casino real donde no hay devolución de dinero por cuestiones de error humano por parte del cliente.</p><p>El usuario no podrá imputar responsabilidad a la casa de apuestas en caso de fallos con el internet, velocidad del equipo, fallos de recepción de la transmisión del juego, dado que la efectividad de la conexión de video de los juegos de casino en vivo y casino slot dependerán de la velocidad y estabilidad de la conexión.</p><p>Cualquier apuesta realizada por el usuario será determinada en pocos minutos dado que los juegos de casino no tienen una durabilidad de más de 5 minutos por ronda.<br><br>No se aceptarán reclamos basados en hipótesis o cualquier tipo de percepción personal donde denote perdidas injustificadas, dado a que el sistema define las jugadas según el resultado de los símbolos y comodines en los rieles del juego.</p><p>En caso de que el usuario realice alguna apuesta al casino y pierda la senal de la transmisión del juego la apuesta se mantendrá y se determinara según el resultado.</p><p>La casa de apuestas no aceptara reclamaciones por resultados de juego dado que estos son registrados uno a uno por la casa de apuestas.</p><p>No se aceptarán reclamaciones pasados 30 días luego del juego del casino dado que las apuestas de casino al funcionar de forma inmediato requieren atención en el momento.</p><p>En caso de recibir algún caso de inconvenientes con el casino la casa de apuestas se reserva el derecho de tardar hasta 7 días hábiles en dar una respuesta concreta. (sin tomar en cuenta fines de semana).</p><p>El usuario no podrá solicitar la anulación o devolución de ninguna apuesta por ningún motivo relacionado a error humano propio del cliente, incluyendo fallos en el monto apostado o en la selección de la apuesta realizada.</p><p>El usuario al estar registrado o al usar este servicio de apuestas acepta estos términos y condiciones sin objeción, aceptando además cualquier variación o modificación futura.</p><p>La casa de apuestas suministrara un registro de las apuestas a casino el cual el cliente puede consultar a través de reporte de casino y también ingresando a cada juego correspondiente.</p><p>La casa de apuestas solo tendrá responsabilidad sobre los fallos internos de sistema donde se presente retraso de las transacciones, pagos pendientes, o devoluciones pendientes.</p><p>El usuario debe tener en cuenta que los problemas en casino pueden ser ocasionados, por: el navegador utilizado, cookies y cache en exceso, fallos del sistema interno del computador, flash player desactualizado y la ubicación por vpn.</p><p>No se harán devoluciones de saldo por ninguna transacción de propina brindada durante un juego de casino en vivo.</p><p>La casa de apuestas ofrecerá diferentes salas o casinos en vivo en la plataforma los cuales funcionaran bajo las reglas internas del casino transmitido.</p><p>Para la determinación de jugadas se llevará a cabo un registro electrónico del menú de juego, representando los componentes del juego de casino y el resultado tanto para el dealer como para el juego.</p><p>En caso de detectarse algún error en sistema la casa de apuestas anulara la apuesta o apuestas relacionadas con el mismo. Para estos casos de error solamente se procederá con la anulación y devolución del valor apostado sin tomar en cuenta ningún tipo de posible premio.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "13.1 Ruleta",
                            "content": "<p><strong>Ruleta</strong></p><p>Es un juego en el cual el ideal es adivinar el número y el color en el que la bola caerá al girar la ruleta.</p><p>Las mesas, tapetes y platos usados para ejecutar este juego se caracterizan por ser una obra de la matemática, e influida enormemente por la estadística.</p><p>Excluyendo a algunas variaciones de este juego de azar, la mayoría de las reglas de ruleta se rigen por los siguientes parámetros:</p><p>Los colores rojo y negro están siempre permutados.</p><p>En las casillas negras solo hay números donde la suma de sus dígitos es par, con excepción del 10. Así, por ejemplo, 26 (2 + 6 = 8), ó 15 (1 + 5 = 6).</p><p>Al frente de cada número mayor o igual a 18 hay un número menor a 18. Esto también se cumple si se observa desde el otro punto de vista.</p><p>Los números pares e impares están distribuidos de forma regular y alternados.</p><p><strong>Variaciones de la ruleta</strong></p><p>El juego de la ruleta posee distintas variaciones propias por país, en el casino de doradobet.com podrás encontrarlas todas debemos tomar en cuenta que cada variación de juego posee sus propias reglas de ruleta, y es necesario conocer estos tipos para tener una mejor visión de las mencionadas reglas. Las ruletas más comunes, junto a sus reglas más destacables, son:</p><p><strong>Ruleta americana:</strong> la cual posee como regla principal la existencia de dos casillas de beneficio para la casa: el “0” y el “00”.</p><p><strong>Ruleta europea:</strong> que al mismo tiempo se subdividen en:</p><p><strong>Ruleta inglesa:</strong> con una sola casilla de “0” y la particularidad de poseer una “prisión”, que es una condición a la que pasa el dinero cuando en una apuesta de 1 a 1 la bola cae en la casilla del “0”. Cada vez que el jugador cae en el “0”, el monto de la prisión es dividido a la mitad.</p><p><strong>Ruleta royal (ruleta progresiva o de jackpot):</strong> cuando la bola cae en la casilla “0”, la apuesta es perdida de forma automática e incrementa el valor del jackpot total, al mismo tiempo que aumenta la cantidad mínima fija de entrada para la mesa. El jackpot es otorgado al jugador que caiga 5 veces consecutivas en el mismo número.</p><p><strong>Ruleta francesa:</strong> es otro tipo de ruleta europea, pero más popular que la royal y la inglesa. Cuenta con una sola casilla de “0” y, al igual que la inglesa, cuenta con la singularidad de la “prisión”, aunque ligeramente diferente. El dinero se conduce a esta “prisión” cuando la bola cae en la casilla “0”, poniendo al apostador en la encrucijada de entregarle el 50 % de la apuesta al casino y obtener el otro 50 % de vuelta, o de mantener este dinero en la prisión. Si la elección es la de mantener el dinero encarcelado, y en la siguiente apuesta el jugador acierta en su apuesta, recibe el monto del premio, más el monto encerrado dentro de la “prisión”. En caso de que la apuesta no sea exitosa, la casa se queda con el dinero de la “prisión”, y por supuesto, con el dinero apostado.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "13.2 Blackjack",
                            "content": "<p><strong>Blackjack</strong></p><p>Las reglas de blackjack dictan que se debe jugar con una o más barajas inglesas de 52 cartas, sin incluir a los comodines. El objetivo del blackjack es sumar un monto entre tus cartas lo más próximo a 21, sin pasarse de esta cifra, por supuesto. Es una competencia que solo se desarrolla entre el jugador y el crupier, intentando conseguir una mejor suma de cartas que este último.</p><p>Las reglas de blackjack establecen que al crupier lo rigen una serie de pautas fijas que le impiden tomar algunas acciones a su merced con respecto al desarrollo del juego.</p><p><i>Por ejemplo, el crupier está forzado a pedir una carta siempre que su puntuación sume 16 puntos o menos, así como también se ve en la obligación de plantarse si suma un monto de 17 o más.</i></p><p>Las reglas de blackjack son muy claras en las cifras que aporta cada carta a la suma total: las cartas numéricas mantienen su valor intrínseco, es decir, que, por ejemplo, una carta con un 7 vale 7 puntos. Las figuras suman 10, y el as vale 11 ó 1, dictamen que queda a juicio del jugador. En el caso de los crupieres, los ases valen 11 puntos, siempre y cuando la suma total no pase de 21. En caso de que si, los ases valen 1 punto.</p><p> la mejor jugada posible es conseguir 21 con solo dos cartas, es decir, con un as más una carta de valor 10. Esta jugada es conocida en las reglas del blackjack como “blackjack” o 21 natural. Este tipo de mano especial tiene ventaja sobre un 21 conseguido de forma habitual, con más de dos cartas.</p><p><strong>Variaciones del blackjack</strong></p><p>Según el casino, este juego puede presentar ligeras variaciones, lo que conlleva a diferentes reglas de blackjack. Principalmente se distinguen dos versiones: el blackjack americano y el blackjack europeo.</p><p><strong>Reglas de blackjack americano</strong>: en esta variación, el crupier, tras poner su primera carta a la vista de todos los jugadores, sacará una segunda carta que estará cubierta, pero si se da el caso de que con la carta visible haya posibilidad de obtener un blackjack natural, este comprobará la segunda carta antes de continuar, para observar si tiene blackjack. En el caso de tenerlo, lo comunicará de forma inmediata, finalizando así la mano.</p><p><strong>Reglas de blackjack europeo:</strong> en esta variante alterna, la segunda carta del crupier no se muestra hasta que todos los jugadores hayan jugado su mano, sacando su segunda carta del final. En esta modalidad cabe la posibilidad de que tras aumentar nuestra apuesta, el crupier consiga un blackjack. Por las reglas de blackjack que tiene cada modalidad, para el jugador resulta claramente más ventajoso jugar en la forma americana por sobre la europea.</p><p>En las reglas de blackjack también está definida una serie de terminología que le agrega más profesionalismo y personalidad al juego, y además evita posibles malentendidos al ordenar y ejecutar apuestas. Este vocabulario es delimitado de la siguiente manera:</p><p><strong>Doblar:</strong> consiste en hacer una apuesta adicional a la primera, mediante el servicio por parte del crupier de una nueva carta sobre las dos iniciales.</p><p><strong>Separar:</strong> es posible cuando las dos primeras cartas tienen el mismo valor numérico, dando la posibilidad de poner una apuesta adicional en cada una de ellas. Encima de cada una de estas cartas separadas se coloca una más, creando con cada par una jugada independiente. Si la segunda carta servida es igual que la primera, se puede volver a separar en otra jugada, y así consecutivamente.</p><p><strong>Seguro:</strong> jugada que consiste en apostar que el crupier obtendrá un blackjack cuando la primera carta que este sacó fue un as. Si efectivamente el crupier alcanza el blackjack, este debe pagar al jugador la cantidad del seguro multiplicada por dos.</p><p><strong>Rendición:</strong> si el jugador repara que sus dos primeras cartas no serán capaces de ganarle al crupier y a la casa, es posible que se retire de la jugada. Pero no se hará reembolso del valor apostado.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "13.3 Baccarat",
                            "content": "<p><strong>Baccarat</strong></p><p>Este juego suele disputarse entre el jugador contra la banca, aunque puede haber más jugadores en una mesa apostando. Su mecánica es semejante a la de otro popular juego de cartas para casinos; el blackjack.</p><p>Según las reglas de baccarat, en este juego de casino se deben manejar de tres a seis barajas de 52 cartas, mezcladas en conjunto y distribuidas a partir de un “sabot”, “shoe” o zapato, nombre al que se le da en inglés a una caja disenada para guardar y asignar varios mazos de naipes, y que facilita la toma de ellos de uno en uno. Las cartas se diferencian en figuras y palos, con numeraciones que van desde el 0 al 10. La finalidad del juego es que el apostador sume con sus cartas un valor lo más cercano posible al 9, o directamente esa cifra, y que en caso de que no sea exactamente 9, sea mayor que el que tenga la banca.</p><p><strong>Generalidades de juego del baccarat</strong></p><p>En este la casa de apuestas representa al banco. En esta variación se puede apostar en cualquiera de las dos manos iniciales. La primera mano es denominada “la mano del banco”, mientras que la otra es llamada “la mano del jugador”. Se distribuyen dos cartas al jugador, y dos para el banco.</p><p>El crupier de la casa de apuestas desliza una carta y la coloca boca arriba en el área del tapete de apuestas del jugador. La siguiente carta, la primera carta de la mano del banco, se coloca en el área respectiva para posicionar sus naipes. La casa reparte otra carta al jugador, y una segunda carta al banco. En síntesis, la primera ronda consiste en dos cartas para el jugador y dos para el banco. Posteriormente, las reglas de baccarat dictan que se deben anunciar el total de puntos para ambos conjuntos de cartas.</p><p>Lo más habitual, y que por lo tanto está contemplado en las reglas de baccarat, es que el jugador deba determinar si recibe una tercera carta o no, dependiendo de los puntos que haya acumulado hasta el momento. El apostador debe tomar la decisión en primer lugar, antes que la casa, porque está estipulado en las reglas de baccarat. Si el jugador posee una cifra de 6 ó 7, o cualquier otro total entre 0 y 5, está obligado a recibir otra carta, a menos que el banco tenga la favorable cifra de 8 ó 9, en cuyo caso el mismo gana la partida sin la necesidad de recurrir a más cartas.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "13.4 Poker",
                            "content": "<p><strong>Poker</strong></p><p>El póquer (o póker) es un juego de apuestas, en el que los jugadores, con todas o parte de sus cartas ocultas, hacen apuestas sobre una puja inicial, recayendo la suma total de las apuestas en el jugador o jugadores con la mejor combinación de cartas.</p><p>A continuación veremos las distintas manos en el póker.</p><p><strong>Clasificación de las manos:</strong></p><p><strong>Escalera real o flor imperial:</strong> cinco cartas seguidas del mismo palo del 10 al as.</p><p><strong>Escalera de color:</strong> cinco cartas consecutivas del mismo palo.</p><p><strong>Póker:</strong> cuatro cartas iguales en su valor.</p><p><strong>Full: </strong>tres cartas iguales en su valor (tercia), más otras dos iguales en su valor (pareja).</p><p><strong>Color:</strong> cinco cartas del mismo color y palo, sin ser necesariamente consecutivas.</p><p><strong>Escalera: </strong>cinco cartas consecutivas sin importar el palo.</p><p><strong>Trio: </strong>tres cartas iguales de valor.</p><p><strong>Doble pareja: </strong>dos pares de cartas del mismo número (par y par).</p><p><strong>Pareja: </strong>dos cartas iguales de número (y tres diferentes).</p><p><strong>Carta alta: </strong>gana quien tiene la carta más alta de todas.</p><p><br><strong>Video poker</strong></p><p>Las reglas del casino de video poker son muy simples; sólo se basa en sacar una mano de póquer ganadora con sus cinco cartas que tienes la oportunidad de intercambiar una vez.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "13.5 Generalidades de las Tragamonedas",
                            "content": "<p><strong>Juegos slot – tragamonedas o tragaperras</strong></p><p>Las tragamonedas o tragaperras, tú eliges como lo quieres llamar a este juego de casino. Son uno de los juegos más simples de casino, ya que sólo se trata de encontrar un slot que simplemente te guste y empezar a jugar.</p><p>Hay una infinidad de tragamonedas diferentes para elegir al jugar en línea, pero las reglas básicas de casino son siempre las mismas: eliges la cantidad que deseas apostar, el número de líneas o combinaciones en las que deseas dividir tu apuesta y desencadenas las ruedas de las máquinas tragamonedas, después de lo cual sólo trata de que los símbolos en los carretes se detengan de manera que formen una combinación ganadora.</p><p>Miles de máquinas tragamonedas de juego cuentan con interesantes características especiales como wild symbols (comodines), características de los bonos, tiradas gratis y jackpots progresivos.</p><p>El jackpot en las tragamonedas es de forma aleatoria, por lo que cualquier jugador puede obtener dicho premio en cualquier momento mientras se encuentra jugando en el slot.</p><p>Los giros gratis podrán ser ganados en combinaciones especiales de comodines o si son otorgados por la casa de apuestas.</p><p>Cualquier reclamo sobre uso de giros gratis debe ser presentado al chat online.</p><p>Cada juego de tragamonedas tendrá su historial individual que el usuario podrá consultar en cualquier momento.</p><p>No se aceptan reclamaciones sobre giros gratis de torneos y promociones luego de 7 días de ocurrido la dificultad.</p><p>Cualquier cliente que reporte error en el uso de giros gratis en el cual no puedan redimirlos, pasaran por un proceso de revisión para determinar la veracidad del reporte.</p><p>Si se evidencian dificultades en los juegos en los cuales se asignan giros gratis, el área encargada se reserva el derecho de realizar el pago de estos giros en un juego diferente al inicial.</p><p>Los giros gratis tendrán una fecha de caducidad estipulada por la casa de apuestas.</p><p>No se aceptarán reclamos basados en hipótesis o cualquier tipo de percepción personal donde denote perdidas injustificadas, dado a que el sistema define las jugadas según el resultado de los símbolos y comodines en los rieles del juego.</p><p>Los juegos del casino slot estarán en constante actualización y cambio por lo que pueden sufrir bloqueos en cualquier momento.</p><p>La casa de apuestas ofrece una gran variedad de juegos de casino slot, los cuales son integraciones de sistema con diferentes proveedores, por lo cual nos reservamos el derecho de suspender el servicio de algún proveedor o juego sin previo aviso.</p><p> </p><p><strong>Giros gratis Mensajes de texto</strong></p><p>Los giros gratis de nuestro casino slot que sean otorgados por medio de mensaje de texto como \"regalo\" de parte de DoradoBet, que no correspondan al premio de alguna de nuestras promociones o torneos estipulados en la plataforma, tendrán un plazo de 24 horas para ser usados.</p><p>En caso de que el usuario necesite realizar algún tipo de reclamación referente al uso satisfactorio de los giros gratis, deberá comunicarse por medio del chat online en un plazo máximo de 24 horas después de recibido el mensaje.</p><p>La casa de apuestas no se hace responsable de reclamaciones que se realicen en un plazo superior al mencionado anteriormente. <br><br><strong>Minijuegos:</strong></p><p>Los minijuegos de casino ofrecidos en la sección de apuestas deportivas, funcionan bajo los términos y condiciones del casino online.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "lavado-activos",
                    "title": "14. Lavado de activos",
                    "parent": [
                        {
                            "order": "",
                            "title": "14.1 Control y prevencion de lavado de activos",
                            "content": "<p>El lavado de activos y financiación del terrorismo son delitos tipificados en la ley penal, dichos delitos constituyen uno de los problemas sociales y financieros que más afectan la economía y seguridad a nivel nacional y mundial. Por este motivo con el propósito de hacer presente a este flagelo doradobet.com se atiene a las disposiciones de cada país en que tenga actividad económica siguiendo las recomendaciones del GAFI.</p><p>Doradobet siendo consiente del alto riesgo de exposición de las actividades de juego de azar y juego novedoso, trata de prevenir y controlar este flagelo dentro de su actividad económica.</p><p>Cada uno de los asociados, empleados y directivos de doradobet.com actúan de forma ética y responsable sobre el tema implementando las medidas de seguridad necesarias para prevenir y controlar los movimientos riesgosos de dinero por medio de las siguientes acciones:</p><p>La casa de apuestas realizara un control y revisión de todos los movimientos de dinero en las cuentas de los usuarios que utilicen los servicios de doradobet.com</p><p>La casa de apuestas notificara de forma periódica a la entidad reguladora según la legislación o quien haga de sus veces los movimientos de los usuarios que tengan alto flujo de dinero en sus cuentas.</p><p>La casa de apuestas brindara toda la información necesaria y solicitada por las entidades reguladoras, penalistas y previsoras de estas flagelaciones según la legislación de cada país.</p><p>La casa de apuestas tendrá conocimiento de las diferentes entidades que regulen, verifiquen y prevengan este tipo de delitos.</p><p>A continuación, establecemos un glosario de las distintas siglas de las entidades tomadas en cuenta al momento de la prevención y control de este tema:</p><p><strong>Glosario:</strong></p><p><strong>GAFI:</strong> grupo de acción financiera internacional, es una organización que promueve las medidas y la regulación para combatir el lavado de activos y financiación del terrorismo.</p><p><strong>SARLAFT:</strong> sistema de administración de riesgo de la/ft, en donde el estado define políticas y establece directrices para la implementación de las etapas del sistema de administración de riesgos. Las entidades deben adoptarlo de acuerdo con su negocio y riesgos específicos. Consulte a su supervisor para determinar cuál sistema le aplica a su entidad.</p><p><strong>SIREL:</strong> sistemas de reporte en línea. Por este sistema las entidades deben reportar a la UIAF: reporte de operación sospechosa (ros), ausencia de ros y reportes (información) objetivos de acuerdo con la norma que aplique.</p><p><strong>UIAF:</strong> Unidad de información y analisis financiero. Es la entidad del estado encargada de centralizar, sistematizar y analizar datos relacionados con operaciones de lavado de activos, es decir, la unidad es un filtro de información que se apoya en tecnología para consolidar y agregar valor a los datos recolectados, esto le permite detectar operaciones que pueden estar relacionadas con el delito de lavado de activos.</p><p><strong>SPLAFT: </strong>La casa de apuestas busca garantizar la transparencia y seguridad de sus operaciones, la confianza del cliente, el cumplimiento de la ley aplicable a su giro negocio, normas internas y aquellas que regulan la Prevención de Lavado de Activos y del Financiamiento del Terrorismo, así como prevenir, controlar y reportar las situaciones o riesgos a los que la casa de apuestas podría estar expuesto en materia de Lavado de activos y Financiamiento del Terrorismo.</p><p>Motivo por el cual, la casa de apuestas solicitará a los usuario que, de manera adicional al documento de identificación, diligencie un Formulario SPLAFT, la cual deberá realizarse anualmente (Ano fiscal) una vez haya acumulado un valor total en premios de S/. 8,000.00, el cual es de obligatorio cumplimiento.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "disputas",
                    "title": "15. Resolución de Disputas",
                    "parent": [
                        {
                            "order": "",
                            "title": "15.1 Resolución de Disputas ",
                            "content": "<p>Si el Usuario desea presentar una queja, reclamo en referencia al servicio brindado por parte de www.Doradobet.com, el cliente deberá ponerse en contacto con el servicio de atención al cliente explicando detalladamente las razones de dicho requerimiento.</p><p>Cualquier petición, queja o reclamo que el Usuario Solicitante tenga sobre los Servicios deberá manifestarlo directamente al Usuario Prestador.</p><p>Doradobet, facilitará canales de atención a través de los cuales el cliente podrá transmitir aquellas peticiones, quejas o reclamos.</p><p>Doradobet pone a disposición el Chat online, correo electrónico, redes sociales como whatsapp, Facebook e Instagram. Además de canales de atención presencial como las agencias comerciales y las oficinas de Doradobet.</p><p>Según el tipo de requerimiento, el área de atención podrá remitir al cliente a comunicarse con un área en específico, con la finalidad de brindar cercanía y facilidad de respuesta para con el usuario.</p><p>En caso de presentarse reclamos, quejas, solicitudes o cualquier tipo de requerimiento relacionado a una organización económica tercerizada asociada a Doradobet.com, según el caso Doradobet.com se reserva el derecho de validar y delimitar su responsabilidad frente a dicho requerimiento y declinar dichas solicitudes en caso tal de que estas correspondan a una atención directa con la organización tercerizada. En estos casos nos reservamos el derecho transferir al usuario con la entidad encargada directamente.</p><p>En caso de cualquier situación de conflicto que exista en relación al saldo del cliente, movimientos de saldos, determinación de apuestas, promocionales, jugadas en el casino o cualquier tipo de información, o el buen manejo de su movimiento de saldo o situación entre el operador y el usuario , Doradobet.com se reserva el derecho de llegar a un acuerdo de retribución con el usuario de forma interna y a su discreción. Tomando en cuenta que esta medida solo podrá ser ofrecida por Doradobet como operador de juego y solo aplicará en casos específicos detallados en el manejo interno y a discreción de la empresa.</p><p>En caso de ocurrir algún tipo de comunicación errónea por parte del operador, este se reserva el derecho de corregir dicha comunicación enviando un mensaje de notificación a los usuarios relacionados con dicho incidente.</p><p>Doradobet.com se reserva el derecho de dar discreción a ciertos requerimientos teniendo en cuenta las medidas de privacidad y política de manejo de datos de los proveedores y demás asociados internos a la entidad.</p><p>No se aceptarán reclamos o quejas en caso de incurrir en dificultades que afecten el buen funcionamiento del sistema ocasionadas por fallas con la operatividad del dispositivo usado por el cliente.</p><p>La casa de juego no se hace responsable en caso de problemas o fallos en la conexión a internet del cliente la cual afecte el funcionamiento de la plataforma.</p><p>Una vez el usuario presente una solicitud, requerimiento o queja a la empresa esta será revisada por el equipo de servicio al cliente, donde se brindará una respuesta informativa en las primeras 24 horas hábiles y en caso de que el requerimiento esté relacionado con algún área diferida del servicio al cliente directo esta será escalada al área encargada dentro de la organización.</p><p>Las peticiones tendrán una respuesta inicial de 24 a 72 horas hábiles, este parámetro de tiempo comprende la respuesta inicial, para respuestas finales o solución a requerimientos los cuales conlleven un proceso de mayor amplitud el usuario será notificado sobre la prolongación y estado de su caso.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "datos",
                    "title": "16. Verificación de Documentos",
                    "parent": [
                        {
                            "order": "",
                            "title": "16.1 Política KYC",
                            "content": "<p>Ultima actualización: &lt;14/10/2021&gt;</p><p>Todos los usuarios registrados en Doradobet se les exigirá al momento de realizar cualquier retracción del saldo en la cuenta verificar su identidad, enviando la documentación necesaria a Doradobet.com</p><p>Para este proceso Doradobet.com pone a disposición en la plataforma de juego una sección en la cual el usuario podrá ingresar directamente a su cuenta y realiza el proceso, adjuntando toda la información requerida.</p><p>Durante este proceso el usuario deberá ingresar algunos datos personales básicos y adjuntar:</p><ol><li>Foto de DNI por ambas caras (Parte delantera y parte trasera)</li><li>Completar los datos de registro: Segundo nombre, segundo apellido, fecha de nacimiento, ciudad de residencia, dirección y provincia</li></ol><p>Los documentos suministrados por el usuario final, serán validados y verificados en contraste a bases de datos estatales los cuales sean de consulta pública con la finalidad de corroborar la identidad del cliente.</p><p>En caso de que el cliente presente algún tipo de dificultad de sistema al momento de hacer el proceso de validación de identidad Doradobet.com ofrecerá el servicio de verificación por medio del correo electrónico <a href=\"mailto:verificaciones@doradobet.com\">verificacioneslog@doradobet.com</a>.</p><p>Las verificaciones de cuenta realizadas por el cliente directamente desde su cuenta online serán procesadas de 24 a 48 horas hábiles luego de cargado el documento de identidad.</p><p>Las verificaciones de cuenta realizados a través del correo electrónico serán procesadas de 24 a 72 horas hábiles después de enviada la documentación requerida.</p><p>Cualquier persona la cual incurra en falsificación o suplantación de identidad será bloqueado e inhabilitado para realizar movimientos dentro de la organización, por el operador de juego, congelando las cuentas y vetando el ingreso del usuario a la plataforma.</p><p><strong>Manual para el “Proceso de KYC”</strong></p><ol><li>Prueba de documento de Identidad</li><li>Nombre completo del documento coincide con el nombre del usuario.</li><li>Número de Documento</li><li>País de residencia</li><li>Fecha de nacimiento</li><li>Existencia en bases de datos nacionales.</li></ol><p> </p><p><strong>Notas del “Proceso KYC”</strong></p><ul><li>Todo documento enviado por el usuario cuya información no coincida con los datos del propietario de la cuenta creada en Doradobet.com será rechazado y el cliente será notificado del motivo vía correo electrónico.</li></ul><p> </p><ul><li>Cuando el proceso de verificación no es exitoso, se debe documentar el motivo de este y luego se le comunica una explicación al usuario por medio de un correo electrónico.</li></ul><p> </p><ul><li>Cualquier cuenta de Doradobet.com en la cual se rechace el proceso de verificación por datos inconsistentes quedara restringida para realizar retiros de dinero, hasta que dicho proceso sea concretado exitosamente.</li></ul><p> </p><ul><li>Los datos proporcionados por el cliente al operador de juego con la finalidad de validar su identidad serán manejados bajo las leyes de protección de datos y de identidad establecidos por el gobierno.</li></ul><p> </p><ul><li>La información interna de la base de datos de clientes de Doradobet.com solo será compartida a otras entidades con autorización del cliente o bajo orden judicial.</li></ul><p> </p><ul><li>Para realizar cualquier tipo de movimiento de sustracción de saldo de la cuenta registrada con Doradobet.com es fundamental y necesario que realice el proceso de verificación de cuenta previamente.</li></ul><p> </p><ul><li>Todos los datos deben ser verídicos y actuales con la finalidad de cumplir con los estatutos de auditorías legales.</li></ul><p> </p><ul><li>No se aceptarán imágenes que superen los 120 KB de peso y solo se aceptarán formatos JPG y PNG.</li></ul><p> </p><ul><li>La aprobación de los datos enviados para validar la identidad del cliente será manejada a discreción de la empresa, con un equipo de trabajo especializado en esta función con la finalidad de mantener la seguridad de los datos del cliente y cumplir de forma eficaz este proceso.</li></ul><p> </p><ul><li>El proceso de verificación de documentos solo será realizado una vez por el cliente y esta información será almacenada en la base de datos de Doradobet.com</li></ul><p><strong>Otras medidas AML</strong></p><ul><li>Doradobet siendo consiente del alto riesgo de exposición de las actividades de juego de azar y juego novedoso, trata de prevenir y controlar este flagelo dentro de su actividad económica.</li></ul><p> </p><ul><li>La casa de apuestas realizara un control y revisión de todos los movimientos de dinero en las cuentas de los usuarios que utilicen los servicios de doradobet.com</li></ul><p> </p><ul><li>La casa de apuestas notificara de forma periódica a la entidad reguladora según la legislación o quien haga de sus veces los movimientos de los usuarios que tengan alto flujo de dinero en sus cuentas.</li></ul><p> </p><ul><li>La casa de apuestas tendrá conocimiento de las diferentes entidades que regulen, verifiquen y prevengan este tipo de delitos.</li></ul><p> </p><ul><li>La casa de apuestas brindara toda la información necesaria y solicitada por las entidades reguladoras, penalistas y previsoras de estas flagelaciones según la legislación de cada país.</li></ul>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "Dorado-club",
                    "title": "17. VEN  Y SE PARTE DE NUESTRO DORADO CLUB",
                    "parent": [
                        {
                            "order": "promociones-bonos",
                            "title": "17.1 Dorado Club",
                            "content": "<p>Los puntos son otorgados cuando realizan apuestas.</p><p>El total de puntos podrá visualizarlo en la opción <strong>servicios - consultas - mi lealtad</strong></p><p>No acumulan puntos las apuestas realizadas en juegos virtuales.</p><p>Los puntos se pueden canjear en la tienda de bonos Doradobet.</p><p>Los puntos caducan cada 90 días después de ser generados. Es decir, si acumulaste 10 puntos el 1 de enero, estos puntos estarán vigentes en tu cuenta para ser canjeados hasta el 30 de abril.</p><p>La cantidad de puntos determinan el tipo de premio al que puedes acceder.</p><p>Las apuestas realizadas con freebets y giros de casino no generan puntos y aplican los mismos términos y condiciones de los bonos para ser canjeables por dinero en efectivo.</p><p>Las jugadas y giros son reflejadas en Soles.</p><p>La participación de los usuarios en el Dorado Club se regirá por los términos y condiciones estipulados y es responsabilidad de cada uno, leerlas para que comprendan las normas y los beneficios del Programa</p><p>Los beneficios, regalos, ofertas, premios y promociones del Dorado Club están sujetos a disponibilidad y Doradobet puede cambiarlos en cualquier momento sin previo aviso.</p><p>Una vez que los beneficios se canjean y utilizan, no se permiten cambios ni reembolsos.</p><p>Doradobet puede modificar o terminar el Programa de Beneficios, total o parcialmente a su exclusivo criterio, los puntos que no fueron canjeados se perderán sin ninguna obligación ni responsabilidad, y no se otorgarán reclamos de canje después de la conclusión del Dorado Club.</p><p>Para el canje de beneficios en especie, el usuario debe proveer una dirección de destino y datos de contacto de la persona que reclamará el premio. Los costos de envío corren por cuenta de Doradobet.</p><p>Doradobet tendrá de 24 a 72 horas hábiles de lunes a viernes en las cuales hará el pago de los premios de canje online tal como FreeSpins y Freebets.</p><p>Los Freebet redimidos con puntos del Dorado Club tendrán como condicional general para ser utilizados, jugar el bono solo en pronósticos deportivos a cuotas de 2.0, aplicando a cualquier deporte u opción de juego.</p><p>Los Freespin serán cargados en un juego designado por Doradobet.com</p><p>Los Freebets podrán ser utilizados al momento de su compra.</p><p>Los Freespin tendrán una caducidad de 7 días calendario luego de ser otorgados por Doradobet.</p><p>Los usuarios serán notificados vía mensajería interna con los detalles de los premios de lealtad que sean Freespin.</p><p>Los premios de la tienda de Dorado Club solo podrán ser comprados o redimidos una vez por cliente.</p>",
                            "show": false
                        }
                    ],
                    "show": false
                },
                {
                    "order": "Licencia - Pagos",
                    "title": "18. Licencia de Curacao/ Agente de Pagos",
                    "parent": [
                        {
                            "order": "",
                            "title": "Agente de pagos",
                            "content": "<p>El sitio de Doradobet esta operado por VS Network Solutions N.V., empresa registrada el 20 de septiembre de 2021 bajo las leyes de Curacao, con el número de registro 158663 y domiciliada en Zuikertuintweg tower – curacao y bajo la licencia No 365/JAZ sub-licencia GLH-OCCHKTW0711042021 otorgada por el gobierno de curacao el 4 de noviembre de 2021.y con presencia en Chipre bajo un agente de Pagos registrado bajo el nombre VS Prosystem Limited, empresa registrada el 29 de noviembre de 2021 bajo las leyes de Chipre, con numero de registro 428414 y domiciliada en Avlonos 1 Maria house 1075 , Nicosia Cyprus</p>",
                            "show": false
                        }
                    ],
                    "show": true
                }
            ]
        }
    },
    "privacypolicy": {
        "pe": {
            "es": [
                {
                    "order": "politica-de-privacidad",
                    "title": "Política de Privacidad",
                    "parent": [
                        {
                            "order": "",
                            "title": "Política de Privacidad",
                            "content": "<p>Doradobet apunta a mantener su información personal protegida y segura. La privacidad de nuestros clientes es fundamental para nosotros.<br><br>Nosotros recolectamos y usamos su información personal para darte un servicio al cliente superior, para proveerte acceso consistente a nuestros juegos, para mantenerte informado de los últimos premios otorgados, anuncio de ganadores, jackpots, ofertas especiales, nuevos juegos y otra información que pensemos que querrás recibir. Su información personal también nos ayuda a incrementar la satisfacción de nuestros clientes y a crear nuevos juegos. El tipo de informacion que usted desee recibir de nosotros depende de usted.<br><br>Nosotros guradamos su información en una base de datos segura luego de su registro. Doradobet.com usa la tecnología de ¨Cookies¨ la cual nos permite reconocer su computadora en sus visitas siguientes. Esto también nos ayuda a organizar sus preferencias e intereses previos para brindarle una experiencia única en sus visitas posteriores. Usted puede cambiar los ajustes de los ¨Cookies¨ en su explorador en cualquier momento que lo desee. - Actualmente DoradoBet solo permite apuestas en los siguientes países: Perú, Nicaragua y Ecuador. De los países que no se encuentran en este listado no se aceptarán apuestas ni registros de usuarios.<br><br><br>-Toda persona registrada en las bases de datos de www.doradobet.com podrá en todo momento solicitar al operador la supresión de sus datos personales y/o revocar la autorización otorgada para el Tratamiento de los mismos mediante la presentación de una solicitud de revocatoria. La solicitud de supresión de la información y la revocatoria de la autorización no procederán cuando el jugador tenga un deber legal o contractual de permanecer en la base de datos y cuando existan apuestas abiertas o retiros pendientes por parte del jugador.<br><br>-el operador tendrá un plazo máximo de treinta (30) días calendario para retirar de sus bases de datos la información personal del jugador que así lo solicite a través del mecanismo dispuesto para tal fin en el canal interactivo.</p>",
                            "show": false
                        }
                    ],
                    "show": true
                }
            ]
        }
    },
    "responsiblegaming": {
        "pe": {
            "es": [
                {
                    "order": "juego-responsable",
                    "title": "Juego Responsable",
                    "parent": [
                        {
                            "order": "",
                            "title": "Juego Responsable",
                            "content": "<p>Ultima Actualización: &lt;14/10/2021&gt;</p><p>Por favor lea esta información atentamente para su propio beneficio.</p><p><strong>Interpretación</strong></p><p>Las palabras cuya letra inicial está en mayúscula tienen significados definidos en las siguientes condiciones</p><p>Las siguientes definiciones tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</p><p><strong>Definiciones</strong></p><p>Por el objeto de estos términos y condiciones.:</p><p>•Cuenta significa una única cuenta creada por usted para acceder a nuestros servicios o parte de nuestros servicios.</p><p>•Companía (refiriéndose cualquiera como “la companía”,” nosotros”,” nuestra” en este acuerdo)</p><p>•Servicio se refiere al Sitio web.</p><p>•Sitio web se refiere a Doradobet.com</p><p>•Usted significa el individuo que está accediendo o utilizando nuestros servicios, o la companía o cualquier otra entidad legal de parte del individuo que está accediendo o usando el servicio.</p><p> </p><p><strong>JUEGO RESPONSABLE Y AUTO EXCLUSION</strong></p><p>El propósito de la companía es asegurar entretenimiento de calidad, ofreciendo la oportunidad en una manera absolutamente segura y regulada, con diversión en un ambiente seguro.</p><p>Queremos que nuestros jugadores se diviertan en nuestro website por lo tanto nos urge que todos jueguen responsablemente. Nuestra política de prevención apunta a reducir los efectos negativos del mundo de las apuestas y promover a su vez un juego responsable.</p><p>Creemos que es nuestra responsabilidad asegurar que la experiencia de jugar con nosotros es emocionante y de disfrute, pero al mismo tiempo le recordamos a todos nuestros usuarios de los posibles efectos negativos tanto sociales como financieros que resultan si se adquiere la dependencia patológica a las apuestas.</p><p>Doradobet.com adhiere a los más altos estándares éticos.</p><p>El objetivo principal de Doradobet.com es ofrecer el servicio de entretenimiento por medio de juegos de azar y apuestas deportivas a los Jugadores, por esta razón toma todas las precauciones necesarias para asegurar que prevalezca este principio.</p><p>Por tanto, cada Jugador tiene a su disposición algunas opciones restrictivas gracias a las cuales él puede seleccionar límites en los montos depositables, apostables, etc. Los cuales podrá solicitar internamente a través de nuestros canales de atención.</p><p>Además, el equipo de www.doradobet.com controla escrupulosamente las cuentas de juego para excluir menores de edad y Jugadores con tendencia a la adicción del juego de azar.</p><p>El juego no debe perjudicar las relaciones con familia y amigos. El servicio ofrecido es para entretenimiento por medio de los juegos de azar, en caso de que no esté siendo consciente de que perjuicios ocasionados a terceros debe de evitar continuar jugando para evitar problemas interpersonales. Sugerimos a nuestros usuarios no solicitar dinero prestado para apostar, evitando endeudamientos y siendo organizados sobre sus finanzas invertidas dentro de este tipo de actividad.</p><p>Finalmente, el jugador debe mantener la responsabilidad que utilizar el dinero en este tipo de actividad está completamente destinado a la diversión y entretenimiento y no lo destinado a las compras cotidianas.</p><p><strong>Información y contacto</strong></p><p>Nuestro soporte le ayudara vía correo electrónico en cualquier momento sin ningún coste adicional:</p><p>•Correo: contacto@doradobet.com</p><p>Nuestro soporte no dará información sobre Usted sin su consentimiento a nadie.</p><p><strong>RECONOCER UNA ADICCION</strong></p><p>•Si durante el juego no te das cuenta al pasar el tiempo y del dinero gastado apostando.</p><p>•Si piensas frecuentemente en el juego y no eres capaz de concentrarte en otra cosa.</p><p>•Si estás enfrentando dificultades financieras.</p><p>•Si estás descuidando a tu familia, trabajo o escuela por el juego.</p><p>•Si estás pidiendo dinero prestado para apostar</p><p>•Si niegas o escondes que apuestas frecuentemente.</p><p>•Si peleas con tu familia y amigos por el juego.</p><p>•Si consideras al juego como una fuente de ingresos de dinero.</p><p>•Si has perdido interés en tus pasiones y amigos.</p><p>•Si cada vez juegas más dinero.</p><p>Consejos útiles para el juego responsable en Doradobet.com</p><p>Doradobet.com recomienda seguir los siguientes consejos antes de jugar para asegurar que el juego sea solo diversión para usted y que no represente ningún efecto negativo.</p><p>•El juego puede representar un momento agradable y emocionante, pero el Jugador debe ejercer el autocontrol para evitar la adicción.</p><p>•Para aprender las reglas de los juegos online, conocer los efectos de sonido y gráficos utilizados, te aconsejamos probar los juegos gratuitos disponibles en internet.</p><p>•Establezca un límite de depósito.</p><p>•Establezca un límite de tiempo.</p><p>•No trate de recuperar lo apostado.</p><p>•No juegue cuando estés cansado o bajo la influencia del alcohol.</p><p>Prohibición a menores</p><p>La ley prohíbe que menores de 18 anos (según aplique la jurisdicción correspondiente) abran una cuenta de juego y apuesten en www.doradobet.com. Si se encontrarán menores que apostan en www.doradobet.com, ellos serán bloqueados y, si se necesario, se contactarán a las autoridades encargadas.</p><p><strong>Auto Exclusión:</strong></p><p>En caso de que haya sido diagnosticado con adicción al juego o intenta alejarse del juego por un motivo diferente, queremos ayudarle a estar alejado de cualquier cosa que no le traiga ningún bien. “Auto Exclusión” significa que usted mismo se excluye bajo su propia decisión de todos los servicios relacionados con juego.</p><p>Esta exclusión no puede ser deshecha por cierto tiempo. Si desea auto excluirse, por favor envié un mensaje a nuestro soporte y de un periodo de tiempo para ser aplicado. También le explicaran los pasos a seguir. Este proceso tomara entre 24 y 72 Horas hábiles.</p><p>•Correo Electrónico: contacto@doradobet.com</p><p>Por favor tenga presente que la auto exclusión es permanente por el periodo de tiempo seleccionado y no será desecha por su propia protección.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Reglas",
                            "content": "<p>Asegúrate que solo apuesta por diversión, no pierdas el control y ten presente estas simples reglas: - Créate un limite de juego y JAMAS lo excedas. - Juega solo la cantidad de dinero establecido inicialmente. - Para de jugar cuando hallas excedido el limite de tiempo de juego que te habias puesto inicialmente. - NO JUEGUES mas dinero del que puedes arriesgarte a perder. - No gastes dinero destinado a otras cosas en apuestas. - Si decides parar de apostar o apostar menos, mantente firme en esta decisión. - Evita apostar muy seguido el cambio o el resto del juego. - No apuestes para recuperar tus perdidas. - Evita considerar las apuestas como una solución a tus problemas o inconvenientes. - NUNCA pidas dinero prestado para apostar. - Considera que el dinero perdido en apuestas es el precio que pagas por tu entretenimiento. - No le mientas a tus amigos o familiares sobre la cantidad de dinero que has perdido en las apuestas o el tiempo que le has dedicado a las apuestas. - Pide ayuda si crees que estas gastando mucho o apostando muy seguido. - No faltes a trabajar por apostar. - No apuestes cuando te sienta deprimido, solo, aburrido, tenso o ansioso.</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "Acerca de nuestra compañia",
                            "content": "<p>Ten la libertad de enviarnos un correo electrónico para informarnos de cualquier problema que puedas tener con la adicción a las apuestas y te ayudaremos a crear un limite de depósito o incluso a cerrar tu cuenta de apuestas por un periodo de tiempo. Los Menores y las Apuestas Está prohibido a personas menores de 18 anos de edad abrir una cuenta o apostar con nosotros. La compañía esto un problema serio y toma todas las medidas de prevención posibles, tales como verificaciones electrónicas . LAS GANANCIAS DE CUALQUIER QUE PROVEA SOLO UN APROXIMADO O INFORMACION INCORRECTA CON RESPECTO A SU IDENTIDAD O EDAD, SERAN CANCELADAS Y LA PERSONA SERA LLEVADA A CASO JUDICIAL DE ACUERDO CON LAS LEYES DE SU PAIS DE RESIDENCIA.</p>",
                            "show": false
                        }
                    ],
                    "show": true
                }
            ]
        }
    },
    "faq": {
        "pe": {
            "es": [
                {
                    "order": "preguntas-frecuentes",
                    "title": "Preguntas Frecuentes para apostar ",
                    "parent": [
                        {
                            "order": "",
                            "title": "Cómo registrarse en Doradobet?",
                            "content": "<p>Para registrarse en Doradobet.com Ingrese al link <a href=\"https://doradobet.com/registro\">https://doradobet.com/registro</a> Diligencie todo el formulario presentado, recuerde por favor que todos los datos deben ser verídicos para que el registro sea exitoso.</p><figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/watch?v=xsnltqs5WmU\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/xsnltqs5WmU\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo depositar en Doradobet en locales de apuestas?",
                            "content": "<p>Para recargar su cuenta debe Dirigirse a uno de nuestros locales o puntos de venta directamente, Informar al cajero su documento de identidad y el valor a depositar. El cajero realizará el proceso y se imprimirá el recibo de su depósito. Para conocer la ubicación de nuestros locales puede ingresar a https://doradobet.com/geolocalizacion Allí encontrara la ubicación de los locales y su respectivo teléfono.</p><p> </p><figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/watch?v=IO1_tt8AGkY\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/IO1_tt8AGkY\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo depositar en Doradobet en medios online?",
                            "content": "<p>Para depositar de forma online o en un agente bancario debe seguir los siguientes pasos: Ingresar a su cuenta en Doradobet.com Ingresar a la opcion \"Depositar\", Si esta desde un PC vera la opcion inmediatamente ingrese, en caso de que este usando un celular debe hacer clic en la esquina superior izquierda y alli encontrara la opcion \"Depositar\" Encontrará distintos medios de pago entre las que se destacan Safetypay, Visa; Pago Efectivo con todos los Bancos disponibles.</p><figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/watch?v=IO1_tt8AGkY\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/IO1_tt8AGkY\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cuál es la apuesta mínima en Doradobet?",
                            "content": "<p>La apuesta mínima permitida en nuestro sitio web esta determinada por el tipo de moneda en Perú es S./ 1 en el resto del mundo USD 1</p>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo recuperar contrasena en Doradobet?",
                            "content": "<p>En caso de que haya olvidado o bloqueado su cuenta por contrasena, debe seguir los siguientes pasos: 1. Seleccionar el botón de \"INICIAR SESION\". 2. Allí encontrara debajo del recuadro para escribir la opción \"Olvidó su contrasa?\" 3. Una vez ingresado a dicha opción debe escribir el correo electrónico registrado en el recuadro. Recuerde que no debe tener espacios antes o después de escribirlo para que su formato sea valido. 4. Debe completar el captcha. 5. Hacer clic en enviar Luego de seguir este proceso, se enviara automáticamente un correo con un link en el cual puede cambiar la contrasena de su cuenta.</p><p> </p><figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/watch?v=jLj4WaBQU6c\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/jLj4WaBQU6c\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        },
                        {
                            "order": "",
                            "title": "¿Cómo retirar en Doradobet con Transferencia Bancaria?",
                            "content": "<p>Para solicitar el retiro por transferencia debe seguir los siguientes pasos: 1. Registrar la cuenta bancaria a la que desea recibir el pago (Usted debe ser el titular de la cuenta). 2. Para registrar la cuenta debe ingresar a la opción Servicios- Gestión-Cuentas Bancarias 3. Debe seleccionar el banco, llenar las casillas solicitadas: Número de cuenta bancaria, número interbancario y tipo de cuenta. 4. Hacer clic en el botón guardar. 5. Generar la nota de retiro, ingresando a la opción Servicios-Gestión-Retirar seleccionando como tipo de retiro, cuenta bancaria. Escribir el monto a retirar que debe ser de 50 soles en adelante y hacer clic en el botón \"Retirar\". Luego de esto su retiro se realizara entre 24 y 72 horas hábiles.</p><p> </p><figure class=\"media\"><div data-oembed-url=\"https://www.youtube.com/watch?v=PDpe3CBm_Bs\"><div style=\"position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;\"><iframe src=\"https://www.youtube.com/embed/PDpe3CBm_Bs\" style=\"position: absolute; width: 100%; height: 100%; top: 0; left: 0;\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen=\"\"></iframe></div></div></figure>",
                            "show": false
                        }
                    ],
                    "show": true
                }
            ]
        }
    },
    "promotions": {
        "pe": {
            "es": [
                {
                    "id": "PE100",
                    "title": "Bono de Bienvenida DoradoBet",
                    "order": null,
                    "slug": "Bono_bienvenida_doradobet",
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1659383856.png",
                    "content": "<p>Bono 100% Primer Depósito Perú hasta S/. 500. A partir del 15 febrero del 2021</p><p> </p><p><a href=\"https://doradobet.com/registro\"><strong>Regístrate aquí</strong></a></p><p> </p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p><br><br>- La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere DoradoBet.com. El monto máximo de bonificación a recibir es: Perú de S/. 500 (PEN) en total.</p><p><br><br>- Si el usuario deposita por primera vez un monto mayor a: Perú S/. 500 se le podrá acreditar como máximo S/. 500. Por ejemplo, si deposita S/. 1.000, se le activará máximo S/. 500 de bono.</p><p><br><br>- Para acceder al bono, el primer depósito deberá ser como mínimo de: Perú S/. 30.</p><p><br><br>- La oferta es válida sólo para rollover (número de veces) en la Categoría de Apuestas Deportivas de futbol. Para los siguientes mercados: - Ganador del partido - Resultado exacto</p><p><br><br>- Para poder liberar el dinero del bono, se deberá cumplir con el rollover (número de veces) x7. Es decir, deberá jugarse el valor total del bono siete veces con cuotas mayores a 1.70 en cada selección, EL BONO SE BASARA EN LAS APUESTAS REALIZADAS CON DINERO REAL, el saldo del bono no es apostable.</p><p> </p><p>-IMPORTANTE: Solo se tendrán en cuenta las apuestas realizadas por un valor igual o mayor al valor del bono, las apuestas que se realicen por un valor menor no sumarán para cumplir con el rollover.</p><p>El máximo a contar por cada apuesta es el valor del bono que posee el usuario.<br><br>Ejemplo: Si el usuario tiene un bono de S/100, con un rollover de S/700, y realiza dos apuestas de S/200 cada una, solo se le sumará S/200 al rollover.</p><p><br><br>- El saldo del bono luego de ser liberado será cargado en saldo créditos (recargas).</p><p><br><br>- El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><br><br>- Las apuestas que fueron marcadas con cash out (opción Reintegro) no se contabilizan para el rollover.</p><p><br><br>- DoradoBet.com se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p><br><br>- DoradoBet.com considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.).</p><p><br><br>- DoradoBet.com se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><br><br>- Una vez activado BONO 100% PRIMER DEPOSITO HASTA: Perú S/. 500. el usuario dispondrá de 1 mes (30 días) para poder cumplir con las condiciones indicadas en la promoción</p>",
                    "show": false
                },
                {
                    "id": "PE101",
                    "title": "Premios Misteriosos",
                    "order": 12,
                    "slug": "Premios_Misteriosos",
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1666719243.png",
                    "content": "<p>¡Juega y gana en el Casino online de <a href=\"http://doradobet.com/\">DoradoBet.com</a>!</p><p>Participa por los premios misteriosos y gana maravillosos premios.</p><p>Estos premios sorpresa están acorde a los términos y condiciones generales de <a href=\"http://doradobet.com/\">DoradoBet.com</a></p><p>¡Que estas esperando para jugar y ser parte del premio misterioso!</p><p>Términos y Condiciones</p><p>Aplica solo para Perú.</p><p>Válidos para mayores de 18 anos</p><p>Los juegos que harán parte de la presente actividad promocional son los juegos,<strong> Clash Of Camelot</strong> y <strong>Rise Of Olympus</strong></p><p><br>Para participar en los premios misteriosos, el usuario deberá tener saldo premios o créditos disponible en su cuenta de <a href=\"http://doradobet.com/\">DoradoBet.com</a>, o en su defecto recargar a través de los medios de pago establecidos.</p><p>La actividad promocional inicia el día <strong>06 de noviembre 2022 y finaliza el 12 de diciembre de 2022.</strong> Los usuarios podrán participar durante este tiempo buscando ganar el premio misterioso.</p><p>Premio Platino: S/. 2.200 en jugadas Gratis en cada juego</p><p>Premio Oro: S/. 1.800 en jugadas Gratis en cada juego</p><p>Premio Plata: S/. 1.200 jugadas Gratis en cada juego</p><p>Premio Bronce: S/. 800 jugadas Gratis en cada juego</p><p>Los premios se otorgarán de manera automática en el mismo juego en el cual le apareció el mensaje, en caso de que el premio no se haga efectivo el usuario deberá contactarse con nuestro servicio de chat Online e informar que ha sido ganador de un premio misterioso.</p><p>El usuario consta de un tiempo estimado de 5 días a partir de ganar el premio misterioso para reclamarlo.</p><p>Para participar por el Premio Misterioso solo aplican las jugadas (Spins) realizadas en los juegos participantes en la actividad promocional.</p>",
                    "show": false
                },
                {
                    "id": "PE102",
                    "urlImage": "https://cmsvirtual.virtualsoft.tech//uploads/50c24e9123ba4a7baad05145f0ff4cf9.png",
                    "title": "Yapa Doradobet",
                    "content": "<p>Realiza una apuesta combinada Pre-match de 5 o m&aacute;s eventos y te aumentamos un % de m&aacute;s en las ganancias.</p>\n\n<p>Para participar en la promoci&oacute;n debe hacer una apuesta de m&iacute;nimo 5 lineas con una cuota m&iacute;nima de 1.5 por selecci&oacute;n</p>\n\n<p>Rango de lineas y %</p>\n\n<p>De 5 a 10 lineas recibes el 3% en tus ganancias</p>\n\n<p>De 11 a 13 lineas recibes el 13% en tus ganancias</p>\n\n<p>De 14 a 15 lineas recibes el 15% en tus ganancias</p>\n\n<p> </p>\n\n<p>T&eacute;rminos &amp; Condiciones:</p>\n\n<p>1. Si cualquier selecci&oacute;n se pospone o cancela la &ldquo;Yapa Doradobet&rdquo; a&uacute;n se mantiene, pero el porcentaje agregado reflejar&aacute; el n&uacute;mero actual de selecciones ganadoras. Por ejemplo, una combinada de 6 selecciones, con 5 eventos ganadores y 1 evento pospuesto, recibir&aacute; un 3% de &ldquo;Yapa Doradobet&rdquo; a sus ganancias.</p>\n\n<p>2. La Yapa Doradobet ser&aacute; agregada autom&aacute;ticamente a tu cuenta, en saldo premios luego de ser ganada.</p>\n\n<p>3. No aplicar&aacute;n a recibir la &ldquo;Yapa Doradobet&rdquo;, las apuestas combinadas que realizaron Cashout.</p>\n\n<p>4. Doradobet se reserva el derecho de negar la &ldquo;Yapa Doradobet&rdquo; a cualquier usuario sin explicaci&oacute;n alguna. Doradobet tambi&eacute;n se reserva el derecho de restar la Yapa Doradobet en cualquier momento. Doradobet se reserva el derecho de cancelar las ganancias hechas a partir del dinero recibido por la Yapa Doradobet.</p>\n\n<p>5. Los t&eacute;rminos y condiciones de la &ldquo;Yapa Doradobet&rdquo; est&aacute;n en total acuerdo con los T&eacute;rminos y Condiciones generales de Doradobet.com</p>\n\n<p>6. Doradobet se reserva el derecho de editar y/o retirar esta promoci&oacute;n en cualquier momento y sin previo aviso.  Se les aconseja a los usuarios revisar regularmente los t&eacute;rminos y condiciones aqu&iacute; descritos para estar al d&iacute;a con cualquier cambio que pueda ocurrir.</p>\n\n<p>7. Doradobet se reserva el derecho de cancelar cualquier &ldquo;Yapa Doradobet&rdquo; y/o ganancias obtenidas a partir de comportamiento fraudulento (ya sea de un jugador o de un grupo de jugadores), incluyendo el derecho de reducir la &ldquo;Yapa Doradobet&rdquo; de la cuenta y tomar las acciones necesarias para recuperar el monto perdido a causa de un intento de fraude.</p>\n\n<p>8. Aplica para cualquier deporte que est&eacute; activo.</p>\n",
                    "slug": "Yapa-Doradobet",
                    "order": -4,
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1667915938.png",
                    "title": " Drops & Wins Slots",
                    "content": "<p>“Drops &amp; Wins – Torneos Semanales &amp; Premios Diarios - ¡Premios en efectivo en cualquier giro!” se ejecutará en los juegos participantes, del 04 de mayp de 2022 al 08 de febrero de 2023 semanalmente (el “<strong>Período de la Promoción</strong>”). Al participar en la Promoción (como se define a continuación), usted por la presente acepta cumplir estos términos y condiciones.</p><p><br><strong>Términos y condiciones generales – Torneos Semanales y Premios Diarios (Semanas Regulares):</strong></p><p>• La promoción de Pragmatic Play “Drops &amp; Wins – Torneos Semanales &amp; Premios Diarios - ¡Premios en efectivo en cualquier giro!” (la “<strong>Promoción</strong>”) incluye cincuenta y dos (52) torneos, siendo siete (7) días de torneos (cada uno un “<strong>Torneo Semanal</strong>”) que se ejecutarán semanalmente durante el Período de la Promoción, y un total de trescientos sesenta y cuatro (364) Premios Diarios (cada uno es un “<strong>Premio Diario</strong>”), y se ejecutará diariamente durante el Período de la Promoción.</p><p>• Para participar en cualquier Torneo Semanal o Premios Diarios de la Promoción, el jugador debe abrir cualquiera de los juegos participantes y unirse a ellos.</p><p>• Para participar en la Promoción, el jugador debe realizar un giro con dinero real, que cumpla con las siguientes condiciones:</p><p>• Todos los giros con una apuesta mínima de €0,50 (o su equivalente en las monedas disponibles*) en los juegos participantes formarán parte del Torneo Semanal y de los Premios Diarios (en adelante un “<strong>Giro Cualificado</strong>”).</p><p>• Si el importe de apuesta mínima no está disponible, la apuesta mínima se redondeará hacia arriba al siguiente nivel de apuesta disponible en el juego.</p><p>• Un Giro Cualificado hará que el jugador sea elegible simultáneamente para toda la promoción “Drops &amp; Wins – Torneos Semanales &amp; Premios Diarios - ¡Premios en efectivo en cualquier giro!”.</p><p>• Para evitar dudas, cualquier porción del premio no distribuida al final de cualquier Torneo Semanal o Premios Diarios se agregará en los siguientes Torneos Semanales y/o Premios Diarios o a la siguiente Promoción de la Red.</p><p>• Los premios se pagarán teniendo en cuenta la tabla de “Premios” dentro de los juegos participantes.</p><p>• Todos los importes se muestran en el juego en la Moneda del Jugador (donde \"<strong>Moneda del Jugador</strong>\" significa la moneda del territorio en el que se encuentre).</p><p>• Los jugadores pueden ganar premios en el Torneo Semanal (Semanas Regulares) y en los Premios Diarios (Semanas Regulares) en forma de un importe fijo en efectivo, como se establece en la Tabla de Premios del Torneo Semanal (Semanas Regulares) y en la Tabla de los Premios Diarios (Semanas Regulares) (en adelante “<strong>Semanas Regulares</strong>”).</p><p>• Los jugadores pueden ganar premios en los Torneos Semanales (Semanas Multiplicadoras de Premios) y en los Premios Diarios (Semanas Multiplicadoras) en forma de multiplicador del importe de la apuesta ganadora del jugador y/o Bono de Giros Gratis como se establece en la Tabla de Premios del Torneo Semanal (Semanas Multiplicadoras de Premios) y las Tabla de Premios Diarios (Semanas Multiplicadoras de Premios) (en adelante “<strong>Semanas Multiplicadoras</strong>”).</p><p>• Las reglas de los Premios Diarios y de los Torneos Semanales se encuentran dentro de los juegos participantes.</p><p>• La tabla de los Premios Diarios se actualiza en tiempo real mostrando las posiciones actuales, así como la cantidad de premios restantes.</p><p>• Los Premios Diarios terminan diariamente cuando se dé algo de lo siguiente: (I) 18:59 CET/CEST; o (ii) cuando no queden más premios.</p><p>• Se aplican los Términos y Condiciones generales. Pragmatic Play se reserva el derecho a (i) modificar las reglas de “Drops &amp; Wins – Torneos Semanales y Premios Diarios – ¡Premios en efectivo en cualquier giro!” en cualquier momento sin previo aviso; (ii) suspender o cancelar cualquier Torneo Semanal o Premios Diarios en cualquier momento notificando dicha suspensión o cancelación lo antes posible; y/o (iii) retener los premios a su razonable discreción cuando tenga razones para creer que otorgar el premio podría violar estos términos y condiciones o la ley aplicable.</p>",
                    "slug": " Drops_&_Wins_Slots",
                    "order": 2,
                    "id": "PE103",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1672494539.png",
                    "title": "Bingo Millonario",
                    "content": "<p>Juega al Bingo Doradobet todos los días de enero y podrás ganar Hasta S/.600 . Participa en todos los sorteos de bingo diarios a las 7:00 PM por alguno de los premios.</p><p><strong>DINAMICA</strong></p><p>Para participar en el Bingo Doradobet, el usuario deberá estar registrado en la plataforma <a href=\"http://doradobet.com/\">Apuestas Deportivas | Apuestas Online | Casino en Línea</a> .</p><p>Ingresa a la Sala Dorada</p><p>Compra los cartones que tienen un valor de S/.1</p><p>El usuario debe comprar los cartones antes del cierre de venta de dicho sorteo.</p><p>Minimo de cartones a comprar por usuario 2</p><p>Maximo de cartones a comprar por usuario 200</p><p>El sorteo dará inicio luego del cierre de venta</p><p> </p><p><strong>REGLAS DE JUEGO</strong>.</p><p>El cartón del Bingo Doradobet dispone de 25 casillas dispuestas en cinco filas horizontales y cinco verticales. Cada una de ellas va marcada con un número excepto la casilla central.</p><p>La distribución de los números en el cartón es aleatoria.</p><p>El sistema marcará los números automáticamente en cada cartón.</p><p>Nuestro bingo también tiene un indicador (tablero) para mostrar los números que ya han salido y los que aún no.</p><p>En este juego hay varias formas de ganar:</p><p>Rellenando todo el cartón (también llamado “Pleno”)</p><p>Consiguiendo una determinada figura en el cartón definida anteriormente antes de comenzar el juego (algunas de las más populares son la pirámide, cuadrado, alguna letra o número).</p><p>Se declara ganador el jugador que tenga los números correctos en el cartón.</p><p>No se declara ganador si el jugador no cumple con el reglamento del sorteo o no cumple con los números asignados.</p><p>Si varias personas cantan Bingo al mismo tiempo, el sistema procederá a un desempate y repartirá la premiación entre los ganadores.</p><p>El premio se entregará al titular del cartón, no se entregará a segundos beneficiarios o jugadores.</p><p>El cartón suministrado es válido solo para el sorteo asignado.</p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> no se hace responsable de la calidad de conexión de internet del usuario.</p><p>Si el sorteo no llega al recaudo mínimo impuesto por <a href=\"http://doradobet.com/\">Apuestas Deportivas | Apuestas Online | Casino en Línea</a> se cancelará y se hará la respectiva devolución del valor del cartón al usuario.</p><p><strong>Premios:</strong></p><p>Los premios serán repartidos de la siguiente manera:</p><p>Pleno (24 tachados): S/.300</p><p>Figura 1 (De 14 a 16 tachados): S/.180</p><p>Figura 2 (De 5 a 6 tachados): S/.120</p><p>Las figuras hacen referencias a las letras o “patrones” que se realiza con los cartones que estén disponibles.</p><p>Los premios serán cargados automáticamente en la cuenta del usuario.</p><p>Si el saldo no se carga automáticamente el premio será pagado luego de 72 horas hábiles.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p>",
                    "slug": "Bingo_Millonario",
                    "order": 4,
                    "id": "PE104",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1671729828.png",
                    "title": "Misiones Diarias",
                    "content": "<p>Misiones Diarias Doradobet</p><p>Válido para Perú</p><p>Válido para usuarios registrados en la plataforma <a href=\"http://doradobet.com/\">Doradobet.com</a></p><p>La Campaña estará vigente desde el 19 de diciembre hasta el 31 de enero 2023</p><p>La campaña se hará de Lunes a Domingo a partir de 19 de diciembre del 2022.</p><p><strong>Dinámica: </strong></p><p>Los usuarios deben cumplir con las condiciones diarias para poder hacer uso del bono</p><p> </p><p>Lunes – Apuesta mínimo S/ 200 en el juego Gold Digger y gana 50 giros</p><p>Martes – Juega 200 spin en el juego Brilliant Diamonds y gana 50 giros</p><p>Miércoles - Gana S/ 250 en el juego Golden Buffalo Double Up y gana 50 giros</p><p>Jueves - Apuesta mínimo S/300 en el juego Shining King Megaways y gana 50 giros</p><p>Viernes - Juega 300 spin en el juego Gold Digger Megaways y gana 50 giros</p><p>Sábado - Gana S/ 350 en el juego Aztec Gold Extra Gold MW - Doradobet y gana 50 giros</p><p>Domingo - Apuesta S/ 400 en el juego The Ruby Megaways y gana 50 giros</p><p> </p><p>Juega todos los días y gana hasta 350 giros gratis</p><p>Para que se acrediten los giros es necesario que el usuario ingrese nuevamente al juego o actualice la pantalla, una vez realizada esta acción reflejaran los giros gratis.</p><p>Los giros gratis se darán automáticamente luego de cumplir con las condiciones establecidas por <a href=\"http://doradobet.com/\">Doradobet.com</a></p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.)</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso</p>",
                    "slug": "Misiones_Diarias",
                    "order": 6,
                    "id": "PE1106",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1672494661.png",
                    "title": "Cashback Life in Vegas",
                    "content": "<p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>Oferta válida solo para Perú</p><p>Solo podrán participar mayores de 18 años</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doradobet.com/\">DoradoBet.com</a>.</p><p>La Promoción estará disponible de sabado a domingo por el mes de enero</p><p><strong>Fechas:</strong></p><p>7 al 8 de enero<br>14 al 15 de enero<br>21 al 22 de enero<br>28 al 29 de enero</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a cambiar las fechas de la Promoción en cualquier momento.</p><p>El bono es la devolución del 30% de las pérdidas de los usuarios en los proveedores: Ezugi- Evolution - Pragmatic Live hasta S/.800</p><p>El usuario debe apostar como mínimo un valor de S/50</p><p>El dinero reembolsado será cargado en saldo crédito (recargas) dentro de las 72 horas hábiles después de la promoción, el mínimo de reembolso es de S/. 50 por usuario</p><p>El monto máximo de bonificación a recibir es: Perú de S/. 800 (PEN) en total</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p>No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p>Los usuarios que participen en la promoción aceptan los términos y condiciones y reconocen que el incumplimiento de las mismas puede provocar su descalificación.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p>",
                    "slug": "Cashback_Life_in_Vegas",
                    "order": 7,
                    "id": "PE107",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1672494685.png",
                    "title": "Freespins Back",
                    "content": "<p>Oferta válida solo para<strong> Perú</strong></p><p>Solo podrán participar mayores de 18 años.</p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">DoradoBet.com</a>.</p><p>La Promoción estará disponible de lunes a miércoles<strong> (todo el mes de enero)</strong><br><strong>Fechas:</strong><br>2 al 4 de enero<br>9 al 11 de enero<br>16 al 18 de enero<br>23 al 25 de enero<br>30 al 1 febrero<br><br> </p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a cambiar las fechas de la Promoción en cualquier momento.</p><p>El bono es la devolución del <strong>30%</strong> de las pérdidas de los usuarios en todas las tragamonedas de nuestro casino online, hasta <strong>S/. 600 en giros gratis.</strong></p><p>Las jugadas serán reembolsadas dentro de las 72 horas hábiles después de la promoción.</p><p>Lo mínimo a devolver son S/. 10 en jugadas Gratis.</p><p>El monto máximo de bonificación a recibir es: Perú de S/. 600 (PEN) en jugadas gratis.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p>Los usuarios que participen en la promoción aceptan los términos y condiciones y reconocen que el incumplimiento de las mismas puede provocar su descalificación.</p>",
                    "slug": "Freespins_Back",
                    "order": 8,
                    "id": "PE108",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1672494726.png",
                    "title": "Bono Casino Dorado",
                    "content": "<p>Oferta válida solo para<strong> Perú</strong></p><p>Solo podrán participar mayores de 18 años.</p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">Doradobet.com</a></p><p>El bono estará disponible todos los fines de semana de enero.</p><p><strong>Fechas:</strong></p><p>07 al 08 de enero</p><p>14 al 15 de enero</p><p>21 al 22 de enero</p><p>28 al 29 de enero</p><p>Por su próximo deposito de S/.40 en adelante el usuario recibirá el 40% adicional hasta 150 soles.</p><p>El monto máximo de bonificación a recibir S/.150 en total.</p><p>Si el usuario deposita un valor mayor a S/.150 se le podrá acreditar como máximo S/.150. Por ejemplo, si deposita S/.1,000, se le activará máximo S/.150 de bono.</p><p>Para acceder al bono por deposito del casino dorado, el depósito deberá ser como mínimo de 40 soles, aplican todos los medios de pago, luego del depósito el bono será cargado a bonos por liberar.</p><p>Para poder liberar el dinero del bono, se deberá cumplir con el <strong>rollover</strong> (número de veces) <strong>x20</strong>, es decir, deberá jugarse el valor total del bono veinte veces en jugadas de casino slot en la categoría de juegos Populares.</p><p>El cliente contara con 5 días para cumplir el Rollover, este tiempo comenzara a contabilizarse a partir de activa la bonificación.</p><p>Las apuestas anuladas que fueron marcadas con rollback no se contabilizan para el rollover.</p><p>La liberación del bono SE BASARÁ EN LAS APUESTAS REALIZADAS CON DINERO REAL, el saldo del bono no es posible jugarlo hasta no cumplir las condiciones.</p><p>El saldo del bono luego de ser liberado será cargado en saldo créditos (recargas). <br>Las apuestas deben de estar determinadas para sumar al rollover.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar pronósticos o suspensión de las cuentas.</p><p><a href=\"http://doraodbet.com/\">Doradobet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> considerará la activación del bono de bienvenida para usuarios que no tienen bonos vigentes.</p><p><a href=\"http://doradobet.com/\">Doradobet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p>",
                    "slug": "Bono_Casino_Dorado",
                    "order": 10,
                    "id": "PE109",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1672494759.png",
                    "title": "FreespinsBack Pragmatic",
                    "content": "<p>Oferta válida solo para<strong> Perú</strong></p><p>Solo podrán participar mayores de 18 años.</p><p>Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p><p>La oferta es válida únicamente una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doraodbet.com/\">DoradoBet.com</a>.</p><p>La Promoción estará disponible los jueves y viernes<strong> (todo el mes de enero)</strong><br><strong>Fechas:</strong><br>5 al 6 de enero<br>12 al 13 de enero<br>19 al 20 de enero<br>26 al 27 de enero</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a cambiar las fechas de la Promoción en cualquier momento.</p><p>El bono es la devolución del <strong>30%</strong> de las pérdidas de los usuarios en las tragamonedas de nuestro proveedor PRAGMATIC de nuestro casino online, hasta <strong>S/. 600 en giros gratis.</strong></p><p>Las jugadas serán reembolsadas dentro de las 72 horas hábiles después de la promoción.</p><p>La apuesta minima deberá ser de S/. 30</p><p>Lo mínimo a devolver son S/. 30 en jugadas Gratis.</p><p>El monto máximo de bonificación a recibir es: Perú de S/. 600 (PEN) en jugadas gratis.</p><p>El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p><a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>No se tendrán en cuenta para esta promoción apuestas que no cumplan los requisitos anteriormente especificados, o las que se cancelen o cierren con anterioridad o hayan sido realizadas con Jugadas Gratis.</p><p>Los usuarios que participen en la promoción aceptan los términos y condiciones y reconocen que el incumplimiento de las mismas puede provocar su descalificación.</p>",
                    "slug": "FreespinsBack_Pragmatic",
                    "order": 9,
                    "id": "PE110",
                    "show": false
                },
                {
                    "urlImage": "https://images.virtualsoft.tech/m/msjT1672494784.png",
                    "title": "Bono Pasión Futbolera",
                    "content": "<p>Válido para Perú.</p><p>·       La oferta solo aplica una vez por usuario, persona, correo electrónico, o criterio que considere <a href=\"http://doradobet.com/\">DoradoBet.com</a>.</p><p>·       Usuarios online</p><p>·     <strong>  El bono estará vigente todos los lunes del mes de enero</strong></p><p><strong>Fechas</strong></p><p>02 de enero</p><p>09 de enero</p><p>16 de enero</p><p>23 de enero</p><p>30 de enero</p><p>·       El bono es del 60% de tu próximo depósito.</p><p>·       Aplica para todos los métodos de pago, <strong>menos pago efectivo.</strong></p><p>·       El monto máximo de bonificación a recibir es de <strong>S/.300</strong>. Si el usuario deposita un monto mayor a S/.300 se le acreditará como máximo S/.300. Por ejemplo, si deposita S/.1.000 se le activará S/.300 de bono.</p><p>·       Para acceder al bono, el próximo depósito deberá ser como mínimo de <strong>S/.30</strong></p><p>·       La oferta es válida sólo para la <strong>Apuestas Deportivas de Fútbol </strong>prematch y en vivo a los mercados 1x2 y Marcador Exacto, las apuestas deben contar con mínimo 3 selecciones (lineas) para la disminución del rollover.</p><p>·       Para poder liberar el dinero del bono, se deberá cumplir con el <strong>rollover X5</strong> (número de veces). Es decir, deberá jugarse el valor total del bono <strong>cinco veces</strong> con cuotas mayores a <strong>1.70</strong> en cada selección. EL BONO SE BASARÁ EN LAS APUESTAS REALIZADAS CON DINERO REAL, el saldo del bono no es apostable. Por ejemplo, si depositas S/.50, tienes que llegar a apostar S/.250 en mercados con una cuota mínima de 1.70</p><p>·       <strong>IMPORTANTE:</strong> Solo se tendrán en cuenta las apuestas realizadas por un valor igual o menor al valor del bono, las apuestas que se realicen por un valor mayor únicamente sumarán el valor correspondiente al bono.</p><p>El máximo a contar por cada apuesta es el valor del bono que posee el usuario.</p><p>Ejemplo: Si el usuario tiene un bono de S/.100, con un rollover de S/.500, y realiza dos apuestas de S/.200 cada una, solo se le sumará S/.200 al rollover.</p><p>·       Las apuestas deben de estar determinadas para sumar al rollover.</p><p>·       El saldo del bono luego de liberado será cargado en saldo créditos(recargas).</p><p>·       El incumplimiento de los Términos y Condiciones del presente bono o cualquier intento de fraude usando esta y otras promociones puede dar lugar a cancelar apuestas o suspensión de las cuentas.</p><p>·       <a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho de solicitar al usuario una validación de documento de identidad que permita la activación del bono solicitado.</p><p>·       <a href=\"http://doradobet.com/\">DoradoBet.com</a> considerará la activación del bono para usuarios que no tienen bonos vigentes o si el sistema no permite brindarlo por motivos ajenos al servicio (cuenta con balance negativo, duplicidad, saldo en la cuenta, abuso de bonos, etc.).</p><p>·       <a href=\"http://doradobet.com/\">DoradoBet.com</a> se reserva el derecho a modificar o cancelar esta o cualquier otra promoción en cualquier momento, sin previo aviso.</p><p>·       Una vez activado BONO DEL 60% EN TU PRÓXIMO DEPÓSITO HASTA S/.300. el usuario dispondrá de <strong>3 días</strong> para poder cumplir con las condiciones indicadas en la promoción</p><p>·       Los Términos y Condiciones generales de la página aplican también para esta bonificación.</p>",
                    "slug": "Bono_Pasion_Futbolera",
                    "order": 11,
                    "show": false,
                    "id": "PE111"
                }
            ]
        }
    },
    "language": {
        "languageDafault": "es",
        "selectFlagDefault": "https://images.virtualsoft.tech/site/general/flags/es.gif",
        "showSelectLang": true
    },
    "languagesData": {
        "pe": {}
    }
}
