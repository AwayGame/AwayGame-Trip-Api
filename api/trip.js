const helpers = require('../helpers/helpers')
const TripHelper = require('../helpers/trip')
const TripStubHelper = require('../helpers/tripStub')
const GoogleHelper = require('../helpers/google')
const YelpHelper = require('../helpers/yelp')
const TicketMasterHelper = require('../helpers/ticketmaster')
const moment = require('moment')
const _ = require('underscore')

let exampleTrip = {
    "itineraries": [{
            "activities": [{
                    "date": "2018-09-05",
                    "name": "Old Fashion Hot Dogs",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.48056,
                        "long": -81.713416
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5w01kI1goDFgvrUuTkeTrvkRjOiLAtAm8DtoLv05dTLtonNWCiru3FaUIaouKMPBtMSs6-_LRCp9NJOXo0I4HHxk7EzodQL012BCGIyfu95XY12soD9oWqAkDrsfMu7HEhC5q4Hggkvk-3x3k6PBBgasGhS7p3KVyuhvrDArj3CQmU0ewlvNgQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7NUk7BTMR9BL9vkm6AbX4GB6eB9V6cFeWqkcXLWjaEOiCkhUUrzdeanVFQoudSFar5YlBPVj3ZMOFg_5wbJB7225129qCcqYNt70r0XxSZTAzurRSt7q5B5xcr06U_gBEhC3yAKNrKN-1QDvlLsL-aaBGhTgIUGV0qwcvmc7s2Ntrkv6eTJBJg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUy0SrBpnFgStzBv8BQ76uqtdONgOAiFBCyxW-f41X5AUkpwXJyIytu5f3LNQSDDHrd_8CQNdzciAa5mbqMB9RNAnd-7t8kN1fYWopRYMXJmYzz4nT5IKg8L8vTcuWGRBEhD4DAiTsQsQxg0OMLfeqjMPGhRV726w00MSDbV5M2T_Fl1uaM9Z_A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk_nJdEND7Yytfe7XqrrBqSip2c1_VZLmzMtOjr53GLzr2RDwh22zsb7_Nvr0Wzz38jfKqhTTuWYH7G1UaX4j59I8Sn2ATcFnju-6lK7NzxJunNOvaNWGQUW_IIUeMmo2EhAAXOoPKl1D1CSWZ3VSRmmMGhQARg_8g_zVf-3IOFlwpwRZujJTMw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAxyRJsadumKIvrWyzVc46pi0ihyOkJodUYR0JNlPyQUAaiWcn_HRfAUyrH34KC_Xp9rbELma1T3cUzumsQfU3qEO2zrsFeZ_WO3BZ4n6RGmA2xNPSvDm751b7wbE02Xo5EhD4TBq0I1lWWPiaurCHUw6DGhQtstdvGYpS6XzO7vqwTjFTemelaw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEkPaaRBEIT3zWwItdL1vHMdQyoQjjcF9kFhOhhZ7nr0ehYFArn_MXAiqT1RqsmfnlMSfnn_y0jcrLfjbn8cxSsfRvR7FX4DwFxUhQ23D8LkDpuKXukt3mO16Kic4_v7vEhBI_y3tPo3yVVkHsVOHhG7kGhRtfIWS_jUXoMS2izqc6gZU1KQWIA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAga28_5nrnb28HyohUBIdZyxjOkt3F71knEhd2xm1xqJEh40GKI0rFfAjKTSqHnV-Pxekv4xNNO3Sz__cuzjVsUtzetS_zR0JDN-65xn5riZDOsq8Y7-3WRl6CIGICzWFEhCtn5xjvezfvgy9sx5Q0gGpGhTmtJvyE3WldkL10pIC1rK8XZlsOQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADjXhqcxXJ8K60BD4_afaVkQ_OZ9Xy3wu272ew16M3VKsiYZl0SUYn-4d5vwnb6yJuMRohBUCk3Z4p2dQkzfbX9dOW5h_NB94BZ-f68SQP2nPgEyXL3TOtr6NMCuDz1z7EhCUMycB32FWEO_hGBkwOfspGhRSjpdv6zJ1-WSDFrjGaOe9RvY97Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyx2u7C79ocUx3Z28XxbUrulVDKSDI097agr6wueI__dr-ce2ojVJpWwIHRaHDjJVgcAWZfsk9Vv2PUXyrBdvUm2GRCxlSFp-yCxxYGeWWm5-7mSQZf0c0htsGOZOiZlWEhAniaI6Ug9VGjT05AhyyL41GhQY8wiIEWhYP547rEP-HAtRNC4QwA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXGoKfK7jpFQuJ0uCd8yjvmv79txtp0UGpqHBBIyi_UAGis2J9KIsqNEgLOFvJ03G7chiUy85XA9eZ3-39z_yLLLNeG4FauWAmWauAgaYpYhLOuhZwjsAjLRooLNvQgnzEhCa6jbK0QairAsQzbXeXEizGhReObItBBkb0HJ35kbKJ-hfX994ig&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48056,-81.713416&markers=color:0x82CA75|41.48056,-81.713416&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-05",
                    "name": "Ukrainian Museum-Archives",
                    "startTime": "09:30 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.480061,
                        "long": -81.690214
                    },
                    "website": "http://www.umacleveland.org/",
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeJYcaqKFD3ErwhPofxdjD6BdLoaCzjz_loKdljLW6y8oiRrIOFX4DzuFoTBW7zIv7LmmmiHlCeCUhFI5xQRXz9nN3m8h6zzAew370tYTFwSzEaqE5B0lvDrysuC3HaLeEhCTqKdYAX2oaxIMAKSA5jq3GhQSqvVSVa47QREQadh5rCphQKZhPg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9FO7DugXnQPFI9Y7RGR3ISBGo_sS7l_NdN3ytoyiNfbTeO1KzcNEgjvdoS1DhpmwFCB_PJi-Wz-KXRrzydDxIV5u7_Rpwp4uczXdMFfQMt_PU5AmBP8JfzXk5d7Zvf3YEhA0CgURSxIPDPHA093DVeVYGhR4COjFtyb0MVYTrgv8Gb2weTkAEQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlmwgWzlKubBw_KeMnSj8VsXyYluzKIvLRqZv-44dhyhv2BGpxm0iYs7FgVsevhEvG-n-IUwmPp8tnsOuctcW0HxoPEBrMsaHm3qjsWVReHKyNOdABXr1iR58MEjRh_gREhDwoJNcbo8ARMC9M1RzsXQ1GhQ_DVvl6s1W3kZNrcXSBersS2Isrw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHezQ360TWiTDStSjXkFaku8lfN36D_CBPgfSJQYi9Y2ML4WO-ZzbGtvOM6fnVjktmhKSVMSn7EtkRdomO8N65fAHWShPohjCls-oHox1jLbXvBtCdW-SdygbuWzPzkhlEhDeLGOCupBxcxJ1NO_pkgM2GhRGwdEIsiwcwN0-0TuCivL_b4BhvA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAw8v2IFPKWhu2JSp3DcAbQyEeb3oIJLky2x4DWUvvBQqTrh6WsLsLUNdh1xPDbgHPxV3GQX_OgwMcppjyfFFQ5P75P07ziNZAr__sg-m_zXzJ628VGSjKArYounIV3H0DEhBfU9bJuW44of4yBVYwjwWbGhSfT1ZuB_p2GDnQYRAOa1NBXV7ZEg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmiKI9JCHDWHVuIo7EEx6ENKc56kvMoNGGoqTsHa4ZJqNIDgGJIRDH9gFDFDJ-_DE11PKUnTKWl-ht4QNk3Yk-Rrw6cGyQXHAp7jq7C8ksx_bYGg7vzedfnklyGD2jmzOEhCeutvSoDgkhj07qU4AJz1OGhTVX1S1fcD36yxxy3IzXKqxwVCbZw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAE2QoYzKjoZizv6r66yDwsCRuvPiUxbcpnJXkWVsnw_Njdl5l2qlLIG6JcuxNFvQAtgbBzR42COypsuj1CQuW2UHffh0k3ohtqis6NL6MkSxsAXfCv7mvFJQ-TJAYiKkFEhCmc_SnVL0aU_urZWdz1ARVGhSDaqBJclB2Xt6lpuC5lQBrukn2eQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAKefQNj4SiaVb5_KjUvsgsBIuz7JI77UD7YFT2NzGn3NJBzKmG8wOCsjP7XgF1195fGhuWmC-_vaWMdT_e9jsz_KrgJoSD_iKUAspmJa0K8JATMKXudgfAM4mrVXuJYozEhBLnjbbtaPU_t7ADt0XtFOvGhTUkA2zK2roBUX5iqCjNbddHKLY1w&maxwidth=400"
                    ],
                    "rating": 5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.480061,-81.690214&markers=color:0x82CA75|41.480061,-81.690214&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                },
                {
                    "date": "2018-09-05",
                    "name": "Lobby Lounge on 6",
                    "startTime": "12:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4971258,
                        "long": -81.69412009999999
                    },
                    "rating": 5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4971258,-81.69412009999999&markers=color:0x82CA75|41.4971258,-81.69412009999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-05",
                    "name": "Health And Wellness Services",
                    "startTime": "02:15 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.50294309999999,
                        "long": -81.6712854
                    },
                    "rating": 5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50294309999999,-81.6712854&markers=color:0x82CA75|41.50294309999999,-81.6712854&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                },
                {
                    "date": "2018-09-05",
                    "name": "Buckland Museum of Witchcraft & Magick",
                    "startTime": "03:30 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4757719,
                        "long": -81.69130679999999
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiClgaUOjKljUZj4B8Tgap_DH6OYCA_gA7Rmaoh1baSXsh4mrZAuv9b00cRCfe5bFDTXFX6c40qKpEYoF2F7xNMDSoASI7lsM7c0cWjsyfQ7iuG5vLnzjGk1w8u5LPSkxEhB1W1kW0JLWwSclyhnSSvIHGhTi3xZMZCH8HOD7_Xi2BkeO2cxqLw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJFDn7sQOWihgFRe6jczBNG3ZxlM88rAzq2tGl2vd_DjjCkOTXDWEuAWN6njiWxiTQkzHIuQTjH3XmGATodIEKzmws7SMYi3KWcXIkjeVBQVJTXtM2yD3xqkyzBBvMBbdEhC3GFm6_lItYuiQz8ngRvTEGhQQoqbHiH8jq4GkqppilWpI0okQUw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbAHwIcKSZXUq_BPHVg4DvavVx6_Fm4vaOHYzfTKEJs9zcUiE6OLp2Fbz9h82ukahRdMj2tGgqlwhRxhhwwMRNRaxfeDUyIw6Sezl55OoXIzvMh8531c2VpI0zN3ckci9EhBEdstuUWMR5VVRqgkjVjDVGhTKyyz0b3DEwGul3IIdWmWzKJk8Rg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWPMHcuN5FjqOlUJQCGvDfCJ6XScNhAKM1ySjpuFa32CcMrkaMc4v4X684DPEQSLB7nP-lpz6D0TdcmY7Evba-0ncG6x2x2HvvxP9D49hX63qRp58eyJSwRQx_Dzc_ZrAEhCrPvkOllPx4zqNPgPue1e_GhRTFewsgzYPgOrnin3iC9OfNdC2yQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAslgUpWr3WAKWsdzI1iFeHHarQ_OGdT6Q-zCGb6CxS3xqGLDqZ3s5NkJa4-cZPu1GWT5vgoRbT4uVB1B_mElqW4ybcn52dVqXINzmOZAWdRtx0D16FPCXe35l8M4iD4ttEhAbex1Tw0u5y4CP5Euyhb5PGhQUuDpel4eeDzKtEC9oixWj1FWcRw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHwL_9Vs6LZPvUh8Iv3kVeoP1dvxLOPJK2GVSf2Fqrn4BA0zko1al1p0LiGqtEuJJBxytXC1xZ4mZs4vJ7cKJx9TBF2dpHLidpwUpRudLYm4DS8O-1KukjggBUfBqLU6LEhBkaP-zssVkrIV8tecxupkrGhRrOCnH9lLoQuJqh6SJ_HLjvIVpKw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtdrLIotf57vZEwKOdxHhAEw0t4OgatElb7Wixw_NI-EopnBkEBEPLzL9-Ys3e5xWk0dIxRf5EJh1mf7kKH1j5VrO96-2tZr4R-diW9WdIS0Rrr3fcS9P_37ZKtXbtbT0EhAx8baToATcJdY1rtnXP5rZGhQXrIQ3Ff3kMzXLPT6BRHIwPs7u_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuH6DOp51xYCxXqnwFqw93v9_OiW3dqeePuZxrKw2VEn1L6wMaLj-d3n9VfLT0kPPx4w_iNpUlcYZkLTSGRkEL_CoTidl-YCr4gxYfedeIXiooqc6svHOLukOwce8tNaOEhC_SmALO4REdt8GGXMX6aK7GhRxut2MRIeonLWoWinwaPu3jwgafQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqHHe3w8ZvqST5hDjbmEVlkJg0AHaGzp9MLVONBil6HxKvK9AcKEoEhjtmEht8Flu7AfIHyjAsM2rR9KBnzLHzxxoVpV5Lmace6PcUSKMMB0zWZQDj36OiYoXrZQcx9CXEhAIOD370bR_tsU3FXhdVHUNGhSqqpDNH1D0sJg8fCuhf9qzx44kpg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEtbKUs-i-LIAOdZ8g4J3-zxpaorOeC1ckmJMpbuGRAMseoZnYasUC0DYFJX_LfALFqbqha_SEJxi-w9bIgqC6bC8kNlPPT8ml0DAT7MVlV1nHE5yO1MxAHglNvRWJ4GuEhDf8XZSfIw19aZGqG_DXxckGhRLrKbGS6_Y5iQXcRCzyHD1-w6FRQ&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4757719,-81.69130679999999&markers=color:0x82CA75|41.4757719,-81.69130679999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                },
                {
                    "date": "2018-09-05",
                    "name": "Beviamo Cafe",
                    "startTime": "06:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.48102900000001,
                        "long": -81.685921
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAZd90_soOapxCxAz_Zz6QwFZhIpwsqC-7EYZDpevmzLhBqrL1hB8GYLRsRFZRwJYw2PTxszJWtYAckEwA9g4QKztFJeLLJ09z1LjzLmfoHlmR05fhtDfO_WD4D-fCzLZAEhAf2MWsdUcsgNS3lqUuFTLBGhRtuLz5ML8zoPGnSboGMPtASCHRLw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANs4euz1WWmV1ozAU0pRIjwLjqm5M9jKqTZkqUsiHuExPJx4BJ6SF35GyPpwQWQFQ2U7iQqq1enpX-m5zs4ACV-Mw1BY2WCulCeVRezVIvP1V4kNsIK2PP6xJto4-zJgpEhC3n-BA1OEsvJr7b5_v_pV6GhRaln_gBg05P2XUzfyrBgIajNrzAw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnaxLnXqVewGyl1ti3VoU6eDVdGwkRgEGDB5iBM6W7ct_5TWwHI44ABgH4aKRSpo_tr5AjKdkFUvtFvvSInWNA_catwwYrfkEuxqNLWD37nG7EVo8NlVdugYPxF32P5HbEhA7SnJ6EbVM5Advw0iO0ZlHGhSb33hPm6vdja5uNoK40npScBB8wg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjr_0inazTulJ6fu4Gd1wgVRa5sB7CUl5vqVQmx0SE17t0i2rKue92xeqvmOZnO8lw1jCJrhebjMpZCyAbkzR13vCpgPQbqbsDskABwAK-BkJ-YgJqlzMYhH0FJyb6ZvGEhDS-2vp8gAkYuzuiwgOOtDdGhQE81Pt_Sqr_kVJ9EpP5s032DizHg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfO1PxEOwCq6FVTz-kxzSita-mdImUE6w0nxcTo6tFyDZWB402-n2h5urCFPQbqeW53vAu4GM9Ogvf5nvzGadLil0lndg1SShSpHOpXPy0xGV9J60g4p9tSqOSBcdq3J9EhAsktjOBg356nSgc4N8lEoVGhRti-MTpgw8tWUF1rU9jENFx_JcaQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJWUINuJUaasgT7Rw8EPswsvC7CHguRwV5y27NE6bkArHNouQ3qqtR4TCabeCFjPLzC1RnOsObsHa-UUzhjyH0jD-kP5-21cpQEinE9F26_HxKkStuu8Yt5gw-jQkAKMeEhDsF7EIXUKAJ6i2dZMqZNZYGhQlu2Qj7XrRwxp4nhLBZXhScHqrrA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAokl2EEl31Pbo6_Uxf_GJ0dyANYPKQ8_Ghr8xIDgeosXtZjTfQhbvuIaUbv0YFmVZQ3dWJsPQEzlJ2E7WimWE0sit5B0Tt1euGCAt5LC31UW65zlDWIZxT2SkyFIHBTItEhBZz4bHgakceWcooThL-0ATGhTU-9aGbht_GqXwQOgE-b0O0GG-bw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA2_hAWPQ4BhFJWOMTSyeH_pfl3BxGD3g2u-nstndW3iX3n8GeA4BCI8Qv2a3ExoR90PDY_Q7z2KYHaK7DX4sclv025US_zmPkfN6Ak0RhySbr7sCokiWYEDaqyya2m1miEhDnQRkJoZC_T1s5H2mn6tyqGhTYijoxfdL3dNBCJzf86KHEzzZPjA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAA0pTCq6OPp7iFcsQsyhfxA32C02I_FyehOvK8W8UmcXsB27G9LLLR3BSr0F19m7sbML2j3Yoq1URXCuTbUOt88m1xiPkIYtk5DvNmf7ygkQtUx1QPsCK6aoCl6BrPg1DEhA3aUddkoD9igkoWOyJ1z6zGhQLtVprXs322p0OnNzpuc1SY055gw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcoAcc30_Lw5qXgrh044KUH74U25l0e9Ky0tdkRS-ICAOmA9xGqUMJIcfz0ytGjxe2T7x7-9aIV4Y5C6OEyf_WJqMe3Q16AYhe_1cujQl1jEF1ZGhaLSVgzPazkE2AZyoEhB23nLWFzfWHM_YinnFupErGhRjr-OCtAf6IkmIMgwgG1R3BGg-ag&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.8,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48102900000001,-81.685921&markers=color:0x82CA75|41.48102900000001,-81.685921&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-05",
                    "name": "Market Avenue Wine Bar",
                    "startTime": "06:45 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4841682,
                        "long": -81.70428749999999
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjfVtqiquj5-ZNML5IvMmiit3-UUM3e60v9UimCiwyJK0yp6mPbpUK4YuC-ihhy-G5b6szn8ALiVBv2h4I9VxTLywX-fJsMon2fJkmiG8mcddEXCiizSfiRnU9KM9gUUSEhARvx7TlEz8ZlxgXCA-wQ51GhSKORD7MZ1hWyhQeKn6JFnwb5tRlw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPQ9-1colnJEK93y47FPE2K7UWVtJo4MKztOEu4REKqbw0TPECH0A_9vLk6wn96zYkBuvXrzb4Ds7pZbnxuvybiZ_lkjicfcDKGYHl2i_7KSbX2-ECIqfDZ5mV60NWv6lEhBCh6apYK6R7GxAhsMrvLx2GhR2L2bBiMZf3stfYW0q09OyjF_Gag&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA50gfwyeNZzGVpM7jQdedKR6BJDt8M2pkJaL670c1wyrusGdCgcKrgy8J44QA-pcR39g4R_alLLh--VVpZMWl4Fk9VBJRd-MW1upMe58JqM0cameZy6MVfF6EgwstHgZTEhAbiau7A5tJ0p5hvqOWpmmOGhRnCKl9upptafDNsRn2W9Bq23xfWw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAn-33kmVFpdeB4ioGedCqCZeRbmyc7RDQipPV9iSjjq5CQfiT9gzKVrhcPw5aNfiOkhMkWh_x3LitGRnBtAcTsBaN3gLjMgK9HZ4NUZUynC3STiKq69lnbO2hbL8Ji2p9EhAhEs-MmhhipWNpBburGr3dGhTcGIjAcmZ5KCmZE-oVz7-Ka68R0A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAWkxMaH30jlbU0Eatj46UMbZaQeGbsUBnBdLnBoWuk787iBlTJcl93FaJ5fGh81_86V0aKSbwbp9dNRhbHVMT8Si_HurtF1M74F5xGHbDys7aJkunkBw_zLsgcgJwRgr9EhDGeUH9AV478qRZRb3yNiTbGhQKE-H5P2L2JvVY6Leu2hLOyZbp_Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4LU_rcoBBeHN8IYmQNRuxx3XfaVZSdT5egv8d9S9ziXoTq45RHdvrmzRnw5XbKP7OEtrqciXlEMd4q7CNY-fo8L_J74KLyj_3E9XpgFoxHDze1MCsROBW9bYjRve9nimEhBKnL1a1sAiRDGVTV8I3RInGhTS3uLkdC_9QYOZz6iUNFjFpbKSxA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAXq-49B_YJnFnJuiCbpFC7jmh-TVcGE_IdUF_dQ9NnAJcvlmXs8PECpC9DvXODloAsNJx8gsjg6m-IbkjB4prgJc31eumxAwQm6XVC-m8B4Zpe9ELo--3XnnuGy4tnefOEhBckvMwLJyVQVNW2Ote4KrhGhSoRl52DAPZ_Rv0hx0AUpRRybMhCw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA93RuwIPwJghsWbQKr4I5WEHkwsgbe0uglrMi4DUTXwQ7lLt2uWxIeQ6dRbYQ5KFJzjWD1f2ALJ2GL5D9UP9y_FAdbOqgNLilUfw4LrTKWeYqKQnD236HuyBdV-IdoD8QEhDpynVtdjdj38J_zWqnXz5mGhQeuKaad4TMX2AZBdIzT4TnmcFUqw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4iMM9QgQhRax6FYQKv4Y0JBkwcKvrMcmA2rDT9iZaph0Rqr1nN5XvjXpFZIccA3PsLd_6RItimUSZMLjPgxt5mIxuhEUAeSUSsh3-u80gZReU1JB6mL0ma60DBn_dsC5EhAbljYlmTVuq2P7gk2MIyUDGhQbDtco37PaSjcrl3n_FRk_T9GRbQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlWwQHNZEAVXux8Oz3fQNwWlBJP6W5o_qXUfxxlvu4ZcWy3MWVIRkmA9kKtkq6sMhEURFqF30xCdTSy-GvadVDfPl2ZOEgAEpR8Kp9XWveaRnavR3gSI-c4QH6taYCV_MEhBvUp5wZmSRYQOEDAP_IFAiGhRRWQMfyfloIu7BbhxwNhzLeDcv3Q&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.7,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4841682,-81.70428749999999&markers=color:0x82CA75|41.4841682,-81.70428749999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-05",
                    "name": "CSU Dept of Theatre and Dance",
                    "startTime": "08:30 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.50193429999999,
                        "long": -81.682772
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACJuShP7dR44_2N1B48FIlQOKVucsXtv_NvNWPm2aHAMYv_WnSCiPt6wj7Sn_p0u2ytYIqfdECH3dS2jikm1egil86hwDl80LxQmCx8QlzthUhaJpiifR-wuL6XYmvj_eEhD-gGHAh42hgc6Ys8bzosIAGhSRotaK_-nZqiNZs3K1Ic1hiQSbxw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlC6x5Oma4I9TiRIDaD3NzuTlkMlRuDROUs0m7z6LF9ISiUi_GVH-5IuD9GTbKQEyjaXk4DLq8OuICScwMKtan7GJ8TQkQ54aP8YcwstxTEdsIN8lyS7Ueb1iI-w8t9tVEhB3t8IhZOk5ZxtBdklOvrXbGhTIjYZ2Yw4FSLMzPJv9xLsuXvWdcw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADr7uWeG2quQ9FaBwmlEWV24C3T7l9c0fRuNN0261dov_3sA7C7iJwk4gWnl24_Dln1Kr7j_iNfm1jbCREwYwagJdaGNbIEngPHxzROqVviLPu3zHJI2HoNslEW1ToEyaEhBoBUliP5_eRc6rwgxzfiu1GhQwKpbtBS-okwXk193_MYWShE6hXg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAN6_8ucQ1y6azXWxn-qL6qfDIKlVlyzQmpkr1-NHdg7nBtNtpLSjVYVyLgMLEfkbxYtTmE5Og9nCv96y1ZYmXSezmVvB-9IkWqqDb0W8vP6q83iLlJQW-Liu4jMtRrsWlEhCvByl-0fDMB1dXmnzyIiYZGhTohz3IWysidL8wZxuAUOMICccTMg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAdkekvaV4XqvidobOZiUkHDVhiVMjAZzjkwfkd_SDHbtfwWsSGUAUsvmafMHlMUC500_QJrD9xXS_9V4D7XVJUpQarazUG5TATwY5sAcDD5kCVzL775ZsEyUOPMsik0FEhBLNWCjClIFKXE20og86-u2GhQ3QEUxWTxqxyc6uBFyJf1ejK02cQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnwEKfpXnqkSYNA7imbRTA-AtRdUt2VRzg-SHOOSZmeAmVcCv3l286NfuR7830eOTKc_FBRwPFgDRKdRDzi8guvzxsyaMpx9IcadF_nJN3Ej8r1qW7tBPl0mWXT1fRtYpEhArCRGpstsYtwprCOVqpCjJGhTUb1uWolHv_P8WSPUZNGnJti41lQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAuiV-0W0xa2ll6dgbgqNxT1CG_ukacY6JH3E6EU6bsnCzZ8EOoylpKkrXX4L_mRNTEe-pZOy-RuCyVlpmRTaAMxh6V5tYIu4FQ8LT_p3u8UbQkjfDF8Mq0q98gBTuBKZLEhBjXQ45y0ALiiBQHUh1-RiEGhSQhu2MS2TZt6q1iR5NOWmCqpDUKA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA_q2KxxDW0EC7_QelrACsiTCR6ONunXoCRPNuONMtXYaKAcuVdF2XFTmwwKkb0j6ihszdTbxwaQb8bvCUly6M24L_pjaIrOajGqmLrlz1Gh3-zEDg5WSUKod3eoJXl92WEhB0PjE3gUdsM3Axt8Uofp_eGhT94D2Cy-VqFNTLTaNmCDWBVAFO_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAoBbQs3WDye9VUcLBjMIToNQ-LYDTq9LHz3W8yh07xtiQ8VAQAy3yoqM_gNyq9NBjLo108rq0MKtIXJIF_20HajofNN1aKHWBl05j4t6q9gUNNLS7_JtRih-NNf5vVAE9EhBb2O5W4rcQGjATKaLio7jYGhQLXE55vcijgwSg3Tlk54qjyA-h8Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAkZ1tG-AWwaSiMsYVRaZoRHJ9nn0S1OiZ9i9mURqLoISdU0T4Tg_HWJVjTEPfhXt_89_xk9psl4c6M4KXYkq_qsK9CyOC4vUjjrcYbwfESbxv6xJ5B-rkjNDwuUVinalfEhAPcaGGNhyljHqj-NTH2QOHGhRGmsHTaYevJ1t08c_lNY_5TuySJg&maxwidth=400"
                    ],
                    "rating": 4.8,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50193429999999,-81.682772&markers=color:0x82CA75|41.50193429999999,-81.682772&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                }
            ],
            "date": "2018-09-05"
        },
        {
            "activities": [{
                    "date": "2018-09-06",
                    "name": "Six Shooter Coffee Roast Bar",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.49448,
                        "long": -81.7056999
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49448,-81.7056999&markers=color:0x82CA75|41.49448,-81.7056999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media2.fl.yelpcdn.com/bphoto/9bkcnfKPSLx8GSvQrMa7FQ/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/WvmOu0iYBZDCDijRltJb6w/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/b--pAKzt5BSaD8pmS40mDQ/o.jpg"
                    ],
                    "price": 1.25,
                    "rating": 5
                },
                {
                    "date": "2018-09-06",
                    "name": "The Western Reserve Fire Museum and Education Center",
                    "startTime": "09:45 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4932,
                        "long": -81.68702700000001
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAb4vVPZxePfvAMCm3FC_FPj1o99oYCfuStPomrwWvK4vsRW-LBon2tjuWKeeklnCNjPmUqJoQbRZjhd_U_YF8LUWlCduAY7XSJ7Cx0Xer7R5tSWKqigiKW6YPmVl6wdNWEhCcenm_RbJmLYeTMxeKuMU0GhRX3JARzTDkut3wjgKtbh6rQpXZWw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAhNS1hJNiGjVQrOa2rd_d3q8L893hJs5-sO90v3_12VY5OQk4y4vWjtGeOnXHXpOO0DEr29t2om9eL8kUZfWQ5kLos_I1FYJKNS8Zvx5T51LXhCTh40kwRtZ3c9QpvS_gEhCH3-r1ObqGemQMJ5ghOyFdGhRHiqfJZ92PQPiQ2SpqpGGXXT_Nvw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAJ3lSM7UCnqyomI5PwO4kOvLrnaAyS73NmSzo_EBvc53CZtNEUj5BtVmJOKodJmxyLlK4nBib5sBvudG4r22hdNjqIz2B8S8B3HpXGIaZER5CM2RY6Uo8Iqco48O_chaCEhDkLxNKlqx9sdoDvb1WrSofGhR8qATwldTxDSEJfkg7jp2jLaal2A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI1PiHQ96pQBfWutsG6bMBYmDjQYVA8ennl9LmZ_YAvHBJD_HGHqKrbUl1TEvuqXaG5h4WoZuKqBDBcCHpS-3P6rD35_NttFN9oMxX5peR0yjApRw8_oEkweJab55snH2EhAc1272Ru15PQyhtdSzaKweGhT4hMm0K8QJTNOqklb9R_cdaNAYbA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAIGX4O7KLMKQJHFhF2R_POSQzWbpbyhfnzeMG1VCOtPYYIoWayP5w3oGys7A6TWn6QXSKxJowI89W97YOsVtOW_Qullju3o7MPsMCDYugd3n2Vl-RRTjX04QmqOunhiIEhAOWNGwFb5eFThfART-4s9mGhQiVQndXV-JFi5zy_zi5-zO7yEg1Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAjOz-WXXJFVsiSRMNrnpTZv6R4gSiCLyyfa7j9NjzzVMiquEZESDMwfZMm-urHwgmHOCRGA7svr3Zj4w_JPpuNZLhDrqX4w0ETxtaShSysdXZUHouTBete5vr3lVQKlTrEhAgn6xDl1qQSdLVp0VNNRw_GhTCl5vlE4cz5ywaublBbXhMv-SSuQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-2dTH_MGyHcz0e92go1m06Nm2d40PkVaxuWLG1bNzd9vgw5o1NatIiN2HjblWDm6CyTMTe9x2LQWFyuMMfX02NY9-cNeYjHZyk8si79Rph756OweJ8R9ug3WSLVQPMuYEhBZhk2qXZaO5-A77uISkO7PGhTU_TnfMCXKZx53RM69Yo6O8FZ_tw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApCJYHT4wxhQym0SnF3tgBNQMpYAr3lkW2fk9Ekvcs6J2Dm-tJvG8EWony_ov4sjvUb8prTCfvXCFSpyBYKWwKrMe6qqLknFPaRPS5F7pXVaA4qr1sNpiVd5wiRvJjbxyEhAzrgf_sga6InflotOf5rFqGhTKjiWz3PB3kD6bu3g9c6NI19LeEg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAVlcEkAmp3SuplDV_tL5fvvG-T9Q63mDoM405RmdggXxCH7a3vh4LcFGyQRSSM3zaY-kg6Vlk01eEBhXeomaU4_aGaKiA1VFIUK0j9wMrohUElnHgLvbaKLStPAP1XI80EhCdJSAWgY1WN88mSM44md8iGhR4o59v0eFZ7wPcCH0euHAqZUPE-w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPU6aaB3NmIXHUvb5z4R-TteEB3U9feQH7BjaDt9HEYZXYiU1hsyD2ksphGbjxy3hFDlyaVfBwnwsW_Tp9VfskeZYUDZ-AGVhmotIhZ-J8j3Twz9KQcJ4v3ajIcAtxq7YEhA7hnQz5x7h1lQKD-HMFCYwGhSB2DsKOQhb798dNBztVS6EmC5DOA&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4932,-81.68702700000001&markers=color:0x82CA75|41.4932,-81.68702700000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-06",
                    "name": "Wendy's",
                    "startTime": "12:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.48253810000001,
                        "long": -81.7066734
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAApzbyQxeSNXDIBKAbSxuiDINrxwd65_UiEntElf5NB-64Jl6BrAkhKMOt80bvgd8vo7s41r5dnGNhplxzEXis8ZZUy-Hx4X8olWXClOuaB6ToiiffN_XLlN07rL_y32o1EhDjdnTlI7eHFkJoiDp75VsAGhRE0FuEk7Lagu7crAN-Mb1igACN6Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAt0fIgmHr50KLZQZ25YIs390g-vZcYc8hVlqONOasQ9bLdNEl_zVIj3Ez5ULQzSPDJF1Qg3eLSCiTqdhQHi-UQoGYpBmkZtrIPUMkHF5KaFxceyF-pea2f4NCWswQ5AlEEhAMPnATKC5HZ2g9V-vBybQ1GhQqpXUVPE9-QTbnqqbb1h2rNCm8tQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAz8Ks2haz02nJKgR-RbhZGl0lKZiafwXoKdz3q3Q7Dt0oPhYo692soNkDwVaBOPfZbPSm0C2TIdHI1h5a7twFrjHn3gYeh5i0UPpaOEfwm3Aq_SxH4a4l6yOcgDDfaGH_EhB9a0_QZuibCxRSVvPFHrE_GhQ6NeAxzp2SaRLK3DVLs1Jeur1PPw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAPTvM4l3kzuWS9ZaMfS7eQ6G8eBerx-8c1n6RbGJncyMugkbyh0o4k6HwQBm419-q3jpTvfFM4Kygr081DujVjYxHFlpFrR-d1T3X2r1AS45QirSdSUVmTivbYR1i0AtDEhDKZU86JDqNYoFFJFYq9oyZGhTCDPH8PhWF16e-EudPlBOJ-eQ6kQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAk6SXGNmmcZQiTBRgY72q7_mGrRO7vGBscJbxmYu8C6jz9NpROVc093_n3X1_-b0kYmMAZ-8VGdUA_GZUve2w0ExA6YfDFE745hsQRQxiuTiFFVd1DQLKaK2-9k9ohxn4EhAHyfrX7lZwgMzuka-pgd5UGhQWCUEHglb2vUrku8geQO8P5bZiLQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAiUaSuQaf-y9xz_HYzfbQecJtyTShQZbKrF-4X90CoUBDXYPDA-lX_vCdNJ0dGEMOWwtXUxicv8WGzoPzX7XwWyzYscoFGyKRuP-ynT5gwIyh_U66on9-vy5ERAdrZuAcEhAjTdtWrh-bhWvyRBd9K1FNGhQZn9Rk46pbnCkHY0LH_pIE3rHi1g&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAncqVK3NjQyCjHRtrWwQyqXRzuwFaqbE44Xd5NgT4WS4Y1o8twHrjyy156fc4Kw0i009nluO9QXfX2inG2CN2lZd2WeYUHb3HZqVAw19g7Io2SvEoG8V2kmGEvLYmtdE6EhCTq-V9IpTnbA3ql1o7xGn4GhQH-KfBt8od9BkbhG3sFFtv2XUV_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAyKznp6m8rL88rjWPbvI0RGTIyVOFQDcqOIPp4dU1TdfZg5G2hXAxi70WQqGzjBVD82V4f7MYf_AVrNjX6Rm86kg7OTfg-OKoezdGKRUj6MG_9PM_PBpCzP580Ok0hMoSEhD7jllvF9IxBwnvMItPpz50GhR1ZzoMqDQTl1SlNWBNtOlRSDM2tQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAb63v8lWXc8UFdTgyklKoSW2jVV9NLV6phETvf8SFUpq0L5LRAnGBgaPSk1rAlavViSGiJE4SnBLR0xYXZUFY1gdRtcN4_92XYIsIa38nlcAH23LrtVNVYzCX_WzFapOxEhA4to8u08f5nWNlcG6ScaM3GhR2Sc8Bg0AZ9UkaHtc2fwojTbs57w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA8N2Pya160a_xWTu0ZN_4_Xw3d8K37itvqibnWC63PNG4db_wStDQuAx8DLs7UXOKfw9WB7bW0e-IValbmgKI6ShsjBixAhOREhYM2Is5ZOKDt4YfDEdpxNaSCy9TC1mgEhAY3c_UN85DA1jqTzaOfFhBGhS1H8oxgV4kFW5P79ufu5MsUp_5CA&maxwidth=400"
                    ],
                    "price": 1,
                    "rating": 3.8,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48253810000001,-81.7066734&markers=color:0x82CA75|41.48253810000001,-81.7066734&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-06",
                    "name": "NASA Glenn Visitor Center",
                    "startTime": "12:30 pm",
                    "location": {
                        "lat": 41.5074192,
                        "long": -81.6967284
                    },
                    "website": "http://www.greatscience.com/exhibits/nasa-glenn-visitor-center.aspx",
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAATJHhSHiaBowsw4T8Pvq1jrjegIN7v-oh4dYrT6BO1wWAFgAZ0t-_-Pbja4G6O8TIb_OjfsDm-e47c1HkMSqH7XTrN8DvtC30TM2_8efqylyvCM5LWdLhAAznDEXpq8SDEhCL0pvn8QqqxxHiRXzn0ID1GhQj8C4mLQFI-lnhrMmefQDTJJxC_A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlNPhgH4j2AsVLtZqJG6GEla0vhAyMq0PQmh740GznXaqlAgIdQp9ZrKkGs_kIa0w63SSxaQOaUdbkBasesDtohh5jnhVu4_2gNkCMp5tnxT9aat8D3ne0F44YOHpMbJREhDhZIfJKdTo295bhgC53TDzGhSH25EPRow8yp2AuQJFgyChXvg20w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA7YlbT9fx_Dq0oqCMl0xlojvFs55nhygCYiMsort5L-Hebh6sCmHmG8XdE9vrnML9QTcOGjMxqbWYWKmPer6F8eqfblcEsKFlaU1Q7LMS2eFR_jbThMSYWXWo8qMiPnIrEhBtgcH8I1HjfbPelCj87vDiGhTmyiMsYV94jo_0dINgzO_oEipnvA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAACInlysvpVtzBCYrYy1_5_ME3KS5V33-8XCAsJx90t-nzz42rTLKVFHFpX_Xr40cvDDyBfTwkysv7EJU6apompDfquBP2E3rzkLVuMqgXkRkx7mmYSp2Ms_5v9-9XUQ9TEhDAXuikpSN2H8LzHqweVGSbGhQdU-rruMGUqviRJWjcDdSyT_-WXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUZEj-sYIzodulMIwf3-lukrcHAPHLEgRGYhEJ9IfQYYMVJVx2D4Vlf3Mt_ivuSvVTTEtFUk7fh_pT149wt13BXz8SxW79sDntiN_2jCMvd3DvWjJ7vBdCrzemsO4Bd4iEhBR-Wv09xcuZg1AY444baOQGhR0TX0k_7bGZVb2ZEHnsXPpWrYmPw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnWnqhMdn_bW9zBuY4xuTYsqRheMscgKvpYD2VkMcujqWuknkQb7H_M2W0Usb0_r7L3Kaplppd-jaLOTwQTJluXUdx95u9ckylDTVtBJsbNpSGDIPiMkoQiixvY9gP8jwEhBmCiZ3x3keX3S53q8fJThWGhRmqksuKgRbKE71FUYE6aPhJLmpRw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAX_fOXBtTnrqMXz0LlYeZVDKvjQktLaU_MLc_pX1WABK1bbSDtNIWBxf-GrcAhbwTsxMFYqwg6bHGgDMH9C9wLVuHQwHdkM8dScfGX34qIvmKSWG6nGgeX6vX5ZOmPSPNEhBQcfz6Zm8y0jnnJCCqFRytGhRnj5slTF0NJic7Cs8VCYSzpFK5lA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFNL_j-XGSwjsknbBcIMejduz4xN9J6_kL42bD61xRLifKJjxSdKJ92vHdtu4dEgO56Iw02HeNEARxcYF9Xf_wCEyMhZo1wy-AxEu_QHmCO3GCSNJM3vvHOoWNn0M2EI-EhBH8mmGYM5Nc6GuEJvB_zekGhS5ZfdA6Q_ZrBonV-HgWRMmk93nSw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAY4Hm9RM0tOoNwrXEn6Oe4AMZ9rdhkUuuKhzQvcK99GJW0mUVlOe68X0gBNzNXafS2WUIPACFHrE4OxKcbr7iIyrVI9t90nuMKVMbGM__KZJ1aBZ59uON6bVI7PEd18czEhAm5oqJP7SMC0A6JaP2WKEoGhQX9CoDFcMbVLAxAvle4gPXNEVCcA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAFoXAOdrGtsslWTTiOXknFLnPFnPWxDUYDzwyPWYsKpFy2jbyrnOIb-US-BXGM4QAjhZnWF7vt24qRInm8Rf8s1Z7IqCGfeBF1FasEvdLh5E2KKgTtFcGoe-MzWPpOnWiEhDX_KuCkLDXPfJaU2x46e_nGhRCTb6XVhEN3PYfi8Ggk1bKriLNug&maxwidth=400"
                    ],
                    "rating": 4.4,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5074192,-81.6967284&markers=color:0x82CA75|41.5074192,-81.6967284&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-06",
                    "name": "Rainbow Shops",
                    "startTime": "03:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.49713920000001,
                        "long": -81.6934704
                    },
                    "website": "http://www.rainbowshops.com/",
                    "photos": [],
                    "price": 1,
                    "rating": 5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49713920000001,-81.6934704&markers=color:0x82CA75|41.49713920000001,-81.6934704&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-06",
                    "name": "TURN Bar + Kitchen",
                    "startTime": "05:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4972146,
                        "long": -81.69434880000001
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAqL2GeuDVevJhfD6SpfDVz_aI1mYyQ12PJScQUMt7Q_cvlYZNTwWRCiwMM9FuxP8ATyyn9FHVjutzcXKMmodB9IbNnF3KDfR9gWjcbcWK-HlwroPlkEdNJy-j5u_QdDurEhDBVy2PSN8UMe1-NTK5_4STGhQXZog-_zskzxN7ABdYmzJM7BijuQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA1fLimZdxZVAkjDFZh8UuefPekKnFel2w_pWUIOGNA0UYMHneEyhs0tbrOcv1fHkihoUIO-1o2ixgIvnuP5B8g0sSLgFk2d4jpH1OTzxFvhqZmoCBuHbqzRY-1QEFP0MsEhDdztx8hqPrlJsFu3plDRJQGhTJ_BaxFGkaj37L25diVDpxJPaiYA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAwt8R3mlQD-pkHDZnEWHMqN-NCe8yJlrjYnHXLvwRpwT8YserT7CDeMafcO6F1IzUzlt7QpOZ8APawE7aWVz9ujO98lwPVI_4T112y6o8wcbox524lzpybSpUV4KqXnYjEhAP4ECah00l2tHuOt3jsKJeGhTXhk4NOqAOxdGMlxUD8YjRlRVIOA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAeETTK0W0EZvvD_1_Wt18O1y_1Hemue_3W3vGqfwtiDJG-62vt7SRaXxeXDw6Z_qkTtFVRMKpYJ_Cpy9UtOK-9Gcn8dIWTOw0LXjuBky-6FfDujVKFMCpFJu_-avwhrR5EhCcllKgT53-qrf9JJrrnz3PGhQWikRf1sLBAHj0c69JrlteeJ5NYA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdfKjrsM_0K65d3iLQj_67fJicluf1sXWlVaigHb8VRlRjWaqZUQU439yKPYZLttP2_I9AaKppl7zbmOSSCTQV11irFRe0K0LD8qlk7Su6cl3a4Z46zl4nqUeaCkTp5tQEhAqWNq_qSW0tJcZn8_h-tTtGhTTfVB-lfvPX90WZfgM-k7Cw-4E0w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAz_arbVFHkemtrUMXt_NpKGZ7XPHVTrHE1WLRwrrk7SOnLIU10PHHVA-rftVrRatnCNBppsc6skPK7AA9xPEFt0UBmsfYnrCiyhwRTIHk5m1UdBmgrDt46jzyy4BUgCRzEhCupMhBTfffyZum80jCHBgcGhT2XVeuHDwSEaFG3BFVm_bE7jEXjQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA6xPHRC4jW50yhPSdfDOcI-3DoHl3G2tZPVMru7GlAmc4V-k_AXGDJNcJSXC3P0Jf-srbfmYtlp_IYSMAaa8sRc1WCb392GPsU-wpsnEa7ObFpNW9H6cbRt2I0F8_mCHnEhDLs5C7bw7xQbLzj_IduLWiGhT7rj0mdgnm6sZofzWojQMKjn0s-A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAG8SLAKgNvYxq2VnKiagkYaKBe--UYfoHhP90Sj2YPONvyMCf1QXPT5ThUy_9lD9yImPc8yWUSvaIVaH6z3yeQt0BtVqYxItfO4kosm7IsDFahIYE7xN6C8M2FvBkdfhCEhC0k2pESH2I87AGQ_3Jmo2SGhSlDhfLnSesod6_0FDwOkuo-S-Mug&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9YmdB7RFywB30ItNv18pnOk7IX5zK4ialIIYgozlQp573BCz50WKJf7FtUh29bAe2elvwuppzkA16DfN1xuDUWsgVnntCUA0SgzinU_KiqeDt4RiPKBswM1nNytYvBu0EhCIaICtn9ZvetNYWlrrgmWnGhTcubl7YEVRN730d2dvvgL-TbIruw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARl-OI6KH1dYI1gtaUhkTJ2Jlnhxkmimq3svRfj9o40D9tj-h-zjvfYsf4Sjf57PGuMYR0s2mnqlIUDznGspTCeIUOWrn_UfmdD3g5C7UMmhsu1Cnx-GhWxxOqHjL2tg7EhAQPBBna0ECKVJTC0dLobTuGhTjthFojRpNsun1mI02sOcmYQ_M0w&maxwidth=400"
                    ],
                    "price": 3,
                    "rating": 4.6,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4972146,-81.69434880000001&markers=color:0x82CA75|41.4972146,-81.69434880000001&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "needsUber": true,
                    "title": "Standing Room Philadelphia Eagles v Atlanta Falcons",
                    "classification": "NFL Football",
                    "timeUserShouldGetToStadium": "2018-09-06T22:20:00.000Z",
                    "date": "2018-09-06T23:20:00.000Z",
                    "isTBA": false
                }
            ],
            "date": "2018-09-06"
        },
        {
            "activities": [{
                    "date": "2018-09-07",
                    "name": "Heck's Café",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4841234,
                        "long": -81.7082626
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsN7jzcrSI-QUrm_BcPHizEJWbqj7BGAyjXk3DH-D7lNsDYAc2RMNsLwH41D8Cn9xTZAIzPNp4ZDCKkQkOoNyGuxzkV5wl-H3GBhRENf5lCmSZwYASM0Y2SkY0rbPzvw5EhAu6UeOVoU51TZvtbjXfZ59GhRfPuBj9HVc3YtFctjiLfg_nzbGxg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAccKf71J9cC0YVBw4J1Rsogg66piFs4CJ41A6PsKHeprUXmmdThqhb0FhgotRdRbrsm1PMlUImesGN3ZN5napC3p1qliYp-8mEWjR5XHnMIZ4D9s2sBCWjiANiPMl8xmtEhAIh6B0SmiFG2jeMvHzFFDFGhTEgtnnQpNTDbzvvmug9bKeo0cNpg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArlOBk_x7wYUIXO1b9Pq5NSRD_SSpzq80Te-lVOMs2f2cVQx-f3u_tlNFCt0wMHEc3ULdqilxfGOYeCwQsErP--6kCLmt7ZHQHQyXF2BgExdxUYkRh-pNNH1H-UDDsbsIEhAydJfYHFqwNqvNV4sSin7sGhRQPcOaCVwvAC-vq5HQWcqnwStrHA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGUtyB6yyYKworicN8JhlgqqpIDLsdZNThfdK4bkwkW3Bas2OMsSwOVhAz0NQHFOSBPKNWhdLD3tpH86SHUJ_JrDquaFsgyci4hEztSarB5_3F83obTFWbDFrSU6OGJYREhBD33dbV5KN9ntfGkiZk699GhRP096FG-omr4bppuYb8-dKeQC1yw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAADHYzIYrtIrmVxUVgl8qID1VtwMGJ2JD9MFG_VDa9axATxQoCx5-5ho64Ui3r5-MSVpemgwtMHM_vzxb7cBDl3Wg-2auiidx9Oa5SIhdR_eT5Y8QG0sC_TYBgeaQwIcZnEhBBm3kkNeAmvLgru8c_tnCaGhRfOEUxJEHQScpmLbHfw64PJdmYXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAARFkNwgbJVqaf8_TXpga1CRL32FpYM-Mmt4p2piCxMcgh8Gq-JGPIGeUgg0ewfX_xUz_RdxjEb5ziZ29K4WRn3gMOc4R0Xa9ZqsysCRP09KUgetE9vcsoPp9Jn75Rc7gdEhCJDBM50CMswhA1H4VuBJV0GhSjNiZRCmQ4gHDT2CkKpvI_mgdaig&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAm-kw6nZGfjlb517BB0Sxib7aL3kPWc9zTj3KuUMGKpf5STMJoPWHvfOh7zepWMaKbGHZ07Nx9Bbm0ZJOwb1qul15LEtond_1cjz3Cci7KtEpeZixG1Ayo0bSPIDkmvTQEhAC0oG5a9YudNNfDUo2RFghGhRNCvgl14CK42CO_qxA7AgYff7udA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAu51fcVmf4flBwaPc335iIzxpBH41CoKQ22G16Ex6sZn0xS6XMgNq0WuT8ksb4d7ChQ0tJowh-Gptp-5ynR2jx2GvTrZUTV7AjA94VFQ8CF12JeSDKYWlDpAbFODT7K-kEhC3lx-nhWFjOz1Conu-sJ70GhQm4_Xaz3XFMl20BrcbZqm1jHAsXw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAybi4a9ujIJjPzn5T-duXBy8Bgdwm8vbGSW3CuHF1O1JtUx0UrLVNSulKYM4n-YvCvvI6N-gmD1so4FpuW1w_DwpPegqlLgTPJ1LvG4rEzC3K_Ozeyt_e8ypu_VFCNUPlEhD_alFfsbenUNnCx5CPRet2GhTFb8GBJFXEwFSm8JsKVoOMtoBaDQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAVfzDwx6AHrRR4h7Mf7iZ_nZAu9DI_MemqO4pu37VeUFQRv7iK7TBuQQXl2E09TgW2kvcPyPFIRjw7equAOXZ2jMeHZipwxWpEI-36femxfIRi8G_1YJo2qIfWFxy8dgnEhAU36GYltn4yPJToNlQtfsxGhQv4gTr08iWm-b7QClYwnsfbFgaGQ&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4841234,-81.7082626&markers=color:0x82CA75|41.4841234,-81.7082626&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-07",
                    "name": "The Children's Museum of Cleveland",
                    "startTime": "10:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.50426299999999,
                        "long": -81.6598549
                    },
                    "website": "https://cmcleveland.org/",
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsHhjcj74--uJjfdT3AW1FlTdpS8HeVw3xLnDTmh-1bAKFfbuxy0xNBaQb_nXBICMx0CeoinGh0KJGusNv-hQhxgIbKeR1OSPR-oN97KUU3hCIBMPzkFvJasPJJmJXn3_EhB6qiH_ixxuHjfw8rNVLrIUGhTxbW2lqwKzfpdTAmH8s08bYvkKkg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEvuornK0_sFqxWmugIgTSqzw1CeVlitrczdxVRCEhTV2t8TWLb3oI7-4vRma-69NhwIwznZiq0pNcVZiQ1N3rU_9Rbz-jSkX36Wg6ngEWPeSUCmBex4aaTqaBto1BqEOEhC_uBv5xR6zf6_g9F8Xjkq3GhR-3cRnbI84Cl1zVEmzX8hChORU8A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAG8ITEU-3_YciwYqIT-s1_tor8DYaPC4JyfiRmGF3-HtYqetPwFGobLWQ-7HGoQp0WjdeirfZ2g962N_rVy4C-n-uod8EhZQ_BU6a4WGv7uhaR4uuBkGJO1XoA3NCpqDGEhCzCvrYXIIKofSBdQJKuZvWGhQLCTbsIilIasnTM3LUCtUiZqs3lA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI-HiS3lxI_8-y71OrFtDGEKfINHMFHm7jYNMbZQ_hooT2i9T3OfWYsjB3CMiQQywUieCB1Gvwah4LX8KpNCL4Pja9nazQhcoSgJrmTuA3SNshhcH3VBnfTpdqDnpX836EhDTFW-rLQhy7hgRvQ3oT9ymGhSteOOzNxdp9XSMBcEXrfvvBq8lXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAlB912nwEYbIjmXC1iszUiCjinWetl5iTE9pYc5sLfTTtMe6YURtOXIozn_IsUscnAakoSkQh3ICa8rTinXroe0yhhjHZr9HG5frUOHBk1AlXv2VtR-lLjMwpgNJ_a7UREhA2vkhLcXDhX-i3wqVvkODHGhSspPigQLRE08xkdTghir4_hkgImg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAQ6ROhhbypLLEALWLWDoI81cbXWxRoy4JZ8QK1-MaWnR8bKZkqgqPNfcCtmcdrpPCgEmwWng9vdJrcQmWPXWPcUniEuBWHS0DaS2A9MRkgOVdzhEaEWR-yD-45sGYbAmgEhBXfGKhF9gHxnAtV5EO44uYGhRCoS-OytlJu2AJIg-TsY_AEfMuQA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4TES4xSGXjvERufMfy32tenceeoQaOVeRuDiKM4Nu_VWOs-Up1pT68yynVym5MoBMHVk9txjlt0cs2WpwY_hgojRc6WMhwxTL528VlwVgEtPKVl-5QAOoy_QwNaDVeCOEhA6c9p_nfuULvT_kbSVw-leGhRDtdBXIcTr2lME-H4XbbaS1bm9MQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAmrNVG8S_3iwKbJ5mEvItDfPTiLz7Wpt5rZsoY2c7bxEUzlFPBrjV2jQrAVAnaPuoHn5jD2O8Yt09Y4-C7-lpRcs4DC6X5UvVnF7HNOaet7trBypI7UPzWaDa_f23ZdOEhCaF8FDq6KKEQLpgCwKIKhCGhTaI5_UJYYZTKGf_7DuVA-lbrGt1w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAtRy50G2cjxwiLjboX5ezpboLAAlQCeWoWUHzKZIyEapi-_eteSSZCA3qViQJhGaOsagAfmK2Oac_4shd7kpjp3W9moriY5ckoZJsob-xFXs9IdXuhVO7VY5TPjjMWOkjEhAreNuZg7jxZnbJBLRZHReLGhQtlhod6w8QuTwq3e7SD5wdcIPc5Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAg0d7hmc4brkqc7-lYHuBy5hjNxCKb44lC9OMn7B3XQGgiRPZVcEounAKSHbsL5lepnOU8OSC2rUsYrvJvwgrJEcMt-Qas-zA5h04xrkjoZ96ZU0-IA9Cg_bbz8j7jRfCEhCgSNv-QP61H8oLQdZD6nlDGhQWt0OeXwz20CeIrLCl62Yq0R3i4A&maxwidth=400"
                    ],
                    "rating": 4.5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.50426299999999,-81.6598549&markers=color:0x82CA75|41.50426299999999,-81.6598549&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-07",
                    "name": "Phuel Cafe",
                    "startTime": "11:15 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.5006907,
                        "long": -81.6824334
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5006907,-81.6824334&markers=color:0x82CA75|41.5006907,-81.6824334&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media3.fl.yelpcdn.com/bphoto/c7jHefAaQwUPrpToPTfIxQ/o.jpg",
                        "https://s3-media3.fl.yelpcdn.com/bphoto/6AGE5Wp4qTVjiYqvXDtBew/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/8d5i40OT5HPf-e7BjPzlLg/o.jpg"
                    ],
                    "price": 2.5,
                    "rating": 4
                },
                {
                    "date": "2018-09-07",
                    "name": "Severance Health & Wellness Center",
                    "startTime": "1:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.51585599999999,
                        "long": -81.547927
                    },
                    "photos": [],
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.51585599999999,-81.547927&markers=color:0x82CA75|41.51585599999999,-81.547927&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-07",
                    "name": "Banyan Tree",
                    "startTime": "03:30 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4813616,
                        "long": -81.6867726
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAK_WeHpNc1cahCefJAoZRkPGbNM-MTQQP-vxrsCcLZGYfnlhOfKs-dNbnXu55b_pjLIk9X1apMLwqnoNjYeauyn6YE5EaKrJDmlRewYh50kiR6n1k_sXKWcm9CTezIhysEhCBnfR-ugg9DUvnO_7E3KccGhS2-4lLdL-Nb-OeNOOYGRWmPdOi_w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAm0Wo4g5ukUb-JeIASXVsOY7WfPfbD62MYIPSByPQhLWQFelAVeN8lKcl7Ccm95Vy5Xxe27FfN8zEDiwj8El48ik9pRnTUS8xLMv6tyL5NtOdk8T7k53BZ2lG8O3ZBdGuEhCmMilfS8YChjXiJ6S5XnO4GhRTggdIE0o0KOuB_EivWdmz6GHl4w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAASY9TqVrTOYBW26TFvJiuufCq-M8NFCt41L44Q7FE3ZcEXUxvfEgOofvrqyFSmeA8SmcAp3zCepfCbZ4oXI7m2seJJTiBvqbdMeYdPgqTXZDd4M6XNF7YUCFMZ_ln9eBcEhApOUFo_zuzHQvfhZchIBvIGhSJtY3wuhng9aB-dXxNnW88_c_sgA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA16-1svHjfMYvRX5DGk9zanfL843I2sbgrSTbZEZTj7WFzt179omxH1Xlj-i2TZDjP5jAXjSsk0vojEXM64oKUhkl6sUhXR1n7TlS9dEK8XzdzQg9sNvX4d5Z6hydaZxAEhB32nKcF5TUzkpPxGKIxXBWGhTv5HO8jBYXT6tYJ3UG8_kdsmVn0Q&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAnozsBuOniDUKc9uyQwkkEa9JkuheUxtOLHRE43vpWR2P2YdwLIAH0HLF1nP3x1F-LMY8nyXbhBcJZB0JeNZgSDeY846DeD_67lzFrf03OgXF1uoU4qeaExzIWI54GLUNEhDRB511W0YzyE_bakQa2ZBuGhSdWUH0W9k_KQasRV7yYK4QzG7JxQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAEVtW1EGNWGJ10-cxTPRvI6FfgpPvsvBLogl2E4lmdSqKJQINBugRDgccKP9KqRbC4hClkWvLtZlqNNdV5VlynhcGBB_-i4znPOJtyhWsDz20s56tw4m78u5naBYKGPvrEhBZvSyRSn__J2HB99e761w0GhT1BGY4qVIzOm6_b3RSWEqwNSUiUg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAydgcImqSnRlXR0misF8aMPH_mT9l5iH7ezQGatUPW_3uu5Hq_OifqnW1ot6_Pti9-nRCa1kr0fNruD05BZdIvRM5BQgP0_8b0GzqGH_NUnemXtUnv-314Y_hrYF3snc0EhB8xVC5ipe4TmnWwOpt3n8CGhQa46ZMDdhuvy8WZ69sxRle4BYVjw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdwdEaicZK-2nqyifqOqvQn2yiMpeko4IoVCj8P0AlrcJ5mDR8bpKoLcDGw0UxObi4-AYqU-8o_8hvE3DN8_jcyXSQNFBidriB7_8OjDpOqn79WfX_JYx5p0theiI1LMmEhBvHr-Jh2X9_YG1E0iZzPF7GhS8BbO4cAu9vPs-pk0xQQGbxJMV1A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAYo2jaQ9kzBdWGwwHGZWiahp6uHXtPuHFkxXJAwwiYk4_QmEWpvogEdwPWRxm67Vtl3z3waqJXDbKGahEc_15S6fbDxYM32dqBWXyqaRRcraYSXfi-G1jHqcAyLh0ewu5EhAaaxgFQUVoM2w16EWg7sO4GhSwCdhJ3sA8llcCuQ1wyj-vpNc0xQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4uDKVKZ4t_MQ_5eonNAvfs2rpCJBFOe7os93Gg3OtlXRxSkdJrbIi_V3H1amgJjwKbcPYwKyu0V7kpCi9KHQnO6CzRzF-UkX5y7injIhfqxERY32crg0MGD8AMvoA7sSEhCQ5Qo-egz4yxKAyyouBzCPGhTnAeCfsfsNJNkz_Kmz4yLjERedtg&maxwidth=400"
                    ],
                    "rating": 4.5,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4813616,-81.6867726&markers=color:0x82CA75|41.4813616,-81.6867726&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-07",
                    "name": "Rebol",
                    "startTime": "05:30 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.4993503,
                        "long": -81.6939436
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.4993503,-81.6939436&markers=color:0x82CA75|41.4993503,-81.6939436&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8",
                    "photos": [
                        "https://s3-media1.fl.yelpcdn.com/bphoto/y2SvEJk837nLdO053Qgxjg/o.jpg",
                        "https://s3-media2.fl.yelpcdn.com/bphoto/fe4k_93dEYvEgVuttk1XEw/o.jpg",
                        "https://s3-media4.fl.yelpcdn.com/bphoto/tHfrKOXuJ_eg4Yh4jN8QAg/o.jpg"
                    ],
                    "price": 1.25,
                    "rating": 4.5
                },
                {
                    "date": "2018-09-07",
                    "name": "Jewel's Dance Hall",
                    "startTime": "06:15 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.772425,
                        "long": -80.85232909999999
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAC_Oilw_fXVTQNA4B1KbCnkJzcQudfT_bIIv0Z_QFphg86prtjZq3mmDaOy6dAosXE6b-I5U4DNLVd9uNd4kj-5Rlr6cbqRw2ouoZcqvznKS3kucdTOQzttjsfJQBqsa_EhB1_hbGCC1EtzLAOVvCzUQbGhTvUyX-seULVwXARsuN7WnXn4tFzA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA4_KtXal0RNNMU_s8TDznu1J1_KcslkR6v6G3yClk0Am0Q1UR_LGShmo68sXfv_NKuc6oAAnIliUIOHgBiZZnEVqTsdwOFzcMUwsUOdd6J3VjcDXlL2FUHjEfYDxMWQB1EhBXevlsVMnbkCTshWRURYqvGhQP-LMX7jLnRyDjGFRHemUrmgoTFQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAvgXsxhI5YjiJf5qhsynxX9f55nAXSYJkrGa3drJ9BZ5TKNYC0KFcMc8J6xiZsfftm15izUcJrf54FSn6JJ2ggTJJlS-2p2rCzxCU9YpnE5XmyTD0I1_Fu1Jo22c2mAotEhCgcF-7iC_MKVLDdDzCcNWiGhSQNgECGQeB81Ti44JRy_V40tQWvg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAArpcMkPqPvvYMCevDB8tiNbOjNELsVE0jTTPXucivR3Axntds54dMhYm_-iRGBPb4cEesU3LchcMQpBaeUwh8o464JAhsVTnI6fRXqd0n3CWe6Jh_bly4ESqdBQs2CikTEhCZJRZWKZf8eOV6sRgmJS0TGhTewtLcQYixCwqX61hLStti3Piuxw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAIGaK34okuEAxKfOonxS1ObI_Kt0IVHU0pWoiu09r6b5CO2HTHoGxrtaLgFTaZ96j3g-JOIIO-oznBNW_3tSjs2lWvEIoBjd_Dvmq5dGWjIKTnmJgA6XykUAuq3GY0qF8EhDHkFh1d59pD-hfIRYUnXlJGhR--sxwNveBnVptxuOQZCQGo4XQXA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAUDALKET24-cJRDLP-rZSTotEfMAFmU8dGciYMASKwglhN9Rmemm2JqpwEwaxzCtSo_CHtU9aCbeoeBhvET0xWzIhm8WJaj9ctLPT8AkHoxSq_KinUDOUszhLJS_MjntnEhDZw1q3R8_Dn4CmJcDHZhXxGhQb3pL2tzY28wVWMMCJ0JbzQ9kE9A&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9Q1VeXe9Fyc8cNa60SbwNdDyNqq-UefrtczQzbrbjg3EkGxy0E3Q_JpXuvaIOB2CetMFQJWZq-WfQTFYIEPsZi4ljh2cYTWqIbKUjWYEZQwGPz5iIwWhcw6KCxHDez0TEhAobsHFky_qAnapJ_z1G-BkGhTIh1kc966GXo7NGWgtUG65mGz7pw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAGquIpz9CsQ4-cUum-7iVloiOjDEo785-CKHtms9QNtY5ZKg9ginCmtRGKSFGp0tWZDOQcvMKCG8BnPap1lezZeQtTkp4bzmbRX6XKlg6Fd4IuoJzWDZpKchSLtKQ_10cEhBk_Jq6G2YY65Zvejnqs1HbGhSjtbggNci5A3mE2Rd592KPb2HXhg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAI_RjiEcG0pwXHZ4ijzgppVdrOClmc_PSxo6R43stGsYZo-4-P2NmpeMy_yGxtdBd_5jZyiTu7Fa00tMIqhnUlxgsUH3JblEwLHRZuYT0FgL0LDKT3t_VsGVk7C31ZD0sEhAfaP2wmxVOD1bKnS_R_Pq1GhR1IWduo4_NtPPTEm84522FlK0uWQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAANriKfXUVx9pcDKM1fMhZ5eZHLykiVYUVEz-Z_9qQ8nTye-gL74tgfg6yDyIX8RaMAmYl9twCXbRSoYVUDC7HxgNOoe1_rNze-2TTi6hQRzntPBpQNP7TypCC2E5bAtQgEhCWlKGuG_vCPVub6T_mC_yXGhTBuH8xeZ_-bO6DDjFOTHfcuYZZxA&maxwidth=400"
                    ],
                    "rating": 4.2,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.772425,-80.85232909999999&markers=color:0x82CA75|41.772425,-80.85232909999999&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-07",
                    "name": "Pickwick & Frolic",
                    "startTime": "08:00 pm",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.49922699999999,
                        "long": -81.690113
                    },
                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAAD5hYjDwuAiCLkHXvF--nW7h1eP4XObyvzW8grJ6zY_8ikpu3LHgwDXdp3ObNf0YU8_1IC_MNVCKBp4X5j5kfxWKqUGAZiie6pEoK0ifCxvwcmvfrIE_smQDj_eqhOSwEhCcWaygIgYzFzLKWkOgSHxmGhRbL7upbvdM6QA2HjZ0Z7s1CV86tg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfnoFKK5sL3na5jXx3AcMyJ3CHfJSGtkIaNBUvKtDNAlZ0V5w3Pd5P5xHi5dRIDc-pQsfnKBlAr2spVJzi0JnlwLy9WBq_M-vEfNYxoS_wD8IuKorwXRFzjFlfN6LbU25EhBvRSm5FHV6jlPPz_S4jvTpGhTK8cGUt79jhzwuMVBHpWH3vBilpw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-DyElXabQkOGIAym6i3zud3JfXpoww72mPwmS1ZOxfoUbPwDIaemSWYsAUCBaqLgf0kcG2EkEMigdFQwo_F3ojUnCgpTRj6m-EhaF_Hx6hH6Ia0qlVDvgYAYOn-7PdGsEhDnGb9lf4R64WzhKyRJUaoeGhSJ8DYZLn7I5PgSn-xwaXwz_4Wq1w&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAbuszOusLs4f2a0wB2xO3gTSfsMAlSlednq2Do8DbFbVIDkyMf_b7LdbKbfIF3X9W0XKPTJtRSB1N7Y7WTkslTcb090_sRSqFaBdN_VYdMfR9XsRPhrXDpNjoq7NCAqBQEhAJQ8M4hUnBEWndxF2JNVk9GhTWAEvrtQoDxVJaj_OYloGbdzwGiQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAHlwibskBSv6oKH70LXyKk24rY1kKITcm3_GwoUG2TTmxW7O5lKjas6_wGwZvTbJrsVTX__2p6WH2ONnc9bWG_gnvFE_ZjhxoGQ0hsav2zkExEpMmn7HCVrfBAEvU-xjkEhBwbd9So_WXGJVdP0RutlmCGhRcYKMMSya634QgIxodHC7iHzVgng&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA41lzA4oTDVsLuluCKNQ-f4bN7bReBxYsnRV4IfruXLHxxbLZ6LwCLPQ0ate_UjfVdMNdLW_rMACAntS-9M85nPXti-BaoBrSC6v5WQaIK61gVBqL5qdc-rJIpo4cgcKYEhDqnURhE6J8VRGM9j48bXeAGhQabo7195fq0k_ZO1TnF7SIlvBwtQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAdAG-XAXcF2FsveqmLSGEuW6RJaKgheyMreKKPEQty1UIVa07qL1iB6XdrtIohL27wJGH1pzSf0oBGfNIOugs00jIT202Su377YsbvOsGfRJZOIxv9lCYeJqyaCuKD97SEhAXGoehJvOs3gt6k5F7hAFYGhQzje9o626Odg7N6mx_IkNwXyhrTw&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmU0DfNxanGgjLM1m7TsKOyO7xZmLdZPEw3DCf823lPOQ6e13Oxrl51wvL4OTteNM2bWw7PDm3stZcdNJc7qqdUtKIhlLq9SsQd0ORO2aRqxWoNbbj0c0-d0b0gkfqMDoEhAEmtlJkDF8Ii-P7_Nm9P57GhSxIg5Ff0EX-_vZhL5rM6dbqjMAiQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAF5ljSkxno08C4sk78EGsSAgVKKaw2duzpI2iprdH7S697HKgYz8Fzxsm31QAFU_ZRCotREzrLxuOEpigZkYI20si7vtVLi5FmkokbQ4l_YgsYK6Cdjl6OXYHsJRF-s00EhBrct5BVRbp85QvHYJZy7k1GhQYQkeIB5ME2Jja1vy2KdMnvQFdZA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAALkb-A8PpvkzBIf5PGBXux5-0eGGrPXgqvtX5Y75kC4mYDimfScTwS32KFqNx3kmPfyiqQILLuYFkurOYiLHW4snAFHcz-LVEz_9cR46r_yAryn8D4EM52WrY7Xtz5_ONEhDFbFi8_411mLzxykfF5nyBGhSa4M1kX63S3QlKOQMCMy8ZKRjgtA&maxwidth=400"
                    ],
                    "price": 2,
                    "rating": 4.4,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.49922699999999,-81.690113&markers=color:0x82CA75|41.49922699999999,-81.690113&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                }
            ],
            "date": "2018-09-07"
        },
        {
            "activities": [{
                    "date": "2018-09-08",
                    "name": "Duck - Rabbit Coffee",
                    "startTime": "09:00 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",
                    "location": {
                        "lat": 41.48324,
                        "long": -81.70008
                    },
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.48324,-81.70008&markers=color:0x82CA75|41.48324,-81.70008&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                },
                {
                    "date": "2018-09-08",
                    "name": "Baseball Heritage Museum",
                    "startTime": "09:45 am",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tristique finibus odio sit amet commodo. Cras maximus ante nec tellus hendrerit, sed varius mauris pharetra. Nunc turpis nisi, feugiat sed metus et, aliquet semper augue. Curabitur eget libero condimentum, molestie dui vel, accumsan felis. Quisque mollis eleifend ipsum sagittis placerat.",

                    "location": {
                        "lat": 41.5111764,
                        "long": -81.6443127
                    },
                    "website": "http://baseballheritagemuseum.org/",

                    "photos": [
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAmCoWmKW-DW4DjPoWV2lNofAtQNrGAIrakcaReXbFGmm1ZadPnzIq3mqaFPy8Ej6rubTptRN998B4oYY3RtziFNGhJik22meVNEhFH5muyZbW4qhyvsqf6ZXr8fE3zUg8EhAj-MbBy7zsX_h_yXXySAFIGhSK-U07uv09lvKyRcWAAhxFL3H6nA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAf51gD9x_sIIAoWooCLWkuRdeVnRcITQwFQWFvzp6h_foHsfMQ6UR25iI7z9GFihS6FhjCbZj0bCDoCRrrwrU_izdwf_EU-_oD03kinX1PkkAtTF7qqu7yMlRI3KHt-CCEhATasAIz0GpMkXHT8fsOa1MGhRhkhnF82F-KMPk022n93Zc1luGYg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzlAHI_Au02p4Tgp1McwawU4s27YghET1rQQHv7Z0vMnuqCl2CyCw4PnAbGULBhY8QzzEZzxkWEVDNvWJmFMvBJHiD7quRyliXQFFomb_5nUJB-YpSUUXmrb1EDnqMLE_EhBCX590KoUxB0zycgG8yixdGhTU7RcJvG8O_QawXQyOlWtWMj68PQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAsq241Sdr9tYjpvU2w2lRyzLQx8_ij9mWv-OPM71G5rfnWiHRhJpApXhgsgKctPnDfrm-774F0okdQ-GlTzYxFDI4S7xtxVXV8LJckAusJuNEtUhx57wSLR3n9O59DDd_EhA1bt-163ybUPWAn0DC_rxnGhRbNb-0zobwShJlAh_lSDXxqKxkvQ&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAfFyxtUSMYkZFb_WF2t1gvyuhI1UYTtHPUsd2zw9F9R-kvmT0JKOLKF2kLq4nUpHCLxFxMDQAhnNYyuGg91w7jH8oOVJWID_MFp303S-EqwDl5vuX6W_7ON67cWmFB7JrEhCSgIDmRlxCrtCaJD3lYd8AGhS4U3rGW1JhvnOwWoK1WhHzWHHOpg&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAcfrvug67sePzJKnYMSR2Vj6K9CMy_AQ0dNN7avMZNQht62bpYOVFLw936-TsqKQwFLBYZY_kk8ir3aJIJDYMmV2zQZnY5L1Rq8xMPfvI-sxLk-aL4KOrk5Da7gJZeHwXEhCnz0lwRNMsTV-h67zS5AL6GhS6LtezTI3VgD6ba_SiKRUn-SGlew&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA9o2p9S_K8MivGHgZHjKRGq86_-W0tsKvBpkMhFrTMUwC_uKiJkEmQ1AqPu34X4dMSf7XfkQWRDnr22Wy-nHghdM7cUaQ-Hv2KKh5JYchyeW8DXwD90tBu_lhn6yXZO7kEhBjY8XgBAfh33GSjmkDXivgGhTaYu7_3m-WZ0a75NonajH-HFpIRA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA-TkdnAWipzVyDFoOmiw3taSg8u8vn5bHG5jLLctnLKRPin2LN-lFI8I91W6hIo6rxS1cu6jMelBIEPO0uQW0BiiiyDO5poFUzjBQWv5gacBxQ8Ml8p62mvfdSVwWI0ujEhBJ7ssCgsQNlC01J_PJ8Uk3GhRgEIR_gF0LvBI_fwL9G-MkOUNsjA&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAA5l49CjU6AqaDk0mgRz6-1NwUzPkipcMvUZ9Xy1cA7pnIpnnY1vyzf6tkTUeTvwVFC7uYchU6Oii0DSkp9FitVgwyM3LeIGg4m2SoC1LZyN9Rac2hUDd5vwiaZGUkbylJEhCNuBkHdqngGGOKTOFX7PELGhTWAYgUvenHcPIHhUCviRrLGsJnug&maxwidth=400",
                        "https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAI-CG_i3AclYYF7cc_JGka0k3gCHy9dJ0&photoreference=CmRaAAAAzrFUYvcYMv9cgOZA3OQLawK3WYC_aN4ij-fgYTMyMRH_H5h9TpvbApHVV3fzghTUkRycqSU1drowP9FH1jJ7bDCGvzu7PyLdAHQqBGFiGGpH0raM5cnfGU3C2M58U77lEhBnJ9QNz7vNaPZX5IqOEr9SGhSwtFezJLot2PSDWcop1UeAfq2XHA&maxwidth=400"
                    ],
                    "rating": 4.6,
                    "mapsUrl": "https://maps.googleapis.com/maps/api/staticmap?center=41.5111764,-81.6443127&markers=color:0x82CA75|41.5111764,-81.6443127&zoom=15&size=300x150&scale=2&key=AIzaSyB21_1VhOj8yykb4F8S-gQnoA36QJzGXD8"
                }
            ],
            "date": "2018-09-08"
        }
    ],
    "preferencesUsed": {
        "lat": 38.0487,
        "long": -84.5023,
        "preferences": {
            "dayActivities": [
                "museums",
                "famousSights",
                "activeTourism"
            ],
            "nightActivities": [
                "partybars",
                "sportsbars",
                "danceHalls"
            ],
            "food": [
                "fastFood",
                "coffeeShops",
                "upscale"
            ]
        },
        "arrivalTime": "2018-09-05T13:00:00.000Z",
        "departureTime": "2018-09-07T15:00:00.000Z",
        "gameId": "vv17FZ4aGkBiScYD",
        "radius": "1.5"
    }
}

const RETURNTEST = true

module.exports = {
    createTrip: (data) => {
        return new Promise(async(resolve, reject) => {
            // For testing purposes
            if (RETURNTEST) {
                return resolve(exampleTrip)
            }

            data.gameData = await getGameData('tm-game-' + data.gameId)
            //@TODO: Make sure you use the radius passed in
            data.radius = "1.5"

            let tripStub = TripStubHelper.createTripStub(data)

            console.log("got the trip stub")
            let required = helpers.getRequiredBusinessesFromTripStub(tripStub)

            // Get a list of businesses that we can filter and sort
            // through before getting more details
            let businessData = await getListOfBusinessesFromProviders(data, required)
            console.log("got business data")

            let initialListOfBusinesses = []

            for (var i = 0; i < businessData.length; i++) {
                initialListOfBusinesses.push(...businessData[i])
            }

            // Remove duplicates
            initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'id')
            initialListOfBusinesses = helpers.removeDuplicates(initialListOfBusinesses, 'name')
            // Sort by user preferences
            initialListOfBusinesses = sortByUserPreferenceAndRemoveBusinessesWithoutRequiredParameters(initialListOfBusinesses, data.preferences)


            let finalListOfBusinesses = getFinalListOfBusinessesFromTripStub(initialListOfBusinesses, required)

            getMoreDetails(finalListOfBusinesses).then(finalBusinessData => {
                let finalBusinesses = []
                for (var i = 0; i < finalBusinessData.length; i++) {
                    finalBusinesses.push(...finalBusinessData[i])
                }

                console.log("got the data with more details!!!")

                formatTripFromBusinesses(tripStub, finalBusinesses).then(trip => {
                    return resolve(trip)
                })
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

function getMoreDetails(businesses) {
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
        console.log("getting game data. Checking to see if it is in redis...")
        let cachedGameData = await redisHelper.get(tmGameKey)
        if (cachedGameData) {
            console.log("Game was in Redis")
            return resolve(cachedGameData)
        } else {
            console.log("have to fetch game from Ticketmaster")

            try {
                data = await TicketMasterHelper.getGameDetails(_.last(tmGameKey.split('-')))
            } catch (e) {
                console.log("error getting game: ", e)
                return
            }
            let startTime = moment(data.dates.start.dateTime).subtract(1, 'hour').toISOString()

            let gameData = {
                "name": data.name,
                "classification": data.classifications[0].subGenre.name + ' ' + data.classifications[0].genre.name,
                "id": data.id,
                "ticketUrL": data.url,
                "isTBA": data.dates.start.timeTBA,
                "startTime": startTime
            }

            let cacheGameResult = await redisHelper.set(tmGameKey, gameData)
            return resolve(gameData)
        }
    })
}

function formatTripFromBusinesses(tripStub, businesses) {
    return new Promise((resolve, reject) => {
        console.log("Got the details for the businesses...")
        console.log("Creating trip...")

        console.log("trip stub: ", tripStub)

        Object.keys(tripStub).forEach(day => getBusinessAndBackupOpenAtAvailableTime(day))

        console.log("done!")
        console.log("returning the trip")

        let tripResponse = {
            "itineraries": Object.keys(tripStub).map(tripStubKey => {
                return {
                    "activities": tripStub[tripStubKey],
                    "date": tripStubKey
                }
            })
        }

        return resolve(tripResponse)

        function getBusinessAndBackupOpenAtAvailableTime(day) {
            let foundBusinesses = []
            for (var i = 0; i < tripStub[day].length; i++) {
                let activity = tripStub[day][i]
                for (var j = 0; j < businesses.length; j++) {
                    let business = businesses[j]
                    for (var k = 0; k < business.hours.individualDaysData.length; k++) {
                        let businessDay = business.hours.individualDaysData[k]
                        if (_.findWhere(foundBusinesses, business) == null &&
                            business.subcategory === activity.name &&
                            businessDay.open.day === moment(day).day() &&
                            businessIsOpenOnTime(businessDay, day, activity)) {
                            foundBusinesses.push(business)
                            if (foundBusinesses.length >= 3) {
                                console.log("adding data to this: ", activity)
                                Object.keys(foundBusinesses[0]).forEach(key => {
                                    activity[key] = foundBusinesses[0][key]
                                })

                                activity.backups = [foundBusinesses[1], foundBusinesses[2]]

                                businesses = _(businesses).filter(function(b) {
                                    return !foundBusinesses.includes(b)
                                });
                                foundBusinesses = []
                            }
                        }
                    }
                }
            }
        }
    })

    function businessIsOpenOnTime(businessDay, day, activity) {
        if (!businessDay.open.time || !businessDay.close.time) return false

        console.log("day: ", day)
        let activityTime = moment(day + ' ' + activity.startTime)

        let businessOpenTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.open.time)))
        let businessCloseTime = moment(day + helpers.convert24HourIntToString(parseInt(businessDay.close.time)))

        if (businessOpenTime.isSameOrBefore(activityTime)) return true
        if (businessCloseTime.isSameOrAfter(activityTime)) return true
        if (businessDay.close.day != businessDay.open.day) return true
        return false
    }
}

function getFinalListOfBusinessesFromTripStub(businesses, required) {
    let finalList = []

    businesses.forEach(b => {
        if (getNumberOfActivitiesThatMatchCategoryInArray(finalList, b.subcategory) < required[b.subcategory].count) {
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