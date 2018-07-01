const helpers = require('../helpers/helpers')
const TripHelper = require('../helpers/trip')
const TripStubHelper = require('../helpers/tripStub')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment-timezone')
moment.tz.setDefault('America/New_York')

const distance = require('google-distance');
distance.apiKey = config.google.placesApiKey;

const _ = require('underscore')

let exampleTrip = {
    "itineraries": [
        {
            "activities": [
                {
                    "name": "City Museum",
                    "category": "day",
                    "date": "2018-06-28",
                    "startTime": "10:30 am",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.633626,
                        "long": -90.200414
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjWyXTQIADaNJyF-P8DDewrpSHiWwZ8v-DLhD4ye3N8XAVhB5bj2UVMMctLVLQmjEcprPOhh34rZHo4IdASMIPv0N0QtYRbqmRd2utzMNovDlnxrRaqfBCxbRgGcRhnKMEhAD2tR2o_wLFNjEoJVFkrEzGhS7mI_12XkNJ-uaMvtUzW0-0Gf2Tw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1AqJtMCtVTM7ILEmLw6CuN3HFRqb8LQQxhOMwfBR8_2Dvmi-1ZVXiikGj_8JbWibpGL7zpbYdBmeMiZB_0vCO6yJqcy6N2kBECDtplbtDy2uvdbB-hFrwmVy2nz9hQgMEhAOtgTnqavG-HKVwCFDgb6DGhQ2xixdo9xn4MiyzBNGCfCW6gZaSg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXbuTGfWgxM_T7e0jBlk082gVQneiHiFlLQiBedyjCERhSfKJ2wnHO9mQwLRF0lWSYqGkLhEWVlsqGOLQ_viHEq_ZR8wXzARbULm05pjem9z1u6ZtW3twGRt4lG1y-_wTEhDJYpUcPZUJL7iB84v9EFGKGhQH7xzn72aJqVTBmD9sbsb4JVGG_A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAevTO6pp5aXehSRJShOKXMZ03Ko3bcAx5C7N_kOakmnhkHZOg4wJKSKjCnPoJHGFi-vIOImsXmxbVnLd0bibG9-a8n9SYSqkB2J1m6cKuYGvoAckNmnShVvNqyYJUPw4YEhCHyQR7iglA0Yc4EJMoJnGvGhR_2dQq_I2vRAAUdVvSxa0C6dKlwA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA66R2fQB6QwMGUoyx5hxiU75q52TpB3HmiWNtd8ssoCz_3vQWWNdQS6v3JCIULL0JlRydMlOh2gWsKODjJ2WGw8WVVrhpdMcubCHxwSPp_OkZDGmrTGgEaoa0tnGSEGZ9EhCIMY4okhR6rmwQhx2AQDNDGhQvJ7hZuGWVKUYJejedkftGPi2CmA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAY-TMWopqg8hDlj8uK7U8VHH9M93J64CIlfsXoWk6rSsfoo9mw8O21E_witN9Lfj6pqGPIfRXCuyWod6tzh3i6ItVSsAXvAi_iHw9xBvV6HMapdr1HtB1ydLkOJXuOzHDEhBuWDbHv7y5RxQJznmonWEMGhS6RZ1VUrLzvsenco72BbrlIIdIFw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAq86Cj0rIA9ClRCfRjDQ1naRAdgrAysUO8TufQh61qN775naFMo_MH-8bZOuiBM93Ck3WeAamuT9CIPNti6ycYrOfk1KTfRHA2UTLbVpJTRrFU10FeEddYP1pIK-Bk2h8EhATai0bD-5Z91FW3f7o9SyEGhSw7m8sbDhh4xi3tfYbxsyheKUUJw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAq9utttyHShdIEuPK2e7wc7QwOxQewd-AUHO_l8KvLuYHhgeWl4DWZMTUy1tGm6obpaN9m8_AZQ3z9qaqUaN8WVD-HSKu_VhZNo06IDk5Uuq2LR-xOHy5GHC-hR9rL_sHEhDWPAM6P12nW6zUUu50fvfKGhTVTZRQkOLRGrTNZg_9gB44BkiQgQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAf_ukg_kLh_XHEjVBKJwlOXstLIlwbOMROdlDJVZ8w8JKMYW8Rr7y5TtQ8e67KC8gCFQn6dpvJLzO5Zr3rnKDlr9qYNyNX7ATStBr4WtG3PSRE_n1GQm8Ww2YBdaonhXWEhBc6X9rmkgixSlRZXnmsdouGhSqCuMVAvCEB-hJhaFvwd1HzfpUjA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAgLP8r3wl_NVLancDTkIOWdIWbKnkilPw48fGbhqlZKPaXhvTyEnMzBibp0UW9rzrOs-B_2RY6n2SpJfBuffJwDAKKmMQeG6PN1Kp0a76kg6kG_83LvyYk8aLu_dzX8b9EhAtaRHpL0CWF0FISgaSXxONGhS5lgF6wJ50C8ah5ikC_PmpQyY5Lg&maxwidth=400"
                    ],
                    "rating": 4.8,
                    "subcategory": "activeTourism",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.633626,-90.200414&markers=color:0x01AF66|38.633626,-90.200414&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Eleven Eleven Mississippi",
                    "category": "food",
                    "date": "2018-06-28",
                    "startTime": "12:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.61966260000001,
                        "long": -90.2130344
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAA14B1nk_arGgDzjjzzul-8YnfQ1T1Ry575OwCzNBqwbFGIooRfF195WERe1evalCCJwjuqzy4tsQqmcNoffwLE-_NeyxUo_ImDqclnwU23O1P5mvNsYOi3JRJzsyIc86uEhBtU_xfEaVt4bCVvDTHL6wAGhSSaMsHti7rYTnAV4BWbQwjenYvlw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAALDaU-1OZ6l8qsyRkIfSg7Jh21P6y3v9VMP-cMw4KP-Azdjhw9ElsFHIXmI1_mVoMzE5PAwj21c56anfZ36hUoHopwbxRy9vIEFArKykSfV9u6gsTuor4_ytk5rwH8rGOEhAtuagkD_Kiiq4tNm-JQWHJGhR5aIY0XdraBF7BL1ukE1kdaFWgeQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADMFgFAQUlnvWK_CgwLhpRIg8KgcSiEgzzrfLD1vJpiFOaPJ7L462-5OGvG4om2oWs4pOlMhhcqNErbDQ_nLoduChejFdGffAKFYFhKvELBK21EJgfBOXTTrD2oiV7UmcEhAKBd4Saa_tZfNguiW6csxsGhR6W_AUhvR9O8hSsfdxipIviEmMsw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARHiFbxsHO28dVObToa28IRJ5G8AWlo_W8dYv4wlVyAZT-2Vd2EPQcIQCRSl5Hs7Oup31UGeUUHcqQIo6yvs1oPV84NFCjfg2ezvfNTtKR86wbLG4amS8t8gttdsIt-ssEhCKrA2DTggyEJP49sskqH6XGhQu0Y4znW3w0meXCyFr0u3AZL1wmg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAAZAdq3SdFOEfMIj1uKEROBVAJd6Ezv-6Y1ddVqaVe5DkiZcHr0nVOe-NlM87kEtcuvqh2y4fI8GLdz1TBAZNi_FW63MAUZO1OF1va-uTzxDgevgOQtRH0c371DRn497sIEhCJrY9i6qxmyPIFSXdlY83-GhTy3fi1VJZ347CE57mRyxn57NuUZw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAACi1IqW2XYp8zfzmPwt2xAsA8hyuIMw5E1XIT0FtIYInb29mkxH3-PWeq_REGBecE405AyWTLYz1MWzub0-vOlB2AQYewUCOq1YkPueGF3bjKFR64V8daz1XNL1aaF2rGEhBiYMHU7iRk3-mJC-qEV4TMGhS7kUno9OZFVfh-9MtY1dtNOZN6cw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANsWdB2qdoRu_XX3VAiXI1cZmmeJfTwo8J6khjT6a5sH1xqYeZHgCA8kY-baMeUf5GwieHfUq7EeYVeSnpi0d56U0jY-FCT6E1Wz7qbZrw8-eULSvQCteN2rXwCnA1o2bEhAd0nPP6lrlu8PMVQab9I98GhQnRM1SrUcY0I_TZbXdcV4ICC0K8w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuDHQnbqzF5hFi6L_SxcwvDaChHyGTlrGQYK2hIFOfmgKf6oYPPgorzShAVHYl3Y8qaZEB8ukT6YD-AHWGK2JaJsQtFdvKSM4d6ZiOBaBSkaD6Q2MccCIDzyC3023h_iCEhBENBVIOcREutrRyWMM899bGhSCGosdr6cSXC5OXPlUYMq7aWv8Iw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlRxHXnPgmNR_7lDdlOVhR5zr246Hy9T4LWsjy9zHaXZjB0hvqBGkQjGI7IrRqPNUrCxv9EBZmdRZtn9Cluarqn95-CWA1eNstENjaOvyA9JUOR4D4gL_OC_J1YxrIKbKEhDOZsS8EPUCYjo9vO8OaTHPGhSwX1D7un1ys3v-y4yS2ahyG6sdSA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAADbyr59pRiipg9y7I74rsnHeXARrH0L2QKxK9kGf6VKFE4PV3pvGqzgiVbBnXsdtuo7ZNMksvzDk-E3tL5Yse4LTgKY76HHC-kIARJxQnkwQAf1xnlqw1JdBm9M9D0VFXEhAzEchARNQmXDxDGmURzrPdGhTGxGghkP_zXrk9dfWWr0od-A6IGQ&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.6,
                    "subcategory": "localCuisine",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.61966260000001,-90.2130344&markers=color:0x01AF66|38.61966260000001,-90.2130344&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Lands Inc",
                    "category": "day",
                    "date": "2018-06-28",
                    "startTime": "1:15 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.60851530000001,
                        "long": -90.2727879
                    },
                    "photos": [],
                    "price": 2,
                    "subcategory": "shopping",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.60851530000001,-90.2727879&markers=color:0x01AF66|38.60851530000001,-90.2727879&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Lafayette Park House",
                    "category": "day",
                    "date": "2018-06-28",
                    "startTime": "3:30 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.61439839999999,
                        "long": -90.2149594
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI5_i3IwRyDpiRiHVUiHd5rdUBJYew4pxc5d0SSWON1jc9lYnKOwBvuhbWV0apPwIwyZxWNn0SZt1NQZiZaVcU5gd-bLG92crYYcKXSy0J_GEGTqSROrNPJmqQjHkKovHEhCIDaaVNCo5g6W4JKoBwd3QGhQd8nj4B83rWgW6fx6qe0nGS0inQg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAf3NG3AoUCqya4lC6gI0dwzYKYMvFCEuYxv9DG0prsKcpb_HqvqzkOfxczPm3T4k29gIEdWOGRKN2RQCVvQrdNJV7RtxxiGgdi9Dzs56V0DCCT-J-es3iXZGjNyYZEl5EhBqgoQMJ44zYn3BC9AIKDdZGhTlfJz8I6XntSTA7Ynt8_bOZWhCaQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAAwV-5q6atbRuhAm0CqidXymzLVefK2g2YqCRjoooHHIKLBLRANp117IWkj3ppkuzo5g-fBwKNIsHDH80KSQskABkHbqi5gO1tq_VhmUhh9BjSde-IjZpvvZMh0PsPvk9xEhAFsSo5ZgP-RyodDkX5vFRvGhTbncwbdMifPJqNnsz9XOw2wwT1cg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhMWSlbt4HXqL4OnhKWJKpbW1mBokJS_MK44jAFdnvDC_PyC1wG72D7LAMh3eo2dm0i_FEE6XokkQt4hOp1xx0jY2RH7nES544ZNpNiVHFnoWx-NrzpZnsXshT4VefPmoEhBTBa9en8Sexj4E67UB24u4GhR2-uQvDbkaXreDdozauRBU91fFPQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArLZIRoOyVhhZLhFpCI6hJIisDZjoWeXNxw6WLQK_KPgaSv20dOTx8WzdPVlQqw_SNnPZ94tCn_muljpQTOylzJlAvCeEGegAtJzmyHfAQ_PZ_45HiqIpnGR2UwwTUOMWEhCLk4mlSDIE9MUw6TLiKW9gGhTbQMJIxS1fTf_lFMJ3Zi6ciKlseQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAU4PAGH2JSE3pzwvDBzhBJ37Sm5gStyJ2rsH-sZNAcZvrJg-OfAeHKac-ZqTQinSgxBPQDuB-v_wFqxEaZYxSxF9GNo7a_WU9TZGjWyOkIXO17srI12PZu1BEYRXpDxpSEhCXZ3RflpdXR8b9gXz4wc8xGhRIosyaIlooz16MpVsIOZMAw3QweA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAaRsrwaE2COpNB6humdzh2FVAYhlhLrabcetfJJh0IUkiJ2Ui-4uoB1VquNG7Fm6d4Ee_VHN_D3asBpzehjULWLiyeXntQDjCJUXCIsiHi-C-eDELXHmVy8isMSmidd2REhCOCIINM1Nn5ryecn5l_i8fGhSYfOVTN5IG3rn6P0sErAh2zs0XsQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8LLcJfmpYaUbtaPQ69bg-Xbon_T2vH9EjoGcKVAu5AYpdbBtkTqUt4XZsAaZY0NrppMwLUPnsVpJOrNSdHbJDRmkcjqwAXkpV7Mm5LEl9sNBle8iHBf82_fIu9KTuN_OEhC16iicCBaqh_jD_KaSohZLGhSW4lM8BY7T16ntzr2BUmhXhx0QKQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAce-1Fc5f9My9p13mKxEpfI_c-ABXdsFKohBp7A4jWLBtsH2PjIr6B_91cnOx8rYIx_1_f_03SxQYDut92r4eBheps2yBXVxGN-OasaM9nZuiuv4y8gpPPj4tcyLZa0vBEhAOwTHaudCSR2pd26ym8y9-GhRnClpyAxi58FwgyVjSZb88ajKX9g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANU94DNRe0GaMwd3bmjgJ8_YbSm8Y-42htBnHtTVW_72z3ky1G3hUcwITY6iH1ZAKuTu8kyCLirleRJjNxn7U3zFYD8QLByd_JpM_G9Ye99GNvYYor9vp5Y3gt6nJPaDxEhCYgc3SRJQ8uWDX2hc85a-jGhScfQl8Ur5bDYqhfgQaPpPmO13YsQ&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "parks",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.61439839999999,-90.2149594&markers=color:0x01AF66|38.61439839999999,-90.2149594&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Mastermind Room Escape - St. Louis",
                    "category": "day",
                    "date": "2018-06-28",
                    "startTime": "4:30 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.62941199999999,
                        "long": -90.186891
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANxTBp800anLkQPEfUsxOP3bCPtv7ZZZkVJYJfgl4mMsxCjeSylw510KMcO77k6dN-DMBZ8jl8RwlTYe8_rnIA9S-ZRGxOBHLexgGOfFgJb8oCll253x1s0D-PiaeDcYXEhA1yp7fDAFidfHzDVdYHYAHGhSSqJc3ztre3fAxx8aXRFkcOkxKfw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlFFvKXz-Yo0D8rgCmXkCy4vv0dseRLBlgumS6y7u7OuE9eWk9lZDnK-ysJH8YGsuC6hEagH00pDpz3bUwRsfhUowG80sMyO6LIT4lvnzCn3vc1biG140-aSZY9-LF2lpEhCwUVnxtt-YMmzhicZENhVjGhTqC5CW2_yz5_g2sT2zR_TDWrWVjQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA3jM0wBpRnidNnTssqdVA24KDhHWvMewwgn-nplXQJWjWmRi8dkmH7Gu3MvxCVOCJxDdQvPnUALc9xrQ8KhbaVBC1G89zt63TjwmNxw0kjyv_2wRQGsog9Kd7wYZqkGgtEhCKVxKD-yQOElB2GzKsj-neGhThc1iVSawbpP12rNE3vkSkD1tXOQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAOch8xoly1-6Q0910FV0ChiXj2FPk7DlICC2cfr1JoX4VAvRMzWSWUfSKYycqequdtMvvQBW9bb4c6942LBhvTh6OJag0Vk4o8_9XJRlFfeVm42_3z8371rPk85s4SpodEhCOzAuBSSo93E-K2TS4QvXbGhQVolIXEm6gawTGslK3L0lbQQ9wow&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANy7hjd408ioAvm84FhMyPU-LS13_bn_BkfvSxekgxpN3lUQuWZ6-AYDiHi4b6gC6y5Q7Ml_X9JEBahZzWQuU2otUcVgw2mBIyUbg98u0841LagbvvtuhncUip_u-P32EEhCMmQuImEOr8ltqAwfQHUvRGhQZoGv3LiQE0dUuMuUxheqJRy_VlA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAABzLMLotn3CTU8PggaJVjLLqzpet6upDVOBMGWDSUE-fXY-8goOk6Vra2-mKQzJVDpV2suLdYOaaW2Val1tNthT6X68oauNDyD0ymO3kLjDKixg52hu2ypvuR-hIUKAOjEhDhAKiu_16OJr0FZk5l76i_GhRl82oF8G9KlYYhU6igMbIvV37jJw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlkvm1boTWfcGWvsgykl87njqrYepYA-MaPCkOdq8YWCq8lwM-yLilQJBjEjHoc6UY06KNQz2n3ssh87QFjwZ7rwugvrDNJNULuJKTPW2RjSm5Pk8Fg6jBUnnHsOwDYvREhCQa04JoVc4_MLOn2rH-PYiGhTw6hA8WkjHGR4HloL6NkYSn9RuSA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJ3ZOuWMECKd0LVD_osZyWR8sv5QD5x0mq4rhHh3EfB_Bemi6uTAvUZSQw3QmMiOOCa7VM5y-ZXchkEzDz5NTF7cn_lHO5g62Nr2-2PqbpDdFOL16Se47HSAOvnD3MiAyEhBW9vatpqeoeep0sfBWqPlFGhTBta3CMjAbuQcxvKfjFaX-vItVDQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATtDUww1-Z4XCifqPmi4kvelrPi4hNHx_pOTTY_sVLdZI8Jfnk5-ilmoHy3I-OqfhFk5gHoOgdpScZ2-Ohbndnn0CtqIjuNOSM06o2qqRuxeEe1uVUzMeJT24CmIb1d2AEhDOvu17LwkthmGNXYv0jLY5GhRGyMnHCQpff-njZqOXhQ5zYBKiBQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANGPmynQXbzkKMMQhUqvnBwg_GWY-97ILtKd0k8mf2k4xh0ix3pWHVgqNeAxYPLUx53DyHYmaHevmBeqOww0AX__usX0KJ_35u9lvzFTJA--AyUFjSynnLsKjNJrr_whnEhBdE9V_mH4k3Nk5gI3AQhuAGhRwZH50ISd73sJp7hIWzlqWwXXVFA&maxwidth=400"
                    ],
                    "rating": 4.7,
                    "subcategory": "activeTourism",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.62941199999999,-90.186891&markers=color:0x01AF66|38.62941199999999,-90.186891&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Dominic's",
                    "category": "food",
                    "date": "2018-06-28",
                    "startTime": "6:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.6156671,
                        "long": -90.2712301
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbk661cdbxZe9zH2Esn9g1IklMfDV643om9R9em_iL3k6vXZE3353qCDwnH4To4FMxIbGPCYgYxTPo4e9xWzCc_HfuP1TgmPAbet6ckqfC3y65vkcMzR429QdHsjWalsEEhDMITp-yun3QLjizzDPsUWOGhRq8AN0bOHpoHUdRzxOzdN2BurliQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASruwh9O2EzL5kIqw7Gs9mY-dR6i7v6JWr2Qy7jRs-RY7iyCRsHwO1JH6ssb9VFzKvrjsRQbG9emilgsTTp3qN9SALGGhkMLXAWO-YEBMIsBRfaSjHsuujkg9YbFvjzgkEhBxc0eVp1vVi2iKhxA0eDhRGhRoDxK5ANjuOec4XDO8GrRZE5r03g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdVRZ0S619jkL83UybPYzJscRBnMu-RsauweOS6OH3NbKbkEepY86zH1GkpW0nRu85GJsLf7KKCipUc6nCW4Jh90ZYggyuhp1PgUPtv8DSvzHeck1MUQCspqoTc0CpWa7EhCwc3K3FMGBXIoInn-ZqGCoGhR3swJB7y07zF5GldCuQmRlyYP8pQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAZ_ypW4kn0SNpu6yecz-MpkUV-DVdQjdH4pVSul0r3GXcIZkS1ohRD0iJRET7-0-pwdjenkKaLYDmjFAuM_qydJ_6wlbiynLY_yzDwKZOaIffbIWXiRut7tXTjzraqhlAEhBN4ozUgP3rP5AID1-KUCrWGhSyZaKY1mUS4oY8hh4KWPEZ7dpybA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA54YU6m86g6q9k8hJlWcKYHE4QfhRBnjs3d8IgvgbvC2XLRTHfEixMTGPVcbFK1tLMYiEr4g7uTmxMlZSSM2O2sHkFsYaVvF7VW4Vh7ddsiBhxg0pLYNql82sreflW3M5EhC7Ame7YGWqPa231HmEHQ_gGhSL6mi-G5u-qdFvMMQL_ZoA4SHHwA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEeF01dyY3uWY95XM0UF-rTS3VuLRCs132bAdhADVn1H_lhYuzy5Rzo8_vcfTaa5fVUt6lZ9hzvrDtIVGDADI8wNtgCTwmenReZOiJ-Q1FxmPDqfpUTNl8eXQf4FaFt0ZEhD4DPMiYOF3YYGpK3_c9aDJGhRHdZpHEOkzbLJHjfEzn3Yb2KvnMw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFqkv1C4MvXa3KncZ9ZJY77YgvNe9rNJTsIB-vEvvua8XXUQsccW5ax7oIV5vaotehaoIWIDU1u7IcGswuw8TKabxqM0PEAJ-q_uIvtcwHsDYcg0WrfeKXCwWI374ga-EEhB4aEdz5gdeW3_BlwsSTMcuGhRmtv8y1nQuOaRwgz_ctThC8aKX_Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHG-MaCd0SYY9F3j5xGE2GcQxrs1_2tXgUftoki5iHU6yU7XWJhBEya_10LTn8EpwkTaFvPSOqBRkHx5Jx2tfU_zOxj7prkU9BmqI8KXw8NjCeGnCydlU0bkDBCGx5kBWEhAQlhcaDcJrfg2MckPnLrkOGhQL1GdvjA7Zh-jbv1A9o3stsBN1YQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAujcjJnhcbhs9N-5FD_xvsBXYPvuxeaePJGB-dTi9G89Aw27vSk7xiGKsA7wcxzmEJU8JAjiwl0nZZrkGMWMjPaGHewQ52skkDYS8qpGG6kLBbIUGL2tZjK3W8oBuLAUaEhA48tWOjqDqEje6ZV7QGFxLGhQJWhjgwVi15m-LrtzCrSg06KydmA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAftTw5Av1uWxLI9tjAKL9eSvKxD65DpOCQUXkGqKM2DgAdcJz6rrZZ7VFzRu9Bo4tX1xhzf__FjEhnM5tD2Hg0WTFhx7OKd_-7xAnKhqMhPaugEuP6DL3VbdY7ESI_eAPEhAJ9OfUr2OBCtw02gEVbYd6GhTHDROjZA7VuS16IrkrLfnp2qK_iw&maxwidth=400"
                    ],
                    "price": 3,
                    "rating": 4.8,
                    "subcategory": "upscale",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6156671,-90.2712301&markers=color:0x01AF66|38.6156671,-90.2712301&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Novella Wine Bar",
                    "category": "night",
                    "date": "2018-06-28",
                    "startTime": "8:15 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.5797389,
                        "long": -90.27945
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQcBj2213lfvXBGn35maYiE3-_7Pyf5o1L0Qtz0UOvOvPFChFodb42Xxx5wXIB2BJp9XZQiYb-4koEjIzoJE_Wh8aFagdwFjMaKcbG2-cc02h2T8ypiCjQ6snMp0tcSYUEhBoyjei84Gv-mKIUfN3ESKgGhT6NYAPSh_kCuIyXjFK7pvyTU02HA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGUF5KRDzb-38r3ngYa-szMU8xUcwwOttU1PXwMxrEfzEQkZPWF__xJOaTBx_raQRrY3izVMtM2lt5Utte9t-wZjbSSHucZfADkyd4cYDOFNFb5PKk3sVy7sswo683fZ6EhCTXNqs_kg9qpgH9McPBqAmGhQQNlHjsqNd3s2iejprNm5zXs5DvA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbF6-wu8v67KNf8t9hDCvi8V5b4GtL5S8xB3lHW94_j-dJ3fp7FgrFnWpF93KDCNeYga6sv5-bmVmZNE15aMsNOlNYkRLYd7oVHBKSHb2A2pLdHYZtWrVlOaR03gUTdGEEhCtdQ-N-eMm_B3AmgWnn0S8GhSxH9mIdP4Mkl587WXiEH3kpNp1zw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApj-glfYaoDi5nqbFw4LUo7a1f7l7t3IxN2VvrtFPh2s7P0Q9Kr19PZoUMxVPh5_tFMI6VdpEdYdhNB115zc4bjt434BF8qJ7wbe2K2xYp5_jPk7oqgowRWzK21XKXxzeEhDbfzJj5_EePu2dtS3J799UGhQZMofSXAeCJBPB8Hd4Vwh7cLH7tg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAOmp67eIX_5JuyMn_vfSReUSnyKz8fn6BV5EPP5K4bWXKgTgJzc70x6McKRq94Z6X_1UiTEK6Fqllx_wgdbsKpCABM5q20SMk7p4OeXsjtXYYlmTvjO9CDmkb0cC36b8EEhCocIla5fE8vvmqwL_6gQyaGhTE01qJO6JYP4Y3oPIAB5yv1O-z9w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-KOo8KHGA2AaI0XI2K2cb9VXlpVHXTuYTa9be85mXjOqQLSeMObaGZWt_HOGJDqsCZvG8IGVzy9Ps6dgMHjLYpx_xYkmqVJTkvgVpAHV3Wu8ldNk1iwQqnFM6AB7ZRyyEhC8WmqgBy7UiYQYeatuB_ZPGhSYBR8jxu5vNuUl4VnBz8mLh-HKRg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKWymCfB2eoxS6oIvm8ifEEUN07jxKJZxj8ztsGDt_4ACduaw4NUZjiZb7oFiYL65qZk3_tcHmttCh3CZccW1Q2aSxFafJhhzWJip4xvt0GvBHYGNDXT7iCKi1XMHyvaDEhBclNfl5TLD0PLSMbQYSUxPGhQ3sAjHbtGR7yo9zDW_CC2dtV2Sog&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2em4BOq14vw8n7aZGVvyxWo79_0OHESAxLiA_UBSOM_CL9hIdzgPaotSH7uhv6cLRarFTBgXo_o7uFrJKNzm7RAYOVwvt2VphWv29jetPrY_1MMV7yOV3s-wecgMlEL2EhBkCFn6zdART6-bOfqOd66RGhTz0koqyvpSEe0eJmoNFDtDx11bRQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYK_M31EVLnkqs5HN8LECKnDutPgyzgmQuccKHuWlWbMDbhOkDQaqZDSAo1OZd0YkBULlWAABHIH8cn_ljM_mN6Y4ewG6SRNECAnypILFEWlEWJhFsAGYwg5LZwHrwrG2EhDY7RtIuLNuZm18b-qOVgY_GhRSBhicJqPh8BgfU2zU6WgC587rFQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYj6zeOrBRDOwq0jXik4f1PLOu7y5_cDMO__9H8gy4vJTzJjE2t6gBXW2L7A46alwPcEQoQaUO_YoYc9LFBgNY7NGsmKFedqw0XwzQC_E2YXJElNKbCMET2cirpJY587bEhAPUJaI8t2qbnklVyI-EGG7GhShgaW-f0HdPjlS0Nhan75HoVqNww&maxwidth=400"
                    ],
                    "rating": 4.8,
                    "subcategory": "winebars",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.5797389,-90.27945&markers=color:0x01AF66|38.5797389,-90.27945&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google"
                }
            ],
            "date": "Thursday, Jun 28"
        },
        {
            "activities": [
                {
                    "name": "Cielo Restaurant & Bar",
                    "category": "food",
                    "date": "2018-06-29",
                    "startTime": "9:00 am",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.6336648,
                        "long": -90.18493219999999
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAgVNZGvn2uJS_QYff0_gFSX6bXaLO8HQrdWmsvCzbOl1SbagRT2M_AZ3qnNQ2SkvSLqT2yaiZUiHLxxHQFlHeZ8R87ke-pDcgJN4F9lrdZtEXYZM_Wwzv_tZ-DvT0tIjNEhC5Vh20QrqVKSBYlGTuSX4zGhSme1qNFPzfWtNBKKMqb55vZ7ZULQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnHc5F54_Kai4C64etBJ6Lsf7RO_NcyMPEzJmFp3doxvOPaT5VoRi3OMsrjV8ke-wKpajm5JIp_0jBPZ4AgjXVmDzOGEcugKOrUG40KvkmbMCyl7qo1w3tNIZ3BBkEY8HEhCNd5IOhY868__HBqvgwhbmGhRKpHOCeoCYWCAz_gdNGFqjbRXIAA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPjzH4e9SopMVQlIciitz7bhNzl6Xa0_KLlFZ2NKtcVCLdoDZzz7msgK1wp8gMmYykvNSXn7Z95E2kl9BJoJC5-K4U_Da5SZoqFI2mzR7A6kEY1ep_GPfec_o18-f9eJjEhD1v8dtc2vTBV9NYxpWY1ADGhRoWfJBuM2x0WOYLOK6mvVUef-E8w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAMmH51H8wxgZnVuKNa5Ssq5ePt0dqy-CQ_wCEtOzEv0e2DhLddaZA3r6IHo7l2CKHrGD0Y9CSWkqaqmy7AIhi84JXDodvWvVlzVRxN8SY8eb1g7sNy4v1lVFwrpm_lbKIEhBsVxJJzF8mHu9IvFVtgGQQGhRx0ttY0lLvh45O-gQTDsR-lYQJzQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYZcmLdBeZKalh6oletXqlgkFzUWZLDSsKUyvw5s5RQsQlGGDYXD96eLuCLSWEgTPkghxO_wJWZPG1iCZECVWqA9ZmcpFRrDm8r24M7DC4nLW_PBehlPWjyH64SiOqDbjEhCkxqA5GjBa_JPwf0E7U4gJGhQ0pVgl5GjBEMbmVnRvRpTPZPdLew&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApFVpRE2zcGXLirZE6SMSlg2fdjlkMnHD9-hJKTCeEHKwR7GSgzdDwS7XvBUhLv7K327lK1FYV74Ha1IOmT7FBTw9EIS_PCbDTCv7TSYmethFFStGkrKRam3H0MZiT6fNEhALYvkWcadqpBdmOUxZLHVDGhQILr-suFt2-wfAdmdB8MzxX1CUNA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARfMfCrSbjZgkb2CEviiRUk2UtxYW6KHGMQyg3YJbM4g1pDc1pc6Xkai6KHDPaTF-SBpC1VDio-SZcSgGVJmUqUR-Zp0biZAfm8l14QbZUKxaPIpmtAdEZfIUpBWjgRj5EhDL2JpoAYZxw9FQOvDGjmbIGhQ_8b8Fjkgr6egPs4xDW1v8G524eQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcXFnvsjD7_r1oJtYmP3HNG_b4JBOsDm_RyuJx1zyDlPlRX4zi1v4LhtJ1R78YZ2osS6c_FLJQdnKJPnevOt_gT_pbr-vQ-FjnF7HVCgfP_22t5obCB6QWwfvDJcueaE8EhAULlzJVB15ojzZo-aWPSjnGhSiTHSsX0sW4YTrVSh6pztI9uEELA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_3GAOT15i03x0Fl1-RTKf3CaEVYA0A417DmhNDQ2bMQaAZVwLvb3eFfgk1ISBPoLxuZAZJQyLYx6n2WIObtSnPSoEKM83jesrQC7cBb-f5Q-NrY9hZqjgbO2iz_XrAVaEhBQk87hPUieU63BGB5TGtRFGhSH-zS1X6E_PHQGJsWCjzmwJr-u9g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATi-iosUHUz6qkPV3mYxUQ2I0Zf0RZdtCGiZXxIrR48Io5OTghOtymKAUZlOobmDoKkDO7lPuBateczYET941v6soUWuCjRx_TjqQxW8O34W_HvXlVuiB28dpW5HX6P9dEhCOUT8JhZgLvWkRCaKbFvfjGhQJRw9pOT-S1oxotzzLk5eAhiuLVg&maxwidth=400"
                    ],
                    "price": 3,
                    "rating": 4.2,
                    "subcategory": "localCuisine",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6336648,-90.18493219999999&markers=color:0x01AF66|38.6336648,-90.18493219999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": false
                },
                {
                    "name": "The Gateway Arch",
                    "category": "day",
                    "date": "2018-06-29",
                    "startTime": "10:15 am",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.624691,
                        "long": -90.1847763
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjUPb083klN4a4nZthKemfoH3hcTjdnBDQBTx8OOTospMIk3_C-N3kl9KubwwAh2E84zqHJj0qQriZ2aM5s-4TQhw5O5Wsxbifn5fPrkuE88aAfIVgT15kAMSi1v4MahwEhASwM_Uh9IDfLCWbga4np2nGhQVXLQEtK9SVeznjxfEZyEmAB7Fyg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzI7owhHg04IeN1hZ_kPu2HYxVV4ZzqlWLAh0JO-95wnNGomAEQr64Fd4RcbiKReleRlonA9m5ZW2ZA2PyjBj-0jLgvJT3HhYPYl_YY_xvg4wqFMlirDuPFNgzbS1IKcXEhD4JxqV9cW-pE-Zd6s6ErXaGhQN0H6SqVjNBdEXL38qosKM_vKRIg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXPddzMbENUKebT7IIgbPSt3H6d1ANlQetYftLvyIPV9hU885DGPwKnG5uh6GkHgh7KV6rLOTimcg7PY6N2hz975irR1s0fSxFd3hvijjftiLBDevoV_ESh440or_fJGfEhAce_4VTfVpIxTKNnNi8U9ZGhQA0UkEbqHPwtPqoEUcXH0R_luzDA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAj0nIIpWoJcWXlFVcOAFaHD7YhlNGTMjaV8dxstAxrRDgpvwjdbLfC2DIrj7aK_PDUS1MUHvGeDaFYCPMROWfz6tLfITqAm054kqcpBZfAuMJW3oitjGtW218pg8pPaTkEhBoZZscxPgzje4Zez8wnveAGhThO-ctalnf-RVGjyu8Rix_9yZxJA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADHE3Lzr3GS6mIrkCXwRXawjtzkTJu2ba6M7RcjpB2RpRnpVoWc95SuR2x7WW-m2ZXVHzgMXW9a6PNLzm19Nbu7khnSNz58AOS_YXl1_wWkaATw2m34quSICWdG6oPWioEhDQrYRj242o8nxa9bbeXYpnGhQpBo4NafZOtnNLlCw4I3VCDv3teA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAM-UGnosSHDKycQEsaahpb6Fn3v-IBZEiAZ6Uj-8dFHQIScKMZkqq5HrvLGhJSuRKWZacj8jaTyWxlz7sjPTG2U7ciE40Cv1rQZ0ocs-dfplsns7RvptOVIGC6lFbCurjEhB9yIC3YPECRuZO7ob-I3n6GhRwt61H5JbulnP1xT6Uunst4CAFxw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRZAAAAen2unCl7BRA12qzD071QoAYynTVrxefp7VW5-xOkwQw6wm3WIa8bYcD0XsyHuZescUncI0zGkUBQn2e8DFUSSxHgC5yfpCxMJtGIKuMNeoTwZNVP_TqI4lr8_3tvr6mvEhAdjS8RPcHJMc79V16V1B97GhRGzcLRk-Y2zouFOQQzAu5PD1iy4A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAL4vKXp3T8TAytW3OwEZ-XHbdDXPvjxAhKSFdjDIr-QYKSX0EEdq7k1MI0w1d6SH9RIACvIivXwvCa8nqnNfACB4PARda-XfDHbFEwyILX_Xs6y140BiC6cdDjyH4vobWEhA22q6aFjZfzICIYJjTE5UIGhRUpUBWTRFpvvfNkprMbS_IyWvX8A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuV_orcBuUXY76wcChUpc1XCwgF2A_G19IDNs_XSztIAHz_Ndb-EJVqOouzSY1TfaL3GHng9AZX2-evuTsccM2HBbxkkuPdhUFckTT7P95_oLb3r6b_VTE4M5jxunwYXLEhDGnQGGLIRHidLW6OVgdYqxGhQYI3yWevYNoz4HYrThAY4DuCvYWg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJyD6GzIwVZl6WZtHvVi6Vh71qleYMTfcWKE_5WfuCeseIb8OvrZgjuexXoi7F9W09wYsIGd_k_-SVu5pnOx-FhXVMkT-BJBSrj5y4vab37gjYC0RHxsRtfho5rMH5WdEEhBAsLXVesmDvigsvQG58MEnGhQaWAqx7n9xpGods8K04CJdBbU89Q&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "activeTourism",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.624691,-90.1847763&markers=color:0x01AF66|38.624691,-90.1847763&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "category": "game",
                    "name": "Atlanta Braves at St. Louis Cardinals",
                    "classification": "MLB Baseball",
                    "id": "Z7r9jZ1AeFZ4P",
                    "ticketUrl": "http://ticketmaster.evyy.net/c/1251154/264167/4272?u=http%3A%2F%2Fwww.ticketsnow.com%2FInventoryBrowse%2FTicketList.aspx%3FPID%3D2200565",
                    "isTBA": false,
                    "date": "2018-06-30T00:15:00.000Z",
                    "location": {
                        "lat": 38.635101,
                        "long": -90.187798
                    },
                    "photos": [
                        "https://s1.ticketm.net/dam/c/3c2/23f6a973-82f1-4503-ab46-e890539e13c2_106101_RETINA_PORTRAIT_3_2.jpg"
                    ],
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.635101,-90.187798&markers=color:0x01AF66|38.635101,-90.187798&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "startTime": "2018-06-29T23:15:00.000Z",
                    "needsUber": false
                },
                {
                    "name": "activeTourism",
                    "category": "day",
                    "date": "2018-06-29",
                    "startTime": "4:15 pm",
                    "needsUber": false
                },
                {
                    "name": "upscale",
                    "category": "food",
                    "date": "2018-06-29",
                    "startTime": "6:00 pm",
                    "needsUber": false
                },
                {
                    "name": "nightclubs",
                    "category": "night",
                    "date": "2018-06-29",
                    "startTime": "8:15 pm"
                }
            ],
            "date": "Friday, Jun 29"
        },
        {
            "activities": [
                {
                    "name": "SqWires Restaurant & Annex",
                    "category": "food",
                    "date": "2018-06-30",
                    "startTime": "9:00 am",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.6161919,
                        "long": -90.2116642
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlo5b3lnzt4vGZZZDkSOEb7hJspB6rQLOGN0-yi8mmJRn7R5B6um0TqxqI-q5ekST5a-wYRCJ5Ec0gaJIib2zRuO0zJsDhh7b0t82yQRlAWcrJwgwrUvYLfD1hjTqWb-VEhATMc75s7c6y_iifXKpPL2TGhQMNDiKgQz5h4nB698w7lNWUT96QQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAMx8cRI92rlIsSuxzSVvOe0aHrZGrPfHxxXvIimme348tl4NPncBu01RVa8cAB_LhCVD9T8vPrUphbOrbFd8jSg-W23eQX-MjL2VyajGUAEkXqeAbxkUlTUFHRNK0pBp8EhBdTCegr3PVRbqE3lbbXNh_GhQ0rHRg9-uOC5gvd9Zb6txUv3Iyww&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAui3Z7w5CQUpu3SfRJ9Y6wR7d8nkHDXEairvUQvqaE1zzPnIWE8HlVIDoEOWof9KbR5zwPycn26jOAir4iNCCzfkZCvUkLIY1teB5foyLlUbHS4OiVGN1YqyytXnpfhrQEhDwdau32e0kE8QSB6Yaw3IrGhS5zWfjUMMSUiWuLLxb7SUWONtdfA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApytWaPtG84fmI9DIVvZsnSAp3eQsoYzGSIBuASt8pjkOcwqNcfUw-h1W9J6UFjs98lRvLtlW42QHFDF68EfMVbnBM33B1oN5AwTNdbRxQXoGYmdQPEj7Af7xKbqYx9rQEhDvaUp8tOQjyi4SCSyZs28bGhQDAnn4blzwotqIOQUiB-Ti3raZ5w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAu4FQ7vSkVC9xdXNeo2s4VDODlKYT0pGrbV7EQPypRA7s_lEci-9Bd88YDCZUMph4odXP2wQ9YGiF89NxBDUHvMi5HNK8XonJN83JdpanQfGwgfbqFV4n9_yHrX0uG0-1EhDO8HhGVaNnPejRx0vKuZBhGhTPGPwvF1Chgs2DgGjJgDBiQkJKOg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4TrZGP0fZYbKY0pmWbjOJwBMh7BT3jsjzjfGoLe6MYp4-ndR4gk0vO4jEWkzCLBRsOP-Q7vLTX6nlKjpBAEqRzOM4yQ1Z_ZuI9r5EIEmoMhxHJakJ4-WM1rBr8Iivw6vEhDTIm0vRqqLni8wLbceTtZmGhTUUJUxvK7QKg9P7PDgzzGkyKru2Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyiqUW9mLmQES1NsNmWryM29vbchB4ssmNjbIXPDsVkxCshP8o3YJIMtyZqY2wrEc5hryoicK6PEw51PAI3AXSQBUIu_DBFWlEoKo2s6Z9l48iJhvUqgXnx1sNFNUVTm0EhCK8GG3OmzR5wtxSnP-ohX8GhS4qUBjiiFMseJEWK4vY1859Sai6g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArL3K7JYW70BOU76akPCh7hoZHighcrvTeptsQpdZTk5NQ1V2B8xBQNzX5SLhQISAWiH-3wwPygMkHe5ljqQGeqEkYEWjupC6O3tj8HTbk-KbDWRGuj-DyfDNwGzgt86lEhDBb4qF1IOTtckrGNTqTJerGhQ6ruvGggzjRc42vGa3IQWTIYsWsg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKte6TiGsPSqXydt83XMwzQHZUviRX1f4nsAd5G3Gq3AAhNLAfIn9uY70yi3KFBaKHmmHE9SXJnsbUK3BYICVRD3xil9HOFloBsPeCSzgcaNx7kbFKdqHoeTkgBP08b2qEhBz4cCLoRUoJm83yq8fW5aeGhSS-DCFpXzuDtk8H6fGYiQFP3PKgQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAMVNXtlNCKHagGHoLSeMmA0znR-dNKQItY9DGqyAVaR1quYmlSeNkKobL-jCQG-o6sxlItq0s9W4gf_nz-wUuoCWulhY8bH0FyZsrtTxJLo9LrUSc0YFNxSvBfFO4vbvEEhDV6avUJ9X-Zhhb45tdGi_5GhTC0Gsuxa-kYcj_TnNrlYU9lK9G8Q&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.4,
                    "subcategory": "localCuisine",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6161919,-90.2116642&markers=color:0x01AF66|38.6161919,-90.2116642&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": false
                },
                {
                    "name": "Climb So iLL",
                    "category": "day",
                    "date": "2018-06-30",
                    "startTime": "10:15 am",
                    "description": "Here is my description...",
                    "id": "V8U3lY1XbS1ptSpdmewVKQ",
                    "location": {
                        "lat": 38.61491,
                        "long": -90.207746
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.61491,-90.207746&markers=color:0x01AF66|38.61491,-90.207746&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media2.fl.yelpcdn.com/bphoto/h1LEtnXHqUM3uYABZMLOSQ/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/QUsaLeti8j5nMevjZThp6Q/o.jpg",
                        "https://s3-media1.fl.yelpcdn.com/bphoto/eDoeAPnKtyUu0xFS21-10w/o.jpg"
                    ],
                    "rating": 5,
                    "subcategory": "activeTourism",
                    "provider": "yelp",
                    "needsUber": true
                },
                {
                    "name": "One 19 North Tapas Wine Bar",
                    "category": "food",
                    "date": "2018-06-30",
                    "startTime": "12:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.5820126,
                        "long": -90.4066541
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAxdEAnKc3szhRyEhEKkxM22wzJoeshlL6Jy3XQrmpRJMs_bsboQoRsqcG7_5fQApbbPHAhsQZzZ1oVTnIVDeHL7CzPDsUBQzi3xZFbroHBD9dlcP7KywdWUVmGLleJuVCEhA-tiPplny68YBuWGQVEP4cGhTYHwDwbFkqEJSzZTYZpC2a5RQSPw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQ07zpVaHzCfMb7q4i9s1uBusG5Vehbb3FNDKKWbRWGHOejA98KQ1rPLMQJ_LcKolpdKGq8ekn47yx_j6_11ivO9KvsMZHqN45HrqRKlKnK_zd3aLr9pe8itZfP8YSmR_EhAa-vSqy5IX8xmoyim7C7JAGhSIf0nF1O7po36DDY_OEwVpqTHbQw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA0NEpNH8OJmfxgOsUcVZkTwRPzNQt2C4JPgMbEsE7RAxBAF_M7dFmq_oGle9_lGvFeshAV_BKv8e1YXHACVTVbSyNwHuSmW1Qc4wYFNGlJTdkbMEd-4HRWl7G-ucuZSNXEhD3nTTp1rItDx-k5yg-IePVGhRNCFJs8mmZijA4cz-i9E0OofEzDw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzWLB81t6G-g4Czty3tqQumxbchAvHL4hUxktQbsWAp3HP2InDZdQ_F-yldhZJY9dJHsXiJkl3LG72TrTgNJ-UkUCbb6Ayv0uxSK1CxjTEB7C_oeXNhRpjY27fKElo886EhCT2qiJnEHWMVVxSlbLoKJPGhQTYJqjKGL5Rs12CB53bkEVDQgWRw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5T4w3YoR19q4m_XA9e_I4rfEopV4V_TpqJBl4G-R_1liPCL1Q7VbNsiVxIpL8-lZxBQ4meCXKjd-BSzzBhqOyAWR4y1rcsukAjKNTA6XUDYR-JqDDpiGYI3unCtKPVswEhCgQvEsn_kZ4R2Iyx0rGzHHGhQQjrEuDfA_oMuZhZsy6jsA3YIbhg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUV-LtrH4usQH_G7Qsaa6QfwtOBSWaGZfPuul_O6r8mJZ7z2WfgT_3JFu-3qmdzzLlRMBhFQjxXrfvWqBmprgsMyn_r1_sHBsDnESoPrXgcyQTGTAuUZGgCX_Pq4p0nQhEhBrTuHEWXjWlNOdY2F_TW_1GhTI0PSwkBpBeps_do3POkZJLzn8dw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApkrnX3YDFXsdKLinpM1qqV7Fv7Nyr3CH21xG_Y11QpX7lCP3W0-KSAjB4DZdrDjOQubGgq2lgs9GXQyGHP6mKPp5iyC9P8kQ0ISIxwei4S92LrBh45dH8GR9JRVsVqHSEhCSS3mXU1dHzhbA2CBpB1KbGhSW9WeUsk6vPLP3-Ba_aXKRdxMWXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPtHozAV04wT1LmhF4mkBfZQXkjx8ta400G5JnX0xraGJRCUPqDs2roMChS2wrZH_GMvM5aQaYm3qtTXmO-G8zs3Xld3tYS5uEvE5W5TZ8Oz7a4gNwkk_PZmYbzLQGm7qEhABk6efO0HQpIRW0IfyCf_SGhQyOZUmSIgtHnTmSSgCqfX6f7pv_g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAN1f5mMDiL_tU2az5ZxmKLYM-SIeCSeeyhXCRvzyrruDgtiqlAhGPHJQjNF8aWl8bZTBwmRuS_-cidrYQVctEKI9aX9vVeNqma_zLynjBA0FYeaaivWXmTXO_I1ju23xQEhC1qDX-fpMa7aCaWZ-unN4IGhTyt8-MOv5yzVxTSlcOCGcQMYTqtA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAovMQqJ0KQ74XWxuRGoxu3i_4jB_o5tPY3GEYQR2EpbQQcN569i5e_AxhgCAj5Vx9eDz98oKWikEBIZM9KXGlWEseP6VjtqU4Eodcpl07fe1nnJA-J4DTq3Vs9tDlLcXpEhDLvWYETGuzWx0e916fDGJqGhTAFmiq-mXLHConi123g76btA4b2w&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.5,
                    "subcategory": "tapas",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.5820126,-90.4066541&markers=color:0x01AF66|38.5820126,-90.4066541&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Escape the Room STL",
                    "category": "day",
                    "date": "2018-06-30",
                    "startTime": "2:00 pm",
                    "description": "Here is my description...",
                    "id": "uMK5DM9KSRT_Jq_vtcJ5Iw",
                    "location": {
                        "lat": 38.63215,
                        "long": -90.19716
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.63215,-90.19716&markers=color:0x01AF66|38.63215,-90.19716&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media1.fl.yelpcdn.com/bphoto/EsV_plZH-Md_VL2ra5zzYg/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/0G3TDpFkh0rfTm0wrAnSiw/o.jpg",
                        "https://s3-media1.fl.yelpcdn.com/bphoto/0sr8BpDtivqUl4ELKz740g/o.jpg"
                    ],
                    "rating": 4.5,
                    "subcategory": "activeTourism",
                    "provider": "yelp",
                    "needsUber": false
                },
                {
                    "name": "TABA Smoke Shop + Novelty on Washington Ave",
                    "category": "day",
                    "date": "2018-06-30",
                    "startTime": "3:45 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.632107,
                        "long": -90.198661
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2f3eDtLOlPhFVDSLd5LT-901_8jtvZHU0gYAu75hyBo1Cg43k80ILb8YfRKIvRS6pWhUDhAG4vwwFAseBm9h8wVVuoo3_7Gs-pUGwAO8bJ2-s4IMB7uXSVmaNrU-rgY5EhAAwTVB0hKawIp8IG_Dbhq8GhQNfIXKQhYgAo1DvNLMoBoq7DoQcw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYd7mIEG_fDrxYaOpfwm2qYTEnLkW3DfjBMBi_iUjrVtpI8lA1jzGP9TR9uy2iCyR0H2ZrCJFQcN2EfKRaRFSU1OtNrwMt97qhzfHbecxzT7A6z3qkMuADXo5rCDaxM6sEhBs5BFWHb3ikJPqU32FwqriGhTnDR-cKT8RIA2RXet8p3-LpO2zbw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiNK6xDO0jipDbbN3VAKrn4RQbLV68UjhfprgxDArWpLYgEOlXXeSC8QhBEeOhwIbX4962a3zDawH3CPhFjhw7bldoOpw_L_kZQaIM9sfHEw-Z_4gOOlh9v_vST8SEgwrEhCGe-JIYurW7W8_9RxPT4B8GhSZOSD2vsoON_KipoFeWUSdq2RN1g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJNc-PJaRXxgdq3A2LeBeh2k9xWfaIYrV2hpGrHhqPiHBCSlSOQSpfkURqESUNQxVyDpHmz1oq-WNEgUR4pluMIKB-NL3ftfVjoGgxyP9fK0xj8iV-2wY7W4m_FjgNry-EhDr3NsuWCJRhhJBfD4svEmqGhQVfcqYZvyilyhzVYKICUJx54WkxQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADiHoINlDRN6fWmm9mgmemiY6yyGjia1cVaEICnKCNMWA14n13Z2ph_QDTMRdaeKUfTe1nWq8hTyb3iMwalKtvTg0TG1FBI-mnDsTFHwXxb5tPE3SfA6qyAut1IWIX7ihEhDSOUAMLfLKi8D6uyJQY7vcGhRBJDKh40zDZl5Mgy12nxqbsuv8aA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAW8FHhmhBtpF-M0iQZ7Nbwj-qNzUOkEwHBN9drNpYNP8tI98soqVS9KT4xzba4TBuBMN6De-VN1Szp27sYCscLazWRh8Z89Hv3-4l30Oq3SwfTM8JwFnMGxYyXPGEfWw3EhBdTQw6_kqsWqA1LcLCEyrTGhTz8sHWU5n6Ztj0zg5gmnOw0aO47w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAW-A3iek9n0niR5SrCVla72TE_r5Y9Y3eWxzu7Hsgok889UEVF1RIcJ0wUlXW7Ga19Gygor283iaDLZIG1zc1-QsDzyRJi5cLvZUI6h2m-YHW2jT5tNR3dPRbPqMW7Q10EhAG0bPi3ZUmOhF8D0neB-T-GhTFgTU00UcYs47IqkivkgLiur4WKA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAaDGNw9GCarc3qbiNpjkcMY0G7eEexYupiFcZQcrLeND9z0vjde9YdTMcViZMHPLGi7GV_pUrVUkSqIy0FhXIFHw6dhN_qgXeNYHYxcnLuPqHgj70Gie_ZlQKeTK8ZhJpEhD2YXeInPthrcgEwRYC4wXnGhSdFxFMIiMqKzyh7eGYb4dqVT_llg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAL9F7XfUren4uOttxGfnwWXHkq4i-KmZKCILJUTR2ClvEdlrh7qYBo1AV76DyP50kh-8V57Lxm1LDW4kKtvD8-jqhsQkEgTQCVelEA4qXbHyE_Vc7Ty2mC2ZKA4WubX0QEhCZeBr1am5mRomQoRAc8eiYGhR09eCsepe1ZcjQF5AJJKGFXEbJsg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1RXDz5kEkbTjwpMrZRqM8QHXEoT0LyS4nDUUBObdd0lrCzBqVVRJ0jP81ieSk1geyxTWJONwmFswttMUMbayppIDzAeC0xEoi3llUHRvD4zFAm46Yys-LmT1Ax_nUI5VEhBsYocyYNjX-ImrGAV7wC5IGhRsPvBddKbmDda0sZ7aANtA0wu_Ww&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "subcategory": "shopping",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.632107,-90.198661&markers=color:0x01AF66|38.632107,-90.198661&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": false
                },
                {
                    "name": "Anthony's Bar",
                    "category": "food",
                    "date": "2018-06-30",
                    "startTime": "6:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.625029,
                        "long": -90.18949300000001
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwevbnoi09BBFiVRqoJkjw8899uPoqiPqNeVaqdqmITKaMq7hHceyxmSHCTsGWDAevkwYuAXsqwWPotdoyzdJ8_qw-RZgZqHHwlUx_Q4Rueb9d6DNtj2ci88RJsyy4ZqsEhC6vxfRQJAgOC257DAC7gjUGhRsUvY3KTFvMDu-5rszUPxpCyJ_8w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAQprHf27uMMYCzcTEYuiM_OI-BjUzqEIK3Ar7jqwRcWZ1L2QZQ-9rdetnSusel0pS9Z8wiYWZsnf58Wv1I7zn65Y7kl8jWU3Nm3ZAySNFQkcljeSwxPhieWa5uqVTW-dEhAAtY5Cm3xjzfQz6Yx7G2YDGhR2wPz5VWczCR1ldELQqRqUw2ta7g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAK3qvwfjluuJVCVb13P2q_I5eREjTLgyWkARiLxbIKwiJXs4Z-Ig8JQxAal17SVmx1zOF2OTCytGdI0bu29K3oU7aIujY7GD2aHFrTI1Cowl5Hq1ZQqFu_YPg1G9prqeREhBTulz8Ol9ssIjsVwW25ICzGhRHJmzAV7HH9ocjZ9oGGctBsS8YZw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGGB-M66pZRi3wG_yeXVsHLbiO_Wc4VgcFgO_OGVpoULdfQ4Sz5EFOdiJ7fztEoSY_iJfwum4Ml9fmIRZAxsOXTB6U94nBVWU2aWK-3EIIU64GqI6SyDxOjoDEawqynsqEhBP1njO9JGEaqmvZxhSCt8CGhRC4Av5RvRzXv6xRu8Tt5m7j1r35g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-7LZOEPlL5YqkAi6a7msZQu2lgxwAy_5tQMZah7wIKxb9uyGem4DozsgMSEwOcE6aECFGOCeQnTWhqDrlzPUsehFYBj7rF_BVNWb6KL-4EQTKoqhy7J63gITquq6xbAfEhBEuWk3cfUeOeVALYCBDQ80GhSb0roQ983rghtL8Cf6Q3RD6K9GNg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwIR4kD-kR7PJSw-6safOOfRQaCX7hFVqI6PysseyHjGj3RChp80MrFpBebl848QtmeYc4KV8Ru6Il_IBIBX1VCJ1U_Wut3aaUjAKxop-i0htxD5qIDZqf9scoz84qgQpEhDcAVK6s-XdG48msuAxC-iwGhQn0M_xkjQFqYuKfne72pK0a3jLkg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFXS2YcOjftLbK24ytKi6C89H6nbSKYWlamsYe3XCL6wk6FN7pCFhMI__9KTYjzh4GL57230iG_GI2PdUsYqrYriHpVa6zC_7NUGsFIPnbnQyJIbkeyMJII9M5YcMM21YEhC8NEneCDtxDuvslH6Tni6HGhTL9cDmkJjTdR3DDEqT3MutdlgK6g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAos1EOKOhAR5rk4AeH-MebcjOi-1N57e9LK6FylxiOE1eqH5tAUb-2MNDwevEECx7C3uCpx-62owXJj4vJp2jxx8CsvnyqcrwxPV2i6dMLR_zFQA1K2i6-ntsomHhBg7VEhBgomRXAozppk-8WWDhAyNUGhQH9rZL0f99PqPl2TqBuxE6A844kA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALbsV6BIRh_lrKK3yci4KgX2iTXQXlqNvly39xukox1Jb-AmS7wOIqXMLTbiMcH9SxWVlNJs_5kncM1n53r4jFNu6nDK4te2jDtgAurB8fUGsspqMkU-rHkTScnekOP7QEhCdUaUnPDhxrQ5FdC2rRtNtGhRm-M1zmdgesRlYYbZhqakDR2-6UA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA0i3Z6cROH-pCvwjH6WaI5Vfqv2MQrWw4fkr8bSJ2Gq0eetkyis_xK0-6mpMhdSNsBBR5j9f9sIbjrXny5xrLwVMxhqkMt9zm60qpuOFhiqKP58N2w5CKFbdm3NXQ0pudEhDDrljy2u3YIpMiBg4A3x0rGhRUIrWtewNKrWU7HS39Fd4dpFqd-A&maxwidth=400"
                    ],
                    "price": 3,
                    "rating": 4.6,
                    "subcategory": "upscale",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.625029,-90.18949300000001&markers=color:0x01AF66|38.625029,-90.18949300000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": false
                },
                {
                    "name": "The Charles P Stanley Cigar Company and Lounge",
                    "category": "night",
                    "date": "2018-06-30",
                    "startTime": "8:15 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.63106399999999,
                        "long": -90.19488319999999
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAaqTvXbSG92HvDklHQR-jjcfPs2ASTtmjHDETUqCjsIjePw1X3jtMoeRc9zJt3ZqdCmjo73zdojfzwl8hztRPBy5pVoREcltPIyN7wq_e85OEgq46Iml66EELrJTAQC--EhCi0p6b3nw7Zi6rTxNVy_VFGhQiu4yd3JMmZqBo85L0OkdGIKkgAQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAv2tqzBBAavJM3JmX-KkgGlKTBVb0Sk5ZyZpL1lz63GPGosJWVkuuzp0Er4epBNwdQ5UiwkgEapGAUUVbCALdqgqalLkBuZGbPDJSIb2J037VzaymCyLAUS9paHaYUEhcEhCXd7yreoDYXUhJt7I4oMuoGhQbLRLHsF2WhxXxEyb7LsayEr4qvA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9i1yKNdDJI2cOV9RQSDcgnoHx-ainbhQCWfjcppcw-hPwWGEU3PfuqCQhVdjuxiCVN6jxmDTju7XRgWRqmE0nJdDsVdpPSOCuLARZscAYgQVCkN8jfE_7rrMAmnPAZWUEhD1WvbFFmJM_OZdAr7R4pF4GhTeRWQp0SvlSqrS5E-jHwQ7sGu_5w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5j1NwW8hLpvci0jL26aQpWOI4BR7NTzuEblDwA3X8vtX05M2C7lYoW-j7FXQX6npIlGBNkL3w_ZkWAjeRCQaX6yjcbGGzQouXV0vz6mfYJSYBJZBtYn0zNWSmZE3DeAVEhCd4fVYeM4o4Q932OsEU-dWGhTAoqx1uvZ_TP7E7PbCPB6uymjmug&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAABD7cKX-4tywlMb0hRYV0a9e6DzSPWHPqsTFmc6NdQiWXAdJjF2-qDfiOH9hndEPzGxHYxi20XNn9zsT8vr1EQ9grzHWAsGNI2fQjjX73zYPXCmX-TKKYkd9r4bWC6li7EhB5DysR0p2H50_8jJmSCiopGhTWawbvjrZU7KFl0_XhNKgLQsAnqQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANLGgd7Z0OrLOnKDL1WtlzVGlwb2UfVFXhssfSaNcenq7xZ_NyALYld8t57Z5q2jSGEEWltaZAUihPdKZ4SKPB8l2pS1_79F60AFzSZdSpmYbHp_7R_ZOv7RD3ifpVC4UEhD7GUpSUbNdzL782262PSnoGhSE933S6gGZei5MsV1I4vNwiM-2xQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArwB3_SeFjhf43YKoiuLvcXFfh0LFIsmLyjX1BQHkMjl8_vuLvdZ_E7Mhx0t1fORIzaa0Q8zMpYWH8iHuVKI2iHJjPNGpn9-1SEKobLs0NPSjIKT_JspNaHv6SzIYF460EhAB8FcY8DO1TxX67yZOlnikGhQUEuwrT2s0KwQ8dg7AkVcfEuabSg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAekzEBlXL3T5KV3NuaqdNTEINTo_DMjI4dvX63GeQVbX5oh44LeZKl5y1xRCcPEj2sKpIwP8DT9xS2ZOtcwZcFFFnA78bnWvJ9m6EwtG6gmGD3YeUixlRreGWp6jS8Ec2EhAT2DT-pD-R5lOHhvATLt-2GhTjLWn052zwOj63ZKg0cEo6XqZrzA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjncS46mAplokCU2V5stRvj7pYmW9FsuP91sPPpJIII6VwPgGgpIvfj9yIIibqDvS4ohOw4yHSVWZG3g_fbFGKMpDA1B3gSpkI4n88uMI5wET74aGXZjKfydizDFHiYrKEhBWQUlFuBS2wTu05WE6GJvoGhTq2m8uLsYYyGgmDCEnJWoTGSAOFA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2mq4WGFI4TPcNqEznqSHON3H6l_l5BuhfmHutAZoayKG3voSHmqmNlXMVHk4NZUHftHywFMkTm_4kkf3WbdyvYrnSSzOY1YGPM3VHbmY-hH6OzvUXNtBE5iqoGyReHjhEhBl7O6siIXkiF9t57ttCCcUGhRlwgMYeVhhj5YHqWDY2W45lTrxrA&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.7,
                    "subcategory": "cocktailLounges",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.63106399999999,-90.19488319999999&markers=color:0x01AF66|38.63106399999999,-90.19488319999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google"
                }
            ],
            "date": "Saturday, Jun 30"
        },
        {
            "activities": [
                {
                    "name": "Au Bon Pain",
                    "category": "food",
                    "date": "2018-07-01",
                    "startTime": "9:00 am",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.6310884,
                        "long": -90.1912375
                    },
                    "photos": [],
                    "price": 2,
                    "rating": 5,
                    "subcategory": "coffeeShops",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6310884,-90.1912375&markers=color:0x01AF66|38.6310884,-90.1912375&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": false
                },
                {
                    "name": "Levine Hat",
                    "category": "day",
                    "date": "2018-07-01",
                    "startTime": "9:45 am",
                    "description": "Here is my description...",
                    "id": "4-QZUSNxoKj4zg79oyNOsw",
                    "location": {
                        "lat": 38.6324237287045,
                        "long": -90.2001068741083
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6324237287045,-90.2001068741083&markers=color:0x01AF66|38.6324237287045,-90.2001068741083&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media2.fl.yelpcdn.com/bphoto/_tYVW5VuflT-OVXLb6I4jg/o.jpg",
                        "https://s3-media4.fl.yelpcdn.com/bphoto/J9U7UlqrKnKdGM2O9Du8Yg/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/NFKyatcSeaZb8kQ5IS5imA/o.jpg"
                    ],
                    "price": 2.5,
                    "rating": 5,
                    "subcategory": "shopping",
                    "provider": "yelp",
                    "needsUber": false
                },
                {
                    "name": "Sen Thai Asian Bistro",
                    "category": "food",
                    "date": "2018-07-01",
                    "startTime": "12:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.6310522,
                        "long": -90.1939862
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAMqR2Y8Nv3Cs8JDp1KxtKOUhbaecKHSDqjkWXc77P-TZ_MYeqfQJN42hkpcJpizmxY-KMwrSVLvbxZkIuJiVfiOWgNOwBm862lnopj_YtRi6Vn69rAKdfJ-Zsnv3zidRVEhBObWbXC7X-HXrAKP6XVJDlGhRiQ7p0TtQugp9FSb2HKrrxpDN--g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAstWCjxTn85zhai6E4M6EfD7RHJcUSpzAy8B0uxyOWtId1B93-DLVTnL-ChlFlqMpr178nJ52PYXUhPIFcj9T-Un93pVrRgXBnRq7vHif16abSNrhuzf9ltyvjq8BXsVaEhBM-UmHBNSlRHelG7Ih9BhpGhSbeqC8bNC0LQqoCf7BayySIepzGg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjvPH2F-R8H63JlyObpRMed7QeIknjxlRDh7BxkbAyP-1r4zSxOCPo9buv-9tSAAH-ovtD30nfPj41w-kbVMrQOzSfo2gUpSIAPi4csRrLJxVuSP_Azu8jOFdjL2piDvfEhCUyCSH2GNTMgHFpcYSD_4GGhQiRMsrCk2zUu4g_WNYlnZW3R9kPg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAC1XW3d5PqDOR-58IX6gxSAnQ0Cr00wZjCrc5z2HXC0atloOFLgjmGGq_VvYrveJBu4cF8RaQLlLfxe19wgozfXLNEk5hxOME-_2PW4jK6dfkaJ_lclJTxiSpyWcKxLLMEhArUhhXyCDGfoAY7c2lN39CGhRpUy6qNMirdkUGC_6y4wLJ7LoLRA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWprFW82vkJKgcqrYnl58ITWCc0rApF0PTT1vekKtWXWv2g3m83JNSw_WuXx3zelwz44PRYQVQpp_KbiMMseX6aj6RTAP5y9IGHRULqi0xMaP2wsqXbYHqmTMFdgxRJciEhCXs0wTKDB6rn1eCfEkx1PtGhQxpEYzC901-JVKFiKx35YHoF2H-Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAQql6PyCycQnanEJHGThu8h-6iM_l5qJTGYvGRneEbgIrb5t7yA04WAE7hgoJMfbLGEMuK61y_RsBPphflXJCqRo-_-KX3Z-VqtrMNLBMAoMCyAGHwJxxmRTP0ADNVCmEhD9KMxaU0vbbs9_8Y1yFm1HGhR2mA2HcIn_pdwXB6zL31TvZXQNww&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjSkw16Ovu6DjQ3RGMrazaB9qq_EACdTjx4HIVScgjTXxihtZs_CYjVKShXfgFcTQ3j-qbZafUgigvNQ-SBRbmf4Ej2MxNTIQt4Fd7AaPj4ueq7OIKkGf7STIBunS_DFDEhCtmPemGHGiR77lSgWGkFFkGhTzS5S4i9beM7eg8r6zc3vWml0oZA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWb-4RvVwfQCy0dTjpM-xA3Ss00OWQRAxhMTCEWcJXbVCPKwm2dW7MARYYDEsRXM20z5ScbnObffIYrpvAKAoRIPLmJo0OX6EmvfuNCFkgVjkb6cZ5V_gbkYmrOrN6G88EhCgPdd8zLkHhGGvU0dvp1vwGhQSuvXink-QBwSgFCYX5x65UrJ1yg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAszLykr_fS8cIRlPi8hhaQbKHZJRdrJZBNN1kJcNv328RRlAo5nQlYxZC5ps0xwkyI4dLNV4isuSrSu9xaREHjmpLxRdTF91aL61442Aag_OHf97NnIDJd7LmJb3bbsvmEhCg6O2eg4CtbzRtodDCzP-dGhQLdBLPlwVbTtPTrjHaJD8TPQyfFg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAneBzMhmsJndGt55X-IuJh03gdclmTUyNugoKjxrd7t0qVhAgpfD1C3_Jj0U5gzOoKpa6LnPcbcbx3yTilLr5YEDqosIfLkbHfP7TG6alGQiB-WLqhvQbJy9fqc-tqOowEhDnNgh14U3VV2Z_r1rAoF0tGhQRty8aDs_qbn5wM7aMePAoXV4f_Q&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.2,
                    "subcategory": "localCuisine",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6310522,-90.1939862&markers=color:0x01AF66|38.6310522,-90.1939862&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": false
                },
                {
                    "name": "Urban Shark",
                    "category": "day",
                    "date": "2018-07-01",
                    "startTime": "1:15 pm",
                    "description": "Here is my description...",
                    "id": "ixjoPilP7Qq2LMc9l-WSuw",
                    "location": {
                        "lat": 38.63017,
                        "long": -90.19451
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.63017,-90.19451&markers=color:0x01AF66|38.63017,-90.19451&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media3.fl.yelpcdn.com/bphoto/FN-nhdZm3lnqBPy2MqMlNg/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/z8uYOngTDCE_p1TWbHRMWg/o.jpg",
                        "https://s3-media1.fl.yelpcdn.com/bphoto/rEuWlnkErjcG2E76kg1rrQ/o.jpg"
                    ],
                    "price": 2.5,
                    "rating": 4.5,
                    "subcategory": "activeTourism",
                    "provider": "yelp",
                    "needsUber": false
                },
                {
                    "name": "Star Clipper",
                    "category": "day",
                    "date": "2018-07-01",
                    "startTime": "3:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.6325335,
                        "long": -90.1990008
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAt1h8GSNL2ERHRmusbG0C6L2QGDVhTaiugGZOlq8Fp_QH1qDaePNfpA1k5Ty0_H7a9bAmGsrPBt59PLSPoUwuKISB76G7Is2xqqC0MCGMlTzGikvycxpt4C5JiIZ95tC6EhDfiTfjLzokKC6tqMHRzxYTGhSuCz06oAEkgAcBouG-YgM1rh1bjw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiSZVI2-2nG8piaI04JsQ19_c0px3qmldlozdHwRX3Dkq9BARuVhGVRDxZw0ITTNGoYEqJQlVo4L2c4OTIcihA700wTVaUa6KY_Fnr_ChpWFClhqWh6voAmsfRPmB0KDXEhAeX8vtUJxH5hZONDY6iBbJGhT5XmmMAp5UFwwOZong-26l4KYoOQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4iWrAq6x1_zexCLMWl4UayrxTpj-oE8BXD0F3ubUzSVsmBZ3o3giXKSr3l1a-LQb0CcWQrE-D0Rd6fPtIwBo2YCtZ2YKoGMMmMLSkYG2_1uVMgo8WzLG99hsVzMz-ZXyEhBqjOx0y3q0f76KEuy-T343GhTOrhpR8P8B2dKZnnrsC_eKsSFcbg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAC1S2joZ214yKb48QKZKX39idDfI9Fh3cb8gq18deOJOSUy9Wyp1OHN5naIT2jUN7Rr7H_wGlbQzcb4t4cfzVHh9jy4IRtTI2uwEt1K3o7vGFhbPIgG2jpGtC2dr0Tm9LEhCxJecExuo7k0cC2Ff-5LrQGhTD-_g9GEObdgdemKRbgVOztXBI5A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1uvs3zKS8emes3kiaYLxwJg7MvhsUqxxYkpQNzrZx8EUS2EBUh1J5_hh5tkalBeff2fsrnN5Rjqi8PHC3CVvgzb3nK10hKHW1C90urJv9rpfadwrbTXcQlMLz1v_lim0EhDSc5xvAvwYWQEMLByA1EenGhTBoE1BPmlUXd9w1QGjz9ViyTs-SA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAu_5W7gL5bMk1ctWyP_VhaQG7vKoQnIw6B20M3l7dyP4KVQv100vhq73E7wjNOMtXk7Poa7Jtb0_qDjFtYF96Uz2fLWjJKbRKvYjuH2GDrDHa1s5pSfsXUNrfevLcUexKEhCwgVa6tUJOSF8DpLDEuTw0GhRJxAj-EsZAb6s6tf9A86c0MeeU6g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4GmzA3tczPT1Xn_zNWg4vljNOWKj9wQBX6ldFlveoxvvxTy1IUfvwsst-VJ-iZIx1CfeiC91G_LCmtqEhbCzDOM6VMzKQM5LWmdsFQQj6t6UFfNygzsqa6Rcss57DdsgEhAmZPsfGuP5FwM8c6-lt3NnGhTN-dr5npa5854k_LuKwQsxtyMGdQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk0iXGmq-LgaL-aEXn1If5-kNH3sDvz5WErqy8KwXiFuTMc8lEMaNFJhXF0psJY4dH-ImvQ2z-ccXAlysIQSbglcc_bjhTyf5ulNveToxZidZQh1yecFHAj8vo7Pet503EhCJYBttVArDY3YRBx66eJR1GhTJ_Sp3tvLrcsj3FiMmO-AiVpl-pw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAL_HFbXx4NBjkVDV_pSXIvYvBl-VDoJ0KOYiQKHa4dG3UahQe88WSLSP1yr2Q1ZiCBA_63C6iqdU-nT_1i5yF46Nxx7pLMhlV6g9Q5RxwSze19yBezGOFNiIIErrlXY-jEhACOUMDGEchJWo49cH4vSUxGhTvKwFWi8CMt8IGfLXI1Y4lIhYMxw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA0rHNNGrey-Ns7hA6dO_ecM3NK5QPWsT8GWpoBNIrqbLfr32beOdGUikub1ReV__xQiwmtcPQ0n238p1fkMtZJScLEaKQRqJtVYaZMHJSLsYTTbl8m7QAo3-cznt8ui3OEhCVrZ_t2a9ocv3z4d04uSP4GhTxWU8OaISTEMzi0j1zqC6ZCBY2cg&maxwidth=400"
                    ],
                    "rating": 4.8,
                    "subcategory": "shopping",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.6325335,-90.1990008&markers=color:0x01AF66|38.6325335,-90.1990008&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Malcolm W. Martin Memorial Park",
                    "category": "day",
                    "date": "2018-07-01",
                    "startTime": "5:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.622557,
                        "long": -90.17302900000001
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcXH2U8Gqz14JlFJBnXXfYc8t7c03crXKgcQAvEOLVmSWDJP75MDEpwSU2R6vvmdXqg_pvZUeRPICmuBNln1QNbJsVZLKBys0CLKGEuqthK3ZmZaYqZ4FeElCIUFlhcBPEhAoVbiZI1gX2CGQPtGqRgsWGhSQokXxdZD9QFrmXADGoc_9ag1nmw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALo4CzKKlmoJDqNMsWgrfJzbRs0PzUQqFAzmMP6QIz9XPSTwd4E9Kr4EmQPg8C2XwFRrOBidYI454mqSmwLcCcOGZx_obqG2nC9HI2JxaYV1nmj9NShZk7_m3cHg7fUwZEhAjzH4ZCvdw1_NL5b7O5G76GhRQ2Ghx-5eaIbaNHmu1WYaVSv4tXQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuBxRXTyK3x4FeEVqm3qKsNnnpQdL6-MGWZojXMndC3P7ycjDSOoNAQRsrRjEv7gqWMZgYO_e6Th7eQ-FBQ0b-L6o_64Cvy1D90A0Lr9zBsPBs3Wuq5b5jpG7If32_mnREhBiQyM4Y4oXKkWaEfV2Z7RqGhSpIMtgANL64u1cTu2LSbbZgjhG0w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXEfYw_7Q_SasGTyv_CiFgW8vBVU0SgYixICHCMxlDsykp9riwaIL4aYN7Put2uyDP7SOl6oD8lHHyLUrEbv4oYct0wcExWRgLjXV_b7TRAREg5CIP9sSz-37ua0K9583EhDxd4TnqEb1VOPzqClRB-_TGhQGZXOcQTPNtc2DMfB0ACub0kGy9w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzBBZQm7bWislS-lz-wi8L92qY6RnFbvZUjcRuSYzxKbDQbIZNu-V8UAknzoB_kf1f9p9iNLMjqdpWmFn0I10rPB1F4V6pbiaS7TTvyrEgkzeuETpDenfObjnAVonxkUlEhAsKPzzZXPwIFWaz6gW21PFGhR2DIjvJsTygZXZRgbf8SDVZxSz3A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAR7RLhcnWMaEdJsYgqpMF3Bc70jG6oDGON85XktIsovozXU-t7zHPJPLmuEJYboo_J0VzK63xuBB2hVDLCc3dgRZswlQp25D5VJsMAuGpFlHd7ueugHcNfjmGIhuCsGikEhDdmBFm0OCntLjN-T9u9L5AGhSiQnZOVN1A_fqWgjL2M8Sfx4omQQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjS7J--hC4zB0OS9ML7pYALNEt6lHZSG_vJTVnwnQgoYnnUBv8xUGzJzj1gmFHtzrYMjcpo_1j6rIxAEk9O6GawtquC8Ei9NWei4ibpMgWwd_UzBBf_9Py4vXxpsFoWc7EhBlm2PCMr3qCcTJXsFUH1b2GhRsCaz9KuSMEw2XYSwOEZiljC_f3g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtNCygU6hLTenZ-3EWPyZM4BPSzM5UMZwll9nMQZSIfr4-RvTR8JkC5BxDem1BO8KsKibq1NW9fb6i1sKNCr-ZL3eHe2qINp2ZIs1qy1_DElqtR5WExCufV0xt4xqrKT8EhC30SEIcbqCkoquLIkAQzl0GhQ7XyRI-b4p0e3HGQV3Gk3T_il2HQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8mh1hDGBhMOtu4F7w9zVrcDKr5uxECeFBemYS984SDkrIIUIGMO61_Z1iCdRsDynioTMupaAHFzdjI0hV6lcXSKRsokQZ3PSXAm2JaWH0sLK2Wjc3H6e66-eZ8WPja1nEhAVy5UOIcH1x1ON4v5wvB2BGhTNNjGRwJsZKyKIQWhjSkVSF7AaTQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAL-AeLMJomHd9mDhtet5o1UC6cwqjZoYw9mH3Yl8ZxUvG9AYrK95OxWYVqnyPrslgiwAj_fxDPe0J0kmCYHzhSyWxfvhJ71e7Bsae9cI35EUBI5lHSXLfPCeKUCPhiyDNEhBAPzROGCif7Rpst9MG1TzcGhRxnpgwZfrgHFomrWj6WabGbm_0UQ&maxwidth=400"
                    ],
                    "rating": 4.4,
                    "subcategory": "parks",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.622557,-90.17302900000001&markers=color:0x01AF66|38.622557,-90.17302900000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Planter's House",
                    "category": "food",
                    "date": "2018-07-01",
                    "startTime": "6:00 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.620663,
                        "long": -90.21208779999999
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQakPVAfK7V74QiDhTzugRzlSlsT4fXYlRKFc--sZFMKNLx7JHqq4lHhyMAWJ4gT5Pt_IlNJSKDGLtuEXy3e829wfMnE4bIXbTYkigKUUpAi3284Vvxmub0s5IHACR8nhEhCGLGGRpiPz6MstQlIDVnmPGhQe8KXIKHAmS0I1tsmQ4iA00YSzNw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiKsoEXKLfekVbf70q9BjmIE07VD_spobY5DuIb6FVqRQD7j6_nqk58KAZiH4hbBE_ecq5o3rhy6ADg-FAkIkmQl5D4KkPVsZRksCiXe52-RecZL-EppBawNSrfg19Vn7EhDq847-dx7qQCYH5GCYUQqzGhTjZRDpbWXONCqZdmh2_LvXWuwQ5Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAM6HeRVgnwWNIU5s0wUxD_nbJBRJbpWajZbrVL9cz_K31jByfjn7lUG9f_rjbeVKJXgPzUUqE6jxaxJ581dJ9vN2Br8_FVH2GZxzhXpHFqmXGaOSMpCwd4MMvOhCG__p9EhBvZ4_AoV6Mo9CTtEFqsZYSGhRWRw4Dmgif_Aak0x6dQ6o27ISNYg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADKWOgDi1xkc0Ptbuj8SkE5QXFdr_a_rHt75dk-UlKSq7yACJ1IetcWCxMtGn5nBNjbujcHQaR67WpSqklAFY8-veenNg65Knd5vKbzfxaec5ZAzJDcyBgHOdoOIl_t7-EhDW6OIuLOFxBv2OfNtEm2QpGhQBXlLXyzwf4GpNRmKWeOC5631XKA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmNvYZBGFRRhQ9E1r9-wzZF68rgItBubuJJ6-knSLLOSFVzsiHdl_E2PQQ5AHOIBliaumErt60ooYJWag_c8ZA3EaXUn4F476a13jHKZhgaym5PozcdAlmZKwtvaodGaDEhBMQTvYc42-L-5mHU67qOV7GhRCeq11_IE9r6ZQS_KUtI37Y0CEGg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAABrFYn09Sq_MPwg-LkuFD-Q_6xeUZCF-NjcWD5BJBvjkkhCQ8aWwYKO42p1YN0pVVOQu0DytObsIvleDPeopH7CxTfpFmiYPDMiH43Vn0Ws_cbHDbDmCdugbQwsKaneUsEhC7ANe3EYFj275Wao6fFeXDGhQ3tCDg9BN6hoYCxTuq08OSH30zXg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAfhdfa2mbcaTMNKmuzG87hkjjSMYS7bJy7EQy6VKMeK9QOhYiIN5wxuLWBzEVH8VVVMyV82oeqqZRUtKDXplynCSSD1_gBPCSxykKIdOjcrJeUV6QOs5rje8KDMOHUg5EhBrLo3AODGUeoiBhk8ypAfcGhTywlVUXakzEG_sCxVDIqZNYpdIPg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUBiB3PabcUgu4fQ0KOy57RkJF8qkGBffMeTcswk4pwd6TLNJwKYSheO61ngHn-Bg3CfKM6AlFBqHUlD1TuNDQmQFZagEsz8_zotrGu-lGHP20PISVTBMQIN9yiOwkTduEhDqhsHAUtO3bs0kfm8CXPKzGhTVpMHc2LjrXI00H09yAU6h8UqC2w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYw0K4tg92uH3e7gA_2USHQHT5whbPgKAIBvq2gUROBHVGfiGyrmZKbeVKJXARBV2kc3nno3pq64O_QGmyj1nYGWrBmHoM8f-YW8Zd4Hp5Fl9FIbhplrm0P7nKTdDIi8YEhAXdb33ZB9dk00bbRFowvJtGhSd2WtcgVbqu4dTDheTyk7QgxUAWw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9Q3siaUyjAffczdiSfz852a8lmA0UGhXhT2DjMfazJrubV2UP3Ze2oyK2tSOIMwTuyMlegmCh873VKLOBQm1UOMUXGu8qXZRXId6NKNwLQ78sBg0xV6hh-d1eO1e3nt7EhCNwfqJec9ElRkBmX8JZVkJGhTXWUfDrd-68HdQIppLmkPoaQZ8bA&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.6,
                    "subcategory": "upscale",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.620663,-90.21208779999999&markers=color:0x01AF66|38.620663,-90.21208779999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google",
                    "needsUber": true
                },
                {
                    "name": "Drunken Fish - Ballpark Village",
                    "category": "night",
                    "date": "2018-07-01",
                    "startTime": "8:15 pm",
                    "description": "Here is my description...",
                    "location": {
                        "lat": 38.62420749999999,
                        "long": -90.1920777
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEPuroJbpC0FedTgftFnwxYdE6z3L8vs1FkrFj0MKZIXJk9sJ5B1yhXDD-tSPrzTT2Dsgim11RXnWYx2RjmiJ_M6RuFqCLIi8H6MUJ2VEdwmS3eHO3Ey5rq_rAgMSftPHEhB2QUmcNXiZN5W-hOEglslBGhRrwy8mKOy1zGMWgclHgzBLgHozrA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASKhV2z12W4X3Nm0iZ5WTIIYWt93PkCMTWgpoBjlWbnTwbzTir1IhyPuC7f9f3mhD46avXhmZ_43WV1e-RHPNFWAq9Nm875UOkuxoalABbnOjWUb4DZgytX8KC-hTleX4EhCkj7E6hwxMTMzIP--81wbgGhSrUGOaJd3ZJiOhYwdnGhgO66DAIQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAoTVoJtB6P-8DiqRnTSgcXYSRZt0OlWqXPOB2sSeHcCjQESKY1lWJrJ56TKlSsxZkKywCvmqWZLH7D_0a8AEKwkLT4gMYAgK0JTPpG572c8NDvYd6bC4UFleMHdh1RibZEhBG69uMwdDqJ_DAf-0-zkyBGhRuf9lroXi2mB8cuG3QJImBDk1WPg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvoUkf0TRURvrpPik7iEeSNlQf_hCiGbi2wIp_Kqo3hDyucyBZLM6OqvcYSrSn-VV_eys8vbw1jOaFaDb4ERjCq3RzzRMyeEtqb2_-HdOMhVj3LcT8lqC2IzsVpuRiLnBEhBKGHfWSe_GBcj9W5vCBm4oGhQssOGEdtZoddRD9-jcrUKRWzxjEg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1vtia4TqTcHt5gOXJrMlM0Iizmq23gpgqbE0pR8ixJPktZ6pK0algPWdMso3F0kkWsK3cuOyXGxs3S-gnyuEjfgzyZ1tLw6Mm4qAUfg8L6xp9njw9Tj66xfg2mAOBcu4EhCVhDWDMf6RgmWfmR84x34EGhQf64MSbn6MfZQpYuU4i-35rEzDFg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6RpU2t-_V-7gKO5Y7UXGKgILdP0kdALlxfId0JWYXa3YOh9rJ5A9r_BTlqGwdAQAdaGyVOcWuWrlci3PJqoWAyBqkcp2niGUs2-shRr7c5e6nTD0ywFHZdKRaqqTOvRmEhAH1oxEFDr5IJfqg3ta8zqLGhTm7TCmZEiTlXd8Rz2g2eiYQpzxHA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5gzrcPQSqQl3bIze4Ri0B7thc9WJKfXxvMKUdjT3PBA4loLae8hU5OCTBDNPCb2eMRDZd4gwCw2zzEMJsb970hRTve4-KXGPoKLX5BLvvzipu6YbWmIcJzjkiWEXXHDgEhBJwodJn99KczBCPOq4MgVBGhRegZtzzf5sfuGPPPYLTN3H-6mcJw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPc8k8Iv8do0fAusUW4k1EqFKH569mWqg87GPIAiygA-rkSq_mzGQ9W1ECPOqpFHniMA-7Hsk7lYMGGIRostXTgPUkHR6gD6bw5x6hXyGO4vEpCC89rvcfiUzqCWukdbKEhAvuPZocZpcGyOZAJ9H__-qGhRYHW_Z6nKY10z5zX6vuAgpjKi7WQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAMmcrIwOPT6veEauvLbc-o5XX8TK8igp9OxgoxL1xlwt_dK10MyW3RJxsROCtx9e71KRvu7M18BXNBA5UY6woUCGBUkkfFZHWwXq6b10-3KjWUFtTjUziua4z_UD_h-4IEhBQLMVRnaq7C5l00j6ObLxLGhQZRxio6r7TvpHw-gx2kUuG5mSXgA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAE3Z_LkYtOCPKROO6t8okrU_w3-y7HNRXnF1Kpb3Zfj8NkfO9n8Mm8jruGCj1c4_Mb6ds2zkFhbjAKkbqlhIDXMADHaIs7rhiCOzjhA-jlQ_JjlkjKSm_WzvhIrvlV2HIEhDCe2PvYSeSUUz4HSNPoRFkGhS-EOiJmYdnissewWWJNHYx_RuqvA&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 3.9,
                    "subcategory": "cocktailLounges",
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=38.62420749999999,-90.1920777&markers=color:0x01AF66|38.62420749999999,-90.1920777&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "provider": "google"
                }
            ],
            "date": "Sunday, Jul 1"
        }
    ],
    "preferencesUsed": {
        "preferences": {
            "dayActivities": [
                "parks",
                "shopping",
                "activeTourism"
            ],
            "nightActivities": [
                "cocktailLounges",
                "winebars",
                "nightclubs"
            ],
            "food": [
                "localCuisine",
                "upscale",
                "tapas",
                "coffeeShops"
            ]
        },
        "arrivalTime": "2018-06-28T10:30:00",
        "departureTime": "2018-07-01T10:30:00",
        "gameId": "Z7r9jZ1AeFZ4P",
        "lat": 38.635101,
        "long": -90.187798,
        "radius": "1.5"
    }
}

const RETURNTEST = false

module.exports = {
    createTrip: (data) => {
        return new Promise(async(resolve, reject) => {
            // For testing purposes
            if (RETURNTEST) {
                return resolve(exampleTrip)
            }

            addCoffeeShopsPreferenceIfNotInFoodPreferences(data)

            data.gameData = await getGameData('tm-game-' + data.gameId)
            data.lat = (!data.gameData.location) ? data.gameData['location.lat'] : data.gameData.location.lat
            data.long = (!data.gameData.location) ? data.gameData['location.long'] : data.gameData.location.long

            data.radius = "1.5"

            let tripStub = TripStubHelper.createTripStub(data)
            let required = helpers.getRequiredBusinessesFromTripStub(tripStub)

            console.log("GETTING DATA...")
            let businessData = await getListOfBusinessesFromProviders(data, required)
            console.log("got business data")

            let initialListOfBusinesses = []

            for (var i = 0; i < businessData.length; i++) {
                initialListOfBusinesses.push(...businessData[i])
            }
            
            initialListOfBusinesses = _.uniq(initialListOfBusinesses, 'id');
            initialListOfBusinesses = _.uniq(initialListOfBusinesses, 'name');
            initialListOfBusinesses = sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(initialListOfBusinesses, data.preferences)

            //let finalListOfBusinesses = getFinalListOfBusinessesFromTripStub(initialListOfBusinesses, required)
            //@TODO: Remove later
            let finalListOfBusinesses = initialListOfBusinesses
            let finalBusinessData = await getMoreDetails(finalListOfBusinesses)
            
            console.log("final list of businesses length: ", finalListOfBusinesses.length)

            let finalBusinesses = []
            for (var i = 0; i < finalBusinessData.length; i++) {
                console.log("lemgth of finalBusinessData at index " + i + " is: ", finalBusinessData[i].length)
                finalBusinesses.push(...finalBusinessData[i])
            }
            console.log("fetched this many for final: ", finalBusinesses.length)

            formatTripFromBusinesses(tripStub, finalBusinesses, data).then(trip => {
                return resolve(trip)
            })
        })
    }
}


/**
 * Fetches data from third party providers. Gets the initial list of businesses
 * that we are going to sort and use
 * @param  {Object} data     The data that was passed in from the front
 * @param  {Object} required The required number of businesses we need to get
 * for this trip
 * @return {Array}           An array of businesses to start sorting and looking through
 */
async function getListOfBusinessesFromProviders(data, required) {
    return new Promise(async(resolve, reject) => {
        let businesses = await Promise.all([
            GoogleHelper.findBusinesses(data, required),
            YelpHelper.findBusinesses(data, required)
        ])

        return resolve(businesses)
    })
}

async function getMoreDetails(businesses) {
    return new Promise((resolve, reject) => {

        let data = {}
        for (var i = 0; i < businesses.length; i++) {
            if (!data[businesses[i].provider]) {
                data[businesses[i].provider] = []
            }
            data[businesses[i].provider].push(businesses[i])
        }

        Promise.all([
            GoogleHelper.getMoreDetails(data['google']),
            YelpHelper.getMoreDetails(data['yelp'])
        ]).then(businesses => {
            return resolve(businesses)
        })
    })
}

/**
 * Sorts by the user's preferences
 * @param  {Array}  businesses          The businesses to sort
 * @param  {Object} preferences         The user's preferences that they entered in the app
 * @return {Array}                      The sorted businesses
 */
function sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(businesses, preferences) {
    // For now, just sort by rating...
    businesses = businesses.sort(function(a, b) {
        return b.rating - a.rating
    });
    return businesses
}

/**
 * Fetches the game that the user is going to via the TicketMaster Event ID that they passed
 * up to the API. This function first checks to see if the game is stored in Redis. If it
 * is, then we return it from the cache. If not, we use the TicketMaster API to fetch the
 * game, then cache it for easy retrieval later.
 * @param  {String} tmGameKey The formatted TicketMaster key, which may or may not be
 * stored in Redis. 
 * @return {Object} The Event object from TicketMaster
 */
async function getGameData(tmGameKey) {
    let data
    return new Promise(async(resolve, reject) => {
        let cachedGameData = await redisHelper.get(tmGameKey)
        if (cachedGameData) {
            cachedGameData.startTime = moment(cachedGameData.date).subtract(1, 'hour')
            cachedGameData.date = moment(cachedGameData.date)
            return resolve(cachedGameData)
        } else {
            data = await TicketMasterHelper.getGameDetails(_.last(tmGameKey.split('-')))

            let time = data.dates.start.dateTime
            let latLngStr = data._embedded.venues[0].location.latitude + "," + data._embedded.venues[0].location.longitude
            
            let gameData = {
                'category': 'game',
                "name": data.name,
                "classification": data.classifications[0].subGenre.name + ' ' + data.classifications[0].genre.name,
                "id": data.id,
                "ticketUrl": data.url,
                "isTBA": data.dates.start.timeTBA,
                "date": time,
                "location": {
                    "lat": parseFloat(data._embedded.venues[0].location.latitude),
                    "long": parseFloat(data._embedded.venues[0].location.longitude)
                },
                "photos": [data.images[0].url],
                "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=" + latLngStr + "&markers=color:0x01AF66|" + latLngStr + "&zoom=15&size=300x150&scale=2&key=" + config.google.mapStaticApiKey
            }

            let cacheGameResult = await redisHelper.set(tmGameKey, gameData)

            gameData.startTime = moment(gameData.date).subtract(1, 'hour').format('h:mm a')
            gameData.date = moment(gameData.date)

            resolve(gameData)
        }
    })
}

function formatTripFromBusinesses(tripStub, businesses, data) {
    return new Promise((resolve, reject) => {
        console.log("getting activities for the trip")
        Object.keys(tripStub).forEach(day => getBusinessAndBackupOpenAtAvailableTime(day))
        console.log("finished and checking Uber")
        let tripResponse = {
            "itineraries": Object.keys(tripStub).map(tripStubKey => {
                return {
                    "activities": tripStub[tripStubKey],
                    "date": moment(tripStubKey + 'T12:00:00Z').format('dddd, MMM D')
                }
            })
        }

        let keysToRemove = ["timeframe", "placeId", "reviews", "website", "phone", "phone", "address", "backups", "additionalTime", "hours"]

        tripResponse['itineraries'].forEach(day => {
            day.activities.forEach((a, index) => {
                keysToRemove.forEach(key => delete a[key])
            })
        })

        checkForUber(tripResponse).then(tripResponse => {
            return resolve(tripResponse)
        })

        function checkForUber(tripResponse) {
            return new Promise((resolve, reject) => {
                let count = 0,
                    sum = 0

                tripResponse['itineraries'].forEach(day => {
                    sum += day.activities.length
                })

                tripResponse['itineraries'].forEach(day => {
                    day.activities.forEach((a, index) => {
                        if (index) {
                            let activityOne = day.activities[index - 1]

                            needsUber(activityOne, a).then(needed => {
                                activityOne.needsUber = needed
                                incrementAndCheckIfFinished()
                            })
                        } else {
                            day.activities[index].needsUber = false
                            incrementAndCheckIfFinished()
                        }
                    })
                })

                function incrementAndCheckIfFinished() {
                    count++
                    if (count === sum) {
                        return resolve(tripResponse)
                    }
                }
            })
        }

        function getBusinessAndBackupOpenAtAvailableTime(day) {
            console.log("\nGetting businesses for this day: ", day)
            let foundBusinesses = []
            let totalAdded = 0
            for (var i = 0; i < tripStub[day].length; i++) {
                let activity = tripStub[day][i]
                let businessFound = false

                for (var j = 0; j < businesses.length; j++) {
                    let business = businesses[j]
                    for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                        let businessDay = business.hours.individualDaysData[k]
                        if (businessHasNotBeenUsed(foundBusinesses, business) && business.subcategory === activity.name && businessDay.open.day === moment(day).day() && businessIsOpenOnTime(businessDay, day, activity)) {
                            totalAdded++
                            businessFound = true
                            foundBusinesses.push(business)

                            Object.keys(foundBusinesses[0]).forEach(key => {
                                activity[key] = foundBusinesses[0][key]
                            })

                            businesses = _(businesses).filter(function(b) {
                                return !foundBusinesses.includes(b)
                            });
                            foundBusinesses = []
                        }
                    }
                }

                if (!businessFound && activity.category === 'game') {
                    console.log("\n\nAHHHHH")
                    console.log("Here is what we failed on.")
                    console.log("It was this activity: ", activity.name)
                    console.log("We searched through " + businesses.length + " businesses")
                    let amountMan = 0
                    businesses.forEach(b => {
                        if (b.subcategory === activity.name) {
                            console.log("one of the opens at " + b)
                            amountMan++
                        }
                    })
                    console.log("there are still " + amountMan + " business(es) that match...")
                }
            }
        }

        function businessHasNotBeenUsed(foundBusinesses, business) {
            return _.findWhere(foundBusinesses, business) === null || _.findWhere(foundBusinesses, business) === undefined
        }
    })

    function businessIsOpenOnTime(businessDay, day, activity) {
        if (!businessDay.open || !businessDay.close) return false
        if (!businessDay.open.time || !businessDay.close.time) return false

        let activityTime = moment(day + ' ' + activity.startTime)
        let businessOpenTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.open.time)))
        let businessCloseTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.close.time)))
        let timeAfterActivitiy = activityTime.clone().add(config.activityDuration[activity.name], 'm')

        return businessOpenTime.isSameOrBefore(activityTime) && businessCloseTime.isSameOrAfter(timeAfterActivitiy)
    }
}

function getFinalListOfBusinessesFromTripStub(businesses, required) {
    
    console.log("initial length of businesses before we get out of here: ", businesses.length)
    
    let finalList = []

    businesses.forEach(b => {
        if (getNumberOfActivitiesThatMatchCategoryInArray(finalList, b.subcategory) < (required[b.subcategory].count * 3)) {
            finalList.push(b)
        }
    })

    return finalList
}

function getNumberOfActivitiesThatMatchCategoryInArray(array, category) {
    if (!array.length) return 0

    let count = _.countBy(array, function(item) {
        return item.subcategory === category;
    });
    return count.true || 0
}

function addCoffeeShopsPreferenceIfNotInFoodPreferences(data) {
    if (!_.contains(data.preferences.food, 'coffeeShops')) {
        data.preferences.food.push('coffeeShops')
    }
}

function needsUber(activityOne, activityTwo) {
    return new Promise((resolve, reject) => {
        if (activityTwo.category === 'game') return resolve(true)
        if (!activityOne.location || !activityTwo.location) return resolve(false)

        distance.get({
                origin: activityOne.location.lat + ',' + activityOne.location.long,
                destination: activityTwo.location.lat + ',' + activityTwo.location.long,
                units: 'imperial'
            },
            function(err, data) {
                if (err) return resolve(true)
                resolve(parseFloat(data.distance) > 1 && data.distance.split(' ')[1] === 'mi')
            });
    })
}